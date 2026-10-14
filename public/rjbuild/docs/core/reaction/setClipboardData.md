# Reaction: setClipboardData

The `setClipboardData` reaction copies a specified value to the user's clipboard. This is useful for creating "Copy to clipboard" buttons for sharing information like referral codes, URLs, or any text-based data.

## Properties

- `value` (any, required): The value to be copied to the clipboard. The value is evaluated, so it can be a literal string or a path to data.
- `statusPath` (string, optional): A location receiving `"copied"` or `"failed"` once the copy is done, so that the page can react to the outcome (show a confirmation, announce it with a notice...).

## Behavior

- When triggered, the reaction evaluates the `value` property.
- A string or a number is copied with the `navigator.clipboard.writeText()` API. Other values (objects, arrays) and empty values are ignored.
- Outside a secure context (plain http on a host other than `localhost`), where the Clipboard API is not available, or when it fails, the copy falls back to the deprecated `copy` command on a temporary text field.
- An error is logged to the console if the copy fails, and `statusPath` receives `"failed"`. A value that cannot be copied (empty, object, array) also reports `"failed"`.

## Example

### Copying text to the clipboard

This example shows a button that, when clicked, copies the value of `~.shareable_code` to the clipboard.

```yaml
renderView:
  - type: div
    content: ["Your code: ", ~.shareable_code]
  - type: button
    content: "Copy Code"
    actions:
      - what: setClipboardData
        on: click
        value: ~.shareable_code
data:
  shareable_code: "ABC-123-XYZ"
```

### Showing the outcome

```yaml
renderView:
  - type: button
    content: "Copy the key"
    actions:
      - what: setClipboardData
        on: click
        value: ~~.apiKey
        statusPath: ~~.copyStatus
  - type: span
    content: "Copied"
    actions:
      - what: hide
        when: ~~.copyStatus
        isNot: "copied"
  - type: span
    content: "The copy failed: select the key and copy it manually."
    actions:
      - what: hide
        when: ~~.copyStatus
        isNot: "failed"

data:
  apiKey: "ABC-123-XYZ"
  copyStatus: ""
```

## Limitations

- The user may be prompted for permission to access the clipboard, depending on browser settings.
- Only strings and numbers are copied: objects and arrays are ignored. 