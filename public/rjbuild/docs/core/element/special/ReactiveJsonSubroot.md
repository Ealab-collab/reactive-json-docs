# ReactiveJsonSubroot

## Introduction

The `ReactiveJsonSubroot` component allows you to render a new Reactive-JSON root inside an existing application. It is useful for embedding a sub-application, isolating a part of the data tree, or rendering a separate rjbuild with its own options.

## Properties
- `rjOptions` (object, required): Options to pass to the subroot (such as `rjBuildUrl`, `data`, `renderView`, etc.)
- Other properties are passed to the underlying `ReactiveJsonRoot`

## Behavior
- Renders a new `ReactiveJsonRoot` with the provided options
- The subroot is isolated from the parent for data, templates, and rendering
- Plugins from the parent are reused in the subroot
- If `rjOptions` is not a valid object, nothing is rendered

## Example
```yaml
renderView:
  - type: ReactiveJsonSubroot
    rjOptions:
      rjBuildUrl: "/rjs-build/home.yaml"
```

## Limitations
- The subroot is isolated from the parent; data and state are not shared
- No built-in communication between parent and subroot (except via plugins or explicit data passing) 