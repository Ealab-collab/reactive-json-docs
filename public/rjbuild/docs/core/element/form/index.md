# Form Elements

## Introduction

Form elements in Reactive-JSON provide interactive input components based on React Bootstrap. These components automatically manage state through the global data context and support template evaluation for dynamic content.

All form elements support:
- Dynamic data binding via `dataLocation` or automatic field naming
- Template evaluation for labels, placeholders, and options
- Action system integration for conditional logic
- React Bootstrap styling and attributes
- Automatic state synchronization with the global data context

## Available Components

- **TextField**: Single-line text input with customizable input types
- **NumberField**: Numeric input field with number-specific validation
- **TextAreaField**: Multi-line text input with configurable rows
- **SelectField**: Dropdown selection with static or dynamic options
- **CheckBoxField**: Checkbox/radio button groups with multiple selection modes
- **DateField**: Date and datetime input field (limited support)

## Common Properties

All form components share these common properties:

- `dataLocation` (string, optional): Path to bind the field value in the data context
- `defaultFieldValue` (any, optional): Default value when no data is present
- `label` (string, optional): Field label text (supports template evaluation)
- `attributes` (object, optional): Attributes applied to the Form.Group container
- `inputAttributes` (object, optional): Attributes applied directly to the input element
- `actions` (array, optional): Actions to execute based on field state

## Data Management

Form elements use two approaches for data management:

1. **Explicit data location**: Use `dataLocation` to specify exact path in global data
2. **Automatic field naming**: Use the component's `datafield` parameter for template-scoped data

The data is automatically synchronized with the global data context on user input changes.

## Limitations

- No built-in form validation beyond basic HTML5 validation
- No support for file upload inputs
- Limited date field support (only datetime-local type)
- No built-in error handling or validation messages
- No support for complex nested form structures
- No automatic form submission handling 