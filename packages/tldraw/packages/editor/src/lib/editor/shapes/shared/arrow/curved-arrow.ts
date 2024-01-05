import { TLArrowShape } from '@tldraw/tlschema'
import { Mat } from '../../../../primitives/Mat'
import { Vec, VecLike } from '../../../../primitives/Vec'
import { intersectCirclePolygon, intersectCirclePolyline } from '../../../../primitives/intersect'
import {
	PI,
	PI2,
	clockwiseAngleDist,
	counterClockwiseAngleDist,
	isSafeFloat,
} from '../../../../primitives/utils'
import type { Editor } from '../../../Editor'
import { TLArcInfo, TLArrowInfo } from './arrow-types'
import {
	BOUND_ARROW_OFFSET,
	MIN_ARROW_LENGTH,
	STROKE_SIZES,
	WAY_TOO_BIG_ARROW_BEND_FACTOR,
	getArrowTerminalsInArrowSpace,
	getBoundShapeInfoForTerminal,
	getBoundShapeRelationships,
} from './shared'
import { getStraightArrowInfo } from './straight-arrow'

export function getCurvedArrowInfo(
	editor: Editor,
	shape: TLArrowShape,
	extraBend = 0
): TLArrowInfo {
	const { arrowheadEnd, arrowheadStart } = shape.props
	const bend = shape.props.bend + extraBend

	if (Math.abs(bend) > Math.abs(shape.props.bend * WAY_TOO_BIG_ARROW_BEND_FACTOR)) {
		return getStraightArrowInfo(editor, shape)
	}

	const terminalsInArrowSpace = getArrowTerminalsInArrowSpace(editor, shape)

	const med = Vec.Med(terminalsInArrowSpace.start, terminalsInArrowSpace.end) // point between start and end
	const u = Vec.Sub(terminalsInArrowSpace.end, terminalsInArrowSpace.start).uni() // unit vector between start and end
	const middle = Vec.Add(med, u.per().mul(-bend)) // middle handle

	const startShapeInfo = getBoundShapeInfoForTerminal(editor, shape.props.start)
	const endShapeInfo = getBoundShapeInfoForTerminal(editor, shape.props.end)

	// The positions of the body of the arrow, which may be different
	// than the arrow's start / end points if the arrow is bound to shapes
	const a = terminalsInArrowSpace.start.clone()
	const b = terminalsInArrowSpace.end.clone()
	const c = middle.clone()

	if (Vec.Equals(a, b)) {
		return {
			isStraight: true,
			start: {
				handle: a,
				point: a,
				arrowhead: shape.props.arrowheadStart,
			},
			end: {
				handle: b,
				point: b,
				arrowhead: shape.props.arrowheadEnd,
			},
			middle: c,
			isValid: false,
			length: 0,
		}
	}

	const isClockwise = shape.props.bend < 0
	const distFn = isClockwise ? clockwiseAngleDist : counterClockwiseAngleDist

	const handleArc = getArcInfo(a, b, c)
	const handle_aCA = Vec.Angle(handleArc.center, a)
	const handle_aCB = Vec.Angle(handleArc.center, b)
	const handle_dAB = distFn(handle_aCA, handle_aCB)

	if (
		handleArc.length === 0 ||
		handleArc.size === 0 ||
		!isSafeFloat(handleArc.length) ||
		!isSafeFloat(handleArc.size)
	) {
		return getStraightArrowInfo(editor, shape)
	}

	const tempA = a.clone()
	const tempB = b.clone()
	const tempC = c.clone()

	const arrowPageTransform = editor.getShapePageTransform(shape)!

	let offsetA = 0
	let offsetB = 0

	let minLength = MIN_ARROW_LENGTH

	if (startShapeInfo && !startShapeInfo.isExact) {
		const startInPageSpace = Mat.applyToPoint(arrowPageTransform, tempA)
		const centerInPageSpace = Mat.applyToPoint(arrowPageTransform, handleArc.center)
		const endInPageSpace = Mat.applyToPoint(arrowPageTransform, tempB)

		const inverseTransform = Mat.Inverse(startShapeInfo.transform)

		const startInStartShapeLocalSpace = Mat.applyToPoint(inverseTransform, startInPageSpace)
		const centerInStartShapeLocalSpace = Mat.applyToPoint(inverseTransform, centerInPageSpace)
		const endInStartShapeLocalSpace = Mat.applyToPoint(inverseTransform, endInPageSpace)

		const { isClosed } = startShapeInfo
		const fn = isClosed ? intersectCirclePolygon : intersectCirclePolyline

		let point: VecLike | undefined

		let intersections = fn(centerInStartShapeLocalSpace, handleArc.radius, startShapeInfo.outline)

		if (intersections) {
			const angleToStart = centerInStartShapeLocalSpace.angle(startInStartShapeLocalSpace)
			const angleToEnd = centerInStartShapeLocalSpace.angle(endInStartShapeLocalSpace)
			const dAB = distFn(angleToStart, angleToEnd)

			// Filter out any intersections that aren't in the arc
			intersections = intersections.filter(
				(pt) => distFn(angleToStart, centerInStartShapeLocalSpace.angle(pt)) <= dAB
			)

			const targetDist = dAB * 0.25

			intersections.sort(
				isClosed
					? (p0, p1) =>
							Math.abs(distFn(angleToStart, centerInStartShapeLocalSpace.angle(p0)) - targetDist) <
							Math.abs(distFn(angleToStart, centerInStartShapeLocalSpace.angle(p1)) - targetDist)
								? -1
								: 1
					: (p0, p1) =>
							distFn(angleToStart, centerInStartShapeLocalSpace.angle(p0)) <
							distFn(angleToStart, centerInStartShapeLocalSpace.angle(p1))
								? -1
								: 1
			)

			point = intersections[0] ?? (isClosed ? undefined : startInStartShapeLocalSpace)
		} else {
			point = isClosed ? undefined : startInStartShapeLocalSpace
		}

		if (point) {
			tempA.setTo(
				editor.getPointInShapeSpace(shape, Mat.applyToPoint(startShapeInfo.transform, point))
			)

			startShapeInfo.didIntersect = true

			if (arrowheadStart !== 'none') {
				const strokeOffset =
					STROKE_SIZES[shape.props.size] / 2 +
					('size' in startShapeInfo.shape.props
						? STROKE_SIZES[startShapeInfo.shape.props.size] / 2
						: 0)
				offsetA = BOUND_ARROW_OFFSET + strokeOffset
				minLength += strokeOffset
			}
		}
	}

	if (endShapeInfo && !endShapeInfo.isExact) {
		// get points in shape's coordinates?
		const startInPageSpace = Mat.applyToPoint(arrowPageTransform, tempA)
		const endInPageSpace = Mat.applyToPoint(arrowPageTransform, tempB)
		const centerInPageSpace = Mat.applyToPoint(arrowPageTransform, handleArc.center)

		const inverseTransform = Mat.Inverse(endShapeInfo.transform)

		const startInEndShapeLocalSpace = Mat.applyToPoint(inverseTransform, startInPageSpace)
		const centerInEndShapeLocalSpace = Mat.applyToPoint(inverseTransform, centerInPageSpace)
		const endInEndShapeLocalSpace = Mat.applyToPoint(inverseTransform, endInPageSpace)

		const isClosed = endShapeInfo.isClosed
		const fn = isClosed ? intersectCirclePolygon : intersectCirclePolyline

		let point: VecLike | undefined

		let intersections = fn(centerInEndShapeLocalSpace, handleArc.radius, endShapeInfo.outline)

		if (intersections) {
			const angleToStart = centerInEndShapeLocalSpace.angle(startInEndShapeLocalSpace)
			const angleToEnd = centerInEndShapeLocalSpace.angle(endInEndShapeLocalSpace)
			const dAB = distFn(angleToStart, angleToEnd)
			const targetDist = dAB * 0.75

			// or simplified...

			intersections = intersections.filter(
				(pt) => distFn(angleToStart, centerInEndShapeLocalSpace.angle(pt)) <= dAB
			)

			intersections.sort(
				isClosed
					? (p0, p1) =>
							Math.abs(distFn(angleToStart, centerInEndShapeLocalSpace.angle(p0)) - targetDist) <
							Math.abs(distFn(angleToStart, centerInEndShapeLocalSpace.angle(p1)) - targetDist)
								? -1
								: 1
					: (p0, p1) =>
							distFn(angleToStart, centerInEndShapeLocalSpace.angle(p0)) <
							distFn(angleToStart, centerInEndShapeLocalSpace.angle(p1))
								? -1
								: 1
			)

			if (intersections[0]) {
				point = intersections[0]
			} else {
				point = isClosed ? undefined : endInEndShapeLocalSpace
			}
		} else {
			point = isClosed ? undefined : endInEndShapeLocalSpace
		}

		if (point) {
			// Set b to target local point -> page point -> shape local point
			tempB.setTo(
				editor.getPointInShapeSpace(shape, Mat.applyToPoint(endShapeInfo.transform, point))
			)

			endShapeInfo.didIntersect = true

			if (arrowheadEnd !== 'none') {
				const strokeOffset =
					STROKE_SIZES[shape.props.size] / 2 +
					('size' in endShapeInfo.shape.props ? STROKE_SIZES[endShapeInfo.shape.props.size] / 2 : 0)
				offsetB = BOUND_ARROW_OFFSET + strokeOffset
				minLength += strokeOffset
			}
		}
	}

	// Apply arrowhead offsets

	let aCA = Vec.Angle(handleArc.center, tempA) // angle center -> a
	let aCB = Vec.Angle(handleArc.center, tempB) // angle center -> b
	let dAB = distFn(aCA, aCB) // angle distance between a and b
	let lAB = dAB * handleArc.radius // length of arc between a and b

	// Try the offsets first, then check whether the distance between the points is too small;
	// if it is, flip the offsets and expand them. We need to do this using temporary points
	// so that we can apply them both in a balanced way.
	const tA = tempA.clone()
	const tB = tempB.clone()

	if (offsetA !== 0) {
		const n = (offsetA / lAB) * (isClockwise ? 1 : -1)
		const u = Vec.FromAngle(aCA + dAB * n)
		tA.setTo(handleArc.center).add(u.mul(handleArc.radius))
	}

	if (offsetB !== 0) {
		const n = (offsetB / lAB) * (isClockwise ? -1 : 1)
		const u = Vec.FromAngle(aCB + dAB * n)
		tB.setTo(handleArc.center).add(u.mul(handleArc.radius))
	}

	const distAB = Vec.Dist(tA, tB)
	if (distAB < minLength) {
		if (offsetA !== 0 && offsetB !== 0) {
			offsetA *= -1.5
			offsetB *= -1.5
		} else if (offsetA !== 0) {
			offsetA *= -2
		} else if (offsetB !== 0) {
			offsetB *= -2
		} else {
			// noop
		}
	}

	if (offsetA !== 0) {
		const n = (offsetA / lAB) * (isClockwise ? 1 : -1)
		const u = Vec.FromAngle(aCA + dAB * n)
		tempA.setTo(handleArc.center).add(u.mul(handleArc.radius))
	}

	if (offsetB !== 0) {
		const n = (offsetB / lAB) * (isClockwise ? -1 : 1)
		const u = Vec.FromAngle(aCB + dAB * n)
		tempB.setTo(handleArc.center).add(u.mul(handleArc.radius))
	}

	// Did we miss intersections? This happens when we have overlapping shapes.
	if (startShapeInfo && endShapeInfo && !startShapeInfo.isExact && !endShapeInfo.isExact) {
		aCA = Vec.Angle(handleArc.center, tempA) // angle center -> a
		aCB = Vec.Angle(handleArc.center, tempB) // angle center -> b
		dAB = distFn(aCA, aCB) // angle distance between a and b
		lAB = dAB * handleArc.radius // length of arc between a and b
		const relationship = getBoundShapeRelationships(
			editor,
			startShapeInfo.shape.id,
			endShapeInfo.shape.id
		)

		if (relationship === 'double-bound' && lAB < 30) {
			tempA.setTo(a)
			tempB.setTo(b)
			tempC.setTo(c)
		} else if (relationship === 'safe') {
			if (startShapeInfo && !startShapeInfo.didIntersect) {
				tempA.setTo(a)
			}

			if (
				(endShapeInfo && !endShapeInfo.didIntersect) ||
				distFn(handle_aCA, aCA) > distFn(handle_aCA, aCB)
			) {
				const n = Math.min(0.9, MIN_ARROW_LENGTH / lAB) * (isClockwise ? 1 : -1)
				const u = Vec.FromAngle(aCA + dAB * n)
				tempB.setTo(handleArc.center).add(u.mul(handleArc.radius))
			}
		}
	}

	placeCenterHandle(
		handleArc.center,
		handleArc.radius,
		tempA,
		tempB,
		tempC,
		handle_dAB,
		isClockwise
	)

	if (tempA.equals(tempB)) {
		tempA.setTo(tempC.clone().addXY(1, 1))
		tempB.setTo(tempC.clone().subXY(1, 1))
	}

	a.setTo(tempA)
	b.setTo(tempB)
	c.setTo(tempC)
	const bodyArc = getArcInfo(a, b, c)

	return {
		isStraight: false,
		start: {
			point: a,
			handle: terminalsInArrowSpace.start,
			arrowhead: shape.props.arrowheadStart,
		},
		end: {
			point: b,
			handle: terminalsInArrowSpace.end,
			arrowhead: shape.props.arrowheadEnd,
		},
		middle: c,
		handleArc,
		bodyArc,
		isValid: bodyArc.length !== 0 && isFinite(bodyArc.center.x) && isFinite(bodyArc.center.y),
	}
}

