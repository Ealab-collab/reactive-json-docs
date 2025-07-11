import './App.css';
import './DevApp.css';
import {Page} from "./Page";
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export function DevApp({dataFetchMethod}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index
                           element={<Page dataFetchMethod={dataFetchMethod}/>}/>
                    <Route path="docs/*"
                           element={<Page buildSourcePath={"/rjbuild/pages/docs.yaml"}
                                          dataFetchMethod={dataFetchMethod}/>}
                    />
                    <Route path="charts/"
                           element={<Page buildSourcePath={"/rjbuild/pages/charts.yaml"}
                                          dataFetchMethod={dataFetchMethod}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
