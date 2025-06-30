# Popover

**Description**: Displays a Bootstrap popover on click or hover of the element.

## Properties
- `header` (optional): content of the popover header
- `body`: content of the popover body
- `placement` (optional): position (`top`, `bottom`, `left`, `right`)
- `trigger` (optional): trigger event (`click`, `hover`, etc.)

## Example
```yaml
renderView:
  - type: button
    content: "Click me"
    actions:
      - what: popover
        header: "Popover Title"
        body: "This is the popover content."
        placement: right
        trigger: click
```

## Limitation
- Requires Bootstrap CSS.
- The child component must be able to accept a React reference. 