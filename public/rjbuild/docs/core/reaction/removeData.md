# Reaction: removeData

## Introduction

The `removeData` reaction deletes data from a specific location in the global data context. It is essential for dynamically managing lists, removing items, or clearing parts of the application state. It can operate in two modes: `path` mode (to target a specific data location) or `target` mode (to target the current template's data).

## Properties

- `what` (string, required): The name of the reaction, which must be `removeData`.
- `on` (string, required): The name of the event that triggers the reaction (e.g., `click`).
- `path` (string, optional): The target location in the data context to delete. Required if `target` is not used.
- `target` (string, optional): If set to `currentTemplateData`, the reaction will remove the data associated with the current template item.
- `parentLevel` (number, optional): Used with `target: 'currentTemplateData'`. Specifies how many levels to go up from the current data path before removing. `0` means the current level.

## Behavior

- When triggered, `removeData` deletes the data at the specified location.
- **Path Mode**: If `path` is provided, the data at that exact location is removed.
- **Target Mode**:
    - If `target` is `'currentTemplateData'`, the reaction targets the data of the component triggering the action.
    - `parentLevel` can be used to traverse up the data hierarchy. For example, in a list of items, `parentLevel: 0` would target the item itself, allowing for its deletion from the parent list/object.

## Examples

### 1. Using `path` to remove a specific key

This example shows how to delete a specific user profile field by clicking a button.

```yaml
renderView:
  - type: div
    content: "User email: ~.user.email"
  - type: button
    content: "Remove Email"
    actions:
      - what: removeData
        on: click
        path: ~.user.email
data:
  user:
    name: "John Doe"
    email: "john.doe@example.com"
```

### 2. Using `target` to remove an item from a list

This example shows a list of users where each user can be removed by clicking a "Remove" button next to their name. The reaction targets the current item in the iteration.

```yaml
renderView:
  - type: Switch
    content: ~.users
    singleOption:
      load: user_item
templates:
  user_item:
    type: div
    content:
      - ~.name
      - type: button
        content: "Remove"
        attributes: { style: "margin-left: 10px;" }
        actions:
          - what: removeData
            on: click
            target: currentTemplateData
            parentLevel: 0
data:
  users:
    - name: "Alice"
    - name: "Bob"
    - name: "Charlie"
```

## Limitations

- Either `path` or `target` must be provided for the reaction to work.
- In `target` mode, if `parentLevel` goes beyond the root of the data, the reaction will do nothing. 