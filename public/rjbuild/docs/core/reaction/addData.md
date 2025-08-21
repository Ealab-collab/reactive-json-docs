# addData

`addData` is a reaction that allows adding data at a specified path in the application's data context. It's particularly useful for appending new items to arrays or adding new properties to objects.

## Properties
- `path` (string, required): The location where the data should be added (using template path syntax with `~` or `~~`). If the path does not exist, it will be created automatically.
- `value` (any, optional): The data to add. Can be any valid JSON value (string, number, object, array).

## Behavior
- If the path doesn't exist, it will be created automatically
- For arrays, the value is appended to the end
- For objects, the value must be an object with a single key
- The operation is atomic and synchronous

## Data Management
The value is evaluated using the template system before being added.

### Adding to Arrays
If the target path is an array, the value is appended to the end of the array. The value can be a string, number, object, or array.

### Adding to Objects
If the target path is an object, the value must be an object with a single key. The key will be used as the new property name, and the value as its value.

Example:
```yaml
actions:
  - what: addData
    on: click
    path: ~.user
    value:
      role: "admin"  # Adds a new property 'role' to the user object
```

## Complete Examples

### Adding to an Array
```yaml
renderView:
  - type: button
    content: Add Item
    actions:
      - what: addData
        on: click
        path: ~.items
        value: "New Item"

data:
  items: ["Item 1", "Item 2"]
```

### Adding to an Object
```yaml
renderView:
  - type: button
    content: Add Property
    actions:
      - what: addData
        on: click
        path: ~.user
        value:
          role: "admin"

data:
  user:
    name: "John"
    email: "john@example.com"
```

### Adding with Dynamic Values
```yaml
renderView:
  - type: TextField
    label: "New Item"
    dataLocation: ~.new_item
  - type: button
    content: Add
    actions:
      - what: addData
        on: click
        path: ~.items
        value: ~.new_item
        when: ~.new_item
        isEmpty: not

data:
  items: []
  new_item: ""
```

## Limitations
- Cannot add data to non-object/non-array paths
- The path must be valid according to the template system rules
- The value must be serializable
- For objects, the value must be an object with a single key 