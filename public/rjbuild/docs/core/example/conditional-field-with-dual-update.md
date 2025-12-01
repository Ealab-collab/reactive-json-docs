# Conditional Field with Dual Data Update Pattern

This example demonstrates a pattern where a `SelectField` controls both its own value and another field's value, while a `TextAreaField` conditionally appears and changes its `readonly` state based on the selection.

## Use Case

You have a form where:
1. A `SelectField` allows choosing between predefined options or a custom value
2. When a predefined option is selected, a `TextAreaField` is automatically filled and becomes readonly
3. When "custom" is selected, the `TextAreaField` becomes editable and appears
4. Both fields only appear when a prerequisite condition is met (e.g., another field is filled)

## Pattern Structure

### Key Concepts

- **Dual Data Update**: The `SelectField` updates two data paths simultaneously:
  - Its own value (`instructionType`)
  - The dependent field's value (`instruction`)
- **Conditional Visibility**: Fields appear only when prerequisite data exists
- **Dynamic Readonly State**: The `TextAreaField`'s `readonly` attribute changes based on selection

### Implementation

```yaml
renderView:
  # SelectField that controls both its value and another field
  - type: SelectField
    dataLocation: ~~.formData.instructionType
    defaultFieldValue: "_"
    dynamicOptions: ~~.instructionOptions
    label: "Instructions"
    actions:
      # Hide if prerequisite condition not met
      - isEmpty: true
        when: ~~.formData.sheet
        what: hide
      # Update the dependent field's value (direct copy)
      - what: setData
        on: change
        path: ~~.formData.instruction
        value: <reactive-json:event-new-value>
      # Update its own value (redundant but explicit)
      - what: setData
        on: change
        path: ~~.formData.instructionType
        value: <reactive-json:event-new-value>

  # TextAreaField that conditionally appears and changes readonly state
  - type: TextAreaField
    dataLocation: ~~.formData.instruction
    defaultFieldValue: ""
    label: "Custom Instructions"
    inputAttributes:
      readonly: "readonly"
    rows: 5
    actions:
      # Hide if prerequisite condition not met
      - isEmpty: true
        when: ~~.formData.sheet
        what: hide
      # Hide if a predefined option is selected (not empty and not custom)
      - what: hide
        when: ~~.formData.instructionType
        isNot: ""
      # Remove readonly when custom is selected (empty string)
      - what: unsetAttribute
        name: "readonly"
        when: ~~.formData.instructionType
        is: ""

data:
  formData:
    instructionType: "_"
    instruction: ""
    sheet: "ExampleSheet"
  instructionOptions:
    - label: "- Select an instruction -"
      value: "_"
    - label: "Predefined Option 1"
      value: "This is a predefined instruction text for option 1"
    - label: "Predefined Option 2"
      value: "This is a predefined instruction text for option 2"
    - label: "Custom Instruction"
      value: ""
```

## How It Works

### 1. Prerequisite Condition

Both fields check if `~~.formData.sheet` is not empty before appearing:

```yaml
- isEmpty: true
  when: ~~.formData.sheet
  what: hide
```

This ensures the fields only appear when the prerequisite data exists.

### 2. Dual Data Update on SelectField Change

When the `SelectField` value changes, two `setData` actions execute:

1. **Update dependent field**: Sets `~~.formData.instruction` to the new value (direct copy)
2. **Update own field**: Sets `~~.formData.instructionType` to the new value

The `value` uses `<reactive-json:event-new-value>` which automatically extracts the selected value from the event.

**Important Note**: The second `setData` action updating `instructionType` is technically redundant since `SelectField` with `dataLocation` already updates its bound value automatically. However, it's included for explicitness and to ensure the value is set even if there are timing issues.

**Key Pattern**: The `SelectField` updates **two separate data paths** simultaneously:
- Its own bound value (`instructionType`) - for tracking which option was selected
- A dependent field's value (`instruction`) - for storing the actual instruction text

**Direct Value Copy**: Unlike patterns that use a mapping object (`instructionValues`), this pattern copies the selected value directly. This means:
- If a predefined option is selected: `instruction` receives the full instruction text from the option's `value`
- If `"_"` is selected: `instruction` receives `"_"`
- If `""` (custom) is selected: `instruction` receives `""`

