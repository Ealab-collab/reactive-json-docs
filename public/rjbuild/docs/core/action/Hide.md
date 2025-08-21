# Hide

Completely hides the element and cancels any subsequent actions.

## Properties
None.

## Behavior
- The element and its children are not rendered in the DOM.
- Subsequent actions are not executed.

## Example
```yaml
renderView:
  - type: div
    content: "This text will be hidden."
    actions:
      - what: hide
```

## Limitation
- When hidden, the element no longer exists in the DOM, so no events can be attached to it. 