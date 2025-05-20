import {CustomReactiveJsonRoot} from "./CustomReactiveJsonRoot";
import {Layout} from "./Layout";

export function Page({buildSourcePath, dataFetchMethod}) {
    const filePath = buildSourcePath ?? new URL(window.location).searchParams.get("file_path") ?? "/rjbuild/pages/home.yaml";
    const debugMode = new URL(window.location).searchParams.get("debug") ?? true;

    return <Layout>
        <CustomReactiveJsonRoot dataFetchMethod={dataFetchMethod} dataUrl={filePath} debugMode={debugMode}/>
    </Layout>;
}
