var Colors = {
	Red: "rgb(255,0,0)",
	Blue: "rgb(0,0,255)",
	Green: "rgb(0,255,0)",
	White: "rgb(255,255,255)",
	Black: "rgb(0,0,0)",
	Yellow: "rgb(255,255,0)"
}

var SPUtil = {
	clamp:function(val,min,max) {
		return val < min ? min : (val > max ? max : val);
	},
	pt_dist:function(ax, ay, bx, by) {
		return Math.sqrt(Math.pow(ax-bx,2)+Math.pow(ay-by,2));
	},
	y_for_point_of_2pt_line: function (pt1x, pt1y, pt2x, pt2y, x) {
		//--(y - y1)/(x - x1) = m--
		var m = (pt1y - pt2y) / (pt1x - pt2x)
		//--y - mx = b--
		var b = pt1y - m * pt1x
		return m * x + b
	},
	rand_rangei: function(min,max) {
		return Math.floor((max - min) * Math.random()) + min
	},
	array_shuffle: function(array) {
		var currentIndex = array.length
			, temporaryValue
			, randomIndex
			;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
};
