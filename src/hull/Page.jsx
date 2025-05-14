import {CustomReactiveJsonRoot} from "./CustomReactiveJsonRoot";

export function Page({buildSourcePath, dataFetchMethod}) {
    const filePath = buildSourcePath ?? new URL(window.location).searchParams.get("file_path") ?? "/pages/home.yaml";
    const debugMode = new URL(window.location).searchParams.get("debug") ?? true;

    return <CustomReactiveJsonRoot dataFetchMethod={dataFetchMethod} dataUrl={filePath} debugMode={debugMode}/>;
}
