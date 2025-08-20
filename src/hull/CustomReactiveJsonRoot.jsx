import { ReactiveJsonRoot } from "@ea-lab/reactive-json";
import { mergeComponentCollections } from "@ea-lab/reactive-json";
import { chartjsComponents } from "@ea-lab/reactive-json-chartjs";
import { demoPlugins } from "./component-demo";

export const CustomReactiveJsonRoot = (props) => {
    const additionalProps = {};

    additionalProps.plugins = mergeComponentCollections([chartjsComponents, demoPlugins]);

    const finalProps = { ...props, ...additionalProps };

    return <ReactiveJsonRoot {...finalProps} />;
};
