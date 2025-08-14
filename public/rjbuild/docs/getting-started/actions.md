# Actions System

The Reactive-JSON actions system allows you to modify element behavior and appearance based on dynamic conditions - all through JSON configuration. Actions are applied to individual elements and can control visibility, display tooltips, redirect users, or trigger other behaviors based on the current data state.

Actions enable the UI to adapt automatically based on the application's state. They differ from [reactions](./reactions.md), which execute in response to user events; actions are evaluated continuously based on data conditions.

## Basic Syntax

Actions are defined as part of the `actions` array on any element. Each action has the following structure:

- `what`: The type of action to execute.
- `when` (optional): Data field reference to evaluate for the condition that determines when the action should execute. Supports various conditional operators: `is`, `isNot`, `isEmpty`, `contains`, `containsNot`, `containedBy`, `containedByNot`, numeric comparisons (`>`, `<`, `>=`, `<=`), and complex conditions (`andConditions`, `orConditions`). For detailed information about each condition type, see the [conditional operators reference](#conditional-operators) below.

In addition to these core properties, actions support action-specific properties that vary depending on the action type. For example, a `hide` action only requires the condition properties, while a `redirect` action needs a `to` property specifying the destination URL.

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.show_advanced
    options:
      - value: true
        label: "Show advanced settings"

  - type: div
    content: "Advanced Settings Panel"
    actions:
      - what: hide              # Action type
        when: ~.show_advanced    # Condition to evaluate
        isNot: true              # Expected value
```

## Basic Action Demonstration

This example demonstrates how actions adapt the UI based on application state.

When you check the checkbox, the "Advanced Settings Panel" becomes visible. The action continuously evaluates the condition and shows/hides content accordingly.

```yaml
renderView:
  - type: CheckBoxField
    dataLocation: ~.show_advanced
    options:
      - value: true
        label: "Show advanced settings"

  - type: div
    content: "Basic Settings"
    attributes:
      style:
        padding: "15px"
        border: "2px solid var(--bs-border-color, #dee2e6)"
        borderRadius: "8px"
        margin: "10px 0"

  - type: div
    content: "Advanced Settings Panel"
    attributes:
      style:
        padding: "15px"
        border: "2px dashed var(--bs-border-color, #dee2e6)"
        borderRadius: "8px"
        margin: "10px 0"
        fontStyle: "italic"
    actions:
      - what: hide              # Action type
        when: ~.show_advanced    # Condition to evaluate
        isNot: true              # Expected value

data:
  show_advanced: false
```

## Action Types

Reactive-JSON provides several built-in actions:

### Visibility Control
- **[hide](../core/action/Hide.md)**: Completely hides the element and its children
- **[visuallyHide](../core/action/VisuallyHide.md)**: Visually hides the element while keeping it accessible to screen readers

### User Interaction
- **[tooltip](../core/action/Tooltip.md)**: Displays a tooltip on hover
- **[popover](../core/action/Popover.md)**: Shows a more complex popover on click

### Navigation
- **[redirect](../core/action/Redirect.md)**: Redirects to a specified URL

For detailed documentation of each action, including properties and examples, see their respective documentation pages.

## Complete Examples

### Basic Conditional Actions Example

```yaml
renderView:
  - type: div
    content: "This shows only when status is 'active'"
    attributes:
      style:
        padding: "10px"
        border: "1px solid var(--bs-border-color, #dee2e6)"
        margin: "5px 0"
    actions:
      - what: hide
        when: ~.status
        isNot: "active"
        
  - type: div
    content: "This shows only when text is not empty"
    attributes:
      style:
        padding: "10px"
        border: "1px solid var(--bs-border-color, #dee2e6)"
        margin: "5px 0"
    actions:
      - what: hide
        when: ~.text_input
        isEmpty: true

  - type: SelectField
    label: "Status:"
    dataLocation: ~.status
    options:
      - value: "inactive"
        label: "Inactive"
      - value: "active"
        label: "Active"
        
  - type: TextField
    label: "Text:"
    dataLocation: ~.text_input
    placeholder: "Type something..."

data:
  status: "inactive"
  text_input: ""
```

### Tooltip Action Example

```yaml
renderView:
  - type: button
    content: "Hover for help (when enabled)"
    actions:
      - what: tooltip
        content: "This is a helpful tooltip!"
        placement: "top"
        when: ~.show_tooltips
        is: true
        
  - type: CheckBoxField
    label: "Enable tooltips"
    dataLocation: ~.show_tooltips
    options:
      - value: true
        label: ""

data:
  show_tooltips: true
```

### Practical Form Example

```yaml
renderView:
  - type: h4
    content: "Simple Contact Form"
    
  - type: TextField
    label: "Name:"
    dataLocation: ~.form.name
    placeholder: "Enter your name"
    
  - type: TextField
    label: "Email:"
    dataLocation: ~.form.email
    inputType: "email"
    placeholder: "Enter your email"
    
  - type: div
    content: "Please fill in both fields"
    attributes:
      style:
        color: "var(--bs-danger, #dc3545)"
        fontSize: "14px"
    actions:
      - what: hide
        andConditions:
          - when: ~.form.name
            isNotEmpty:
          - when: ~.form.email
            isNotEmpty:
            
  - type: button
    content: "Submit"
    attributes:
      style:
        border: "1px solid var(--bs-border-color, #dee2e6)"
        padding: "8px 16px"
    actions:
      - what: hide
        when: ~.form.name
        isEmpty: true
      - what: hide
        when: ~.form.email
        isEmpty: true
        
  - type: div
    content: "✅ Form submitted successfully!"
    attributes:
      style:
        color: "var(--bs-success, #198754)"
        marginTop: "10px"
        fontWeight: "bold"
    actions:
      - what: hide
        when: ~.submitted
        isNot: true

data:
  form:
    name: ""
    email: ""
  submitted: false
```

## Conditional Operators {#conditional-operators}

Actions support the following conditional operators when using the `when` property:

- `is`: Value equals exactly the specified value.
- `isNot`: Value is different from the specified value.
- `isEmpty`: Value is empty (null, undefined, empty string, empty array, or empty object). The presence of the property is sufficient (value doesn't matter, can be `null` in JSON). Use `isEmpty:` to check if empty, or `isEmpty: "not"` to check if not empty (alternatively, use `isNotEmpty:`).
- `isNotEmpty`: Value is not empty (shorthand for `isEmpty: "not"`). The presence of the property is sufficient - the value doesn't matter and can be `null` in JSON.
- `contains`: Value contains the specified substring or array element.
- `containsNot`: Value does not contain the specified substring or array element.
- `containedBy`: Value is contained within the specified array or string.
- `containedByNot`: Value is not contained within the specified array or string.
- `>`: Value is greater than the specified number or date.
- `<`: Value is less than the specified number or date.
- `>=`: Value is greater than or equal to the specified number or date.
- `<=`: Value is less than or equal to the specified number or date.
- `andConditions` (array): All nested conditions must be true for the action to execute.

  ```yaml
  # Example: Hide when both status is active AND user has admin role
  andConditions:
    - when: ~.status
      is: "active"
    - when: ~.user_role
      is: "admin"
  ```

- `orConditions` (array): At least one nested condition must be true for the action to execute.

## Execution Order
- Actions are evaluated in the order they appear in the array.
- Conditions are evaluated before action execution.
- Some actions (like `hide`) prevent subsequent actions from executing.

### State-Driven Behavior
- Actions continuously evaluate their conditions based on current data.
- No explicit triggers needed - they respond automatically to data changes.
- Perfect for creating adaptive interfaces that respond to application state.

## Technical Limitations

1. **Execution order**: Actions are evaluated in definition order and cannot be reordered dynamically.
2. **Hide behavior**: Once an element is hidden with the `hide` action, no subsequent actions execute.
3. **Synchronous evaluation**: All conditions and actions are evaluated synchronously.
4. **Data scope**: Actions can only access data from the current template context and global context.
5. **No side effects**: Actions cannot directly modify global state or trigger reactions.
6. **External dependencies**: Some actions (tooltip, popover) require React Bootstrap components.

## Best Practices

1. **Keep conditions simple**: Avoid overly complex condition logic for better maintainability.
2. **Consider performance**: Minimize frequently-evaluated complex conditions.
3. **Use appropriate actions**: Choose `visuallyHide` over `hide` when content should remain accessible.
4. **Test thoroughly**: Verify action behavior with different data states.
5. **Document complex logic**: Add comments for non-obvious conditional logic.
6. **Order matters**: Place critical actions (like `hide`) early in the action array when appropriate.

## Next Steps

Now that you understand how actions work to adapt the UI based on application state, learn about **[Reactions](./reactions.md)** to handle user events and trigger behaviors in response to user interactions.

Actions and reactions work together to create fully interactive applications: actions provide state-driven UI adaptation, while reactions enable event-driven behavior.

## Related Documentation

- **[Reactions System](./reactions.md)**: Learn about handling user events and state changes.
- **[Template System](../getting-started/template-contexts-data-binding.md)**: Understand data binding and template expressions.