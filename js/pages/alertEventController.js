
var themeKeys = [];
function tableData1() {
	//alert(stuff);
	var chemicalMaterial = [];
	$("#elementAlert1>tbody>tr").remove();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/chemical_material.json',
		data : {
			startDate : $('#datepicker_start').val(),
			endDate : $('#datepicker_end').val()
		},
		success : function(response) {
			var chemicalMaterialData = [];
			themeKeys = [];
			var beforekw = '';
			theme.forEach(function(keyword) {
				switch(keyword){
					case '關注化學物質':
						themeKeys.push("毒性");
						themeKeys.push("毒品");
						themeKeys.push("新興");
						themeKeys.push("爆裂物");
						themeKeys.push("IED");
						break;
					case '環境污染':
						 themeKeys.push("重金屬");
						 themeKeys.push("有害");
						 themeKeys.push("排放");
						 themeKeys.push("污染");
						 themeKeys.push("廢水");
						 themeKeys.push("污水");
						 themeKeys.push("洩漏");
						 themeKeys.push("暗管");
						 themeKeys.push("偷排");
						break;
					case '化學安全':
						 themeKeys.push("化工");
						 themeKeys.push("化災");
						 themeKeys.push("化學");
						 themeKeys.push("外洩");
						 themeKeys.push("危害");
						 themeKeys.push("氣爆");
						 themeKeys.push("爆炸");
						 themeKeys.push("安全");
						 themeKeys.push("槽車");
				
					case '食安':
						  themeKeys.push("香料");
						 themeKeys.push("原料");
						 themeKeys.push("致癌");
						 themeKeys.push("添加物");
						 themeKeys.push("黑心");
						 themeKeys.push("色料");
						 themeKeys.push("色素");
						 themeKeys.push("工業用");
						 themeKeys.push("有毒");
						 themeKeys.push("漂白");

						break;
				}
			});
			if(cm.length>0){
				if(stuff.length>0 && theme.length < 3){
					
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							console.log(themeKeys);
							if ( value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.content.includes((stuff).toString())||
									value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.title.includes((stuff).toString()) ) {
								themeKeys.forEach(function(word) {
									if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
										check = true;
									}
								});
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
											value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
											&& Number(date[1]) >= nowdate  && value.content.includes((stuff).toString())||
											value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
											&& Number(date[1]) >= nowdate  && value.title.includes((stuff).toString())) {
												
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
				}else if(theme.length < 3){
					
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							if (value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate ) {
								themeKeys.forEach(function(word) {
									if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
										check = true;
									}
								});
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
					});
				}else{
					
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));

							if (value.ChemicalChnName == cm[0]  && keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate) {
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
				
				if(stuff.length>0 && theme.length < 3){
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							if ( keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.content.includes((stuff).toString())||
									keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate && value.title.includes((stuff).toString()) ) {
								themeKeys.forEach(function(word) {
									if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
										check = true;
									}
								});
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
											&& Number(date[1]) >= nowdate  && value.content.includes((stuff).toString())||
											keyword == value.keyword && Number(date[0]) <= nowdate
											&& Number(date[1]) >= nowdate  && value.title.includes((stuff).toString())) {
												
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
				}else if(theme.length < 3){
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));
							var check = false;
							if (keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate ) {
								themeKeys.forEach(function(word) {
									if(value.title.includes((word).toString()) || value.content.includes((word).toString()) ){
										check = true;
									}
								});
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
					});
				}else{
					boxs.forEach(function(keyword, i) {
						$.each(response, function(index, value) {
							var nowdate = Number(value.publish_date.replace('-', '')
									.replace('-', ''));

							if (keyword == value.keyword && Number(date[0]) <= nowdate
									&& Number(date[1]) >= nowdate) {
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

			var chemicalMaterialData_sorted = chemicalMaterialData.sort(comparePublishDate);
			
			tbodyStr = "";
			$.each(chemicalMaterialData_sorted, function(index, value) {
				tbodyStr += "<tr onclick=\"javascript:window.open('"+value.link+"', '_blank')\" style=\"cursor:pointer\">";
				tbodyStr += "<td>"+value.publish_date+"</td>";
				tbodyStr += "<td>"+value.keyword+"</td>";
				tbodyStr += "<td>"+value.ChemicalChnName+"</td>";
				tbodyStr += "<td>"+value.source+"</td>";
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
		url : 'json/chemical_stuff.json',
		data : {
			startDate : $('#datepicker_start').val(),
			endDate : $('#datepicker_end').val()
		}, success : function(response) {
			var ChemicalChnName;
			var no = {};
			var ToxChemi = {};
			var TCHemicalMaterials = {};
			var TFadenBook = {};
			var TNewChemiRegMgr = {};
			var TTobaccoIngredient = {};
			var TCosmeticProdict = {};
			var keywordCount = {};
			var beforekw = '';
			var count = 0;
			disChemicalMaterial = jQuery.unique( chemicalMaterial );
			console.log(disChemicalMaterial);
			var check = false;
				$.each(response, function(index, value) {
					count = 0;
					check = false;
					var nowdate = Number(value.publish_date.replace('-', '')
							.replace('-', ''));
					if ( Number(date[0]) <= nowdate
							&& Number(date[1]) >= nowdate ) {
								$.each(disChemicalMaterial, function(i, v) {
									if(v.ChemicalChnName == value.ChemicalChnName){
										count++;
											keywordCount[value.ChemicalChnName] = count;
											no[value.ChemicalChnName] = value.casno;
											ToxChemi[value.ChemicalChnName] = value.is_ToxChemi;
											TCHemicalMaterials[value.ChemicalChnName] = value.is_TCHemicalMaterials;
											TFadenBook[value.ChemicalChnName] = value.is_TFadenBook;
											TNewChemiRegMgr[value.ChemicalChnName] = value.is_TNewChemiRegMgr;
											TTobaccoIngredient[value.ChemicalChnName] = value.is_TTobaccoIngredient;
											TCosmeticProdict[value.ChemicalChnName] = value.is_TCosmeticProdict;
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
			(Object.keys(keywordCount)).forEach(function(keyword, i) {
				var tmp = {};
				tmp.keyword = keyword;
				tmp.no = no[keyword];
				tmp.newsNum = keywordCount[keyword];
				tmp.ToxChemi = (ToxChemi[keyword] == 't')?"是":"否";
				tmp.TCHemicalMaterials = (TCHemicalMaterials[keyword] == 't')?"是":"否";
				tmp.TFadenBook = (TFadenBook[keyword] == 't')?"是":"否";
				tmp.TNewChemiRegMgr = (TNewChemiRegMgr[keyword] == 't')?"是":"否";
				tmp.TTobaccoIngredient = (TTobaccoIngredient[keyword] == 't')?"是":"否";
				tmp.TCosmeticProdict = (TCosmeticProdict[keyword] == 't')?"是":"否";
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