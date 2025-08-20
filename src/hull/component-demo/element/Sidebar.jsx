import { useState } from "react";
import { Accordion, Button, Nav, Offcanvas } from "react-bootstrap";
import { docsPageNavigation } from "../index";
import "./Sidebar.css";

/**
 * Sidebar content.
 *
 * @param {Object|any} items
 * @param {boolean} noMarginStart
 *
 * @constructor
 */
const SidebarItems = ({ items, noMarginStart = true }) => {
    if (items.length === 0) {
        return;
    }

    const navClassName = "flex-column" + (noMarginStart ? "" : " ");

    return (
        <Nav activeKey={window.location.pathname} className={navClassName}>
            <Nav.Item>
                {Object.entries(items).map(([index, item]) => {
                    if (item.items) {
                        // Foldable item with collection of paths.
                        // Determine if this folder should be collapsed by checking the location.
                        const isExpanded = window.location.pathname.startsWith(index);

                        return (
                            <Accordion flush key={index} defaultActiveKey={isExpanded ? "0" : null}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{item.title || "..."}</Accordion.Header>
                                    <Accordion.Body>
                                        <SidebarItems items={item.items} noMarginStart={false} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        );
                    } else {
                        // Final link.
                        return (
                            <Nav.Link href={index} key={index}>
                                {item.title || "..."}
                            </Nav.Link>
                        );
                    }
                })}
            </Nav.Item>
        </Nav>
    );
};

export const Sidebar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const DemoSidebar = () => <SidebarItems items={docsPageNavigation} />;

    return (
        <>
            {/* Burger button.*/}
            <Button variant="primary" className="d-xl-none m-2" onClick={handleShow}>
                ☰ Menu
            </Button>

            {/* Responsive sidebar. */}
            <Offcanvas className={"rj-demo-sidebar"} show={show} onHide={handleClose} responsive={"xl"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    className={"position-sticky overflow-scroll"}
                    style={{ height: "calc(100vh - 4rem)", top: "4rem" }}
                >
                    <Nav className={"flex-column"} style={{ width: "300px" }}>
                        <DemoSidebar />
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
