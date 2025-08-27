# Tooltip

Displays a Bootstrap tooltip when hovering over the element.

## Properties
- `content`: Tooltip content (text or component).
- `placement` (optional): Tooltip position (`top`, `bottom`, `left`, `right`).

## Example
```yaml
renderView:
  - type: button
    content: "Hover me"
    actions:
      - what: tooltip
        content: "This is a tooltip."
        placement: top
```

## Limitation
- Requires the Bootstrap integration plugin (`@ea-lab/reactive-json-bootstrap`).
- The child component must be able to accept a React reference. 