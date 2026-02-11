# Device Analytics & Usage Graph - Complete Implementation Proposal

## Overview
This document outlines the complete implementation strategy for tracking device usage history, calculating energy consumption, and visualizing analytics data. The system uses a **two-tier data retention strategy** to balance storage efficiency with historical insights.

---

## 1. Backend Implementation

### 1.1 Database Entities

#### Entity A: `DeviceActivityLog` (High-Resolution, Temporary)
Stores detailed ON/OFF events for the **current week only**.

```java
@Document(collection = "device_activity_logs")
public class DeviceActivityLog {
    @Id
    private String id;
    
    @Field(name = "device_id")
    @Indexed
    private String deviceId; // Links to UserDeviceEntity
    
    @Field(name = "event_type")
    private String eventType; // "ON" or "OFF"
    
    @Field(name = "timestamp")
    @Indexed
    private Date timestamp;
    
    @Field(name = "duration_ms")
    private Long durationMs; // Populated only on "OFF" events
    
    // Getters, Setters, Constructors
}
```

**Indexes:**
- `deviceId` + `timestamp` (for efficient queries)
- TTL Index: Auto-delete documents older than 7 days

#### Entity B: `DeviceDailyUsage` (Low-Resolution, Permanent)
Stores aggregated daily statistics for **long-term history**.

```java
@Document(collection = "device_daily_usage")
public class DeviceDailyUsage {
    @Id
    private String id;
    
    @Field(name = "device_id")
    @Indexed
    private String deviceId;
    
    @Field(name = "date")
    @Indexed
    private LocalDate date; // e.g., 2024-12-01
    
    @Field(name = "total_duration_minutes")
    private Long totalDurationMinutes;
    
    @Field(name = "total_kwh")
    private Double totalKwh; // Pre-calculated for performance
    
    // Getters, Setters, Constructors
}
```

**Indexes:**
- Compound: `deviceId` + `date` (unique)

#### Updated: `UserDeviceEntity`
Add wattage field for energy calculations.

```java
public class UserDeviceEntity {
    // ... existing fields ...
    
    @Field(name = "wattage")
    private Double wattage; // e.g., 9.0 for LED, 2000.0 for heater
    
    @Field(name = "last_on_timestamp")
    private Date lastOnTimestamp; // Track when device was last turned ON
}
```

---

### 1.2 Data Flow & Retention Strategy

#### When Device Turns ON
1. Create `DeviceActivityLog`:
   ```java
   DeviceActivityLog log = new DeviceActivityLog();
   log.setDeviceId(deviceId);
   log.setEventType("ON");
   log.setTimestamp(new Date());
   log.setDurationMs(null); // Not yet known
   activityLogRepository.save(log);
   ```

2. Update `UserDeviceEntity.lastOnTimestamp` = current time

#### When Device Turns OFF
1. Calculate duration:
   ```java
   long durationMs = currentTime - device.getLastOnTimestamp();
   ```

2. Create `DeviceActivityLog`:
   ```java
   DeviceActivityLog log = new DeviceActivityLog();
   log.setDeviceId(deviceId);
   log.setEventType("OFF");
   log.setTimestamp(new Date());
   log.setDurationMs(durationMs);
   activityLogRepository.save(log);
   ```

3. Update `DeviceDailyUsage` for today:
   ```java
   DeviceDailyUsage dailyUsage = dailyUsageRepository
       .findByDeviceIdAndDate(deviceId, LocalDate.now())
       .orElse(new DeviceDailyUsage(deviceId, LocalDate.now()));
   
   dailyUsage.setTotalDurationMinutes(
       dailyUsage.getTotalDurationMinutes() + (durationMs / 60000)
   );
   
   double kwh = (durationMs / 3600000.0) * device.getWattage() / 1000.0;
   dailyUsage.setTotalKwh(dailyUsage.getTotalKwh() + kwh);
   
   dailyUsageRepository.save(dailyUsage);
   ```

