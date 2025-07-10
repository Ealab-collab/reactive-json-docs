# Template and Context System

## Introduction

The template system in reactive-json efficiently manages data contexts and their access. Understanding how templates "containerize" data is essential for properly using components, actions, and reactions.

## Context Notations

There are three main notations for accessing data:

- `~.` : Local context (relative to current template)
- `~~.` : Global context (access to global data)
- `~>field` : Access to a specific parent context by climbing up to a given key

### Context Usage Example

```yaml
templates:
  userList:
    type: Switch
    content: ~~.users
    template:
      type: div
      content:
        - type: div
          content: ["Name: ", ~.name]  # Local access to current user data
        - type: div
          content: ["Admin: ", ~~.isAdmin]  # Global access to isAdmin data
        - type: div
          content: ["Parent: ", ~>userList.title]  # Climbs up to 'userList' template to access title

data:
  users:
    - name: "John"
  isAdmin: true
  userList:
    title: "User List"
```

In this example:
- `~.name` accesses the `name` property from the local context (current user)
- `~~.isAdmin` accesses the `isAdmin` property from the global context
- `~>userList.title` climbs up to the "userList" template and accesses its `title` property

## Containerization Principle

Templates create context "containers". This means each template defines its own local data space.

### Impact on Components

This containerization affects several aspects:

1. **Forms**: Form fields using `~.` access data from their defining template
2. **Actions**: Actions using `~.` modify data within the template context
3. **Reactions**: Reactions can access different levels depending on the prefix used

### Form Context Example

```yaml
templates:
  editForm:
    type: form
    content:
      - type: TextField
        path: ~.temp_name  # Local modification
        value: ~.name      # Initial value
      - type: button
        content: "Save"
        actions:
          - what: setData
            on: click
            path: ~~.globalUser.name  # Global save
            value: ~.temp_name        # Uses temporary value

data:
  temp_name: ""
  name: "John"
  globalUser:
    name: "John"
```

## Key Points to Remember

1. Two components using `~.` in different templates access different data
2. Actions and reactions respect the context where they are defined
3. Containerization allows isolating modifications until validation
4. `~~.` allows "escaping" the container to access global data
5. `~>field` allows climbing up to a specific parent context using the template name as reference

## Best Practices

1. **Context Coherence**: Ensure components that need to share data are in the same context
2. **Global Access**: Use `~~.` for data that needs to be shared between different templates
3. **Hierarchical Navigation**: Use `~>field` to access specific parent template data by explicitly naming it 