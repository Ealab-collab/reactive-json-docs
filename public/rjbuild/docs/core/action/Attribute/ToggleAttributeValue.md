# ToggleAttributeValue

Toggles the presence of a specific value in an HTML attribute. Supports both simple on-off toggles and cyclic toggling through multiple values.

## Important Notes

### Action-Based Behavior
`ToggleAttributeValue` is an **action component** that operates based on data state changes, not direct event triggers. It requires a state variable in your data to activate the toggle behavior. This means you cannot directly use `on: click` with `ToggleAttributeValue` - instead, you must use `setData` with `on: click` to change a state variable, then use `when/is` conditions on the toggle action to respond to that state change.

### Base Attribute Detection
`ToggleAttributeValue` determines what to toggle by examining the **original attributes** defined in your component's props, not the current DOM state. This means:

- ✅ **Stable behavior**: The toggle always works relative to the initial attribute values
- ✅ **No infinite loops**: Changes don't trigger recursive re-evaluation
- ⚠️ **Limitation**: The toggle cannot detect or work with values that were dynamically added by other attribute actions (`SetAttributeValue`, `UnsetAttributeValue`)

**Example**: If your component initially has `class="base"` and another action adds `"dynamic"`, the toggle will only work with `"base"` and won't see `"dynamic"`.

## Basic Syntax

```yaml
actions:
  # Toggle CSS class.
  - what: toggleAttributeValue
    name: "class"
    value: "active"
    
  # Cyclic toggle with array.
  - what: toggleAttributeValue
    name: "class"
    value: ["theme-light", "theme-dark", "theme-auto", ""]
    
  # Keep attribute when empty.
  - what: toggleAttributeValue
    name: "data-optional"
    value: "enabled"
    keepAttributeWhenEmpty: true
    
  # Conditional toggle.
  - what: toggleAttributeValue
    name: "data-features"
    value: ~.featureName
    when: ~.shouldToggle
    is: true
```

## Properties

- **keepAttributeWhenEmpty** *(boolean, optional)*: Whether to keep the attribute when it becomes empty. If `false`, the attribute is removed when no values remain. Default: `false`.
- **name** *(string, required)*: The name of the attribute to modify.
- **separator** *(string, optional)*: The separator used between values. Default: `" "` (space).
- **value** *(string|array, required)*: The value(s) to toggle in the attribute. Can be a single string or an array of strings for cyclic toggling. Supports template evaluation (e.g., `~.dynamicValue`, `~~.globalValue`). Automatically converted to string if not already.

## Behavior

### Simple Toggle (string value)
- **Smart toggle**: Automatically adds the value if missing, removes it if present.
- **Preservation**: Other values in the attribute remain intact.
- **Empty handling**: By default, removes the entire attribute if no values remain. Set `keepAttributeWhenEmpty` to `true` to preserve empty attributes.

#### Common Examples
```yaml
# Toggle CSS class.
- what: toggleAttributeValue
  name: "class"
  value: "active"

# Toggle readonly attribute.
- what: toggleAttributeValue
  name: "readonly"
  value: "readonly"

# Toggle checked attribute.
- what: toggleAttributeValue
  name: "checked"
  value: "checked"
```

### Cyclic Toggle (array value)
- **Cyclic behavior**: When `value` is an array, the action cycles through the values in order.
- **Sequential rotation**: Each toggle moves to the next value in the array.
- **Empty values handling**: Empty strings (`""`) in the array represent the absence of the value.
- **Clean detection**: Values are split by separator and empty values (from double separators) are filtered out during detection.
- **First match priority**: If multiple array values are already present, only the first detected value is replaced.
- **Default fallback**: If no array values are present, the first array value is applied.
- **Empty value filtering**: Attributes with empty values from double separators (e.g., `"val1,,val2,"`) are cleaned during detection, treating them as `"val1 val2"`.
- **Single value arrays**: Arrays with one value behave identically to string values (toggle between value and empty).
- **Empty string inclusion**: Including `""` in arrays explicitly defines an "empty state" in the cycle.

#### Array Behavior Examples

