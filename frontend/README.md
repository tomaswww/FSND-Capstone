# Coffee Shop Frontend

## Overview

The Frontend of this project is build using [React](https://reactjs.org/) and uses [JQuery](https://jquery.com/) as well as [Bootstrap](https://getbootstrap.com/) and [axios](https://github.com/axios/axios)


## Installing Dependencies

#### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `frontend` directory of this repository. After cloning, open your terminal and run:


```bash
npm install
npm install react-router-dom @auth0/auth0-spa-js
```


>_tip_: **npm i** is shorthand for **npm install**

#### Initializing React APP

From the terminal, inside the frontend folder run:

```bash
npm init react-app casting

```

```bash
npm start
```

If any doubts about react, please check [`./casting/`](./casting/README.md) readme.

### Authentication

The authentication system used for this project is Auth0. `auth_config.json` contains the logic to direct a user to the Auth0 login page, managing the JWT token upon successful callback, and handle setting and retrieving the token from the local store. 

### Authorization

The Auth0 JWT includes claims for permissions based on the user's role within the Auth0 system. This project makes use of these claims using the `auth.can(permission)` method which checks if particular permissions exist within the JWT permissions claim of the currently logged in user.