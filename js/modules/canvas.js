    var Canvas = function (name) {
    	this.canvas = document.getElementById(name) || document.getElementsByTagName('canvas')[0];
    	this.ctx = this.canvas.getContext('2d');
    	this.oLeft = this.canvas.offsetLeft;
    	this.oTop = this.canvas.offsetTop;
    };
    Canvas.prototype = function () {
    	var rect = null,

    	getCanvas = function () {
    		return this.canvas;
    	},

    	getCtx = function () {
    		return this.ctx;
    	},

    	getOLeft = function () {
    		return this.oLeft;
    	},

    	getOTop = function () {
    		return this.oTop;
    	},

    	getMousePos = function (event) {
    		rect = this.canvas.getBoundingClientRect();
    		return {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
    		}
    	},

    	update = function (c, l) {
    		this.ctx.clearRect(0, 0, this.canvas.width, 
    								 this.canvas.height);
    		c.drawAll(this.ctx);
            if(l) l.drawAll(this.ctx);
    	};

    	return {
            getCanvas: getCanvas,
    		getCtx: getCtx,
    		getOLeft: getOLeft,
    		getOTop: getOTop,
    		getMousePos: getMousePos,
    		update: update,
    	};
    }();