# Reactions

> For an introduction to the reactions system and detailed examples, see [Getting Started: Reactions](../../getting-started/reactions.md).

Reactions in Reactive-JSON allow you to respond to user events and perform operations like data updates, network requests, and browser interactions. They execute in response to user events to modify application state and trigger behaviors.

## Available Reaction Components

### Data Management
- **[setData](./setData.md)**: Sets data at the specified path
- **[addData](./addData.md)**: Adds new data to the specified path
- **[removeData](./removeData.md)**: Removes data from the specified path
- **[moveData](./moveData.md)**: Moves data from one path to another

### Network Operations
- **[fetchData](./fetchData.md)**: Fetches data from a URL using GET requests
- **[submitData](./submitData.md)**: Submits data to a server endpoint using POST/PUT/DELETE

### Browser Operations
- **[setClipboardData](./setClipboardData.md)**: Copies data to the clipboard
- **[redirectNow](./redirectNow.md)**: Performs an immediate redirect
- **[triggerEvent](./triggerEvent.md)**: Triggers a custom event
- **[postMessage](./postMessage.md)**: Sends a message to another window/frame

