# Reactive-JSON fetchData Documentation

## Introduction
`fetchData` is a reaction that allows making HTTP GET requests to a server. It operates in two distinct modes, depending on the value of `refreshAppOnResponse`.

## Properties
- `url` (string, required): The URL to call (must be a static string, dynamic URLs are not supported)
- `refreshAppOnResponse` (boolean, optional): If true (default), the response must be a valid rjbuild and will replace the application state. If false, the response is ignored (webhook mode).

## Behavior
- Only GET requests are supported
- Only one request can be active at a time
- The URL is evaluated via the template system before sending, but must resolve to a static string
- If `refreshAppOnResponse` is true, the response must be a valid rjbuild and will replace the application state
- If `refreshAppOnResponse` is false, the response is ignored (webhook mode)
- Errors are only logged to the console
- The triggering element is visually disabled during the request

## Examples

### Data Loading (with Refresh)
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

### Simple Call (Webhook Style)
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

## Limitations
- Only one request can be active at a time
- Only GET requests are supported
- Response must be a valid rjbuild **only** if refreshAppOnResponse is true
- No built-in error handling beyond console logging
- No support for request cancellation
- No support for timeouts
- **No support for dynamic URLs** - URLs must be static strings
- No support for query parameters in URL templates
- No support for complex URL routing or path generation 