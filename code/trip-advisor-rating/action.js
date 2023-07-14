console.log('Trip Advisor Rating extension - action.js');

function doEvaluateRating() {
	
	const numOfRatingTypes = 5;
	const numOfPositiveRatingTypes = 2;

	console.log('action.js - doEvaluateRating() called');
	var divReviews = document.getElementById('REVIEWS');
	if (!divReviews) {
		alert("Could not found the the reviews on this page");
		return;
	}
	console.log('action.js - reviews element found');
	divReviews.scrollIntoView();
	var listOfRatingTypes = document.querySelectorAll('section#REVIEWS div.IMmqe div.biGQs._P.pZUbB.osNWb')
	if (listOfRatingTypes.length <= 0) {
		alert("Could not evaluate the reviews (List of rating types not found)");
		return;
	}
	if (listOfRatingTypes.length != numOfRatingTypes) {
		alert("Could not evaluate the reviews (List of ratings does no contain 5 elements)");
		return;
	}
	console.log('action.js - list of ratings has 5 elements');
	
	var countPositive = 0.0;
	var countAll = 0.0;
	for (var i = 0; i < numOfRatingTypes; i++) {
		var text = listOfRatingTypes[i].innerHTML;
		text = text.replace(',', '');
		text = text.replace('.', '');
		var count = parseFloat(text);
		if (i < numOfPositiveRatingTypes) {
			countPositive += count;
		}
		countAll += count;		
	}
	var percentage = countPositive / countAll * 100.0;
	var message = `Sum of ratings is: ${countAll}\nSum of positive ratings is: ${countPositive}\nPercentage of positive ratings is: ${percentage.toFixed(2)} %`;
	alert(message);
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: doEvaluateRating
	});
});