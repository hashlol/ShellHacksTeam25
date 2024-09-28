import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getAllUsers,
  addUser,
  deleteUser,
} from "../../services/dummy-service.jsx";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";

const DummyPage = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [deleteUserName, setDeleteUserName] = useState("");

  const fetchUsers = async () => {
    try {
      const usersList = await getAllUsers();
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUserName) return;
    try {
      await addUser(newUserName);
      fetchUsers();
      setNewUserName("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (name) => {
    try {
      await deleteUser(name);
      fetchUsers();
      setDeleteUserName("");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Typography variant="h3" style={{ fontWeight: "bold" }}>
        DUMMY USERS LIST
      </Typography>
      <List
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0",
          justifyContent: "center",
          border: "3",
        }}
      >
        {users && users.length > 0 ? (
          users.map((user, i) => (
            <ListItem
              style={{
                justifyContent: "center",
                padding: 0,
              }}
              key={i}
            >
              {user}
            </ListItem>
          ))
        ) : (
          <ListItem style={{ justifyContent: "center" }}>
            Nothing to map!
          </ListItem>
        )}
      </List>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Container>
          <TextField
            label="New User Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            fullWidth
            disabled={!newUserName}
          >
            Add User
          </Button>
        </Container>
        <Container>
          <TextField
            label="Delete User Name"
            value={deleteUserName}
            onChange={(e) => setDeleteUserName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDeleteUser(deleteUserName)}
            fullWidth
            disabled={!deleteUserName}
          >
            Delete User
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default DummyPage;
