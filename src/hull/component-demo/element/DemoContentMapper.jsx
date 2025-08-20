import _ from "lodash";
import { useLocation } from "react-router-dom";
import { CustomReactiveJsonRoot } from "../../CustomReactiveJsonRoot";

export const DemoContentMapper = () => {
    const { pathname } = useLocation();

    const docsPagesBasePath = "/docs";

    if (pathname.substring(0, docsPagesBasePath.length) !== docsPagesBasePath) {
        // Not a demo page.
        return;
    }

    const subpath = _.trim(pathname.substring(docsPagesBasePath.length), "/");

    let finalRjBuildUrl = "/rjbuild/docs/";

    if (subpath === "" || subpath === "index") {
        finalRjBuildUrl += "index.yaml";
    } else {
        finalRjBuildUrl += subpath + ".yaml";
    }

    return <CustomReactiveJsonRoot rjBuildUrl={finalRjBuildUrl} />;
};
