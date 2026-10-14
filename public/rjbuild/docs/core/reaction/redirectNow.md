# Reaction: redirectNow

The `redirectNow` reaction performs an immediate browser redirection to a specified URL. It is useful for navigating to a new page after an action is completed, such as after submitting a form or clicking a link.

## Properties

- `to` (string or array, required): The URL to redirect to: a string or a template reference, or an array of segments built like the `src` of `additionalDataSource` (literal strings, references evaluated in the current template context, `{segment, required}`, `{param, value, required}`). See [Dynamic URLs with `src` as Array](../../getting-started/rjbuild-structure.md#dynamic-urls-with-src-as-array).
- `replace` (boolean, optional): When `true`, the current history entry is replaced instead of adding a new one (the back button does not come back to the current page). Default: `false`.

## Behavior

- When triggered, the reaction evaluates the `to` property to get the target URL.
- It then sets `window.location.href` to the resulting URL (or calls `window.location.replace()` with `replace: true`), causing the browser to navigate to the new page.
- Nothing happens when the URL is empty, or when a required segment is empty: the user is never sent to a truncated URL.

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

### Redirecting to a URL built from a response

After a creation, the URL of the new item is only known from the response:

```yaml
- what: redirectNow
  on: response
  replace: true
  to:
    - "/dashboards/"
    - segment: "<reactive-json:event-new-value>.id"
      required: true
    - param: edit
      value: "1"
```

## Limitations

- The `to` property must resolve to a valid URL string for the redirection to work.
- This action causes a full page reload, which will reset the entire application state. 