		var canvasObj = new Canvas(),
			pattern   = canvasObj.getCanvas(),
			ctx 	  = canvasObj.getCtx(),
			offsetX   = canvasObj.getOLeft(),
			offsetY   = canvasObj.getOTop();
		
		var c = new Circles(11, 10, '#d9d9d9', 60, 0, -130, 190, 190);
		c.init();
		c.drawAll(ctx);

		var messages = new Messages();
		var lines = new Lines('#e6e6e6', 5);

		// Mousedown handler
		var isHold    = false,
			first 	  = null, dataFirst  = null, idFirst  = null,
			second    = null, dataSecond = null, check    = null,
			av_circle = null, av_data	 = null, is_added = null;
		var mousePos, detect;

		//timer
		var timeout = null;

		/* From Modernizr */
		function whichTransitionEvent(){
		    var t;
		    var el = document.createElement('fakeelement');
		    var transitions = {
		      'transition':'transitionend',
		      'OTransition':'oTransitionEnd',
		      'MozTransition':'transitionend',
		      'WebkitTransition':'webkitTransitionEnd'
		    }

		    for(t in transitions){
		        if( el.style[t] !== undefined ){
		            return transitions[t];
		        }
		    }
		}

		/* Listen for a transition! */
		var transitionEvent = whichTransitionEvent();