# FlowMagic-MockServer

The mock server is implemented in the node and uses the express module for the Flow Magic application.

## Endpoints
* `GET /applications`: List all the applications of the user
* `GET //applications/{applicationId}/screenFlow`: View Particular application's screen flow
* `PUT //applications/{applicationId}/screenFlow`: Modify the application's existing screen flow
* `POST /user/login`: Enable user to login to the web portal
* `POST /user/logout`: Log out current logged in user session

## Usage
```
npm install 
node server.js
```