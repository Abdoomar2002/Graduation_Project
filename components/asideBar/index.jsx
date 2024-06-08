import React, { useState, useEffect } from "react";
import { Collapse, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  //const theme = useSelector((state) => state.theme); // Use Redux to access theme state
  //const dispatch = useDispatch();

  useEffect(() => {
    // Handle local storage/Redux persistence of collapsed state (optional)
  }, []);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`aside-bar ${isCollapsed ? "collapsed" : ""}`}>
      <FaBars className="toggle-btn" onClick={handleToggle} />
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
      </ul>
    </div>
  );
};

export default SideBar;
