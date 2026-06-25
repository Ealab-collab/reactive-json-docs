# DataSync

The `DataSync` component enables automatic synchronization between client-side data and a backend endpoint. It watches a **Syncable Object** in the data tree and pushes changes to a server when triggered, either automatically after a period of inactivity, immediately on change, or manually via an explicit trigger.

This component does not render any visible UI. It acts as a background observer.

## The Syncable Object

`DataSync` watches a data object that follows a specific structure called a **Syncable Object**. This object contains both the data to synchronize and the configuration needed to reach the backend.

### Structure

```yaml
mySyncableObject:
  submission_url: "https://api.example.com/items/save"
  item_url: "https://api.example.com/items/123"
  delete_url: "https://api.example.com/items/123"
  data:
    entity_id: 123
    name: "John Doe"
    email: "john@example.com"
  status:
    type: "info"
    message: "Ready"
```

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `submission_url` | string | Yes | URL where the object is sent for create/update (POST). This is the only URL used by the `DataSync` component. If `entity_id` is absent from `data`, the backend should treat it as a creation. |
| `item_url` | string | No | URL to fetch the latest version of the item (GET). **Not used by `DataSync` itself** — provided as metadata for the backend or other components. |
| `delete_url` | string | No | URL to delete the item (DELETE). **Not used by `DataSync` itself** — provided as metadata for the backend or other components. |
| `data` | any | Yes | The actual payload to synchronize. Its structure depends on the backend. Only changes to this field trigger synchronization. |
| `status` | object | No | Feedback message from the last operation. Contains `type` and `message`. |

### The `status` field

The `status` field follows a standard structure with two properties:

| Property | Type | Description |
|---|---|---|
| `type` | string | One of: `success`, `error`, `info`, `warning`. |
| `message` | string | Human-readable message describing the result. |

The `status` field is managed in three ways:
1. **By the component**: Set to `{ type: "info", message: "Synchronisation en cours..." }` while a request is in flight.
2. **By the backend**: The server response replaces the entire Syncable Object, including the `status` field. The backend can set it to `success`, `error`, or any type with a relevant message.
3. **On HTTP failure**: If the request fails (network error, 5xx), the component generates `{ type: "error", message: "..." }` locally.

### Backend contract

When `DataSync` sends a request, it POSTs the **entire Syncable Object** (not just `data`) to `submission_url`. The backend must return the same Syncable Object structure in its response, potentially with:
- Modified `data` (e.g., server-generated fields like `entity_id` or timestamps).
- An updated `status` field reflecting the result of the operation.

