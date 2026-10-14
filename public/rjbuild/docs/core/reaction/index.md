# Reactions

> For an introduction to the reactions system and detailed examples, see [Getting Started: Reactions](../../getting-started/reactions.md).

Reactions in Reactive-JSON allow you to respond to user events and perform operations like data updates, network requests, and browser interactions. They execute in response to user events to modify application state and trigger behaviors.

## Available Reaction Components

### Data Management
- **[setData](./setData.md)**: Sets data at the specified path
- **[addData](./addData.md)**: Adds new data to the specified path
- **[removeData](./removeData.md)**: Removes data from the specified path
- **[moveData](./moveData.md)**: Moves data from one path to another
- **[toggleData](./toggleData.md)**: Adds a value to an array when absent, removes it when present
- **[collectField](./collectField.md)**: Writes the values of a field of every item of a collection as an array
- **[joinData](./joinData.md)**: Writes a string built from several parts (literals, references, segments)
- **[stringifyData](./stringifyData.md)**: Writes the JSON representation of a value

### Network Operations
- **[fetchData](./fetchData.md)**: Fetches data from a URL using GET requests
- **[submitData](./submitData.md)**: Submits data to a server endpoint using POST/PUT/DELETE

### Browser Operations
- **[setClipboardData](./setClipboardData.md)**: Copies data to the clipboard
- **[redirectNow](./redirectNow.md)**: Performs an immediate redirect
- **[triggerEvent](./triggerEvent.md)**: Triggers a custom event
- **[postMessage](./postMessage.md)**: Sends a message to another window/frame
- **[printPage](./printPage.md)**: Opens the print dialog of the browser

