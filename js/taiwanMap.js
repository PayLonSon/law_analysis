/* 
	js/taiwanMap.js
	
	ManufacturerRiskAnalysis.html中的"廠商所在縣市" 
*/

/* 繪製台灣地圖，讀取廠商資訊，依據縣市畫上圓餅圖 */
function countyMap()
{
	/* 讀取地圖JSON */
	d3.json("map/taiwan.json", function(error, map) {
		if (error) return console.error(error);
		
		/* 讀取廠商資料 */
		d3.json("json/manufacturer_risk.json", function(err, json) {
			if (error) return console.error(error);

			/* 地圖設定 */
			projection = d3.geo.mercator().center([121,23,5]).scale(4000).translate([250,200]);
			path = d3.geo.path().projection(projection);
			features = topojson.feature(map, map.objects.County_WGS84).features;
			d3.select(".taiwanMap").selectAll("path").data(features).enter().append("path").attr({
				d: path,
				fill: "#9EF89E",
				class: "area"
			});

			/* 資料過濾 */
			var data = [];
			for (i = 0; i < 22; i++) { 
				data.push({key: i, lat: 0, lng:0, pop1:0, pop2:0, pop3:0, total:0, num1:0, num2:0, num3:0});
			}
			$.each(json, function(index, value) {
				if(global_manuf_id.includes((value.ManufacturerName).toString()) && global_manuf_industry.includes(value.Industry) && global_manuf_county.includes((value.County).toString()) && global_manuf_capital.includes(transformCapital(value.CapAmt).toString())) {
					var countyLevel = transformCounty(value.County).key;
					var lat = transformCounty(value.County).lat;
					var lng = transformCounty(value.County).lng;
					var level = transformColor(value.Color);
					data[countyLevel]["pop"+level] += 1;
					data[countyLevel]["num"+level] += 1;
					data[countyLevel]["total"] += 1;
					data[countyLevel]["lat"] = lat;
					data[countyLevel]["lng"] = lng;
					data[countyLevel]["title"] = value.County;
				}
			});
			clear_data = data.slice();
			
			/* 清空圓餅圖 */
			$(".pieSvg").remove();

			/* 計算percent，繪製圓餅圖 */
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

				var tmp_data = [
				{"ctitle":value["title"],"value":value["pop1"],"num":value["num1"]}, 
				{"ctitle":value["title"],"value":value["pop2"],"num":value["num2"]}, 
				{"ctitle":value["title"],"value":value["pop3"],"num":value["num3"]}];
				if (value["lat"] != 0) {
					drawPie(value["lng"],value["lat"],tmp_data);
				}
			});
		});
	});
}

/* 繪製圓餅圖 */
function drawPie(lat,lng,data){
	var basicW = 30;
	var w = basicW,
	h = basicW,
	r = (basicW/3),
	color = ["#28a745","#ffc107","#dc3545"];

	var vis = d3.select(".taiwanMap")
	.append("svg") 
	.attr("class", "pieSvg")    
	.attr({
		x: function(d) {
			return projection([lng, lat])[0]-(basicW/2);
		},
		y: function(d) {
			return projection([lng, lat])[1]-basicW
		}})          
	.append("g") 
	.data([data])              
	.attr("width", w)          
	.attr("height", h)
	.on("mouseover",function(d,i){
		var ctitle = "";
		ctitle += d[0].ctitle+"\n";
		ctitle += "低"+formatFloat(d[0].value, 2)+"%("+d[0].num+")\n";
		ctitle += "中"+formatFloat(d[1].value,2)+"%("+d[1].num+")\n";
		ctitle += "高"+formatFloat(d[2].value,2)+"%("+d[2].num+")\n";
		d3.select(this)
		.style({
			'fill-opacity': .7,
			"title": d[0].ctitle
		})
		.append("title")
		.text(ctitle);
	})
	.on("mouseout",function(d,i){
		d3.select(this)
		.style({
			'fill-opacity': 1
		})
		.select("title")
		.remove();
	})
	.append("g") 
	.attr("transform", "translate(" + r + "," + r + ")");

	var arc = d3.svg.arc() 
	.outerRadius(r);

	var pie = d3.layout.pie()         
	.value(function(d) { return d.value; }); 

	var arcs = vis.selectAll("g.slice")  
	.data(pie)                         
	.enter() 
	.append("g")             
	.attr("class", "slice");    
	arcs.append("path")
	.attr("fill", function(d, i) { return color[i]; } ) 
	.attr("d", arc); 
}

/* 縣市對應其經緯度位置 */
function transformCounty(county){
	var newCounty = county.replace("台", "臺");
	var countyData = [
	{key:0, title: '新北市', lat: 121.9739, lng: 24.91571},
	{key:1, title: '高雄市', lat: 120.265575, lng: 22.382924},
	{key:2, title: '臺中市', lat: 120.5417, lng: 24.03321},
	{key:3, title: '臺北市', lat: 121.5598, lng: 24.89108},
	{key:4, title: '桃園縣', lat: 121.9168, lng: 24.93759},
	{key:5, title: '桃園市', lat: 121.0800, lng: 24.8900},
	{key:6, title: '臺南市', lat: 120.100082, lng: 22.830401},
	{key:7, title: '彰化縣', lat: 120.2818, lng: 23.79297},
	{key:8, title: '屏東縣', lat: 120.6555897, lng: 21.8861783},
	{key:9, title: '雲林縣', lat: 120.1097, lng: 23.45585},
	{key:10, title: '苗栗縣', lat: 120.8417, lng: 24.38927},
	{key:11, title: '嘉義縣', lat: 120.074, lng: 23.15889},
	{key:12, title: '新竹縣', lat: 121.3252, lng: 24.40328},
	{key:13, title: '南投縣', lat: 120.971387, lng: 23.575136},
	{key:14, title: '宜蘭縣', lat: 121.9195, lng: 24.49295},
	{key:15, title: '新竹市', lat: 120.9647, lng: 24.60395},
	{key:16, title: '基隆市', lat: 121.7081, lng: 25.10898},
	{key:17, title: '花蓮縣', lat: 121.3542, lng: 23.7569},
	{key:18, title: '嘉義市', lat: 120.5473, lng: 23.27545},
	{key:19, title: '臺東縣', lat: 120.9876, lng: 22.98461},
	{key:20, title: '金門縣', lat: 118.3186, lng: 24.43679},
	{key:21, title: '澎湖縣', lat: 119.6151, lng: 23.56548},
	{key:22, title: '連江縣', lat: 119.5397, lng: 26.19737}
	];
	for (var i = countyData.length - 1; i >= 0; i--) {
		if(countyData[i].title == newCounty){
			return countyData[i];
		}
	}
}
