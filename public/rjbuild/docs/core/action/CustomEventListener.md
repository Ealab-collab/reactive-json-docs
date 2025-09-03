# CustomEventListener

Executes a reaction when receiving custom events dispatched on DOM elements. This is an internal action component that is automatically used when you specify custom event names (like `on: "response"`) in your actions.

## Usage

CustomEventListener should **not** be used directly in the RjBuild. The Reactive-JSON engine will use it automatically when you specify custom event names (not standard DOM events) in any action. The system automatically adds this component to listen for custom events on the specific element that triggered the action.

> **Technical requirement**: The element component must provide an `attributesHolderRef` for the listener to attach its event handler to the DOM element.

## Properties

When using custom event names in actions, you can specify:

- `what` (required): Name of the reaction function to execute (e.g., `setData`, `fetchData`, `submitData`, etc.).
- `on` (required): Name of the custom event to listen for (e.g., `"response"`, `"customUpdate"`, etc.).
- All other properties are passed as arguments to the reaction function and support [forward update placeholders](../../advanced-concepts/forward-update.md).

## Behavior

When you use a custom event name in an action (like `on: "response"`):

1. The system automatically adds a CustomEventListener component
2. It attaches an event listener directly on the element that triggered the action
3. When the custom event is dispatched on that element:
   - Receives the event object with its custom data
   - Processes any [event placeholders](../../advanced-concepts/forward-update.md) in the action properties
   - Executes the reaction function specified in `what`

## How Custom Events Are Triggered

Custom events are typically triggered by reactions like `fetchData` or `submitData`:

```yaml
# fetchData automatically dispatches a "response" event when the request completes
actions:
  - what: fetchData
    on: click
    url: "/api/data.json"
    # When this completes, it dispatches a "response" event on the same element
```

## Examples

### Process HTTP response data
```yaml
renderView:
  - type: button
    content: "Load Data"
    actions:
      - what: fetchData
        on: click
        url: "/api/user-profile.json"
        updateOnlyData: true
        updateDataAtLocation: ~~.userProfile
      - what: setData
        on: response  # CustomEventListener handles this automatically
        path: ~~.userTheme
        value: <reactive-json:event-new-value>.preferences.theme
      - what: setData
        on: response
        path: ~~.lastUpdateTime
        value: <reactive-json:event-new-value>.metadata.timestamp
```

### React to submission completion
```yaml
renderView:
  - type: button
    content: "Save Profile"
    actions:
      - what: submitData
        on: click
        url: "/api/save-profile"
        data:
          name: ~~.form.name
          email: ~~.form.email
      - what: setData
        on: response  # Triggered when submitData completes
        path: ~~.saveStatus
        value: <reactive-json:event-new-value>.status
```

### Custom event handling
```yaml
renderView:
  - type: div
    content: "Custom event handler"
    actions:
      - what: setData
        on: customUpdate  # Any custom event name works
        path: ~~.customData
        value: <reactive-json:event-new-value>
```

## Event Data Access

CustomEventListener provides full access to the custom event data through the [forward update system](../../advanced-concepts/forward-update.md):

- `<reactive-json:event-new-value>` - Accesses `event.detail.value` for CustomEvent objects
- `<reactive-json:event>.detail.someProperty` - Direct access to event details
- `<reactive-json:event>.data.someValue` - For events with data property

## System Integration

- **Forward Update System**: Supports all event placeholder patterns for accessing event data
- **Reaction System**: Executes any available reaction function when events are received
- **Element-Specific**: Listens on the exact element that triggered the original action
- **Actions.jsx**: Automatically instantiated when custom event names are detected

## Differences from Standard Events

| Aspect | Standard DOM Events | Custom Events |
|--------|-------------------|---------------|
| **Handler** | ReactOnEvent | CustomEventListener |
| **Event Names** | `click`, `change`, `submit`, etc. | `response`, `customUpdate`, etc. |
| **Target** | Element (via React event system) | Element (via DOM addEventListener) |
| **Event Data** | Standard DOM event properties | Custom data in `event.detail` |
| **Triggering** | User interactions | Programmatic dispatch |

## Built-in Custom Events

Some reactions automatically dispatch custom events:

- **`response`**: Dispatched by `fetchData` and `submitData` when HTTP requests complete successfully
- **Custom events**: Can be triggered by `triggerEvent` reaction or external JavaScript

## Limitations

- Only works with custom event names in actions (not as a standalone element)
- Requires the element component to provide an `attributesHolderRef` for DOM attachment
- Listens only on the specific element that triggered the original action
- Custom events must be dispatched on the correct element to be received
- Event data structure depends on how the custom event was created
- Automatic cleanup when the component unmounts

## Technical Details

- Automatically instantiated by the Actions system when custom event names are used
- Uses `addEventListener` directly on DOM elements (not React's event system)
- Supports the full [forward update system](../../advanced-concepts/forward-update.md) for event data access
- Properly cleans up event listeners when component unmounts
- Integrates with the plugin system to execute available reaction functions

## Related Components

- **[ReactOnEvent](ReactOnEvent.md)**: Handles standard DOM events (`click`, `change`, etc.)
- **[MessageListener](MessageListener.md)**: Handles `on: "message"` events
- **[Forward Update System](../../advanced-concepts/forward-update.md)**: Event data access patterns
- **[Reactions System](../../getting-started/reactions.md)**: The actual reaction functions that CustomEventListener executes
