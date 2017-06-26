
//客户端传参识别，close_lazyload 可由客户端在<head>内插入<script></script>代码来定义
if(typeof close_lazyload == 'undefined'){
	//图片懒加载开关
	close_lazyload = false;
}

//
var img_type = "origin", //默认图片类型-原图
	imgs = [],
	article,
	store = [], //lazyload剩余图片库存
	offset = 100, //图片lazyload默认偏移量
	clicked_toggle_img_btn = false; //标记加载大图事件是否来源于“一键切换大图按钮”

/**
* 从小图/无图状态点击时加载大图
* @param {object} parent 图片容器
*/
function show_large_image(parent) {
	var is_offline = has_elt_class(parent, "offline");
	
	if (is_offline) {
		del_elt_class(parent, "thumb");
		del_elt_class(parent, "offline");
	}
	add_elt_class(parent, "loading");
	
	var img = null,
		img_a = parent.querySelectorAll('img');

	if (img_a.length > 0) {
		img = img_a[0];
	}

	if ( img ) {
		var n = null;
		if (img_a.length > 1) {
			n = img_a[1];
		}
		if ( n ){
			return;
		}
		// remove thumb img if it's not compelete
		if (img.naturalWidth == 0) {
			parent.removeChild(img);
		}
	}

	var index = parent.getAttribute("ss_index"),
		h = parent.getAttribute("s_height"),
		w = parent.getAttribute("s_width"),
		//src_path = parent.getAttribute("zip_src_path"),
		src_path = parent.getAttribute("src_path"),//******add******
		src = src_path,
		t = document.createElement('div');
			
	t.innerHTML = "<img onload='appendimg.call(this)' style='display:none' onerror='errorimg.call(this)' src='"+src+"' alt_src='"+src+"' width='1' height='1'/>";
	var o = t.firstElementChild;
	t.removeChild(o);
	parent.appendChild(o);
	
	if (!is_offline) {
		var spinner = document.createElement("i");
		spinner.className = 'spinner';
		parent.appendChild(spinner);
	}

	unbind_loadOriginImg_trigger(parent);
}

/**
* 点击“小图/无图”加载“origin原图”事件处理函数
* @param {object} e 点击事件event对像
*/
function loadOriginImg_handler(e){
	var that = this;

	setTimeout(function(){
		show_large_image(that);
	}, 100);
	
	e.preventDefault();
}

/**
* 绑定点击“小图/无图”加载“origin原图”事件
* @param {object} a 图片链接
*/
function bind_loadOriginImg_trigger(a) {
	a.addEventListener("click", loadOriginImg_handler, false);
}

/**
* 取消绑定点击“小图/无图”加载“origin原图”事件
* @param {object} a 图片链接
*/
function unbind_loadOriginImg_trigger(a) {
	a.removeEventListener("click", loadOriginImg_handler, false);

}

/**
* 图片加载回调 —— 由客户端调用
* 当img的src以getimage/xxx（xxx取值origin/thumb）等形式进行获取时，客户端先从缓存中获取，失败时会触发img的errorimg事件，
* 但是，此时客户端会进一步去下载该图片，下载成功后通过image_load_cb 修改当前<img>元素。
* 所以，在img的errorimg事件中一定不能手动删除加载失败的<img>节点。
*
* @param {number} i 图片索引
* @param {boolean} ok 是否成功
* @param {boolean} is_large 是否为大图
*/
function image_load_cb(i, ok, is_large) {
	if (i < 0 || i >= imgs.length){
		return;
	}

	var parent = imgs[i],
		img_a = parent.querySelectorAll('img'),
		_this = null;

	if (img_a.length > 0) {
		_this = img_a[0];
	}

	if (! _this){
		return;
	}

	var large_img = null;
	if (img_a.length > 1) {
		large_img = img_a[1];
	}

	//var src_path = parent.getAttribute("zip_src_path");
	var src_path = parent.getAttribute("src_path");//******add******
	var thumb_path = parent.getAttribute("thumb_path");//******add******
	if (large_img ) {
		if (is_large) {
			if (ok) {
				var src = src_path;
				large_img.setAttribute("src", src);
			} else {
				parent.removeChild(large_img);
			}
		} else {
			if (ok) {
				var src = thumb_path;
				_this.setAttribute("src", src);
			}
		}
		return;
	}

	var offline = false;

	var src = src_path;
	if (ok) {
		_this.setAttribute("src", src);
	} else {
		del_elt_class(parent, "loading");
	}
};

