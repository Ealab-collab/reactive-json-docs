# Reactive-JSON submitData Documentation

## Introduction
`submitData` is a reaction that allows sending data to a server via HTTP requests (usually POST). It's especially useful for form submissions and API interactions.

- The payload can be customized with the `data` property.
- Only one submission can be active at a time (global lock).
- The response can refresh the app (default) or be ignored.

## Properties
- `url` (string, required): The destination URL for the request
- `httpMethod` (string, optional): The HTTP method to use (default: "post")
- `data` (object, optional): The data to send. If not specified, data is sent in an object with the structure `{ data: globalDataContext.templateData }`. If `__state` exists in the context, it is automatically added.
- `refreshAppOnResponse` (boolean, optional): If true (default), reloads the application with the server response. If false, the response is ignored and **no change is made to the application's state or display** (just like `fetchData`).
- `submitSilently` (boolean, optional): If true, doesn't apply visual disabling styles during submission
- `updateOnlyData` (boolean, optional): When true and `refreshAppOnResponse` is true, only updates the data section instead of replacing the entire RjBuild. Preserves templates and renderView. Default: false.
- `updateDataAtLocation` (string, optional): When `updateOnlyData` is true, specifies where to place the response data using template path syntax (e.g., "~~.userProfile", "~.config.settings"). If not specified, replaces the entire data object.

## Behavior
- Only one submission can be active at a time (global lock)
- The default HTTP method is POST, but can be customized
- The payload is either the provided `data` object or the full data context
- Only the first level of the `data` object is evaluated as templates
- In case of an error, the submission is cancelled and logged to the console
- Interface elements are visually disabled during submission (unless `submitSilently` is enabled)
- When `refreshAppOnResponse` is false, the response is ignored (webhook mode)
- When `refreshAppOnResponse` is true and `updateOnlyData` is false, the server response must be a valid rjbuild and will replace the entire application state
- When `refreshAppOnResponse` is true and `updateOnlyData` is true:
  - Only the data section is updated, preserving templates and renderView
  - Without `updateDataAtLocation`: **completely replaces** the entire data object
  - With `updateDataAtLocation`: updates only the specified path in the data

> **⚠️ Important:** When using `updateOnlyData: true`, the server response must contain **data only**, not a complete RjBuild structure. The response should be the raw data object, not wrapped in `{data: {...}, renderView: [...], templates: {...}}`.

## Submission States & Styling
The system uses a global locking mechanism to handle submissions:
- Only one submission can be active at a time for all application roots
- New submissions are ignored while another is in progress
- Interface elements are visually disabled (unless `submitSilently` is enabled)
- The lock is released once the response is received

This limitation is intentional to avoid data consistency issues but may be restrictive in some use cases.

### Styling Submitting State (CSS)
You can visually disable form controls during submission using CSS. There are two main approaches:

#### 1. Target only the submitting control (button, input, etc.)
The element that triggered the submission receives `data-is-submitting="true"` during the request:

