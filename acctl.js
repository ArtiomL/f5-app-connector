/*	
	acctl - F5 Application Connector Control
	https://github.com/ArtiomL/f5-app-connector
	Artiom Lichtenstein
	v1.5, 14/04/2017
*/

'use strict';

// Import the Node.js modules
var funHTTP = require('request');

// Command line arguments
var objArgs = process.argv.slice(2);
var strACUser = objArgs[1];
var strACPass = objArgs[2];

function funREST(strEndPoint, objRBody) {
	// API call options
	return {
		method: 'POST',
		url: 'https://127.0.0.1:8090/proxy/v1/' + strEndPoint,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache'
		},
		auth: {
			user: strACUser,
			password: strACPass
		},
		body: objRBody,
		json: true,
		rejectUnauthorized: false
	};
}

var objBody = {};

switch (objArgs[0]) {
	case 'connections': objBody = {
			name: 'BIG-IP',
			ip: objArgs[3],
			port: Number(objArgs[4])
		}
	break;
	case 'nodes': objBody = {
			name: objArgs[3],
			ip: objArgs[4],
			port: Number(objArgs[5]),
			id: objArgs[6],
			vpc: objArgs[7],
			status: 'online'
		}
	break;
}

funHTTP(funREST(objArgs[0], objBody), function (objError, objHResp, strHBody) {
	if (objError) console.log(JSON.stringify(objError));
});
