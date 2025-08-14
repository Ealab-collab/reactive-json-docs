# Forward Update Pattern (Event Placeholders)

Added in **reactive-json@0.0.43**.

> Use the special placeholder `<reactive-json:event>` to reference values coming directly from the DOM or the custom event that triggered a reaction.

The **Forward Update** pattern lets you use the special placeholder `<reactive-json:event>` inside any reaction arguments. It is primarily useful with `setData`, but can be applied to any reaction. Instead of reading a value *after* the global data has been updated, you can forward the fresh value carried by the event itself.

## Syntax

```yaml
# Simplified shortcut
value: "<reactive-json:event-new-value>"      # Auto-detects the relevant value (value or checked)

# Generic pattern
value: "<reactive-json:event>.target.value"   # For text inputs
value: "<reactive-json:event>.target.checked" # For checkboxes
```

### The `<reactive-json:event-new-value>` shortcut

`<reactive-json:event-new-value>` returns, in order of priority:  
1. `event.target.checked` (checkboxes / toggle inputs)  
2. `event.target.value` (text inputs, selects, etc.)  
3. `undefined` if none of the above exists.

## Good Practice

- For standard form events (`change`, `input`, etc.), prefer the shortcut `<reactive-json:event-new-value>`.
- For custom events (e.g. messages via `postMessage`, `CustomEvent`), reference the payload explicitly:
  - `<reactive-json:event>.data.foo` (MessageEvent)
  - `<reactive-json:event>.detail.bar` (CustomEvent)
- The bare placeholder `<reactive-json:event>` returns `undefined` on purpose to avoid storing large non-serializable objects.

If no property path is provided (`<reactive-json:event>` alone), nothing is forwarded (`undefined`).

You can access any nested property (`detail`, `key`, etc.).

## Typical Use-cases

- Real-time mirroring of form fields
- “Select all” checkboxes
- Forward arbitrary values coming from events

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