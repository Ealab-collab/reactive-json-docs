# Phantom

## Introduction

The `Phantom` component allows you to define actions or logic in your rjbuild without rendering any DOM element. It is useful for triggering actions, conditions, or data manipulations invisibly, without affecting the visual structure of your application.

## Properties
- `content` (object/array/string, optional): Content to evaluate or trigger (actions, conditions, etc.)
- `actions` (array, optional): Actions to attach to the phantom logic (e.g., Tooltip)

## Behavior
- Does not render any visible DOM element
- Can be used to attach actions, conditions, or data manipulations without UI
- The `content` property can include any valid Reactive-JSON view, action, or string
- The `actions` property allows you to attach logic such as tooltips or data updates

## Example
```yaml
renderView:
  - type: Phantom
    content: "Hover me"
    actions:
      - what: tooltip
        content: "This tooltip is attached via an action, not a visible wrapper."
        placement: right
```

## Limitations
- Does not produce any visible output in the DOM
- Only useful for logic, actions, or invisible data manipulations
- Not intended for displaying content to the user 