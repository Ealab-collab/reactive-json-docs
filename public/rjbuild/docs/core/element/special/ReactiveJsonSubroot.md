# ReactiveJsonSubroot

## Introduction

The `ReactiveJsonSubroot` component allows you to render a new Reactive-JSON root inside an existing application. It is useful for embedding a sub-application, isolating a part of the data tree, or rendering a separate rjbuild with its own options.

With the `sharedUpdates` feature, the component can also propagate data changes back to the parent, enabling seamless communication between parent and subroot when working with shared data references.

## Properties
- `rjOptions` (object, required): Options to pass to the subroot - accepts **all** `ReactiveJsonRoot` properties including:
  - `rjBuildUrl`: URL to load the RjBuild from.
  - `rjBuildFetchMethod`: HTTP method ("GET" or "POST").
  - `headersForRjBuild`: Headers for the request.
  - `dataOverride`: Override data for the loaded/defined RjBuild.
  - `maybeRawAppRjBuild`: Inline RjBuild content (string or object) containing:
    - `renderView`: View definition.
    - `templates`: Template definitions.
    - `data`: Initial data.
  - `debugMode`: Enable debug mode and related wrapper components.
- `sharedUpdates` (boolean, optional): Enable upstream data propagation to parent (default: false).
- `dataOverrideEvaluationDepth` (number, optional): Special evaluation depth for dataOverride property.
- `actions` (array, optional): Action components to apply (passed to `ActionDependant` wrapper).
- Other standard component properties (e.g., `attributes`) are passed to the `ActionDependant` wrapper.

## Behavior
- Renders a new `ReactiveJsonRoot` with the provided options.
- The subroot is typically isolated from the parent for data, templates, and rendering*.
- Plugins from the parent are automatically reused in the subroot.
- All properties in `rjOptions` are evaluated with template values using `evaluateTemplateValueCollection()`.
- If `rjOptions` is not a valid object, nothing is rendered.

*_Note: Data isolation is bypassed when `sharedUpdates: true` is enabled, allowing the subroot to propagate data changes back to the parent. Templates and rendering contexts remain isolated._

## Shared Updates Feature

When `sharedUpdates: true` is enabled, the component automatically detects template references in `dataOverride` and creates update callbacks to propagate changes back to the parent.

**Data flow**: Parent data flows to subroot via `dataOverride` → Subroot changes flow back to parent via `sharedUpdates`

### How it works
1. **Automatic analysis**: The system analyzes `dataOverride` to detect references (`~~.`, `~.`, `~>`) to parent data
2. **Callback creation**: For each detected reference, an update callback is created
3. **Update interception**: When the subroot modifies data, the system checks if it corresponds to a parent reference
4. **Propagation**: If so, the update is propagated to the parent instead of being applied locally

**Important**: Only data changes are shared. Templates, rendering contexts, and component state remain isolated between parent and subroot.

### Advantages
1. **Automatic synchronization**: Data remains consistent between parent and subroot
2. **Simplicity**: No need to manually manage update callbacks
3. **Performance**: Avoids unnecessary re-renders by propagating directly to the right level
4. **Flexibility**: Supports different referencing patterns (~~., ~., ~>) and arrays containing references

### Supported reference types
- `~~.parentData` - Global data references.
- `~.localData` - Local template context references.
- `~>key.data` - Hierarchical references.
- Arrays and nested objects containing references.

### Supported vs Unsupported Cases

#### ✅ Supported cases

##### 1. Direct reference
```yaml
dataOverride: ~~.user
# Modifications in the subroot propagate to "user" in the parent
```

##### 2. Object mapping with references
```yaml
dataOverride:
  userInfo: ~~.user
  settings: ~~.config
# Modifications to "userInfo" propagate to "user" in the parent
# Modifications to "settings" propagate to "config" in the parent
```

##### 3. Local references
```yaml
dataOverride: ~.localData
# Modifications propagate to the local template context
```

##### 4. Hierarchical references
```yaml
dataOverride: ~>key.someData
# Modifications propagate up the template hierarchy
```

