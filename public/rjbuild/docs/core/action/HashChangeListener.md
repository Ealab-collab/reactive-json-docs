# HashChangeListener

**Description**: Listens to hash changes (URL fragment) in the window and executes a reaction function in response. This is an internal action component that is automatically used when you specify `on: "hashchange"` in your actions.

## Usage

HashChangeListener is **not** used directly as an element type. Instead, it is automatically triggered when you use `on: "hashchange"` in any action. The system automatically adds this component to listen for hash changes globally.

## Properties

When using `on: "hashchange"` in actions, you can specify:

- `what` (required): name of the reaction function to execute (e.g., `setData`, `fetchData`, `submitData`, etc.)
- `whenHashIs` (optional): hash value that should trigger the reaction (includes the '#' character)
- `whenHashWas` (optional): previous hash value that should trigger the reaction (includes the '#' character)
- All other properties are passed as arguments to the reaction function

## Behavior

When you use `on: "hashchange"` in an action:

1. The system automatically adds a HashChangeListener component
2. It listens to hash changes via the global event system (`EventDispatcherContext`)
3. When a hash change occurs:
   - If `whenHashIs` is defined, checks if the new hash matches
   - If `whenHashWas` is defined, checks if the old hash matches
   - If conditions are met, executes the reaction function specified in `what`

## Examples

### React to specific hash
```yaml
renderView:
  - type: button
    content: "Click me"
    actions:
      - what: setData
        on: hashchange
        whenHashIs: "#section2"
        path: "currentSection"
        value: "section2"
```

### React to previous hash change
```yaml
renderView:
  - type: div
    content: "Page content"
    actions:
      - what: fetchData
        on: hashchange
        whenHashWas: "#home"
        url: "/api/section-data"
        path: "sectionData"
```

### React to any hash change
```yaml
renderView:
  - type: div
    content: "Navigation"
    actions:
      - what: setData
        on: hashchange
        path: "hashChanged"
        value: true
```

## System Integration

- **EventDispatcherContext**: Uses the global event system to optimize performance
- **TemplateSystem**: The `whenHashIs` and `whenHashWas` values are evaluated through the template system
- **GlobalDataContext**: Provides context for reaction execution
- **Actions.jsx**: Automatically instantiated when `on: "hashchange"` is detected

## Limitations

- Only works with `on: "hashchange"` in actions (not as a standalone element)
- Only works on hash changes (URL fragment)
- Depends on ReactiveJSON's global event system
- Hashes must include the '#' character (e.g., "#section1", not "section1")
- One reaction per action definition (use multiple actions for multiple reactions)

## Technical Details

- Automatically instantiated by the Actions system when `on: "hashchange"` is used
- Uses `useEffect` to subscribe/unsubscribe to events
- Reaction functions are imported from `ReactOnEvent.jsx`
- Optimized to avoid too many real DOM listeners through the context system
- Automatically cleans up listeners when component unmounts 