import DemoReactiveJsonRoot from "./DemoReactiveJsonRoot";

function Page({buildSourcePath, dataFetchMethod}) {
    const filePath = buildSourcePath ?? new URL(window.location).searchParams.get("file_path") ?? "/pages/home.yaml";
    const debugMode = new URL(window.location).searchParams.get("debug") ?? true;

    return <DemoReactiveJsonRoot dataFetchMethod={dataFetchMethod} dataUrl={filePath} debugMode={debugMode}/>;
}

export default Page;
