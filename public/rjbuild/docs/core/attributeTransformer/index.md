# Attribute Transformers

> **Note**: Reactive-JSON provides two systems for attribute modification:
> 
> - **Attribute Transformers** (this section): Execute **before rendering**, modify attributes for child components
> - **[Attribute Actions](../action/Attribute/index.md)**: Execute **after rendering**, modify DOM attributes directly
> 
> Choose transformers for pre-render attribute conditioning and actions for post-render DOM manipulation.

Attribute Transformers in Reactive-JSON allow you to modify element attributes before rendering based on dynamic conditions. They are evaluated during the attribute evaluation phase and provide pre-render attribute manipulation capabilities.

## Key Differences from Actions

- **Timing**: Attribute transformers execute **before rendering**, while actions execute **after rendering**
- **Impact**: Transformers affect attributes passed to child components, actions modify the DOM directly
- **Use case**: Transformers are ideal for conditional attribute values that need to be available to child components

## Available Attribute Transformers

### Value Management
- **[setAttributeValue](./setAttributeValue.md)**: Sets or modifies HTML attribute values dynamically before rendering
- **[unsetAttributeValue](./unsetAttributeValue.md)**: Removes specific values from HTML attributes while preserving others
- **[toggleAttributeValue](./toggleAttributeValue.md)**: Toggles the presence of specific values in HTML attributes, supports cyclic toggling

### Attribute Management
- **[unsetAttribute](./unsetAttribute.md)**: Completely removes HTML attributes before rendering

## Basic Usage

Attribute transformers are defined in the `attributeTransforms` array on any element:

```yaml
renderView:
  - type: div
    attributes:
      class: "base-class"
      data-status: "default"
    attributeTransforms:
      # Add class conditionally
      - what: setAttributeValue
        name: "class"
        value: "active"
        when: ~~.isActive
        is: true
      
      # Remove attribute entirely
      - what: unsetAttribute
        name: "data-status"
        when: ~~.hideStatus
        is: true
      
      # Toggle between states
      - what: toggleAttributeValue
        name: "class"
        value: ["theme-light", "theme-dark"]
        when: ~~.toggleTheme
        isNotEmpty:
```

## Execution Order

Attribute transformers are applied in the order they appear in the `attributeTransforms` array:

1. Base attributes are evaluated (template resolution)
2. Each transformer is applied sequentially
3. The final attributes are passed to the component/element

## Conditional Execution

All attribute transformers support the same conditional system as actions:

- **`when`**: Specifies the data value to evaluate
- **`is`**: Exact value comparison
- **`isEmpty`/`isNotEmpty`**: Empty/non-empty checks
- **Template evaluation**: Full support for `~.`, `~~.`, `~>`, `~~>` patterns

## Common Patterns

### Conditional Styling
```yaml
attributeTransforms:
  - what: setAttributeValue
    name: "class"
    value: "error"
    when: ~~.validation.hasErrors
    is: true
```

### State-based Attributes
```yaml
attributeTransforms:
  - what: toggleAttributeValue
    name: "aria-expanded"
    value: "true"
    when: ~~.menu.isOpen
    is: true
```

### Dynamic Data Attributes
```yaml
attributeTransforms:
  - what: setAttributeValue
    name: "data-user-role"
    value: ~~.currentUser.role
    mode: "replace"
```
