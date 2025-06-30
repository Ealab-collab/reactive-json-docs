# Reaction: setData

## Introduction

The `setData` reaction updates the data at a specific location in the global data context. It is one of the most fundamental reactions for managing state and making applications interactive. It can be used to set simple values, objects, or the result of a template evaluation.

## Properties

- `what` (string, required): The name of the reaction, which must be `setData`.
- `on` (string, required): The name of the event that triggers the reaction (e.g., `click`, `change`).
- `path` (string, required): The target location in the data context where the value will be set. It supports `~.` notation for relative paths.
- `value` (any, required): The value to set at the specified path. This value is evaluated, so it can be a literal, a path to other data, or a template string.
- **Conditional properties** (optional): Like all reactions, `setData` supports conditional execution using `when`, `is`, `isNot`, `isEmpty`, `contains`, `>`, `<`, `>=`, `<=`, `andConditions`, `orConditions`.

## Behavior

- When triggered by the specified event (`on`), `setData` evaluates the `value` property within the current context.
- It then updates the data at the location specified by `path`.
- If the `value` is an object or an array, it is deep-cloned before being set to prevent shared-state mutations.
- If the `path` does not exist, it will be created.

## Example

### Basic Usage

This example demonstrates how to use `setData` to change a text value when a button is clicked.

```yaml
renderView:
  - type: div
    content: "Current value: ~.myValue"
  - type: button
    content: "Set value to 'Hello World'"
    actions:
      - what: setData
        on: click
        path: ~.myValue
        value: "Hello World"
  - type: button
    content: "Set value to 'Another value'"
    attributes:
      style:
        marginLeft: 5px
    actions:
      - what: setData
        on: click
        path: ~.myValue
        value: "Another value"
data:
  myValue: "initial value"
```

### Conditional Usage

This example shows how to use conditions with `setData` to only execute when certain criteria are met.

```yaml
renderView:
  - type: TextField
    dataLocation: ~.username
    label: "Username:"
    placeholder: "Enter username"
  - type: button
    content: "Set Welcome Message"
    actions:
      - what: setData
        on: click
        path: ~.message
        value: ["Welcome, ", ~.username, "!"]
        when: ~.username
        isEmpty: "not"
      - what: setData
        on: click
        path: ~.message
        value: "Please enter a username first"
        when: ~.username
        isEmpty: true
  - type: div
    content: ~.message
    actions:
      - what: hide
        when: ~.message
        isEmpty: true

data:
  username: ""
  message: ""
```

## Limitations

- The `path` and `value` properties are mandatory for the reaction to have an effect.
- When conditions are not met, the reaction is skipped entirely. 