# Bulk Actions System

This guide demonstrates how to implement a bulk action system that allows users to select multiple items in a list and perform actions on all selected items simultaneously. This pattern is commonly used in data tables, file managers, and admin interfaces.

## Core Concept

The bulk action system uses a combination of:
- **Selection state**: Track which items are selected using checkboxes
- **Data attributes**: Mark selected rows in the DOM for CSS selector targeting
- **Event delegation**: Use `triggerEvent` to programmatically trigger actions on multiple elements
- **Conditional actions**: Ensure actions only execute on selected items

## Concepts We Will Use

This pattern leverages several Reactive-JSON features:

- **[Switch Component](../element/special/Switch.md)**: Iterate over a collection of items and render each with a template
- **[SetAttributeValue Action](../action/Attribute/SetAttributeValue.md)**: Dynamically set HTML attributes (like `data-selected`) based on data state
- **[triggerEvent Reaction](../reaction/triggerEvent.md)**: Programmatically dispatch events on multiple elements matching a CSS selector
- **[Template Contexts](../getting-started/template-contexts-data-binding.md)**: Use `~.` for row-scoped data and `~~.` for global data
- **[Conditional Actions](../getting-started/actions.md)**: Use `when` conditions to control when actions execute

## Prerequisites

Before implementing bulk actions, you should understand:

1. **Template system**: How `Switch` renders items using templates
2. **Data binding**: The difference between `~.` (local template context) and `~~.` (global context)
3. **Actions and reactions**: How to define actions that respond to user interactions
4. **CSS selectors**: Basic understanding of attribute selectors like `[data-selected="true"]`

## Steps

### Step 1: Set Up Selection State

Add a `selected` property to each item in your data array and a global `bulkAction` variable:

```yaml
data:
  items: []
  bulkAction: ""
```

Each item in the array should have a `selected` boolean property (can be initialized as `false` or added dynamically).

### Step 2: Add Selection Checkboxes

Add checkboxes to each row to allow users to select individual items:

```yaml
templates:
  itemRow:
    - type: tr
      content:
        - type: td
          content:
            - type: CheckBoxField
              dataLocation: ~.selected
              defaultFieldValue: false
              options:
                - label: ""
                  value: true
```

### Step 3: Mark Selected Rows with Data Attributes

Use `setAttributeValue` action to add a `data-selected` attribute to rows when they are selected. This allows CSS selectors to target selected rows:

```yaml
templates:
  itemRow:
    - type: tr
      actions:
        - what: setAttributeValue
          name: "data-selected"
          value: "true"
          mode: "replace"
          when: ~.selected
          is: true
      content:
        # ... row content
```

**Important**: Use `mode: "replace"` to ensure the attribute is removed when `selected` becomes `false`. You may also want to add an action to remove the attribute when not selected.

### Step 4: Add Action Buttons with Data Attributes

Add `data-action` attributes to action buttons so they can be targeted by CSS selectors:

```yaml
- type: button
  attributes:
    data-action: "process"
    type: "button"
  content: "Process"
  actions:
    - what: submitData
      on: click
      # ... action configuration
```

### Step 5: Create Bulk Action Controls

Add a bulk action selector and execute button in your main view:

```yaml
renderView:
  - type: SelectField
    dataLocation: ~~.bulkAction
    defaultFieldValue: ""
    options:
      - value: ""
        label: "-- Choose action --"
      - value: "process"
        label: "Process selected items"
  
  - type: button
    content: "Execute"
    actions:
      - what: hide
        when: ~~.bulkAction
        isEmpty: true
      - what: triggerEvent
        on: click
        eventName: "click"
        selector: "tr[data-selected=\"true\"] button[data-action=\"process\"]"
```

### Step 6: Add Safety Conditions

Add conditions to prevent actions from executing on items that shouldn't be processed:

```yaml
- type: button
  attributes:
    data-action: "process"
  actions:
    - what: hide
      when: ~.status
      is: "processed"  # Hide button if already processed
    - what: submitData
      on: click
      # ... only executes if button is visible
```

## Complete Example

Here's a complete example of a file management table with bulk processing:

