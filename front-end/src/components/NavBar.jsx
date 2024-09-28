import React, { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar"; // Material UI core components are in @mui/material
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"; // Icons are in @mui/icons-material
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery"; // useMediaQuery remains in @mui/material
import { useTheme } from "@mui/styles"; // useTheme remains from MUI
import "./components.css";

/**
 * NavBar component renders a responsive navigation bar with menu items.
 *
 * @component NavBar
 */
const NavBar = () => {
  const location = useLocation();
  const theme = useTheme();
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
        style={{ backgroundColor: "white", width: "100%", boxShadow: 0 }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div className="navTitle">
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            ></Link>
            <div style={{ textDecoration: "none", marginLeft: "10px" }}></div>
          </div>
          <div className="headerOptions">
            {menuItems.map((menuItem) => (
              <Button
                key={menuItem.menuTitle}
                component={NavLink}
                to={menuItem.pageURL}
                style={({ isActive }) => ({
                  backgroundColor:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "#91C8E4"
                      : "#F6F4EB",
                  borderRadius: 50,
                  border: 10,
                  color:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "#F6F4EB"
                      : "#91C8E4",
                  outline: "1px",
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
