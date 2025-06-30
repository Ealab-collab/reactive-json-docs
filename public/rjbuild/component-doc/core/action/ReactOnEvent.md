# ReactOnEvent

**Type**: Internal Action Component

**Description**: ReactOnEvent is an internal action component that is automatically instantiated by the Actions system when reactions with event handlers (`on: "eventName"`) are detected. It should **not** be used directly as an element type.

## How it Works

When you define actions with event handlers (like `on: "click"`), the Actions system automatically:

1. Collects all reactions with event handlers for the element
2. Groups them by event type (click, change, mouseover, etc.)
3. Creates a ReactOnEvent component that attaches the appropriate event listeners
4. Wraps the target element with these event handlers

## Usage Pattern

Instead of using ReactOnEvent directly, you define reactions in the `actions` array of any element:

```yaml
renderView:
  - type: button
    content: "Click me"
    actions:
      - what: setData
        on: click           # This triggers ReactOnEvent internally
        path: "buttonClicked"
        value: true
```

## Supported Event Types

ReactOnEvent supports any DOM event by prefixing with `on` and capitalizing the first letter:

- `on: click` → `onClick`
- `on: change` → `onChange`
- `on: mouseover` → `onMouseOver`
- `on: keydown` → `onKeyDown`
- `on: submit` → `onSubmit`
- etc.

## Special Event Handling

Some events have special handling and **do not** use ReactOnEvent:

- `on: "message"` → Uses MessageListener component (listens on window)
- `on: "hashchange"` → Uses HashChangeListener component (listens on window)

## Event Propagation Control

By default, ReactOnEvent stops event propagation. You can control this behavior:

```yaml
actions:
  - what: setData
    on: click
    path: "clicked"
    value: true
    stopPropagation: false  # Allow event to continue propagating
```

## Technical Implementation

- **Event attachment**: Uses React's event system via `cloneElement`
- **Multiple events**: Can handle multiple event types on the same element
- **Reaction execution**: Executes reactions in the order they appear
- **Context preservation**: Maintains access to global and template data contexts
- **Early termination**: Supports `stopPropagation: true` to halt reaction chain execution

## Related Components

- **[MessageListener](MessageListener.md)**: Handles `on: "message"` events
- **[HashChangeListener](HashChangeListener.md)**: Handles `on: "hashchange"` events
- **[Reactions System](../reaction/index.md)**: The actual reaction functions that ReactOnEvent executes

## Important Notes

- **Not for direct use**: Never use `type: ReactOnEvent` in your renderView
- **Automatic instantiation**: The Actions system creates this component automatically
- **Internal implementation**: This is part of the framework's internal architecture
- **Event binding**: Events are bound to the actual DOM elements, not wrapper components 