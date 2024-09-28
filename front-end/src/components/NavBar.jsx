import React, { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles"; // Styles are in @mui/styles now
import AppBar from "@mui/material/AppBar"; // Material UI core components are in @mui/material
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"; // Icons are in @mui/icons-material
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery"; // useMediaQuery remains in @mui/material
import "./components.css";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  headerOptions: {
    display: "flex",
    justifyContent: "flex-end",
    transform: "scale(0.8) translateX(10%)",
  },
}));

/**
 * NavBar component renders a responsive navigation bar with menu items.
 *
 * @component NavBar
 */
const NavBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { menuTitle: "Home", pageURL: "/Home" },
    { menuTitle: "About", pageURL: "/Home" },
    { menuTitle: "Contact", pageURL: "/Contact" },
  ];

  return (
    <div style={{ width: "100%" }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "black", width: "100%" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div className="navTitle">
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            ></Link>
            <div style={{ textDecoration: "none", marginLeft: "10px" }}></div>
          </div>
          {isMobile ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div className={classes.headerOptions}>
              {menuItems.map((menuItem) => (
                <Button
                  key={menuItem.menuTitle}
                  component={NavLink}
                  to={menuItem.pageURL}
                  style={({ isActive }) => ({
                    backgroundColor:
                      isActive ||
                      (menuItem.menuTitle === "Home" &&
                        location.pathname === "/")
                        ? "#86BC25"
                        : "black",
                    borderRadius: 50,
                    border: 10,
                    color: "white",
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
          )}
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
