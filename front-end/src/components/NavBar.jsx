import React, { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';  
import "./components.css";

/**
 * NavBar component renders a responsive navigation bar with menu items.
 *
 * @component NavBar
 */
const NavBar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const { isAuthenticated, logout } = useAuth0(); // Destructure isAuthenticated and logout from Auth0

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // Use Auth0 logout function
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
            <img
              src="/public/logo.png"
              style={{ maxHeight: 60, maxWidth: 60 }}
              alt="Logo"
            />
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "#4143E3",
                fontSize: "30px",
                fontWeight: "BOLD",
              }}
            >
              BENKYO
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
                  color:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "#FE7163"
                      : "#4143E3",
                  fontWeight:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? 600
                      : 500,
                  transform:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "scale(1.005)"
                      : "scale(0.9)",
                  borderBottom:
                    isActive ||
                    (menuItem.menuTitle === "Home" && location.pathname === "/")
                      ? "4px solid #FE7163"
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
            {isAuthenticated && (
            <Button
              onClick={handleLogout}
            >
              <LogoutIcon sx={{color:"#4143E3"}}/>
            </Button>
          )}
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
