var wordColor = {};
var words = [];
function WorldCloud() {
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/chemical_material.json',
		data : {
			startDate : $('#datepicker_start').val(),
			endDate : $('#datepicker_end').val()
		},
		success : function(response) {
			var words = [];
			var beforekw = '';
			var i = 0;
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
			if(stuff.length>0 && theme.length < 3){
				$.each(response, function(index, value) {
					var nowdate = Number(value.publish_date.replace('-', '')
							.replace('-', ''));
					var check = false;
					if ( beforekw == value.keyword && Number(date[0]) <= nowdate
							&& Number(date[1]) >= nowdate && value.content.includes((stuff).toString())||beforekw == value.keyword && Number(date[0]) <= nowdate
							&& Number(date[1]) >= nowdate && value.title.includes((stuff).toString()) ) {
							themeKeys.forEach(function(word) {
								if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
									check = true;
								}
						});
						if(check){
							words[i] = value.keyword;
							beforekw = value.keyword;
							i++;
							check = false;
						}
					} else {
						boxs.forEach(function(keyword) {
							check = false;
							if (keyword == value.keyword
									&& Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate  ) {
								themeKeys.forEach(function(word) {
									if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
										stuff.forEach(function(word) {
										if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
												check = true;
											}
										});
									}
								});
								if(check){
									words[i] = value.keyword;
									beforekw = value.keyword;
									i++;
									check = false;
								}		
							} else {
								beforekw = '';
							}
						});
					}
				});
			}else if(stuff.length>0){
								$.each(response, function(index, value) {
					var nowdate = Number(value.publish_date.replace('-', '')
							.replace('-', ''));
					var check = false;
					if ( beforekw == value.keyword && Number(date[0]) <= nowdate
							&& Number(date[1]) >= nowdate ) {
							stuff.forEach(function(word) {
							if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
									check = true;
								}
							});
							if(check){
								words[i] = value.keyword;
								beforekw = value.keyword;
								i++;
								check = false;
							}
					} else {
						boxs.forEach(function(keyword) {
							check = false;
							if (keyword == value.keyword
									&& Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate  && value.content.includes((stuff).toString())||keyword == value.keyword
									&& Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate  && value.title.includes((stuff).toString())) {
									words[i] = value.keyword;
									beforekw = value.keyword;
									i++;
							} else {
								beforekw = '';
							}
						});
					}
				});
			}else if(theme.length < 3){
				$.each(response, function(index, value) {
					var nowdate = Number(value.publish_date.replace('-', '')
							.replace('-', ''));
					var check = false;
					if ( beforekw == value.keyword && Number(date[0]) <= nowdate
							&& Number(date[1]) >= nowdate ) {
						themeKeys.forEach(function(word) {
							if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
								check = true;
							}
						});
						if(check){
							words[i] = value.keyword;
							beforekw = value.keyword;
							i++;
							check = false;
						}
					} else {
						boxs.forEach(function(keyword) {
							check = false;
							if (keyword == value.keyword
									&& Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate  ) {
								themeKeys.forEach(function(word) {
									if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
										check = true;
									}
								});
								if(check){
									words[i] = value.keyword;
									beforekw = value.keyword;
									i++;
									check = false;
								}		
							} else {
								beforekw = '';
							}
						});
					}
				});
			}else{
				$.each(response, function(index, value) {
					var nowdate = Number(value.publish_date.replace('-', '')
							.replace('-', ''));

					if (beforekw == value.keyword && Number(date[0]) <= nowdate
							&& Number(date[1]) >= nowdate) {
						words[i] = value.keyword;
						beforekw = value.keyword;
						i++;
					} else {
						boxs.forEach(function(keyword) {
							if (keyword == value.keyword
									&& Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate ) {
								words[i] = value.keyword;
								beforekw = value.keyword;
								i++;
							} else {
								beforekw = '';
							}
						});
					}
				});
			}
			
			var initial = 'all';
			drawWordCloud(words);
		}
	});
}

function drawWordCloud(words) {
	console.log(words);
	var word_count = {};
	if (words.length == 1) {
		word_count[words[0]] = 1;
	} else {
		words.forEach(function(word) {
			// if (word != "" && common.indexOf(word)==-1 && word.length>1){
			if (word != "" && word.length > 1) {
				if (word_count[word]) {
					word_count[word]++;
				} else {
					word_count[word] = 1;
				}
			}
		})
	}
	console.log(word_count);
	// alert(word_count["工業用"]);
	var svg_location = "#wordCloud";
	var width = $("#wordCloud").width();
	var height = 340;

	var fill = d3.scale.category20();

	var word_entries = d3.entries(word_count);
	var xScale = d3.scale.linear().domain(
			[ 0, d3.max(word_entries, function(d) {
				return d.value;
			}) ]).range([ 20, 80 ]);

	d3.layout.cloud().size([ width, height ]).timeInterval(20).words(
			word_entries).fontSize(function(d) {
		return xScale(+d.value);
	}).text(function(d) {
		return d.key;
	}).rotate(function() {
		return ~~(Math.random() * 2) * 90;
	}).font("Impact").on("end", draw).start();

	function draw(words) {
		var div = d3.select("body").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", 0);
		d3.select(svg_location).append("svg")
		.attr("width", width).attr(
				"height", height).append("g").attr("id", 'wordCloudsvg').attr("transform",
				"translate(" + [ width >> 1, height >> 1 ] + ")").selectAll(
				"text").data(words).enter().append("text").style("font-size",
				function(d) {
					return xScale(d.value) + "px";
				})
				.style("font-family", "Microsoft JhengHei")
                .style("cursor", 'pointer')
                .style("fill", function(d, i) {
			// set Color
			wordColor[d.key] = fill(i);
			return fill(i);
		}).attr("text-anchor", "middle").attr("transform", function(d) {
			return "translate(" + [ d.x, d.y ] + ")rotate(" + d.rotate + ")";
		}).text(function(d) {
			return d.key;
		}).on("mouseover", function(d) {		
            div.transition()		
            .duration(200)		
            .style("opacity", .9);		
            div.html(d.key+':'+d.value)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        }).on("mousemove",function(d) {
        	div.transition()		
            .duration(200)		
            .style("opacity", .9);		
            div.html(d.key+':'+d.value)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })			
        .on("mouseout", function(d) {		
        	div.transition()		
            .duration(500)		
            .style("opacity", 0);	
        }).on("click", function(d) {
			$( "#keyword-filter" ).html("分析條件 : <a style='cursor: pointer;' onclick='refresh();'>左側查詢條件</a> > <a style='cursor: pointer;' onclick='refresh_level2('"+d.key+"');'>關鍵字「"+d.key+"」</a>");
			div.remove();
			$("#wordCloud>svg").remove();
			$("#elementAlert1>tr").remove();
			$("#elementAlert2>tr").remove();
			boxs = [];
			boxs.push(d.key);
			stuff = [];
			cm = [];
			if($('#stuff-search').val().length>0){
				stuff.push($('#stuff-search').val());
			}
			theme = $('#theme-search').val();
			WorldCloud();
			tableData1();
        });
// .on('mouseout', handleMouseOut);
		getLineChart(wordColor,words);
	}
	function handleMouseOver(d) {
		var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
// var group = d3.select('#wordCloudsvg').append('text').attr('id',
// 'story-titles').attr('transform','translate('+(parseInt(d.x)+parseInt('10'))+','+(parseInt(d.y)+parseInt('10'))
// +')');
		var base = d.y - d.size;
// group.text(d.value);
		
	}

	function handleMouseOut(d) {
		d3.select('#story-titles').remove();
	}
	d3.layout.cloud().stop();
}	
