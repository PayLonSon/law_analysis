/* 
	js/ManufacturerDataTable.js
	
	ManufacturerRiskAnalysis.html中的"資料表" 
*/

/* 
	讀取廠商資訊，轉換HTML TABLE 
*/
function getManufacturerData(){
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/manufacturer_risk.json',
		success : function(response) {
			var data = [];
			var thead = ["廠商名稱","行業別","縣市","資本額","成立年數","食品業者","風險程度"];
			var theadStr = "";
			$.each(thead, function(index, value) {
				theadStr += "<th>"+value+"</th>";
			});
			var tbodyStr = "";
			
			var manufacturerData = [];
			$.each(response, function(index, value) {
				if(global_manuf_id.includes((value.ManufacturerName).toString()) && global_manuf_industry.includes(value.Industry) && global_manuf_county.includes((value.County).toString()) && global_manuf_capital.includes(transformCapital(value.CapAmt).toString())) {
					manufacturerData.push(value);
				}
			});

			var manufacturerData_sorted = manufacturerData.sort(compareRiskIndex);

			$.each(manufacturerData_sorted, function(index, value) {
				tbodyStr += "<tr>";
				tbodyStr += "<td>"+value.ManufacturerName+"("+value.BusinessAdminNo+")"+"</td>";
				tbodyStr += "<td>"+value.Industry+"</td>";
				tbodyStr += "<td>"+value.County+"</td>";
				tbodyStr += "<td>"+value.CapAmt+"</td>";
				tbodyStr += "<td>"+value.years+"</td>";
				var isFoodIndustryName = (value.isFoodIndustry == 0)?"否":"是";
				tbodyStr += "<td>"+isFoodIndustryName+"</td>";
				tbodyStr += '<td><div class="color-circle '+transformColorTag(value.Color)+'"><span>'+value.RiskIndex+"</span></div></td>";
				tbodyStr += "</tr>";
			});
			$("#datatable thead").html(theadStr);
			$("#datatable tbody").html(tbodyStr);
		}
	});
}

/* 
	自訂排序函式，依風險值排序
*/
function compareRiskIndex(a,b) {
	if (a.RiskIndex > b.RiskIndex)
		return -1;
	if (a.RiskIndex < b.RiskIndex)
		return 1;
	return 0;
}

/* 
	中文顏色轉換英文
*/
function transformColorTag(color){
	if (color == "黃") { 
		return "yellow"; 
	}else if(color == "紅"){
		return "red";
	}else if(color == "綠"){
		return "green";
	}else{
		console.log("color error");
	}
}