# CheckBoxField

The `CheckBoxField` component provides checkbox and radio button groups with automatic data synchronization. It supports single selection (radio buttons or single checkbox), multiple selection (multiple checkboxes), and flexible data storage formats.

## Basic Syntax

```yaml
- type: CheckBoxField
  dataLocation: ~.preferences
  label: "Select your preferences:"
  options:
    - label: "Option 1"
      value: "opt1"
    - label: "Option 2"
      value: "opt2"
    - label: "Option 3"
      value: "opt3"
```

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context.
- `defaultFieldValue` (any, optional): Default value when no data is present.
- `label` (string or View props, optional): Field label text (supports template evaluation and View component rendering).
- `options` (array, optional): Static array of option objects, each with:
  - `label` (string, optional): Display text for the option (supports template evaluation).
  - `value` (any, required): Value stored when this option is selected.
  - `attributes` (object, optional): Attributes applied to the option's container div.
- `dynamicOptions` (string, optional): Template path to dynamic options array (e.g., `~.availableItems`). Takes precedence over `options` if both are provided.
- `controlType` (string, optional): Type of control - `"checkbox"` (default) or `"radio"`.
- `multiple` (boolean, optional): Whether multiple selections are allowed. Defaults to `true` if more than one option exists, `false` otherwise. For radio buttons, this is automatically `false`.
- `attributes` (object, optional): Attributes applied to the wrapper div (or container div if no wrapper).
- `inputAttributes` (object, optional): Attributes applied directly to each input element.
- `labelAttributes` (object, optional): Attributes applied to the main label (htmlFor is automatically managed).
- `forceWrapper` (boolean, optional): Forces the presence (true) or absence (false) of the wrapper div. If omitted, wrapper is automatic only if label is present.
- `actions` (array, optional): Actions to execute based on field state.

## Data Management

The component automatically synchronizes its value with the global data context. The data format depends on the selection mode:

