/* 
	js/FlowDataTable.js
	
	immediateFlow.html中的"資料表" 
*/


/* 	讀取廠商資訊，轉換HTML TABLE */
function getFlowData(){
	$.ajax({
		type : "GET",
		dataType : "json",
		async : true,
		url : 'json/manufacturer_flow.json',
		success : function(response) {
			var data = [];
			var manufacturer = [];
			var substance = [];
			var theadStr = "";
			
			var flowData = [];
			$.each(response, function(index, value) {
				if(global_substance.includes(value.substance) && global_manufacturer.includes(value.manufId) && global_status.includes(transformStatus(value.status)) && global_behavior.includes(transformBehavior(value.behavior))) {
					flowData.push(value);
				}
			});
			
			var flowData_sorted = response.sort(compareFlow);

			// data table body
			var tbodyStr = "";
			$.each(flowData_sorted, function(index, value) {
				if(global_substance.includes(value.substance) && 
					global_manufacturer.includes(value.manufId) &&
					global_status.includes(transformStatus(value.status)) &&
					global_behavior.includes(transformBehavior(value.behavior))) {
					tbodyStr += "<tr>";
				tbodyStr += "<td>"+value.substance+"</td>";
				tbodyStr += "<td>"+value.tagId+"</td>";
				tbodyStr += "<td>"+value.manufId+"</td>";
				tbodyStr += "<td>"+value.manufacturer+"</td>";
				tbodyStr += "<td>"+value.behavior+"</td>";
				tbodyStr += "<td>"+value.deviceId+"</td>";
				tbodyStr += "<td>"+value.operatingTime+"</td>";
				tbodyStr += "<td>"+value.quantity+"</td>";
				tbodyStr += "<td>"+value.preTime+"(小時)</td>";
				tbodyStr += "<td>"+value.nextTime+"(小時)</td>";
				if (value.status == "正常") {
					tbodyStr += '<td class="block-color color-1">'+value.status+"</td>";
				}else{
					tbodyStr += '<td class="block-color color-2" style="font-weight:bold">時間異常</td>';
				}
				
				tbodyStr += "</tr>";
			}
		});
			$("#datatable tbody").html(tbodyStr);
		}
	});
	getCompanyFlowData()
}

/* 	讀取廠商資訊，轉換HTML TABLE */
function getCompanyFlowData(){
	$.ajax({
		type : "GET",
		dataType : "json",
		async : true,
		url : 'json/company_flow.json',
		success : function(response) {
			var data = [];
			var manufacturer = [];
			var substance = [];
			var theadStr = "";
			var comyanyData = [];
			var flowData = [];
			
			var flowData_sorted = response.sort(compareFlow);
			// data table body
			var tbodyStr = "";
			$.each(flowData_sorted, function(index, value) {
				if(global_status == 0){
					tbodyStr += "<tr>";
					tbodyStr += "<td>"+value.manufId+"</td>";
					tbodyStr += "<td>"+value.manufacturer+"</td>";
					if (value.status1 == "正常") {
						tbodyStr += '<td style="color:blue;text-align: center;">'+value.status1+"</td>";
					}else{
						tbodyStr += '<td style="color:red;text-align: center;">'+value.status1+"</td>";
					}
					if (value.status1 == "正常") {
						tbodyStr += '<td style="color:blue;text-align: center;">'+value.status1+"</td>";
					}else{
						tbodyStr += '<td style="color:red;text-align: center;">'+value.status1+"</td>";
					}
					tbodyStr += "</tr>";
				}else{
					if(global_status.includes(transformStatus(value.status))){
						tbodyStr += "<tr>";
						tbodyStr += "<td>"+value.manufId+"</td>";
						tbodyStr += "<td>"+value.manufacturer+"</td>";
						if (value.status1 == "正常") {
							tbodyStr += '<td style="color:blue;text-align: center;">'+value.status1+"</td>";
						}else{
							tbodyStr += '<td style="color:red;text-align: center;">'+value.status1+"</td>";
						}
						if (value.status1 == "正常") {
							tbodyStr += '<td style="color:blue;text-align: center;">'+value.status1+"</td>";
						}else{
							tbodyStr += '<td style="color:red;text-align: center;">'+value.status1+"</td>";
						}
						tbodyStr += "</tr>";
					}
				}
			
		});
			$("#statusTable tbody").html(tbodyStr);
		}
	});
}
/*
	排序函示，依狀態(異常/正常)做排序
*/
function compareFlow(a,b) {
	if (transformStatus(a.status) > transformStatus(b.status)){
		return -1;
	}else if (transformStatus(a.status) < transformStatus(b.status)){
		return 1;
	}else{
		if (a.tagId < b.tagId) {
			return -1;
		} else if (a.tagId > b.tagId) {
			return 1;
		} else {
			return 0;
		}
	}
}
