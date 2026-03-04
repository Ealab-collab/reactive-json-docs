# Join

The `Join` component concatenates an array of values into a single string, with a configurable separator. It is useful for displaying lists of scalar values (IDs, labels, tags, etc.) inline.

## Basic Syntax

```yaml
- type: Join
  content: ~~.myArray
  separator: ", "
```

## Properties

- `content` (array, required): The array to join. Supports template references such as `~~.myArray` or `~.items`. Non-array values are coerced to string and displayed as-is.
- `separator` (string, optional): The string used between each element. Defaults to `", "`.
- `attributes` (object, optional): Additional attributes for the root element.
- `actions` (array, optional): Actions to execute based on component state.

## Examples

### Basic join with default separator

```yaml
renderView:
  - type: Join
    content: ~~.tags

data:
  tags:
    - "react"
    - "yaml"
    - "json"
```

Renders: `react, yaml, json`

### Custom separator

```yaml
renderView:
  - type: Join
    content: ~~.ids
    separator: " | "

data:
  ids:
    - 1
    - 2
    - 3
```

Renders: `1 | 2 | 3`

### Used inside a sentence

```yaml
renderView:
  - type: p
    content:
      - "Selected items: "
      - type: Join
        content: ~~.selectedIds
        separator: ", "

data:
  selectedIds:
    - 42
    - 7
    - 15
```

### With template-scoped data

```yaml
renderView:
  - type: Switch
    content: ~~.users
    singleOption:
      load: userRow

templates:
  userRow:
    type: div
    content:
      - "Roles: "
      - type: Join
        content: ~.roles
        separator: " / "

data:
  users:
    - name: "Alice"
      roles: ["admin", "editor"]
    - name: "Bob"
      roles: ["viewer"]
```

## Notes

- If `content` evaluates to a non-array value, it is rendered as a plain string (no separator applied).
- Null or undefined `content` renders nothing.
- Array elements are joined using JavaScript's native `.join()`, so objects will render as `[object Object]`. Use this component with arrays of primitives (strings, numbers).

## Limitations

- No support for rendering rich content (HTML, components) between items — use `Switch` with a template for that.
- No per-item formatting; all elements are joined as plain strings.
