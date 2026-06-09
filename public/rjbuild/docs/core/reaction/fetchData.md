# Reactive-JSON fetchData Documentation

`fetchData` is a reaction that allows making HTTP requests to a server. It operates in multiple modes, depending on configuration values.

- Supports configurable HTTP methods (GET by default for backward compatibility)
- Only one request can be active at a time
- The URL is evaluated via the template system before sending, but must resolve to a static string
- The response can refresh the app (default) or be ignored

## Properties
- `httpMethod` (string, optional): The HTTP method to use (default: "get"). Supports: get, post, put, patch, delete, etc.
- `refreshAppOnResponse` (boolean, optional): If true (default), the response will update the application. If false, the response is ignored (webhook mode).
- `allowConcurrent` (boolean, optional): When true, allows concurrent requests (bypasses the global lock). Default: false. Implicitly true when `requestKey` is set.
- `requestKey` (string, optional): Identifier used to group requests that should cancel each other. When set, firing a new request with the same key aborts the previous one client-side (via AbortController). Different keys are independent. Bypasses the global lock automatically. See [Concurrency control](#concurrency-control--requestkey) below.
- `updateOnlyData` (boolean, optional): When true and `refreshAppOnResponse` is true, only updates the data section instead of replacing the entire RjBuild. Preserves templates and renderView. Default: false.
- `updateDataAtLocation` (string, optional): When `updateOnlyData` is true, specifies where to place the response data using template path syntax (e.g., "~~.userProfile", "~.config.settings"). If not specified, replaces the entire data object.
- `url` (string, required): The URL to call (must be a static string, dynamic URLs are not supported)

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

## Response Event

`fetchData` triggers a special `response` event when the HTTP request completes successfully. This allows you to process the response data immediately using other reactions.

You can use the `on: response` trigger with any reaction (like `setData`) to access the response data through the [forward update system](../../../advanced-concepts/forward-update.md):

```yaml
actions:
  - what: fetchData
    on: click
    url: "/api/user-profile.json"
    updateOnlyData: true
    updateDataAtLocation: ~~.userProfile
  - what: setData
    on: response  # Triggered when fetchData completes
    path: ~~.userTheme
    value: <reactive-json:event-new-value>.preferences.theme
  - what: setData
    on: response
    path: ~~.lastFetchTime
    value: <reactive-json:event-new-value>.metadata.timestamp
```

The response event provides access to the complete server response through `<reactive-json:event-new-value>`, allowing you to extract specific values and store them in different data locations.

> **⚠️ Important:** When using `updateOnlyData: true`, the server response must contain **data only**, not a complete RjBuild structure. The response should be the raw data object, not wrapped in `{data: {...}, renderView: [...], templates: {...}}`.

## Concurrency control — `requestKey`

By default, `fetchData` and `submitData` share a **global lock** at the document level: only one HTTP request can be active across the whole app at any time. A second call fired while the first is in flight is **silently dropped**. This is safe for most cases but bites when a user clicks rapidly through buckets in a filter UI, or hits two save buttons quickly — the second request's siblings (e.g. `setData` updating local UI state) still run, but the request itself never goes out, leaving UI and data out of sync.

`requestKey` opts the call into per-key cancel-on-new semantics. The library keeps a registry of in-flight requests keyed by `requestKey` and, on each new call:

1. Aborts the previous request with the same key (via `AbortController` on the underlying axios call).
2. Replaces the registry entry with the new request.
3. Lets the new request proceed.

Aborted requests are silently swallowed: their `.catch` doesn't log an error, and their `.finally` skips the `response` event dispatch. The successor will fire its own `response` event normally.

```yaml
# Rapid clicks on bucket A then B share `facet-refresh` — A's request
# is aborted as soon as B is fired, so only B's response lands in the
# store. Without requestKey, B would silently no-op (global lock held
# by A) and the UI would diverge from the data.
actions:
  - what: setData
    on: click
    path: ~~.selectedFilter
    value: ~.key
  - what: fetchData
    on: click
    requestKey: facet-refresh
    url: ~~.endpoint
    updateOnlyData: true
    updateDataAtLocation: ~~.result
```

Different keys are independent: edit modals on multiple rows can each have their own `requestKey: 'save-row-42'` etc. and save simultaneously without interfering.

`requestKey` implies `allowConcurrent: true` — the global lock is bypassed automatically when a key is provided, since per-key cancel-on-new already guarantees single-flight within the key.

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