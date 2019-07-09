//Lines
	var Lines = function (color, width) {
		this.color = color;
		this.width = width;

		this.lines = [];
	};
	Lines.prototype = function () {
		draw = function (sX, sY, eX, eY, ctx) {
			ctx.globalCompositeOperation = 'destination-over';
			ctx.beginPath();
			ctx.moveTo(sX,sY);
			ctx.lineTo(eX,eY);
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.width;
			ctx.stroke();
			ctx.closePath();
		},

		drawAll = function (ctx) {
			if(this.lines.length > 0) {
				for(var i = 0; i < this.lines.length; i += 1) {
					this.draw(this.lines[i].firstX, this.lines[i].firstY, 
						 this.lines[i].secondX, this.lines[i].secondY, ctx);
				}
			} else { return; }
		},

		add = function (fX, fY, sX, sY) {
			this.lines.push({
				firstX: fX,
				firstY: fY,
				secondX: sX,
				secondY: sY
			}); 
		},

		clear = function () {
			this.lines = [];
		},

		collision = function (event, matrix, 
							  initial_x, initial_y, 
							  destination_x, destination_y) {
			var delta_x = destination_x - initial_x,
				delta_y = destination_y - initial_y,
				//f_x = Math.floor( Math.sqrt( (delta_x * delta_x) + (delta_y * delta_y) ) / 2 ),
				//f_y = Math.floor( Math.sqrt( (f_x * f_x) - ((delta_x / 2) * (delta_x / 2)) ) ),
				target_circle_x = Math.floor(delta_x / 2) + initial_x,
				target_circle_y = Math.floor(delta_y / 2) + initial_y,
				res;

			matrix.forEach(function (el) {
				if (target_circle_y >= el.y && target_circle_y <= el.y + el.radius &&
					target_circle_x >= el.x && target_circle_x <= el.x + el.radius) {
					res = el.id;
				}
			});

			return res;
		};

		return {
			draw: draw,
			drawAll: drawAll,
			add: add,
			clear: clear,
			collision: collision
		};
	}();
