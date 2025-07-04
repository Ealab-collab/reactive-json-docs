# DataFilter

## Introduction

The `DataFilter` component allows you to filter data from the global or template context before rendering its content. It is particularly useful for conditional display of elements based on dynamic complex criteria, such as filtering lists, trees, or data subsets.

## Properties
- `filters` (array, required): Array of filter objects, each specifying properties and conditions to check
  - `subjectsWithProperty` (string): Property to check in the data, acts as namespace
  - `andConditions` (array): List of conditions that must all be true
  - `orConditions` (array): List of conditions where at least one must be true
  - Available conditions:
    - `when`: Checks a condition on a value
    - `is`: Compares exact equality
    - `isNot`: Checks inequality
    - `isEmpty`: Checks if a value is empty
    - `contains`: Checks if a value contains a substring
    - `>=`, `<=`, `>`, `<`: Numeric comparisons
    - `compareAsDates`: Boolean to compare values as dates
    - `whenFilterableData`: Specifies the data path to filter, must include the namespace
- `context` (string, optional): Context to filter (`global` or `template`). Default: `global`
- `content` (object/array, required): Content to render after filtering

## Behavior
- Applies all filters to the selected context before content rendering
- Supports complex filtering conditions with `andConditions` and `orConditions`
- Allows recursive filtering while preserving data structure
- Can be combined with other components to create interactive filtering interfaces
- Supports dynamic filtering based on application state

## Filterable Data Structure

DataFilter uses a specific pattern to identify and filter data. This pattern relies on an identification key (namespace) that must be consistent between the data structure and filtering conditions.

### Namespace Pattern

1. **In the data structure**:
```yaml
data:
  filteredItems:
    - item:           # <- Identification key (namespace)
        id: 1
        title: "..."
    - item:           # <- Same key for each item
        id: 2
        title: "..."
```

2. **In filtering conditions**:
```yaml
type: DataFilter
context: global
filters:
  - subjectsWithProperty: item    # <- Declares the namespace
    andConditions:
      - orConditions:
          - whenFilterableData: item.title  # <- Uses the namespace
            contains: "..."
```

The identification key (here "item"):
- Can have any name (`itemXyz`, `element`, etc.)
- Must be consistent between data structure and conditions
- Serves as a namespace for accessing properties in `whenFilterableData`
- Is required for DataFilter to correctly identify filterable elements

## Example

```yaml
renderView:
  - type: DataFilter
    context: global
    filters:
      - subjectsWithProperty: item
        andConditions:
          # Text search filter
          - orConditions:
              - when: ~~._filters.search
                isEmpty:
              - whenFilterableData: item.searchableContent
                contains: ~~._filters.search

          # Date filter
          - orConditions:
              - when: ~~._filters.since
                isEmpty:
              - whenFilterableData: item.creationDate
                ">=": ~~._filters.since
                compareAsDates: true

          # Status filter
          - orConditions:
              - when: ~~._filters.status
                isNot: active_only
              - whenFilterableData: item.status
                is: active

    content:
      - type: Switch
        content: ~~.filteredItems
        singleOption:
          - type: div
            content:
              - type: span
                content: ~.item.searchableContent
              - type: span
                attributes:
                  class: "badge"
                content: ~.item.status

data:
  _filters:
    search: ""
    since: ""
    status: "all"
  filteredItems:
    - item:
        id: 1
        searchableContent: "First item"
        status: "active"
        creationDate: "2024-03-20"
    - item:
        id: 2
        searchableContent: "Second item"
        status: "inactive"
        creationDate: "2024-03-19"
```

## Advanced Use Cases
- Multi-criteria filtering with combined conditions
- Real-time search interface
- Hierarchical data filtering (trees, sub-elements)
- Complex state management (conflicts, modifications, new elements)
- Integration with pagination components
- Date-based filtering and numeric comparisons

## Best Practices
- Organize filters by logical category
- Use comments to document complex conditions
- Combine with UI components for interactive experience
- Consider performance with large datasets
- Use reusable templates for common filters
- Use consistent namespace patterns across your application

## Limitations
- Filtering is based on simple comparisons
- Performance may be impacted with very large datasets
- Does not support custom filtering functions
- Filtering is applied recursively on the entire structure 