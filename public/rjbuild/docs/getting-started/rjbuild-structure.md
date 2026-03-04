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

### Arrays in Content vs. Attributes

- Arrays are supported in `content` to render multiple text nodes or elements in sequence (they are not string concatenations).
- Do not use arrays inside HTML attributes (e.g., `href`, `class`, `id`). Attributes expect a single value. If you need a composed value, compute it beforehand and pass the final string.

Example (valid):
```yaml
content: ["Go to ", ~.sectionName]
```

Example (invalid in attributes):
```yaml
# ❌ Do not do this
attributes:
  href: ["#", ~.id]
```

Instead, prepare the value upstream:
```yaml
# ✅ Provide a ready-to-use attribute value
attributes:
  href: ~.href  # where href is a string like "#section-3"
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

 > You can get more information about data access in the [template system documentation](./template-contexts-data-binding.md).

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
- **`src`** (required): URL of the data source. Can be a **string** (used as-is) or an **array of segments** — see [Dynamic URLs](#dynamic-urls-with-src-as-array) below.
- **`path`** (optional): Path where to place the data (template syntax).
- **`method`** (optional): HTTP method (GET, POST, etc.).
- **`dataMapping`** (optional): Configure selective data dispatch using mapping processors.
- **`blocking`** (optional): If `true`, waits for loading before displaying.
- **`fallbackDataSource`** (optional): An alternate source tried when the primary fails — see [Fallback Sources](#fallback-sources) below.

### Dynamic URLs with `src` as Array

When `src` is an array, each element is processed individually and the results are assembled into the final URL. The array can mix three kinds of elements:

#### 1. Plain strings and store references

A plain string is used as a literal. A string starting with `~~.` or `~.` is resolved from the root store data (both notations are equivalent in this context).

```yaml
additionalDataSource:
  - src:
      - "/api/items/"
      - ~~.itemId        # resolved from root data
      - "/details"
    path: ~~.itemDetails
    blocking: true
```

#### 2. Segment objects — `{ segment, required? }`

A segment object resolves a dynamic value and inserts it as a path part.

```yaml
additionalDataSource:
  - src:
      - "/api/"
      - segment: ~~.category    # resolved as a path segment
      - "/items"
    path: ~~.items
    blocking: true
```

When `required: true` is set and the segment resolves to `null` or empty, the entire URL is aborted (returns `null`) instead of producing a broken URL. This triggers the `fallbackDataSource` if one is defined, otherwise the source is skipped with a warning.

```yaml
additionalDataSource:
  - src:
      - "/api/items/"
      - segment: ~~.requiredId
        required: true          # abort URL if null
    fallbackDataSource:
      src: "/api/items/default"
      path: ~~.item
    path: ~~.item
    blocking: true
```

#### 3. Query param objects — `{ param, value, required? }`

A param object adds a key-value pair to the URL query string. Both the key and the value accept store references.

```yaml
additionalDataSource:
  - src:
      - "/api/items"
      - param: id
        value: ~~.itemId          # ?id=<itemId>
      - param: ~~.filterParamName
        value: ~~.filterValue     # dynamic key and value
    path: ~~.items
    blocking: true
```

**Null handling for params:**
- If either the key or the value resolves to `null`/empty and `required` is absent or `false`, the param is **silently omitted** from the URL.
- If either resolves to `null`/empty and `required: true` is set, the entire URL is **aborted**, triggering `fallbackDataSource` if defined.

```yaml
additionalDataSource:
  - src:
      - "/api/search"
      - param: q
        value: ~~.searchQuery     # omitted if null
      - param: type
        value: ~~.filterType
        required: true            # abort if null
    path: ~~.results
    blocking: true
```

#### Mixing all three types

Path parts (plain strings, `~~.`/`~.` strings, and `segment` objects) are concatenated in order. All `param` objects are collected and appended as a query string after the path.

```yaml
additionalDataSource:
  - src:
      - "/api/"
      - segment: ~~.category     # path: /api/electronics
        required: true           # abort URL if category is null
      - "/items"                 # path: /api/electronics/items
      - param: id
        value: ~~.itemId         # ?id=42
      - param: ~~.extraKey
        value: ~~.extraValue     # &q=hello
    path: ~~.result
    blocking: true
# Resolved URL: /api/electronics/items?id=42&q=hello
```

This is particularly useful when an RjBuild is loaded inside a `ReactiveJsonSubroot` with `dataOverride`, where dynamic values (like entity IDs) are injected by the parent.

```yaml
# Parent RjBuild passes taskId via dataOverride
- type: ReactiveJsonSubroot
  rjOptions:
    rjBuildUrl: "/components/TimeLogManager.yaml"
    dataOverride:
      taskId: ~.task.id
```

```yaml
# TimeLogManager.yaml — uses taskId as a query param
additionalDataSource:
  - src:
      - "/api/time-logs"
      - param: "filter[task]"
        value: ~~.taskId
        required: true
    path: ~~.timeLogs
    blocking: true

data:
  taskId: ""    # Will be overridden by dataOverride
  timeLogs: []
```

### Fallback Sources

The `fallbackDataSource` property defines an alternate source that is tried automatically when the primary source cannot be used. It accepts the same structure as a regular `additionalDataSource` item, including its own `fallbackDataSource` for chaining.

A fallback is triggered in two situations:

1. **The URL cannot be resolved** — a segment or param marked `required: true` resolved to `null` or empty.
2. **The HTTP request fails** — the server returns an error (4xx, 5xx, network failure, etc.).

```yaml
additionalDataSource:
  # Fallback on missing required param
  - src:
      - "/api/items"
      - param: id
        value: ~~.selectedId
        required: true
    path: ~~.item
    fallbackDataSource:
      src: "/api/items/default"
      path: ~~.item
    blocking: true

  # Fallback on HTTP error
  - src: "/api/live-config"
    path: ~~.config
    fallbackDataSource:
      src: "/api/config-cache"
      path: ~~.config
    blocking: true
```

When a fallback is triggered, a warning is logged in the console explaining the reason. If no fallback is defined and the primary fails, the source is skipped with a warning.

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
data:
  userId: "42"
  section: "reports"
  formatParam: "json"
  optionalFilter: null     # null → param silently omitted
  fallbackSection: "home"

additionalDataSource:
  # Static URL — simple string form
  - src: "/api/user-profile.json"
    path: ~~.currentUser
    blocking: true

  # Dynamic path segment + query params
  - src:
      - "/api/"
      - segment: ~~.section    # e.g. /api/reports
      - param: userId
        value: ~~.userId       # ?userId=42
      - param: format
        value: ~~.formatParam  # &format=json
      - param: filter
        value: ~~.optionalFilter  # null → omitted
    path: ~~.sectionData
    blocking: true

  # Required param with fallback on failure or HTTP error
  - src: "/api/system-config"
    path: ~~.systemConfig
    fallbackDataSource:
      src: "/api/system-config-cache"
      path: ~~.systemConfig
    blocking: false

renderView:
  - type: div
    content:
      - type: h1
        content: ["Hello ", ~~.currentUser.name]
      - type: p
        content: ["Version: ", ~~.systemConfig.version]
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
1. **Consistent naming**: Use clear conventions for templates and data.
2. **Documentation**: Comment complex sections.
3. **Validation**: Verify the structure of your external data.

## Next Steps

 Now that you understand the structure of RjBuilds, learn about the **[Template System](./template-contexts-data-binding.md)** to master data binding and create reusable components.

The template system is crucial for building maintainable and dynamic applications with Reactive-JSON. 