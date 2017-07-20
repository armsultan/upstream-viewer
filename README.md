# Upstream-manager

This App is a [Helio Training](https://heliotraining.com/) "Full-Stack" project using NodeJS, React, Redux, MongoDB and more.

This App is Proof Of Concept to graph upstream data pulled from NGINX Pkus's Live activity monitoring. See An example of [NGINX Plus live activity monitoring.](http://demo.nginx.com/status.html) and  [JSON output](http://demo.nginx.com/status) for the same information.

![Screenshot](https://raw.githubusercontent.com/armsultan/upstream-manager/master/public/images/screenshot.png)

## Installation
First run the following command to install the required dependencies

    npm install

## Run Application

Create three terminals and run:

1. Make sure mongodb is running:

	`sudo mongod`

2. In another terminal, to get Webpack listening to your changes, run:

    `npm run build`

3. And lastly, start the package:

	`HOST=localhost PORT=3000 DB=localhost/upstream_manager npm start`

note: if you uncomment the line `import env from './env';` in `server/server.js` node will use the environemental varibles in `server/env.js` and you can start the package by simply running `npm start`

## Run Unit Tests:

	npm test

## End to End tests here:

	[upstreamviewer-e2e-test](https://github.com/armsultan/upstreamviewer-e2e-test)