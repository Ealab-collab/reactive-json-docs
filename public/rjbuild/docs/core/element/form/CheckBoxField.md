# CheckBoxField

The `CheckBoxField` component renders checkbox or radio button groups using React Bootstrap. It supports both single and multiple selections, dynamic options, and intelligent data storage based on the control type and configuration.

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context
- `defaultFieldValue` (any, optional): Default value when no data is present
- `options` (array, optional): Static array of option objects with `label` and `value` properties
- `dynamicOptions` (string, optional): Template path to dynamic options array
- `controlType` (string, optional): Type of control - "checkbox" (default) or "radio"
- `multiple` (boolean, optional): Force array storage for checkboxes (default: auto-detected)
- `attributes` (object, optional): Attributes applied to the Form.Group container
- `actions` (array, optional): Actions to execute based on field state

## Option Format

Each option object must have:
- `label` (string|object): Display text or Reactive-JSON content for the option
- `value` (any): The actual value to store when selected
- `attributes` (object, optional): Additional attributes for the specific option

## Data Storage Modes

The component uses different data storage strategies:

### Single Value Mode
- Used for radio buttons (`controlType: "radio"`)
- Used for single checkbox when `options.length === 1` and `multiple` is not set
- Stores the selected value directly

### Array Mode
- Used for multiple checkboxes when `options.length > 1` or `multiple: true`
- Stores selected values in an array
- Automatically manages array additions and removals

## Basic Examples

### Multiple Checkboxes
```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.interests
    options:
      - label: "Technology"
        value: "tech"
      - label: "Sports"
        value: "sports"
      - label: "Music"
        value: "music"
      - label: "Travel"
        value: "travel"

data:
  interests:
    - sports
    - travel
```

### Radio Buttons
```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.priority
    controlType: "radio"
    options:
      - label: "Low"
        value: "low"
      - label: "Medium"
        value: "medium"
      - label: "High"
        value: "high"
      - label: "Critical"
        value: "critical"

data:
  priority: ""
```

### Single Checkbox
```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.acceptTerms
    options:
      - label: "I accept the terms and conditions"
        value: true
  - type: CheckBoxField
    dataLocation: ~.newsletter
    options:
      - label: "Subscribe to newsletter"
        value: true

data:
  acceptTerms: false
  newsletter: false
```

## Value Types Limitations

**Important**: CheckBoxField has limitations with non-string value types due to HTML input behavior:

- ✅ **String values**: Work perfectly (`"tech"`, `"sports"`, etc.)
- ✅ **Boolean values**: Work for single checkboxes (`true`/`false`)  
- ❌ **Numeric values**: May cause issues due to string conversion in HTML inputs
- ❌ **Complex objects**: Not supported in array mode

**Recommendation**: Use string values for reliability. Numeric and complex value type support may be improved in future versions.

```yaml
# ✅ Recommended - String values
options:
  - label: "Priority 1"
    value: "priority_1"
  - label: "Priority 2" 
    value: "priority_2"

# ❌ Avoid - Numeric values may cause issues
options:
  - label: "Priority 1"
    value: 1
  - label: "Priority 2"
    value: 2
```

## Dynamic Options with Conditional Display

CheckBoxField supports dynamic options loaded from data using `dynamicOptions`. Since dynamic path selection like `~.data[~.key]` is not supported, the recommended technique is:

1. **Create one CheckBoxField per category** instead of trying to use dynamic paths
2. **Use conditional `hide` actions** to show only the relevant CheckBoxField
3. **Store selections in separate data locations** for each category

### Example: Skills by Category

```yaml
renderView:
  - type: SelectField
    dataLocation: ~.selectedCategory
    label: "Select Category to see available skills:"
    options:
      - label: "Choose category"
        value: ""
      - label: "Technology"
        value: "technology"
      - label: "Business"
        value: "business"
      - label: "Creative"
        value: "creative"
  - type: CheckBoxField
    dataLocation: ~.techSkills
    dynamicOptions: ~.skillCategories.technology
    actions:
      - what: hide
        when: ~.selectedCategory
        isNot: "technology"
  - type: CheckBoxField
    dataLocation: ~.businessSkills
    dynamicOptions: ~.skillCategories.business
    actions:
      - what: hide
        when: ~.selectedCategory
        isNot: "business"
  - type: CheckBoxField
    dataLocation: ~.creativeSkills
    dynamicOptions: ~.skillCategories.creative
    actions:
      - what: hide
        when: ~.selectedCategory
        isNot: "creative"

data:
  selectedCategory: ""
  techSkills: []
  businessSkills: []
  creativeSkills: []
  skillCategories:
    technology:
      - label: "JavaScript"
        value: "javascript"
      - label: "Python"
        value: "python"
      - label: "React"
        value: "react"
      - label: "Node.js"
        value: "nodejs"
    business:
      - label: "Project Management"
        value: "pm"
      - label: "Marketing"
        value: "marketing"
      - label: "Sales"
        value: "sales"
      - label: "Finance"
        value: "finance"
    creative:
      - label: "Graphic Design"
        value: "design"
      - label: "Photography"
        value: "photo"
      - label: "Writing"
        value: "writing"
      - label: "Video Editing"
        value: "video"
```

### Why Not Dynamic Paths?

```yaml
# ❌ This does NOT work in Reactive-JSON:
renderView:
  - type: CheckBoxField
    dynamicOptions: ~.categories[~.selectedCategory]

# ✅ Use this approach instead:
renderView:
  - type: CheckBoxField
    dynamicOptions: ~.categories.technology
    actions:
      - what: hide
        when: ~.selectedCategory
        isNot: "technology"
```

This technique ensures clean separation of data and provides predictable behavior.

## Option Attributes

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.notifications
    options:
      - label: "Email notifications"
        value: "email"
        attributes:
          style:
            color: "blue"
      - label: "SMS notifications (premium feature)"
        value: "sms"
        attributes:
          disabled: true
          title: "This feature requires a premium subscription"
      - label: "Push notifications"
        value: "push"
        attributes:
          style:
            fontWeight: "bold"

data:
  notifications: []
```

## Limitations

### Value Types
- **Numeric values**: May cause issues due to string conversion in HTML input elements
- **Complex objects**: Cannot be used as option values in array mode
- **Recommendation**: Use string values for most cases. Numeric and complex value type support may be improved in future versions.

### General Limitations
- Option labels support template evaluation but with limited View component rendering
- No support for indeterminate checkbox state
- No built-in option grouping or hierarchical structure
- Array mode may not preserve object key order in older JavaScript engines
- No built-in validation for minimum/maximum selections
- Limited styling options compared to custom checkbox implementations

## Value Type Handling

The component handles special string values in radio mode:
- Empty string `""` becomes `undefined`
- String `"true"` becomes boolean `true`
- String `"false"` becomes boolean `false`
- String `"null"` becomes `null`
- Other strings remain as strings 