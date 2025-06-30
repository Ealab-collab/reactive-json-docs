# NumberField

The `NumberField` component renders a numeric input field using React Bootstrap. It provides a number-specific input with browser validation and automatic data binding to the global data context.

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context
- `defaultFieldValue` (number, optional): Default value when no data is present
- `label` (string, optional): Field label text (supports template evaluation)
- `placeholder` (string, optional): Placeholder text (supports template evaluation)
- `attributes` (object, optional): Attributes applied to the Form.Group container
- `inputAttributes` (object, optional): Attributes applied directly to the input element
- `actions` (array, optional): Actions to execute based on field state

## Data Management

The component stores the input value as a string in the data context. The browser's number input provides built-in validation, but the value should be converted to a number when needed for calculations.

## HTML5 Number Input Features

The component leverages HTML5 number input features:
- Automatic numeric keyboard on mobile devices
- Built-in validation for numeric values
- Support for min/max constraints
- Support for step increments
- Spinner controls for value adjustment

## Basic Example

```yaml
renderView:
  - type: NumberField
    dataLocation: ~.age
    label: "Age:"
    placeholder: "Enter your age"

data:
  age: ""
```

## Number Input with Constraints

```yaml
renderView:
  - type: NumberField
    dataLocation: ~.quantity
    label: "Quantity (1-100):"
    placeholder: "Enter quantity"
    inputAttributes:
      min: 1
      max: 100
      step: 1
  - type: NumberField
    dataLocation: ~.price
    label: "Price ($0.00-$999.99):"
    placeholder: "0.00"
    inputAttributes:
      min: 0
      max: 999.99
      step: 0.01

data:
  quantity: ""
  price: ""
```

## Advanced Validation Example

Use `inputAttributes` to set validation constraints:

```yaml
renderView:
  - type: NumberField
    dataLocation: ~.quantity
    label: "Quantity:"
    inputAttributes:
      min: 1
      max: 100
      step: 1
      required: true
  - type: NumberField
    dataLocation: ~.temperature
    label: "Temperature (°C):"
    inputAttributes:
      min: -273.15
      max: 1000
      step: 0.1

data:
  quantity: ""
  temperature: ""
```

## Complete Example

A comprehensive example showing different NumberField configurations:

```yaml
renderView:
  - type: NumberField
    dataLocation: ~.age
    label: "Age:"
    placeholder: "Enter your age"
    inputAttributes:
      min: 0
      max: 120
      step: 1
  - type: NumberField
    dataLocation: ~.price
    label: "Price ($):"
    placeholder: "0.00"
    inputAttributes:
      min: 0
      step: 0.01
  - type: div
    content:
      - "Age: "
      - ~.age
  - type: div
    content:
      - "Price: $"
      - ~.price

data:
  age: ""
  price: ""
```

## Limitations

- Values are stored as strings
- No built-in number formatting (thousands separators, currency)
- No built-in error message display for validation failures
- Browser validation behavior varies across different browsers
- No support for complex number patterns or custom validation rules
- No automatic locale-specific number formatting 