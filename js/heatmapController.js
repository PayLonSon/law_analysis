/* 
  js/heatmapController.js
  
  HeatMap.html中的"TGOS地圖" 
*/

 var mapDiv, map;
 var CustomLayer = function (map) {
  this.width = 960;
  this.height = 700;
  map.setZoom(13);
  map.setCenter(new TGOS.TGPoint(120.5059053, 24.23182));
  mapOpts = {
    dbClickZoomIn: false,
    scrollwheel: false
  };
  map.setOptions(mapOpts);
  this.setMap(map);
}
CustomLayer.prototype = new TGOS.TGOverlayView();
var layer = "";
var data = null;
CustomLayer.prototype.onAdd = function () {
  var panes = this.getPanes();
  var mapLayer = panes.overlayviewLayer;
  this.mSRS = this.map.getCoordSys();
  this.div = document.createElement("div");
  this.div.id = "d3Div";
  this.div.style.position = "absolute";
  this.div.style.width = "100%";
  this.div.style.height = "100%";
  this.div.className = "stations";
  this.div.style.zIndex = 1000;
  mapLayer.appendChild(this.div);
  var width = this.width,
  height = this.height;
  layer = d3.select("#d3Div");
}

/* 讀取全域變數global_air_data */
CustomLayer.prototype.onDraw = function () {
  var TOGSData = global_air_data;
  var proj = this.getProjection();
  var padding = 16;
  var pWidth = 20, pHeight = 20;
  var color = d3.scale.category10();
  var colorScale = ["#28a745", "#ffc107", "#dc3545"];
  var cellSize = 17;

  var marker = layer.selectAll("svg")
  .data(d3.entries(TOGSData))
  .each(transform)
  .enter().append("svg")
  .each(transform)
  .attr({
    "class": "marker",
    "width": cellSize,
    "height": cellSize
  })
  .style("cursor", "pointer")
  .append("rect")
  .attr('class', 'cell')
  .attr('width', cellSize)
  .attr('height', cellSize)
  .attr('fill', function(d,i) { return colorScale[riskLevelbyVal(d.value.data_score)]; })
  .attr('fill-opacity', "0.8")
  .on("click",function(d,i){
    if($(this).hasClass("clicked")){
      $(".tmp").fadeOut();
      $(".global").show();
      $(".cell").removeClass("clicked");
    }else{
      getSpecificData(d.value.data_circle_id);

      $(".cell").removeClass("clicked");
      $(this).addClass("clicked");
      $(".global").hide();
      $(".tmp").show();
    }
  });
  
  function transform(d) {
    var pt = new TGOS.TGPoint(d.value.data_lon_center,d.value.data_lat_center);
    var p = proj.fromMapToDiv(pt);
    return d3.select(this)
    .style("left", (p.x - padding) + "px")
    .style("top", (p.y - padding) + "px");
  }
}

CustomLayer.prototype.onRemove = function () {
  this.div.parentNode.removeChild(this.div);
  this.div = null;
}

function riskLevelbyVal(score){
  if (score < global_levelNum[0]) {
    return 0;
  }else if (score < global_levelNum[1]) {
    return 1;
  }else{
    return 2;
  }
}

/* 生成TGOS地圖 */
function mapCreate() {
  mapDiv = document.getElementById("mapDiv");
  map = new TGOS.TGOnlineMap(mapDiv, TGOS.TGCoordSys.EPSG3857);
  var customLayer1 = new CustomLayer(map);
}

/* 實現"滑動熱點圖及時呈現資訊"功能 */
function getSpecificData(data_circle_id){
  $.ajax({
    type : "GET",
    dataType : "json",
    async : false,
    url : 'json/air_pollution_manufacturer.json',
    success : function(response) {
      var manufacturerData = []
      var categoriesArr = {};
      var totalArr = [0,0,0];
      var total = 0;

      $.each(response, function(index, value) {
        if(data_circle_id === value.data_circle_id){
          value.riskLevel = riskLevel(value.data_score, global_levelNum);

          manufacturerData.push(value);

          if (!categoriesArr.hasOwnProperty(value.categories)) {
            categoriesArr[value.categories] = [0,0,0];
          }
          categoriesArr[value.categories][value.riskLevel[0]] +=1;
          totalArr[value.riskLevel[0]] += 1;
          total++;
        }
      });
      // 設置資料表
      setManufacturerDataTable(manufacturerData, "#datatable_tmp");
      // 廠商TABLE
      setCategoriesTable(categoriesArr, total, "#categoriesTable_tmp");
      // pie chart
      setPieChart(totalArr, total, "#pieChart_tmp");
    }
  });
}