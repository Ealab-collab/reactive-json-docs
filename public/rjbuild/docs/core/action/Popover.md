# Popover

Displays a Bootstrap popover on click or hover of the element.

## Properties
- `header` (optional): Content of the popover header.
- `body`: Content of the popover body.
- `placement` (optional): Position (`top`, `bottom`, `left`, `right`).
- `trigger` (optional): Trigger event (`click`, `hover`, etc.).

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