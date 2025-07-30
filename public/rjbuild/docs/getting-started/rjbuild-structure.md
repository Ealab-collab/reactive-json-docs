# RjBuild File Structure

## What is an RjBuild?

An **RjBuild** is the standard file format used by Reactive-JSON to build interactive web applications. It is a JSON or YAML structure that completely describes a user interface, its data, and behavior, without requiring traditional JavaScript code.

> By extension, we also call "RjBuild" any fragment of this structure, particularly a portion of `renderView` and `templates` that can be reused or included in other RjBuilds.

### Supported Formats

An RjBuild can be written in two formats:

- **YAML** (recommended): More readable and easier to write for humans, ideal for creation and maintenance
- **JSON**: Standard supported format, useful for programmatic generation or integration with existing tools

**YAML is preferable** for most use cases as it offers better readability, allows comments, and is more tolerant of minor syntax errors.

## Basic Structure of an RjBuild

Any RjBuild file can contain up to four main sections:

- `renderView`: User interface structure (required)
- `templates`: Reusable components (optional)
- `data`: Initial state and data (optional)
- `additionalDataSource`: External data sources (optional)

```yaml
renderView:           # User interface structure (required)
  - type: div
    content: "Hello World"

templates:            # Reusable components (optional)
  myComponent:
    type: div
    content: "Template content"

data:                 # Initial state and data (optional)
  message: "Welcome!"
  user:
    name: "John"

additionalDataSource: # External data sources (optional)
  - src: "/api/data.json"
    path: ~~.dynamicData
```

## Section `renderView` (Required)

The `renderView` section defines the **user interface** that will be displayed. It is the only required section of an RjBuild.

### Role
- Determines the visual structure of the application
- Defines the components to display and their organization
- Specifies interactions and behaviors

### Structure

```yaml
renderView:
  - type: ComponentName    # Type of component to render
    content: "Content"     # Component content
    attributes:            # HTML attributes (optional)
      class: "css-class"
    actions:               # Interactive actions (optional)
      - what: hide
        on: click
```

### Examples

#### Simple interface
```yaml
renderView:
  - type: div
    content: 
      - type: h1
        content: "My Application"
      - type: p
        content: "Welcome!"
```

#### With dynamic data
```yaml
renderView:
  - type: div
    content: ["Hello ", ~~.user.name, "!"]

data:
  user:
    name: "Marie"
```

## Section `data` (Optional)

The `data` section contains the **initial state** of the application. This data can be read and modified by components.

### Role
- Provides the initial state of the application
- Stores data modifiable by user interactions
- Enables data sharing between components

### Structure

```yaml
data:
  # Simple data
  title: "My Site"
  isLoggedIn: false
  
  # Objects
  user:
    name: "John"
    email: "john@example.com"
    
  # Arrays
  items:
    - name: "Item 1"
      active: true
    - name: "Item 2" 
      active: false
```

### Data Access

To use data in a component, you can use the following syntax:

- **`~~.`**: Global access to data from anywhere in the RjBuild
- **`~.`**: Local access to data from the current context (template)

### Usage Examples

#### Forms with state
```yaml
renderView:
  - type: TextField
    label: "Name"
    dataLocation: ~~.user.name
  - type: div
    content: ["Entered name: ", ~~.user.name]

data:
  user:
    name: "Initial value"
```

#### Conditional display
```yaml
renderView:
  - type: div
    content: "User is logged in!"
    actions:
      - what: hide
        when: ~~.isLoggedIn
        is: false

data:
  isLoggedIn: true
```

> You can get more information about data access in the [template system documentation](./template.md).

## Section `templates` (Optional)

The `templates` section defines **reusable components** that can be used in `renderView` or other templates.

### Role
- Avoids code duplication
- Enables reuse of complex structures
- Facilitates maintenance and modifications

### Structure

```yaml
templates:
  templateName:         # Template name
    type: ComponentName # Template structure
    content: "Content"
    
  multipleComponents:   # Template with multiple components
    - type: div
      content: "Component 1"
    - type: p
      content: "Component 2"
```

