# SimpleMapping

SimpleMapping is the core data mapping processor in Reactive-JSON that enables selective dispatch and transformation of HTTP response data to specific locations in your application state. It provides a straightforward, configuration-driven approach to map response fields to application data paths.

## Properties

### stringMap Configuration

- `value` (string, required): Source path in the HTTP response (e.g., `user.firstName`).
- `required` (boolean, optional, default: true): Whether the source value must exist.
- `defaultValue` (any, optional): Fallback value when source is missing and not required.
- `updateMode` (string, optional, default: "replace"): How to apply the value (`replace`, `add`, `move`, `remove`).

### onErrorMap Configuration

- `value` (string, required): Can be either static values (e.g., `Error occurred`) or template references (e.g., `~~.errorTimestamp`).

## Configuration Structure

The `onErrorMap` works like `stringMap`, but provides fallback values when main mappings fail. Same key-value structure as `stringMap` (destination → configuration). Applied only when corresponding `stringMap` entries fail and are marked as `required: true`.

## Basic Example

```yaml
- what: fetchData
  url: "/api/user-profile"
  updateOnlyData: true
  dataMapping:
    simpleMapping:
      stringMap:
        "~~.currentUser.name":
          value: "user.firstName"
        "~~.currentUser.email":
          value: "user.email"
        "~~.settings.theme":
          value: "user.preferences.theme"
          required: false
          defaultValue: "light"

data:
  currentUser: {}
  settings: {}
```

## Error Handling Example

```yaml
- what: fetchData
  url: "/api/incomplete-data"
  updateOnlyData: true
  dataMapping:
    simpleMapping:
      stringMap:
        "~~.profile.name":
          value: "user.name"
          required: true
        "~~.profile.email":
          value: "user.email"
          required: true
      onErrorMap:
        "~~.profile.status":
          value: "Error loading profile"
        "~~.profile.name":
          value: "Unknown User"
        "~~.profile.email":
          value: "unknown@example.com"
        "~~.profile.loadedAt":
          value: "~~.currentTimestamp"

data:
  profile: {}
  currentTimestamp: "2024-01-15T10:30:00Z"
```

## Advanced Configuration

```yaml
dataMapping:
  simpleMapping:
    stringMap:
      "~~.order.id":
        value: "order.id"
      "~~.order.customerName":
        value: "order.customer.name"
      "~~.order.customerEmail":
        value: "order.customer.contact.email"
      "~~.order.total":
        value: "order.billing.total"
      "~~.order.currency":
        value: "order.billing.currency"
        required: false
        defaultValue: "USD"
```

## Integration with additionalDataSources

```yaml
additionalDataSource:
  - src: "/api/user-profile"
    blocking: true
    dataMapping:
      simpleMapping:
        stringMap:
          "~~.profile.displayName":
            value: "user.name"
          "~~.profile.email":
            value: "user.email"
          "~~.settings.theme":
            value: "user.preferences.theme"
            required: false
            defaultValue: "light"

data:
  profile: {}
  settings: {}
```

## Usage Context

SimpleMapping is automatically available as part of the core Reactive-JSON plugins and can be used in:

- **fetchData reactions**: Process API responses selectively
- **submitData reactions**: Handle server responses after form submissions
- **additionalDataSources**: Map initial data loading responses

## Related

- [Data Mapping System Overview](../../advanced-concepts/data-mapping) - Complete system architecture and custom mappers
- [FetchData Reaction](../reaction/fetchData) - HTTP request handling with data mapping
- [SubmitData Reaction](../reaction/submitData) - Form submission with data mapping
- [Plugin System](../../advanced-concepts/plugins/plugin-system) - Component architecture 