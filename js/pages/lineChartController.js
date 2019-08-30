function getLineChart(wordColor,keywords) {
	
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/chemical_material_count.json',
		data : {
			startDate : $('#datepicker_start').val(),
			endDate : $('#datepicker_end').val()
		},
		success : function(response) {
			var dates = [];
			var words = [],final_words = [];
			var results = [];
			var count = 0;
			var themeKeys = [];
			theme.forEach(function(keyword) {
				switch(keyword){
					case '關注化學物質':
						themeKeys.push("毒性");
						themeKeys.push("毒品");
						themeKeys.push("新興");
						themeKeys.push("爆裂物");
						themeKeys.push("IED");
						break;
					case '環境污染':
						 themeKeys.push("重金屬");
						 themeKeys.push("有害");
						 themeKeys.push("排放");
						 themeKeys.push("污染");
						 themeKeys.push("廢水");
						 themeKeys.push("污水");
						 themeKeys.push("洩漏");
						 themeKeys.push("暗管");
						 themeKeys.push("偷排");
						break;
					case '化學安全':
						 themeKeys.push("化工");
						 themeKeys.push("化災");
						 themeKeys.push("化學");
						 themeKeys.push("外洩");
						 themeKeys.push("危害");
						 themeKeys.push("氣爆");
						 themeKeys.push("爆炸");
						 themeKeys.push("安全");
						 themeKeys.push("槽車");
				
					case '食安':
						  themeKeys.push("香料");
						 themeKeys.push("原料");
						 themeKeys.push("致癌");
						 themeKeys.push("添加物");
						 themeKeys.push("黑心");
						 themeKeys.push("色料");
						 themeKeys.push("色素");
						 themeKeys.push("工業用");
						 themeKeys.push("有毒");
						 themeKeys.push("漂白");

						break;
				}
			});
			console.log(themeKeys);
			$.each(response, function(index, value) {

				var nowdate = Number(value.publish_date.replace('-', '')
						.replace('-', ''));
				if(Number(date[0]) <= nowdate
						&& Number(date[1]) >= nowdate){
					dates[count] = value.publish_date;
					count++
				}
				words[index] = value.keyword;
			});	
			words = jQuery.unique(words);
			dates = jQuery.unique(dates);
//			console.log(words);
			var result = {};
			var datasets = [];
			result["labels"] = dates;
			
			words.forEach(function(keyword, i) {
				var data = [];
				var eachData = {};
				boxs.forEach(function(checkKeyword, k) {
					var check = false,checkWord = false;
					if (checkKeyword == keyword && stuff.length>0 && theme.length < 3) {
						//console.log(1);
						dates.forEach(function(date, j) {
							var count = 0 ;		
							$.each(response, function(index, value) {
								var dateArr = date.split('-');
								if (
									value.publish_date == date
											&& value.keyword == keyword && value.keyword && value.title.includes((stuff).toString()) ||
										value.publish_date == date
											&& value.keyword == keyword && value.keyword && value.content.includes((stuff).toString() ) 
								) {
											
											themeKeys.forEach(function(word) {
												if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
													checkWord = true;
												}
											});
											if(checkWord){
												count++;		
												data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),count];
												checkWord = false;
												check = true;
											}
								} else {
									if (parseInt(data[j]) < 1
											|| data[j] == null ) {
										data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),0];
									}

								}
							});
						});
//						console.log(data);
/*						eachData["data"] = data;
						eachData["name"] = keyword,
						eachData["color"] = wordColor[keyword]
//						eachData["markerType"] = "square",
//						eachData["lineTension"] = 0;
//						eachData["backgroundColor"] = 'transparent';
//						eachData["borderColor"] = wordColor[keyword];
//						eachData["borderWidth"] = 2;
						eachData["pointBackgroundColor"] = wordColor[keyword];
						datasets.push(eachData);//*/
					}else if(checkKeyword == keyword && stuff.length > 0 ){
						dates.forEach(function(date, j) {
							var count = 0 ;			
							$.each(response, function(index, value) {
								var dateArr = date.split('-');
								if (value.publish_date == date
										&& value.keyword == keyword && value.keyword && value.title.includes((stuff).toString()) ||
									value.publish_date == date
										&& value.keyword == keyword && value.keyword && value.content.includes((stuff).toString() )  
									) {
										count++;		
										data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),count];
										check = true;
								} else {
									if (parseInt(data[j]) < 1
											|| data[j] == null ) {
										data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),0];
									}

								}
							});
						});
					}else if(checkKeyword == keyword && theme.length < 3){
						//console.log(3);
						dates.forEach(function(date, j) {
							var count = 0 ;	
							$.each(response, function(index, value) {
								var dateArr = date.split('-');
								if (value.publish_date == date
										&& value.keyword == keyword 
									) {
										themeKeys.forEach(function(word) {
											if(value.title.includes((word).toString()) || value.content.includes((word).toString()) && value.count == 1){
												checkWord = true;
											}
										});
										if(checkWord){
											count++;		
											data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),count];
											check = true;
											checkWord = false;
										}
								} else {
									if (parseInt(data[j]) < 1
											|| data[j] == null ) {
										data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),0];
									}

								}
							});
						});
					}else if(checkKeyword == keyword ){
						//console.log(4);
						dates.forEach(function(date, j) {
							var count = 0 ;	
							$.each(response, function(index, value) {
								var dateArr = date.split('-');
								if (value.publish_date == date
										&& value.keyword == keyword && value.count == 1) {
									count++;		
									data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),count];
									check = true;
								} else {
									if (parseInt(data[j]) < 1
											|| data[j] == null ) {
										data[j] = [Date.UTC(dateArr[0],  dateArr[1]-1, dateArr[2]),0];
									}

								}
							});
						});
						
					}
					if(check){
						final_words.push(keyword);
						eachData["data"] = data;
						eachData["name"] = keyword,
						eachData["color"] = wordColor[keyword]
						datasets.push(eachData);
						
					}
				});
				//console.log(datasets);

			});
			var keywords = [];
			var b = [];
			$.each(datasets, function(index, event) {
				if ($.inArray(event.name, keywords) === -1) {
				  keywords.push(event.name);
				  b.push(event);
				}
			});
			
			//result["datasets"] = jQuery.unique(datasets);
			lineChart(b);

		}
	});
}
function lineChart(datasets){
	Highcharts.chart('lineChart', {
    chart: {
        type: 'spline'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        title: {
            text: null
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.y:f} 次'
    },
    plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        },
		series: {
            cursor: 'pointer',
            events: {
                click: function (event) {
					$( "#keyword-filter" ).html("分析條件 : <a style='cursor: pointer;' onclick='refresh();'>左側查詢條件</a> > <a style='cursor: pointer;' onclick='refresh_level2();'>關鍵字「"+this.name+"」</a>");
					$("#wordCloud>svg").remove();
					$("#lineChart>svg").remove();
					$("#elementAlert1>tr").remove();
					$("#elementAlert2>tr").remove();
					boxs = [];
					boxs.push(this.name);
					stuff = [];
					cm = [];
					if($('#stuff-search').val().length>0){
						stuff.push($('#stuff-search').val());
					}
					theme = $('#theme-search').val();
					WorldCloud();
					tableData1();
                }
            }
        }
    },
    series: datasets
	
			
	});
}
