# VisuallyHide

**Description**: Visually hides the element but keeps it in the DOM (useful for accessibility or to keep the element reactive to events).

## Properties
- None

## Behavior
- The element is rendered in the DOM but with `display: none`.

## Example
```yaml
renderView:
  - type: div
    content: "This text will be visually hidden."
    actions:
      - what: visuallyHide
```

## Limitation
- The element remains in the DOM, which can impact accessibility or performance if overused. 