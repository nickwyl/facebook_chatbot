module.exports = (senderId, result) => {


	const sqlite3 = require("sqlite3").verbose();
	 
	// open database in memory
	let db = new sqlite3.Database("ExtraQuotes.db", (err) => {		
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log("Connected to the ExtraQuotes.db database.");
	});


	db.serialize(() => {
	  	db.each("SELECT * FROM quotes WHERE quote=?", result,
	           	(err, row) => {
		    if (err) {
		       console.error(err.message);
		    }

		    var quoteKey = row.key;
		    var lengthSum = 0;

		    var i;
		    for(i=1; i<row.moreQuote; i++) {
		    	quoteKey=quoteKey+1;
		    	db.get("SELECT * FROM quotes WHERE key=?", quoteKey, (err,row1) => {

			    	lengthSum+=row1.quote.length;

			    	(function() {
					setTimeout(waitForMessage, lengthSum*30, senderId); 
				})();
				setTimeout(sendTextMessage, lengthSum*50, senderId, row1.quote);
		    	});
		    }
	  	});
	});

};