#### Midnight Handling (Scheduled Job)
If a device is ON across midnight, split the duration:

```java
@Scheduled(cron = "0 0 0 * * *") // Every day at 00:00
public void handleMidnightSplit() {
    List<UserDeviceEntity> activeDevices = deviceRepository.findByCurrentState("ON");
    
    for (UserDeviceEntity device : activeDevices) {
        Date midnight = getMidnight();
        long durationYesterday = midnight.getTime() - device.getLastOnTimestamp().getTime();
        
        // Update yesterday's DeviceDailyUsage
        updateDailyUsage(device.getId(), LocalDate.now().minusDays(1), durationYesterday);
        
        // Reset lastOnTimestamp to midnight for today's tracking
        device.setLastOnTimestamp(midnight);
        deviceRepository.save(device);
    }
}
```

#### Weekly Cleanup (Scheduled Job)
```java
@Scheduled(cron = "0 0 0 * * MON") // Every Monday at 00:00
public void cleanupOldActivityLogs() {
    Date oneWeekAgo = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
    activityLogRepository.deleteByTimestampBefore(oneWeekAgo);
}
```

---

### 1.3 API Endpoints

#### GET `/api/devices/{deviceId}/analytics/current-week`
Returns detailed logs for the current week (Mon-Sun).

**Response:**
```json
{
  "weekStart": "2024-11-25",
  "weekEnd": "2024-12-01",
  "dailyUsage": [
    { "date": "2024-11-25", "hours": 8.5 },
    { "date": "2024-11-26", "hours": 6.2 },
    ...
  ],
  "activityLog": [
    { "timestamp": "2024-12-01T08:00:00Z", "eventType": "ON" },
    { "timestamp": "2024-12-01T10:30:00Z", "eventType": "OFF", "durationMs": 9000000 }
  ]
}
```

#### GET `/api/devices/{deviceId}/analytics/monthly`
Returns aggregated monthly data from `DeviceDailyUsage`.

**Response:**
```json
{
  "month": "2024-12",
  "totalHours": 142.5,
  "totalKwh": 1.28,
  "dailyBreakdown": [
    { "date": "2024-12-01", "hours": 8.5, "kwh": 0.076 },
    ...
  ]
}
```

---

## 2. Frontend Implementation

### 2.1 Component Structure

#### `DeviceDataGraph.tsx` (Already Implemented)
Located at: `src/Components/Others/Grid/DeviceCard/DeviceDataGraph/`

**Features:**
1. **Segmented Control Switch** with 3 views:
   - Usage (Bar Chart)
   - Activity (Scatter Plot)
   - Energy (Calculation Display)

2. **Theme Support:** Adapts to `darkTheme` prop using `ColorConstant.tsx`

3. **Current Implementation:** Uses mock data, ready to connect to real API

### 2.2 Graph Specifications

#### Graph 1: "7-Day Usage" (Bar Chart)
- **Library:** `@nivo/bar`
- **X-Axis:** Always shows Monday through Sunday (7 bars)
  - Format: "1st Dec (Monday)"
  - Uses `date-fns` for formatting
- **Y-Axis:** Hours ON (0-24)
- **Behavior:**
  - Days before today: Show actual usage data
  - Days after today: Show as empty (0 height) but maintain slot
  - **Fixed Width:** Bars are always 1/7th of graph width
- **Data Source:** `GET /api/devices/{deviceId}/analytics/current-week`

#### Graph 2: "Today's Activity" (Scatter Plot)
- **Library:** `@nivo/scatterplot`
- **X-Axis:** Time (0-24 hours, linear scale)
  - Tick values: [0, 4, 8, 12, 16, 20, 24]
- **Y-Axis:** State (0 = OFF, 1 = ON)
- **Colors:**
  - ON events: `ColorConstant.success` (Green)
  - OFF events: `ColorConstant.error` (Red)
