/* 
  js/graph.js
  
  DependencyGraph.html中的"廠商流向關係圖" 
  */

  /* 繪製依賴圖 */
  function drawGraph(){
   var width = parseInt(d3.select('#dependencyGraph').style('width'), 10),
   height = 500

   $("#dependencyGraph").empty();

   var svg = d3.select("#dependencyGraph").append("svg")
   .attr("width", width)
   .attr("height", height)
   .attr("pointer-events", "all")
   .append("svg:g")
   .attr("class", "frame")
   .call(d3.behavior.zoom().on("zoom", redraw))
   .append('svg:g');

   svg.append('svg:rect')
   .attr('width', width*10)
   .attr('height',height*10)
   .attr('x', -width*5 )
   .attr('y', -height*5 )
   .attr('fill', 'transparent');

   var normalize = function(val, max, min) { 
    var level = (max - min)/10;
    if(level == 0){
      return 1;
    } 
    for (var i = 1; i < 10; i++) {
      if(val < level*i){
        return i; 
      }
    }
    return 10; 
  }

  var groupBy = function( array , f ) {
    let groups = {};
    array.forEach( function( o ) {
      let group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );
    });
    return Object.keys(groups).map( function( group ) {
      return groups[group];
    });
  }

  function redraw() {
    svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
  }

  // 設定顏色, 線, 箭頭大小等範圍
  var linePale = d3.rgb(159,192,222);
  var lineDark = d3.rgb(2,23,62);
  var lineColor = d3.interpolate(linePale,lineDark);
  var lineLinear = d3.scale.linear().domain([0,9]).range([0, 1]);
  var lineSize = [3,10,20,30,50,60,70,80,90,100];
  var arrowSize = [20,20,20,20,20,40,40,40,40,40]

  var nodePale = d3.rgb(245,139,0);
  var nodeDark = d3.rgb(241,30,0);
  var nodeColor = d3.interpolate(nodePale,nodeDark);
  var nodeLinear = d3.scale.linear().domain([0,9]).range([0, 1]);
  var nodeSize = [10,12,14,16,20,25,30,35,40,45]

  var force = d3.layout.force()
  .gravity(.05)
  .distance(100)
  .charge(-100)
  .size([width, height]);


  d3.json("json/graph_node.json", function(node_json) {
    d3.json("json/graph_edge.json", function(link_json) {
		var link_data = [];
        var node_data = [];
        var unique_node = [];
		console.log(link_json);
        // 依條件過濾資料
        $.each(link_json, function(index, value) {
			  
			link_data.push(value);
            unique_node.push((value.upstream).toString());
            unique_node.push((value.downstream).toString());
          
        });
        unique_node = unique_node.filter(onlyUnique);

        $.each(node_json, function(index, value) {
          if(unique_node.includes((value.name).toString())){
            node_data.push(value)
          }
        });

        // 排序資料，建立資料表資訊
        var link_data_sorted = link_data.sort(compareCasDate);
        var tableStr = ""
        $.each(link_data_sorted, function(index, value) {
          tableStr += '<tr>';
          tableStr += '<td>'+value.cas+"<br>("+value.casno+')</td>';
          tableStr += '<td>'+value.date+'</td>';
          tableStr += '<td>'+value.upstream_name+"("+value.upstream+')</td>';
          tableStr += '<td>'+value.downstream_name+"("+value.downstream+')</td>';
          tableStr += '<td>'+value.transcation_class+'</td>';
          tableStr += '<td>'+value.amount+'(kg)</td>';
          tableStr += '</tr>';
        });
        $('.dependencyTable tbody').html(tableStr); //*/
        // 做資料格式處理
        var valueKey = {};
        var keyValue = {};
        var edge_data = []
        
        $.each(node_data, function(index, value){
          valueKey[value.name] = index;
          keyValue[index] = value.name;
        });

        var max = Math.max.apply(Math, node_data.map(function(o) { return o.group; }));
        var min = Math.min.apply(Math, node_data.map(function(o) { return o.group; }));
        $.each(node_data, function(index, value){
          var lv = normalize(node_data[index].group, max, min)-1;
          node_data[index].groupSize = nodeSize[lv];
		  if(value.status =="N"){
			  node_data[index].color = "#f11e00";
		  }else if(value.status =="Y"){
			  node_data[index].color = "#8bc34a";
		  }else{
			  node_data[index].color = "#1a7ed5";
		  }
        });

			console.log(link_data);
        $.each(link_data, function(index, value){
          link_data[index]["upstream"] = valueKey[link_data[index]["upstream"]];
          link_data[index]["downstream"] = valueKey[link_data[index]["downstream"]];
        });

        max = Math.max.apply(Math, link_data.map(function(o) { return o.amount; }));
        min = Math.min.apply(Math, link_data.map(function(o) { return o.amount; }));
        let path_sorted = groupBy(link_data, function(item){
          
          return [item.upstream, item.downstream];
        });
        $.each(path_sorted, function(index, value) {
			
          // console.log(value);
          var dataStr = "";
          var tmp_amount = 0;
          var tmp = {"使用量":0,"貯存量":0,"買入量":0,"製造量":0,"廢棄量":0,"賣出":0,"輸入量":0,"輸出量":0};
          $.each(value, function(i, v) {
            tmp[v.transcation_class] += v.amount;
            tmp_amount += v.amount;
          });
          
         // dataStr += '上游廠商:   '+value[0].upstream_name+"("+keyValue[value[0].upstream]+')\n';
         // dataStr += '下游廠商:   '+value[0].downstream_name+"("+keyValue[value[0].downstream]+')\n';
          $.each(tmp, function(i, v) {
            
              dataStr += i+":\t"+v.toLocaleString()+" (kg)\n";
            
          });
          var lv = normalize(tmp_amount, max, min)-1;
		  //console.log(value[0]);
          edge_data.push({"source":value[0].upstream,"target":value[0].downstream,"color":lineColor(lineLinear(lv)),"arrowSize":arrowSize[lv],"weight":lineSize[lv],"data":dataStr});
        });


        force
        .nodes(node_data)
        .links(edge_data)
        .start();

        // 箭頭
        var color_only = removeDuplicates(edge_data, "color");
        var defs = svg.append("defs");

        var arrowMarker = defs.selectAll("marker")
        .data(color_only)
        .enter().append("marker")
        .attr("id", function(d){ return "arrow"+d.color; })
        .attr("markerUnits","userSpaceOnUse")
        .attr("markerWidth", function(d){ return d.arrowSize; })
        .attr("markerHeight", function(d){ return d.arrowSize; })
        .attr("viewBox","0 0 12 12")
        .attr("refX","12")
        .attr("refY","6")
        .attr("orient","auto")
        .append("path")
        .attr("d","M2,2 L13,6 L2,10 V2,2")
        .attr("fill", function(d){ return d.color; });


        var link = svg.selectAll(".link")
        .data(edge_data)
        .enter().append("line")
        .attr("class", "link")
        .attr("marker-end",function(d){ return "url(#arrow"+d.color+")"})
        .style("stroke-width", function(d) { return Math.sqrt(d.weight); })
        .style("stroke", function(d) { return d.color; })
        .on("mouseover",function(d,i){
          d3.select(this)
          .append("title")
          .text(d.data);
        })
        .on("mouseout",function(d,i){
          d3.select(this)
          .select("title")
          .remove();
        });

        var node = svg.selectAll(".node")
        .data(node_data)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

        //node.append("circle")
		node.append("text")
		.text("NNN給我資料")
        //.attr("r", function(d) { return d.groupSize; })
        //.attr("fill", function(d) { return d.color; })
        .on("mouseover",function(d,i){
          d3.select(this)
          .append("title");
          //.text('廠商:   '+d.chName+"\n"+'統編:   '+(d.name).toString()+"\n"+'交易廠商數:   '+d.group.toLocaleString()+" 間");
        })
        .on("mouseout",function(d,i){
          d3.select(this)
          .select("title")
          .remove();
        }).on("click",function(d,i){
			$( "#company-filter" ).html("分析條件 : <a style='cursor: pointer;' onclick='refresh();'>左側查詢條件</a> > "+d.chName);
			global_company=[d.chName];
			drawGraph();
        });

        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
      });
});
	//sortTable2($("#datatable"),"desc");
}

/* 
  自訂排序函式，依風險值排序
  */
  function compareCasDate(a,b) {
    if (a.cas > b.cas){
      return -1;
    }else if (a.cas < b.cas){
      return 1;
    }else{
      if (a.date > b.date){
        return -1;
      }else if (a.date < b.date){
        return 1;
      }else{
        return 0;
      }
    }
  }
  
  function refresh() {
								$( "#company-filter" ).html("分析條件 : <a style='cursor: pointer; ' onclick='refresh();'>左側查詢條件</a> ");
								global_casno = $('#cas-search').val();
								global_action = $('#action-search').val();
								global_company = $('#company-search').val();
								drawGraph();
							}