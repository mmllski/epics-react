![Screenshot](media/window.gif?raw=true)
EPICS web client made with React and Node.js. Node.js uses node-epics module to communicate with CA.
Data is pushed to webpage via socket.io. Rendered by React.js

Project contains webpack-dev-server to obtain hot-reload feature.

 ---

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.

## Usage

Before run check if path to libca is exported properly (required by node-epics).
After installation you can run `npm run dev` to start node and webpack servers.
You can test a fully working live demo at http://localhost:8080
