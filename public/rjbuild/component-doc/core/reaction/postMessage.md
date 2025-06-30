# Reaction: postMessage

## Introduction

The `postMessage` reaction sends a message to another window or frame using the standard `window.postMessage` Web API. This is useful for communication between your Reactive-JSON application and a parent window (if embedded in an iframe) or for other cross-origin communication scenarios.

## Properties

- `what` (string, required): The name of the reaction, must be `postMessage`.
- `on` (string, required): The event that triggers the reaction (e.g., `click`, `change`).
- `message` (any, required): The data to send as the message. This value is evaluated and can be any serializable type (string, number, object, array).
- `messageTarget` (string, optional): The target window for the message. Can be `'parent'` (the default) or `'self'`.
- `targetOrigin` (string, optional): Specifies the origin of the target window for security. Defaults to the current window's origin (`window.location.origin`). Use `"*"` for any origin, but be aware of the security implications.
- `includeChangedValue` (boolean, optional): If the trigger event is `change` on an input element, setting this to `true` will add the input's new value to the message payload under the key `changedValue`. Currently, this is only supported for checkboxes.

## Behavior

- When triggered, the reaction evaluates the `message` content.
- It identifies the target window based on `messageTarget` and the target origin from `targetOrigin`.
- It sends the evaluated message to the target window using `postMessage`.
- If `includeChangedValue` is true and the event is a `change` on a supported input, the input's value is added to the message.

## Testing Messages

To verify that messages are being sent correctly, you can add a message event listener in the browser's console:

```javascript
window.addEventListener("message", (evt) => {
    console.log("Event data:", JSON.stringify(evt.data));
});
```

This will log all received messages to the console, making it easy to debug and verify the message content.

## Example

### Sending a message to a parent window

This example shows how to send a message to a parent frame when a button is clicked. A parent window would need to set up a `message` event listener to receive this data.

```yaml
renderView:
  - type: button
    content: "Send Data to Parent"
    actions:
      - what: postMessage
        on: click
        message:
          type: "userAction"
          payload:
            user: ~.user.name
            action: "confirm"
        # targetOrigin: "https://parent.example.com" # Should be set for security
data:
  user:
    name: "Alice"
```

## Limitations

- The receiving window must implement an event listener for the `"message"` event to handle the incoming data.
- For security, you should always specify a precise `targetOrigin` rather than using `*` when possible.
- `includeChangedValue` currently only supports checkboxes. Other input types are not yet implemented. 