/**
* 图片加载成功后处理
*/
function appendimg(){
	var parent = this.parentNode,
		s_w = parent.getAttribute("s_width"),
		s_h = parent.getAttribute("s_height"),
		t_w = parent.getAttribute("t_width"),
		t_h = parent.getAttribute("t_height"),
		n_w = this.naturalWidth,
		n_h = this.naturalHeight,
		o_w = this.width,
		o_h = this.height,
		is_large = false;

	if (o_w == s_w && o_h == s_h) {
		is_large = true;

		if (this.getAttribute("width") != s_w ) {
			//适用场景：点小图看大图，大图加载成功，把图片容器调整到合适尺寸
			parent.style.width = s_w + "px";
			parent.style.height = s_h + "px";
		}

		del_elt_class(parent, "thumb");
		del_elt_class(parent, "offline");

		unbind_loadOriginImg_trigger(parent);
	} else if (n_w > 0 && n_h > 0) {
		var maxWidth = article.offsetWidth,
			_wh = adjust_origin_scale_big(n_w, n_h, maxWidth);
		parent.style.width = _wh.w + "px";
		parent.style.height = _wh.h + "px";
		if(o_w == t_w&& o_h == t_h){
			parent.style.width = t_w + "px";
			parent.style.height = t_h + "px";
		}
	}
	else {
		//会有可能进入这个分支？
		parent.style.width = "120px";
		parent.style.height = "120px";
	}

	if (!is_large) {
		if (this.src == "") {
			bind_loadOriginImg_trigger(parent);
		}
	}

	this.style.display = 'block';
	
	var p = parent.firstElementChild;
	if (p && p.tagName == 'IMG' && p != this) {
		parent.removeChild(p);
	}

	var spinner = parent.querySelector(".spinner");
	if (spinner) {
		spinner.parentNode.removeChild(spinner);
	}

	del_elt_class(parent, "loading");
};

/**
* 图片加载失败处理
*/
function errorimg(){
	var parent = this.parentNode;

	if (img_type=="none") {//******add222******//
		add_elt_class(parent, "offline");

		bind_loadOriginImg_trigger(parent);
	} else {
		del_elt_class(parent, "offline");
	}
	del_elt_class(parent, "loading");

	//注：此处一定不能在图片加载失败时，立即删除该img。原因见image_load_cb的功能说明
};

/**
* 调整图片显示尺寸（超过正文宽度的一半就用正文宽度代替）
* @param {number} origin_w 原始宽度
* @param {number} origin_h 原始高度
* @param {number} maxWidth 正文宽度
*/
function adjust_origin_scale_big(origin_w, origin_h, maxWidth){
	//var half_maxWidth = 0.5*maxWidth;

	if(!origin_w){
		origin_w = 200;
	}

	var w1 = maxWidth,
		h1 = 0;

	//if(w1 > half_maxWidth){
	//	w1 = maxWidth;
	//}

	if( !w1 ){
		w1 = 200;
	}

	h1 = parseInt(origin_h * w1 / origin_w);
	if (!h1) {
		h1 = 200;
	}

	return { "w" : w1, "h" : h1 };
}

function adjust_origin_scale_small(origin_w, origin_h, maxWidth){
	var four_maxWidth = 0.25*maxWidth;

	if(!origin_w){
		origin_w = 200;
	}

	var w1 = origin_w,
		h1 = 0;

	if(w1 < four_maxWidth){
		w1 = w1;
	}else{
		w1 = four_maxWidth;
	}

	if( !w1 ){
		w1 = 200;
	}

	h1 = parseInt(origin_h * w1 / origin_w);
	if (!h1) {
		h1 = 200;
	}

	return { "w" : w1, "h" : h1 };
}
/**
* 图片容器初始化，调整大图、小图尺寸/编制图片索引
*/
function recalImgSize() {
	var maxWidth = article.offsetWidth,
		len = imgs.length;

	for(i=0; i<len; i++) {
		var _this 	= imgs[i],
			h 		= _this.getAttribute("height"),
			w 		= _this.getAttribute("width"),
			_wh 	= adjust_origin_scale_big(w, h, maxWidth),

			thumb_h = _this.getAttribute("height"),
			thumb_w = _this.getAttribute("width"),
			_wh2 	= adjust_origin_scale_small(thumb_w, thumb_h, maxWidth);

		
		_this.setAttribute("s_width", _wh.w ); //调整后大图显示宽度
		_this.setAttribute("s_height", _wh.h ); //调整后大图显示高度

		_this.setAttribute("t_width", _wh2.w ); //调整后thumb图显示宽度
		_this.setAttribute("t_height", _wh2.h ); //调整后thumb图显示高度
		
		_this.setAttribute("ss_index", i);
	}
}

