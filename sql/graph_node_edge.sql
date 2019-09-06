-- graph_node.json
use [chemical]


SELECT C.[name],C.[group], D.[chName] 
FROM
(
	SELECT [name], count([name]) as [group]
	FROM 
	(
		SELECT [�t�ӤW��] as [name]  FROM [dbo].[�B�@�欰_base_class_part_part3]
		UNION ALL
		SELECT [�t�ӤU��] as [name] FROM [dbo].[�B�@�欰_base_class_part_part3]
	) AS A
	GROUP BY [name]
) AS C
LEFT JOIN 
(
	SELECT [name],(CASE WHEN [chName] is null THEN '����' ELSE [chName] END) as [chName]
	FROM 
	(
		SELECT *, ROW_NUMBER() OVER(PARTITION BY [name] ORDER BY [chName] DESC) AS rk
		FROM 
		(
			SELECT [�t�ӤW��] as [name], [�t�ӤW�夤��W��] as [chName]  FROM [dbo].[�B�@�欰_base_class_part_part3]
			UNION ALL
			SELECT [�t�ӤU��] as [name], [�t�ӤU�夤��W��] as [chName] FROM [dbo].[�B�@�欰_base_class_part_part3]
		) AS A
	) AS B
	WHERE rk = 1
) AS D
ON C.[name] = D.[name]



-- graph_edge.json
use [chemical]

SELECT [�t�ӤW��] as [upstream]
      ,[�t�ӤU��] as [downstream]
	  ,(CASE WHEN [�t�ӤW�夤��W��] is null THEN '����' ELSE [�t�ӤW�夤��W��] END) as [upstream_name]
	  ,(CASE WHEN [�t�ӤU�夤��W��] is null THEN '����' ELSE [�t�ӤU�夤��W��] END) as [downstream_name]
      ,[transcation_class]
      ,[amount]
      ,[casno]
	  ,[�ƾǪ��褤��W] as [cas]
      ,cast(cast([data_year] as int)+1911 as varchar(4))+'/'+[data_month] as [date]
  FROM [dbo].[�B�@�欰_base_class_part_part3]
  ORDER BY date