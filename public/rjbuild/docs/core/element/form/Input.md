# Input

The `Input` component provides a native HTML input field with automatic data synchronization, combining the simplicity of native HTML with the convenience of automatic data binding.

> **About specialized input components**
>
> For common input types, you can use specialized wrapper components that pre-set the `inputType`:
>
> - `TextField` (text), `EmailField` (email), `PasswordField` (password)
> - `UrlField` (url), `SearchField` (search), `TelField` (tel)
> - `NumberField` (number), `RangeField` (range)
> - `DateField` (date), `TimeField` (time), `DateTimeField` (datetime-local)
> - `MonthField` (month), `WeekField` (week)
> - `ColorField` (color), `FileField` (file), `HiddenField` (hidden)
>
> All these components use the same properties as `Input` but with a predefined input type.
>
> Using convenience components makes it easier to override specific component types through reactive-json's [plugin system](/docs/advanced-concepts/plugins/plugin-system). For example, you can replace all `EmailField` components with a custom implementation while leaving other input types unchanged.

## Basic Syntax

```yaml
- type: Input
  dataLocation: ~.fieldName
  label: "Field Label:"
  placeholder: "Enter value..."
  inputType: "text"
  inputAttributes:
    required: true
  attributes:
    style:
      marginBottom: "10px"
```

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context.
- `defaultFieldValue` (string, optional): Default value when no data is present.
- `label` (string, optional): Field label text (supports template evaluation).
- `placeholder` (string, optional): Placeholder text (supports template evaluation).
- `inputType` (string, optional): HTML input type (default: "text", supports template evaluation).
- `attributes` (object, optional): Attributes applied to the container div (or merged with inputAttributes if no wrapper).
- `inputAttributes` (object, optional): Attributes applied directly to the input element.
- `labelAttributes` (object, optional): Attributes applied to the label (htmlFor is automatically managed).
- `forceWrapper` (boolean, optional): Forces the presence (true) or absence (false) of the wrapper div. If omitted, wrapper is automatic only if label is present.
- `actions` (array, optional): Actions to execute based on field state.

## Data Management

The component automatically synchronizes its value with the global data context. When `dataLocation` is used, the value is stored at the specified path. Without `dataLocation`, the value is stored in the template context using the component's `datafield`.

## Input Types

The `inputType` property supports all HTML5 input types:
- `text` (default): Standard text input
- `email`: Email validation
- `password`: Masked password input
- `url`: URL validation
- `tel`: Telephone number input
- `search`: Search input with clear button
- `number`: Numeric input
- `date`: Date picker
- And all other HTML5 types

## Wrapper Control

The component uses a flexible wrapper system that adapts based on the presence of a label and the `forceWrapper` property.

### Default Behavior
When no `forceWrapper` is specified, the component automatically determines whether to use a wrapper div. If a label is present, the component wraps both the label and input in a div container. If no label is present, the input is rendered directly without a wrapper.

### Explicit Control with `forceWrapper`
You can override the default behavior using the `forceWrapper` property. Setting `forceWrapper: true` will always create a wrapper div, even without a label. Setting `forceWrapper: false` will never create a wrapper, even when a label is present.

### HTML Output Examples

**With label (automatic wrapper):**
```html
<div>
  <label htmlFor="input-abc123">Field Label:</label>
  <input id="input-abc123" type="text" value="" />
</div>
```

**Without label (no wrapper):**
```html
<input id="input-xyz789" type="text" value="" />
```

**Force wrapper without label:**
```html
<div>
  <input id="input-def456" type="text" value="" />
</div>
```

### Attribute Merging
When a wrapper is present, the `attributes` are applied to the div container and `inputAttributes` are applied to the input element. When no wrapper is present, both `attributes` and `inputAttributes` are merged and applied to the input element.

## Integrated vs Separated Labels

### Integrated Label (convenience)
```yaml
- type: Input
  label: "My field:"
  dataLocation: ~.value
```

**Advantages**: Simple, automatic accessibility (htmlFor)
**Limitations**: No conditional actions, limited styling

