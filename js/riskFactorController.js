/* 
	js/riskFactorController.js
	
	immediateFlow.html中的"風險影響因子權重" 
*/


/* 讀取權重資料，並繪製柱狀圖 */
$(document).ready(function() {
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/risk_weight.json',
		success : function(response) {
			var data = [];
			$.each(response, function(index, value) {
				data[index] = [value.factor, value.weight];
			});
			drawRiskWeightBar(data);
		}
	});
})


/* 
	繪製柱狀圖
*/
function drawRiskWeightBar(data) {
	var margin = {top: 30, right: 30, bottom: 90, left: 30};
	var width = parseInt(d3.select('.chart').style('width'), 10) - margin.left*3;
	var height = parseInt(d3.select('.chart').style('height'), 10);
	var bar_width = width/30;

	var x_aixs_list = [];
	var bar_val = [];
	var x_domain = [];
	$.each(data, function(index, value) {
		x_aixs_list[index] = value[0];
		bar_val[index] = value[1].substr(0,value[1].length-1);
		x_domain[index] = index;
	});
	var x = d3.scale.ordinal()
	.domain(x_domain)
	.rangeBands([0,width]);

	var y = d3.scale.linear()
	.domain([0,25])
	.range([height,0]);

	var chart = d3.select(".chart");
	
	chart.attr("width",width + 2*margin.left)
	.attr("height",height + 2*margin.bottom)
	.append("g")
	.attr("transform","translate(" + margin.left*3 + "," + margin.left + ")")
	.selectAll("rect")
	.data(bar_val)
	.enter()
	.append("rect")
	.attr("width",bar_width)
	.attr("height",function(d) { return height - y(d); })
	.attr("x",function(d,i) { return x(i); }) 
	.attr("y",function(d) { return y(d); })
	.on("mouseover",function(d,i){
		var title = x_aixs_list[i]+":"+d+"%";

		d3.select(this)
		.style({
			stroke: '#315b7d',
			'stroke-width': 2,
			'fill-opacity': .7,
			"title": title
		})
		.append("title")
		.text(title);
	})
	.on("mouseout",function(d,i){
		d3.select(this)
		.style({
			stroke: '#315b7d',
			'stroke-width': 0,
			'fill-opacity': 1
		})
		.select("title")
		.remove();
	});

	var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(1)
	.tickFormat(function(d){return x_aixs_list[d];});

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(5);

	chart.append("g")
	.attr("transform", "translate(" + (margin.left*2) + "," + (height+margin.left) + ")")
	.attr("class","axis")
	.call(xAxis)
	.selectAll("text")  
	.style("text-anchor", "end")
	.attr("dx", "0px")
	.attr("dy", "20px")
	.attr("transform", function(d) {
		return "rotate(-65)" 
	});

	chart.append("g")
	.attr("transform", "translate(" + (margin.left*2) + "," + margin.left + ")")
	.attr("class","axis")
	.call(yAxis);

	chart.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 0)
	.attr("x", 0 - ((height/2)+margin.left))
	.attr("dy", "1em")
	.style("text-anchor", "middle")
	.text("權重");
}
