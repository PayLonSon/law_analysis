
var themeKeys = [];
function tableData1() {
	//alert(stuff);
	var chemicalMaterial = [];
	$("#elementAlert1>tbody>tr").remove();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/f_chemical_material.json',
		data : {
			startDate : $('#datepicker_start').val(),
			endDate : $('#datepicker_end').val()
		},
		success : function(response) {
			var chemicalMaterialData = [];
			var beforekw = '';
			//console.log(theme);
			if(cm.length>0){
				if(stuff.length>0 ){
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							if ( value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.content.includes((stuff).toString()) && theme.includes(value.source)||
									value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.title.includes((stuff).toString()) && theme.includes(value.source)) {
								
										check = true;
								if(check ){
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
									i++;
									check = false;
								}
							} 
						});
					});
				}else if(stuff.length>0 ){
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							if (
											value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
											&& Number(date[1]) >= nowdate  && value.content.includes((stuff).toString()) && theme.includes(value.source)||
											value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
											&& Number(date[1]) >= nowdate  && value.title.includes((stuff).toString()) && theme.includes(value.source)) {
												
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
									} 
						});
					});
				/*}else if(theme.length < 3){
					
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							if (value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate ) {
										console.log(value);
										check = true;
								if(check){
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
								}
							}
						});
					});//*/
				}else{
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));

							if (value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && theme.includes(value.source)) {
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
							} 
						});
					});
				}

				
			}else{
				
				if(stuff.length>0 ){
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							if ( keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.content.includes((stuff).toString()) && theme.includes(value.source)||
									keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.title.includes((stuff).toString()) && theme.includes(value.source)) {
								
										check = true;
								if(check){
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
									i++;
									check = false;
								}
							} 
						});
					});
				}else if(stuff.length>0){
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							if (
											keyword == value.keyword && Number(date[0]) <= nowdate
											&& Number(date[1]) >= nowdate  && value.content.includes((stuff).toString()) && theme.includes(value.source)||
											keyword == value.keyword && Number(date[0]) <= nowdate
											&& Number(date[1]) >= nowdate  && value.title.includes((stuff).toString()) && theme.includes(value.source)) {
												
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
									} 
						});
					});
				/*}else if(theme.length < 3){
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							//console.log(value);
							if (keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate ) {
								console.log(value);
										check = true;
								if(check){
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
									check = false;
								}
							}
						});
					});//*/
				}else{
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));

							if (keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && theme.includes(value.source)) {
											tmp = {};
											tmp.publish_date = value.publish_date;
											tmp.keyword = value.keyword;
											chemicalMaterial.push({"ChemicalChnName":value.ChemicalChnName,"keyword":value.keyword});
											tmp.ChemicalChnName = value.ChemicalChnName;
											tmp.source = value.source;
											tmp.title = value.title;
											tmp.content = value.content;
											tmp.link = value.link;
											chemicalMaterialData.push(tmp);
							} 
						});
					});
				}
			}
			
			/*boxs.forEach(function(keyword, i) {
				$.each(response, function(index, value) {
					var nowdate = Number(value.publish_date.replace('-', '').replace('-', ''));
					if (keyword == value.keyword && Number(date[0]) <= nowdate&& Number(date[1]) >= nowdate) {
						tmp = {};
						tmp.publish_date = value.publish_date;
						tmp.keyword = value.keyword;
						tmp.ChemicalChnName = value.ChemicalChnName;
						tmp.source = value.source;
						tmp.title = value.title;
						tmp.content = value.content;
						tmp.link = value.link;
						chemicalMaterialData.push(tmp);
					}
				});
			});//*/
			chemicalMaterialData = uniqueObject(chemicalMaterialData);
			console.log(chemicalMaterialData);
			var chemicalMaterialData_sorted = chemicalMaterialData.sort(comparePublishDate);
			
			tbodyStr = "";
			$.each(chemicalMaterialData_sorted, function(index, value) {
				tbodyStr += "<tr onclick=\"javascript:window.open('"+value.link+"', '_blank')\" style=\"cursor:pointer\">";
				tbodyStr += "<td>"+value.publish_date+"</td>";
				tbodyStr += "<td>"+value.keyword+"</td>";
				tbodyStr += "<td style='width:10px'>"+value.source+"</td>";
				tbodyStr += "<td>"+value.title+"</td>";
				tbodyStr += "<td>"+value.content.replace(value.ChemicalChnName,"")+"</td>";
				tbodyStr += "</tr>";
			});
			$("#elementAlert1 tbody").html(tbodyStr);
			
			tableData2(chemicalMaterial);
			
		}
		
	});
}

