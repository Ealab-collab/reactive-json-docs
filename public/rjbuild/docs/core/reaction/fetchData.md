# Reactive-JSON fetchData Documentation

## Introduction
`fetchData` is a reaction that allows making HTTP requests to a server. It operates in multiple modes, depending on configuration values.

- Supports configurable HTTP methods (GET by default for backward compatibility)
- Only one request can be active at a time
- The URL is evaluated via the template system before sending, but must resolve to a static string
- The response can refresh the app (default) or be ignored

## Properties
- `url` (string, required): The URL to call (must be a static string, dynamic URLs are not supported)
- `httpMethod` (string, optional): The HTTP method to use (default: "get"). Supports: get, post, put, patch, delete, etc.
- `refreshAppOnResponse` (boolean, optional): If true (default), the response will update the application. If false, the response is ignored (webhook mode).
- `updateOnlyData` (boolean, optional): When true and `refreshAppOnResponse` is true, only updates the data section instead of replacing the entire RjBuild. Preserves templates and renderView. Default: false.
- `updateDataAtLocation` (string, optional): When `updateOnlyData` is true, specifies where to place the response data using template path syntax (e.g., "~~.userProfile", "~.config.settings"). If not specified, replaces the entire data object.

## Behavior
- Supports configurable HTTP methods (GET by default for backward compatibility)
- Only one request can be active at a time
- The URL is evaluated via the template system before sending, but must resolve to a static string
- Errors are only logged to the console
- The triggering element is visually disabled during the request
- When `refreshAppOnResponse` is false, the response is ignored (webhook mode)
- When `refreshAppOnResponse` is true and `updateOnlyData` is false, the server response must be a valid rjbuild and will replace the entire application state
- When `refreshAppOnResponse` is true and `updateOnlyData` is true:
  - Only the data section is updated, preserving templates and renderView
  - Without `updateDataAtLocation`: **completely replaces** the entire data object
  - With `updateDataAtLocation`: updates only the specified path in the data

> **⚠️ Important:** When using `updateOnlyData: true`, the server response must contain **data only**, not a complete RjBuild structure. The response should be the raw data object, not wrapped in `{data: {...}, renderView: [...], templates: {...}}`.

## Examples

### Data Loading with GET (Default)
```yaml
renderView:
  - type: button
    content: Load Data
    actions:
      - what: fetchData
        on: click
        url: "/api/users"
        refreshAppOnResponse: true  # Response will replace the application state
```

### Simple Webhook Call
```yaml
renderView:
  - type: button
    content: Notify Server
    actions:
      - what: fetchData
        on: click
        url: "/api/notify"
        refreshAppOnResponse: false  # Response is ignored, like a webhook
```

## Data Update Behavior
When using `updateOnlyData: true`:

### Without updateDataAtLocation (Complete Data Replacement)
```yaml
# Before request - original data:
data:
  userProfile: { name: "John", email: "john@example.com" }
  settings: { theme: "dark" }
  notifications: { count: 5 }

# Response from server:
{
  newUserData: { name: "Jane", email: "jane@example.com" }
  systemStatus: "active"
}

# After request - data is COMPLETELY REPLACED:
data:
  newUserData: { name: "Jane", email: "jane@example.com" }
  systemStatus: "active"
  # ❌ userProfile, settings, notifications are LOST
```

### With updateDataAtLocation (Targeted Update)
```yaml
# Before request - original data:
data:
  userProfile: { name: "John", email: "john@example.com" }
  settings: { theme: "dark" }
  notifications: { count: 5 }

# Request with updateDataAtLocation: "~~.userProfile"
# Response from server:
{
  name: "Jane",
  email: "jane@example.com",
  avatar: "new-avatar.jpg"
}

# After request - only userProfile is updated:
data:
  userProfile: { name: "Jane", email: "jane@example.com", avatar: "new-avatar.jpg" }
  settings: { theme: "dark" }         # ✅ Preserved
  notifications: { count: 5 }        # ✅ Preserved
```

## Use Cases with refreshAppOnResponse: false
1. Server notifications
2. Webhooks
3. API pinging
4. Triggering server-side actions without waiting for response
5. Cache invalidation
6. Remote resource cleanup

## Use Cases with updateOnlyData: true
1. **Refreshing user profile data** without losing application state
2. **Updating configuration settings** while preserving the UI structure
3. **Loading additional data** into specific sections
4. **Partial data synchronization** with the server
5. **Real-time data updates** for dashboards or live displays

## Example use cases

### Data-Only Update (Complete Replacement)
```yaml
actions:
  - what: fetchData
    on: click
    url: "/api/user/data"
    refreshAppOnResponse: true
    updateOnlyData: true  # Only updates data, preserves templates/renderView
```

### Targeted Data Update
```yaml
actions:
  - what: fetchData
    on: click
    url: "/api/user/profile"
    refreshAppOnResponse: true
    updateOnlyData: true
    updateDataAtLocation: "~~.userProfile"  # Updates only userProfile section
```

### Nested Data Update
```yaml
actions:
  - what: fetchData
    on: click
    url: "/api/user/settings"
    refreshAppOnResponse: true
    updateOnlyData: true
    updateDataAtLocation: "~~.config.userSettings"  # Deep update
```

### API Call with Custom Method
```yaml
actions:
  - what: fetchData
    on: click
    url: "/api/status"
    httpMethod: "patch"
    refreshAppOnResponse: false  # Response is ignored, like a webhook
```

### DELETE Request
```yaml
actions:
  - what: fetchData
    on: click
    url: "/api/cache"
    httpMethod: "delete"
    refreshAppOnResponse: false
```

## Limitations
- Only one request can be active at a time
- Response must be a valid rjbuild **only** if refreshAppOnResponse is true and updateOnlyData is false
- When `updateOnlyData` is true, the response must contain **data only** (not a complete RjBuild structure)
- No built-in error handling beyond console logging
- No support for request cancellation
- No support for timeouts
- **No support for dynamic URLs** - URLs must be static strings
- No support for query parameters in URL templates
- No support for complex URL routing or path generation 
- **No request body support** - Use `submitData` if you need to send data in the request body 
- `updateDataAtLocation` paths must be valid template paths that resolve to data locations 