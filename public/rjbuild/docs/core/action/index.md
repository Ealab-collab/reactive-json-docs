# Reactive-JSON Actions System Documentation

## Introduction

The Reactive-JSON actions system allows you to modify element behavior and appearance based on dynamic conditions. Actions are applied to individual elements and can control visibility, display tooltips, redirect users, or trigger other behaviors based on the current data state.

This system enables you to create interactive interfaces directly through JSON configuration, without requiring custom JavaScript code.

### Basic Structure

```yaml
renderView:
  - type: div
    content: "My content"
    actions:
      - what: hide           # Action type
        when: ~.my_condition # Condition to evaluate
        is: true             # Expected value
```

## How Actions Work

Actions are defined as an array on any element and are evaluated in the order they appear. Each action consists of:

- `what`: The type of action to execute
- **Action-specific properties**: Vary depending on the action type
- **Conditional properties**: Define when the action should be executed (optional)

### Action Types

Reactive-JSON provides several built-in actions:

- **[hide](Hide.md)**: Completely hides the element and its children
- **[visuallyHide](VisuallyHide.md)**: Visually hides the element while keeping it accessible to screen readers
- **[tooltip](Tooltip.md)**: Displays a tooltip on hover
- **[popover](Popover.md)**: Shows a more complex popover on click
- **[redirect](Redirect.md)**: Redirects to a specified URL

For detailed documentation of each action, including properties and examples, see their respective documentation pages.

## Conditional Execution

Actions can be made conditional using various comparison operators. If no conditions are specified, the action will always execute.

### Basic Comparisons
- `is`: Value equals exactly
- `isNot`: Value is different from

```yaml
actions:
  - what: hide
    when: ~.status
    is: "inactive"
```

### Empty Value Tests
- `isEmpty: true`: Value is empty (null, undefined, "", [], {})
- `isEmpty: "not"`: Value is not empty

```yaml
actions:
  - what: hide
    when: ~.user.name
    isEmpty: true
```

### Content Search
- `contains`: Contains a substring or element
- `containsNot`: Does not contain a substring or element
- `containedBy`: Value is contained within another value
- `containedByNot`: Value is not contained within another value

```yaml
actions:
  - what: hide
    when: ~.user.roles
    contains: "admin"
```

### Numeric and Date Comparisons
- `">"`: Greater than
- `"<"`: Less than  
- `">="`: Greater than or equal to
- `"<="`: Less than or equal to
- `compareAsDates: true`: Compare values as dates

```yaml
actions:
  - what: hide
    when: ~.user.age
    "<": 18
```

### Complex Conditions
- `andConditions`: All conditions must be true
- `orConditions`: At least one condition must be true

```yaml
actions:
  - what: hide
    andConditions:
      - when: ~.user.role
        is: "user"
      - when: ~.feature_enabled
        is: false
```

## Data Integration

Actions use Reactive-JSON's template system with the `~` operator to access data:

- `~.property`: Access a property from the data context
- `~.object.property`: Navigate through nested objects
- `~.array[0]`: Access array elements

The template system resolves these paths at runtime and provides the current values for condition evaluation.

## Execution Order and Behavior

1. **Sequential evaluation**: Actions are evaluated in the order they appear in the array
2. **Condition precedence**: Conditions are evaluated before action execution
3. **Early termination**: Some actions (like `hide`) prevent subsequent actions from executing
4. **Synchronous execution**: All condition evaluations and actions are synchronous

## Practical Examples

### Conditional Element Visibility

```yaml
renderView:
  - type: div
    content: "Admin-only section"
    actions:
      - what: hide
        when: ~.user.role
        isNot: "admin"

  - type: button
    content: "Advanced feature"
    actions:
      - what: hide
        when: ~.user.permissions
        containsNot: "advanced_actions"

data:
  user:
    role: "user"
    permissions: ["read", "write"]
```

### Contextual Help Interface

```yaml
renderView:
  - type: label
    content: "Username"
    actions:
      - what: tooltip
        content: "Use only letters and numbers"
        placement: "right"
  
  - type: button
    content: "More info"
    actions:
      - what: popover
        title: "Detailed help"
        content: "Complete instructions..."
        placement: "top"
```

### Authentication Flow

```yaml
renderView:
  - type: div
    content: "Access denied"
    actions:
      - what: redirect
        to: "/login"
        when: ~.user.authenticated
        is: false
      
      - what: hide
        when: ~.user.authenticated
        is: true

data:
  user:
    authenticated: false
```

## Technical Limitations

1. **Execution order**: Actions are evaluated in definition order and cannot be reordered dynamically
2. **Hide behavior**: Once an element is hidden with the `hide` action, no subsequent actions execute
3. **Synchronous evaluation**: All conditions and actions are evaluated synchronously
4. **Data scope**: Actions can only access data from the current template context and global context
5. **No side effects**: Actions cannot directly modify global state or trigger reactions
6. **External dependencies**: Some actions (tooltip, popover) require React Bootstrap components

## Best Practices

1. **Keep conditions simple**: Avoid overly complex condition logic for better maintainability
2. **Consider performance**: Minimize frequently-evaluated complex conditions
3. **Use appropriate actions**: Choose `visuallyHide` over `hide` when content should remain accessible
4. **Test thoroughly**: Verify action behavior with different data states
5. **Document complex logic**: Add comments for non-obvious conditional logic
6. **Order matters**: Place critical actions (like `hide`) early in the action array when appropriate

## Related Documentation

- **Individual Action Documentation**: See the dedicated pages for each action type
- **[Reactions System](../reaction/index.md)**: Learn about handling user events and state changes
- **[Template System](../../template-system.md)**: Understand data binding and template expressions