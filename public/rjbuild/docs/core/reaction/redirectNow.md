# Reaction: redirectNow

The `redirectNow` reaction performs an immediate browser redirection to a specified URL. It is useful for navigating to a new page after an action is completed, such as after submitting a form or clicking a link.

## Properties

- `to` (string, required): The URL to redirect to. This value is evaluated, so it can be a static URL or dynamically constructed from data.

## Behavior

- When triggered, the reaction evaluates the `to` property to get the target URL.
- It then sets `window.location.href` to the resulting URL, causing the browser to navigate to the new page.

## Example

### Redirecting to a URL

This example shows a button that redirects the user to the Reactive-JSON GitHub page when clicked.

```yaml
renderView:
  - type: button
    content: "Visit GitHub"
    actions:
      - what: redirectNow
        on: click
        to: "https://github.com/reactive-json/reactive-json"
```

## Limitations

- The `to` property must resolve to a valid URL string for the redirection to work.
- This action causes a full page reload, which will reset the entire application state. 