# Mermaid

**Package**: @ea-lab/reactive-json-docs

The `Mermaid` component enables the creation of beautiful diagrams and flowcharts using Mermaid syntax. It supports automatic dark mode adaptation and provides seamless integration with the reactive-json system.

## Properties

- `content` (string, required): The Mermaid diagram definition (supports template evaluation)
- `attributes` (object, optional): HTML attributes for the wrapper div
- `mermaidConfig` (object, optional): Custom Mermaid configuration to override defaults

## Theme Support

The component automatically adapts to dark/light mode:
- **Light Mode**: Uses default Mermaid light theme with custom color variables
- **Dark Mode**: Uses Mermaid dark theme with enhanced contrast and visibility
- **Automatic Switching**: Theme changes dynamically based on the current mode

## Supported Diagram Types

The component supports all Mermaid diagram types, including:

- **Flowcharts**: Decision trees, process flows, system diagrams
- **Sequence Diagrams**: Interaction flows, API calls, communication patterns
- **Class Diagrams**: Object-oriented design, database schemas
- **State Diagrams**: State machines, workflow states
- **Entity Relationship Diagrams**: Database relationships
- **User Journey**: User experience flows
- **Gantt Charts**: Project timelines, task scheduling
- **Pie Charts**: Data visualization
- **Git Graphs**: Version control workflows

## Examples

### Basic Flowchart

Simple flowchart demonstrating decision logic:

```yaml
renderView:
  - type: Mermaid
    content: |
      flowchart TD
          A[Start] --> B{Is it working?}
          B -->|Yes| C[Great!]
          B -->|No| D[Fix it]
          D --> B
          C --> E[End]

data: {}
```

### Sequence Diagram

User authentication flow with multiple actors:

```yaml
renderView:
  - type: Mermaid
    content: |
      sequenceDiagram
          participant U as User
          participant F as Frontend
          participant A as Auth Service
          participant D as Database
          
          U->>F: Login Request
          F->>A: Validate Credentials
          A->>D: Check User
          D-->>A: User Data
          A-->>F: JWT Token
          F-->>U: Login Success

data: {}
```

### State Diagram

Application state transitions:

```yaml
renderView:
  - type: Mermaid
    content: |
      stateDiagram-v2
          [*] --> Loading
          Loading --> Success : Data Loaded
          Loading --> Error : Failed
          Success --> Loading : Refresh
          Error --> Loading : Retry
          Success --> [*] : Complete
          Error --> [*] : Give Up

data: {}
```

### Class Diagram

Object-oriented design example:

```yaml
renderView:
  - type: Mermaid
    content: |
      classDiagram
          class ReactiveJson {
              +render()
              +updateData()
              +evaluateTemplate()
          }
          
          class Component {
              +props
              +render()
          }
          
          class ActionDependant {
              +handleActions()
              +processEvents()
          }
          
          ReactiveJson --> Component
          Component --> ActionDependant

data: {}
```

## Dynamic Content

The component supports template evaluation for dynamic diagrams:

```yaml
renderView:
  - type: Mermaid
    content: ~.diagramDefinition

data:
  diagramDefinition: |
    flowchart LR
        A[Input Data] --> B[Process]
        B --> C[Output]
```

## Advanced Examples

### User Journey

Complete user experience flow:

```yaml
renderView:
  - type: Mermaid
    content: |
      journey
          title User Registration Journey
          section Discovery
            Visit Website: 3: User
            Browse Features: 4: User
            Read Documentation: 3: User
          section Registration
            Click Sign Up: 5: User
            Fill Form: 2: User
            Verify Email: 1: User
          section Onboarding
            Complete Profile: 4: User
            First Login: 5: User
            Explore Dashboard: 5: User
```

### Entity Relationship Diagram

Database schema representation:

```yaml
renderView:
  - type: Mermaid
    content: |
      erDiagram
          USERS {
              int id PK
              string email UK
              string password
              datetime created_at
          }
          
          PROFILES {
              int id PK
              int user_id FK
              string first_name
              string last_name
              text bio
          }
          
          POSTS {
              int id PK
              int author_id FK
              string title
              text content
              datetime published_at
          }
          
          USERS ||--|| PROFILES : has
          USERS ||--o{ POSTS : creates
```

## Custom Configuration

You can customize Mermaid behavior using the `mermaidConfig` property:

```yaml
renderView:
  - type: Mermaid
    mermaidConfig:
      themeVariables:
        primaryColor: "#ff6b6b"
        primaryBorderColor: "#ff6b6b"
        lineColor: "#333333"
      flowchart:
        nodeSpacing: 100
        rankSpacing: 150
        curve: "linear"
    content: |
      flowchart TD
          A[Custom Colors] --> B{Decision}
          B -->|Yes| C[Success]
          B -->|No| D[Retry]
```

The `mermaidConfig` is deeply merged with default configuration, allowing you to override specific properties while keeping others.

## Error Handling

The component provides graceful error handling:
- Syntax errors are logged to console with detailed information
- Invalid diagram content doesn't display anything (silent failure)
- Error messages are in English for consistency
- Original content and error details are included in console logs for debugging

## Best Practices

1. **Syntax Validation**: Test diagram syntax before deployment
2. **Content Length**: Keep diagrams readable by limiting complexity
3. **Template Evaluation**: Use template patterns for dynamic diagram generation
4. **Responsive Design**: Consider diagram size on different screen sizes
5. **Performance**: Cache static diagrams when possible
6. **Accessibility**: Provide text alternatives for complex diagrams

## Integration Tips

- Combine with other reactive-json components for interactive documentation
- Use with `Switch` component for tabbed diagram views
- Integrate with data fetching for dynamic diagram generation
- Leverage template system for personalized diagrams based on user data