```yaml
renderView:
  - type: table
    content:
      - type: tbody
        content:
          - type: Switch
            content: ~~.files
            singleOption:
              load: fileRow
  
  # Bulk action controls
  - type: div
    content:
      - type: SelectField
        dataLocation: ~~.bulkAction
        defaultFieldValue: ""
        options:
          - value: ""
            label: "-- Choose action --"
          - value: "process"
            label: "Process selected files"
      
      - type: button
        content: "Execute"
        actions:
          - what: hide
            when: ~~.bulkAction
            isEmpty: true
          - what: triggerEvent
            on: click
            eventName: "click"
            selector: "tr[data-selected=\"true\"] button[data-action=\"process\"]"

templates:
  fileRow:
    - type: tr
      actions:
        - what: setAttributeValue
          name: "data-selected"
          value: "true"
          mode: "replace"
          when: ~.selected
          is: true
        - what: setAttributeValue
          name: "data-selected"
          value: "false"
          mode: "replace"
          when: ~.selected
          isNot: true
      content:
        # Checkbox column
        - type: td
          content:
            - type: CheckBoxField
              dataLocation: ~.selected
              defaultFieldValue: false
              options:
                - label: ""
                  value: true
        
        # File name column
        - type: td
          content: ~.name
        
        # Status column
        - type: td
          content: ~.status
        
        # Actions column
        - type: td
          content:
            - type: button
              attributes:
                data-action: "process"
                type: "button"
              content: "Process"
              actions:
                - what: hide
                  when: ~.status
                  is: "processed"
                - what: setData
                  on: click
                  path: ~.status
                  value: "processing"
                - what: submitData
                  on: click
                  url: "https://api.example.com/process?id=~.id"
                  httpMethod: "post"
                  allowConcurrent: true
                  dataMapping:
                    simpleMapping:
                      stringMap:
                        "~.status":
                          value: "processed"

data:
  files:
    - id: "file1"
      name: "document.pdf"
      status: "pending"
      selected: false
    - id: "file2"
      name: "image.jpg"
      status: "pending"
      selected: false
  bulkAction: ""
```

## How It Works

1. **Selection**: Users check boxes to set `~.selected` to `true` for individual items
2. **Attribute marking**: `setAttributeValue` adds `data-selected="true"` to selected rows
3. **Bulk trigger**: When "Execute" is clicked, `triggerEvent` finds all `tr[data-selected="true"]` rows
4. **Action execution**: Within each selected row, it finds `button[data-action="process"]` and triggers a `click` event
5. **Individual processing**: Each button's `on: click` reactions execute, processing that specific item

## Go Further

### Select All Functionality

Add a "Select All" checkbox in the table header:

```yaml
- type: th
  content:
    - type: CheckBoxField
      dataLocation: ~~.selectAll
      defaultFieldValue: false
      options:
        - label: ""
          value: true
      actions:
        - what: setData
          on: change
          path: ~.selected
          value: ~~.selectAll
          # This would need to be in each row template
```

### Multiple Action Types

Support multiple bulk actions by using different `data-action` values:

```yaml
- type: SelectField
  dataLocation: ~~.bulkAction
  options:
    - value: "process"
      label: "Process"
    - value: "delete"
      label: "Delete"
    - value: "archive"
      label: "Archive"

# In triggerEvent, dynamically construct selector:
- what: triggerEvent
  on: click
  eventName: "click"
  selector: ["tr[data-selected=\"true\"] button[data-action=\"", ~~.bulkAction, "\"]"]
```

### Visual Feedback

Add visual indicators for selected rows using CSS:

```yaml
- type: tr
  attributes:
    class: "bg-white border-b"
  actions:
    - what: setAttributeValue
      name: "class"
      value: "bg-blue-100"
      mode: "append"
      when: ~.selected
      is: true
```

### Prevent Double Processing

Add conditions to prevent processing items that are already being processed:

```yaml
- type: button
  attributes:
    data-action: "process"
  actions:
    - what: hide
      when: ~.status
      is: "processing"
    - what: hide
      when: ~.status
      is: "processed"
    # Actions only execute if button is visible
```

### Count Selected Items

Display the number of selected items:

```yaml
- type: div
  content:
    - "Selected: "
    - type: Count
      jsonPathPattern: "$.files[?(@.selected == true)]"
```

## Additional Notes

### Performance Considerations

- **Concurrent requests**: Use `allowConcurrent: true` in `submitData` to process multiple items simultaneously
- **Selector efficiency**: More specific selectors (like `tr[data-selected="true"]`) are faster than broad selectors
- **Event delegation**: `triggerEvent` dispatches events sequentially using Promises to ensure reliability

### Accessibility

- Ensure checkboxes have proper labels
- Use ARIA attributes for screen readers:
  ```yaml
  - what: setAttributeValue
    name: "aria-selected"
    value: "true"
    when: ~.selected
    is: true
  ```

### Error Handling

Consider adding error handling for failed bulk operations:

```yaml
- what: submitData
  on: click
  # ... submit configuration
  onError:
    - what: setData
      path: ~.status
      value: "error"
```

### Alternative Approaches

- **Message-based**: Use `postMessage` and `on: message` reactions (more complex but allows cross-component communication)
- **Custom handlers**: Create a custom React component to handle bulk operations (more control but requires JavaScript)

### Best Practices

1. **Always use `mode: "replace"`** for `setAttributeValue` when toggling boolean attributes to ensure clean state
2. **Use specific selectors** to avoid unintended side effects
3. **Add safety conditions** to prevent actions on inappropriate items
4. **Provide visual feedback** so users know which items are selected
5. **Test with multiple selections** to ensure concurrent operations work correctly

