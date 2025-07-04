# Tooltip

**Description**: Displays a Bootstrap tooltip when hovering over the element.

## Properties
- `content`: tooltip content (text or component)
- `placement` (optional): tooltip position (`top`, `bottom`, `left`, `right`)

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
- Requires Bootstrap CSS.
- The child component must be able to accept a React reference. 