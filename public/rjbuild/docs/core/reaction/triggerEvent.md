# Reaction: triggerEvent

## Introduction

The `triggerEvent` reaction programmatically dispatches an event on one or more target elements found via a CSS selector. This allows for indirect interactions, such as one button triggering the `click` event of another element, or simulating user actions on specific components.

## Properties

- `what` (string, required): The name of the reaction, must be `triggerEvent`.
- `on` (string, required): The event that triggers this reaction.
- `eventName` (string, required): The name of the event to dispatch on the target element(s) (e.g., `click`, `focus`).
- `selector` (string, required): A CSS selector to identify the target element(s) that will receive the event.
- `selectorBase` (string, optional): Defines the starting point for the `selector` search.
  - If omitted, the search starts from the `document` root.
  - If set to `'currentEventTarget'`, the search starts from the element that triggered the reaction.
  - If set to another CSS selector, the search starts from the closest ancestor matching that selector.

## Behavior

- When triggered, the reaction searches for elements matching the `selector` within the scope defined by `selectorBase`.
- It then dispatches a new DOM event of type `eventName` on each found element.
- The event bubbles up the DOM (`bubbles: true`).
- To ensure reliable event dispatch on multiple targets, especially for synchronous events like `click`, the reaction dispatches events sequentially using Promises.

## Example

### Triggering a click on another element

In this example, clicking the first button (`Trigger a click...`) does not update the status directly. Instead, it dispatches a `click` event on the second button (`Update the status`). The second button has its own `click` reaction that updates the status. Therefore, clicking either button will result in the same final action: the status text gets updated.

```yaml
renderView:
  - type: button
    content: "Trigger a click on the other button"
    actions:
      - what: triggerEvent
        on: click
        eventName: "click"
        selector: "#target-button"
  - type: button
    content: "Update the status"
    attributes:
      id: "target-button"
    actions:
      - what: setData
        on: click
        path: ~.status
        value: "Clicked!"
  - type: div
    content: "Status: ~.status"
data:
  status: "Not clicked"
```

## Limitations

- The target elements must exist in the DOM when the reaction is triggered.
- The behavior depends on the target element having an event listener for the dispatched `eventName`.
- Complex events with custom data are not supported; it dispatches a standard `Event`. 