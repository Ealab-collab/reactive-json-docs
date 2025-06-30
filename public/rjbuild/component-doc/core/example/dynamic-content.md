# Dynamic Content Example

## Overview

This example demonstrates how to create a dynamic table interface with the following features:
- Search functionality
- Bulk selection/deselection
- Bulk deletion
- Pagination
- Row editing via modal dialogs

## Components Used

1. `DataFilter` - For search functionality
2. `TextField` - For search input
3. `BsButton` - For various actions
4. `Switch` - For dynamic content rendering
5. `PageControls` - For pagination
6. `Modal` - For edit dialogs
7. `CheckBoxField` - For row selection

## Example Structure

### Search and Bulk Actions
```yaml
renderView:
  - type: DataFilter
    context: global
    filters:
      - subjectsWithProperty: dynamicContentRow
        andConditions:
          - orConditions:
              - when: ~~._search
                isEmpty:
              - whenFilterableData: dynamicContentRow.title
                contains: ~~._search
```

### Search Input
```yaml
- type: TextField
  placeholder: Insert some text to search here...
  dataLocation: ~~._search
```

### Bulk Action Buttons
```yaml
- type: BsButton
  attributes:
    class: btn btn-link
  content: Select All
  actions:
    - what: postMessage
      on: click
      message:
        actor: select_all

- type: BsButton
  attributes:
    class: btn btn-link
  content: Unselect All
  actions:
    - what: postMessage
      on: click
      message:
        actor: unselect_all

- type: BsButton
  content: Bulk delete
  actions:
    - what: hide
      whenDataCountOf: $.rows[*][?(@.selected == true)]
      inContext: global
      is: 0
    - what: postMessage
      on: click
      message:
        actor: bulk_delete_selected
```

### Dynamic Table with Pagination
```yaml
- type: table
  attributes:
    class: table
  content:
    type: tbody
    content:
      - type: Switch
        content: ~~.rows
        paginated: true
        paginationProps:
          maxPageButtonsCount: 5
          pageMaxItemCount: 7
        options:
          dynamicContentRow:
            load: dynamicContentRow
        after:
          type: tr
          content:
            type: td
            attributes:
              colSpan: 3
            content:
              type: PageControls
```

### Row Template
```yaml
dynamicContentRow:
  type: tr
  actions:
    - what: removeData
      on: message
      whenMessageIs:
        actor: bulk_delete_selected
      when: ~.selected
      is: true
      target: currentTemplateData
      parentLevel: 1
  content:
    select:
      type: td
      content:
        type: CheckBoxField
        dataLocation: ~.selected
        options:
          - value: true
        actions:
          - what: setData
            path: ~.selected
            value: true
            on: message
            whenMessageIs:
              actor: select_all
          - what: setData
            path: ~.selected
            value: false
            on: message
            whenMessageIs:
              actor: unselect_all
```

### Edit Modal
```yaml
- type: Modal
  showBoolPath: ~._openEditModal
  headerTitle:
    - "Edit the content "
    - type: em
      content: ~.title
  body:
    - type: TextField
      dataLocation: ~.title
      label: Content title
    - type: BsButton
      content: OK
      actions:
        - what: setData
          on: click
          path: ~._openEditModal
```

## Key Features

1. **Search Functionality**
   - Real-time filtering of rows based on title
   - Empty search shows all rows

2. **Bulk Operations**
   - Select all rows
   - Unselect all rows
   - Delete selected rows
   - Bulk delete button visibility based on selection

3. **Pagination**
   - Configurable items per page
   - Maximum page buttons display
   - Navigation controls

4. **Row Operations**
   - Individual row selection
   - Edit modal for each row
   - Dynamic update of row content

5. **Data Management**
   - Global data context
   - Template-based row rendering
   - Dynamic data updates

## Implementation Notes

1. The example uses Bootstrap classes for styling
2. Messages are used for inter-component communication
3. Data paths use both global (~~) and local (~) contexts
4. Templates are used for reusable components
5. Modals are controlled via boolean data paths 