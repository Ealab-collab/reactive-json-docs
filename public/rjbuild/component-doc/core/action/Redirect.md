# Redirect

**Description**: Redirects the user to a given URL if the condition is met.

## Properties
- `to`: destination URL

## Example
```yaml
renderView:
  - type: button
    content: "Go to Google"
    actions:
      - what: redirect
        to: "https://www.google.com"
        on: click
```

## Limitation
- The redirection is immediate and replaces the current page. 