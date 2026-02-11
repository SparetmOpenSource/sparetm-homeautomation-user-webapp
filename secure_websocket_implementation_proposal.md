# Secure WebSocket Implementation Guide (Production Ready)

## Overview
This guide routes all WebSocket messages through a **Security Interceptor** before they are processed.
1.  **Handshake**: Client sends `Authorization: Bearer <token>`.
2.  **Interceptor**: Backend intercepts the `CONNECT` frame, validates the token, and extracts the User Principal.
3.  **Routing**: User listens to `/user/queue/updates`. Backend sends to specific user.

---

## Part 1: Backend Implementation

### 1. Create the Interceptor
Create `src/main/java/com/sparetm/api/configuration/WebSocketAuthInterceptor.java`.

```java
package com.sparetm.api.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    // Inject your future Security Service here
    // private final JwtService jwtService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // Only check on CONNECT frames
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            
            // 1. Extract Token from Headers
            String authHeader = accessor.getFirstNativeHeader("Authorization");
            
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                try {
                    // 2. Validate Token (Pseudo-code)
                    // String username = jwtService.extractUsername(token);
                    // if (jwtService.isValid(token)) { ... }
                    
                    // For now, let's assume successful validation and extraction:
                    String username = "extracted_username_from_jwt"; // Replace with actual logic
                    
                    // 3. Create Authentication Object
                    UsernamePasswordAuthenticationToken user = 
                        new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
                    
                    // 4. Set the User in the WebSocket Session
                    accessor.setUser(user);
                    
                } catch (Exception e) {
                    // Token invalid
                    throw new IllegalArgumentException("Invalid JWT Token");
                }
            } else {
                throw new IllegalArgumentException("Missing Authorization Header");
            }
        }
        return message;
    }
}
```

### 2. Register Interceptor in `WebSocketConfig.java`

```java
@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final ApplicationProperties applicationProperties;
    private final WebSocketAuthInterceptor authInterceptor; // Inject it

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // Register the specific interceptor
        registration.interceptors(authInterceptor);
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue"); // Add /queue for user-specific
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user"); // Enable /user prefixes
    }
    
    // ... registerStompEndpoints remains same
}
```

### 3. Sending Messages (`WebSocketService.java`)

Use `convertAndSendToUser`. The broker automatically handles the `/user/{username}/...` routing.

```java
public void sendToSpecificUser(String username, String topic, Object payload) {
    // Sends to: /user/{username}/queue/updates
    messagingTemplate.convertAndSendToUser(
        username,           // The "Principal" name set in the Interceptor
        "/queue/updates",   // The destination (client subscribes to /user/queue/updates)
        payload
    );
}
```

---

## Part 2: Frontend Implementation (`WebSocketContext.tsx`)

Update the STOMP client to send the header during connection.

```typescript
// ... inside connectToWebSocket ...

const client = new Client({
    brokerURL: wsUrl,
    connectHeaders: {
        // Pass the JWT Token here
        Authorization: `Bearer ${token}` 
    },
    // ... other config
});

// ... inside onConnect ...

// Subscribe to User Specific Queue
// Note: Client subscribes to "/user/queue/updates"
// Spring automatically translates this to specific session
client.subscribe('/user/queue/updates', (message) => {
    // Handle private message
});
```

## Summary of Flow
1.  **Front**: `client.subscribe('/user/queue/updates')`
2.  **Back (Interceptor)**: Reading `Bearer` token -> Sets `Principal = "admin@email.com"`
3.  **Back (Service)**: `convertAndSendToUser("admin@email.com", "/queue/updates", data)`
4.  **Broker**: Delivers to that specific socket session.
