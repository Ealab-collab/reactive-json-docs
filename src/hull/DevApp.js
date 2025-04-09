import './App.css';
import Page from "./Page";
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function DevApp({dataFetchMethod}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index
                           element={<Page dataFetchMethod={dataFetchMethod}/>}/>
                    <Route path="demo/"
                           element={<Page buildSourcePath={"pages/demo.yaml"}
                                          dataFetchMethod={dataFetchMethod}/>}/>
                    <Route path="charts/"
                           element={<Page buildSourcePath={"pages/charts.yaml"}
                                          dataFetchMethod={dataFetchMethod}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default DevApp;

