# Data Mapping Components

Data mapping components process and transform HTTP response data to specific locations in your application state. These components work with `fetchData`, `submitData` reactions, and `additionalDataSources`.

## Core Data Mappers

### SimpleMapping
The foundational data mapper that provides string-based mappings for selective data dispatch.

- **Purpose**: Map HTTP response fields to application data paths
- **Configuration**: YAML-based string mappings with destination templates
- **Features**: Required fields, default values, error handling, update modes
- **Use Cases**: User profiles, settings, API data transformation
- **Documentation**: [SimpleMapping Guide](simpleMapping.md) | [Interactive Examples](simpleMapping)

## Architecture

Data mapping processes HTTP response data to selectively dispatch it to application state:

1. **HTTP Request** → Server responds with data
2. **Data Mapping** → Selectively dispatch response data to application state
3. **Application State** → Updated with mapped data

## Creating Custom Data Mappers

For information about creating custom data mappers and the broader Data Mapping system architecture, see the [Data Mapping Documentation](../../advanced-concepts/data-mapping).

## Related

- [Data Mapping System](../../advanced-concepts/data-mapping) - System overview and custom mappers
- [Plugin System](../../advanced-concepts/plugins/plugin-system) - Component architecture 