/**
* 正文中全部图片的加载控制
* @param {string} type 图片类型
*/
function show_images(type){
	var valid_types = ['origin','thumb','none'];
	
	if( valid_types.indexOf(type) == -1 ){
		return;
	}
		imgs_len = imgs.length;

	for (var i = 0; i <  imgs_len; i++) {
		var parent = imgs[i],
			h = parent.getAttribute("s_height"),
			w = parent.getAttribute("s_width"),
			//src_path = parent.getAttribute("zip_src_path"),
			src_path = parent.getAttribute("src_path"),//******add******
			thumb_path = parent.getAttribute("thumb_path"),//******add******
			none_path = "",//******add******
			src = src_path;

		del_elt_class(parent, "offline");
		add_elt_class(parent, "loading");
		
		if (type == 'thumb') {
			src = thumb_path;//******add******
			add_elt_class(parent, 'thumb');

			h = parent.getAttribute("t_height");
			w = parent.getAttribute("t_width");
			
			bind_loadOriginImg_trigger(parent);
		}

		if (type == 'none') {//******add222******
			src = none_path;//******add222******
		}//******add222******
		parent.style.width = w + "px";
		parent.style.height = h + "px";

		if(close_lazyload){
			//关闭了懒加载，直接给img设置src属性
			parent.innerHTML = "<img onload='appendimg.call(this)' style='display:none' onerror='errorimg.call(this)' src='"+src+"' width='"+w+"' height='"+h+"'/>";
		}else{
			//开启了懒加载，在图片容器上添加lazyload信息，在scroll屏幕的时候，由懒加载处理函数动态添加相应<img>元素
			parent.setAttribute('lazy_src', src);
			parent.setAttribute('lazy_w', w);
			parent.setAttribute('lazy_h', h);
		}
	};
};

/**
* 显示正文图片入口
*/
function showImages() {
	recalImgSize();
	
	show_images(img_type);
}

/**
* 点击“显示大图”按钮，加载大图
*/
function toggle_images(){
	show_images('origin');
	if(!close_lazyload){
		clicked_toggle_img_btn = true;

		//一键显示大图时，需要重构lazyload相关数据结构及第一屏图片懒加载处理
		init_lazyload();
		_pollImages();

		//重新绑定scroll事件，避免在“小图”模式已经removeEventListener掉了
		document.addEventListener("scroll",_pollImages,false);
	}
}

/**
* 图片懒加载初始化，收集所有待加载图片
*/
function init_lazyload(){
	store = [];

	var nodes = document.querySelectorAll('[lazy_src]'),
		len = nodes.length;
	
	for(var i=0; i<len; i++){
		store.push(nodes[i]);
	}
}

/**
* 图片懒加载-显示符合条件的图片
*/
function _pollImages(){
	var len = store.length;

    if (len > 0){
      for (var i = 0; i < len; i++) {
        var self = store[i];

        if (self && _inView(self)) {
        	var lazy_w = self.getAttribute('lazy_w'),
        		lazy_h = self.getAttribute('lazy_h'),
        		lazy_src = self.getAttribute('lazy_src'),
        		t = document.createElement('div');

        	t.innerHTML = "<img onload='appendimg.call(this)' style='display:none' onerror='errorimg.call(this)' src='"+lazy_src+"' width='"+lazy_w+"' height='"+lazy_h+"'/>";
			var o = t.firstElementChild;
			t.removeChild(o);
			self.appendChild(o);

			self.removeAttribute('lazy_src');

			store.splice(i, 1);
			len = store.length;
			i--;
        }
      }
    }else{
		document.removeEventListener('scroll',_pollImages, false);
	}
}

/**
* 判断图片是否处于屏幕可视区域，在屏幕以下offset处即触发懒加载，与视频的判断差别
* @param {object} element 图片容器DOM
*/
function _inView(element) {
    var coords = element.getBoundingClientRect();
    if(coords.top < 0){
        return true;
    }else{
        return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.body.clientHeight) + offset);
    }
}