The response completely replaces the local Syncable Object.

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `path` | string | (required) | Path to the Syncable Object to watch. Supports template paths (`~~.`, `~.`, `~>`). |
| `mode` | string | `"onIdle"` | Synchronization mode: `"onIdle"`, `"immediate"`, or `"manual"`. |
| `idleDelay` | number | `1000` | Milliseconds of inactivity before syncing (only used in `onIdle` mode). |
| `trigger` | string | - | Path to a boolean value. When set to `true`, triggers an immediate sync and resets to `false`. Works in any mode. In `onIdle` mode, it cancels the pending idle timer. |
| `maxRetries` | number | `0` | Number of additional retry attempts after a failed sync. `0` means one attempt with no retry. |
| `retryDelay` | number | `5000` | Milliseconds between retry attempts. |
| `mergeKey` | string | - | Path to a **stable identity** for the syncable (typically its `submission_url`). All `DataSync` instances resolving to the same value form a shared group: edits are mirrored live across them and persisted by a single owner. See [Shared Syncables](#shared-syncables-mergekey). |

## Synchronization Modes

### `onIdle` (default)
Waits for the user to stop modifying data. Each change resets the idle timer. The sync fires only after `idleDelay` milliseconds of inactivity.

```yaml
- type: DataSync
  path: ~~.userProfile
  mode: onIdle
  idleDelay: 2000
```

### `immediate`
Syncs immediately on every data change. Use with caution -- this can generate a high volume of requests.

```yaml
- type: DataSync
  path: ~~.settings
  mode: immediate
```

### `manual`
Does not sync on data changes. Waits for the `trigger` path to become `true`.

```yaml
- type: DataSync
  path: ~~.formData
  mode: manual
  trigger: ~~.saveNow
```

## Manual Trigger

The `trigger` property works in **any mode**, not just `manual`. When the trigger path is set to `true`:

1. The trigger is immediately reset to `false`.
2. Any pending idle timer is cancelled (in `onIdle` mode).
3. A sync is performed immediately.

This is useful for adding a "Save Now" button alongside auto-save:

```yaml
- type: button
  content: "Save Now"
  actions:
    - what: setData
      on: click
      path: ~~.saveNow
      value: true

- type: DataSync
  path: ~~.userProfile
  mode: onIdle
  idleDelay: 2000
  trigger: ~~.saveNow
```

## Reacting to Sync Events

`DataSync` dispatches two custom DOM events that can be caught using `on:` in its `actions` array:

| Event | When it fires |
|---|---|
| `syncSuccess` | The server returned a 2xx response. |
| `syncError` | The request failed (any 4xx, 5xx, or network error). |

### Accessing event data

Both events expose their payload through the standard event placeholder system:

| Placeholder | Description |
|---|---|
| `<reactive-json:event-new-value>` | The response body (`event.detail.value`). On success, this is the full server response. On a structured error (see below), this is the error body returned by the server. |
| `<reactive-json:event>.detail.responseContext.status` | The HTTP status code (number), or `undefined` for pure network errors. |

### Example

```yaml
- type: DataSync
  path: ~~.userProfile
  mode: onIdle
  idleDelay: 2000
  actions:
    - what: setData
      on: syncSuccess
      path: ~~.lastSync.httpStatus
      value: "<reactive-json:event>.detail.responseContext.status"
    - what: setData
      on: syncSuccess
      path: ~~.lastSync.response
      value: "<reactive-json:event-new-value>"
    - what: setData
      on: syncError
      path: ~~.lastSync.httpStatus
      value: "<reactive-json:event>.detail.responseContext.status"
    - what: setData
      on: syncError
      path: ~~.lastSync.errorBody
      value: "<reactive-json:event-new-value>"
```

### Structured vs. unstructured errors

When the server responds with a 4xx/5xx and the body contains a `status` field (matching the Syncable Object format), `DataSync` treats it as a **structured error**:
- The body replaces the local Syncable Object.
- `syncError` fires with `event.detail.value` set to that body.
- The retry mechanism is **not** triggered — the server explicitly acknowledged the error.

For raw server or network errors (5xx without a structured body, or the browser being offline), `syncError` fires with `event.detail.value` set to `undefined`. In this case the component generates a local `status` object with `{ type: "error", message: "..." }` and may trigger retries according to `maxRetries`.

## Error Handling and Retries

### Retry behavior
- Only **network outages** (browser is offline) and **server errors** (HTTP 5xx) trigger retries.
- Client errors (4xx) and CORS failures do **not** trigger retries.
- When the user makes a new data change, the retry counter resets and a fresh sync cycle begins.

### Configuration
```yaml
- type: DataSync
  path: ~~.userProfile
  mode: onIdle
  idleDelay: 1000
  maxRetries: 3
  retryDelay: 10000
```

## Change Detection

`DataSync` only triggers synchronization when the `data` field of the Syncable Object changes. Changes to `status`, `submission_url`, or other fields are ignored.

This prevents feedback loops: when the component updates `status` to "syncing" or when the server response updates `status` to "success", these changes do not trigger a new sync cycle.

## Shared Syncables (`mergeKey`)

When the **same resource** is mounted in several places at once — the same record shown in two views, or one editable item embedded in multiple components — each `DataSync` would normally watch its own copy and POST independently. That causes duplicate writes and lets the copies drift apart.

Set `mergeKey` to make those instances cooperate. It is a path resolving to a **stable identity** for the syncable (commonly its `submission_url`). Every `DataSync` that resolves to the same value forms a **group**:

- **One writer (the owner).** The first instance to join is the group's owner, re-elected automatically if it unmounts. Only the owner sends requests.
- **Live mirror.** When any member's `data` changes, that data is applied to every other member's store — with their own change-watcher suppressed, so they neither re-broadcast nor POST. All copies stay in sync on screen.
- **Single, coalesced write.** Persistence is delegated to the owner, which (re)schedules its one debounced sync and reads the **latest** shared data when it fires. Rapid edits across different members collapse into a single request carrying the final value — no concurrent writers, no stale-data write, no revert.
- **Server propagation.** On a successful sync, the owner broadcasts the (server-enriched) response `data` back to the group.

```yaml
data:
  cardA:
    submission_url: "/api/items/123"
    data: { title: "Hello" }
  cardB:
    submission_url: "/api/items/123"   # SAME entity, second mount
    data: { title: "Hello" }

renderView:
  - type: TextField
    dataLocation: ~~.cardA.data.title
  - type: DataSync
    path: ~~.cardA
    mergeKey: ~~.cardA.submission_url

  - type: TextField
    dataLocation: ~~.cardB.data.title
  - type: DataSync
    path: ~~.cardB
    mergeKey: ~~.cardB.submission_url
```

Editing either field mirrors live to the other, and the whole group produces a single POST.

**Notes**
- The library stays agnostic about what makes two syncables "the same": you pick the identity by pointing `mergeKey` at whatever field is stable per resource (usually `submission_url`).
- Leaving `mergeKey` unset keeps the default behavior — one independent sync per instance.
- Known limitation: if the owner unmounts while a sync is still pending, that in-flight edit is not persisted (the new owner only writes on the next edit).

### Overriding the grouping (advanced)

The group coordination — membership, owner election, and the live broadcast — is not hard-wired into `DataSync`. It is resolved from a **`utility` plugin** named `dataSyncGroups`, falling back to the core singleton registry when none is supplied. This lets an app swap *just* the grouping behavior (e.g. a registry scoped per tab, or one that bridges across iframes) without overriding the whole `DataSync` element.

Register your own under `plugins.utility`:

```js
const myDataSyncGroups = {
  joinSyncGroup(key, member) { /* … returns a leave() function */ },
  broadcastToGroup(key, fromMember, data) { /* … */ },
  getOwner(key) { /* … returns the current writer or null */ },
};

const plugins = mergeComponentCollections([
  { utility: { dataSyncGroups: myDataSyncGroups } },
]);
```

The registry must be a **shared singleton**: every `DataSync` that resolves the same `dataSyncGroups` object joins the same groups. Provide one instance, not one per render.

## Using with Templates

`DataSync` supports `TemplateContext`, so it can be used inside templates to sync individual items in a list:

```yaml
data:
  items:
    - submission_url: "/api/items/1"
      data: { name: "Item 1" }
    - submission_url: "/api/items/2"
      data: { name: "Item 2" }

templates:
  itemRow:
    type: div
    content:
      - type: TextField
        dataLocation: ~.data.name
      - type: DataSync
        path: "~"
        mode: onIdle
        idleDelay: 1500

renderView:
  - type: Switch
    content: ~~.items
    singleOption:
      load: itemRow
```

## Displaying Status

You can display the status message from the Syncable Object to provide feedback to the user:

```yaml
- type: div
  content: ~~.userProfile.status.message
  actions:
    - what: hide
      when: ~~.userProfile.status
      is: undefined
```

## Complete Example

```yaml
data:
  userProfile:
    submission_url: "/api/user/save"
    item_url: "/api/user/123"
    delete_url: "/api/user/123"
    data:
      name: "John Doe"
      email: "john@example.com"
    status:
      type: "info"
      message: "Ready"
  saveNow: false

renderView:
  - type: div
    content:
      # Status display
      - type: div
        content: ~~.userProfile.status.message
        actions:
          - what: hide
            when: ~~.userProfile.status
            is: undefined

      # Form fields
      - type: TextField
        label: "Name"
        dataLocation: ~~.userProfile.data.name

      - type: TextField
        label: "Email"
        dataLocation: ~~.userProfile.data.email

      # Manual save button
      - type: button
        content: "Save Now"
        actions:
          - what: setData
            on: click
            path: ~~.saveNow
            value: true

      # DataSync: auto-saves after 2s of idle, manual trigger available
      - type: DataSync
        path: ~~.userProfile
        mode: onIdle
        idleDelay: 2000
        trigger: ~~.saveNow
```

## Limitations
- Only one sync can be active at a time per `DataSync` instance. Concurrent changes while a sync is in flight are not queued.
- The entire Syncable Object is sent in the POST body, not just the `data` field.
- Only POST requests are supported for submission. Custom HTTP methods are not configurable.
- `item_url` and `delete_url` are part of the Syncable Object structure but are not used by the component itself. They are available for the backend or for other components to use.
- No built-in support for optimistic updates. The local data is replaced by the server response.
- CORS errors are not retried (they are indistinguishable from network errors when the browser is online).
