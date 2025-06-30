# MessageListener

**Description**: Executes a reaction when receiving a message via `window.postMessage`. This is an internal action component that is automatically used when you specify `on: "message"` in your actions.

## Usage

MessageListener is **not** used directly as an element type. Instead, it is automatically triggered when you use `on: "message"` in any action. The system automatically adds this component to listen for messages globally on the window object.

## Properties

When using `on: "message"` in actions, you can specify:

- `what` (required): name of the reaction function to execute (e.g., `setData`, `fetchData`, `submitData`, etc.)
- `whenMessageIs` (optional): message value to react to (deep comparison with the received message data)
- All other properties are passed as arguments to the reaction function

## Behavior

When you use `on: "message"` in an action:

1. The system automatically adds a MessageListener component
2. It listens to messages via the global event system (`EventDispatcherContext`)
3. When a message is received:
   - Checks if the message origin matches the current window's origin (security measure)
   - If `whenMessageIs` is defined, performs a deep comparison with the message data
   - If conditions are met, executes the reaction function specified in `what`

## Examples

### React to specific message
```yaml
renderView:
  - type: button
    content: "Click me"
    actions:
      - what: setData
        on: message
        whenMessageIs:
          type: "userAction"
          action: "update"
        path: "lastMessage"
        value: "Message received"
```

### React to any message
```yaml
renderView:
  - type: div
    content: "Waiting for messages..."
    actions:
      - what: setData
        on: message
        path: "messageReceived"
        value: true
```

### Store message data
```yaml
renderView:
  - type: div
    content: "Message handler"
    actions:
      - what: setData
        on: message
        whenMessageIs:
          actor: "parent"
        path: "parentMessage"
        value: ~.message
```

## System Integration

- **EventDispatcherContext**: Uses the global event system to optimize performance
- **TemplateSystem**: The `whenMessageIs` value is evaluated through the template system
- **GlobalDataContext**: Provides context for reaction execution
- **Actions.jsx**: Automatically instantiated when `on: "message"` is detected

## Limitations

- Only works with `on: "message"` in actions (not as a standalone element)
- Only messages from the same `origin` are accepted (security measure)
- Depends on ReactiveJSON's global event system
- Uses deep comparison with lodash's `isEqual` for message matching
- One reaction per action definition (use multiple actions for multiple reactions)

## Technical Details

- Automatically instantiated by the Actions system when `on: "message"` is used
- Uses `useEffect` to subscribe/unsubscribe to events
- Reaction functions are imported from `ReactOnEvent.jsx`
- Optimized to avoid too many real DOM listeners through the context system
- Automatically cleans up listeners when component unmounts
- Security: Only accepts messages from the same origin as the current window 