/**
* 页面变量初始化
*/
function initVars(){
	article = document.getElementsByTagName("article")[0];
	imgs 	= document.getElementsByClassName("image");
	metas 	= document.getElementsByTagName("meta");
	
	var imgs_len = imgs.length;
	
	//从<meta>标签中提取页面变量
	for (var i = 0, meta_len = metas.length; i < meta_len; i++) {
		var m = metas[i],
			name = m.name.toLowerCase(),
			c = m.getAttribute("content");
		
		switch(name){
			case 'load_image' :
				img_type = c;
				break;
			default:
				//nothing to do
		}
	};
	
	//对于“关闭懒加载”的wifi情形，当页面图片个数超过10幅时，强制打开懒加载
	if(close_lazyload && imgs_len > 10){
		close_lazyload = false;
	}

	//非大图模式下，在第一幅图片前插入“一键切换大图”按钮
	if(img_type != 'origin'){
		var first_image = imgs[0];
		if(first_image){
    		var toggle_node = document.querySelector('.toggle-img-con');
    		if(toggle_node){
    			first_image.parentNode.insertBefore(toggle_node, first_image);

    			var trigger = document.getElementById('toggle-img');
				trigger.style.display = 'inline-block';
    			trigger.addEventListener('click',function(e){
					trigger.style.display = 'none';

    				setTimeout(function() {
    					toggle_images();
    				}, 100);

    			},false);
    		}
    	}
	}
}
var the_timeout = setTimeout(function() {},10000);
/****************************************************************
 * 页面初始化入口
 *****************************************************************/
function initPage(){
	//页面相关变量初始化
	initVars();
	//关闭
	clearTimeout(the_timeout);

	// postpone calculate image size, 'article' may not finish layout
	// article width is 0 at this point on some device.
	the_timeout = setTimeout(function() {
		showImages();

		if(!close_lazyload){
			init_lazyload();//懒加载初始化
			_pollImages();//首次懒加载
			document.addEventListener("scroll",_pollImages,false);
		}
	}, 1000);
};
//document.addEventListener("DOMContentLoaded",initPage,false);
/****************************************************************
* 部分DOM操作基本封装，后续版本择机完成zepto改造后，废弃以下函数
*****************************************************************/

// add css class to element
function add_elt_class(elt, cls) {
	if (!elt || !cls)
		return false;
	try {
		var clazz = elt.getAttribute("class");
		if (clazz == null)
			clazz = "";
		var has = false;
		var clazzes = clazz.split(" ");
		for (var i = 0; i < clazzes.length; i++) {
			if (clazzes[i] == cls) {
				has = true;
				break;
			}
		}
		if (!has) {
			if (clazz.length > 0)
				clazz = clazz.concat(" ", cls);
			else {
				//判断clazz是否包含空格，如果包含，则去掉
				if(cls.indexOf(" ") > -1){
					clazz = cls.trim();
				}
				clazz = cls;
			}
			elt.setAttribute("class", clazz);
			return true;
		}
	} catch (e) {
	}
	return false;
}

// delete a css class of element
function del_elt_class(elt, cls) {
	if (!elt || !cls)
		return false;
	try {
		var clazz = elt.getAttribute("class");
		if (clazz == null)
			return false;
		var has = false;
		var clazzes = clazz.split(" ");
		clazz = ""
		for (var i = 0; i < clazzes.length; i++) {
			if (clazzes[i] == cls) {
				has = true;
				continue;
			} else {
				clazz = clazz.concat(" ", clazzes[i]);
			}
		}
		if (has) {
			//判断clazz是否包含空格，如果包含，则去掉
			if(clazz.indexOf(" ") > -1){
				clazz = clazz.trim();
			}
			elt.setAttribute("class", clazz);
			return true;
		}
	} catch (e) {
	}
	return false;
}

function has_elt_class(elt, cls) {
	if (!elt || !cls)
		return false;
	try {
		var clazz = elt.getAttribute("class");
		if (clazz == null)
			return false;
		var clazzes = clazz.split(" ");
		for (var i = 0; i < clazzes.length; i++) {
			if (clazzes[i] == cls) {
				return true;
			}
		}
	} catch (e) {
	}
	return false;
}
