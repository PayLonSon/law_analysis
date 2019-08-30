//取得公告
function getNews(getNewsType,currentPage)
{
	var DataSet;
	var getNewsWebFun;
	if(getNewsType==1)
		getNewsWebFun = "News/getSystemNews";
	else if(getNewsType==2)
		getNewsWebFun = "News/getCommonNews";
	
	$.ajax({
		url: 'http://localhost:8080/ChemiCloud/WS/' + getNewsWebFun,
		type: "POST",
		async: false, // set to false if you don't mind the page pausing while waiting for response
		dataType: "json",
		crossDomain: true,
		data: 
		JSON.stringify({
			//當前頁
            "currentPage": currentPage,
            //分頁筆數
            "pageRowsCount": 5
        }),
		contentType: "application/json; charset=utf-8",
		beforeSend:function(){     
			//ajaxLoading("初始化中，請稍後…");
		},
		complete: function() {     
			//ajaxFinished(); 
		},
		success: function(data) 
		{
			DataSet = data;
		},
		error: function (result, status) {
			if (status == 'error') {
				//ajaxFinished(); 
				alert('Web Service server error.');
			}
		}
	});	
	CreateNewsView(getNewsType,currentPage,DataSet);
}

//畫公告畫面  type= 1:系統,2:一般
function CreateNewsView(type,currentPage,DataSet)
{
	var divNew;
	var nameclass;
	var NewsTypeText;
	var NewsTypePaged;
	var currentPageNow = currentPage;
	var createTableFuncName = "getNews";
	if(type==1)
	{
		divNews = document.getElementById("SystemNews");
		nameclass = "label label-pink arrowed-right";
		NewsTypeText = "系統公告";
		NewsTypePaged = "SystemNewsPaged";
	}
	else if(type==2)
	{
		divNews = document.getElementById("CommonNews");
		nameclass = "label label-success arrowed-right";
		NewsTypeText = "一般公告";
		NewsTypePaged = "CommonNewsPaged";
	}
	//移除原本分頁的資料
	while (divNews.firstChild) {
		divNews.removeChild(divNews.firstChild);
	}
	
	for(var i=0; i<DataSet.dataListSet.length; i++)
	{
		var itemdiv = divNews.appendChild(document.createElement("div"));
		itemdiv.setAttribute("class", "itemdiv commentdiv");
		var bodydiv = itemdiv.appendChild(document.createElement("div"));
		bodydiv.setAttribute("class", "body");
		bodydiv.setAttribute("style", "margin-left:20px");
		
		var namediv = bodydiv.appendChild(document.createElement("div"));
		var timediv = bodydiv.appendChild(document.createElement("div"));
		var textdiv = bodydiv.appendChild(document.createElement("div"));
		
		namediv.setAttribute("class", "name");
		var namespan = namediv.appendChild(document.createElement("span"));
		namespan.setAttribute("class", nameclass);
		namespan.innerText = NewsTypeText;
		
		timediv.setAttribute("class", "time");
		var timespan = timediv.appendChild(document.createElement("span"));
		timespan.setAttribute("class", "badge badge-light");
		timespan.innerText = DataSet.dataListSet[i]["DateRange"];
		
		textdiv.setAttribute("class", "text");
		var texti = textdiv.appendChild(document.createElement("i"));
		texti.setAttribute("class", "blue icon-cog");
		var textb = textdiv.appendChild(document.createElement("b"));
		var textspanTitle = textb.appendChild(document.createElement("span"));
		textspanTitle.innerText = DataSet.dataListSet[i]["NewsTitle"];
		var textp = textdiv.appendChild(document.createElement("p"));
		var textspanContent = textp.appendChild(document.createElement("span"));
		textspanContent.innerText = DataSet.dataListSet[i]["NewsContent"];
	}
	//↓↓↓↓↓↓↓↓↓ 建立「資料列表」分頁。↓↓↓↓↓↓↓↓↓
	var divTablePaged = document.getElementById(NewsTypePaged);
	//移除原分頁的page列
	while (divTablePaged.firstChild) {
		divTablePaged.removeChild(divTablePaged.firstChild);
	}

	var divPaged = document.createElement("div");
	divPaged.setAttribute("id", "divPagedId");
	divPaged.setAttribute("class", "pagination");

	// set Table Paged Style.
	var ul_class = "pagination";
	var ul_style = "";
	
	var tagUl = document.createElement("ul");
	tagUl.setAttribute("id", "resultTablePaged");
	
	if(DataSet.totalPages > 10)
	{
		//↓↓↓↓↓↓↓↓↓ DataSet.totalPages > 10 ↓↓↓↓↓↓↓↓↓
		//取得當前頁碼 - 5。
		var currentPageSub = currentPageNow - 5;
		//取得當前頁碼 + 4。
		var currentPageAdd = currentPageNow + 4;
		
		//判定 (第一頁)、(前一頁)、(...)、中間頁碼數(十筆)、(...)、(後一頁)、(最末頁)
		if(currentPageNow == 1) //要有 中間頁碼數(十筆)、(...)、(後一頁)、(最末頁)
		{
			//定義 中間頁碼數(十筆)
			for (i=1 ; i <= 10 ; i++)
			{
				setCcPagedForEach(createTableFuncName, i, tagUl, type, currentPage, divPaged);
			}
			
			//定義 (...)
			setCcPagedDot(createTableFuncName, tagUl, divPaged);
			
			//定義 (後一頁)
			setCcPagedNext(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (最末頁)
			setCcPagedLast(createTableFuncName, tagUl, type, currentPage, DataSet, divPaged);
		}
		else if(currentPageNow > 1 && currentPageNow <= 6)  //要有 (前一頁)、中間頁碼數(十筆)、(...)、(後一頁)、(最末頁)
		{
			//定義 (前一頁)
			setCcPagedPrev(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 中間頁碼數(十筆)
			for (i=1 ; i <= 10 ; i++)
			{
				setCcPagedForEach(createTableFuncName, i, tagUl, type, currentPage, divPaged);
			}
			
			//定義 (...)
			setCcPagedDot(createTableFuncName, tagUl, divPaged);
			
			//定義 (後一頁)
			setCcPagedNext(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (最末頁)
			setCcPagedLast(createTableFuncName, tagUl, type, currentPage, DataSet, divPaged);
		}
		else if(currentPageNow > 6 && currentPageNow < DataSet.totalPages - 4) //要有 (第一頁)、(前一頁)、(...)、中間頁碼數(十筆)、(...)、(後一頁)、(最末頁)
		{
			//定義 (第一頁)
			setCcPagedFirst(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (前一頁)
			setCcPagedPrev(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (...)
			setCcPagedDot(createTableFuncName, tagUl, divPaged);
			
			//定義 中間頁碼數(十筆)
			for (i=currentPageSub ; i <= currentPageAdd ; i++)
			{
				setCcPagedForEach(createTableFuncName, i, tagUl, type, currentPage, divPaged);
			}
			
			//定義 (...)
			setCcPagedDot(createTableFuncName, tagUl, divPaged);
			
			//定義 (後一頁)
			setCcPagedNext(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (最末頁)
			setCcPagedLast(createTableFuncName, tagUl, type, currentPage, DataSet, divPaged);
		}
		else if(currentPageNow >= DataSet.totalPages - 4 && currentPageNow < DataSet.totalPages)  //要有 (第一頁)、(前一頁)、(...)、中間頁碼數(十筆)、(後一頁)
		{
			//定義 (第一頁)
			setCcPagedFirst(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (前一頁)
			setCcPagedPrev(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (...)
			setCcPagedDot(createTableFuncName, tagUl, divPaged);
			
			//定義 中間頁碼數(十筆)
			for (i= (DataSet.totalPages - 9) ; i <= DataSet.totalPages ; i++)
			{
				setCcPagedForEach(createTableFuncName, i, tagUl, type, currentPage, divPaged);
			}
			
			//定義 (後一頁)
			setCcPagedNext(createTableFuncName, tagUl, type, currentPage, divPaged);
		}
		else if(currentPageNow == DataSet.totalPages)  //要有 (第一頁)、(前一頁)、(...)、剩下頁碼數(十筆)
		{
			//定義 (第一頁)
			setCcPagedFirst(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (前一頁)
			setCcPagedPrev(createTableFuncName, tagUl, type, currentPage, divPaged);
			
			//定義 (...)
			setCcPagedDot(createTableFuncName, tagUl, divPaged);
			
			//定義 剩下頁碼數(低於十筆)
			for (i= (DataSet.totalPages - 9) ; i <= DataSet.totalPages ; i++)
			{
				setCcPagedForEach(createTableFuncName, i, tagUl, type, currentPage, divPaged);
			}
		}
		//↑↑↑↑↑↑↑↑↑ DataSet.totalPages > 10 ↑↑↑↑↑↑↑↑↑
	}
	else if(DataSet.totalPages > 0 && DataSet.totalPages <= 10)
	{
		//↓↓↓↓↓↓↓↓↓ DataSet.totalPages > 0 && DataSet.totalPages <= 10 ↓↓↓↓↓↓↓↓↓
		//定義前一頁
		if(currentPageNow > 1)
		{
			setCcPagedPrev(createTableFuncName, tagUl, type, currentPage, divPaged);
		}
		
		//定義每一頁頁碼
		for (i=1 ; i <= DataSet.totalPages ; i++)
		{
			setCcPagedForEach(createTableFuncName, i, tagUl, type, currentPage, divPaged);
		}
		
		//定義後一頁
		if(currentPageNow < DataSet.totalPages)
		{
			setCcPagedNext(createTableFuncName, tagUl, type, currentPage, divPaged);
		}
		//↑↑↑↑↑↑↑↑↑ DataSet.totalPages > 0 && DataSet.totalPages <= 10 ↑↑↑↑↑↑↑↑↑
	}

	divTablePaged.appendChild(divPaged);
	//↑↑↑↑↑↑↑↑↑ 建立「資料列表」分頁。↑↑↑↑↑↑↑↑↑
	
}

//↓↓↓↓↓↓↓↓↓ 建立資料清單分頁資訊 ↓↓↓↓↓↓↓↓↓
var li_style = "cursor: pointer;";
//定義第一頁
function setCcPagedFirst(createTableFuncName, tagUl, type, currentPage, divPaged)
{
  var tagFirstPageLi = tagUl.appendChild(document.createElement("li"));
  tagFirstPageLi.setAttribute("style", li_style);
  var tagFirstPageA = tagFirstPageLi.appendChild(document.createElement("a"));
  
  currentPage = 1;
  var onclickNextValue = createTableFuncName +"("+type+","+currentPage+ ");";
  tagFirstPageA.setAttribute("onclick", onclickNextValue);
  tagFirstPageA.innerText = "<<";
  // Append Paged into div.
  divPaged.appendChild(tagUl);
}

//定義前一頁
function setCcPagedPrev(createTableFuncName, tagUl, type, currentPage, divPaged)
{
  var tagPrevLi = tagUl.appendChild(document.createElement("li"));
  tagPrevLi.setAttribute("style", li_style);
  var tagPrevA = tagPrevLi.appendChild(document.createElement("a"));
  
  currentPage = currentPage - 1;
  var onclickPrevValue =  createTableFuncName +"("+type+","+currentPage+ ");";
  tagPrevA.setAttribute("onclick", onclickPrevValue);
  tagPrevA.innerText = "<";

  // Append Paged into div.
  divPaged.appendChild(tagUl);
}

//定義每一頁頁碼內容
function setCcPagedForEach(createTableFuncName, i, tagUl, type, currentPage, divPaged)
{
  var tagLi = tagUl.appendChild(document.createElement("li"));
  tagLi.setAttribute("id", "li_Paged_num" + i);
  //當前頁需要顯示被點選樣式。
  if(currentPage == i)
  {
	  tagLi.setAttribute("class", "active");
  }
  tagLi.setAttribute("style", li_style);
  
  var tagA = tagLi.appendChild(document.createElement("a"));
  
  if(currentPage != i)
  {
	  currentPage = i;
      var onclickValue = createTableFuncName +"("+type+","+currentPage+ ");";
      tagA.setAttribute("onclick", onclickValue);
  }
  tagA.innerText = i;

  // Append Paged into div.
  divPaged.appendChild(tagUl);
}

//定義後一頁
function setCcPagedNext(createTableFuncName, tagUl, type, currentPage, divPaged)
{
  var tagNextLi = tagUl.appendChild(document.createElement("li"));
  tagNextLi.setAttribute("style", li_style);
  var tagNextA = tagNextLi.appendChild(document.createElement("a"));
  
  currentPage = currentPage + 1;
  var onclickNextValue = createTableFuncName +"("+type+","+currentPage+ ");";
  tagNextA.setAttribute("onclick", onclickNextValue);
  tagNextA.innerText = ">";

  // Append Paged into div.
  divPaged.appendChild(tagUl);
}

//定義 (最末頁)
function setCcPagedLast(createTableFuncName, tagUl, type, currentPage, resultData, divPaged)
{
  var tagLastPageLi = tagUl.appendChild(document.createElement("li"));
  tagLastPageLi.setAttribute("style", li_style);
  var tagLastPageA = tagLastPageLi.appendChild(document.createElement("a"));
  
  currentPage = resultData.totalPages;
  var onclickLastValue = createTableFuncName +"("+type+","+currentPage+ ");";
  tagLastPageA.setAttribute("onclick", onclickLastValue);
  tagLastPageA.innerText = ">>";
  // Append Paged into div.
  divPaged.appendChild(tagUl);
}

//定義(...)
function setCcPagedDot(createTableFuncName, tagUl, divPaged)
{
  var tagDotLi = tagUl.appendChild(document.createElement("li"));
  tagDotLi.setAttribute("class", "disabled ");
  tagDotLi.setAttribute("style", li_style);
  var tagDotA = tagDotLi.appendChild(document.createElement("a"));
  tagDotA.innerText = "...";
  // Append Paged into div.
  divPaged.appendChild(tagUl);
}
//↑↑↑↑↑↑↑↑↑ 建立資料清單分頁資訊 ↑↑↑↑↑↑↑↑↑

function openLogin()
{
	$.blockUI({
		message: $('#login-box'),
		css: {
			width: "300px",
			marginLeft: "-50px",
			border: 'none',
			top: '10%',
			backgroundColor: '#fff',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px',
			'border-radius': '10px',
			opacity: 1.0,
			color: '#000'
		}, 
		// 背景圖層
		overlayCSS:  { 
			backgroundColor: '#000', 
			opacity: 0.6
		},
		// 淡出的時間.單位為毫秒 
		fadeOut:  400
	});
}