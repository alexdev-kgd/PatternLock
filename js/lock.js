		pattern.addEventListener('mousedown', function (event) {
			isHold = true;

			pattern.addEventListener('mousemove', function (event) {

/*				pattern.addEventListener('mouseleave', function (event) {
					canvasObj.update(c, lines);
				});
*/
				mousePos = canvasObj.getMousePos(event);
				canvasObj.update(c, lines);
				console.log(mousePos.x + ' ' + mousePos.y
					);

				if(isHold) {
					if(idFirst === null) {
						first = c.collision(event, offsetX, offsetY); // First circle

							if(first !== undefined) {
								idFirst   = first;
								dataFirst = c.getCircleData(idFirst); // Get first circle data
								check 	  = c.checking(idFirst);
								c.addToChecked(idFirst, check);
							}

					} else {
						lines.draw(dataFirst.x, dataFirst.y, mousePos.x, mousePos.y, ctx);
						
						second = c.collision(event, offsetX, offsetY); // Second circle
						if(second !== undefined) idSecond = second;
						if(idSecond == idFirst) idSecond = null;

						if(idSecond !== undefined && idSecond !== null) {
							dataSecond = c.getCircleData(idSecond); // Get second circle data
							check 	   = c.checking(idSecond);

								av_circle = lines.collision(event, c.getMatrix(), 
											dataFirst.x, dataFirst.y, 
											dataSecond.x, dataSecond.y);
								av_check  = c.checking(av_circle);
								is_added  = c.addToChecked(av_circle, av_check);
								av_circle = null;

							c.addToChecked(idSecond, check);

							if(check) {
								lines.draw(dataFirst.x, dataFirst.y, dataSecond.x, dataSecond.y, ctx);
								lines.add(dataFirst.x, dataFirst.y, dataSecond.x, dataSecond.y);
								idFirst = null, idSecond = null, is_added = null;
							}
						} else { return; }
					}
				}
			});
		});

		pattern.addEventListener('mouseup', function (event) {
			isHold = false;
			idFirst = null, idSecond = null, 
			av_circle = null;

			var isValid = c.isValid();
			if(isValid) {

				var head 	  	= document.getElementById('top'),
					canv_anim 	= document.getElementById('wrapper'),
					success		= document.getElementById('success'),
					head_text	= document.getElementById('top-wrapper');
				
				success.style.visibility = "visible";
				success.style.top 		 = "50%";
				success.style.transform  = "translateY(-50%)";

				head_text.style.transform = "translateY(1000px)";
				canv_anim.style.transform = "translateY(1000px)";
				head.style.height = "100vh";

				transitionEvent && canv_anim.addEventListener(transitionEvent, function() {
					canv_anim.style.display = "none";
				});
				transitionEvent && head_text.addEventListener(transitionEvent, function() {
					head_text.style.display = "none";
					head.style.transition = "none";
				});
			} else { 
				var err_text = document.getElementById("err-text");

				messages.setMessage(err_text, "Incorrect, please, try again.", 1500);
				messages.errAnimate(err_text, 80, 20);
			}


			c.clear();
			lines.clear();
			canvasObj.update(c);
		});

	// Click handler
	pattern.addEventListener('click', function(event) {
		var time = 1500, // Time in milliseconds
			cl_c = c.collision(event, offsetX, offsetY);

		canvasObj.update(c);

		if(timeout !== null) clearTimeout(timeout);
		ctx.globalCompositeOperation='destination-over';
		//if(cl_c !== undefined) c.changeColor(cl_c, "red", ctx); // If clicked on circle
		timeout = setTimeout(function () {
			canvasObj.update(c);
		}, time);
	});