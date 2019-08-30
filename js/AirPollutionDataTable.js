/* 
  js/FlowRelationController.js
  
  immediateFlow.html中的"廠商流向關聯圖" 
*/


/* 讀取監測資料，繪製資料表，廠商TABLE與圓餅圖 */
function getAirPollutionData(){
	var manufacturerData = [];
	var airData = [];
	var scoreNum = [];
	var categoriesArr = {};
	var totalArr = [0,0,0];
	var total = 0;
	$.ajax({
		type : "GET",
		dataType : "json",
		async : false,
		url : 'json/air_pollution.json',
		success : function(response) {
			var data = [];
			var tbodyStr = "";
			$.each(response, function(index, value) {
				airData[index] = value;
				scoreNum.push(value.data_score);
			});
			var unique = scoreNum.filter(onlyUnique);
			var max = Math.max(...unique);
			var min = Math.min(...unique);
			global_levelNum.push((max-min)*1/3);
			global_levelNum.push((max-min)*2/3);
		}
	}),
	$.ajax({
		type : "GET",
		dataType : "json",
		async : false,
		url : 'json/air_pollution_manufacturer.json',
		success : function(response) {
			$.each(response, function(index, value) {
				var airDataRow = airData.find(x => x.data_circle_id === value.data_circle_id);
				var score = airDataRow.data_score;
				var data_lat_center = airDataRow.data_lat_center;
				var data_lon_center = airDataRow.data_lon_center;

				value.riskLevel = riskLevel(score, global_levelNum);
				value.data_lat_center = data_lat_center;
				value.data_lon_center = data_lon_center;
				if(global_manuf_id.includes((value.AdminNo).toString()) && 
					global_manuf_county.includes(value.County) &&
					global_manuf_industry.includes(value.categories) &&
					global_manuf_risk.includes((value.riskLevel[1])) &&
					parseInt(global_start_time) <= value.date_start &&
					parseInt(global_end_time) >= value.date_end
					) {
					
					manufacturerData.push(value);

				if (!categoriesArr.hasOwnProperty(value.categories)) {
					categoriesArr[value.categories] = [0,0,0];
				}
				categoriesArr[value.categories][value.riskLevel[0]] +=1;
				totalArr[value.riskLevel[0]] += 1;
				total++;
			}
		});
			// 廠商TABLE
			var manufacturerData_sorted = manufacturerData.sort(compare);

			// 繪製地圖
			if(searched){
				global_air_data = manufacturerData_sorted;
			}else{
				global_air_data = airData;
			}
			$("#mapDiv div").remove();
			mapCreate();

			// 設置資料表
			setManufacturerDataTable(manufacturerData_sorted, "#datatable");
			// 廠商TABLE
			setCategoriesTable(categoriesArr, total, "#categoriesTable");
			// pie chart
			setPieChart(totalArr, total, "#pieChart");
		}
	});
}

/* 排序函示，依分數作排序 */
function compare(a,b) {
	if (a.data_score > b.data_score)
		return -1;
	if (a.data_score < b.data_score)
		return 1;
	return 0;
}

function riskLevel(score, arr){
	if (score < arr[0]) {
		return [0,"低"];
	}else if (score < arr[1]) {
		return [1,"中"];
	}else{
		return [2,"高"];
	}
}

/* 資料表 */
function setManufacturerDataTable(manufacturerData_sorted, target){
	tbodyStr = "";
	$.each(manufacturerData_sorted, function(index, value) {
		tbodyStr += "<tr>";
		tbodyStr += "<td>"+(index+1)+"</td>";
		tbodyStr += "<td>"+value.ManufacturerName+"</td>";
		tbodyStr += "<td>"+value.AdminNo+"</td>";
		tbodyStr += "<td>"+value.County+"</td>";
		tbodyStr += "<td>"+value.ManufacturerType+"</td>";
		tbodyStr += "<td>"+value.categories+"</td>";
		tbodyStr += "<td>"+value.useType+"</td>";
		tbodyStr += "<td>"+value.RegularAddr+"</td>";
		tbodyStr += '<td class="block-color color-'+value.riskLevel[0]+'"><div>'+value.riskLevel[1]+"</td>";
		tbodyStr += "</tr>";
	});
	$(target+" tbody").html(tbodyStr);
}

/* 廠商類型的資料表 */
function setCategoriesTable(categoriesArr, total, target){
	categoriesArr_transfer = [];
	$.each(categoriesArr, function(index, value) {
		var tmp = {};
		tmp.categories = index;
		tmp.high = formatFloat((value[2]/total)*100,2);
		tmp.mid = formatFloat((value[1]/total)*100,2);
		tmp.low = formatFloat((value[0]/total)*100,2);
		categoriesArr_transfer.push(tmp)
	});

	var categoriesArr_sorted = categoriesArr_transfer.sort(compareCategoriesRisk);

	var categoriesStr = "";
	$.each(categoriesArr_sorted, function(index, value) {
		categoriesStr += "<tr>";
		categoriesStr += "<td>"+value.categories+"</td>";
		categoriesStr += '<td class="block-color color-2"><div>'+value.high+"%</td>";
		categoriesStr += '<td class="block-color color-1"><div>'+value.mid+"%</td>";
		categoriesStr += '<td class="block-color color-0"><div>'+value.low+"%</td>";
		categoriesStr += "</tr>";
	});
	$(target+" tbody").html(categoriesStr);
}

/* 排序函示，依風險高低作排序 */
function compareCategoriesRisk(a,b) {
	if (a.high > b.high){
		return -1;
	}else if (a.high < b.high){
		return 1;
	}else{
		if (a.mid > b.mid) {
			return -1;
		} else if (a.mid < b.mid) {
			return 1;
		} else {
			if (a.low > b.low) {
				return -1;
			} else if (a.low < b.low) {
				return 1;
			} else {
				return 0;
			}
		}
	}
}

/* 繪製圓餅圖 */
function setPieChart(totalArr, total, target){
	var pie_result = [];
	pie_result[2] = formatFloat((totalArr[2]/total)*100,2);
	pie_result[1] = formatFloat((totalArr[1]/total)*100,2);
	pie_result[0] = formatFloat((totalArr[0]/total)*100,2);
	$(target+" svg").remove();
	contentArr = [];
	colorArr = [];
	if (pie_result[0] != 0){
		contentArr.push({"label":"低"+pie_result[0]+"%","value":pie_result[0]});
		colorArr.push("#28a745");
	}
	if(pie_result[1] != 0){
		contentArr.push({"label":"中"+pie_result[1]+"%","value":pie_result[1]});
		colorArr.push("#ffc107");
	}
	if(pie_result[2] != 0){
		contentArr.push({"label":"高"+pie_result[2]+"%","value":pie_result[2]});
		colorArr.push("#dc3545");
	}
	var pie = new d3pie(target, {
		"data": {
			"content": contentArr
		},"size": {
			"canvasHeight": 300,
			"canvasWidth": 300
		},
		"misc": {
			colors: {
				segments: colorArr
			}
		},
		"labels" : {
			"mainLabel": {
				"fontSize": 15
			}
		},
	});
	$(".hpack").height(parseInt(d3.select('#mapDiv').style('height'), 10));
}