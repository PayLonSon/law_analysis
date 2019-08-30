/* 
  js/FlowRelationController.js
  
  immediateFlow.html中的"廠商流向關聯圖" 
*/

/* 讀取廠商交易資料，繪製流向圖 */
function getFlowRelation(){
	$.ajax({
		type : "GET",
		dataType : "json",
		url : 'json/manufacturer_flow.json',
		success : function(response) {
      var treeData = [
      {
        "name": "A",
        "manufacturer":"南海股份有限公司",
        "behavior":"入倉",
        "status": "0",
        "parent": "null",
        "children": [
        {
         "name": "A",
         "manufacturer":"南海股份有限公司",
         "behavior":"出倉",
         "status": "0",
         "children": [
         {
          "name": "B",
          "manufacturer":"台灣華可貴股份有限公司中壢第二工廠",
          "behavior":"入倉",
          "status": "0",
          "children": 
          [
          {"name": "B","behavior":"儲存","manufacturer":"台灣華可貴股份有限公司中壢第二工廠","status": "0"}
          ]
        },
        {
          "name": "C","behavior":"入倉","manufacturer":"泰成電鍍有限公司","children": 
          [
          {"name":"C","behavior":"儲存","manufacturer":"泰成電鍍有限公司","status": "0"}
          ]
        },
        {
          "name":"D","behavior":"入倉","manufacturer":"申馳有限公司","children": 
          [
          {"name":"D","behavior":"儲存","manufacturer":"申馳有限公司","status": "0"}
          ]
        }
        ]
      },
      {"name": "A","behavior":"出倉","manufacturer":"南海股份有限公司","status": "1","storm":"1","children": []}
      ]
    }
    ];
    var treeData_error = [
    {
      "name": "A",
      "manufacturer":"南海股份有限公司",
      "status": "0",
      "parent": "null",
      "children": [
      {"name": "A","behavior":"出倉","manufacturer":"南海股份有限公司","status": "1","storm": "1","children": []}
      ]
    }
    ];
    var treeData_true = [
      {
        "name": "A",
        "manufacturer":"南海股份有限公司",
        "behavior":"入倉",
        "status": "0",
        "parent": "null",
        "children": [
        {
         "name": "A",
         "manufacturer":"南海股份有限公司",
         "behavior":"出倉",
         "status": "0",
         "children": [
         {
          "name": "B",
          "manufacturer":"台灣華可貴股份有限公司中壢第二工廠",
          "behavior":"入倉",
          "status": "0",
          "children": 
          [
          {"name": "B","behavior":"儲存","manufacturer":"台灣華可貴股份有限公司中壢第二工廠","status": "0"}
          ]
        },
        {
          "name": "C","behavior":"入倉","manufacturer":"泰成電鍍有限公司","children": 
          [
          {"name":"C","behavior":"儲存","manufacturer":"泰成電鍍有限公司","status": "0"}
          ]
        },
        {
          "name":"D","behavior":"入倉","manufacturer":"申馳有限公司","children": 
          [
          {"name":"D","behavior":"儲存","manufacturer":"申馳有限公司","status": "0"}
          ]
        }
        ]
      }
      ]
    }
    ];
  $("#tree").empty();
  if (global_status.length == 2) {
    drawFlowRelation(treeData);
  }else if(global_status.length == 1){
    if(global_status[0] == 0){
      drawFlowRelation(treeData_true);
    }else{
      drawFlowRelation(treeData_error);
    }
  }
}
});
}

/* 繪製流向圖 */
function drawFlowRelation(data) {
	var margin = {top: 20, right: 0, bottom: 20, left:50};
	var width = parseInt(d3.select('#tree').style('width'), 10) - margin.right - margin.left;
	var height = 200 - margin.top - margin.bottom;

	var i = 0,
	duration = 800,
	root;

	var tree = d3.layout.tree()
	.size([height, width]);

	var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("#tree").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	root = data[0];

	root.x0 = height / 2;
	root.y0 = 0;

	update(root);

	d3.select(self.frameElement).style("height", "800px");

	function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
  links = tree.links(nodes);
  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * parseInt(d3.select('#tree').style('width'), 10)/4; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
  .on("click", click)
  .on("mouseover",function(d,i){
    d3.select(this)
    .append("title")
    .text(d.manufacturer+" / "+d.behavior);
  })
  .on("mouseout",function(d,i){
    d3.select(this)
    .select("title")
    .remove();
  });

  nodeEnter.append("circle")
  .attr("r", 1e-6)
  .style("fill", function(d) { return d.status=="1" ? "#ccff99" : "#fff"; }) 
  //.style("fill", function(d) { console.log(d); if(d.status=="1"){ if(d.storm=="1"){return "#dc3545"}else{return "#fff";}}else{return"#fff"; }  })
  nodeEnter.append("text")
  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
  .attr("dy", ".35em")
  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
  .text(function(d) { return d.name; })
  .style("fill-opacity", 1e-6)
  .attr("class", function(d) {
  	if (d.url != null) { return 'hyper'; } 
  }) 
  ;

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
  .duration(duration)
  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
  .attr("r", 10)
  .style("fill", function(d) { console.log(d); return d.status=="1" ? "#dc3545" : "#fff"; })

  nodeUpdate.select("text")
  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
  .duration(duration)
  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
  .remove();

  nodeExit.select("circle")
  .attr("r", 1e-6);

  nodeExit.select("text")
  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
  .attr("class", "link")
  .style("fill", function(d) { return d.status=="1" ? "#dc3545" : "#fff"; })

  // Transition links to their new position.
  link.transition()
  .duration(duration)
  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
  .duration(duration)
  .attr("d", function(d) {
  	var o = {x: source.x, y: source.y};
  	return diagonal({source: o, target: o});
  })
  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
  	d.x0 = d.x;
  	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
	if (d.children) {
		d._children = d.children;
		d.children = null;
	} else {
		d.children = d._children;
		d._children = null;
	}
	update(d);
}


}
