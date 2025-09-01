# Attribute Actions

> **Note**: Reactive-JSON provides two systems for attribute modification:
> 
> - **Attribute Actions** (this section): Execute **after rendering**, modify DOM attributes directly
> - **[Attribute Transformers](../../attributeTransformer/index.md)**: Execute **before rendering**, modify attributes for child components
> 
> Choose actions for post-render DOM manipulation and transformers for pre-render attribute conditioning.

Attribute Actions in Reactive-JSON allow you to modify element attributes after rendering based on dynamic conditions. They are evaluated continuously based on data state and provide direct DOM manipulation capabilities.

## Key Differences from Transformers

- **Timing**: Attribute actions execute **after rendering**, while transformers execute **before rendering**
- **Impact**: Actions modify the DOM directly, transformers affect attributes passed to child components
- **Use case**: Actions are ideal for imperative DOM updates that don't need to affect child component props

## Available Attribute Actions

### Value Management
- **[SetAttributeValue](./SetAttributeValue.md)**: Sets or modifies HTML attribute values dynamically after rendering
- **[UnsetAttributeValue](./UnsetAttributeValue.md)**: Removes specific values from HTML attributes while preserving others
- **[ToggleAttributeValue](./ToggleAttributeValue.md)**: Toggles the presence of specific values in HTML attributes, supports cyclic toggling

### Attribute Management
- **[UnsetAttribute](./UnsetAttribute.md)**: Completely removes HTML attributes after rendering

## Basic Usage

Attribute actions are defined in the `actions` array on any element:

```yaml
renderView:
  - type: div
    attributes:
      class: "base-class"
      data-status: "default"
    actions:
      # Add class conditionally
      - what: SetAttributeValue
        name: "class"
        value: "active"
        when: ~~.isActive
        is: true
      
      # Remove attribute entirely
      - what: UnsetAttribute
        name: "data-status"
        when: ~~.hideStatus
        is: true
      
      # Toggle between states
      - what: ToggleAttributeValue
        name: "class"
        value: ["theme-light", "theme-dark"]
        when: ~~.toggleTheme
        isNotEmpty:
```

## Execution Order

Attribute actions are applied based on data changes and re-evaluated when dependencies change:

1. Component renders with base attributes
2. Actions are evaluated based on current data state
3. DOM attributes are modified directly
4. Changes are applied to the live DOM element

## Conditional Execution

All attribute actions support the same conditional system as other actions:

- **`when`**: Specifies the data value to evaluate
- **`is`**: Exact value comparison
- **`isEmpty`/`isNotEmpty`**: Empty/non-empty checks
- **Template evaluation**: Full support for `~.`, `~~.`, `~>`, `~~>` patterns

## Common Patterns

### Conditional Styling
```yaml
actions:
  - what: SetAttributeValue
    name: "class"
    value: "error"
    when: ~~.validation.hasErrors
    is: true
```

### State-based Attributes
```yaml
actions:
  - what: ToggleAttributeValue
    name: "aria-expanded"
    value: "true"
    when: ~~.menu.isOpen
    is: true
```

### Dynamic Data Attributes
```yaml
actions:
  - what: SetAttributeValue
    name: "data-user-role"
    value: ~~.currentUser.role
    mode: "replace"
```

## When to Use Actions vs Transformers

### Use Attribute Actions when:
- You need to modify DOM attributes after the component has rendered
- You're working with imperative DOM updates
- You need to interact with external libraries that read DOM attributes
- The attribute changes don't need to affect child component behavior

### Use Attribute Transformers when:
- You need attributes to be available to child components
- You're doing conditional attribute setup before rendering
- You want predictable attribute values during the render phase
- You're building reusable components that depend on specific attributes
