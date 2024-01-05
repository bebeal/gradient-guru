import { Vec, VecLike, lerp, pointInPolygon } from '@tldraw/tldraw'
import { SpeechBubbleShape } from './SpeechBubbleUtil'

export const getSpeechBubbleVertices = (shape: SpeechBubbleShape): Vec[] => {
	const { w, h, handles } = shape.props

	const handleInShapeSpace = new Vec(handles.handle.x * w, handles.handle.y * h)

	const [tl, tr, br, bl] = [new Vec(0, 0), new Vec(w, 0), new Vec(w, h), new Vec(0, h)]

	const offsetH = w / 10
	const offsetV = h / 10

	const { adjustedIntersection, intersectionSegmentIndex } = getHandleIntersectionPoint(shape)

	let vertices: Vec[]

	// Inject the tail segments into the geometry of the shape
	switch (intersectionSegmentIndex) {
		case 0:
			// top
			vertices = [
				tl,
				new Vec(adjustedIntersection.x - offsetH, adjustedIntersection.y),
				new Vec(handleInShapeSpace.x, handleInShapeSpace.y),
				new Vec(adjustedIntersection.x + offsetH, adjustedIntersection.y),
				tr,
				br,
				bl,
			]
			break
		case 1:
			// right
			vertices = [
				tl,
				tr,
				new Vec(adjustedIntersection.x, adjustedIntersection.y - offsetV),
				new Vec(handleInShapeSpace.x, handleInShapeSpace.y),
				new Vec(adjustedIntersection.x, adjustedIntersection.y + offsetV),
				br,
				bl,
			]
			break
		case 2:
			// bottom
			vertices = [
				tl,
				tr,
				br,
				new Vec(adjustedIntersection.x + offsetH, adjustedIntersection.y),
				new Vec(handleInShapeSpace.x, handleInShapeSpace.y),
				new Vec(adjustedIntersection.x - offsetH, adjustedIntersection.y),
				bl,
			]
			break
		case 3:
			// left
			vertices = [
				tl,
				tr,
				br,
				bl,
				new Vec(adjustedIntersection.x, adjustedIntersection.y + offsetV),
				new Vec(handleInShapeSpace.x, handleInShapeSpace.y),
				new Vec(adjustedIntersection.x, adjustedIntersection.y - offsetV),
			]
			break
		default:
			throw Error("no intersection found, this shouldn't happen")
	}

	return vertices
}

export function getHandleIntersectionPoint(shape: SpeechBubbleShape) {
	const { w, h, handles } = shape.props
	const handleInShapeSpace = new Vec(handles.handle.x * w, handles.handle.y * h)

	const center = new Vec(w / 2, h / 2)
	const corners = [new Vec(0, 0), new Vec(w, 0), new Vec(w, h), new Vec(0, h)]
	const segments = [
		[corners[0], corners[1]],
		[corners[1], corners[2]],
		[corners[2], corners[3]],
		[corners[3], corners[0]],
	]

	let segmentsIntersection: Vec | null = null
	let intersectionSegment: Vec[] | null = null

	// If the point inside of the box's corners?
	const insideShape = pointInPolygon(handleInShapeSpace, corners)

	// We want to be sure we get an intersection, so if the point is
	// inside the shape, push it away from the center by a big distance
	const pointToCheck = insideShape
		? Vec.Add(handleInShapeSpace, Vec.Sub(handleInShapeSpace, center).uni().mul(1000000))
		: handleInShapeSpace

	// Test each segment for an intersection
	for (const segment of segments) {
		segmentsIntersection = intersectLineSegmentLineSegment(
			segment[0],
			segment[1],
			center,
			pointToCheck
		)

		if (segmentsIntersection) {
			intersectionSegment = segment
			break
		}
	}

	if (!(segmentsIntersection && intersectionSegment)) {
		throw Error("no intersection found, this shouldn't happen")
	}

	const [start, end] = intersectionSegment
	const intersectionSegmentIndex = segments.indexOf(intersectionSegment)

	// a normalised vector from start to end, so this can work in any direction
	const unit = Vec.Sub(end, start).uni()

	// Where is the intersection relative to the start?
	const totalDistance = Vec.Dist(start, end)
	const distance = Vec.Dist(segmentsIntersection, start)

	// make it stick to the middle
	const middleRelative = mapRange(0, totalDistance, -1, 1, distance) // absolute -> -1 to 1
	const squaredRelative = Math.abs(middleRelative) ** 2 * Math.sign(middleRelative) // square it and keep the sign
	const squared = mapRange(-1, 1, 0, totalDistance, squaredRelative) // -1 to 1 -> absolute

	//keep it away from the edges
	const offset = (segments.indexOf(intersectionSegment) % 2 === 0 ? w / 10 : h / 10) * 3
	const constrained = mapRange(0, totalDistance, offset, totalDistance - offset, distance)

	// combine the two
	const interpolated = lerp(constrained, squared, 0.5)

	const adjustedIntersection = unit.mul(interpolated).add(start)

	// We need the adjusted intersection to draw the tail, but the original intersection
	// for the onBeforeUpdate handler
	return {
		segmentsIntersection,
		adjustedIntersection,
		intersectionSegmentIndex,
		insideShape,
	}
}

// This function is copied from the tldraw codebase
function intersectLineSegmentLineSegment(a1: VecLike, a2: VecLike, b1: VecLike, b2: VecLike) {
	const ABx = a1.x - b1.x
	const ABy = a1.y - b1.y
	const BVx = b2.x - b1.x
	const BVy = b2.y - b1.y
	const AVx = a2.x - a1.x
	const AVy = a2.y - a1.y
	const ua_t = BVx * ABy - BVy * ABx
	const ub_t = AVx * ABy - AVy * ABx
	const u_b = BVy * AVx - BVx * AVy

	if (ua_t === 0 || ub_t === 0) return null // coincident

	if (u_b === 0) return null // parallel

	if (u_b !== 0) {
		const ua = ua_t / u_b
		const ub = ub_t / u_b
		if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
			return Vec.AddXY(a1, ua * AVx, ua * AVy)
		}
	}

	return null // no intersection
}

/**
 * Inverse linear interpolation
 */
function invLerp(a: number, b: number, v: number) {
	return (v - a) / (b - a)
}
/**
 * Maps a value from one range to another.
 * e.g. mapRange(10, 20, 50, 100, 15) => 75
 */
function mapRange(a1: number, b1: number, a2: number, b2: number, s: number) {
	return lerp(a2, b2, invLerp(a1, b1, s))
}