```css
input[data-is-submitting="true"],
button[data-is-submitting="true"],
select[data-is-submitting="true"],
textarea[data-is-submitting="true"] {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

#### 2. Target all controls globally during submission
While a submission is in progress, the `<body>` receives `data-html-builder-is-submitting="true"`. You can use this to disable all form controls:

```css
body[data-html-builder-is-submitting="true"] input,
body[data-html-builder-is-submitting="true"] button,
body[data-html-builder-is-submitting="true"] select,
body[data-html-builder-is-submitting="true"] textarea {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

Choose the approach that best fits your UX needs.

## Example
```yaml
actions:
  - what: submitData
    on: click
    url: "/mockup-api/submitData/example.json"
    data:
      username: ~.form_data.username
    refreshAppOnResponse: true
```

## Data Management
Only the first level of the `data` object is evaluated as templates. For nested objects, you must specify the full path explicitly.

Example:
```yaml
data:
  username: ~.form_data.username  # Evaluated
  profile:
    name: ~.user.name            # Not evaluated (static)
    email: ~.user.email          # Not evaluated (static)
```

If `data` is not specified, the entire `data` context is sent as `{ data: ... }`.

### __state Property
`__state` is a special property that is automatically added to the payload when sending data if it exists in the global context. It allows transmitting the application state to the server.

Example usage in a multi-screen form:
```yaml
# State sent to server
data:
  form_data:
    username: "john"
    email: "john@example.com"
  __state:
    current_screen: "step2"
    previous_screen: "step1"
    form_progress: 50

# Server response
data:
  form_data:
    username: "john"
    email: "john@example.com"
  __state:
    current_screen: "step3"
    previous_screen: "step2"
    form_progress: 75
    validation_status: "success"
```

This bidirectional state synchronization allows to:
- Validate that the progression is consistent
- Adapt the response based on the current screen
- Manage navigation between screens
- Save progression state
- Maintain consistency between client and server

## Data Update Behavior
When using `updateOnlyData: true`:

### Without updateDataAtLocation (Complete Data Replacement)
```yaml
# Before request - original data:
data:
  userProfile: { name: "John", email: "john@example.com" }
  settings: { theme: "dark" }
  notifications: { count: 5 }

# Server response after submission:
{
  savedProfile: { name: "Jane", email: "jane@example.com" }
  validationStatus: "success"
}

# After request - data is COMPLETELY REPLACED:
data:
  savedProfile: { name: "Jane", email: "jane@example.com" }
  validationStatus: "success"
  # ❌ userProfile, settings, notifications are LOST
```

### With updateDataAtLocation (Targeted Update)
```yaml
# Before request - original data:
data:
  userProfile: { name: "John", email: "john@example.com" }
  settings: { theme: "dark" }
  notifications: { count: 5 }

# Request with updateDataAtLocation: "~~.userProfile"
# Server response after submission:
{
  name: "Jane",
  email: "jane@example.com",
  lastUpdated: "2024-01-15T10:30:00Z"
}

# After request - only userProfile is updated:
data:
  userProfile: { name: "Jane", email: "jane@example.com", lastUpdated: "2024-01-15T10:30:00Z" }
  settings: { theme: "dark" }         # ✅ Preserved
  notifications: { count: 5 }        # ✅ Preserved
```

## Use Cases with updateOnlyData: true
1. **Form submissions** that return updated record data without full page refresh
2. **Profile updates** that preserve application state and UI structure
3. **Configuration saves** that update specific settings sections
4. **Partial data synchronization** after server-side processing
5. **Status updates** that need to store results in specific data locations
6. **Multi-step forms** where each step updates different data sections

## Example use cases

### Data-Only Update (Complete Replacement)

In this example, the web service returns the full data that Reactive-JSON
will load at its data root.

```yaml
actions:
  - what: submitData
    on: click
    url: "/api/user/save"
    data:
      userProfile: ~.userProfile
    refreshAppOnResponse: true
    updateOnlyData: true  # Only updates data, preserves templates/renderView
```

### Targeted Data Update

In this example, the web service returns data to put at a specific location.

```yaml
actions:
  - what: submitData
    on: click
    url: "/api/user/profile"
    data:
      name: ~.form.name
      email: ~.form.email
    refreshAppOnResponse: true
    updateOnlyData: true
    updateDataAtLocation: "~~.userProfile"  # Updates only userProfile section
```

### Save Settings to Specific Location

In this example, the web service returns data to put at a specific deep location.

```yaml
actions:
  - what: submitData
    on: click
    url: "/api/settings/save"
    data:
      theme: ~.settingsForm.theme
      notifications: ~.settingsForm.notifications
    refreshAppOnResponse: true
    updateOnlyData: true
    updateDataAtLocation: "~~.config.userSettings"  # Deep update
```

### Form Submission with Response Processing

In this example, the submission result returned by the web service is stored
at a location in data; this location does not need to be initialized before,
it will be created when needed.

```yaml
actions:
  - what: submitData
    on: click
    url: "/api/form/submit"
    data:
      formData: ~.currentForm
      userId: ~~.currentUser.id
    refreshAppOnResponse: true
    updateOnlyData: true
    updateDataAtLocation: "~~.submissionResult"  # Store result separately
```

## Limitations
- Only one submission can be active at a time (global lock)
- Only the first level of the `data` object is evaluated as templates
- Only POST (or custom method) requests are supported
- The server response must be a valid rjbuild if `refreshAppOnResponse` is true and `updateOnlyData` is false
- No built-in error handling beyond console logging
- No support for request cancellation
- No support for timeouts
- No support for dynamic URLs (URLs must be static strings)
- No support for query parameters in URL templates
- No support for complex URL routing or path generation
- `updateDataAtLocation` paths must be valid template paths that resolve to data locations