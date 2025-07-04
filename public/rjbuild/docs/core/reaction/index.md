# Reactive-JSON Reactions System Documentation

## Introduction

Reactions are a fundamental part of Reactive-JSON's interactivity system. They allow you to respond to user events and perform operations like data updates, network requests, and browser interactions. In the RjBuild, reactions are defined under the `actions` key, just like regular actions, but are distinguished by the presence of the `on` property.

### Basic Structure
```yaml
renderView:
  - type: button
    content: Click me
    actions:
      - what: setData    # Reaction type
        on: click        # Event that triggers the reaction
        path: ~.my_state # Where to store the data
        value: "on"      # Value to set
```

## 1. Basic Reactions

### 1.1 Data Management
- `addData` : Adds new data to the specified path
- `setData` : Sets data at the specified path
- `removeData` : Removes data from the specified path
- `moveData` : Moves data from one path to another

### 1.2 Network Operations
- `fetchData` : Fetches data from a URL
- `submitData` : Submits data to a server endpoint

### 1.3 Browser Operations
- `setClipboardData` : Copies data to the clipboard
- `redirectNow` : Performs an immediate redirect
- `triggerEvent` : Triggers a custom event
- `postMessage` : Sends a message to another window/frame

## 2. Reaction Structure
Each reaction is defined by:
- `what` : The name of the reaction to execute
- `on` : The event that triggers the reaction
- Reaction-specific options (vary by reaction type)
- **Optional conditions** : Reactions support the same conditional system as actions

### 2.1 Conditional Reactions
Just like actions, reactions can be made conditional using various comparison operators:

- `when` + `is` / `isNot` : Value equality checks
- `when` + `isEmpty` : Empty value tests
- `when` + `contains` / `containsNot` : Content search
- `when` + `>`, `<`, `>=`, `<=` : Numeric/date comparisons
- `andConditions` / `orConditions` : Complex condition logic

For example:
```yaml
actions:
  - what: setData              # Reaction name
    on: click                  # Triggering event
    path: ~.user.profile       # Reaction-specific option
    value: ~.form_data         # Reaction-specific option
    when: ~.is_editing         # Condition - only execute if editing
    is: true                   # Condition value
  - what: submitData           # Reaction name
    on: submit                 # Triggering event
    url: "/api/endpoint"       # Reaction-specific option
    method: "POST"             # Reaction-specific option
    data: ~.form_data          # Reaction-specific option
    when: ~.form_data          # Condition - only submit if form has data
    isEmpty: "not"             # Condition check
  - what: setData              # Multiple conditions example
    on: click
    path: ~.result
    value: "success"
    andConditions:             # All conditions must be true
      - when: ~.user.role
        is: "admin"
      - when: ~.feature_enabled
        is: true
```

## 3. Event Types
The `on` property accepts standard browser events. These events are the same as those used in standard web development, and their availability depends on the HTML element type. For example, a `change` event will only work on form elements like `input`, `select`, or `textarea`, while a `click` event works on any element.

Common event types:
- `click` : Mouse click (works on any element)
- `change` : Form input change (works on form elements only)
- `submit` : Form submission (works on form elements only)
- `keydown` : Keyboard key press (works on elements that can receive focus)
- `keyup` : Keyboard key release (works on elements that can receive focus)

## 4. Event Control
The `stopPropagation` property can be used to control event bubbling and subsequent actions:
```yaml
actions:
  - what: setData
    on: click
    path: ~.state
    value: "on"
    stopPropagation: true  # Prevents event bubbling AND stops execution of subsequent actions
```

When `stopPropagation` is set to `true`, it:
1. Prevents the event from bubbling up to parent elements
2. Stops the execution of any subsequent actions defined for the same event

This is particularly useful when you want to ensure that only the first matching action is executed, even if multiple actions are defined for the same event.

## 5. Technical Details
- Reactions are triggered by events
- Multiple reactions can be defined for the same event
- Reactions are executed in order
- Reactions can be chained together
- **Reactions support all the same conditional operators as actions**: `when`, `is`, `isNot`, `isEmpty`, `contains`, `>`, `<`, `>=`, `<=`, `andConditions`, `orConditions`
- Conditional reactions only execute when their conditions evaluate to true
- The execution order of multiple reactions on the same event is guaranteed to match their order in the YAML
- If a reaction's conditions are not met, it is skipped and the next reaction is evaluated

## 6. Limitations
- Reactions cannot modify external state
- Network operations must be properly configured
- Browser operations require appropriate permissions

## 7. Complete Examples

### 7.1 Data Input and Submission
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

### 7.2 Conditional Reactions Example
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

### 7.3 Complex Conditional Logic
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

## Conclusion

You now have a good understanding of reactions in Reactive-JSON. We've seen how they allow you to respond to user events and perform various operations like data updates and network requests.

To create complete interactive interfaces, you should combine reactions with actions. Actions handle the conditional behavior of elements, while reactions handle user interactions and data updates.

For more information about actions and conditional behavior, check out the [Actions Documentation](../action/index.md).