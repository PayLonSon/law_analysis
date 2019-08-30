/*
	js/preloadAir.js

	HeatMap.html的側選欄的預載
*/
$(document).ready(function() {
	$.ajax({
		type : "GET",
		dataType : "json",
		async : false,
		url : 'json/air_pollution_manufacturer.json',
		success : function(response) {
			// county
			var countyArr = [];
			$.each(response, function(index, value) {
				countyArr.push({County:value.County});
			});
			var countyUnique = removeDuplicates(countyArr, "County");
			var countyStr = "";
			$.each(countyUnique, function(index, value) {
				if(value.County.trim() != "" && value.County.trim() != "未知"){
					countyStr += '<option value="'+value.County+'" selected>'+value.County+"</option>";
				}
			});

			$("#county-search").html(countyStr);

			// industry
			var industryArr = [];
			$.each(response, function(index, value) {
				industryArr.push({categories:value.categories});
			});
			var industryUnique = removeDuplicates(industryArr, "categories");
			var industryStr = "";
			$.each(industryUnique, function(index, value) {
				industryStr += '<option value="'+value.categories+'" selected>'+value.categories+"</option>";
			});
			$("#industry-search").html(industryStr);

			// manufacturer
			var manufacturerArr = [];
			$.each(response, function(index, value) {
				manufacturerArr.push({AdminNo:value.AdminNo, ManufacturerName:value.ManufacturerName, ban_name:value.ban_name});
			});
			var manufacturerUnique = removeDuplicates(manufacturerArr, "ManufacturerName");
			var manufacturerStr = "";
			var count = 0;
			$.each(manufacturerUnique, function(index, value) {
				manufacturerStr += '<option value="'+value.AdminNo+":"+count+'" selected>'+value.ManufacturerName+"("+value.AdminNo+")</option>";
				//manufacturerStr += '<option value="'+value.ban_name+'" selected>'+value.ManufacturerName+"("+value.AdminNo+")</option>";
				count++;
			});
			$("#manufacturer-search").html(manufacturerStr);
		}
	});
});