- **Radio buttons**: Stores a single value (the selected option's value).
- **Single checkbox**: Stores a boolean (`true`) or the option's value when checked, `false` when unchecked.
- **Multiple checkboxes**: Stores an array of selected option values.

When `dataLocation` is used, the value is stored at the specified path. Without `dataLocation`, the value is stored in the template context using the component's `datafield`.

## Selection Modes

### Radio Buttons (Single Selection)

Radio buttons allow only one selection at a time. Set `controlType: "radio"`:

```yaml
- type: CheckBoxField
  dataLocation: ~.paymentMethod
  label: "Payment Method:"
  controlType: "radio"
  options:
    - label: "Credit Card"
      value: "credit"
    - label: "PayPal"
      value: "paypal"
    - label: "Bank Transfer"
      value: "bank"
```

**Data stored**: Single value (e.g., `"credit"`)

### Single Checkbox

A single checkbox stores a boolean or the option's value:

```yaml
- type: CheckBoxField
  dataLocation: ~.agreeToTerms
  label: "Terms and Conditions:"
  multiple: false
  options:
    - label: "I agree to the terms and conditions"
      value: true
```

**Data stored**: `true` when checked, `false` when unchecked (or the option's value if different from `true`)

### Multiple Checkboxes

Multiple checkboxes allow selecting several options simultaneously:

```yaml
- type: CheckBoxField
  dataLocation: ~.interests
  label: "Select your interests:"
  options:
    - label: "Technology"
      value: "tech"
    - label: "Sports"
      value: "sports"
    - label: "Music"
      value: "music"
```

**Data stored**: Array of selected values (e.g., `["tech", "music"]`)

## Wrapper Control

The component uses a flexible wrapper system similar to `Input`, adapting based on the presence of a label and the `forceWrapper` property.

### Default Behavior

When no `forceWrapper` is specified, the component automatically determines whether to use a wrapper div. If a label is present, the component wraps both the label and checkbox elements in a div container. If no label is present, the checkboxes are rendered in a container div without an outer wrapper.

### Explicit Control with `forceWrapper`

You can override the default behavior using the `forceWrapper` property. Setting `forceWrapper: true` will always create a wrapper div, even without a label. Setting `forceWrapper: false` will never create a wrapper, even when a label is present.

### HTML Output Examples

**With label (automatic wrapper):**
```html
<div>
  <label>Select options:</label>
  <div>
    <div>
      <input type="checkbox" id="checkbox-abc123-0" value="opt1" />
      <label htmlFor="checkbox-abc123-0">Option 1</label>
    </div>
    <div>
      <input type="checkbox" id="checkbox-abc123-1" value="opt2" />
      <label htmlFor="checkbox-abc123-1">Option 2</label>
    </div>
  </div>
</div>
```

**Without label (container div only):**
```html
<div>
  <div>
    <input type="checkbox" id="checkbox-xyz789-0" value="opt1" />
    <label htmlFor="checkbox-xyz789-0">Option 1</label>
  </div>
</div>
```

## Label Support

The `label` property supports both simple strings and View component rendering, allowing for dynamic and complex label content:

```yaml
- type: CheckBoxField
  dataLocation: ~.options
  label:
    type: div
    content:
      - "Select options ("
      - type: strong
        content: ~.requiredCount
      - " required):"
  options:
    - label: "Option 1"
      value: "opt1"
```

## Option Attributes

Each option can have its own attributes applied to its container div:

```yaml
- type: CheckBoxField
  dataLocation: ~.features
  options:
    - label: "Premium Feature"
      value: "premium"
      attributes:
        class: "premium-option"
        style:
          backgroundColor: "#ffd700"
    - label: "Standard Feature"
      value: "standard"
      attributes:
        class: "standard-option"
```

## ID Management

The component automatically generates unique IDs for each checkbox/radio button. If you provide an `id` in `inputAttributes`, it will be used as the base ID, and each option will have an index appended (e.g., `"my-id-0"`, `"my-id-1"`).

## Empty Options Handling

If `options` is empty or not an array, the component returns `null` and renders nothing. This is useful for conditional rendering scenarios.

## Examples

### Basic Checkbox Group

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.preferences
    label: "Select your preferences:"
    options:
      - label: "Email notifications"
        value: "email"
      - label: "SMS notifications"
        value: "sms"
      - label: "Push notifications"
        value: "push"

data:
  preferences: []
```

### Radio Button Group

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.size
    label: "Select size:"
    controlType: "radio"
    options:
      - label: "Small"
        value: "small"
      - label: "Medium"
        value: "medium"
      - label: "Large"
        value: "large"

data:
  size: ""
```

### Single Checkbox (Agreement)

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.agreeToTerms
    label: "Terms:"
    multiple: false
    options:
      - label: "I agree to the terms and conditions"
        value: true

data:
  agreeToTerms: false
```

### Custom Styling

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.categories
    label: "Select categories:"
    attributes:
      class: "checkbox-group"
      style:
        border: "1px solid #ccc"
        padding: "10px"
        borderRadius: "5px"
    inputAttributes:
      style:
        marginRight: "5px"
    labelAttributes:
      style:
        fontWeight: "bold"
        marginBottom: "10px"
    options:
      - label: "Category 1"
        value: "cat1"
      - label: "Category 2"
        value: "cat2"

data:
  categories: []
```

### Dynamic Options

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.selectedItems
    label: "Select items:"
    dynamicOptions: ~.availableItems

data:
  availableItems:
    - label: "Item 1"
      value: "item1"
    - label: "Item 2"
      value: "item2"
    - label: "Item 3"
      value: "item3"
  selectedItems: []
```

### With Actions

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.notifications
    label: "Notification preferences:"
    options:
      - label: "Email"
        value: "email"
      - label: "SMS"
        value: "sms"
    actions:
      - what: setData
        when: ~.notifications
        isArray: true
        path: ~.hasNotifications
        value: true

data:
  notifications: []
  hasNotifications: false
```

### Conditional Rendering

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.features
    label: "Select features:"
    dynamicOptions: ~.availableFeatures
    actions:
      - what: hide
        when: ~.availableFeatures
        isEmpty: true

data:
  availableFeatures:
    - label: "Feature A"
      value: "a"
    - label: "Feature B"
      value: "b"
  features: []
```

## Advantages

- **Flexible selection modes**: Supports radio buttons, single checkbox, and multiple checkboxes
- **Automatic data synchronization**: Values are automatically stored in the correct format
- **Dynamic options**: Options can be provided via template evaluation using `dynamicOptions`
- **Per-option customization**: Each option can have its own attributes
- **Label flexibility**: Supports both simple strings and View component rendering
- **Wrapper control**: Flexible wrapper system for styling control
- **Accessibility**: Automatic label association with htmlFor attributes
- **Empty state handling**: Gracefully handles empty options

## Limitations

- No built-in validation beyond HTML5 checkbox/radio validation
- No support for option grouping (use multiple CheckBoxField components)
- Styling must be provided via external CSS or style attributes
- Options must be provided as an array; empty arrays result in no rendering
- For radio buttons, `multiple` is automatically set to `false` regardless of the `multiple` property

