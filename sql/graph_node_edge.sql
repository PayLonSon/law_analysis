-- graph_node.json
use [chemical]


SELECT C.[name],C.[group], D.[chName] 
FROM
(
	SELECT [name], count([name]) as [group]
	FROM 
	(
		SELECT [廠商上游] as [name]  FROM [dbo].[運作行為_base_class_part_part3]
		UNION ALL
		SELECT [廠商下游] as [name] FROM [dbo].[運作行為_base_class_part_part3]
	) AS A
	GROUP BY [name]
) AS C
LEFT JOIN 
(
	SELECT [name],(CASE WHEN [chName] is null THEN '未知' ELSE [chName] END) as [chName]
	FROM 
	(
		SELECT *, ROW_NUMBER() OVER(PARTITION BY [name] ORDER BY [chName] DESC) AS rk
		FROM 
		(
			SELECT [廠商上游] as [name], [廠商上游中文名稱] as [chName]  FROM [dbo].[運作行為_base_class_part_part3]
			UNION ALL
			SELECT [廠商下游] as [name], [廠商下游中文名稱] as [chName] FROM [dbo].[運作行為_base_class_part_part3]
		) AS A
	) AS B
	WHERE rk = 1
) AS D
ON C.[name] = D.[name]



-- graph_edge.json
use [chemical]

SELECT [廠商上游] as [upstream]
      ,[廠商下游] as [downstream]
	  ,(CASE WHEN [廠商上游中文名稱] is null THEN '未知' ELSE [廠商上游中文名稱] END) as [upstream_name]
	  ,(CASE WHEN [廠商下游中文名稱] is null THEN '未知' ELSE [廠商下游中文名稱] END) as [downstream_name]
      ,[transcation_class]
      ,[amount]
      ,[casno]
	  ,[化學物質中文名] as [cas]
      ,cast(cast([data_year] as int)+1911 as varchar(4))+'/'+[data_month] as [date]
  FROM [dbo].[運作行為_base_class_part_part3]
  ORDER BY date