module.exports = (req, res) => {
 	const hubChallenge = req.query["hub.challenge"];


	const hubMode = req.query["hub.mode"];
	const verifyTokenMatches = (req.query["hub.verify_token"] === /*YOU SHALL NOT SEE*/);


	if (hubMode && verifyTokenMatches) {
		res.status(200).send(hubChallenge);
	} else {
		res.status(403).end();
	}
};

//verifying tokens to make sure you're accessing the correct bot
