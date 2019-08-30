/*
	js/preloadManufacturer.js

	ManufacturerRiskAnalysis.html的側選欄的預載
*/
$(document).ready(function() {
	$.ajax({
		type : "GET",
		dataType : "json",
		async : false,
		url : 'json/manufacturer_risk.json',
		success : function(response) {
			// county
			var countyArr = [];
			$.each(response, function(index, value) {
				countyArr.push({County:value.County});
			});
			var countyUnique = removeDuplicates(countyArr, "County");
			var countyStr = "";
			$.each(countyUnique, function(index, value) {
				countyStr += '<option value="'+value.County+'" selected>'+value.County+"</option>";
			});

			$("#county-search").html(countyStr);

			// industry
			var industryArr = [];
			$.each(response, function(index, value) {
				industryArr.push({Industry:value.Industry});
			});
			var industryUnique = removeDuplicates(industryArr, "Industry");
			var industryStr = "";
			$.each(industryUnique, function(index, value) {
				industryStr += '<option value="'+value.Industry+'" selected>'+value.Industry+"</option>";
			});
			$("#industry-search").html(industryStr);

			// manufacturer
			var manufacturerArr = [];
			$.each(response, function(index, value) {
				manufacturerArr.push({BusinessAdminNo:value.BusinessAdminNo, ManufacturerName:value.ManufacturerName});
			});
			var manufacturerUnique = removeDuplicates(manufacturerArr, "ManufacturerName");
			var manufacturerStr = "";
			var count = 1;
			$.each(manufacturerUnique, function(index, value) {
				manufacturerStr += '<option value="'+value.ManufacturerName+'" selected>'+value.ManufacturerName+"("+value.BusinessAdminNo+")</option>";
			});
			console.log(manufacturerUnique.length);
			$("#manufacturer-search").html(manufacturerStr);
		}
	});
});
