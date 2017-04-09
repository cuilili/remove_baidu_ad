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
	while(element){
		console.log(element);
		if (element.parentNode == content_left) {
			var e = element.parentNode.removeChild(element);
			console.log(e);
		}
		element =element.parentNode;
	}
}

function run_code(){
	var result = find_ad_mark();
	var hit_count = 0;
	for (var i = result.length - 1; i >= 0; i--) {
		hidden_ad(result[i]);
		hit_count += 1
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
	}, 100);

	window.setTimeout(function(){
		window.clearInterval(inter)
	}, 2000);
}

main();
