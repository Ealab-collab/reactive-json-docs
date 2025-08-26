# TextAreaField

The `TextAreaField` component renders a multi-line text input field using React Bootstrap. It provides a resizable textarea for longer text content with automatic data binding to the global data context.

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context.
- `defaultFieldValue` (string, optional): Default value when no data is present.
- `label` (string, optional): Field label text (supports template evaluation).
- `placeholder` (string, optional): Placeholder text (supports template evaluation).
- `rows` (number, optional): Number of visible text lines (default: 3).
- `attributes` (object, optional): Attributes applied to the Form.Group container.
- `inputAttributes` (object, optional): Attributes applied directly to the textarea element.
- `actions` (array, optional): Actions to execute based on field state.

## Data Management

The component automatically synchronizes its value with the global data context. When using `dataLocation`, the value is stored at the specified path. Without `dataLocation`, the value is stored in the template context using the component's `datafield`.

## Textarea Features

The component provides standard HTML textarea functionality:
- Multi-line text input
- Automatic line breaks and wrapping
- Resizable by default (can be controlled via CSS)
- Character counting support via attributes
- Scrollable content when exceeding visible area

## Basic Example

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.comments
    label: "Comments:"
    placeholder: "Enter your comments here..."
    rows: 4

data:
  comments: ""
```

## Character Limiter

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.feedback
    label: "Feedback (max 200 characters):"
    placeholder: "Your feedback..."
    rows: 4
    inputAttributes:
      maxLength: 200

data:
  feedback: ""
```

## Custom Styling

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.code
    label: "Code Snippet:"
    placeholder: "Enter your code here..."
    rows: 6
    inputAttributes:
      style:
        fontFamily: "monospace"
        fontSize: "14px"
        backgroundColor: "#f8f9fa"
        border: "1px solid #ced4da"
        resize: "vertical"
      spellCheck: false
  - type: TextAreaField
    dataLocation: ~.poetry
    label: "Poetry (no resize):"
    placeholder: "Write your poem..."
    rows: 4
    inputAttributes:
      style:
        fontStyle: "italic"
        resize: "none"
        backgroundColor: "#fff8dc"

data:
  code: ""
  poetry: ""
```

## Complete Example

A comprehensive example showing different TextAreaField configurations:

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.comments
    label: "Comments:"
    placeholder: "Enter your comments here..."
    rows: 4
    inputAttributes:
      maxLength: 500
  - type: TextAreaField
    dataLocation: ~.description
    label: "Product Description:"
    placeholder: "Describe the product features..."
    rows: 6
    inputAttributes:
      style:
        resize: "vertical"
  - type: div
    content:
      - "Comments: "
      - ~.comments
  - type: div
    content:
      - "Description: "
      - ~.description

data:
  comments: ""
  description: ""
```

## Limitations

- No built-in rich text editing capabilities
- No automatic text formatting or markdown support
- No built-in character counting display
- No built-in validation beyond HTML5 attributes
- No support for auto-resizing based on content
- No built-in spell checking configuration options 