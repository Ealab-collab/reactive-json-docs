import {CustomReactiveJsonRoot} from "../../CustomReactiveJsonRoot";
import _ from "lodash";
import {useLocation} from "react-router-dom";

export const DemoContentMapper = () => {
    const {pathname} = useLocation();

    const demoPagesBasePath = "/demo";

    if (pathname.substring(0, demoPagesBasePath.length) !== demoPagesBasePath) {
        // Not a demo page.
        return;
    }

    const subpath = _.trim(pathname.substring(demoPagesBasePath.length), "/");

    let finalDataUrl = "/rjbuild/component-doc/";

    if (subpath === "" || subpath === "index") {
        finalDataUrl += "index.yaml";
    } else {
        finalDataUrl += subpath + ".yaml";
    }

    return <CustomReactiveJsonRoot dataUrl={finalDataUrl}/>
}
