import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { useState } from 'react';
import './DeviceDataGraph.css';
import { IoCalculatorOutline, IoFlashOutline } from 'react-icons/io5';
import { format, startOfWeek, eachDayOfInterval, endOfWeek } from 'date-fns';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';

// Mock Data for Usage Duration (Current Week: Mon -> Sun)
const generateCurrentWeekData = () => {
    const today = new Date();
    // Start of week (Monday = 1)
    const start = startOfWeek(today, { weekStartsOn: 1 });
    // End of week (Sunday)
    const end = endOfWeek(today, { weekStartsOn: 1 });
    
    // Generate all 7 days from Monday to Sunday
    const days = eachDayOfInterval({ start, end });

    return days.map(day => {
        // If the day is in the future (after today), set hours to 0
        // day is 00:00, today is current time. 
        // e.g. Mon 00:00 < Mon 10:00 (Not future) -> Show data
        // e.g. Tue 00:00 > Mon 10:00 (Future) -> 0
        const isFuture = day > today;
        
        return {
            day: format(day, 'do MMM (eeee)'), // e.g., "1st Dec (Monday)"
            hours: isFuture ? 0 : Number((Math.random() * 10).toFixed(1)) // Random hours for past/present
        };
    });
};

const mockUsageData = generateCurrentWeekData();

// Mock Data for Activity Log (Today)
// Split into two series for distinct coloring
const mockActivityData = [
    {
        id: 'ON',
        data: [
            { x: 8.0, y: 1 },   // 08:00 ON
            { x: 17.75, y: 1 }, // 17:45 ON
        ],
    },
    {
        id: 'OFF',
        data: [
            { x: 10.5, y: 0 },  // 10:30 OFF
            { x: 23.25, y: 0 }, // 23:15 OFF
        ],
    },
];

interface DeviceDataGraphProps {
    darkTheme: boolean;
}

const DeviceDataGraph = ({ darkTheme }: DeviceDataGraphProps) => {
    const [graphType, setGraphType] = useState<'usage' | 'activity' | 'energy'>('usage');
    const [wattage, setWattage] = useState<number>(9); // Default 9W (LED Bulb)

    const themeColors = darkTheme ? dark_colors : light_colors;

    const theme = {
        axis: {
            ticks: {
                text: {
                    fill: themeColors.text,
                },
            },
            legend: {
                text: {
                    fill: themeColors.text,
                },
            },
        },
        grid: {
            line: {
                stroke: darkTheme ? '#444444' : '#e0e0e0',
            },
        },
        text: {
            fill: themeColors.text,
        },
        tooltip: {
            container: {
                background: themeColors.card,
                color: themeColors.text,
            },
        },
    };

    // Energy Calculation Helpers
    const calculateKwh = (hours: number, watts: number) => {
        return ((hours * watts) / 1000).toFixed(3);
    };

    const mockEnergyStats = {
        today: { hours: 5.2, label: 'Today' },
        week: { hours: 38.5, label: 'This Week' },
        month: { hours: 142.0, label: 'This Month' },
    };

    return (
        <div className={`deviceDataGraph ${darkTheme ? 'dark' : 'light'}`}>
            <div className="graph-header">
                <div className="graph-switch">
                    <button 
                        className={graphType === 'usage' ? 'active' : ''} 
                        onClick={() => setGraphType('usage')}
                    >
                        7-Day Usage
                    </button>
                    <button 
                        className={graphType === 'activity' ? 'active' : ''} 
                        onClick={() => setGraphType('activity')}
                    >
                        Activity
                    </button>
                    <button 
                        className={graphType === 'energy' ? 'active' : ''} 
                        onClick={() => setGraphType('energy')}
                    >
                        Energy
                    </button>
                </div>
            </div>

            <div className="graph-container">
                {graphType === 'usage' && (
                    <ResponsiveBar
                        data={mockUsageData}
                        keys={['hours']}
                        indexBy="day"
                        margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
                        padding={0.3}
                        valueScale={{ type: 'linear', max: 24 }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        theme={theme}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -20,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Hours ON',
                            legendPosition: 'middle',
                            legendOffset: -40,
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        role="application"
                        ariaLabel="7-Day Usage Graph"
                    />
                )}

                {graphType === 'activity' && (
                    <ResponsiveScatterPlot
                        data={mockActivityData}
                        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                        xScale={{ type: 'linear', min: 0, max: 24 }}
                        yScale={{ type: 'linear', min: -0.5, max: 1.5 }}
                        blendMode="normal"
                        theme={theme}
                        colors={(node: any) => node.serieId === 'ON' ? themeColors.success : themeColors.error}
                        nodeSize={12}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Time (24h)',
                            legendPosition: 'middle',
                            legendOffset: 36,
                            tickValues: [0, 4, 8, 12, 16, 20, 24],
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'State',
                            legendPosition: 'middle',
                            legendOffset: -40,
                            tickValues: [0, 1],
                            format: (value) => value === 1 ? 'ON' : 'OFF'
                        }}
                        tooltip={({ node }) => (
                            <div style={{
                                padding: '5px 10px',
                                background: theme.tooltip.container.background,
                                color: theme.tooltip.container.color,
                                borderRadius: '3px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.25)'
                            }}>
                                <strong>{node.data.y === 1 ? 'ON' : 'OFF'}</strong>
                                <br />
                                Time: {Math.floor(node.data.x as number)}:
                                {Math.round(((node.data.x as number) % 1) * 60).toString().padStart(2, '0')}
                            </div>
                        )}
                    />
                )}

                {graphType === 'energy' && (
                    <div className="energy-view">
                        <div className="energy-input-section">
                            <label>Device Wattage (W):</label>
                            <input 
                                type="number" 
                                value={wattage} 
                                onChange={(e) => setWattage(Number(e.target.value))}
                                className="wattage-input"
                            />
                        </div>

                        <div className="energy-formula-card">
                            <div className="formula-header">
                                <IoCalculatorOutline /> Calculation Formula
                            </div>
                            <div className="formula-text">
                                (Hours Active × Wattage) ÷ 1000 = <strong>kWh</strong>
                            </div>
                            <div className="formula-example">
                                Example: (5h × {wattage}W) ÷ 1000 = {calculateKwh(5, wattage)} kWh
                            </div>
                        </div>

                        <div className="energy-stats-grid">
                            {Object.values(mockEnergyStats).map((stat) => (
                                <div key={stat.label} className="energy-stat-card">
                                    <div className="stat-label">{stat.label}</div>
                                    <div className="stat-value">
                                        <IoFlashOutline />
                                        {calculateKwh(stat.hours, wattage)} 
                                        <span>kWh</span>
                                    </div>
                                    <div className="stat-sub">
                                        {stat.hours} hrs active
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceDataGraph;