### Using templates

```yaml
renderView:
  - load: templateName  # Loads and displays the template

templates:
  templateName:
    type: div
    content: "I am a reusable template!"
```

### Data Context

Templates create their own **data context** when used with components like `Switch`:

```yaml
renderView:
  - type: Switch
    content: ~~.users        # Iterates over each user
    singleOption:
      load: userCard        # Each user uses the template

templates:
  userCard:
    type: div
    content:
      - "Name: "
      - ~.name              # Local access to current user's name
      - " (Admin: "
      - ~~.isAdmin          # Global access to settings

data:
  isAdmin: true
  users:
    - name: "Alice"
    - name: "Bob"
```

## Section `additionalDataSource` (Optional)

The `additionalDataSource` section allows **loading data from external sources** during application initialization.

### Role
- Integrates dynamic data from APIs
- Enables asynchronous data loading
- Separates static data from dynamic data

### Structure

```yaml
additionalDataSource:
  - src: "/api/endpoint"    # Source URL (required)
    path: ~~.targetPath     # Where to place the data (optional)
    method: GET             # HTTP method (optional, default: GET)
    blocking: true          # Block rendering (optional, default: false)
```

### Properties
- **`src`** (required): URL of the data source
- **`path`** (optional): Path where to place the data (template syntax)
- **`method`** (optional): HTTP method (GET, POST, etc.)
- **`dataMapping`** (optional): Configure selective data dispatch using mapping processors
- **`blocking`** (optional): If `true`, waits for loading before displaying

### Loading Modes

#### Blocking loading
```yaml
additionalDataSource:
  - src: "/api/user-profile.json"
    path: ~~.currentUser
    blocking: true          # Page waits for loading
```

#### Non-blocking loading
```yaml
additionalDataSource:
  - src: "/api/notifications.json"
    path: ~~.notifications
    blocking: false         # Page displays immediately
```

### Data Placement

#### With specific path
```yaml
additionalDataSource:
  - src: "/api/user.json"
    path: ~~.currentUser
    
# Data will be placed in data.currentUser
```

#### Root-level merge
```yaml
additionalDataSource:
  - src: "/api/config.json"
    # No path = direct merge into data
```

### Data Mapping Integration

Data Mapping can be used with `additionalDataSource` to selectively dispatch response data to specific locations:

```yaml
additionalDataSource:
  - src: "/api/user-profile"
    blocking: true
    dataMapping:
      simpleMapping:
        stringMap:
          "profile.displayName": { value: "user.name" }
          "profile.email": { value: "user.email" }
          "settings.theme": 
            value: "user.preferences.theme"
            required: false
            defaultValue: "light"
```

**Note**: When `dataMapping` is configured, it takes priority over the `path` property. For more details, see [Data Mapping Documentation](../advanced-concepts/data-mapping.md).

### Complete Example

```yaml
renderView:
  - type: div
    content:
      - type: h1
        content: ["Hello ", ~~.currentUser.name]
      - type: p
        content: ["Version: ", ~~.systemConfig.version]

data:
  currentUser:
    name: "Loading..."    # Temporary value
  systemConfig:
    version: "Loading..."

additionalDataSource:
  # Critical user data (blocking)
  - src: "/api/user-profile.json"
    path: ~~.currentUser
    blocking: true
    
  # System configuration (non-blocking)
  - src: "/api/system-config.json"
    path: ~~.systemConfig
    blocking: false
```

## Best Practices

### Organization
1. **Logical structure**: Organize your data by functional domain
2. **Reusable templates**: Create templates to avoid duplication
3. **Default values**: Provide temporary values for external data

### Performance
1. **Smart loading**: Use `blocking: true` only for critical data
2. **Minimal data**: Load only necessary data
3. **Optimized templates**: Avoid overly complex templates

### Maintainability
1. **Consistent naming**: Use clear conventions for templates and data
2. **Documentation**: Comment complex sections
3. **Validation**: Verify the structure of your external data 