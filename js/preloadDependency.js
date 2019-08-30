/*
	js/preloadDependency.js

	DependencyGraph.html的側選欄的預載
 */
$(document).ready(
		function() {
			$.ajax({
				type : "GET",
				dataType : "json",
				async : false,
				url : 'json/graph_edge.json',
				success : function(response) {
					var eachArr = [],companyArr = [];
					$.each(response, function(index, value) {
						eachArr.push({
							casno : value.casno,
							cas : value.cas,
							transcation_class : value.transcation_class
						});
					});
					$.each(response, function(index, value) {
						companyArr.push({
							company_name : value.upstream_name,
							company_no : value.upstream
						});
					});
					$.each(response, function(index, value) {
						companyArr.push({
							company_name : value.downstream_name,
							company_no : value.downstream
						});
					});
					var casnoUnique = removeDuplicates(eachArr, "casno");
					var casnoStr = "";
					var actionUnique = removeDuplicates(eachArr, "transcation_class");
					var actionStr = "";
					var companyUnique = removeDuplicates(companyArr, "company_name");
					var companyStr = "";
					$.each(casnoUnique, function(index, value) {
						casnoStr += '<option value="' + value.cas
								+ '" selected>' + value.cas + "</option>";
					});
					$.each(actionUnique, function(index, value) {
						
						actionStr += '<option value="' + value.transcation_class
								+ '" selected>' + value.transcation_class + "</option>";
					});
					$.each(companyUnique, function(index, value) {
						
						companyStr += '<option value="' + value.company_name
								+ '" selected>' + value.company_name +"("+value.company_no+")"+ "</option>";
					});
					$("#cas-search").html(casnoStr);
					$("#action-search").html(actionStr);
					$("#company-search").html(companyStr);
				}
			});
			
		});
