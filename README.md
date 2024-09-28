# HOW-TO-SETUP-GUIDE

## TWO PARTS

- **REACT APPLICATION**
- **FLASK APPLICATION**

## React application

### Installation

- **GET INTO THE RIGHT DIRECTORY** Change directories into ./front-end
- **INSTALL DEPENDENCIES** run "npm install -f"

### Running local environment

- To have local dev server, run **npm run dev**

# =======================

## Flask Application

### Project Description

This is a dummy project that provides various endpoints to manage users. The application supports adding, retrieving, and deleting users using HTTP methods like `POST`, `GET`, and `DELETE`.

### Features

- **Add Users**: Add a new user via a `POST` request. ENDPOINT:`/api/addUser`
- **Get Users**: Retrieve all users via a `GET` request. ENDPOINT:`/api/getAllUsers`
- **Delete Users**: Delete a user by their name via a `DELETE` request. ENDPOINT:`/api/deleteUser/`

### Installation

- **GET INTO THE RIGHT DIRECTORY** Change directories into ./server
- **CREATE A VENV** _MAC_ python3 -m venv .venv | _WINDOWS_ python -m venv .venv
- **ACTIVATE THE VENV** _MAC_ source .venv/bin/activate | _WINDOWS_ .venv\Scripts\activate
- **INSTALL REQUIREMENTS FOR VENV** _MAC_ pip install -r requirements.txt | _WINDOWS_ pip install -r requirements.txt

#### Prerequisites

Make sure you have the following installed:

- Python 3.x
- Flask (`pip install flask`)

#### Setup
