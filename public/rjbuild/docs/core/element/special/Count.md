# Count

The `Count` component returns the number of items matching a JSONPath pattern in the data context. It is useful for displaying counts of elements, such as the number of items in a list, matching a filter, or present in a subtree.

## Properties
- `jsonPathPattern` (string, required): The JSONPath pattern to evaluate for counting.
- `context` (string, optional): The context to use for evaluation (`global`, `template`, or `root`). Default is `global`.

## Behavior
- Evaluates the given JSONPath pattern on the selected data context.
- Returns the number of matches found.
- If `context` is `global`, uses the global data context; if `template`, uses the template context; if `root`, uses the root context.
- If `jsonPathPattern` is not provided, renders nothing.

## Example
```yaml
renderView:
  - type: div
    content:
      - type: strong
        content: "Number of users: "
      - type: Count
        jsonPathPattern: "$.users[*]"

data:
  users:
    - name: "Alice"
    - name: "Bob"
    - name: "Charlie"
```

## Limitations
- Only supports JSONPath patterns.
- Returns 0 if no match or if the pattern is invalid.
- Does not support advanced filtering or custom functions in JSONPath.