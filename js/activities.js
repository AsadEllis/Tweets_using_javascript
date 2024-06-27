function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	const tempotions = { weekday: 'long'};
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let dict = new Object();
	var grapharray2 = [];
	var firsthighest = 0;
	var secondhighest = 0;
	var thirdhighest = 0;
	var firsthighest2 = 0;
	var secondhighest2 = 0;
	var thirdhighest2 = 0;
	var firsthighestactivity = 0;
	var secondhighestactivity = 0;
	var thirdhighestactivity = 0;
	var firsthighestactivity2 = 0;
	var secondhighestactivity2 = 0;
	var thirdhighestactivity2 = 0;
	const arrayed=['running','walking','biking','hiking','skiing','yoga','workout','activity','swimming','chair ridding']; //each of the activities into a list
	dict['running'] = { count: 0, total_distance: 0 };
	dict['walking'] = { count: 0, total_distance: 0 }; // A place to store the distance and count of each activity
	dict['biking'] = { count: 0, total_distance: 0 };
	dict['hiking'] = { count: 0, total_distance: 0 };
	dict['skiing'] = { count: 0, total_distance: 0 };
	dict['yoga'] = { count: 0, total_distance: 0 };
	dict['workout'] = { count: 0, total_distance: 0};
	dict['activity'] = { count: 0, total_distance: 0};
	dict['swimming'] = { count: 0, total_distance: 0};
	dict['chair ridding'] = { count: 0, total_distance: 0};
	for(var i =0; i<tweet_array.length;i++){
		if(tweet_array[i].activityType=="running"){ 
			dict['running'].count+=1;
			dict['running'].total_distance+=tweet_array[i].distance;
		}
		else if(tweet_array[i].activityType=="walking"){ 
			dict['walking'].count+=1;
			dict['walking'].total_distance+=tweet_array[i].distance; //gets the distance and count for each activity
		}
		else if(tweet_array[i].activityType=="biking"){ 
			dict['biking'].count+=1;
			dict['biking'].total_distance+=tweet_array[i].distance;
		}
		else if(tweet_array[i].activityType=="hiking"){ 
			dict['hiking'].count+=1;
			dict['hiking'].total_distance+=tweet_array[i].distance;
		}
		else if(tweet_array[i].activityType=="skiing"){ 
			dict['skiing'].count+=1;
			dict['skiing'].total_distance+=tweet_array[i].distance;
		}
		else if(tweet_array[i].activityType=="yoga"){ 
			dict['yoga'].count+=1;
		} 
		else if(tweet_array[i].activityType=="workout"){
			dict['workout'].count+=1;
		}
		else if(tweet_array[i].activityType=="activity"){
			dict['activity'].count+=1;
		}
		else if(tweet_array[i].activityType=="swimming"){ 
			dict['swimming'].count+=1;
			dict['swimming'].total_distance+=tweet_array[i].distance;
		}
		else if(tweet_array[i].activityType=="chair ridding"){ 
			dict['chair ridding'].count+=1;
			dict['chair ridding'].total_distance+=tweet_array[i].distance;
		}
	}
	
	for(var i =0; i<arrayed.length;i++){
		if(dict[arrayed[i]].count>firsthighest){ //sorting to see which activity has the highest count
			thirdhighest = secondhighest;
			secondhighest = firsthighest;
			thirdhighestactivity = secondhighestactivity;
			secondhighestactivity = firsthighestactivity;
			firsthighest = dict[arrayed[i]].count;
			firsthighestactivity = arrayed[i];
		}
		else if(dict[arrayed[i]].count>secondhighest){
			thirdhighest = secondhighest;
			thirdhighestactivity = secondhighestactivity;
			secondhighest = dict[arrayed[i]].count;
			secondhighestactivity = arrayed[i];
		}
		else if(dict[arrayed[i]].count>thirdhighest){
			thirdhighest = dict[arrayed[i]].count;
			thirdhighestactivity = arrayed[i];
		}
	}
	for(var i =0; i<arrayed.length;i++){ //sorting to see which activity has the highest distance
		if(dict[arrayed[i]].total_distance>firsthighest2){
			thirdhighest2 = secondhighest2;
			secondhighest2 = firsthighest2;
			thirdhighestactivity2 = secondhighestactivity2;
			secondhighestactivity2 = firsthighestactivity2;
			firsthighest2 = dict[arrayed[i]].total_distance;
			firsthighestactivity2 = arrayed[i];
		}
		else if(dict[arrayed[i]].total_distance>secondhighest2){
			thirdhighest2 = secondhighest2;
			thirdhighestactivity2 = secondhighestactivity2;
			secondhighest2 = dict[arrayed[i]].total_distance;
			secondhighestactivity2 = arrayed[i];
		}
		else if(dict[arrayed[i]].total_distance>thirdhighest2){
			thirdhighest2 = dict[arrayed[i]].total_distance;
			thirdhighestactivity = arrayed[i];
		}
	}
	var x = 0;
	var y = 0;
	for(var i =0; i<arrayed.length;i++){ //creates the array to use for the visualization
		x= {"activity": arrayed[i]};
		y= {"count":dict[arrayed[i]].count};
		grapharray2.push(Object.assign({},x,y));
	}
	document.getElementById('numberActivities').innerText = Object.keys(dict).length;
	document.getElementById('firstMost').innerText = firsthighestactivity;
	document.getElementById('secondMost').innerText = secondhighestactivity;
	document.getElementById('thirdMost').innerText = thirdhighestactivity;
	document.getElementById('longestActivityType').innerText = firsthighestactivity2;
	document.getElementById('shortestActivityType').innerText = thirdhighestactivity2;
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": grapharray2
	  },
	  //TODO: Add mark and encoding
	  mark: "point",
	  encoding: {
		x: {"field": "activity", "type": "nominal"},
		y: {"field": "count", "type": "quantitative"},
		"color": {"field": "activity", "type": "nominal"}
	  }
	}
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	grapharray2 = [];
	for(var i =0; i<tweet_array.length;i++){
		if(tweet_array[i].activityType==firsthighestactivity||tweet_array[i].activityType==secondhighestactivity||tweet_array[i].activityType==thirdhighestactivity){
			x= {"time":tweet_array[i].time.toLocaleDateString(undefined,tempotions)};
			y={"distance":tweet_array[i].distance};
			z={"activity":tweet_array[i].activityType};
			grapharray2.push(Object.assign({},x,y,z));
		}
	}
	activity1_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for all of the three most tweeted-about activities.",
		"data": {
		  "values": grapharray2
		},
		//TODO: Add mark and encoding
		mark: "point",
		encoding: {
			x: {"field": "time", "type": "ordinal", "sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]},
			y: {"field": "distance", "type": "quantitative"},
		  	"color": {"field": "activity", "type": "nominal"}
		}
	}
	vegaEmbed('#distanceVis', activity1_vis_spec, {actions:false});
	
	activity2_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the mean distances by day of the week for all of the three most tweeted-about activities.",
		"data": {
		  "values": grapharray2
		},
		//TODO: Add mark and encoding
		mark: "point",
		encoding: {
			x: {"field": "time", "type": "ordinal", "sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]},
			y: {"aggregate":"mean","field": "distance", "type": "quantitative"},
		  	"color": {"field": "activity", "type": "nominal"}
		}
	}
	document.getElementById('weekdayOrWeekendLonger').innerText = "weekends";
	document.getElementById("aggregate").innerText = "Show mean";
	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
	document.getElementById("distanceVisAggregated").innerText ="";
	document.getElementById("aggregate").onclick = myFunction;
	function myFunction(){
		document.getElementById("distanceVis").innerText ="";
		vegaEmbed('#distanceVisAggregated', activity2_vis_spec, {actions:false});
		document.getElementById("aggregate").innerText = "Show all activity";
		document.getElementById("aggregate").onclick = myFunction2;
		
	function myFunction2(){
		document.getElementById("distanceVisAggregated").innerText ="";
		vegaEmbed('#distanceVis', activity1_vis_spec, {actions:false});
		document.getElementById("aggregate").innerText = "Show mean";
		document.getElementById("aggregate").onclick = myFunction;
	}
	}
});