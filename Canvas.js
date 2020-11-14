var SPCanvas = function() {
	var self = {}
	
	var _context = document.getElementById("game").getContext("2d")
	var _width = _context.canvas.width
	var _height = _context.canvas.height
	
	self.context = function() { return _context }
	self.width = function() { return _width }
	self.height = function() { return _height } 
	self.clear = function() {
		_context.clearRect(0, 0, _width, _height)
	}
	
	return self
}