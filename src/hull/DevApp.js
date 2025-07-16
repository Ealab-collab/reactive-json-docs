import './App.css';
import './DevApp.css';
import {Page} from "./Page";
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export function DevApp({rjBuildFetchMethod}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index
                           element={<Page rjBuildFetchMethod={rjBuildFetchMethod}/>}/>
                    <Route path="docs/*"
                           element={<Page buildSourcePath={"/rjbuild/pages/docs.yaml"}
                                          rjBuildFetchMethod={rjBuildFetchMethod}/>}
                    />
                    <Route path="charts/"
                           element={<Page buildSourcePath={"/rjbuild/pages/charts.yaml"}
                                          rjBuildFetchMethod={rjBuildFetchMethod}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
