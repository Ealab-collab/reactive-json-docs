# Editable Modal in Row Template

This guide demonstrates a pattern for creating editable modals within row templates, allowing users to edit individual items in a list without complex state management or custom handlers.

## Core Concept

By placing a modal inside a row template (using `Switch`), each row gets its own modal instance with direct access to the row's data via the `~.` notation. This simplifies data flow and eliminates the need for complex index tracking or custom save handlers.

## Key Benefits

1. **Simplified data access**: Modal has direct access to row data via `~.` notation
2. **No index tracking**: No need to find array indices or store file IDs
3. **Automatic isolation**: Each row's modal is isolated from others
4. **Simple save pattern**: Use basic `setData` reactions to copy editable values back to originals

## Prerequisites

Before implementing this pattern, you need:

1. **A Reactive-JSON Modal component**: This pattern requires a Modal component implementation that supports:
   - `showBoolPath` property (or equivalent) to control visibility via data path
   - `headerTitle` property for the modal header
   - `body` property for the modal content
   - Integration with Reactive-JSON's action system

You can use a custom Modal component or one from an integration package (like `@ea-lab/reactive-json-bootstrap`), but it must be compatible with Reactive-JSON's component system.

## Pattern Structure

### 1. Modal Inside Row Template

Place the modal component inside your row template so each rendered row has its own modal instance:

```yaml
templates:
  itemRow:
    - type: tr
      content:
        # Row content (cells, buttons, etc.)
        - type: button
          content: "Edit"
          actions:
            - what: setData
              on: click
              path: ~.showModal
              value: true
        
        # Modal inside the row
        - type: ReactiveJsonSubroot
          sharedUpdates: true
          rjOptions:
            rjBuildUrl: "/components/EditModal.yaml"
            dataOverride:
              showModal: ~.showModal
              # ... other data
```

### 2. Separate Editable Values

Use separate fields for editable copies and original values:

```yaml
dataOverride:
  # Original values (read-only display)
  id: ~.id
  name: ~.name
  
  # Editable copies (for form fields)
  editable_name: ~.editable.name
  editable_description: ~.editable.description
  
  # Original values (for saving back)
  name: ~.name
  description: ~.description
```

### 3. Initialize Editable Values

When opening the modal, copy original values to editable fields:

```yaml
- type: button
  content: "Edit"
  actions:
    - what: setData
      on: click
      path: ~.editable.name
      value: ~.name
    - what: setData
      on: click
      path: ~.editable.description
      value: ~.description
    - what: setData
      on: click
      path: ~.showModal
      value: true
```

### 4. Save Pattern

Use simple `setData` reactions to copy editable values back to originals:

```yaml
- type: button
  content: "Save"
  actions:
    - what: setData
      on: click
      path: ~.name
      value: ~.editable_name
    - what: setData
      on: click
      path: ~.description
      value: ~.editable_description
    - what: setData
      on: click
      path: ~.showModal
      value: false
```

## Complete Example

### Parent Component (Table with Rows)

```yaml
renderView:
  - type: table
    content:
      - type: tbody
        content:
          - type: Switch
            content: ~~.items
            singleOption:
              load: itemRow

templates:
  itemRow:
    - type: tr
      content:
        - type: td
          content: ~.name
        - type: td
          content:
            - type: button
              content: "Edit"
              actions:
                - what: setData
                  on: click
                  path: ~.editable.name
                  value: ~.name
                - what: setData
                  on: click
                  path: ~.editable.description
                  value: ~.description
                - what: setData
                  on: click
                  path: ~.showModal
                  value: true
        
        # Modal inside the row
        - type: ReactiveJsonSubroot
          sharedUpdates: true
          rjOptions:
            rjBuildUrl: "/components/EditModal.yaml"
            dataOverride:
              showModal: ~.showModal
              id: ~.id
              name: ~.name
              editable_name: ~.editable.name
              editable_description: ~.editable.description
              name: ~.name
              description: ~.description

data:
  items:
    - id: 1
      name: "Item 1"
      description: "Description 1"
      showModal: false
      editable:
        name: ""
        description: ""
```

### Modal Component (`/components/EditModal.yaml`)

```yaml
renderView:
  - type: Modal
    showBoolPath: ~.showModal
    headerTitle: "Edit Item"
    body:
      - type: TextField
        label: "Name:"
        dataLocation: ~.editable_name
      - type: TextAreaField
        label: "Description:"
        dataLocation: ~.editable_description
        rows: 3
    footer:
      - type: button
        content: "Cancel"
        actions:
          - what: setData
            on: click
            path: ~.showModal
            value: false
      - type: button
        content: "Save"
        actions:
          - what: setData
            on: click
            path: ~.name
            value: ~.editable_name
          - what: setData
            on: click
            path: ~.description
            value: ~.editable_description
          - what: setData
            on: click
            path: ~.showModal
            value: false

data:
  showModal: false
  id: ""
  name: ""
  editable_name: ""
  editable_description: ""
  description: ""
```

## How It Works

1. **Row Context**: Each row rendered by `Switch` has its own template context, accessible via `~.`
2. **Modal Access**: The modal inside the row inherits this context, so `~.name` refers to the current row's name
3. **Editable Copies**: Form fields bind to `~.editable_name` (or `~.editable.name`), keeping edits separate from originals
4. **Save Action**: When saving, `setData` with `path: ~.name` and `value: ~.editable_name` copies the edited value back to the original
5. **Shared Updates**: With `sharedUpdates: true`, changes to `~.name` in the modal propagate back to the row's data

## Advantages Over Alternative Approaches

### ❌ Complex Approach (Not Recommended)
- Store file index globally
- Use custom handlers to find and update array items
- Requires complex path construction with array indices

### ✅ Simple Approach (This Pattern)
- Modal is in row context - direct access via `~.`
- No index tracking needed
- Simple `setData` actions copy values back
- Works seamlessly with `sharedUpdates`

## Best Practices

1. **Use `sharedUpdates: true`**: Enables automatic data synchronization between modal and row
2. **Separate editable fields**: Keep editable copies separate from originals for clean cancel behavior
3. **Initialize on open**: Copy original values to editable fields when opening the modal
4. **Simple save pattern**: Use straightforward `setData` actions to copy editable values back
5. **Row-scoped modals**: Place modals inside row templates to leverage template context

## Use Cases

- **Data tables**: Edit individual rows without affecting others
- **List items**: Modify properties of items in a list
- **Card grids**: Edit cards in a grid layout
- **Nested data**: Edit nested objects within arrays

## Limitations

- Each row renders its own modal instance (may impact performance with very large lists)
- Modal state is tied to row data (if row is removed, modal state is lost)
- Not suitable for modals that need to persist across row re-renders

## Related Patterns

- **ReactiveJsonSubroot**: Component used to embed the modal
- **Switch**: Component used to render rows with templates
- **setData**: Reaction used to save edited values
- **sharedUpdates**: Feature enabling bidirectional data sync

