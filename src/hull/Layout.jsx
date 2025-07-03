import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import './Layout.css';

export const Layout = ({children}) => {
    return (
        <>
            <Navbar bg="light" expand="lg" className={"sticky-top"}>
                <Navbar.Brand href="/">reactive-json demo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/docs">Docs</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
        </>
    );
};
