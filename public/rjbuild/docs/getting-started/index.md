# Reactive-JSON Getting Started Guide



## Topics

- **[RjBuild structure](rjbuild-structure.md)**:
- **[Template system](template-contexts-data-binding.md)**:
- **[Actions](actions.md)**: Make the UI reflect the state of the app.
- **[Reactions](reactions.md)**: Bring interactivity to your app, such as performing HTTP requests, edit the app state on events…
















## Introduction

Reactive-JSON is a powerful library that allows you to create interactive user interfaces using only JSON/YAML configurations. No need to write complex JavaScript code - simply define your interface and its behavior declaratively.

## Installation

```bash
npm install @ea-lab/reactive-json
```

## Basic Structure

Every Reactive-JSON configuration follows this structure:

```yaml
renderView:  # Defines what should be rendered
  - type: div
    content: "Hello World!"

templates:   # Defines reusable templates (optional)
  myTemplate:
    type: div
    content: "Template content"

data:        # Defines the data to be used (optional)
  message: "Hello!"
```

## Key Concepts

### Template System

In Reactive-JSON, you will often find those notations to access data:

- `~.` : Local context (relative to current template)  
- `~~.` : Global context (access to global data)

Example:
```yaml
templates:
  userCard:
    type: div
    content:
      - type: div
        content: ["Name: ", ~.name]  # Local access to user data
      - type: div
        content: ["Admin: ", ~~.isAdmin]  # Global access to isAdmin

data:
  name: "John"
  isAdmin: true
```

> 💡 **Advanced navigation:** For complex hierarchical data access, see the [Template System documentation](/docs/getting-started/template-contexts-data-binding) which covers `~>key` and `~~>key` notations.

### Basic Elements

Reactive-JSON provides several types of elements:

#### HTML Elements
- Div, Button, Modal, Accordion, etc.
- Example:
```yaml
renderView:
  - type: button
    content: "Click me"
```

#### Form Fields
- TextField, SelectField, CheckBoxField, etc.
- Example:
```yaml
renderView:
  - type: TextField
    label: "Username"
    dataLocation: ~.username
```

#### Special Elements
- DataFilter, Switch, Count, etc.
- Example:
```yaml
renderView:
  - type: Switch
    content: ~.items
    singleOption:
      load: itemTemplate
templates:
  itemTemplate:
    type: div
    content: ~.name
```

### Actions and Reactions

#### Actions
Actions modify element behavior:
```yaml
renderView:
  - type: div
    content: "Hidden content"
    actions:
      - what: hide
        when: ~.shouldHide
        is: true
```

#### Reactions
Reactions respond to user events:
```yaml
renderView:
  - type: button
    content: "Save"
    actions:
      - what: setData
        on: click
        path: ~.saved
        value: true
```

## Complete Example

Here's a simple example of an interactive form:

```yaml
renderView:
  - type: div
    content:
      - type: TextField
        label: "Name"
        dataLocation: ~.form.name
      - type: TextField
        label: "Email"
        dataLocation: ~.form.email
      - type: button
        content: "Submit"
        actions:
          - what: submitData
            on: click
            url: "/api/submit"
            data: ~.form
            when: ~.form.name
            isEmpty: not

data:
  form:
    name: ""
    email: ""
```

## Next Steps

Now that you have an overview of Reactive-JSON, continue with the getting started guide to master the fundamentals:

**[RjBuild Structure](./rjbuild-structure)** - Learn about the core structure of Reactive-JSON configurations and how data, templates, and views work together.

This systematic approach will give you a solid foundation for building interactive applications with Reactive-JSON. 