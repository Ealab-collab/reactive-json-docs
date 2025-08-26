# Accordion Component Examples

## Overview

The Accordion component in Reactive-JSON is powered by Bootstrap and provides a collapsible content interface. This component is perfect for organizing content in an expandable/collapsible format.

## Basic Usage

The basic structure consists of a `BsAccordion` container with `AccordionItem` components inside. Each accordion item has a header and a body section.

### Simple Accordion Example
```yaml
renderView:
  - type: BsAccordion
    attributes:
      defaultActiveKey: [ 0 ]
    content:
      - type: AccordionItem
        header:
          type: div
          content: First accordion item
        body:
          type: div
          content: Content of the first accordion item.
```

## Advanced Features

### Multiple Items with Complex Content
```yaml
renderView:
  - type: BsAccordion
    attributes:
      defaultActiveKey: [ 0 ]
    content:
      - type: AccordionItem
        header:
          type: div
          content: First accordion item
        body:
          type: div
          content: Content of the first accordion item.
      - type: AccordionItem
        header:
          type: div
          content: Second accordion item
        body:
          - type: div
            attributes:
              class: p-2 text-center
            content: Content of the second accordion item.
          - type: div
            attributes:
              class: row
            content:
              - type: div
                attributes:
                  class: col
                content: Of course, you can put any component you want in it. This is a column...
              - type: div
                attributes:
                  class: col
                content: ...and this is another column, made with bootstrap's columns.
```

### Custom Header Formatting
```yaml
renderView:
  - type: AccordionItem
    header:
      type: div
      content:
        - "Third "
        - type: span
          attributes:
            class: fw-bold
          content: accordion
        - " item "
    body:
      type: div
      content: Demonstrates that you can customize in the accordion item heading.
```

## Key Features

1. **Bootstrap Integration**: The accordion component uses Bootstrap's styling and functionality
2. **Flexible Content**: Both headers and bodies can contain any valid Reactive-JSON components
3. **Custom Styling**: Compatible with Bootstrap classes and custom CSS
4. **Default Active Item**: Can specify which item should be open by default using `defaultActiveKey`
5. **Nested Components**: Support for complex layouts within accordion items

## Notes

- The accordion component is compatible with any CSS system, although it's built on Bootstrap
- Headers and bodies can contain any combination of components and styling
- Use Bootstrap classes for additional styling and layout options 