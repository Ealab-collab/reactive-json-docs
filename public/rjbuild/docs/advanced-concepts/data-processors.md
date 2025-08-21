# Data Processors

Data Processors are a powerful feature in Reactive-JSON that allow you to intercept and modify data received via `fetchData`, `submitData`, and `additionalDataSources`. This enables you to implement data transformation, validation, security filtering, and other data processing logic in a centralized and reusable way.

## How Data Processors Work

When Reactive-JSON receives data from HTTP requests, it automatically passes the data through all registered Data Processors in order. Each processor:

1. **Examines the request and response context** (URL, method, headers, status, etc.)
2. **Receives the current data** being processed
3. **Must return the data** - either transformed or unchanged
4. **Chains with other processors** (processed data flows to the next processor)

## Basic Structure

A Data Processor is a function that receives context and data, then **must return** the processed data:

```javascript
const myDataProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    // Check if we want to process this data
    if (!requestContext.url.includes('/api/users')) {
        return dataToProcess; // Return unchanged data
    }
    
    // Check response status
    if (responseContext.status >= 400) {
        return dataToProcess; // Return unchanged data
    }
    
    // Transform the data
    const processedData = {
        ...dataToProcess,
        timestamp: new Date().toISOString(),
        source: requestContext.url
    };
    
    return processedData; // Return transformed data
};
```

## Function Parameters

### requestContext
Information about the HTTP request:
- `url`: The URL that was called
- `method`: HTTP method (GET, POST, etc.)
- `headers`: Request headers object
- `body`: Request body (for POST, PUT, etc.)

### responseContext
Information about the HTTP response:
- `headers`: Response headers object
- `status`: HTTP status code (200, 404, etc.)
- `data`: Raw response data

### dataToProcess
The data currently being processed. This may have been modified by previous Data Processors in the chain.

### originalDataToProcess
The original data before any processing, useful for comparison or logging.

## Plugin Registration

Data Processors are registered through the plugin system:

```javascript
import { mergeComponentCollections } from "@ea-lab/reactive-json";

const myPlugins = {
    element: {
        // Your custom components
    },
    dataProcessor: {
        "timestamp-processor": { 
            callback: timestampProcessor, 
            order: 0 
        },
        "security-filter": { 
            callback: securityProcessor, 
            order: 10 
        }
    }
};

export const MyReactiveJsonRoot = (props) => {
    const plugins = mergeComponentCollections([myPlugins]);
    return <ReactiveJsonRoot {...props} plugins={plugins} />;
};
```

### Plugin Structure
- **Key**: Unique identifier for the processor
- **callback**: The processor function
- **order**: Execution order (lower numbers run first)

## Common Use Cases

### Adding Timestamps

```javascript
const timestampProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    if (typeof dataToProcess !== 'object' || dataToProcess === null) {
        return dataToProcess; // Return unchanged for non-objects
    }
    
    return {
        ...dataToProcess,
        __metadata: {
            processedAt: new Date().toISOString(),
            sourceUrl: requestContext.url,
            responseStatus: responseContext.status
        }
    };
};
```

### Security Filtering

```javascript
const securityProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    // Only filter external API responses
    if (!requestContext.url.includes('external-api')) {
        return dataToProcess; // Return unchanged
    }
    
    if (typeof dataToProcess !== 'object' || dataToProcess === null) {
        return dataToProcess; // Return unchanged for non-objects
    }
    
    // Remove sensitive fields
    const sensitiveFields = ['password', 'secret', 'apiKey', 'token'];
    const cleanedData = { ...dataToProcess };
    
    sensitiveFields.forEach(field => {
        if (cleanedData.hasOwnProperty(field)) {
            delete cleanedData[field];
            console.log(`🔒 Removed sensitive field: ${field}`);
        }
    });
    
    return cleanedData;
};
```

### Data Format Transformation

```javascript
const dateFormatProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    if (typeof dataToProcess !== 'object' || dataToProcess === null) {
        return dataToProcess; // Return unchanged for non-objects
    }
    
    const processedData = { ...dataToProcess };
    
    // Convert DD/MM/YYYY dates to YYYY-MM-DD
    Object.keys(processedData).forEach(key => {
        if (typeof processedData[key] === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(processedData[key])) {
            const [day, month, year] = processedData[key].split('/');
            processedData[key] = `${year}-${month}-${day}`;
        }
    });
    
    return processedData;
};
```

### Conditional Processing

```javascript
const userDataProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    // Only process successful user API responses
    if (!requestContext.url.includes('/api/users') || responseContext.status !== 200) {
        return dataToProcess; // Return unchanged
    }
    
    if (typeof dataToProcess !== 'object' || dataToProcess === null) {
        return dataToProcess; // Return unchanged for non-objects
    }
    
    // Add user-specific processing
    return {
        ...dataToProcess,
        fullName: `${dataToProcess.firstName} ${dataToProcess.lastName}`,
        isActive: dataToProcess.status === 'active',
        permissions: dataToProcess.role === 'admin' ? ['read', 'write', 'delete'] : ['read']
    };
};
```