- **Data Structure:** Two series for distinct coloring
  ```typescript
  [
    { id: 'ON', data: [{ x: 8.0, y: 1 }, { x: 17.75, y: 1 }] },
    { id: 'OFF', data: [{ x: 10.5, y: 0 }, { x: 23.25, y: 0 }] }
  ]
  ```
- **Tooltip:** Shows "ON/OFF" + formatted time (e.g., "08:00")
- **Data Source:** Filter today's events from `activityLog`

#### Graph 3: "Energy Consumption" (Calculation Display)
- **Input Field:** User-editable wattage (default: 9W)
- **Formula Display:**
  ```
  (Hours Active × Wattage) ÷ 1000 = kWh
  Example: (5h × 9W) ÷ 1000 = 0.045 kWh
  ```
- **Stats Grid:** Shows calculated kWh for:
  - Today
  - This Week
  - This Month
- **Icons:** Uses `react-icons/io5` (IoCalculatorOutline, IoFlashOutline)
- **Data Source:** Combines duration from analytics API with user-input wattage

### 2.3 Integration Point

**File:** `src/Components/Others/Grid/DeviceCard/Information/Information.tsx`

The `DeviceDataGraph` component is rendered in the "Information" tab, accessible via the `MdOutlineDataSaverOff` icon.

```typescript
<DeviceDataGraph darkTheme={darkTheme} />
```

---

## 3. Data Retention Summary

| Data Type | Storage | Retention | Purpose |
|-----------|---------|-----------|---------|
| `DeviceActivityLog` | MongoDB | **7 days** (Current week only) | Detailed ON/OFF events for Activity graph |
| `DeviceDailyUsage` | MongoDB | **Permanent** (2+ years) | Daily summaries for historical graphs |
| `UserDeviceEntity.wattage` | MongoDB | Permanent | Energy calculation |

**Storage Efficiency:**
- 1 device with 10 ON/OFF cycles per day:
  - `DeviceActivityLog`: ~70 documents max (7 days × 10 events)
  - `DeviceDailyUsage`: ~365 documents per year (1 per day)
- **Total:** Minimal storage footprint even with 100+ devices

---

## 4. Implementation Checklist

### Backend Tasks
- [ ] Create `DeviceActivityLog` entity and repository
- [ ] Create `DeviceDailyUsage` entity and repository
- [ ] Add `wattage` and `lastOnTimestamp` fields to `UserDeviceEntity`
- [ ] Implement event logging in device update logic
- [ ] Create scheduled job for midnight split
- [ ] Create scheduled job for weekly cleanup
- [ ] Implement API endpoints for analytics data
- [ ] Add indexes for query performance

### Frontend Tasks
- [x] Install `date-fns` dependency
- [x] Create `DeviceDataGraph.tsx` component
- [x] Implement 7-Day Usage bar chart
- [x] Implement Today's Activity scatter plot
- [x] Implement Energy Consumption view
- [x] Integrate with `Information.tsx`
- [x] Add theme support using `ColorConstant.tsx`
- [ ] Replace mock data with real API calls
- [ ] Add loading states and error handling
- [ ] Add ability to save wattage to backend

---

## 5. Future Enhancements

1. **Cost Estimation:**
   - Allow users to input electricity rate ($/kWh)
   - Display estimated cost alongside kWh

2. **Monthly/Yearly Views:**
   - Add date range selector
   - Show historical trends beyond current week

3. **Export Data:**
   - Download usage data as CSV
   - Generate PDF reports

4. **Notifications:**
   - Alert if device runs longer than X hours
   - Weekly usage summary emails

---

## 6. Questions for Confirmation

1. **Wattage Storage:** Should wattage be user-editable in the UI, or set once during device setup?
2. **Data Retention:** Is 2 years sufficient for `DeviceDailyUsage`, or do you need longer?
3. **Midnight Split:** Should we implement this immediately, or is it acceptable for daily stats to be slightly off if a device runs overnight?
4. **API Priority:** Which endpoint should I implement first - current week or monthly?

---

**Ready to proceed with backend implementation once you confirm the above details!**
