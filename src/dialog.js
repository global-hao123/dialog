var Dialog = function($el,opt){
    var that = this,
    	defaultOpt = {
			width: 100,
			height: 100,
			position: "absolute",
			modal: 0,
			draggable: 1,
			tpl: {
				head: "<div class='head'><span>title</span><i class='close'>&times;</i></div>",
				content: "<div class='content'>content</div>",
				foot: "<div class='foot'>footer</div>"
			}
		};

    typeof opt == "function" && (opt = opt.call());
    that.opt = $.extend(defaultOpt,opt);

    that._init($el);
};
// class variables
Dialog.counter = 0;
Dialog.mask = null;

var fn = Dialog.prototype;

/**
 * modal
 *
 * @param {Object} argument comment
 */
fn._modalise = function(){
	if(!Dialog.mask){
		Dialog.mask = $("<div class='dialog-mask' id='dialogMask'></div>").appendTo($("body"));
		/*Dialog.mask.css({
			width: "100%",
			height: "100%",
			backgroundColor: "#000",
			opacity: ".5"
		});*/
	}
	if(Dialog.mask.is(":hidden")){
		Dialog.mask.show();
	}
	// 禁止滚动
	$("html,body").css({
		"overflow": "hidden"
	});
};

/**
 * get $el
 *
 * @param {Object} argument comment
 */
fn._getElement = function($el){
	var that = this,
		html = "";
	$.each(that.opt.tpl, function(i,v){
		html += v;
	});
	return (
		$el ?
		(function(){
			// $el.html("<i class='close'>&times\;</i>");
			$el.html(html);
			return $el;
		})() :
		(function(){
	    	var dialogId = "dialog_auto_" + Dialog.counter++;
	    	if($("#" + dialogId).length){
	    		arguments.callee();
	    	}else{
	    		var $newDialog = $("<div id='" + dialogId + "'"+ (that.opt.customClass?"class='"+ that.opt.customClass +"'":"") + ">" + html + "</div>");
	    		$newDialog.appendTo($("body"));
	    		return $newDialog;
	    	}
	    })()
	);
};

/**
 * adjust position
 *
 * @param {Object} argument comment
 */
fn._adjustPos = function(opt){
	var that = this;

	// 默认在可视区域内居中
	if(opt.top == undefined){
    	$.extend(opt, {
	    	// "top": "50%",
	    	"top": opt.position == "absolute" ? $(document).scrollTop() + $(window).height()/2 : "50%",
	    	"margin-top": -parseInt(opt.height, 10)/2
	    });
    }
    if(opt.left == undefined){
    	$.extend(opt, {
	    	// "left": "50%",
	    	"left": opt.position == "absolute" ? $(document).scrollLeft() + $(window).width()/2 : "50%",
	    	"margin-left": -parseInt(opt.width, 10)/2
	    });
    }
};

/**
 * draggable
 *
 * @param {Object} argument comment
 */
fn._draggable = function(){
	var that = this;

	that.$el.drag({
		circlimit: false
	});
}

/**
 * show interface
 *
 * @param {Object} argument comment
 */
fn.show = function(){
	var that = this;

	if(that.opt.modal){
		Dialog.mask.show();
		// 恢复滚动
		$("html,body").css({
			"overflow": "hidden"
		});
	}
	that.$el.show();
};

/**
 * close interface
 *
 * @param {Object} argument comment
 */
fn.close = function(){
	var that = this;

	if(that.opt.modal){
		Dialog.mask.hide();
		// 恢复滚动
		$("html,body").css({
			"overflow": "auto"
		});
	}
	that.$el.hide();
};

/**
 * bind events
 *
 * @param {Object} argument comment
 */
fn._bindEvents = function(opt){
	var that = this;

	that.$el.on("click", ".close", function(){
		that.close();
	});
};

/**
 * init
 *
 * @param {Object} argument comment
 */
fn._init = function($el){
	var that = this,
		opt = that.opt;

	// modal
	opt.modal && that._modalise();

	// get $el
	that.$el = that._getElement($el);
    // adjust position
    that._adjustPos(opt);

    // TODO: (debug-only)random background color
    opt.debug && (opt.backgroundColor = "RGB(" + Math.floor(Math.random()*255) + " ," + Math.floor(Math.random()*255) + " ," + Math.floor(Math.random()*255) + ")");

	that.$el.css(opt);

	// draggable
	opt.draggable && that._draggable();

	// bind events
	that._bindEvents(opt);
};

// jQuery plugin wraper
$.fn.extend({
    /**
     * create dialog from an existed dom
     *
     * @param {Object} argument comment
     */
    dialog: function(args) {
        return new Dialog(this, args);
    },

    /**
     * create dialog from a dom interaction
     *
     * @param {Object} argument comment
     */
    bindDialog: function(type,args) {
    	this.on(type, function(){
    		return new Dialog(null, args);
    	})
    }
});