This dual update pattern allows the `SelectField` to control both its own state and the state of a dependent field.

### 3. Conditional Visibility of TextAreaField

The `TextAreaField` has two visibility conditions:

- **Prerequisite**: Hidden if `sheet` is empty
- **Selection-based**: Hidden if `instructionType` is not empty (meaning a predefined option was selected OR the empty placeholder `"_"` was selected)

```yaml
- what: hide
  when: ~~.formData.instructionType
  isNot: ""
```

This means the `TextAreaField` only appears when:
- `sheet` is selected (prerequisite met)
- AND `instructionType` is `""` (custom instruction selected)

**Important**: In this pattern:
- The empty placeholder "- Select an instruction -" has value `"_"` (underscore)
- The "custom" option has value `""` (empty string)
- Predefined options have their full instruction text as their `value`

This design allows distinguishing between "no selection" (`"_"`) and "custom selected" (`""`), while keeping the visibility logic simple: only show the TextAreaField when `instructionType` is exactly `""`.

### 4. Dynamic Readonly State

The `TextAreaField` starts with `readonly: "readonly"` in `inputAttributes`. The readonly state is controlled by:

```yaml
- what: unsetAttribute
  name: "readonly"
  when: ~~.formData.instructionType
  is: ""
```

**Behavior**: The readonly attribute is removed when `instructionType` is exactly `""`. Since "custom" has value `""` (empty string), selecting "custom" makes the field editable. The condition uses `is: ""` (exact match) rather than `isEmpty: true` to ensure it only triggers for the custom option, not for other empty states.

## Data Flow Summary

1. **User selects a predefined option** (Predefined Option 1 or Predefined Option 2):
   - `instructionType` → Full instruction text (e.g., `"This is a predefined instruction text for option 1"`)
   - `instruction` → Same full instruction text (direct copy from `value`)
   - TextAreaField → Hidden (because `instructionType` is not empty)
   - TextAreaField → Readonly (but hidden, so not relevant)

2. **User selects "custom"** (Custom Instruction):
   - `instructionType` → `""` (empty string - this is the key!)
   - `instruction` → `""` (empty, ready for user input)
   - TextAreaField → Visible (because `instructionType` is `""`)
   - TextAreaField → Readonly removed (because `instructionType` is `""`)

3. **User selects "- Select an instruction -"** (empty placeholder):
   - `instructionType` → `"_"` (underscore)
   - `instruction` → `"_"` (direct copy)
   - TextAreaField → Hidden (because `instructionType` is not `""`)
   - TextAreaField → Readonly (but hidden, so not relevant)

## Key Takeaways

1. **Dual Data Update**: A single `SelectField` can update multiple data paths using multiple `setData` actions
2. **Conditional Visibility**: Fields can be hidden based on prerequisite conditions AND selection state
3. **Dynamic Attributes**: Field attributes (like `readonly`) can be dynamically controlled based on data state
4. **Event Value Placeholder**: Use `<reactive-json:event-new-value>` to automatically extract the new value from the event

## Design Decision: Value Structure

In this pattern, values are structured to distinguish three states:

- **`"_"` (underscore)** = Empty placeholder ("- Select an instruction -") - TextAreaField hidden
- **`""` (empty string)** = Custom input mode ("Custom Instruction") - TextAreaField visible and editable
- **Full instruction text** = Predefined option selected - TextAreaField hidden

**Key Design Choices**:

1. **Values stored directly in options**: Full instruction texts are stored directly in the `value` property of each option in `instructionOptions`, eliminating the need for a separate `instructionValues` mapping object.

2. **Direct value copy**: The `SelectField` copies the selected value directly to `instruction` using `<reactive-json:event-new-value>`, without conditional logic. This means:
   - Selecting a predefined option copies the full instruction text
   - Selecting `"_"` copies `"_"`
   - Selecting `""` copies `""`

3. **Simple visibility logic**: The TextAreaField visibility uses `isNot: ""` which hides it for both `"_"` and predefined options, showing it only for `""` (custom).

4. **Readonly condition**: Uses `is: ""` (exact match) rather than `isEmpty: true` to ensure it only triggers for the custom option.

This design allows clear distinction between all three states while keeping the implementation simple and maintainable.
