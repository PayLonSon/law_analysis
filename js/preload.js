/*
	js/preload.js

	載入常用函示
*/

/* 移除Object中重複的值 */
function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

/* 顏色轉換數字 */
function transformColor(color) {
	if(color == "紅") {
		return 3;
	}else if(color == "黃"){
		return 2;
	}else{
		return 1;
	}
}

/* 控制浮點數 */
function formatFloat(num, pos)
{
	var size = Math.pow(10, pos);
	return Math.round(num * size) / size;
}

/* 資本額轉換成級距代碼 */
function transformCapital(capital) {
	if(capital < 5000*1000000){
		return 0;
	}else if(capital < 10000*1000000){
		return 1;
	}else if(capital < 15000*1000000){
		return 2;
	}else if(capital < 20000*1000000){
		return 3;
	}else if(capital < 45000*1000000){
		return 4;
	}else if(capital < 60000*1000000){
		return 5;
	}else if(capital < 75000*1000000){
		return 6;
	}else if(capital < 95000*1000000){
		return 7;
	}else{
		return 8;
	}
}

function transformStatus(status){
	return status == "正常"?0:1;
}

function transformBehavior(behavior){
	if (behavior == "儲存") {
		return 1;
	}else if(behavior == "入倉"){
		return 2;
	}else if(behavior == "出倉"){
		return 3;
	}else{
		console.log("error");
	}
}

function onlyUnique(value, index, self) { 
	return self.indexOf(value) === index;
}
