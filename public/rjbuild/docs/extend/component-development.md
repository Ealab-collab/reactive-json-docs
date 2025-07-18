# Component Development Guide

## Overview

Creating custom components for Reactive-JSON involves building React components that follow specific patterns and integrate with the library's context system. This guide covers the essential patterns, APIs, and best practices for component development.

## Core Concepts

### Component Architecture
Reactive-JSON components follow these key principles:
- **Context Integration**: Use React contexts for data access and manipulation
- **Template Evaluation**: Support dynamic values through template patterns
- **Action/reaction Support**: Enable the action system through proper wrapping
- **Consistent Props**: Follow standard property patterns for consistency

### Essential Contexts
All components have access to these React contexts:
- **GlobalDataContext**: Contains root data and `updateData` callback
- **TemplateContext**: Contains current template data for evaluation

Other specialized contexts are available.
- **EventDispatcherContext**: Centralized event handling system, mostly used by the [reaction system](/docs/core/reaction/index).
- **PaginationContext**: Used by components that integrate pagination, such as [Switch](/docs/core/element/special/Switch).

## Basic Element Component

This example shows the structure of a basic element component that displays content and supports the action system.

```jsx
import { ActionDependant } from "@ea-lab/reactive-json/dist/engine";
import { GlobalDataContext } from "@ea-lab/reactive-json/dist/engine";
import { TemplateContext } from "@ea-lab/reactive-json/dist/engine";
import { evaluateTemplateValue } from "@ea-lab/reactive-json/dist/engine";
import { useContext } from "react";

export const MyComponent = ({ props }) => {
    const globalDataContext = useContext(GlobalDataContext);
    const templateContext = useContext(TemplateContext);

    // Evaluate dynamic values
    const evaluatedContent = evaluateTemplateValue({
        valueToEvaluate: props.content,
        globalDataContext,
        templateContext
    });

    return (
        <ActionDependant {...props}>
            <div className="my-component">
                {evaluatedContent}
            </div>
        </ActionDependant>
    );
};
```

## Form Component Pattern

Form components handle user input and provide two-way data binding with the global data context.

```jsx
import { useContext } from 'react';
import { GlobalDataContext } from "@ea-lab/reactive-json/dist/engine";
import { ActionDependant } from "@ea-lab/reactive-json/dist/engine";
import { TemplateContext } from "@ea-lab/reactive-json/dist/engine";
import { useEvaluatedAttributes } from "@ea-lab/reactive-json/dist/engine";
import { propsDataLocationToPathAndValue } from "@ea-lab/reactive-json/dist/engine";

export const MyFormField = ({ props, datafield, path }) => {
    const globalDataContext = useContext(GlobalDataContext);
    const templateContext = useContext(TemplateContext);

    const attributes = useEvaluatedAttributes(props.attributes);
    
    const { formData, formDataPath } = propsDataLocationToPathAndValue({
        currentPath: path,
        datafield: datafield,
        dataLocation: props.dataLocation,
        defaultValue: props.defaultFieldValue,
        globalDataContext,
        templateContext,
    });

    const onChange = (e) => {
        globalDataContext.updateData(e.currentTarget.value, formDataPath);
    };

    return (
        <ActionDependant {...props}>
            <input
                type="text"
                value={formData || ''}
                onChange={onChange}
                {...attributes}
            />
        </ActionDependant>
    );
};
```

## Component with Nested Content

Components that render nested RjBuild content use the View component to process child elements.

```jsx
import { View } from "@ea-lab/reactive-json/dist/engine";
import { useEvaluatedAttributes } from "@ea-lab/reactive-json/dist/engine";
import { ActionDependant } from "@ea-lab/reactive-json/dist/engine";

export const MyWrapper = ({ props, path, currentData, datafield }) => {
    const attributes = useEvaluatedAttributes(props.attributes);

    return (
        <ActionDependant {...props}>
            <div className="my-wrapper" {...attributes}>
                {props?.content && (
                    <View
                        props={props.content}
                        path={path + ".content"}
                        currentData={currentData?.["content"]}
                        datafield={"content"}
                    />
                )}
            </div>
        </ActionDependant>
    );
};
```

## Key APIs and Utilities

### Template Evaluation
- **evaluateTemplateValue()**: Evaluates template patterns like `~.value`, `~~.value`, `~>.value`
- **evaluateTemplateValueCollection()**: Evaluates collections and arrays with template patterns, supports multiple elements
- **useEvaluatedAttributes()**: Hook to evaluate dynamic attributes object

### Data Management
- **propsDataLocationToPathAndValue()**: Handles form data location and path resolution
- **GlobalDataContext.updateData()**: Updates data at specified path

### Component Integration
- **ActionDependant**: Wrapper that enables action system support
- **View**: Renders RjBuild content or any displayable value

## Action Component Pattern

Action components perform side effects and don't render visible content. They wrap their children and react to events or data changes. The conditional system (`when`, `is`, etc.) is handled by Actions.jsx, not by the action component itself.

```jsx
import { useContext, useEffect } from "react";
import { EventDispatcherContext } from "@ea-lab/reactive-json/dist/engine";
import { GlobalDataContext } from "@ea-lab/reactive-json/dist/engine";
import { TemplateContext } from "@ea-lab/reactive-json/dist/engine";
import { evaluateTemplateValue } from "@ea-lab/reactive-json/dist/engine";

export const MyAction = (props) => {
    const eventDispatcherContext = useContext(EventDispatcherContext);
    const globalDataContext = useContext(GlobalDataContext);
    const templateContext = useContext(TemplateContext);

    const actionProps = props?.actionProps ?? undefined;

    useEffect(() => {
        // Action logic - this runs when Actions.jsx determines conditions are met
        // No need to check conditions here, Actions.jsx handles that
        if (actionProps?.targetElement) {
            // Perform the action on the target element
            actionProps.targetElement.style.display = 'none';
        }
    }, [actionProps, eventDispatcherContext, globalDataContext, templateContext]);

    return <>{props.children}</>;
};
```

## Best Practices

### Component Guidelines
1. **Always wrap content with ActionDependant** to enable action system
2. **Use provided contexts** for data access and manipulation
3. **Evaluate template values** using provided utilities
4. **Handle attributes properly** using useEvaluatedAttributes
5. **Follow naming conventions** for consistency

### Performance Considerations
- Use React hooks efficiently to avoid unnecessary re-renders
- Memoize expensive computations when appropriate
- Leverage the EventDispatcherContext for optimal event handling

### Integration Requirements
- Components must accept props in the standard format
- Form components should implement proper data binding
- Action components should not interfere with normal rendering

## Making Your Components Available

Now that you've learned how to create custom React components that integrate seamlessly with Reactive-JSON, the next step is understanding how to make them available in your applications.

Your custom components need to be registered through the plugin system. For complete guidance on plugin registration, organization, and advanced management patterns, continue to the dedicated [Plugin System Guide](plugin-system).

This guide will show you how to:
- Register your components using the plugin system
- Organize and structure your plugins effectively
- Combine multiple plugin sources seamlessly
- Create reusable plugin collections
- Handle complex plugin dependencies and distribution patterns