##### 5. Arrays in dataOverride
```yaml
dataOverride:
  - ~~.firstItem
  - ~~.secondItem
# Array items with template references are properly handled
```

#### ❌ Unsupported cases

##### Nested references in data
```yaml
dataOverride:
  someProperty: ~~.user
data:
  someProperty: ~~.anotherProperty  # Not supported
```

### Configuration example
```yaml
- type: ReactiveJsonSubroot
  sharedUpdates: true  # Enable propagation.
  rjOptions:
    # Option 1: Load from URL with data override.
    rjBuildUrl: "/api/user-form.yaml"
    dataOverride: ~~.user
    headersForRjBuild:
      Authorization: ~~.authToken
    
    # Option 2: Inline definition.
    # dataOverride: ~~.user
    # maybeRawAppRjBuild:
    #   renderView:
    #     form:
    #       - type: TextField
    #         dataLocation: ~.name
```

## Examples

### Basic subroot from URL
This example demonstrates the simplest use case: loading and rendering a separate RjBuild file as an isolated subroot. No data sharing occurs between parent and subroot.

```yaml
renderView:
  - type: ReactiveJsonSubroot
    rjOptions:
      rjBuildUrl: "/rjs-build/home.yaml"
```

### Inline definition with shared updates
This example shows how to create an editable form where changes in the subroot automatically update the parent display. The key feature here is `sharedUpdates: true` which enables data synchronization between the form fields and the parent data display.

```yaml
data:
  user:
    name: "John"
    email: "john@example.com"

renderView:
  userDisplay:
    - type: p
      content: ["Name: ", ~~.user.name]  # This displays the current user name.
  
  editForm:
    - type: ReactiveJsonSubroot
      sharedUpdates: true  # Required to update userDisplay when form changes.
      rjOptions:
        dataOverride: ~~.user
        maybeRawAppRjBuild:
          renderView:
            form:
                          - type: TextField
              label: "Name" 
              dataLocation: ~.name  # Changes propagate to ~~.user.name.
            - type: TextField
              label: "Email"
              dataLocation: ~.email  # Changes propagate to ~~.user.email.
```

### Multi-section configuration
This example demonstrates how to map different parts of the parent data to different sections within the subroot. The `dataOverride` object creates custom mappings (`userProfile` and `userSettings`) that allow the subroot to work with reorganized data while still propagating changes back to their original locations in the parent.

```yaml
data:
  profile: { name: "John", age: 30 }
  settings: { theme: "dark", lang: "en" }

renderView:
  editor:
    - type: ReactiveJsonSubroot
      sharedUpdates: true
      rjOptions:
        dataOverride:
          userProfile: ~~.profile
          userSettings: ~~.settings
        maybeRawAppRjBuild:
          renderView:
            sections:
              - type: TextField
                label: "Name"
                dataLocation: ~.userProfile.name
              - type: TextField  
                label: "Theme"
                dataLocation: ~.userSettings.theme
```

### Loading from URL with authentication
This example shows how to load an external RjBuild file while providing authentication headers and data overrides. The external form loaded from the URL will receive the user profile data and any changes made will be propagated back to the parent thanks to `sharedUpdates`. This pattern is useful for reusable form components that need to work with dynamic data and authentication.

```yaml
data:
  user:
    profile: { name: "John", role: "admin" }
  authToken: "abc123"

renderView:
  profileEditor:
    - type: ReactiveJsonSubroot
      sharedUpdates: true
      rjOptions:
        rjBuildUrl: "/forms/user-profile-form.yaml"
        dataOverride: ~~.user.profile
        headersForRjBuild:
          Authorization: ["Bearer ", ~~.authToken]
```

### Array with references
This example demonstrates how to work with arrays in `dataOverride` where each array item is mapped to different parts of the parent data. The subroot can edit individual array items and changes will be propagated back to their respective locations in the parent array.

