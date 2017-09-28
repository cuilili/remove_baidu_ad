function find_ad_mark(){
	var all_span = document.getElementsByTagName('span');
	var result = new Array();
	for (var i = all_span.length - 1; i >= 0; i--) {
		var span = all_span[i];
		if (span.innerText == "广告") {
			result.push(span);
		}
	}
	return result;
}

function hidden_ad(mark_element){
	var content_left = document.getElementById("content_left");
	var element = mark_element;
	var count = 0;
	while(element){
		//console.log(element);
		if (element.parentNode == content_left) {
			var e = element.parentNode.removeChild(element);
			//console.log(e);
			count += 1;
		}
		element =element.parentNode;
	}
	return count;
}

function run_code(){
	var result = document.querySelectorAll("div[style='display:block !important;visibility:visible !important']")
	var ad_marks = find_ad_mark();
	result = ad_marks.concat(result);
	var hit_count = 0;
	for (var i = result.length - 1; i >= 0; i--) {
		hit_count = hidden_ad(result[i]);
	}
	if(hit_count > 0){
		chrome.runtime.sendMessage({
			'hit_count': hit_count
		}, null);
	}
}

function main(){
	run_code();
	var inter = window.setInterval(function(){
		run_code();
	}, 50);

	window.setTimeout(function(){
		window.clearInterval(inter)
	}, 5000);
}

main();
