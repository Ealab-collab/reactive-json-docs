# Attribute Transformers

> **Note**: Don't confuse with [Attribute Actions](../action/Attribute/index.md). Attribute Transformers execute **before rendering** and modify attributes for child components, while Attribute Actions execute **after rendering** and modify the DOM directly.

Attribute Transformers allow you to dynamically modify element attributes before rendering, based on conditions from the application state.

> **For detailed usage, examples, and extensibility information**, see **[Attribute Transformers Advanced Guide](../../advanced-concepts/attribute-transformers.md)**.

## Available Attribute Transformers

### Value Management
- **[setAttributeValue](./setAttributeValue.md)**: Sets or modifies HTML attribute values dynamically before rendering
- **[unsetAttributeValue](./unsetAttributeValue.md)**: Removes specific values from HTML attributes while preserving others
- **[toggleAttributeValue](./toggleAttributeValue.md)**: Toggles the presence of specific values in HTML attributes, supports cyclic toggling

### Attribute Management
- **[unsetAttribute](./unsetAttribute.md)**: Completely removes HTML attributes before rendering
