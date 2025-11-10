# SelectField

The `SelectField` component provides a native HTML select dropdown with automatic data synchronization, intelligent value type handling, and support for dynamic options. It combines the simplicity of native HTML with the convenience of automatic data binding.

## Basic Syntax

```yaml
- type: SelectField
  dataLocation: ~.category
  label: "Select category:"
  options:
    - label: "Choose category..."
      value: ""
    - label: "Technology"
      value: "tech"
    - label: "Sports"
      value: "sports"
```

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context.
- `defaultFieldValue` (any, optional): Default value when no data is present.
- `label` (string or View props, optional): Field label text (supports template evaluation and View component rendering).
- `options` (array, optional): Static array of option objects with `label` and `value` properties.
- `dynamicOptions` (string, optional): Template path to dynamic options array (e.g., `~.availableCategories`). Takes precedence over `options` if both are provided.
- `allowEmptyStringAsValue` (boolean, optional): Preserve empty strings as `""` instead of converting to `undefined` (default: `false`).
- `attributes` (object, optional): Attributes applied to the container div (or merged with inputAttributes if no wrapper).
- `inputAttributes` (object, optional): Attributes applied directly to the select element.
- `labelAttributes` (object, optional): Attributes applied to the label (htmlFor is automatically managed).
- `forceWrapper` (boolean, optional): Forces the presence (true) or absence (false) of the wrapper div. If omitted, wrapper is automatic only if label is present.
- `actions` (array, optional): Actions to execute based on field state.

## Data Management

The component automatically synchronizes its value with the global data context. It handles different value types intelligently:

### Value Type Conversion

- **Empty strings**: Become `undefined` by default, or preserved as `""` if `allowEmptyStringAsValue: true`
- **Boolean strings**: `"true"` becomes boolean `true`, `"false"` becomes boolean `false`
- **Null string**: `"null"` becomes `null`
- **Other values**: Stored as strings and matched by string comparison

### Empty String Handling

SelectField makes an important distinction between "no selection made" and "explicit selection of empty value":

- **Default behavior**: `value: ""` → stored as `undefined`
  - Useful for validation and conditional logic
  - Indicates "no selection made"
- **With `allowEmptyStringAsValue: true`**: `value: ""` → stored as `""`
  - Semantic meaning: "User explicitly selected the empty option"
  - Useful when empty string is a legitimate business value

This distinction is crucial for validation logic and conditional actions in reactive-json.

## Wrapper Control

The component uses a flexible wrapper system similar to `Input`, adapting based on the presence of a label and the `forceWrapper` property.

### Default Behavior

When no `forceWrapper` is specified, the component automatically determines whether to use a wrapper div. If a label is present, the component wraps both the label and select in a div container. If no label is present, the select is rendered directly without a wrapper.

### Explicit Control with `forceWrapper`

You can override the default behavior using the `forceWrapper` property. Setting `forceWrapper: true` will always create a wrapper div, even without a label. Setting `forceWrapper: false` will never create a wrapper, even when a label is present.

### HTML Output Examples

**With label (automatic wrapper):**
```html
<div>
  <label htmlFor="select-abc123">Select category:</label>
  <select id="select-abc123">
    <option value="">Choose category...</option>
    <option value="tech">Technology</option>
  </select>
</div>
```

**Without label (no wrapper):**
```html
<select id="select-xyz789">
  <option value="">Choose category...</option>
  <option value="tech">Technology</option>
</select>
```

### Attribute Merging

When a wrapper is present, the `attributes` are applied to the div container and `inputAttributes` are applied to the select element. When no wrapper is present, both `attributes` and `inputAttributes` are merged and applied to the select element.

## Label Support

The `label` property supports both simple strings and View component rendering, allowing for dynamic and complex label content:

```yaml
- type: SelectField
  dataLocation: ~.category
  label:
    type: div
    content:
      - "Select category ("
      - type: strong
        content: ~.requiredText
      - "):"
  dynamicOptions: ~.categories
```

## Option Labels

Option labels support template evaluation, allowing dynamic content:

```yaml
- type: SelectField
  dataLocation: ~.item
  options:
    - label: "Item: ~.itemName"
      value: "item1"
    - label: ["Count: ", ~.count]
      value: "item2"
```

## Empty Options Handling

If `options` is empty or not an array, the component displays a single option: "No options available". This is useful for conditional rendering scenarios where options may be loaded dynamically.

## Examples

### Basic SelectField

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.priority
    label: "Priority:"
    options:
      - label: "Select priority"
        value: ""
      - label: "Low"
        value: "low"
      - label: "Medium"
        value: "medium"
      - label: "High"
        value: "high"