/**
 * Get info about an arc formed by three points.
 *
 * @param a - The start of the arc
 * @param b - The end of the arc
 * @param c - A point on the arc
 */
function getArcInfo(a: VecLike, b: VecLike, c: VecLike): TLArcInfo {
	// find a circle from the three points
	const u = -2 * (a.x * (b.y - c.y) - a.y * (b.x - c.x) + b.x * c.y - c.x * b.y)

	const center = {
		x:
			((a.x * a.x + a.y * a.y) * (c.y - b.y) +
				(b.x * b.x + b.y * b.y) * (a.y - c.y) +
				(c.x * c.x + c.y * c.y) * (b.y - a.y)) /
			u,
		y:
			((a.x * a.x + a.y * a.y) * (b.x - c.x) +
				(b.x * b.x + b.y * b.y) * (c.x - a.x) +
				(c.x * c.x + c.y * c.y) * (a.x - b.x)) /
			u,
	}

	const radius = Vec.Dist(center, a)

	// Whether to draw the arc clockwise or counter-clockwise (are the points clockwise?)
	const sweepFlag = +Vec.Clockwise(a, c, b)

	// The base angle of the arc in radians
	const ab = Math.hypot(a.y - b.y, a.x - b.x)
	const bc = Math.hypot(b.y - c.y, b.x - c.x)
	const ca = Math.hypot(c.y - a.y, c.x - a.x)

	const theta = Math.acos((bc * bc + ca * ca - ab * ab) / (2 * bc * ca)) * 2

	// Whether to draw the long arc or short arc
	const largeArcFlag = +(PI > theta)

	// The size of the arc to draw in radians
	const size = (PI2 - theta) * (sweepFlag ? 1 : -1)

	// The length of the arc to draw in distance units
	const length = size * radius

	return {
		center,
		radius,
		size,
		length,
		largeArcFlag,
		sweepFlag,
	}
}

function placeCenterHandle(
	center: VecLike,
	radius: number,
	tempA: Vec,
	tempB: Vec,
	tempC: Vec,
	originalArcLength: number,
	isClockwise: boolean
) {
	const aCA = Vec.Angle(center, tempA) // angle center -> a
	const aCB = Vec.Angle(center, tempB) // angle center -> b
	let dAB = clockwiseAngleDist(aCA, aCB) // angle distance between a and b
	if (!isClockwise) dAB = PI2 - dAB

	const n = 0.5 * (isClockwise ? 1 : -1)
	const u = Vec.FromAngle(aCA + dAB * n)
	tempC.setTo(center).add(u.mul(radius))

	if (dAB > originalArcLength) {
		tempC.rotWith(center, PI)
		const t = tempB.clone()
		tempB.setTo(tempA)
		tempA.setTo(t)
	}
}
