var wordColor = {};
var words = [];
function WorldCloud() {
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/chemical_material.json',
		success : function(response) {
			var words = [];
			var beforekw = '';
			var i = 0;
			var themeKeys = [];
				$.each(response, function(index, value) {
					
							words[value.keyword] = value.value;
							
						});
					
			
			var initial = 'all';
			drawWordCloud(words);
		}
	});
}

function drawWordCloud(words) {
	
	// alert(word_count["工業用"]);
	var svg_location = "#wordCloud";
	var width = $("#wordCloud").width();
	var height = 340;

	var fill = d3.scale.category20();

	var word_entries = d3.entries(words);
	console.log(word_entries);
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
			
        });
// .on('mouseout', handleMouseOut);
		
	}
	function handleMouseOver(d) {
		var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
		var base = d.y - d.size;
		
	}

	function handleMouseOut(d) {
		d3.select('#story-titles').remove();
	}
	d3.layout.cloud().stop();
}	
