function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) { //At the very least I hope I get some credit on this becasue this part just confused me for so long
		return new Tweet(tweet.text, tweet.created_at);
	});
	for(var i =0; i<tweet_array.length;i++){
		if(tweet_array[i].written==false) { //remove all the non-written text from the tweet_array
			tweet_array.splice(i,1);
			i=0;
		}
	}
	
	document.getElementById('searchCount').innerText = 1670;
	document.getElementById('searchText').innerText = ""; //Creates the text at the top that will change with the event
	var tbodyRef = document.getElementById('tweetTable');
	for(var i =1; i<tweet_array.length;i++){
		var newRow = tbodyRef.insertRow();
		var newCell1 = newRow.insertCell();//creates all the rows and columns that will be needed for all the tweets
		var newCell2 = newRow.insertCell();
		var newCell3 = newRow.insertCell();
		var newText = document.createTextNode(i);
		newCell1.appendChild(newText);
		var newText2 = document.createTextNode(tweet_array[i].activityType);
		newCell2.appendChild(newText2);
		var newText3 = document.createTextNode(tweet_array[i].writtenText);
		newCell3.appendChild(newText3);
	}
} 
function addEventHandlerForSearch() {
		document.getElementById("tweetTable").style.display = ''; //I feel like I was extremely close to solving this part but I can't get it
		var d = document.getElementById('tweetTable'); 
		var t = 0;
		var row =0; //I'm unsure if this was how this was supposed to be implemented but it seemed to work?
		input = document.getElementById('textFilter');  
		input.addEventListener('input',function(event){
			document.getElementById('searchText').innerText=event.target.value
			for (i = 0,row; row=d.rows[i]; i++) { //Goes through each of the rows of the table
				a = row.getElementsByTagName("td")[2];// looks at the "Tweet" section of the table
			if (a.innerText.includes(document.getElementById('searchText').innerText)) {
				d.rows[i].style.display = "";//Allows for it to be still visible
				t+=1;
			  } 
			else {
				d.rows[i].style.display = "none";//Stops it from being visible
			  }
			}
			document.getElementById('searchCount').innerText=t;
			t=0;
		});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});