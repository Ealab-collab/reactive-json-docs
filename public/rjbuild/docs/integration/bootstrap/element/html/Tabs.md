# Tabs

The `Tabs` component provides a tabbed interface using React-Bootstrap. Each tab must have a unique `eventKey` and a `title` in its attributes, and can contain any valid Reactive-JSON view content.

## Properties

- `defaultActiveKey` (string, optional): The key of the tab that should be active by default
- `activeKey` (string, optional): The key of the currently active tab (for controlled mode)
- `onSelect` (reaction, optional): Reaction to execute when a tab is selected
- `variant` (string, optional): Tab style variant (`tabs`, `pills`)
- `content` (array, required): Array of tab definitions
- `attributes` (object, optional): Additional HTML attributes
- `actions` (array, optional): Actions to execute based on tab state

## Tab Definition

Each tab in the `content` array should have:
- `eventKey` (string, required): Unique identifier for the tab
- `title` (string, required): Tab header text
- `content` (any, optional): Tab content (can be any Reactive-JSON components)
- `disabled` (boolean, optional): Whether the tab is disabled
- `attributes` (object, optional): Additional attributes for the tab

## Basic Example

```yaml
renderView:
  - type: Tabs
    defaultActiveKey: "home"
    content:
      - eventKey: "home"
        title: "Home"
        content: "Welcome to the home tab!"
      - eventKey: "profile"
        title: "Profile"
        content: "This is the profile tab content."
      - eventKey: "contact"
        title: "Contact"
        content: "Contact information goes here."
```

## Dynamic Tabs Example

```yaml
renderView:
  - type: Tabs
    defaultActiveKey: ~.activeTab
    onSelect:
      - what: setData
        path: ~.activeTab
        value: "<reactive-json:event-new-value>"
    content: ~.sections
    singleOption:
      load: tabItem

templates:
  tabItem:
    eventKey: ~.id
    title: ~.name
    content:
      - type: h3
        content: ~.name
      - type: p
        content: ~.description

data:
  activeTab: "overview"
  sections:
    - id: "overview"
      name: "Overview"
      description: "General information about our service."
    - id: "features"
      name: "Features"
      description: "Key features and capabilities."
    - id: "pricing"
      name: "Pricing"
      description: "Pricing plans and options."
```

## Pills Variant Example

```yaml
renderView:
  - type: Tabs
    variant: "pills"
    defaultActiveKey: "tab1"
    content:
      - eventKey: "tab1"
        title: "Tab 1"
        content: "Content for tab 1"
      - eventKey: "tab2"
        title: "Tab 2"
        content: "Content for tab 2"
      - eventKey: "tab3"
        title: "Tab 3"
        disabled: true
        content: "This tab is disabled"
```

## Complex Content Example

```yaml
renderView:
  - type: Tabs
    defaultActiveKey: "dashboard"
    content:
      - eventKey: "dashboard"
        title: "Dashboard"
        content:
          - type: h4
            content: "Dashboard Overview"
          - type: div
            content: "Statistics and metrics go here."
      - eventKey: "settings"
        title: "Settings"
        content:
          - type: TextField
            label: "Username:"
            dataLocation: ~.settings.username
          - type: CheckBoxField
            label: "Enable notifications"
            dataLocation: ~.settings.notifications
            options:
              - value: true
                label: ""

data:
  settings:
    username: ""
    notifications: false
```



## Tab Variants

- `tabs`: Traditional tab styling (default)
- `pills`: Pill-style navigation

## Limitations

- Each `eventKey` must be unique within the tabs component
- Tab switching animations are limited to Bootstrap defaults
- Complex tab layouts may require custom CSS

## Requirements

- Bootstrap CSS must be imported
- `@ea-lab/reactive-json-bootstrap` plugin must be installed and configured
- React-Bootstrap dependencies must be available
