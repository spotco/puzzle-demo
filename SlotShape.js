var MAX_LOCK_SLOT = 16

var SlotShape = function(_g) {
	var self = {}
	var _context = _g._canvas.context()
	
	var _size = 50
	var _clear_slot_size = 10
	
	var _is_key = false
	
	var _position_x = 0
	var _position_y = 0
	var _scale = 1
	var _rotation = 0
	var _stroke_style = Colors.Black
	var _line_width = 1
	var _alpha = 1
	
	self.set_line_style = function(color, thickness) { _stroke_style = color; _line_width = thickness }
	self.set_position = function(valx, valy) { _position_x = valx; _position_y = valy }
	self.set_scale = function(val) { _scale = val }
	self.set_rotation = function(val) { _rotation = val }
	self.set_alpha = function(val) { _alpha = val }
	self.set_is_key = function(val) { _is_key = val }
	
	var _slots = []
	self.slots = function() { return _slots }
	
	self.rotate_left = function() {
		_slots = _slots.map(function(itr) {
			var rtv = itr - 1
			if (rtv < 0) {
				rtv = MAX_LOCK_SLOT-1
			}
			return rtv
		})
	}
	
	self.rotate_right = function() {
		_slots = _slots.map(function(itr) {
			var rtv = itr + 1
			if (rtv >= MAX_LOCK_SLOT) {
				rtv = 0
			}
			return rtv
		})
	}
	
	self.contains_cursor = function() {
		return SPUtil.pt_dist(_g._input._mouse_position.x, _g._input._mouse_position.y, _position_x, _position_y) < _size * _scale
	}
	
	self.draw = function(render_slots) {
		_context.save()
		
		_context.strokeStyle = _stroke_style
		_context.lineWidth = _line_width
		_context.globalAlpha = _alpha
		
		_context.translate(_position_x, _position_y)
		_context.scale(_scale,_scale)
		_context.rotate(_rotation)
		if (_is_key) {
			_context.strokeStyle = "rgba(0,0,0,0.25)"
		}
		_context.beginPath()
		_context.arc(0, 0, _size, 0, Math.PI * 2)
		_context.closePath()
		_context.stroke()
		if (_is_key) {
			_context.strokeStyle = _stroke_style
		}
		
		if (_is_key) {
			render_slots.forEach(function(itr) {
				_context.save()
				var angle = (itr / MAX_LOCK_SLOT) * Math.PI * 2
				_context.lineWidth = _line_width * 2
				_context.beginPath()
				_context.moveTo(Math.cos(angle) * _size * 1.15, Math.sin(angle) * _size * 1.15)
				_context.lineTo(Math.cos(angle) * _size * 0.85, Math.sin(angle) * _size * 0.85)
				_context.stroke()
				_context.closePath()
				_context.restore()
			})
		} else {
			render_slots.forEach(function(itr) {
				_context.save()
				var angle = (itr / MAX_LOCK_SLOT) * Math.PI * 2
				_context.translate(Math.cos(angle) * _size, Math.sin(angle) * _size)
				_context.rotate(angle)
				_context.clearRect(-_clear_slot_size/2, -_clear_slot_size/2, _clear_slot_size, _clear_slot_size);
				_context.restore()
			})
		}
		
		_context.restore()
	}
	
	return self
}