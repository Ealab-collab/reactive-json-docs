# Switch

## Introduction

The `Switch` component allows you to render a list or collection of items using a template, with support for dynamic data, options, and pagination. It is useful for displaying arrays, lists, or collections where each item can be rendered with a specific template or configuration.

## Properties
- `content` (array/object, required): The data or path to the data to iterate over
- `options` (object, optional): Mapping of keys to templates for rendering each item (referenced by `load`)
- `singleOption` (object, optional): Template to use for each item when all items share the same structure (referenced by `load`)
- `cardinality` (number, optional): Maximum number of items to render (default: unlimited)
- `paginated` (boolean, optional): Whether to enable pagination (default: false)
- `paginationProps` (object, optional): Pagination configuration (page size, etc.)
- `before` (object, optional): Content to render before the list
- `after` (object, optional): Content to render after the list
- `contentWrapper` (object, optional): HTML element configuration to wrap the main content (items only, not before/after)
  - `tag` (string, optional): HTML tag name (default: "div")
  - `attributes` (object, optional): HTML attributes to apply to the wrapper element (supports template evaluation)
- `templates` (object, optional): Named templates referenced by `load` in `singleOption` or `options`

## Behavior
- Iterates over the provided data and renders each item using the specified template(s)
- If `options` is provided, uses the corresponding template for each key (with `load`)
- If `singleOption` is provided, uses the template referenced by `load` for all items
- Supports limiting the number of items with `cardinality`
- Supports pagination if `paginated` is true
- Renders optional `before` and `after` content
- Can wrap the main content (items) with a custom HTML element using `contentWrapper`
- Templates are defined in the `templates` object and referenced by name

## Content Wrapper Feature

The `contentWrapper` property allows you to wrap the rendered items in a custom HTML element without affecting the `before` and `after` content. This is particularly useful for applying CSS layouts like Grid or Flexbox to the items.

**Note**: The `attributes` property of `contentWrapper` supports template evaluation, allowing you to create dynamic wrapper configurations based on your data.

### Structure
```
before (optional)
└── contentWrapper (optional)
    └── rendered items
after (optional)
```

The wrapper only affects the main content items and does not interfere with pagination or other Switch features.

## Examples

### 1. Simple usage with `singleOption` (no pagination)
```yaml
renderView:
  - type: Switch
    content: ~.users
    singleOption:
      load: opt
    templates:
      opt:
        type: div
        content: ~.name

data:
  users:
    - name: "Alice"
    - name: "Bob"
    - name: "Charlie"
```

### 2. Usage with `options` (different templates per key)
```yaml
renderView:
  - type: Switch
    content: ~.items
    options:
      name:
        load: name
      age:
        load: age
    templates:
      name:
        type: div
        content: ["Name: ", ~.value]
      age:
        type: div
        content: ["Age: ", ~.value]
data:
  items:
    - name:
        value: "Alice"
    - age:
        value: 30
    - name:
        value: "Bob"
    - age:
        value: 25
```

### 3. Usage with `singleOption`, pagination, before/after, and PageControls
```yaml
renderView:
  - type: Switch
    content: ~.numbers
    singleOption:
      load: opt
    paginated: true
    paginationProps:
      pageMaxItemCount: 4
    before:
      type: div
      content: "User list:"
    after:
      type: PageControls
    templates:
      opt:
        type: div
        content: ["Number: ", ~.value]
data:
  numbers:
    - value: 1
    - value: 2
    - value: 3
    - value: 4
    - value: 5
    - value: 6
    - value: 7
    - value: 8
    - value: 9
    - value: 10
```

### 4. Usage with `contentWrapper` for CSS Grid Layout
```yaml
renderView:
  - type: Switch
    content: ~.products
    singleOption:
      load: productCard
    contentWrapper:
      tag: div
      attributes:
        style:
          display: grid
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
          gap: 1rem
          padding: 1rem
    after:
      type: div
      content: "End of products"
    templates:
      productCard:
        type: div
        attributes:
          style:
            border: "1px solid #ccc"
            borderRadius: 8px
            padding: 1rem
        content:
          - type: h3
            content: ~.name
          - type: p
            content: ~.description
data:
  products:
    - name: "Product A"
      description: "Description of product A"
    - name: "Product B"
      description: "Description of product B"
    - name: "Product C"
      description: "Description of product C"
```

### 5. Usage with `contentWrapper` for Flexbox Layout
```yaml
renderView:
  - type: Switch
    content: ~.items
    singleOption:
      load: flexItem
    contentWrapper:
      tag: section
      attributes:
        class: "flex-container"
        style:
          display: flex
          flexWrap: wrap
          justifyContent: space-between
          alignItems: center
    templates:
      flexItem:
        type: div
        attributes:
          style:
            flex: "1 1 200px"
            margin: 0.5rem
            padding: 1rem
            backgroundColor: "#f0f0f0"
        content: ~.text
data:
  items:
    - text: "Item 1"
    - text: "Item 2"
    - text: "Item 3"
```

### 6. Dynamic `contentWrapper` with Template Evaluation
```yaml
renderView:
  - type: Switch
    content: ~.galleries
    singleOption:
      load: imageItem
    contentWrapper:
      tag: div
      attributes:
        class: ~.layoutClass
        style:
          display: grid
          gridTemplateColumns: ~.gridColumns
          gap: ~.spacing
          backgroundColor: ~.theme.backgroundColor
    templates:
      imageItem:
        type: div
        attributes:
          style:
            padding: 1rem
            border: "1px solid #ddd"
        content: ~.title
data:
  layoutClass: "photo-gallery"
  gridColumns: "repeat(3, 1fr)"
  spacing: "2rem"
  theme:
    backgroundColor: "#f5f5f5"
  galleries:
    - title: "Photo 1"
    - title: "Photo 2"
    - title: "Photo 3"
```

## Limitations
- The data must be an array or object; strings and numbers are not supported
- If both `options` and `singleOption` are provided, `singleOption` takes precedence
- No built-in support for filtering or sorting (use DataFilter or custom logic)
- Pagination requires the `paginated` property to be set to true
- Templates must be defined in the `templates` object and referenced by `load`

### Data Structure Requirements
Switch requires each item in the data to be an object, not a primitive value:

```yaml
# ❌ This will NOT work:
data:
  items: ["string1", "string2", "string3"]

# ✅ This will work:
data:
  items: 
    - name: "string1"
    - name: "string2"
    - name: "string3"
```
 