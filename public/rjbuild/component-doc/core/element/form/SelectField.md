# SelectField

The `SelectField` component renders a dropdown selection field using React Bootstrap. It supports both static and dynamic options, automatic data binding, and intelligent value type handling for different data types including strings, booleans, numbers, and null values.

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context
- `defaultFieldValue` (any, optional): Default value when no data is present
- `label` (string, optional): Field label text (supports template evaluation)
- `options` (array, optional): Static array of option objects with `label` and `value` properties
- `dynamicOptions` (string, optional): Template path to dynamic options array
- `allowEmptyStringAsValue` (boolean, optional): Preserve empty strings as `""` instead of converting to `undefined` (default: false)
- `attributes` (object, optional): Attributes applied to the Form.Group container
- `inputAttributes` (object, optional): Attributes applied directly to the select element
- `actions` (array, optional): Actions to execute based on field state

## Option Format

Each option object must have:
- `label` (string): Display text for the option
- `value` (any): The actual value to store when selected

## Data Management

The component automatically synchronizes its value with the global data context. It handles different value types intelligently:

### Value Type Conversion
- **Empty strings**: Become `undefined` by default, or preserved as `""` if `allowEmptyStringAsValue: true`
- **Boolean strings**: "true" becomes boolean `true`, "false" becomes boolean `false`
- **Null string**: "null" becomes `null`
- **Other values**: Matched by string comparison and converted to their original type

### Key Feature: Empty String Handling

SelectField makes an important distinction between "no selection made" and "explicit selection of empty value":

- **Default behavior**: `value: ""` → stored as `undefined`
  - Semantic meaning: "User hasn't made a selection yet"
  - Useful for validation and conditional logic
- **With `allowEmptyStringAsValue: true`**: `value: ""` → stored as `""`
  - Semantic meaning: "User explicitly selected the empty option"
  - Useful when empty string is a legitimate business value

This distinction is crucial for validation logic and conditional actions in reactive-json.

```yaml
# Example: Default behavior (recommended for most cases)
options:
  - label: "Choose category..."  # Placeholder option
    value: ""                   # → undefined = "not selected"
  - label: "Technology"  
    value: "tech"              # → "tech"
  - label: "No category"        # Business choice
    value: "none"              # → "none" = explicit empty choice

# Example: When empty string is a business value
allowEmptyStringAsValue: true
options:
  - label: "No description"     # Legitimate business choice
    value: ""                  # → "" = valid empty value
  - label: "Brief description"
    value: "brief"             # → "brief"
```

### Data Storage
- Single value selection only (for multiple selection, use CheckBoxField)
- Automatically updates the data context when selection changes
- Preserves the original data type of the selected option value

## Basic SelectField Usage

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

## Boolean and Special Values

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.isPublic
    label: "Visibility:"
    options:
      - label: "Select visibility"
        value: ""
      - label: "Public"
        value: true
      - label: "Private"
        value: false
      - label: "Draft"
        value: "draft"

data:
  isPublic: ""
```

## Dynamic Options

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.country
    label: "Country:"
    dynamicOptions: ~.availableCountries

data:
  country: ""
  availableCountries:
    - label: "Select country"
      value: ""
    - label: "France"
      value: "fr"
    - label: "United States"
      value: "us"
    - label: "Canada"
      value: "ca"
```

## Conditional Display

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.userRole
    label: "Role:"
    options:
      - label: "Select role"
        value: ""
      - label: "Administrator"
        value: "admin"
      - label: "User"
        value: "user"
  - type: SelectField
    dataLocation: ~.permissions
    label: "Permissions:"
    dynamicOptions: ~.rolePermissions
    actions:
      - what: hide
        when: ~.userRole
        isEmpty: true

data:
  userRole: ""
  permissions: ""
  rolePermissions:
    - label: "Select permissions"
      value: ""
    - label: "Read only"
      value: "read"
    - label: "Read/Write"
      value: "write"
```

## Empty String Handling

This example demonstrates the difference between default behavior and `allowEmptyStringAsValue: true`:

```yaml
renderView:
  # Default behavior: "" becomes undefined
  - type: SelectField
    dataLocation: ~.category
    label: "Category (default behavior):"
    options:
      - label: "Select category..."
        value: ""                    # → undefined
      - label: "Technology"
        value: "tech"
      - label: "No category"
        value: "none"                # Explicit "empty" choice
  
  # With allowEmptyStringAsValue: "" is preserved
  - type: SelectField
    dataLocation: ~.description
    label: "Description (preserve empty):"
    allowEmptyStringAsValue: true
    options:
      - label: "No description"
        value: ""                    # → ""
      - label: "Brief"
        value: "brief"
      - label: "Detailed"
        value: "detailed"

data:
  category: ""      # Will become undefined after first selection
  description: ""   # Will stay "" when "No description" selected
```

## Static Options

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

## Complete Examples

### Static Options
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

### Dynamic Options
```yaml
renderView:
  - type: SelectField
    dataLocation: ~.country
    label: "Country:"
    dynamicOptions: ~.availableCountries

data:
  country: ""
  availableCountries:
    - label: "Select country"
      value: ""
    - label: "France"
      value: "fr"
    - label: "United States"
      value: "us"
    - label: "Canada"
      value: "ca"
```

## Input Attributes

The component supports custom attributes via `inputAttributes`:

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.category
    label: "Category:"
    options:
      - label: "Select category"
        value: ""
      - label: "Category A"
        value: "a"
      - label: "Category B"
        value: "b"
    inputAttributes:
      required: true
      style:
        fontSize: "16px"

data:
  category: ""
```

## Limitations

### Technical Limitations
- **Single selection only**: For multiple selection, use CheckBoxField
- **Value conversion**: Option values are converted to strings for HTML compatibility, then back to original types
- **Complex values**: Objects cannot be used as option values
- **No option groups**: `<optgroup>` is not supported
- **Simple labels only**: Template evaluation in labels is limited to simple string values
- **No built-in validation**: Beyond basic required field checking
- **No search/filtering**: Built-in search capabilities are not available
- **Bug with null values**: Options with `value: null` don't display as selected correctly (implementation issue)