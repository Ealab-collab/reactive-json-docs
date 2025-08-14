# Reactions System

Reactions are a fundamental part of Reactive-JSON's interactivity system. They allow you to respond to user events and perform operations like data updates, network requests, and browser interactions - all through JSON configuration. In the RjBuild, reactions are defined under the `actions` key, just like regular actions, but are distinguished by the presence of the `on` property.

Reactions execute in response to user events (click, change, etc.) to modify application state and trigger behaviors. They differ from [actions](./actions.md), which continuously adapt the UI based on the current data state; reactions are event-driven while actions are state-driven.

## Basic Syntax

Reactions are defined as part of the `actions` array on any element. Each reaction has the following core properties:

- `what`: The name of the reaction to execute.
- `on`: The event that triggers the reaction.
- `when` (optional): Reactions also support optional conditions to control when the reaction should execute. See the [Actions conditional operators documentation](./actions.md#conditional-operators) for detailed information about available condition types.

Beyond these core properties, reactions include reaction-specific properties that vary depending on the reaction type. For example, a `setData` reaction requires `path` and `value` properties, while a `fetchData` reaction needs a `url` property and optional `method` configuration.

```yaml
renderView:
  - type: button
    content: "Save Text"
    actions:
      - what: setData              # Reaction type
        on: click                  # Triggering event
        path: ~.saved_text         # Reaction-specific property
        value: ~.user_input        # Reaction-specific property
        when: ~.user_input         # Optional condition
        isEmpty: "not"             # Condition value
```

## Basic Reaction Demonstration

This example demonstrates how to set data when a button is clicked.

On the *Save Text* button, we define a `setData` reaction that will set the text field value in the `saved_text` data location when the button is clicked, but only if the text field is not empty.

```yaml
renderView:
  - type: TextField
    label: "Enter some text:"
    dataLocation: ~.user_input
    placeholder: "Type something..."

  - type: button
    content: "Save Text"
    actions:
      - what: setData              # Reaction type
        on: click                  # Triggering event
        path: ~.saved_text         # Reaction-specific property
        value: ~.user_input        # Reaction-specific property
        when: ~.user_input         # Optional condition
        isEmpty: "not"             # Condition value

  - type: div
    content: ["Saved text: ", ~.saved_text]
    actions:
      - what: hide                 # Action (no 'on' property)
        when: ~.saved_text         # Condition
        isEmpty:

data:
  user_input: ""
  saved_text: ""
```

## Reaction Types

Reactive-JSON provides several built-in reactions:

### Data Management
- **setData**: Sets data at the specified path.
- **addData**: Adds new data to the specified path.
- **removeData**: Removes data from the specified path.
- **moveData**: Moves data from one path to another.

### Network Operations
- **fetchData**: Fetches data from a URL using GET requests.
- **submitData**: Submits data to a server endpoint using POST/PUT/DELETE.

### Browser Operations
- **setClipboardData**: Copies data to the clipboard.
- **redirectNow**: Performs an immediate redirect.
- **triggerEvent**: Triggers a custom event.
- **postMessage**: Sends a message to another window/frame.

For detailed documentation of each reaction, including properties and examples, see their respective documentation pages.

## Event Types

The `on` property accepts standard browser events. These events are the same as those used in standard web development, and their availability depends on the HTML element type. For example, a `change` event will only work on form elements like `input`, `select`, or `textarea`, while a `click` event works on any element.

This example demonstrates the different event types supported by reactions:

```yaml
renderView:
  - type: div
    content: ["Last event type: ", ~.last_event_type]
    attributes:
      style:
        padding: "10px"
        border: "1px solid var(--bs-border-color, #dee2e6)"
        borderRadius: "4px"
        marginBottom: "10px"
        fontWeight: "bold"

  - type: TextField
    label: "Interactive text field:"
    dataLocation: ~.user_input
    placeholder: "Click, type, or hover..."
    actions:
      - what: setData
        on: click
        path: ~.last_event_type
        value: "click"
      - what: setData
        on: change
        path: ~.last_event_type
        value: "change"
      - what: setData
        on: mouseOver
        path: ~.last_event_type
        value: "mouseOver"

data:
  last_event_type: "none"
  user_input: ""
```

Common event types:
- `click`: Mouse click (works on any element).
- `change`: Form input change (works on form elements only).
- `mouseOver`: Mouse hover (works on any element).
- `submit`: Form submission (works on form elements only).
- `keyDown`/`keyUp`: Keyboard events (works on focusable elements).

> **Note**: Event names must respect standard React/DOM event naming conventions (camelCase).

## Advanced Features

### Conditional Logic
Reactions support the same conditional operators as actions:
- `when` + `is`/`isNot`: Value equality checks.
- `when` + `isEmpty`: Empty value tests.
- `when` + `contains`/`containsNot`: Content search.
- `when` + `>`, `<`, `>=`, `<=`: Numeric/date comparisons.
- `andConditions`/`orConditions`: Complex condition logic.

### Event Control
Use `stopPropagation: true` to:
1. Prevent event bubbling to parent elements.
2. Stop execution of subsequent actions for the same event.

### Execution Order
- Multiple reactions on the same event execute in the order they are defined.
- Reactions with unmet conditions are skipped.
- Actions (without `on` property) are evaluated separately from reactions.

## Technical Details

- Reactions are triggered by DOM events.
- Multiple reactions can be defined for the same event.
- Reactions are executed in the order they appear in the YAML.
- Reactions can be chained together by modifying data that other reactions depend on.
- Conditional reactions only execute when their conditions evaluate to true.
- The `stopPropagation` property affects both event bubbling and subsequent action execution.

## Limitations

- Event availability depends on the HTML element type (e.g., `change` only works on form elements).
- Network operations require proper CORS configuration.
- Browser operations require appropriate permissions.
- No built-in error handling beyond console logging for network operations.
- Only one network request (fetch/submit) can be active at a time.
- URLs in network operations must be static strings (dynamic URLs not supported).

## Best Practices

1. **Use descriptive conditions**: Make your conditional logic clear and readable.
2. **Handle empty states**: Always consider what happens when data is empty or undefined.
3. **Order matters**: Place more specific conditions before general ones.
4. **Use stopPropagation wisely**: Only use it when you specifically need to prevent event bubbling or stop action execution.
5. **Test network operations**: Ensure your API endpoints return the expected format.
6. **Provide user feedback**: Use visual indicators during loading states.

## Complete Examples

### Data Input and Submission
```yaml
renderView:
  - type: TextField
    label: "Username"
    placeholder: "Enter your username"
    dataLocation: ~.form_data.username
  - type: TextField
    label: "Email"
    placeholder: "Enter your email"
    inputType: "email"
    dataLocation: ~.form_data.email
  - type: button
    content: Submit
    actions:
      - what: submitData
        on: click
        url: "/api/submit"
        data:
          username: ~.form_data.username
          email: ~.form_data.email
        when: ~.form_data.username
        isEmpty: not

data:
  form_data:
    username: ""
    email: ""
```

### Conditional Reactions Example
```yaml
renderView:
  - type: button
    content: "Toggle State"
    actions:
      - what: setData
        on: click
        path: ~.button_state
        value: "on"
        when: ~.button_state
        is: "off"
        stopPropagation: true
      - what: setData
        on: click
        path: ~.button_state
        value: "off"
        when: ~.button_state
        is: "on"
        stopPropagation: true
  - type: div
    content: ["Button state: ", ~.button_state]
  - type: div
    content: "Button has been clicked!"
    actions:
      - what: hide
        when: ~.button_state
        is: "off"

data:
  button_state: "off"
```

### Complex Conditional Logic
```yaml
renderView:
  - type: TextField
    label: "Enter a number:"
    dataLocation: ~.user_input
    inputType: "number"
  - type: button
    content: "Process Number"
    actions:
      - what: setData
        on: click
        path: ~.result
        value: "Number is valid and positive!"
        andConditions:
          - when: ~.user_input
            isEmpty: "not"
          - when: ~.user_input
            ">": 0
      - what: setData
        on: click
        path: ~.result
        value: "Number must be positive!"
        when: ~.user_input
        "<=": 0
      - what: setData
        on: click
        path: ~.result
        value: "Please enter a number!"
        when: ~.user_input
        isEmpty: true
  - type: div
    content: ["Result: ", ~.result]
    actions:
      - what: hide
        when: ~.result
        isEmpty: true

data:
  user_input: null
  result: null
```

## Next Steps

Congratulations! You've mastered the fundamentals of Reactive-JSON. You now understand how to structure RjBuilds, use templates, and create interactive applications with actions and reactions.

Ready to take your skills further? Explore the **[Advanced Concepts](../advanced-concepts/index.md)** to learn about data mapping, custom plugins, and performance optimization techniques.

## Related Documentation

- **[Actions System](./actions.md)**: Review state-driven UI adaptation.
- **[Template System](./template-contexts-data-binding.md)**: Revisit data binding patterns.