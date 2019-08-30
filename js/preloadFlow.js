/*
	js/preloadFlow.js

	immediateFlow.html的側選欄的預載
*/
$(document).ready(function() {
	$.ajax({
		type : "GET",
		dataType : "json",
		async : false,
		url : 'json/manufacturer_flow.json',
		success : function(response) {
			// substance
			var substanceArr = [];
			$.each(response, function(index, value) {
				substanceArr.push({substance:value.substance});
			});
			var substanceUnique = removeDuplicates(substanceArr, "substance");
			var substanceStr = "";
			$.each(substanceUnique, function(index, value) {
				substanceStr += '<option value="'+value.substance+'" selected>'+value.substance+"</option>";
			});

			$("#substance-search").html(substanceStr);
		}
	});
});
