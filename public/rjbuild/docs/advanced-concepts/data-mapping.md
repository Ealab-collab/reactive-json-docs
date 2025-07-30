# Data Mapping System

Data Mapping is a powerful, extensible system in Reactive-JSON that allows you to selectively dispatch and transform response data from HTTP requests to specific locations in your application state.

## System Architecture

The Data Mapping system operates **after** Data Processors have processed the response, providing a clean separation of concerns:

1. **HTTP Request** → Server responds with raw data
2. **Data Processors** → Transform/validate the raw response  
3. **Data Mapping** → Selectively dispatch transformed data to application state
4. **Application State** → Updated with mapped data

## Core Components

### SimpleMapping (Core)

Reactive-JSON includes **simpleMapping** as a core data mapper, providing string-based mappings for common data dispatch scenarios:

- **Automatic Availability**: No additional configuration required
- **String-based Configuration**: YAML-friendly destination → source mappings
- **Error Handling**: Built-in fallback values and error recovery
- **Template Integration**: Full support for `~~.` and `~.` template references

**→ [View SimpleMapping Documentation & Examples](../core/dataMapping/simpleMapping)**

## Custom Data Mappers

The Data Mapping system is extensible through custom mapper plugins. You can create specialized mappers for complex transformation logic, integration with external libraries, or domain-specific processing needs.

### Creating Custom Mappers

```javascript
const customMapper = ({config, responseData, globalDataContext, templateContext}) => {
  // Custom mapping logic
  const {updateData} = globalDataContext;
  
  // Process config and apply transformations
  updateData(transformedValue, "destination.path");
};

// Register in plugin system
const customPlugins = {
  dataMapping: {
    customMapper
  }
};
```

### Integration with Core

Custom mappers are automatically merged with core mappers, allowing you to extend the system while keeping access to `simpleMapping`.

## Usage Context

Data Mapping can be used with all HTTP-based data operations in Reactive-JSON:

- **fetchData & submitData reactions**: Process API responses selectively
- **additionalDataSources**: Map initial data loading responses
- **Combined with Data Processors**: Sequential processing pipeline

## Best Practices

1. **Use simpleMapping first**: It handles most common data dispatch scenarios
2. **Combine with Data Processors**: Let processors handle validation/transformation, mappers handle dispatch
3. **Template References**: Leverage `~~.` and `~.` for dynamic mappings
4. **Error Handling**: Always configure `onErrorMap` for critical data paths
5. **Performance**: Use `required: false` with `defaultValue` for optional fields

## Related Documentation

- [SimpleMapping Examples & Configuration](../core/dataMapping/simpleMapping) - Complete guide to the core mapper
- [Data Processors](data-processors) - Pre-mapping data transformation
- [Plugin System](plugins/plugin-system) - Creating custom components
- [FetchData Reaction](../core/reaction/fetchData) - HTTP request handling
- [SubmitData Reaction](../core/reaction/submitData) - Form submission with data mapping 