```yaml
data:
  items: [
    { title: "Item 1", active: true },
    { title: "Item 2", active: false }
  ]

renderView:
  listEditor:
    - type: ReactiveJsonSubroot
      sharedUpdates: true
      rjOptions:
        dataOverride:
          - ~~.items.0
          - ~~.items.1
        maybeRawAppRjBuild:
          renderView:
            editors:
              - type: TextField
                label: "First item title"
                dataLocation: ~.0.title
              - type: TextField
                label: "Second item title"
                dataLocation: ~.1.title
```

## Technical Details

- Uses `dataLocationToPath()` from the template system for consistent path resolution.
- Supports all template reference types: `~~.`, `~.`, and `~>`.
- Handles arrays and nested objects in `dataOverride` when analyzing references.
- Falls back to local updates if upstream propagation fails.
- All `rjOptions` properties are evaluated with `evaluateTemplateValueCollection()`.
- Template evaluation respects the `dataOverrideEvaluationDepth` property for special cases.

## Debugging

For troubleshooting shared updates:

1. **Browser console**: Propagation errors are logged with descriptive messages.
2. **dataOverride structure**: Ensure template references are valid and exist in parent data.
3. **Data context**: Verify that referenced data exists in the expected locations.
4. **Data paths**: Confirm that `dataLocation` values in the subroot match the dataOverride structure.

## Caveat: Data Loss Risk with sharedUpdates

**⚠️ Important Warning**: When using `sharedUpdates`, there is a risk of data loss in specific scenarios.

### The Problem
If the subroot modifies data that is **not** covered by a template reference from the parent's `dataOverride`, and subsequently the parent re-renders the subroot, the local modifications will be **lost**.

### When This Happens
1. **Subroot modifies local data**: The subroot changes a value that doesn't correspond to any template reference in the parent's `dataOverride`.
2. **Parent re-renders**: This can occur when:
   - The parent updates itself for any reason.
   - A subroot action triggers an upstream update that causes the parent to re-render.
3. **Data loss**: The parent's `dataOverride` completely overwrites the subroot's data, erasing local modifications.

### Example Scenario
```yaml
# Parent has this data structure
data:
  user: { name: "John", email: "john@example.com" }

# Subroot configured like this
- type: ReactiveJsonSubroot
  sharedUpdates: true
  rjOptions:
    dataOverride: ~~.user  # Only user data is referenced
    maybeRawAppRjBuild:
      renderView:
        - type: TextField
          label: "Name"
          dataLocation: ~.name          # ✅ Safe - covered by ~~.user
        - type: TextField
          label: "Temporary Note"
          dataLocation: ~.tempNote      # ⚠️ Risk - NOT in parent data
```

In this example, if the user types in "Temporary Note" and then any parent update occurs, the `tempNote` value will be lost because it's not part of the original `~~.user` data.

### Best Practices to Avoid Data Loss
1. **Map all needed data**: Ensure all data fields the subroot might modify are included in the parent's data structure.
2. **Use complete dataOverride**: Include all necessary data paths in your `dataOverride` mapping.
3. **Avoid local-only modifications**: Design your data flow so that all user inputs correspond to parent data.
4. **Consider alternatives**: For truly local data, consider using component state or separate data management instead of `sharedUpdates`.

## Limitations
- **Data loss risk**: Local modifications in subroot may be lost when parent re-renders (see Caveat section above).
- **Nested references in data**: References within references are not supported (e.g., `dataOverride: { prop: "~~.user" }` where data contains `{ prop: "~~.other" }`).
- **Circular references**: May cause infinite loops if data structures reference each other.
- **Template isolation**: Templates and rendering contexts remain isolated even with `sharedUpdates`.
- **Data isolation by default**: Without `sharedUpdates`, data changes in the subroot do not affect the parent.
- **One-way shared updates**: `sharedUpdates` only propagates changes from subroot to parent, not vice versa.
- **Backward compatibility**: `sharedUpdates` is disabled by default to maintain existing behavior. 

## Changelog

### reactive-json@0.1.0
- **New**: `sharedUpdates` feature - enables automatic data synchronization between subroot and parent
- **New**: `dataOverride` property - allows complete data replacement in subroot with support for template references
- **New**: Automatic analysis of template references in `dataOverride` for shared updates propagation 