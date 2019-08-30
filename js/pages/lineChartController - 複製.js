function getLineChart(wordColor) {

	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/lineChart_data.json',
		data : {
			startDate : $('#datepicker_start').val(),
			endDate : $('#datepicker_end').val()
		},
		success : function(response) {

			var dates = [];
			var words = [];
			var results = [];
			var count = 0;
			$.each(response, function(index, value) {

				var nowdate = Number(value.date.replace('-', '')
						.replace('-', ''));
				if(Number(date[0]) <= nowdate
						&& Number(date[1]) >= nowdate){
					dates[count] = value.date.substring(5);
					count++
				}
				words[index] = value.keyword;
			});
			words = jQuery.unique(words);
			dates = jQuery.unique(dates);
			var result = {};
			var datasets = [];
			result["labels"] = dates;

			words.forEach(function(keyword, i) {
				var data = [];
				var eachData = {};
				boxs.forEach(function(checkKeyword, k) {
					if (checkKeyword == keyword) {
						dates.forEach(function(date, j) {
							
							$.each(response, function(index, value) {

								if (value.date.substring(5) == date
										&& value.keyword == keyword ) {
									data[j] = parseInt(value.count);
								} else {
									if (parseInt(data[j]) < 1
											|| data[j] == null ) {
										data[j] = '0';
									}

								}
							});
						});
						eachData["data"] = data;
						eachData["name"] = "Total Visit",
								eachData["markerType"] = "square",
								eachData["lineTension"] = 0;
						eachData["backgroundColor"] = 'transparent';
						eachData["borderColor"] = wordColor[keyword];
						eachData["borderWidth"] = 2;
						eachData["pointBackgroundColor"] = wordColor[keyword];
						datasets.push(eachData);
					}
				});

				// alert(data);

			});
			result["datasets"] = datasets;
			lineChart(result);

		}
	});
}
function lineChart(result) {
	$('#lineChart').remove(); // this is my <canvas> element
	$('#linechartDIV').append('<canvas id="lineChart"><canvas>');
	var ctx = document.getElementById("lineChart");
	var myChart = new Chart(ctx, {
		animationEnabled : true,
		type : 'line',
		data : result,
		options : {
			scales : {
				yAxes : [ {
					ticks : {
						beginAtZero : false
					}
				} ]
			},
			legend : {
				display : false,
			}
		}
	});
}
