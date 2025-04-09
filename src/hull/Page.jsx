import AppRoot from "./AppRoot";

function Page({buildSourcePath, dataFetchMethod}) {
    const filePath = buildSourcePath ?? new URL(window.location).searchParams.get("file_path") ?? "/pages/home.yaml";
    const debugMode = new URL(window.location).searchParams.get("debug") ?? true;

    return <AppRoot dataFetchMethod={dataFetchMethod} dataUrl={filePath} debugMode={debugMode}/>;
}

export default Page;
