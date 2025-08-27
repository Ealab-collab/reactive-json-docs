# AccordionItem

The `AccordionItem` component provides collapsible content panels using Bootstrap's accordion component. Each item must be used within a parent accordion container and supports dynamic content through Reactive-JSON's template system.

## Properties

- `eventKey` (string, required): Unique identifier for this accordion item
- `header` (string/component, required): The accordion header content (clickable area)
- `content` (any, optional): The collapsible content area
- `attributes` (object, optional): Additional HTML attributes for the accordion item
- `actions` (array, optional): Actions to execute based on field state

## Basic Example

```yaml
renderView:
  - type: BsAccordion
    attributes:
      defaultActiveKey: "0"
    content:
      - type: AccordionItem
        eventKey: "0"
        header: "Accordion Item #1"
        content: "This is the content for the first accordion item."
      - type: AccordionItem
        eventKey: "1" 
        header: "Accordion Item #2"
        content: "This is the content for the second accordion item."
```

## Dynamic Content Example

```yaml
renderView:
  - type: BsAccordion
    content: ~.faqItems
    singleOption:
      load: faqItem

templates:
  faqItem:
    type: AccordionItem
    eventKey: ~.id
    header: ~.question
    content: ~.answer

data:
  faqItems:
    - id: "q1"
      question: "What is Reactive-JSON?"
      answer: "Reactive-JSON is a declarative framework for building interactive UIs using JSON configurations."
    - id: "q2" 
      question: "How do I install it?"
      answer: "You can install it using npm: npm install @ea-lab/reactive-json"
```



## Limitations

- Must be used within a parent `BsAccordion` component
- Each `eventKey` must be unique within the accordion
- Header content should be simple text or basic components

## Requirements

- Bootstrap CSS must be imported
- `@ea-lab/reactive-json-bootstrap` plugin must be installed and configured
- React-Bootstrap dependencies must be available
