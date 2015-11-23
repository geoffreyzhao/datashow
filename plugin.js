// 转换数字为字符串   添加','分隔符
;(function($){

	$.fn.extend({
		convtMoney: function() {
			return this.each(function(){

				var $this = $(this);

				if ($this.html() == "" || isNaN($this.html())) {
					return;
				} else {
					var str = $this.html(),
						arr = str.split('').reverse(),
						result = [];

					for(var i = arr.length; i > 0; i--) {
						if (i % 3 == 0 && i != arr.length) {
							result.push(',');
						}
						result.push(arr[i-1]);
					}
					$this.html(result.join(""));
				}
			});

		}
	});
})(jQuery);


// 数字翻动
function AniScrollNum($ele, number) {
	this.$ele = $ele;
	this.number = number;
	this.ul_str = "<ul><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>" 
				+ "<li>6</li><li>7</li><li>8</li><li>9</li></ul>";
	this.spe_str = "<div class='separator'>,</div>";
};

AniScrollNum.prototype = {
	init: function() {
		this.render();
		return this;
	},
	render: function() {
		var $ele = this.$ele,
			number = this.number,
			arr = (number + "").split(""),
			ul_str = this.ul_str,
			spe_str = this.spe_str,
			html_str = "";

		$ele.addClass("ani-scroll-num");

		for (var i = 0; i < arr.length; i++) {
			if (i != 0 && (arr.length - i) % 3 == 0) {
				html_str += spe_str;
			}
			html_str += ul_str;
		}
		$ele.append(html_str);	// 生成DOM结构
		this.updateAni($ele, arr);	// 生成定位信息，添加动态
	},
	updateAni: function($ele, arr) {
		for (var i = 0; i < arr.length; i++) {
			$ele.find("ul").eq(i).find("li").each(function(){
				$(this).removeClass("current");
				if ($(this).html() == arr[i]) {
					$(this).addClass("current");
				}
			});
		}

		$ele.find("ul").each(function(){
			var $this = $(this),
				$lis = $this.find("li"),
				h = $ele.find("li").eq(0).outerHeight();

			for (var i = 0; i < $lis.length; i++) {
				if ($($lis[i]).hasClass("current")) {

					var $that = $($lis[i]);
					$that.css({
						top: 0 + 'px' 
					});

					$that.prevAll('li').each(function(index){
						$(this).css({
							top: -(index + 1) * h + 'px'
						});
					});

					$that.nextAll('li').each(function(index){
						$(this).css({
							top: (index + 1) * h + 'px'
						});
					});
				}
			}
		});
	},
	setNum: function(num) {
		var	$ele = this.$ele,
			old_num = this.getNum(),
			old_num_arr = (old_num + "").split(""),
			ul_str = this.ul_str,
			spe_str = this.spe_str,
			arr = (num + "").split("");

		if (arr.length > old_num_arr.length) {  //  递增时发生了进位，需重新生成DOM结构
			$ele.html("");	//  清除原来的html结构

			var html_str = "";
			for (var i = 0; i < arr.length; i++) {

				if (i != 0 && (arr.length - i) % 3 == 0) {
					html_str += spe_str;	
				}
				html_str += ul_str;
			}

			$ele.append(html_str);
		}

		this.updateAni($ele, arr);
		return this;
	},
	getNum: function() {
		var $ele = this.$ele,
			number = this.number,
			num_arr = [];

		$ele.find("li.current").each(function(){
			num_arr.push($(this).html());
		});

		return parseInt(num_arr.join(""));
	}
};