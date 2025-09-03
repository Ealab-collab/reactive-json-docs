# Forward update

> Use the special placeholder `<reactive-json:event>` to reference values coming directly from the DOM or the custom event that triggered a reaction.

The **Forward update** pattern lets you use the special placeholder `<reactive-json:event>` inside any reaction arguments. It is primarily useful with `setData`, but can be applied to any reaction. Instead of reading a value *after* the global data has been updated, you can forward the fresh value carried by the event itself.

## Syntax

```yaml
# Simplified shortcut
value: "<reactive-json:event-new-value>"      # Auto-detects the relevant value (value or checked)

# Generic pattern
value: "<reactive-json:event>.target.value"   # For text inputs
value: "<reactive-json:event>.target.checked" # For checkboxes
```

### The `<reactive-json:event-new-value>` shortcut

`<reactive-json:event-new-value>` automatically detects and returns the most relevant value from different types of events. The extraction logic varies based on the event type and the target element.

#### Extraction Rules Reference

| Event Type | Target Element | Logic | Return Value | Example |
|------------|----------------|-------|--------------|---------|
| **CustomEvent** | Any | Returns `event.detail.value` | Any value from custom event payload | `<reactive-json:event-new-value>.preferences.theme` |
| **DOM Event** | `input[type="checkbox"]` | Returns `event.target.checked` | `true` or `false` | `<reactive-json:event-new-value>` → `true` |
| **DOM Event** | `input[type="radio"]` | Returns `event.target.value` if checked, otherwise `undefined` | String value or `undefined` | `<reactive-json:event-new-value>` → `"option1"` |
| **DOM Event** | `input[type="text"]`, `textarea`, `select` | Returns `event.target.value` | String value | `<reactive-json:event-new-value>` → `"user input"` |
| **DOM Event** | Element with `value` property | Returns `event.target.value` | Any value | `<reactive-json:event-new-value>` → `"42"` |
| **DOM Event** | Element with `checked` property (fallback) | Returns `event.target.checked` | `true` or `false` | `<reactive-json:event-new-value>` → `false` |
| **Any Event** | No applicable property | Returns `undefined` | `undefined` | `<reactive-json:event-new-value>` → `undefined` |

#### Processing Priority
For DOM events, the extraction follows this priority order:
1. **Checkbox**: `event.target.checked` (boolean)
2. **Radio button**: `event.target.value` only if checked, otherwise `undefined`
3. **General case**: `event.target.value` (if property exists)
4. **Fallback**: `event.target.checked` (if property exists)
5. **Default**: `undefined`

For CustomEvent objects (like `response` events from `fetchData`), it directly accesses `event.detail.value` and allows further property access with dot notation.

## Good Practice

- For standard form events (`change`, `input`, etc.), prefer the shortcut `<reactive-json:event-new-value>`.
- For custom events (e.g. messages via `postMessage`, `CustomEvent`), reference the payload explicitly:
  - `<reactive-json:event>.data.foo` (MessageEvent)
  - `<reactive-json:event>.detail.bar` (CustomEvent)
- The bare placeholder `<reactive-json:event>` returns `undefined` on purpose to avoid storing large non-serializable objects.

If no property path is provided (`<reactive-json:event>` alone), nothing is forwarded (`undefined`).

You can access any nested property (`detail`, `key`, etc.).

## Event Types

### Standard DOM Events
The forward update system works with standard DOM events (`change`, `input`, `click`, etc.) from form elements and other HTML components.

### Response Event
You can also use the special `response` event with reactions like `fetchData`. This event is triggered when an HTTP request completes successfully, allowing you to access the response data directly.

```yaml
actions:
  - what: fetchData
    url: "/api/user-profile.json"
    on: click
  - what: setData
    on: response  # Triggered when fetchData completes
    path: ~~.userTheme
    value: <reactive-json:event-new-value>.preferences.theme
```

## Typical Use-cases

- Real-time mirroring of form fields
- "Select all" checkboxes
- Forward arbitrary values coming from events
- Process HTTP response data immediately after fetch operations

## Examples

### Synchronized CheckBoxes (Select-all pattern)

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~~.controller_checked
    options:
      - label: "Controller"
        value: true
    actions:
      - what: setData
        on: change
        path: ~~.mirror_checked
        value: "<reactive-json:event>.target.checked"
  - type: CheckBoxField
    dataLocation: ~~.mirror_checked
    options:
      - label: "Mirror (synced)"
        value: true

data:
  controller_checked: false
  mirror_checked: false
```

### Synchronized TextFields

```yaml
renderView:
  - type: TextField
    label: Primary input
    placeholder: Type here...
    dataLocation: ~~.primary_text
    actions:
      - what: setData
        on: change
        path: ~~.secondary_text
        value: "<reactive-json:event>.target.value"
  - type: TextField
    label: Secondary input (synced)
    placeholder: Echo...
    dataLocation: ~~.secondary_text

data:
  primary_text: ""
  secondary_text: ""
```

### Response Event Processing

```yaml
renderView:
  - type: button
    content: "Load User Profile"
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
        path: ~~.userName
        value: <reactive-json:event-new-value>.name
  - type: div
    content:
      - "User theme: "
      - type: code
        content: ~~.userTheme
  - type: div
    content:
      - "User name: "
      - type: strong
        content: ~~.userName

data:
  userTheme: "not-loaded"
  userName: "not-loaded"
``` 