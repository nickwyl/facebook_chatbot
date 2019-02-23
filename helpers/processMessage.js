const lookingForward = require("../helpers/lookingForward");

const API_AI_TOKEN = /*YOU SHALL NOT SEE*/;
const apiAiClient = require("apiai")(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = /*YOU SHALL NOT SEE*/;

//importing value of request from messageWebhook which called processMessage(request)
const request = require("request");


global.waitForMessage = (senderId) => {
	request({
		url: "https://graph.facebook.com/v3.2/me/messages",
		qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		method: "POST",
		json: {
			"recipient": { "id": senderId },
			"sender_action": "typing_on" 
		}
	});
}


global.sendTextMessage = (senderId, text) => {
	request({
		 url: "https://graph.facebook.com/v3.2/me/messages",
		 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		 method: "POST",
		 json: {
			 "recipient": { "id": senderId },
			 "message": { text },
		 }
	 });
};


module.exports = (event) => {
	const senderId = event.sender.id;
	const messageId = event.message.mid;
	//export senderID
	senderId.exports;

	const message = event.message.text;
	const apiaiSession = apiAiClient.textRequest(message, {sessionId: "philosopher_bot"});

	apiaiSession.on("response", (response) => {
 		const result = response.result.fulfillment.speech;
 		//export result
 		result.exports;

		sendTextMessage(senderId, result);
		lookingForward(senderId, result);

 	});
	apiaiSession.on("error", error => console.log(error));
	apiaiSession.end();
};

