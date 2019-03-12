import * as d3 from "d3";
function interpolateQuadraticBezier(start, control, end) {
	// 0 <= t <= 1
	return function interpolator(t) {
		return [
			(Math.pow(1 - t, 2) * start[0]) +
      (2 * (1 - t) * t * control[0]) +
      (Math.pow(t, 2) * end[0]),
      (Math.pow(1 - t, 2) * start[1]) +
      (2 * (1 - t) * t * control[1]) +
      (Math.pow(t, 2) * end[1]),
		];
	};
}

// B'(t) = 2(1 - t)(P1 - P0) + 2t(P2 - P1)
function interpolateQuadraticBezierAngle(start, control, end) {
	// 0 <= t <= 1
	return function interpolator(t) {
		const tangentX = (2 * (1 - t) * (control[0] - start[0])) +
										 (2 * t * (end[0] - control[0]));
		const tangentY = (2 * (1 - t) * (control[1] - start[1])) +
										 (2 * t * (end[1] - control[1]));

		return Math.atan2(tangentY, tangentX) * (180 / Math.PI);
	}
}

function cubicPath(c) {
	return `M${c.start[0]},${c.start[1]} C${c.control1[0]},${c.control1[1]} ${c.control2[0]},${c.control2[1]} ${c.end[0]},${c.end[1]}`;
}

// draw a quadratic bezier curve
export function drawQuadratic(quadratic) {
	const quadraticInterpolator = interpolateQuadraticBezier(quadratic.start, quadratic.control, quadratic.end);
	const interpolatedPoints = d3.range(10).map((d, i, a) => quadraticInterpolator(d / (a.length - 1)));
	const quadraticAngleInterpolator = interpolateQuadraticBezierAngle(quadratic.start, quadratic.control, quadratic.end);
	const rotatedPoints = d3.range(3).map((d, i, a) => {
		const t = d / (a.length - 1);
		return {
			t: t,
			position: quadraticInterpolator(t),
			angle: quadraticAngleInterpolator(t),
		};
	});
	return rotatedPoints;
}
