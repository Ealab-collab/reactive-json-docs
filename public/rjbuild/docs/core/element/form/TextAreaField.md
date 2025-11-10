# TextAreaField

The `TextAreaField` component provides a native HTML textarea element with automatic data synchronization, combining the simplicity of native HTML with the convenience of automatic data binding. It's ideal for multi-line text input such as comments, descriptions, or longer form fields.

## Basic Syntax

```yaml
- type: TextAreaField
  dataLocation: ~.description
  label: "Description:"
  placeholder: "Enter your description..."
  rows: 5
```

## Properties

- `dataLocation` (string, optional): Path to bind the field value in the data context.
- `defaultFieldValue` (string, optional): Default value when no data is present.
- `label` (string or View props, optional): Field label text (supports template evaluation and View component rendering).
- `placeholder` (string, optional): Placeholder text (supports template evaluation).
- `rows` (number, optional): Number of visible text lines (default: `3`, supports template evaluation).
- `attributes` (object, optional): Attributes applied to the container div (or merged with inputAttributes if no wrapper).
- `inputAttributes` (object, optional): Attributes applied directly to the textarea element.
- `labelAttributes` (object, optional): Attributes applied to the label (htmlFor is automatically managed).
- `forceWrapper` (boolean, optional): Forces the presence (true) or absence (false) of the wrapper div. If omitted, wrapper is automatic only if label is present.
- `actions` (array, optional): Actions to execute based on field state.

## Data Management

The component automatically synchronizes its value with the global data context. When `dataLocation` is used, the value is stored at the specified path. Without `dataLocation`, the value is stored in the template context using the component's `datafield`.

The textarea value is always stored as a string, preserving line breaks (`\n`) and whitespace.

## Wrapper Control

The component uses a flexible wrapper system similar to `Input`, adapting based on the presence of a label and the `forceWrapper` property.

### Default Behavior

When no `forceWrapper` is specified, the component automatically determines whether to use a wrapper div. If a label is present, the component wraps both the label and textarea in a div container. If no label is present, the textarea is rendered directly without a wrapper.

### Explicit Control with `forceWrapper`

You can override the default behavior using the `forceWrapper` property. Setting `forceWrapper: true` will always create a wrapper div, even without a label. Setting `forceWrapper: false` will never create a wrapper, even when a label is present.

### HTML Output Examples

**With label (automatic wrapper):**
```html
<div>
  <label htmlFor="textarea-abc123">Description:</label>
  <textarea id="textarea-abc123" rows="5" placeholder="Enter description..."></textarea>
</div>
```

**Without label (no wrapper):**
```html
<textarea id="textarea-xyz789" rows="3"></textarea>
```

**Force wrapper without label:**
```html
<div>
  <textarea id="textarea-def456" rows="4"></textarea>
</div>
```

### Attribute Merging

When a wrapper is present, the `attributes` are applied to the div container and `inputAttributes` are applied to the textarea element. When no wrapper is present, both `attributes` and `inputAttributes` are merged and applied to the textarea element.

## Label Support

The `label` property supports both simple strings and View component rendering, allowing for dynamic and complex label content:

```yaml
- type: TextAreaField
  dataLocation: ~.comment
  label:
    type: div
    content:
      - "Comment ("
      - type: strong
        content: ~.requiredText
      - "):"
  rows: 5
```

## Rows Property

The `rows` property controls the visible height of the textarea. It supports template evaluation, allowing dynamic row counts:

```yaml
- type: TextAreaField
  dataLocation: ~.notes
  rows: ~.defaultRows
```

**Default**: If `rows` is not specified, it defaults to `3`.

## Examples

### Basic TextAreaField

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.description
    label: "Description:"
    placeholder: "Enter a description..."

data:
  description: ""
```

### Custom Rows

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.comments
    label: "Comments:"
    rows: 10
    placeholder: "Enter your comments here..."

data:
  comments: ""
```

### Custom Attributes

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.notes
    label: "Notes:"
    rows: 5
    inputAttributes:
      required: true
      maxLength: 500
      style:
        width: "100%"
        resize: "vertical"
    attributes:
      style:
        marginBottom: "10px"

data:
  notes: ""
```

### Wrapper Control

```yaml
renderView:
  # No label → no wrapper automatically
  - type: TextAreaField
    dataLocation: ~.noWrapper
    rows: 3
    placeholder: "Textarea without wrapper"
    
  # With label → automatic wrapper
  - type: TextAreaField
    dataLocation: ~.autoWrapper
    label: "With automatic wrapper:"
    rows: 3
    placeholder: "Textarea with wrapper"
    
  # Force wrapper even without label
  - type: TextAreaField
    dataLocation: ~.forceWrapper
    rows: 3
    placeholder: "Forced wrapper"
    forceWrapper: true
    attributes:
      style:
        border: "2px solid blue"
        padding: "10px"
        
  # No wrapper even with label
  - type: TextAreaField
    dataLocation: ~.noWrapperForced
    label: "Label without wrapper:"
    rows: 3
    placeholder: "Textarea without forced wrapper"
    forceWrapper: false

data:
  noWrapper: ""
  autoWrapper: ""
  forceWrapper: ""
  noWrapperForced: ""
```

### Custom Label Attributes

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.customLabel
    label: "Custom label:"
    rows: 5
    labelAttributes:
      style:
        color: "blue"
        fontWeight: "bold"
        fontSize: "14px"
      className: "custom-label"

data:
  customLabel: ""
```

### Dynamic Rows

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.content
    label: "Content:"
    rows: ~.textareaRows
    placeholder: "Enter content..."

data:
  textareaRows: 6
  content: ""
```

### With Actions

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.message
    label: "Message:"
    rows: 5
    placeholder: "Type your message..."
    actions:
      - what: setData
        when: ~.message
        hasLength: ">0"
        path: ~.hasMessage
        value: true
      - what: setData
        when: ~.message
        isEmpty: true
        path: ~.hasMessage
        value: false

data:
  message: ""
  hasMessage: false
```

### Preserving Line Breaks

```yaml
renderView:
  - type: TextAreaField
    dataLocation: ~.multilineText
    label: "Multi-line text:"
    rows: 8
    placeholder: "Enter text with line breaks..."
  - type: div
    attributes:
      style:
        marginTop: "20px"
        padding: "10px"
        backgroundColor: "#f5f5f5"
        whiteSpace: "pre-wrap"
    content: ~.multilineText

data:
  multilineText: ""
```

## Advantages

- **No external dependencies**: Works without any CSS framework
- **Full control**: Custom styling and behavior
- **Performance**: Lighter than component libraries
- **Accessibility**: Direct control over ARIA attributes, automatic htmlFor
- **Automatic synchronization**: Unlike raw HTML elements that require manual setData actions
- **Flexible wrapper**: Avoids unnecessary HTML when not needed
- **Multi-line support**: Native support for multi-line text input with line break preservation
- **Dynamic rows**: Row count can be controlled via template evaluation
- **Label flexibility**: Supports both simple strings and View component rendering

## Limitations

- No built-in validation beyond HTML5 textarea validation
- No support for rich text editing (use a specialized rich text editor component)
- No built-in character counter (can be added via actions)
- Styling must be provided via external CSS or style attributes
- Line breaks are preserved as `\n` characters; display formatting requires CSS (`white-space: pre-wrap` or similar)
- Template evaluation for `rows` should return a number

