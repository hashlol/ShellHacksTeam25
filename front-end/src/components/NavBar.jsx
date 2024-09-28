import React, { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar"; // Material UI core components are in @mui/material
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import "./components.css";

/**
 * NavBar component renders a responsive navigation bar with menu items.
 *
 * @component NavBar
 */
const NavBar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { menuTitle: "Home", pageURL: "/Home" },
    { menuTitle: "About", pageURL: "/About" },
    { menuTitle: "Contact", pageURL: "/Contact" },
  ];

  return (
    <div style={{ width: "100%" }}>
      <AppBar
        position="absolute"
        style={{ backgroundColor: "#f5f5f5", width: "100%", boxShadow: 0 }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div className="navTitle">
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "#4143E3",
                fontSize: "30px",
                fontWeight: "BOLD",
              }}
            >
              Learnify
            </Link>
            <div style={{ textDecoration: "none", marginLeft: "10px" }}></div>
          </div>
          <div className="headerOptions">
            {menuItems.map((menuItem) => (
              <Button
                key={menuItem.menuTitle}
                component={NavLink}
                to={menuItem.pageURL}
                style={({ isActive }) => ({
                  color: "#4143E3",
                  fontWeight: 550,
                  transform:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "scale(1.005)"
                      : "scale(0.9)",
                  borderBottom:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "4px solid #4143E3"
                      : null,
                  borderRadius:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "0 0 8px 8px"
                      : null,
                  fontSize: "25px",
                  marginRight: "20px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                })}
              >
                {menuItem.menuTitle.toLocaleUpperCase()}
              </Button>
            ))}
          </div>
          {anchorEl && (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((menuItem) => (
                <MenuItem
                  key={menuItem.menuTitle}
                  component={NavLink}
                  to={menuItem.pageURL}
                  onClick={handleClose}
                >
                  {menuItem.menuTitle}
                </MenuItem>
              ))}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
