# BootstrapElement

The `BootstrapElement` component is an internal wrapper used by Reactive-JSON to integrate React-Bootstrap components into the template system.

**You should not use this component directly in your rjbuild.**

It is automatically used by higher-level components (such as BsAccordion, BsAlert, etc.) to provide Bootstrap features in a declarative way.

## Properties
- `attributes` (object, optional): Attributes passed to the underlying Bootstrap component.
- `content` (object/array, optional): Content to render inside the Bootstrap component.

## Limitations
- Not intended for direct use in rjbuild templates.
- Used internally by the system for Bootstrap integration.