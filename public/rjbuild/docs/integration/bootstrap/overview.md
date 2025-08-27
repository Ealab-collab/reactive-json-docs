# Bootstrap Integration Overview

Reactive-JSON has Bootstrap integration through the `@ea-lab/reactive-json-bootstrap` plugin.

The Bootstrap integration adds form components, HTML elements, and actions such as: `TextField`, `SelectField`, `CheckBoxField`, `DateField`, `NumberField`, `TextAreaField`, `Modal`, `Tabs`, `AccordionItem`, `Tooltip`, `Popover`, and the versatile `BootstrapElement` wrapper.

The Bootstrap components integrate with Bootstrap's CSS framework.

## Install

The demo website you currently look at has already this integration installed and ready.

To enable the integration on your own project that uses Reactive-JSON, make sure that the integration is installed and loaded.

Bootstrap support is available through the `@ea-lab/reactive-json-bootstrap` plugin. To get it:

```shell
npm i @ea-lab/reactive-json-bootstrap bootstrap react-bootstrap
```

Then make it available to ReactiveJsonRoot:

```js
import {ReactiveJsonRoot} from "@ea-lab/reactive-json";
import {mergeComponentCollections} from "@ea-lab/reactive-json";
import {bootstrapComponents} from "@ea-lab/reactive-json-bootstrap";

export const YourComponent = () => {

  const rjRootProps = {
    // Set your own props to rjRootProps such as rjBuildUrl.
    // ...
  };

  // Set the plugins prop by merging the component collections.
  // Here, we only have a single plugin, but you can add your own of course.
  rjRootProps.plugins = mergeComponentCollections([bootstrapComponents]);

  return <ReactiveJsonRoot {...rjRootProps} />;
}
```

Don't forget to import Bootstrap CSS in your application:

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

## Component Categories

### Form Elements
- **TextField**: Text input
- **SelectField**: Dropdown select
- **CheckBoxField**: Checkbox input
- **DateField**: Date input (limited support)
- **NumberField**: Numeric input
- **TextAreaField**: Multi-line text input

### HTML Elements
- **Modal**: Modal dialogs
- **Tabs**: Tabbed interface
- **AccordionItem**: Collapsible content panels

### Actions
- **Tooltip**: Tooltips on hover
- **Popover**: Popovers on click/hover

### Special Components
- **BootstrapElement**: Generic wrapper for React-Bootstrap components
