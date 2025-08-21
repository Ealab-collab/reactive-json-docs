# Redirect



## Properties
- `to`: Destination URL.

## Example

The following example will redirect the current page when the user clicks on the button.

```yaml
renderView:
  - type: button
    content: "Go to EA Lab"
    actions:
      - what: redirect
        to: "https://ea-lab.io"
        when: ~~.allowRedirect
        is: "true"
      - what: setData
        on: click
        path: ~~.allowRedirect
        value: "true"
```

## Limitation
- The redirection is immediate and replaces the current page. 