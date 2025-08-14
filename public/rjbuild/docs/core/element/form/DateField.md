# DateField

The `DateField` component renders a date and time input field using React Bootstrap. It provides a datetime-local input type for selecting both date and time values with automatic data binding to the global data context.

> **Warning**
> This component has limited support and is marked as TODO in the codebase. Currently only supports `datetime-local` input type.

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context
- `defaultFieldValue` (string, optional): Default value when no data is present
- `label` (string, optional): Field label text
- `attributes` (object, optional): Attributes applied to the Form.Group container
- `actions` (array, optional): Actions to execute based on field state. Supports both actions (hide, tooltip, etc.) and conditional reactions (setData, fetchData, etc.) with full conditional logic support

## Data Management

The component automatically synchronizes its value with the global data context as an ISO 8601 datetime string format (YYYY-MM-DDTHH:mm). When using `dataLocation`, the value is stored at the specified path. Without `dataLocation`, the value is stored in the template context using the component's `datafield`.

## Date Format

The component uses the HTML5 `datetime-local` input type which:
- Displays a date and time picker in the browser
- Returns values in ISO 8601 format: `YYYY-MM-DDTHH:mm`
- Does not include timezone information
- Appearance varies by browser and operating system

## Basic Example

```yaml
renderView:
  - type: DateField
    dataLocation: ~.eventDate
    label: "Event Date and Time:"

data:
  eventDate: null
```

## DateField with Default Value

```yaml
renderView:
  - type: DateField
    dataLocation: ~.deadline
    label: "Project Deadline:"
    defaultFieldValue: "2024-12-31T17:00"

data:
  deadline: null
```

## Multiple DateFields

```yaml
renderView:
  - type: DateField
    dataLocation: ~.startDate
    label: "Start Date:"
  - type: DateField
    dataLocation: ~.endDate
    label: "End Date:"
  - type: DateField
    dataLocation: ~.reminderDate
    label: "Reminder Date:"

data:
  startDate: null
  endDate: null
  reminderDate: null
```

## Interactive Date Management

Advanced example with conditional reactions and dynamic messaging:

```yaml
renderView:
  - type: DateField
    dataLocation: ~.meetingDate
    label: "Meeting Date:"
  - type: button
    content: "Set to Tomorrow"
    actions:
      - what: setData
        on: click
        path: ~.meetingDate
        value: "2024-12-25T14:00"
  - type: button
    content: "Clear Date"
    actions:
      - what: setData
        on: click
        path: ~.meetingDate
        value: null
  - type: button
    content: "Validate Meeting"
    actions:
      - what: setData
        on: click
        path: ~.message
        value: "✓ Meeting date is set!"
        when: ~.meetingDate
        isNotEmpty:
      - what: setData
        on: click
        path: ~.message
        value: "⚠ Please select a meeting date first"
        when: ~.meetingDate
        isEmpty: true

data:
  meetingDate: null
  message: null
```

## Complete Example

A comprehensive example showing DateField in different contexts:

```yaml
renderView:
  - type: DateField
    dataLocation: ~.eventDate
    label: "Event Date and Time:"
  - type: DateField
    dataLocation: ~.deadline
    label: "Deadline:"
    defaultFieldValue: "2024-12-31T23:59"
  - type: div
    content:
      - "Event: "
      - ~.eventDate
  - type: div
    content:
      - "Deadline: "
      - ~.deadline

data:
  eventDate: null
  deadline: null
```

## Current Limitations

> **Development Status**
> The DateField component is currently limited and marked as TODO in the codebase. However, it integrates fully with reactive-json's action and reaction system for rich interactivity.

### Component Limitations
- Only supports `datetime-local` input type (hardcoded)
- No support for `date` input type (date only)
- No support for `time` input type (time only)
- No support for `month` or `week` input types
- No built-in date formatting or localization
- No timezone handling or conversion
- No support for inputAttributes property (not implemented)
- No template evaluation support for label property

### Browser and Validation Limitations
- No date validation beyond browser defaults
- No support for date ranges or multiple date selection
- No support for custom date picker libraries
- Limited browser compatibility for datetime-local input

### Workarounds Available
- ✅ **Date validation**: Use conditional reactions with `isEmpty`, `andConditions`, `orConditions`
- ✅ **Interactive behavior**: Full support for conditional actions and reactions
- ✅ **Dynamic messaging**: Use setData reactions to provide user feedback
- ✅ **Complex logic**: Combine multiple DateFields with sophisticated conditional logic

## Browser Compatibility

The `datetime-local` input type has varying support across browsers:
- Modern browsers provide native date/time pickers
- Older browsers may fall back to text input
- Mobile browsers typically provide optimized date/time selection interfaces
- Appearance and behavior can vary significantly between browsers

## Future Improvements

The component is marked for future enhancement to support:
- Dedicated `date` input type for date-only selection
- Dedicated `time` input type for time-only selection
- Better validation and error handling
- Custom date formatting options
- Timezone support
- Integration with date picker libraries
- Support for inputAttributes property
- Template evaluation for label property 