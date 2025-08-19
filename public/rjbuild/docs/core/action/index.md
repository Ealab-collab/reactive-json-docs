# Actions

> For an introduction to the actions system and detailed examples, see [Getting Started: Actions](../../getting-started/actions.md).

Actions in Reactive-JSON allow you to modify element behavior and appearance based on dynamic conditions. They are evaluated continuously based on data state and provide state-driven UI adaptation.

## Available Action Components

### Visibility Control
- **[Hide](./Hide.md)**: Completely hides the element and its children
- **[VisuallyHide](./VisuallyHide.md)**: Visually hides the element while keeping it accessible to screen readers

### User Interaction
- **[Tooltip](./Tooltip.md)**: Displays a tooltip on hover
- **[Popover](./Popover.md)**: Shows a more complex popover on click

### Navigation
- **[Redirect](./Redirect.md)**: Redirects to a specified URL

### Attribute Management
- **[SetAttributeValue](./Attribute/SetAttributeValue.md)**: Sets or modifies HTML attribute values dynamically
- **[UnsetAttribute](./Attribute/UnsetAttribute.md)**: Completely removes HTML attributes
- **[UnsetAttributeValue](./Attribute/UnsetAttributeValue.md)**: Removes specific values from HTML attributes
- **[ToggleAttributeValue](./Attribute/ToggleAttributeValue.md)**: Toggles the presence of specific values in HTML attributes

### Event Management

Those actions have a special handling in Reactive-JSON. The engine transparently load them
when the user requests a [reaction](../../getting-started/reactions.md) on a given element component.

As a user, you won't need to work with them directly.

- **[HashChangeListener](./HashChangeListener.md)**: Listens for URL hash changes
- **[MessageListener](./MessageListener.md)**: Listens for window messages
- **[ReactOnEvent](./ReactOnEvent.md)**: Reacts to custom events
