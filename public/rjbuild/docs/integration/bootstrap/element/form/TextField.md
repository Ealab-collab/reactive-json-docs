# TextField

The `TextField` component renders a single-line text input field using React Bootstrap. It supports various input types, template evaluation for dynamic content, and automatic data binding to the global data context.

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context.
- `defaultFieldValue` (string, optional): Default value when no data is present.
- `label` (string, optional): Field label text (supports template evaluation).
- `placeholder` (string, optional): Placeholder text (supports template evaluation).
- `inputType` (string, optional): HTML input type (default: "text", supports template evaluation).
- `attributes` (object, optional): Attributes applied to the Form.Group container.
- `inputAttributes` (object, optional): Attributes applied directly to the input element.
- `actions` (array, optional): Actions to execute based on field state.

## Data Management

The component automatically synchronizes its value with the global data context. When using `dataLocation`, the value is stored at the specified path. Without `dataLocation`, the value is stored in the template context using the component's `datafield`.

## Input Types

The `inputType` property supports all HTML5 input types:
- `text` (default): Standard text input
- `email`: Email validation
- `password`: Masked password input
- `url`: URL validation
- `tel`: Telephone number input
- `search`: Search input with clear button

## Basic Example

```yaml
renderView:
  - type: TextField
    dataLocation: ~.username
    label: "Username:"
    placeholder: "Enter your username"

data:
  username: ""
```

## Different Input Types

```yaml
renderView:
  - type: TextField
    dataLocation: ~.email
    label: "Email:"
    placeholder: "user@example.com"
    inputType: "email"
  - type: TextField
    dataLocation: ~.password
    label: "Password:"
    placeholder: "Enter password"
    inputType: "password"
  - type: TextField
    dataLocation: ~.website
    label: "Website:"
    placeholder: "https://example.com"
    inputType: "url"

data:
  email: ""
  password: ""
  website: ""
```

## Input Attributes

```yaml
renderView:
  - type: TextField
    dataLocation: ~.productCode
    label: "Product Code:"
    placeholder: "ABC-123"
    inputAttributes:
      pattern: "[A-Z]{3}-[0-9]{3}"
      title: "Format: ABC-123 (3 letters, dash, 3 numbers)"
      maxLength: 7
      style:
        textTransform: "uppercase"

data:
  productCode: ""
```

## Complete Example

A comprehensive example showing different TextField configurations:

```yaml
renderView:
  - type: TextField
    dataLocation: ~.username
    label: "Username:"
    placeholder: "Enter your username"
    inputType: "text"
    inputAttributes:
      maxLength: 50
      autoComplete: "username"
  - type: TextField
    dataLocation: ~.email
    label: "Email Address:"
    placeholder: "user@example.com"
    inputType: "email"
    inputAttributes:
      required: true
  - type: div
    content:
      - "Username: "
      - ~.username
  - type: div
    content:
      - "Email: "
      - ~.email

data:
  username: ""
  email: ""
```

## Limitations

- No built-in validation beyond HTML5 input type validation
- No support for input masking or formatting
- No built-in error message display
- Template evaluation for `inputType` should return valid HTML input types
- No support for complex input patterns beyond HTML5 pattern attribute 