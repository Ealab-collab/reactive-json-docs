# Reaction: printPage

The `printPage` reaction opens the print dialog of the browser for the current page (`window.print()`).

## Properties

This reaction has no specific property.

## Example

```yaml
renderView:
  - type: button
    content: "Print"
    actions:
      - what: printPage
        on: click
```

## Limitations

- The whole page is printed: use print CSS (`@media print`) to hide the parts that must not be printed.
