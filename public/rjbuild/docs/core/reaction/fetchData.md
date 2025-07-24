# Reactive-JSON fetchData Documentation

## Introduction
`fetchData` is a reaction that allows making HTTP requests to a server. It operates in two distinct modes, depending on the value of `refreshAppOnResponse`.

## Properties
- `url` (string, required): The URL to call (must be a static string, dynamic URLs are not supported)
- `httpMethod` (string, optional): The HTTP method to use (default: "get"). Supports: get, post, put, patch, delete, etc.
- `refreshAppOnResponse` (boolean, optional): If true (default), the response must be a valid rjbuild and will replace the application state. If false, the response is ignored (webhook mode).

## Behavior
- Supports configurable HTTP methods (GET by default for backward compatibility)
- Only one request can be active at a time
- The URL is evaluated via the template system before sending, but must resolve to a static string
- If `refreshAppOnResponse` is true, the response must be a valid rjbuild and will replace the application state
- If `refreshAppOnResponse` is false, the response is ignored (webhook mode)
- Errors are only logged to the console
- The triggering element is visually disabled during the request

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

### API Call with Custom Method
```yaml
renderView:
  - type: button
    content: Update Status
    actions:
      - what: fetchData
        on: click
        url: "/api/status"
        httpMethod: "patch"
        refreshAppOnResponse: false  # Response is ignored, like a webhook
```

### DELETE Request
```yaml
renderView:
  - type: button
    content: Clear Cache
    actions:
      - what: fetchData
        on: click
        url: "/api/cache"
        httpMethod: "delete"
        refreshAppOnResponse: false
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

## Use Cases with refreshAppOnResponse: false
1. Server notifications
2. Webhooks
3. API pinging
4. Triggering server-side actions without waiting for response
5. Cache invalidation
6. Remote resource cleanup

## Limitations
- Only one request can be active at a time
- Response must be a valid rjbuild **only** if refreshAppOnResponse is true
- No built-in error handling beyond console logging
- No support for request cancellation
- No support for timeouts
- **No support for dynamic URLs** - URLs must be static strings
- No support for query parameters in URL templates
- No support for complex URL routing or path generation 
- **No request body support** - Use `submitData` if you need to send data in the request body 