/* 
	js/operateTimeController.js
	
	immediateFlow.html中的"運作時間" 
*/

/* 
	讀取廠商交易資訊，繪製上階段/下階段與入倉/儲存/出倉，共六個圖
*/
function getOperateTime(){
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/manufacturer_flow.json',
		success : function(response) {
			var data_pre_in = [];
			var data_pre_save = [];
			var data_pre_out = [];
			var data_next_in = [];
			var data_next_save = [];
			var data_next_out = [];
			$.each(response, function(index, value) {
				var behavior = transformBehavior(value.behavior);
				if(global_substance.includes(value.substance) && global_manufacturer.includes(value.manufId) &&
					global_status.includes(transformStatus(value.status)) && global_behavior.includes(behavior)) {
					switch(behavior) {
						case 1:
						data_pre_save.push({y:value.preTime, status:transformStatus(value.status),error_stauts:value.error_up}); 
						data_next_save.push({y:value.nextTime, status:transformStatus(value.status),error_stauts:value.error_down}); 
						break;
						case 2:
						data_pre_in.push({y:value.preTime, status:transformStatus(value.status),error_stauts:value.error_up}); 
						data_next_in.push({y:value.nextTime, status:transformStatus(value.status),error_stauts:value.error_down}); 
						break;
						case 3:
						data_pre_out.push({y:value.preTime, status:transformStatus(value.status),error_stauts:value.error_up}); 
						data_next_out.push({y:value.nextTime, status:transformStatus(value.status),error_stauts:value.error_down}); 
						break;
					}
				}
			});
			$(".flow svg").remove();
			drawOperateTime(data_pre_in, 1);
			drawOperateTime(data_pre_save, 2);
			drawOperateTime(data_pre_out, 3);
			drawOperateTime(data_next_in, 4);
			drawOperateTime(data_next_save, 5);
			drawOperateTime(data_next_out, 6);
		}
	});
};

/* 
	繪製"操作時間"圖，flow_id對應HTML圖的位置
*/
function drawOperateTime(data, flow_id) {
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = parseInt(d3.select('.flow').style('width'), 10) - margin.left,
	height = 180 - margin.top - margin.bottom;

	var sum = 0;
	var avg;
	for (var i = data.length - 1; i >= 0; i--) {
		sum += data[i].y;
	}
	avg = sum/data.length;
	var dataset2 = [
	{x: 0, y: avg},
	{x: 100, y: avg},
	];

	var xScale = d3.scale.linear()
	.domain([0, 100])
	.range([0, width]);

	var yScale = d3.scale.linear()
	.domain([0, d3.max(data, function(d){ return (d.y+10); })])
	.range([height, 0]);

	var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.innerTickSize(-height)
	.outerTickSize(0)
	.tickPadding(10);

	var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.innerTickSize(-width)
	.outerTickSize(0)
	.tickPadding(10);

	var line = d3.svg.line()
	.x(function(d) { return xScale(d.x); })
	.y(function(d) { return yScale(d.y); });

	var svg = d3.select(".flow"+flow_id).append("svg")
	.attr("width", width + margin.left - margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)

	svg.append("path")
	.data([dataset2])
	.attr("class", "line")
	.attr("d", line);
	var y_max = d3.max(data, function(d){ return (d.y+10); });

	svg.append("g")
	.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function (d) { return width/2; })
	.attr("cy", function (d) { return (height/y_max)*(y_max-d.y); })
	.attr("r", 8)
	.style("fill", function(d) { console.log(d); return d.status == 0 || d.error_stauts=="N" ?"#007bff":"#dc3545"; })
	.on("mouseover",function(d,i){
		if (d.status) {
			d3.select(this)
			.append("title")
			.text("異常");
		}
	})
	.on("mouseout",function(d,i){
		d3.select(this)
		.select("title")
		.remove();
	});
}


