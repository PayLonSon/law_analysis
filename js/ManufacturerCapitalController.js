/* 
	js/ManafacturerCapitalController.js
	
	ManufacturerRiskAnalysis.html中的"業者資本額" 
*/

/* 
	讀取廠商資訊，繪製條形圖
*/
function getManufacturerCapital(){
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/manufacturer_risk.json',
		success : function(response) {
			var data = [];
			var clear_data = [];
			var i;

			for (i = 0; i < 9; i++) { 
				data.push({key: i,pop1:0, pop2:0, pop3:0, total:0, num1:0, num2:0, num3:0});
			}
			
			$.each(response, function(index, value) {
				if(global_manuf_id.includes((value.ManufacturerName).toString()) && global_manuf_industry.includes(value.Industry) &&global_manuf_county.includes((value.County).toString()) &&global_manuf_capital.includes(transformCapital(value.CapAmt).toString())) {
					var capitalLevel = transformCapital(parseInt(value.CapAmt));
					var level = transformColor(value.Color);
					data[capitalLevel]["pop"+level] += 1;
					data[capitalLevel]["num"+level] += 1;
					data[capitalLevel]["total"] += 1;
				}
			});
			clear_data = data.slice();
			
			$.each(data, function(index, value) {
				clear_data[index]["pop1"] /= clear_data[index]["total"];
				clear_data[index]["pop2"] /= clear_data[index]["total"];
				clear_data[index]["pop3"] /= clear_data[index]["total"];
				if(isNaN(clear_data[index]["pop1"]))
					clear_data[index]["pop1"] = 0;
				if(isNaN(clear_data[index]["pop2"]))
					clear_data[index]["pop2"] = 0;
				if(isNaN(clear_data[index]["pop3"]))
					clear_data[index]["pop3"] = 0;
			});
			$(".stackedChart").empty();
			drawCapitalBar(clear_data);
		}
	});
}

/* 
	繪製條形圖
*/
function drawCapitalBar(data) {
	var y_aixs_list = ["0M", "5000M", "10000M", "15000M", "20000M", "45000M", "60000M", "75000M", "95000M"];
	var y_domain = [0,1,2,3,4,5,6,7,8];

	var n = 3,
	m = data.length, 
	stack = d3.layout.stack(),
	layers = stack(d3.range(n).map(function(d,index) { 
		var a = [];
		for (var i = 0; i < m; ++i) {
			a[i] = {x: i, y: data[i]['pop' + (d+1)], n:  data[i]['num' + (d+1)], layer:(index+1)};  
		}
		return a;
	})),
	yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
	yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

	var margin = {top: 20, right: 10, bottom: 20, left: 50};
	var width = parseInt(d3.select('.stackedChart').style('width'), 10) - margin.left - margin.right;
	var height = parseInt(d3.select('.stackedChart').style('height'), 10) - margin.top - margin.bottom;

	var y = d3.scale.ordinal()
	.domain(y_domain)
	.rangeRoundBands([2, height], .08);

	var x = d3.scale.linear()
	.domain([0, yStackMax])
	.range([0, width]);

	var color = ["#28a745", "#ffc107", "#dc3545"];

	var svg = d3.select(".stackedChart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var layer = svg.selectAll(".layer")
	.data(layers)
	.enter().append("g")
	.attr("class", "layer")
	.style("fill", function(d, i) { return color[i]; });

	layer.selectAll("rect")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("y", function(d) { return y(d.x); })
	.attr("x", function(d) { return x(d.y0); })
	.attr("height", y.rangeBand())
	.attr("width", function(d) { return x(d.y); })
	.on("mouseover",function(d,i){
		var title = "("+transformCapitalLevel(d.x)+", "+transformRiskName(d.layer)+"風險) "+d.n+"間廠商 "+formatFloat((d.y*100), 1)+"%";
		d3.select(this)
		.style({
			'fill-opacity': .7,
			"title": title
		})
		.append("title")
		.text(title);
	})
	.on("mouseout",function(d,i){
		d3.select(this)
		.style({
			'fill-opacity': 1
		})
		.select("title")
		.remove();
	});

	var yAxis = d3.svg.axis()
	.scale(y)
	.tickSize(1)
	.tickPadding(6)
	.tickFormat(function(d){return y_aixs_list[d];})
	.orient("left");

	svg.append("g")
	.attr("class", "axis")
	.call(yAxis);
}


/*
	資本額的級距代碼轉換成字串描述
*/
function transformCapitalLevel(capitalLevel) {
	if(capitalLevel == 0){
		return "0-5000M";
	}else if(capitalLevel == 1){
		return "5000M-10000M";
	}else if(capitalLevel == 2){
		return "10000M-15000M";
	}else if(capitalLevel == 3){
		return "15000M-20000M";
	}else if(capitalLevel == 4){
		return "20000M-45000M";
	}else if(capitalLevel == 5){
		return "45000M-60000M";
	}else if(capitalLevel == 6){
		return "60000M-75000M";
	}else if(capitalLevel == 7){
		return "75000M-95000M";
	}else{
		return "95000M- ";
	}
}

/*
	資本額的級距代碼轉換成字串描述
*/
function transformRiskName(risk) {
	if(risk == 1) {
		return "低";
	}else if(risk == 2){
		return "中";
	}else{
		return "高";
	}
}
