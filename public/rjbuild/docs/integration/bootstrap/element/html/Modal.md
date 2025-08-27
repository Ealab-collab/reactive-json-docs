# Modal

The `Modal` component provides Bootstrap modal dialogs for displaying focused content, forms, or confirmations. It supports dynamic content and integrates with Reactive-JSON's action system for show/hide functionality.

## Properties

- `show` (boolean, required): Controls whether the modal is visible
- `onHide` (reaction, optional): Reaction to execute when modal is closed
- `size` (string, optional): Modal size (`sm`, `lg`, `xl`)
- `centered` (boolean, optional): Whether to center the modal vertically
- `backdrop` (boolean/string, optional): Whether to show backdrop or allow backdrop click to close
- `header` (component, optional): Modal header content
- `body` (component, optional): Modal body content
- `footer` (component, optional): Modal footer content
- `attributes` (object, optional): Additional HTML attributes
- `actions` (array, optional): Actions to execute based on modal state

## Basic Example

```yaml
renderView:
  - type: button
    content: "Open Modal"
    actions:
      - what: setData
        on: click
        path: ~.showModal
        value: true

  - type: Modal
    show: ~.showModal
    onHide:
      - what: setData
        path: ~.showModal
        value: false
    header: "Modal Title"
    body: "This is the modal content."
    footer:
      - type: button
        content: "Close"
        actions:
          - what: setData
            on: click
            path: ~.showModal
            value: false

data:
  showModal: false
```

## Form Modal Example

```yaml
renderView:
  - type: button
    content: "Add User"
    actions:
      - what: setData
        on: click
        path: ~.showUserForm
        value: true

  - type: Modal
    show: ~.showUserForm
    size: "lg"
    centered: true
    onHide:
      - what: setData
        path: ~.showUserForm
        value: false
    header: "Add New User"
    body:
      - type: TextField
        label: "Name:"
        dataLocation: ~.newUser.name
      - type: TextField
        label: "Email:"
        dataLocation: ~.newUser.email
        inputType: "email"
    footer:
      - type: button
        content: "Cancel"
        actions:
          - what: setData
            on: click
            path: ~.showUserForm
            value: false
      - type: button
        content: "Save User"
        actions:
          - what: addData
            on: click
            path: ~.users
            value: ~.newUser
          - what: setData
            path: ~.showUserForm
            value: false
          - what: setData
            path: ~.newUser
            value: {}

data:
  showUserForm: false
  newUser: {}
  users: []
```



## Modal Sizes

- `sm`: Small modal
- Default: Standard modal width
- `lg`: Large modal
- `xl`: Extra large modal

## Limitations

- Modal visibility must be controlled through data state
- Complex animations beyond Bootstrap defaults are not supported
- Modal stacking (modal over modal) should be avoided

## Requirements

- Bootstrap CSS must be imported
- `@ea-lab/reactive-json-bootstrap` plugin must be installed and configured
- React-Bootstrap dependencies must be available