data:
  priority: ""
```

### Boolean and Special Values

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.isActive
    label: "Status:"
    options:
      - label: "Select status"
        value: ""
      - label: "Active"
        value: "true"
      - label: "Inactive"
        value: "false"
      - label: "Not set"
        value: "null"

data:
  isActive: ""
```

### Empty String as Value

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.description
    label: "Description:"
    allowEmptyStringAsValue: true
    options:
      - label: "No description"
        value: ""
      - label: "Brief description"
        value: "brief"
      - label: "Detailed description"
        value: "detailed"

data:
  description: ""
```

### Dynamic Options

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.selectedCategory
    label: "Category:"
    dynamicOptions: ~.availableCategories

data:
  availableCategories:
    - label: "Technology"
      value: "tech"
    - label: "Sports"
      value: "sports"
    - label: "Music"
      value: "music"
  selectedCategory: ""
```

### Custom Attributes

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.country
    label: "Country:"
    inputAttributes:
      required: true
      style:
        width: "100%"
        padding: "8px"
    attributes:
      style:
        marginBottom: "10px"
    options:
      - label: "Select country"
        value: ""
      - label: "United States"
        value: "us"
      - label: "Canada"
        value: "ca"

data:
  country: ""
```

### Wrapper Control

```yaml
renderView:
  # No label → no wrapper automatically
  - type: SelectField
    dataLocation: ~.noWrapper
    options:
      - label: "Option 1"
        value: "opt1"
    
  # With label → automatic wrapper
  - type: SelectField
    dataLocation: ~.autoWrapper
    label: "With automatic wrapper:"
    options:
      - label: "Option 1"
        value: "opt1"
    
  # Force wrapper even without label
  - type: SelectField
    dataLocation: ~.forceWrapper
    options:
      - label: "Option 1"
        value: "opt1"
    forceWrapper: true
    attributes:
      style:
        border: "2px solid blue"
        padding: "10px"
        
  # No wrapper even with label
  - type: SelectField
    dataLocation: ~.noWrapperForced
    label: "Label without wrapper:"
    options:
      - label: "Option 1"
        value: "opt1"
    forceWrapper: false

data:
  noWrapper: ""
  autoWrapper: ""
  forceWrapper: ""
  noWrapperForced: ""
```

### Custom Label Attributes

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.customLabel
    label: "Custom label:"
    labelAttributes:
      style:
        color: "blue"
        fontWeight: "bold"
        fontSize: "14px"
      className: "custom-label"
    options:
      - label: "Option 1"
        value: "opt1"

data:
  customLabel: ""
```

### With Actions

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.category
    label: "Category:"
    options:
      - label: "Select category"
        value: ""
      - label: "Technology"
        value: "tech"
      - label: "Sports"
        value: "sports"
    actions:
      - what: setData
        when: ~.category
        isEmpty: true
        path: ~.hasCategory
        value: false
      - what: setData
        when: ~.category
        isNot: ""
        path: ~.hasCategory
        value: true

data:
  category: ""
  hasCategory: false
```

### Multiple Select (using `multiple` attribute)

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.selectedItems
    label: "Select multiple items:"
    inputAttributes:
      multiple: true
    options:
      - label: "Item 1"
        value: "item1"
      - label: "Item 2"
        value: "item2"
      - label: "Item 3"
        value: "item3"

data:
  selectedItems: []
```

**Note**: For multiple selection, the component stores an array. However, native HTML select multiple is limited. Consider using `CheckBoxField` with `multiple: true` for better UX.

## Advantages

- **No external dependencies**: Works without any CSS framework
- **Full control**: Custom styling and behavior
- **Performance**: Lighter than component libraries
- **Accessibility**: Direct control over ARIA attributes, automatic htmlFor
- **Automatic synchronization**: Unlike raw HTML elements that require manual setData actions
- **Flexible wrapper**: Avoids unnecessary HTML when not needed
- **Intelligent value handling**: Automatic conversion of boolean and null strings
- **Dynamic options**: Options can be provided via template evaluation using `dynamicOptions`
- **Label flexibility**: Supports both simple strings and View component rendering
- **Empty state handling**: Gracefully handles empty options

## Limitations

- No built-in validation beyond HTML5 select validation
- No support for option grouping (use multiple SelectField components or custom styling)
- Styling must be provided via external CSS or style attributes
- Multiple selection via `multiple` attribute has limited UX (consider CheckBoxField for better multiple selection)
- Template evaluation for option labels should return strings or arrays of strings
- Empty string handling requires explicit `allowEmptyStringAsValue` for semantic distinction

