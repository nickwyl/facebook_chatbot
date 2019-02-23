const processMessage = require("../helpers/processMessage");
const request = require("request");




const FACEBOOK_ACCESS_TOKEN = /*YOU SHALL NOT SEE*/;



module.exports = (req, res) => {
	if (req.body.object === "page") {
		req.body.entry.forEach(entry => {
			entry.messaging.forEach(event => {
				if (event.message && event.message.text) {

					waitForMessage(event.sender.id);
 					processMessage(event);
 					
 				}

 			});
 		});

		res.status(200).end();
 	}
};
