var Messages = function () {
	this.value = "Enter Privacy protection password";	
};

Messages.prototype = function () {
	self = this;

	setMessage = function(messageId, value, timer) {
		messageId.innerHTML = value;
		messages.back(messageId, timer);
	},

	errAnimate = function(messageId, backTime, offset) {
		messageId.style.left = offset + "px";
		setTimeout(function(){
			messageId.style.left = "0";
		}, backTime);
	},

	back = function(messageId, timer) {
		value = this.value;

		setTimeout(function(){
			messageId.innerHTML = value;
		}, timer);
	};

	return {
		setMessage: setMessage,
		errAnimate: errAnimate,
		back: back
	};

}();