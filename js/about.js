const tempotions = { day:'numeric'};
const options = { weekday: 'long',month: 'long', day: 'numeric', year: 'numeric' };
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	var temp1 = 0;
	var temp2 = 0;
	var temp3 = 0;
	var temp4 = 0;
	var temp5 = 0;
	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length-1].time.toLocaleDateString(undefined,options);
	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString(undefined,options);
	w = document.getElementsByClassName('completedEvents');
	x = document.getElementsByClassName('liveEvents'); //all normal variables are the actual number containers
	y = document.getElementsByClassName('achievements'); // all 1's are the percentage containers
	z = document.getElementsByClassName('miscellaneous');
	w1 = document.getElementsByClassName('completedEventsPct');
	x1 = document.getElementsByClassName('liveEventsPct');
	y1 = document.getElementsByClassName('achievementsPct');
	z1 = document.getElementsByClassName('miscellaneousPct');
	a = document.getElementsByClassName('written');
	a1= document.getElementsByClassName('writtenPct');
	for(var i =0; i<tweet_array.length;i++){
		if(tweet_array[i].source =="completed_event"){
			temp1+=1;
		}
		if(tweet_array[i].source =="live_event"){ //This loop gets the actual number of each of the 4 types of events
			temp2+=1;
		}
		if(tweet_array[i].source =="achievement"){
			temp3+=1;
		}
		if(tweet_array[i].source =="miscellaneous"){
			temp4+=1;
		}
		if(tweet_array[i].written == true){
			temp5+=1;
		}
	}
		w[0].innerText=temp1; //creates the percentages and stores everything into the correct containers
		w1[0].innerText=math.format(100*(temp1/tweet_array.length), {notation: 'fixed', precision: 2})+"%";
		x[0].innerText=temp2;
		x1[0].innerText=math.format(100*(temp2/tweet_array.length), {notation: 'fixed', precision: 2})+"%";
		y[0].innerText=temp3;
		y1[0].innerText=math.format(100*(temp3/tweet_array.length), {notation: 'fixed', precision: 2})+"%";
		z[0].innerText=temp4;
		z1[0].innerText=math.format(100*(temp4/tweet_array.length), {notation: 'fixed', precision: 2})+"%";
		a[0].innerText=temp5;
		a1[0].innerText=math.format(100*(temp5/tweet_array.length), {notation: 'fixed', precision: 2})+"%";
}
//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});