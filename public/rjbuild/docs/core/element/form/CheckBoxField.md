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
  - `value` (any, required): Value stored when this option is selected (supports template evaluation, like `label`).
  - `attributes` (object, optional): Attributes applied to the option's container div.
- `dynamicOptions` (string, optional): Template path to dynamic options array (e.g., `~.availableItems`). Takes precedence over `options` if both are provided. The items can be `{label, value}` objects, scalars (each scalar is used as both label and value), or objects of any shape mapped with `optionMapping`.
- `optionMapping` (object, optional): Builds each option from an item of the options list. It is evaluated once per item, **with the item as the template context**: `~.title` reads the item's `title`, `~` is the whole item, `~~.` still reads the global data. The mapped keys (`label`, `value`, `attributes`) override the item's keys. See [Data-driven checkbox lists](#data-driven-checkbox-lists).
- `controlType` (string, optional): Type of control - `"checkbox"` (default) or `"radio"`.
- `multiple` (boolean, optional): Whether multiple selections are allowed. Defaults to `true` when the bound data is an array or when more than one option exists, `false` otherwise. For radio buttons, this is automatically `false`.
- `attributes` (object, optional): Attributes applied to the wrapper div (or container div if no wrapper).
- `inputAttributes` (object, optional): Attributes applied directly to each input element.
- `labelAttributes` (object, optional): Attributes applied to the field label and to each option label (`htmlFor` is automatically managed). An `id` is only applied to the field label.
- `forceWrapper` (boolean, optional): Forces the presence (true) or absence (false) of the wrapper div. If omitted, wrapper is automatic only if label is present.
- `actions` (array, optional): Actions to execute based on field state.

## Data Management

The component automatically synchronizes its value with the global data context. The data format depends on the selection mode:

- **Radio buttons**: Stores a single value (the selected option's value).
- **Single checkbox**: Stores a boolean (`true`) or the option's value when checked, `false` when unchecked.
- **Multiple checkboxes**: Stores an array of selected option values.

The mode is chosen as follows: radio when `controlType: "radio"`; otherwise `multiple` when set; otherwise **multiple when the bound data is already an array** or when there is more than one option. Initializing the data as an array (`[]`) is therefore enough to get a list of values, even with a single option.

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

A single checkbox (one option, data not initialized as an array) stores a boolean or the option's value:

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

Several single checkboxes bound to the same data location overwrite each other's value, so they check and uncheck together. When they have different values, the component logs a warning: initialize the data as an array, or set `multiple: true`.

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
<div role="group" aria-labelledby="checkbox-abc123-label">
  <label id="checkbox-abc123-label">Select options:</label>
  <div>
    <input type="checkbox" id="checkbox-abc123-0" value="opt1" />
    <label for="checkbox-abc123-0">Option 1</label>
  </div>
  <div>
    <input type="checkbox" id="checkbox-abc123-1" value="opt2" />
    <label for="checkbox-abc123-1">Option 2</label>
  </div>
</div>
```

**Without label (container div only):**
```html
<div>
  <div>
    <input type="checkbox" id="checkbox-xyz789-0" value="opt1" />
    <label for="checkbox-xyz789-0">Option 1</label>
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

## Accessibility

- Each option label is associated with its input (`for` / `id`).
- When a field `label` names several options, the element containing the options gets `role="group"` and `aria-labelledby` pointing to the field label (id from `labelAttributes.id`, or `<base id>-label`). Assistive technologies announce the field label when entering the group.
- When a field `label` comes with a single option without its own label, the field label is directly associated with the input.
- The radios of a field share a `name` (the base ID), so they form a native radio group: one tab stop, arrow keys navigation. Set `inputAttributes.name` to group radios rendered by several fields (one per `Switch` item, for example).
- `attributes` can override `role` and `aria-labelledby`.

## Data-driven checkbox lists

To let users check items of a list held in the data (sessions, tags, recipients...), prefer, in this order:

### 1. One field fed by the list (recommended)

Use `dynamicOptions` on the list and `optionMapping` to read the keys of the items. The items can have any shape: here, a list of `{label}` objects typed by an editor.

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~~.lead.sessions
    label: "Sessions"
    dynamicOptions: ~~.sessions
    optionMapping:
      label: ~.label
      value: ~.label

data:
  sessions:
    - label: "20 octobre"
    - label: "17 novembre"
    - label: "15 décembre"
  lead:
    sessions: []
```

Checking "17 novembre" then "20 octobre" stores `lead.sessions: ["17 novembre", "20 octobre"]`. The options are a labelled group for assistive technologies. With a list of scalars (`sessions: ["20 octobre", "17 novembre"]`), `optionMapping` is not needed: each scalar is both the label and the value.

### 2. One field per Switch item

When each item needs its own markup around the checkbox, render one single-option field per item. The option `value` is evaluated in the item context, and the data initialized as an array keeps the fields independent:

```yaml
renderView:
  - type: Switch
    content: ~~.sessions
    singleOption:
      load: sessionItem

templates:
  sessionItem:
    - type: CheckBoxField
      dataLocation: ~~.lead.sessions
      options:
        - label: ~.label
          value: ~.label

data:
  sessions:
    - label: "20 octobre"
    - label: "17 novembre"
  lead:
    sessions: []
```

Keep `lead.sessions: []` in the data (or set `multiple: true` on the field): without an array, each field is a single checkbox that overwrites the shared value, and a warning is logged. For a single choice, use `controlType: radio` with a shared `inputAttributes.name`; the data then holds the selected value.

### 3. Raw `input` elements (last resort)

A raw `type: input` checkbox is a controlled input: its `checked` attribute must be bound, otherwise it is forced to `false` and never shows as checked (a warning is logged when it has event reactions). Bind a boolean with `checked: ~.isSelected`, or the membership in a list with an attribute transform:

```yaml
- type: input
  attributes:
    type: checkbox
    value: ~.label
  attributeTransforms:
    - what: setAttributeValue
      name: checked
      mode: replace
      value: true
      when: ~~.lead.sessions
      contains: ~.label
```

To store the list of checked values, add a [toggleData](../../reaction/toggleData.md) reaction: it adds the value when absent, and removes it when present.

```yaml
  actions:
    - what: toggleData
      on: change
      path: ~~.lead.sessions
      value: ~.label
```

Prefer patterns 1 and 2, which also handle the labels and the accessibility of the group.

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

### Dynamic Options with a Mapping

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.recipients
    label: "Recipients:"
    dynamicOptions: ~.users
    optionMapping:
      label: ~.displayName
      value: ~.uid
      attributes:
        class: ~.role

data:
  users:
    - uid: 12
      displayName: "Ada Lovelace"
      role: "admin"
    - uid: 27
      displayName: "Alan Turing"
      role: "editor"
  recipients: []
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
- **Dynamic options**: Options can be provided via template evaluation using `dynamicOptions`, from a list of any shape with `optionMapping`
- **Per-option customization**: Each option can have its own attributes
- **Label flexibility**: Supports both simple strings and View component rendering
- **Wrapper control**: Flexible wrapper system for styling control
- **Accessibility**: Automatic label association, labelled group of options, native radio groups
- **Empty state handling**: Gracefully handles empty options

## Limitations

- No built-in validation beyond HTML5 checkbox/radio validation
- No support for option grouping (use multiple CheckBoxField components)
- Styling must be provided via external CSS or style attributes
- Options must be provided as an array; empty arrays result in no rendering
- For radio buttons, `multiple` is automatically set to `false` regardless of the `multiple` property

