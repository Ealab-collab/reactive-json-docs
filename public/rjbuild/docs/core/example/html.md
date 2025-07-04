# HTML Components Examples

## Basic HTML Usage

All HTML tags can be added to an RjBuild. To use an HTML tag, simply add an object to your RjBuild with the HTML tag name as the `type` property in lowercase. The content of the tag is set using the `content` property.

### Basic Example
```yaml
renderView:
  - type: p
    content: This is a paragraph using the HTML component.
```

## Nesting Content

HTML components can be nested within each other to create complex structures.

### Nested Elements Example
```yaml
renderView:
  - type: div
    content:
      - "This is a text value. "
      - type: strong
        content:
          - "This text is strong. "
          - type: em
            content: "This text is strong and slanted/italic."
```

## HTML Attributes

HTML attributes are supported through the `attributes` property. Each attribute can be assigned a string value.

### Styling with Attributes

> **Important Note about Inline Styles**
>
> When using inline styles, you must use a specific structure:
> - Use an object with CSS properties as keys
> - Use camelCase for property names instead of hyphen-based CSS casing
> - For example, use `backgroundColor` instead of `background-color`

### Example with Attributes and Styles
```yaml
renderView:
  - type: div
    attributes:
      data-attr: Hello!
      style:
        backgroundColor: rgb(250,242,0)
        padding: 0.5em
    content:
      - "This is a "
      - type: code
        content: div
      - " with a yellow background and padding set as style attributes."
```

## Key Points

1. Use lowercase HTML tag names as the `type`
2. Set content using the `content` property
3. Nest elements by adding them to the content array
4. Use `attributes` for HTML attributes
5. Use camelCase for style property names 