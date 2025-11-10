import { ReactiveJsonRoot, CheckBoxField, SelectField, TextAreaField } from "@ea-lab/reactive-json";
import { mergeComponentCollections } from "@ea-lab/reactive-json";
import { bootstrapComponentsPlugin } from "@ea-lab/reactive-json-bootstrap";
import { chartjsComponents } from "@ea-lab/reactive-json-chartjs";
import { demoPlugins } from "./component-demo";

export const CustomReactiveJsonRoot = (props) => {
    const { useCoreComponents, ...restProps } = props;
    const additionalProps = {};

    // Build the plugins array.
    const pluginsArray = [bootstrapComponentsPlugin, chartjsComponents, demoPlugins];

    if (useCoreComponents) {
        // Override the Bootstrap components with the core components.
        // We do it this way because the website is built with reactive-json-bootstrap,
        // so we need to override the Bootstrap components with the core components
        // when demonstrating the core components.
        pluginsArray.push({
            element: {
                CheckBoxField,
                SelectField,
                TextAreaField,
            },
        });
    }

    additionalProps.plugins = mergeComponentCollections(pluginsArray);
    const finalProps = { ...restProps, ...additionalProps };
    return <ReactiveJsonRoot {...finalProps} />;
};