### Separated Label (full control)
```yaml
- type: label
  content: "My field:"
  attributes:
    htmlFor: "my-input-id"
  actions:
    - what: setAttributeValue
      when: ~.hasError
      is: true
      attribute: style.color
      value: "red"
- type: Input
  dataLocation: ~.value
  forceWrapper: false
  inputAttributes:
    id: "my-input-id"
```

**Advantages**: Conditional actions, advanced styling, full control
**Disadvantages**: More verbose, manual accessibility management

**Recommendation**: Use the integrated label for most cases. Opt for separated label only if you need conditional actions or advanced styling.

## Examples

### Basic Example

```yaml
renderView:
  - type: Input
    dataLocation: ~.username
    label: "Username:"
    placeholder: "Enter your username"

data:
  username: ""
```

### Different Input Types

```yaml
renderView:
  - type: Input
    dataLocation: ~.email
    label: "Email:"
    placeholder: "user@example.com"
    inputType: "email"
  - type: Input
    dataLocation: ~.password
    label: "Password:"
    placeholder: "Enter password"
    inputType: "password"
  - type: Input
    dataLocation: ~.website
    label: "Website:"
    placeholder: "https://example.com"
    inputType: "url"
  - type: Input
    dataLocation: ~.age
    label: "Age:"
    inputType: "number"
    inputAttributes:
      min: 0
      max: 120

data:
  email: ""
  password: ""
  website: ""
  age: ""
```

### Custom Attributes

```yaml
renderView:
  - type: Input
    dataLocation: ~.productCode
    label: "Product Code:"
    placeholder: "ABC-123"
    inputAttributes:
      pattern: "[A-Z]{3}-[0-9]{3}"
      title: "Format: ABC-123 (3 letters, dash, 3 numbers)"
      maxLength: 7
      style:
        textTransform: "uppercase"
    attributes:
      style:
        marginBottom: "10px"

data:
  productCode: ""
```

### Wrapper Control

```yaml
renderView:
  # No label → no wrapper automatically
  - type: Input
    dataLocation: ~.noWrapper
    placeholder: "Input without wrapper"
    
  # With label → automatic wrapper
  - type: Input
    dataLocation: ~.autoWrapper
    label: "With automatic wrapper:"
    placeholder: "Input with wrapper"
    
  # Force wrapper even without label
  - type: Input
    dataLocation: ~.forceWrapper
    placeholder: "Forced wrapper"
    forceWrapper: true
    attributes:
      style:
        border: "2px solid blue"
        padding: "10px"
        
  # No wrapper even with label
  - type: Input
    dataLocation: ~.noWrapperForced
    label: "Label without wrapper:"
    placeholder: "Input without forced wrapper"
    forceWrapper: false
    # attributes merged with inputAttributes
    attributes:
      style:
        border: "2px solid red"

data:
  noWrapper: ""
  autoWrapper: ""
  forceWrapper: ""
  noWrapperForced: ""
```

### Custom Label Attributes

```yaml
renderView:
  - type: Input
    dataLocation: ~.customLabel
    label: "Custom label:"
    placeholder: "Input with styled label"
    labelAttributes:
      style:
        color: "blue"
        fontWeight: "bold"
        fontSize: "14px"
      className: "custom-label"

data:
  customLabel: ""
```

### With Actions

```yaml
renderView:
  - type: Input
    dataLocation: ~.searchTerm
    label: "Search:"
    placeholder: "Type to search..."
    inputType: "search"
    actions:
      - what: setData
        when: ~.searchTerm
        hasLength: ">0"
        path: ~.isSearching
        value: true

data:
  searchTerm: ""
  isSearching: false
```

## Advantages

- **No external dependencies**: Works without any CSS framework
- **Full control**: Custom styling and behavior
- **Performance**: Lighter than component libraries
- **Accessibility**: Direct control over ARIA attributes, automatic htmlFor
- **Automatic synchronization**: Unlike raw HTML elements that require manual setData actions
- **Flexible wrapper**: Avoids unnecessary HTML when not needed
- **Flexibility**: Integrated label for convenience, separated for advanced control

## Limitations

- No built-in validation beyond HTML5 input type validation
- No support for input masking or formatting
- No built-in error message display
- Styling must be provided via external CSS or style attributes
- Template evaluation for `inputType` should return valid HTML input types
- Integrated label is limited: for conditional actions, prefer separated label