##### Four-step cycle with empty state
```yaml
# Starting with class="theme-light"
# Clicks will progress: theme-light → theme-dark → theme-auto → "" → theme-light → ...
value: ["theme-light", "theme-dark", "theme-auto", ""]
```

##### Simple alternation
```yaml
# Starting with class="size-small"
# Clicks will alternate: size-small → size-large → size-small → ...
value: ["size-small", "size-large"]
```

##### Single value array (equivalent to string)
```yaml
# Equivalent to value: "highlight"
# Toggles: highlight → "" → highlight → ...
value: ["highlight"]
```

## Common Use Cases

- **CSS class toggling**: Adding/removing CSS classes based on state changes.
- **Data attribute management**: Toggling specific values in space-separated data attributes.
- **Interactive styling**: Toggle styling classes for user interactions.
- **Feature flags**: Toggle feature-related classes or data attributes.
- **State cycling**: Cycle through multiple states (e.g., theme variants, size options).
- **Multi-step processes**: Progress through sequential steps with visual indicators.

## Examples

### Simple Toggle (string value)
```yaml
renderView:
  - type: button
    content: "Toggle 'active' class"
    actions:
      - what: setData
        on: click
        path: ~.toggleActive
        value: "yes"
        when: ~.toggleActive
        is: "no"
      - what: setData
        on: click
        path: ~.toggleActive
        value: "no"
        when: ~.toggleActive
        is: "yes"

  - type: div
    content: "Element that toggles classes based on state"
    attributes:
      class: "base-class"
      style:
        padding: "10px"
        border: "1px solid #ccc"
        margin: "10px 0"
    actions:
      - what: toggleAttributeValue
        name: "class"
        value: "active"
        when: ~.toggleActive
        is: "yes"

data:
  toggleActive: "no"
```

### Keep Attribute When Empty
```yaml
renderView:
  - type: button
    content: "Toggle data attribute (keeps when empty)"
    actions:
      - what: setData
        on: click
        path: ~.toggleFeature
        value: "yes"
        when: ~.toggleFeature
        is: "no"
      - what: setData
        on: click
        path: ~.toggleFeature
        value: "no"
        when: ~.toggleFeature
        is: "yes"

  - type: div
    content: "Element with preserved attribute"
    attributes:
      data-feature: "enabled"
      style:
        padding: "10px"
        border: "1px solid #999"
        margin: "10px 0"
    actions:
      - what: toggleAttributeValue
        name: "data-feature"
        value: "enabled"
        keepAttributeWhenEmpty: true
        when: ~.toggleFeature
        is: "yes"

data:
  toggleFeature: "no"
```

### Cyclic Toggle (array value)
```yaml
renderView:
  - type: button
    content: "Cycle through themes"
    actions:
      - what: setData
        on: click
        path: ~.cycleThemes
        value: "yes"
        when: ~.cycleThemes
        is: "no"
      - what: setData
        on: click
        path: ~.cycleThemes
        value: "no"
        when: ~.cycleThemes
        is: "yes"

  - type: div
    content: "Element that cycles through theme classes"
    attributes:
      class: "theme-light"
    actions:
      - what: toggleAttributeValue
        name: "class"
        value: ["theme-light", "theme-dark", "theme-auto", ""]
        when: ~.cycleThemes
        is: "yes"

  - type: button
    content: "Alternate between sizes"
    actions:
      - what: setData
        on: click
        path: ~.alternateSizes
        value: "yes"
        when: ~.alternateSizes
        is: "no"
      - what: setData
        on: click
        path: ~.alternateSizes
        value: "no"
        when: ~.alternateSizes
        is: "yes"

  - type: div
    content: "Element that alternates between size classes"
    attributes:
      class: "size-small"
    actions:
      - what: toggleAttributeValue
        name: "class"
        value: ["size-small", "size-large"]
        when: ~.alternateSizes
        is: "yes"

data:
  cycleThemes: "no"
  alternateSizes: "no"
```

## Notes

- The `value` property supports full template evaluation including `~.localData`, `~~.globalData`, `~>nearestKey`, and `~~>globalKey` patterns.
- More efficient than separate SetAttributeValue/UnsetAttributeValue actions for toggle scenarios.
- Works with any space-separated attribute values (class, data attributes, etc.).