## RjBuild vs Data Processing

The system automatically detects whether the response is a complete RjBuild or just data:

- **Complete RjBuild**: Processors only modify the `data` section
- **Data only**: Processors modify the entire response

This happens automatically based on the `updateOnlyData` parameter in `fetchData`/`submitData`.

## Execution Context

### With `fetchData`/`submitData`
```yaml
- type: button
  content: "Load User Data"
  actions:
    - what: fetchData
      on: click
      url: "/api/users/123"
      refreshAppOnResponse: true
      updateOnlyData: false # The response is expected to be a complete RjBuild.
      # When the response is a complete RjBuild, the processors will receive the data only.
```

### With `additionalDataSources`
```yaml
additionalDataSource:
  - src: "/api/config"
    path: "~~.config"
    # Processors will automatically process this data
```

## Best Practices

### Always Return Data
Data Processors **must always return data**. To skip processing, return the original data:

```javascript
const myProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    // Skip processing for certain conditions
    if (!requestContext.url.includes('/api/')) {
        return dataToProcess; // Return unchanged
    }
    if (responseContext.status >= 400) {
        return dataToProcess; // Return unchanged
    }
    if (typeof dataToProcess !== 'object') {
        return dataToProcess; // Return unchanged
    }
    
    // Process and return transformed data
    return { ...dataToProcess, processed: true };
};
```

### Immutable Updates
Always clone data before modifying:

```javascript
const processedData = { ...dataToProcess }; // Shallow clone
// Or for deep cloning, use JSON.parse(JSON.stringify(...)):
const processedData = JSON.parse(JSON.stringify(dataToProcess));
// Or with lodash:
const processedData = _.cloneDeep(dataToProcess);
```

### Error Handling
The system automatically catches errors, but you can add your own:

```javascript
const safeProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    try {
        // Your processing logic
        return processedData;
    } catch (error) {
        console.error('Processing failed:', error);
        return dataToProcess; // Return original data on error
    }
};
```

### Descriptive IDs and Ordering
Use clear names and logical ordering:

```javascript
const plugins = {
    dataProcessor: {
        "01-timestamp": { callback: timestampProcessor, order: 0 },
        "02-security": { callback: securityProcessor, order: 10 },
        "03-formatting": { callback: formatProcessor, order: 20 }
    }
};
```

## Debugging

### Logging
Add console logs to understand the flow:

```javascript
const debugProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    console.log('🔍 Processing:', requestContext.url);
    console.log('📊 Status:', responseContext.status);
    console.log('📥 Data keys:', Object.keys(dataToProcess));
    
    // Your processing logic
    const processedData = { ...dataToProcess, debug: true };
    
    console.log('📤 Processed keys:', Object.keys(processedData));
    return processedData;
};
```

### Browser DevTools
The system automatically logs processor errors to the console, making debugging straightforward.

## Complete Example

Here's a comprehensive example showing multiple processors working together:

```javascript
import { mergeComponentCollections } from "@ea-lab/reactive-json";

// Utility processors
const timestampProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    if (typeof dataToProcess !== 'object' || dataToProcess === null) {
        return dataToProcess;
    }
    
    return {
        ...dataToProcess,
        __processed: {
            timestamp: new Date().toISOString(),
            url: requestContext.url,
            status: responseContext.status
        }
    };
};

const securityProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    if (!requestContext.url.includes('external')) {
        return dataToProcess;
    }
    if (typeof dataToProcess !== 'object' || dataToProcess === null) {
        return dataToProcess;
    }
    
    const cleaned = { ...dataToProcess };
    ['password', 'secret', 'token'].forEach(field => delete cleaned[field]);
    return cleaned;
};

const userDataProcessor = ({ requestContext, responseContext, dataToProcess, originalDataToProcess }) => {
    if (!requestContext.url.includes('/users')) {
        return dataToProcess;
    }
    if (typeof dataToProcess !== 'object' || dataToProcess === null) {
        return dataToProcess;
    }
    
    return {
        ...dataToProcess,
        displayName: `${dataToProcess.firstName} ${dataToProcess.lastName}`,
        isOnline: dataToProcess.lastSeen && 
                 (Date.now() - new Date(dataToProcess.lastSeen).getTime()) < 300000 // 5 minutes
    };
};

const myPlugins = {
    element: {
        // Your components
    },
    dataProcessor: {
        "timestamp": { callback: timestampProcessor, order: 0 },
        "security": { callback: securityProcessor, order: 5 },
        "user-enhancement": { callback: userDataProcessor, order: 10 }
    }
};

export const MyApp = (props) => {
    const plugins = mergeComponentCollections([myPlugins]);
    return <ReactiveJsonRoot {...props} plugins={plugins} />;
};
```
