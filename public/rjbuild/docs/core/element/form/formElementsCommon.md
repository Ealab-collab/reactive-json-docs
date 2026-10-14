# Form Elements Common Utilities

The `formElementsCommon.jsx` file provides shared utilities for all form components in Reactive-JSON. These utilities handle data location resolution, path calculation, and default value management.

## propsDataLocationToPathAndValue Function

This utility function is the core of form data management across all form components. It resolves data location and provides the current value and path for form field synchronization.

### Parameters

- `currentPath` (string): The current path of the component in the template hierarchy
- `datafield` (string): The field name of the component (used for template-scoped data)
- `dataLocation` (string|undefined): The custom data location specified in the component
- `defaultValue` (any): The default value to use when no data is present
- `globalDataContext` (object): The global data context object
- `templateContext` (object): The template context object

### Return Value

Returns an object with:
- `formData`: The current value of the form field
- `formDataPath`: The path array for updating the data

### Data Location Resolution Logic

The function implements two data binding strategies:

#### Custom Data Location
When `dataLocation` is provided:
- Evaluates the template value at the specified location
- Uses the resolved path for data updates
- Falls back to `defaultValue` if the location is undefined

#### Template-Scoped Data
When no `dataLocation` is provided:
- Uses the component's `datafield` as the key
- Stores data in the template context under this key
- Automatically initializes with `defaultValue` if not present
- Creates the template data object if it doesn't exist

### Usage Example

```javascript
const {formData, formDataPath} = propsDataLocationToPathAndValue({
    currentPath: "user.profile",
    datafield: "username",
    dataLocation: "~.user.name",
    defaultValue: "",
    globalDataContext,
    templateContext,
});
```

## Implementation Details

### Template Data Initialization
```javascript
if ((templateContext.templateData[datafield] ?? undefined) === undefined) {
    templateContext.templateData = (typeof templateContext.templateData === "object") 
        ? templateContext.templateData 
        : {};
    templateContext.templateData[datafield] = defaultValue;
}
```

### Path Resolution
The function uses `dataLocationToPath` to convert template paths to array paths suitable for the `updateData` function in the global data context.

## Benefits

- **Consistent data handling**: All form components use the same data resolution logic
- **Flexible binding**: Supports both explicit paths and automatic field naming
- **Safe initialization**: Handles missing data gracefully with default values
- **Template integration**: Works seamlessly with the template system
- **Performance**: Minimal overhead with efficient path resolution

## Form Component Integration

All form components follow this pattern:

```javascript
const {formData, formDataPath} = propsDataLocationToPathAndValue({
    currentPath: path,
    datafield: datafield,
    dataLocation: props.dataLocation,
    defaultValue: props.defaultFieldValue,
    globalDataContext,
    templateContext,
});

const onChange = (e) => {
    globalDataContext.updateData(e.currentTarget.value, formDataPath);
};
```

This ensures consistent behavior across TextField, NumberField, SelectField, CheckBoxField, TextAreaField, and DateField components.

## evaluateFieldOptions Function

This utility returns the evaluated options of an option-based component (`SelectField`, `CheckBoxField`, `LabelFromValue`). Use it in a custom component that reads `options` / `dynamicOptions` / `optionMapping`, so that it supports the same option sources as the core components.

### Parameters

- `props` (object): The component props. The function reads `dynamicOptions`, `options` and `optionMapping`.
- `globalDataContext` (object): The global data context object
- `templateContext` (object): The template context object

### Return Value

An array of option objects with evaluated `label` and `value` (empty when the source is not an array):

- The source is `props.dynamicOptions` (a template reference, takes precedence) or the static `props.options` array.
- With `props.optionMapping`, the mapping is evaluated for each item, the item being the template context (`~`). The mapped keys override the item keys.
- Without `props.optionMapping`, the `label` and `value` of each item are evaluated in the component's template context. A scalar item is used as both label and value.

### Usage Example

```javascript
const options = evaluateFieldOptions({ props, globalDataContext, templateContext });

return (
    <ul>
        {options.map((option, index) => (
            <li key={index} data-value={option.value}>{option.label}</li>
        ))}
    </ul>
);
```

## Limitations

- Template data modification may not be the ideal approach (noted in code comments)
- No built-in validation of data location paths
- No automatic type conversion or validation
- Limited error handling for invalid paths or contexts
- Template data is stored in the template context, which may not persist across template changes 