	var Circles = function (count, radius, color, initPos, x, y, offsetX, offsetY) {
		this.n 		 = count;
		this.radius  = radius;
		this.color   = color;
		this.initPos = initPos;
		this.x 		 = x;
		this.y 		 = y;
		this.offsetX = offsetX;
		this.offsetY = offsetY;

		this.lock 	 = [1, 5, 9,
						6, 3, 2,
					 	4, 7, 8];
	
		this.checked = [];
		this.matrix  = [];
	};
	Circles.prototype = function () {
		self = this;

		getMatrix = function () {
			return this.matrix;
		},

		getCircleData = function (id) {
			if(id === undefined) return;
			for(var i = 0; i < this.matrix.length; i += 1) {
				if(this.matrix[i].id == id) {
					return this.matrix[i];
				}
			}
		}

		draw = function (x, y, radius, color, ctx) {
			ctx.beginPath();
			ctx.arc(x, y, radius, 
						   0, 2*Math.PI, false);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();
		},

		drawAll = function (ctx) {
			if(this.matrix.length > 0) {
				for(var i = 0; i < this.matrix.length; i += 1) {
					self.draw(this.matrix[i].x, this.matrix[i].y, 
						 this.matrix[i].radius, this.matrix[i].color, ctx);
				}
			} else { console.log("Matrix is empty!"); return; }
		},

		drawById = function (id, color, ctx) {
			for(var i = 0; i < this.matrix.length; i += 1) {
				if(this.matrix[i].id == id) {
					self.draw(this.matrix[i].x, this.matrix[i].y, 
						 this.matrix[i].radius, color, ctx);
				}
			}
		},

		init = function () {
			for(var i = 1; i <= this.n; i += 1) {
				if(i == 1 || i == 4 || i == 7) {
					if(this.i == 1) {
						this.x = this.initPos;
						this.y = this.initPos;
					} else {
						this.x = this.initPos;
						this.y += this.offsetY;
					}
				} else {
					this.x += this.offsetX;
				}

				this.matrix.push({
					id: i,
					x: this.x,
					y: this.y,
					radius: this.radius,
					color: this.color,
					checked: false
				});
			}
		},

/*		changeColor = function (id, color, ctx) {
			color == null ? color = "red" : color;
			this.drawById(id, color, ctx);
		},*/

		collision = function (event, oLeft, oTop) {
			var click_x = event.pageX - oLeft,
				click_y = event.pageY - oTop,
				rad = 50;
			var res;

			this.matrix.forEach(function (el) {
				if (click_y > el.y && click_y < el.y + el.radius+rad &&
					click_x > el.x && click_x < el.x + el.radius+rad) {
					res = el.id;
				}
			});

			return res;
		},

		checking = function (id) {
			if(id === undefined) return;
			for(var i = 0; i < this.matrix.length; i += 1) {
				if(this.matrix[i].id == id) {
					if(this.matrix[i].checked == false) {
						this.matrix[i].checked = true;
						return true;
					} else { return false; }
				}
			}		
		},

		addToChecked = function (id, status) {
			if(id === undefined || status === false) return;

			this.checked.push(id);
			console.log(this.checked);

			return true;
		},

		clear = function () {
			this.checked = [];

			for(var i = 0; i < this.matrix.length; i += 1) {
				this.matrix[i].checked = false;
			};
		},

        isValid = function () {
        	console.log("");
        	console.log("Lock: " + this.lock);
        	console.log("Checked: " + this.checked);
        	if(JSON.stringify(this.lock) === JSON.stringify(this.checked)) return true;
			return false;
/*			if (this.lock === this.checked) return true;
			if (this.lock == null || this.checked == null) return false;
			if (this.lock.length != this.checked.length) return false;*/


		};

		return {
			init: init,
			drawAll: drawAll,
			drawById: drawById,
			//changeColor: changeColor,
			collision: collision,
			getMatrix: getMatrix,
			getCircleData: getCircleData,
			addToChecked: addToChecked,
			checking: checking,
			clear: clear,
			isValid: isValid
		};
	}();