function tableData2(chemicalMaterial) {
	$("#elementAlert2>tbody>tr").remove();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/f_chemical_stuff.json',
		data : {
			startDate : $('#datepicker_start').val(),
			endDate : $('#datepicker_end').val()
		}, success : function(response) {
			var ChemicalChnName;
			var no = {};
			var ToxChemi = {};
			var TCHemicalMaterials = {};
			var TFadenBook = {};
			var keywordName = {},keywordDate = {};
			var TNewChemiRegMgr = {};
			var TTobaccoIngredient = {};
			var TCosmeticProdict = {};
			var keywordCount = {};
			var beforekw = '';
			var count = 0;
			chemicalMaterial = jQuery.unique( chemicalMaterial );
			chemicalMaterial = uniqueObject(chemicalMaterial);
			//console.log(chemicalMaterial);
			var chemicalMaterialData_sorted = chemicalMaterial.sort(comparePublishDate);
			var check = false;
				$.each(response, function(index, value) {
					count = 0;
					check = false;
					var nowdate = Number(value.publish_date.replace('-', '')
							.replace('-', ''));
					if ( Number(date[0]) <= nowdate
							&& Number(date[1]) >= nowdate ) {
								$.each(chemicalMaterial, function(i, v) {
									if(v.keyword == value.keyword ){
										count++;
											keywordName[value.keyword]=value.keyword;
											keywordDate[value.keyword]=value.publish_date;
											keywordCount[value.keyword] = count;
											no[value.keyword] = value.casno;
											ToxChemi[value.keyword] = value.is_ToxChemi;
											TCHemicalMaterials[value.keyword] = value.is_TCHemicalMaterials;
											TFadenBook[value.keyword] = value.is_TFadenBook;
											TNewChemiRegMgr[value.keyword] = value.is_TNewChemiRegMgr;
											TTobaccoIngredient[value.keyword] = value.is_TTobaccoIngredient;
											TCosmeticProdict[value.keyword] = value.is_TCosmeticProdict;
									}
								});
										
									
					}  	
				});
			
			/*boxs.forEach(function(keyword, i) {
				$.each(response, function(index, value) {
					ChemicalChnName = value.ChemicalChnName;
					var nowdate = Number(value.publish_date.replace('-', '').replace('-', ''));
					if (keyword == value.keyword && Number(date[0]) <= nowdate && Number(date[1]) >= nowdate) {
						if (keywordCount[value.ChemicalChnName] == null) {
							keywordCount[value.ChemicalChnName] = 1;
							no[value.ChemicalChnName] = value.casno;
							ToxChemi[value.ChemicalChnName] = value.is_ToxChemi;
							TCHemicalMaterials[value.ChemicalChnName] = value.is_TCHemicalMaterials;
							TFadenBook[value.ChemicalChnName] = value.is_TFadenBook;
							TNewChemiRegMgr[value.ChemicalChnName] = value.is_TNewChemiRegMgr;
							TTobaccoIngredient[value.ChemicalChnName] = value.is_TTobaccoIngredient;
							TCosmeticProdict[value.ChemicalChnName] = value.is_TCosmeticProdict;
						} else {
							keywordCount[value.ChemicalChnName] = keywordCount[value.ChemicalChnName] + 1;
							no[value.ChemicalChnName] = value.casno;
							ToxChemi[value.ChemicalChnName] = value.is_ToxChemi;
							TCHemicalMaterials[value.ChemicalChnName] = value.is_TCHemicalMaterials;
							TFadenBook[value.ChemicalChnName] = value.is_TFadenBook;
							TNewChemiRegMgr[value.ChemicalChnName] = value.is_TNewChemiRegMgr;
							TTobaccoIngredient[value.ChemicalChnName] = value.is_TTobaccoIngredient;
							TCosmeticProdict[value.ChemicalChnName] = value.is_TCosmeticProdict;
						}
					}
				});
			});//*/
			var chemicalStuffData = [];
			(Object.keys(keywordCount)).forEach(function(ChemicalChnName, i) {
				var tmp = {};
				tmp.keyword = keywordName[ChemicalChnName];
				tmp.no = no[ChemicalChnName];
				tmp.newsNum = keywordCount[ChemicalChnName];
				tmp.ToxChemi = (ToxChemi[ChemicalChnName] == 't')?"是":"否";
				tmp.TCHemicalMaterials = (TCHemicalMaterials[ChemicalChnName] == 't')?"是":"否";
				tmp.TFadenBook = (TFadenBook[ChemicalChnName] == 't')?"是":"否";
				tmp.TNewChemiRegMgr = (TNewChemiRegMgr[ChemicalChnName] == 't')?"是":"否";
				tmp.TTobaccoIngredient = (TTobaccoIngredient[ChemicalChnName] == 't')?"是":"否";
				tmp.TCosmeticProdict = (TCosmeticProdict[ChemicalChnName] == 't')?"是":"否";
				chemicalStuffData.push(tmp);
			});

			var chemicalStuffData_sorted = chemicalStuffData.sort(compareNewsNum);
			tbodyStr = "";
			$.each(chemicalStuffData_sorted, function(index, value) {
				tbodyStr += "<tr>";
				tbodyStr += "<td style='font-weight:bold;'>"+value.keyword+"</td>";
				tbodyStr += "<td>"+value.no+"</td>";
				tbodyStr += "<td>"+value.newsNum+"</td>";

				if(value.ToxChemi == "是"){
					tbodyStr += "<td><div class=\"color-circle red\"><span>"+value.ToxChemi+"</span></div></td>";
				}else{
					tbodyStr += "<td>"+value.ToxChemi+"</td>";
				}

				if(value.TCHemicalMaterials == "是"){
					tbodyStr += "<td><div class=\"color-circle red\"><span>"+value.TCHemicalMaterials+"</span></div></td>";
				}else{
					tbodyStr += "<td>"+value.TCHemicalMaterials+"</td>";
				}

				if(value.TFadenBook == "是"){
					tbodyStr += "<td><div class=\"color-circle red\"><span>"+value.TFadenBook+"</span></div></td>";
				}else{
					tbodyStr += "<td>"+value.TFadenBook+"</td>";
				}

				if(value.TNewChemiRegMgr == "是"){
					tbodyStr += "<td><div class=\"color-circle red\"><span>"+value.TNewChemiRegMgr+"</span></div></td>";
				}else{
					tbodyStr += "<td>"+value.TNewChemiRegMgr+"</td>";
				}

				if(value.TTobaccoIngredient == "是"){
					tbodyStr += "<td><div class=\"color-circle red\"><span>"+value.TTobaccoIngredient+"</span></div></td>";
				}else{
					tbodyStr += "<td>"+value.TTobaccoIngredient+"</td>";
				}

				if(value.TCosmeticProdict == "是"){
					tbodyStr += "<td><div class=\"color-circle red\"><span>"+value.TCosmeticProdict+"</span></div></td>";
				}else{
					tbodyStr += "<td>"+value.TCosmeticProdict+"</td>";
				}
				tbodyStr += "</tr>";
			});
			$("#elementAlert2 tbody").html(tbodyStr);
		}
	});
}
function comparePublishDate(a,b) {
	if (a.publish_date > b.publish_date)
		return -1;
	if (a.publish_date < b.publish_date)
		return 1;
	return 0;
}
function compareNewsNum(a,b) {
	if (a.newsNum > b.newsNum)
		return -1;
	if (a.newsNum < b.newsNum)
		return 1;
	return 0;
}

function uniqueObject(array){
	//console.log(array);
	var flags = [], output = [], l = array.length, i;
	for( i=0; i<l; i++) {
		if( flags[array[i].keyword] && flags[array[i].content]) continue;
		flags[array[i]] = true;
		flags[array[i]] = true;
		output.push(array[i]);
	}
	return output;
}