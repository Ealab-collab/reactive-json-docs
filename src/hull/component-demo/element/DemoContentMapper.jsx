import {CustomReactiveJsonRoot} from "../../CustomReactiveJsonRoot";
import _ from "lodash";
import {useLocation} from "react-router-dom";

export const DemoContentMapper = () => {
    const {pathname} = useLocation();

    const docsPagesBasePath = "/docs";

    if (pathname.substring(0, docsPagesBasePath.length) !== docsPagesBasePath) {
        // Not a demo page.
        return;
    }

    const subpath = _.trim(pathname.substring(docsPagesBasePath.length), "/");

    let finalDataUrl = "/rjbuild/docs/";

    if (subpath === "" || subpath === "index") {
        finalDataUrl += "index.yaml";
    } else {
        finalDataUrl += subpath + ".yaml";
    }

    return <CustomReactiveJsonRoot dataUrl={finalDataUrl}/>
}
