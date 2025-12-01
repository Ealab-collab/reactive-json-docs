# DataFilter Example: Filtering Direct Array Items

This example demonstrates how to use `DataFilter` with arrays where each item is a direct object (not wrapped in a namespace property). This is useful when working with data from APIs that return arrays of objects directly.

## Use Case

When your data structure is a direct array of objects like:
```yaml
data:
  rows:
    - id: 1
      label: "Operation 1"
      done: "done"
      operation: "create"
    - id: 2
      label: "Operation 2"
      done: "pending"
      operation: "update"
```

Instead of:
```yaml
data:
  rows:
    - item:
        id: 1
        label: "Operation 1"
```

## Solution

Use an existing property that is present in all items (like `id`) as the `subjectsWithProperty` namespace. In `whenFilterableData`, reference properties directly without the namespace prefix.

**Important**: When using string values for filtering (like status), use a special value like `"all"` to represent "no filter" instead of an empty string, as empty strings can cause issues with select elements.

## Complete Example

```yaml
renderView:
  - type: DataFilter
    context: global
    filters:
      - subjectsWithProperty: id
        andConditions:
          # Filter by status (string)
          - orConditions:
              - when: ~~._filters.done
                is: "all"
              - whenFilterableData: done
                is: ~~._filters.done
          
          # Filter by operation type (text search with contains)
          - orConditions:
              - when: ~~._filters.operation
                is: ""
              - andConditions:
                  - whenFilterableData: operation
                    isNotEmpty: true
                  - when: ~~._filters.operation
                    isNotEmpty: true
                  - whenFilterableData: operation
                    contains: ~~._filters.operation
          
          # Filter by label (text search with contains)
          - orConditions:
              - when: ~~._filters.label
                is: ""
              - andConditions:
                  - whenFilterableData: label
                    isNotEmpty: true
                  - when: ~~._filters.label
                    isNotEmpty: true
                  - whenFilterableData: label
                    contains: ~~._filters.label
    content:
      - type: Switch
        content: ~~.rows
        singleOption:
          load: operationRow

templates:
  operationRow:
    - type: tr
      content:
        - type: td
          content: ~.id
        - type: td
          content: ~.label
        - type: td
          content: ~.done
        - type: td
          content: ~.operation

data:
  rows:
    - id: 1
      label: "Operation 1"
      done: "done"
      operation: "create"
    - id: 2
      label: "Operation 2"
      done: "pending"
      operation: "update"
    - id: 3
      label: "Operation 3"
      done: "done"
      operation: "create"
  _filters:
    done: "all"
    label: ""
    operation: ""
```

## Key Points

1. **Namespace Selection**: Choose a property that exists in all items (e.g., `id`, `name`, `key`). This property acts as the identifier for DataFilter to recognize filterable items.

2. **Direct Property Access**: In `whenFilterableData`, reference properties directly:
   - ✅ `whenFilterableData: label` (correct)
   - ❌ `whenFilterableData: id.label` (incorrect - don't use namespace prefix)

3. **String-based Filtering**: When using select elements for filtering, use a special value like `"all"` to represent "no filter" instead of an empty string:
   ```yaml
   - orConditions:
       - when: ~~._filters.done
         is: "all"  # Shows all items
       - whenFilterableData: done
         is: ~~._filters.done  # Filters by exact match
   ```
   This avoids issues where select elements might not properly handle empty string values.

4. **Text Search**: For text search with `contains`, ensure both the filter value and the data property are not empty:
   ```yaml
   - orConditions:
       - when: ~~._filters.label
         is: ""  # Shows all when empty
       - andConditions:
           - whenFilterableData: label
             isNotEmpty: true
           - when: ~~._filters.label
             isNotEmpty: true
           - whenFilterableData: label
             contains: ~~._filters.label
   ```
   The `andConditions` wrapper ensures that both the data property and filter value are not empty before attempting the `contains` comparison.

5. **Template Access**: In templates, access properties directly without namespace:
   - ✅ `~.label`, `~.done`, `~.operation`
   - ❌ `~.id.label` (incorrect)

## Filter Types Demonstrated

- **Select Filter with "All" option**: Using `is: "all"` to show all items when a special "all" value is selected
- **Exact String Match**: Using `is` for exact string matching (e.g., status filtering)
- **Text Search**: Using `contains` for substring matching (case-insensitive) with proper empty checks

## Additional Template Techniques

**Conditional Display in Templates**: The example uses `hide` actions to conditionally display badges based on data values. This is a common pattern for showing different UI elements based on data state:

```yaml
- type: span
  content: "Done"
  actions:
    - what: hide
      when: ~.done
      isNot: "done"  # Hide if status is not "done"
- type: span
  content: "Pending"
  actions:
    - what: hide
      when: ~.done
      isNot: "pending"  # Hide if status is not "pending"
```

This technique is used in the example to display colored status badges, but it's not part of the DataFilter pattern itself - it's just a way to enhance the visual display of filtered data.

## Filter Patterns

### Pattern 1: Select Filter with "All" Option
```yaml
- orConditions:
    - when: ~~._filters.status
      is: "all"  # Special value for "show all"
    - whenFilterableData: status
      is: ~~._filters.status  # Exact match filter
```

### Pattern 2: Text Input Filter (Empty String Check)
```yaml
- orConditions:
    - when: ~~._filters.search
      is: ""  # Empty string means "show all"
    - andConditions:
        - whenFilterableData: searchField
          isNotEmpty: true
        - when: ~~._filters.search
          isNotEmpty: true
        - whenFilterableData: searchField
          contains: ~~._filters.search
```

## Notes

- The `subjectsWithProperty` value (`id` in this example) must exist in every item of the array
- DataFilter filters the data before rendering, so no `hide` actions are needed in templates
- All filter conditions use `orConditions` with an empty/"all" check first, allowing "show all" when filters are empty or set to "all"
- For select elements, prefer using a special value like `"all"` instead of empty strings to avoid UI issues
- For text inputs, empty strings (`""`) work fine for the "show all" condition
- When using `contains` for text search, always wrap the condition in `andConditions` with `isNotEmpty` checks to avoid errors with empty values

