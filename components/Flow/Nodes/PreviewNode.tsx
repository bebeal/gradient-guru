'use client';

/* eslint-disable react-hooks/rules-of-hooks */
;
import { BaseBoxShapeUtil, DefaultSpinner, HTMLContainer, SvgExportContext, TLBaseShape, toDomPrecision, useIsEditing, useToasts, useValue, Vec2d } from '@tldraw/tldraw';
import { useApi } from '@/hooks';
import { LINK_HOST, PROTOCOL } from '@/utils';
import { EditingIndicator, formatNodeId } from '../Extensions/shared';


export type PreviewNode = TLBaseShape<
	'preview',
	{
		html: string
		source: string
		w: number
		h: number
		linkUploadVersion?: number
		uploadedNodeId?: string
		dateCreated?: number
	}
>

export class PreviewNodeUtil extends BaseBoxShapeUtil<PreviewNode> {
	static override type = 'preview' as const

	getDefaultProps(): PreviewNode['props'] {
		return {
			html: '',
			source: '',
			w: (960 * 2) / 3,
			h: (540 * 2) / 3,
			dateCreated: Date.now(),
		}
	}

	override canEdit = () => true
	override isAspectRatioLocked = (node: PreviewNode) => false
	override canResize = (node: PreviewNode) => true
	override canBind = (node: PreviewNode) => false
	override canUnmount = () => false

	override component(node: PreviewNode) {
		const isEditing = useIsEditing(node.id);
		const toast = useToasts();
    const api = useApi();

		const boxShadow = useValue(
			'box shadow',
			() => {
				const rotation = this.editor.getShapePageTransform(node)!.rotation()
				return getRotatedBoxShadow(rotation)
			},
			[this.editor]
		)

		const { html, linkUploadVersion, uploadedNodeId } = node.props

		// upload the html if we haven't already:
		// useEffect(() => {
		// 	let isCancelled = false
		// 	if (html && html.length > 0 && (linkUploadVersion === undefined || uploadedNodeId !== node.id)) {
		// 		(async () => {
    // //       const body = { id: formatNodeId(node.id), html };
    // //       await api.putS3(body);
    
		// 			if (isCancelled) return

		// 			this.editor.updateShape<PreviewNode>({
		// 				id: node.id,
		// 				type: 'preview',
		// 				props: {
		// 					linkUploadVersion: 1,
		// 					uploadedNodeId: formatNodeId(node.id),
		// 				},
		// 			})
		// 		})()
		// 	}
		// 	return () => {
		// 		isCancelled = true
		// 	}
		// }, [node.id, html, linkUploadVersion, uploadedNodeId, api]);

		const isLoading = linkUploadVersion === undefined || uploadedNodeId !== node.id

		const uploadUrl = [PROTOCOL, LINK_HOST, '/', formatNodeId(node.id)].join('')

		return (
			<HTMLContainer className="tl-embed-container" id={node.id}>
				{isLoading ? (
					<div
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: 'var(--color-culled)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow,
							border: '1px solid var(--color-panel-contrast)',
							borderRadius: 'var(--radius-2)',
						}}
					>
						<DefaultSpinner />
					</div>
				) : (
					<>
						<iframe
							id={`iframe-1-${node.id}`}
							src={`${uploadUrl}?preview=1&v=${linkUploadVersion}`}
							width={toDomPrecision(node.props.w)}
							height={toDomPrecision(node.props.h)}
							draggable={false}
							style={{
								pointerEvents: isEditing ? 'auto' : 'none',
								boxShadow,
								border: '1px solid var(--color-panel-contrast)',
								borderRadius: 'var(--radius-2)',
							}}
						/>
						<div
							style={{
								all: 'unset',
								position: 'absolute',
								top: -3,
								right: -45,
								height: 40,
								width: 40,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
								pointerEvents: 'all',
							}}
						>
							{/* <Dropdown boxShadow={boxShadow} html={shape.props.html} uploadUrl={uploadUrl}>
								<button className="bg-white rounded p-2" style={{ boxShadow }}>
									<Icon icon="dots-vertical" />
								</button>
							</Dropdown> */}
						</div>
            <EditingIndicator isEditing={isEditing} />
					</>
				)}
			</HTMLContainer>
		)
	}

	override toSvg(shape: PreviewNode, _ctx: SvgExportContext): SVGElement | Promise<SVGElement> {
		const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		// while screenshot is the same as the old one, keep waiting for a new one
		return new Promise((resolve, _) => {
			if (window === undefined) return resolve(g)
			const windowListener = (event: MessageEvent) => {
				if (event.data.screenshot && event.data?.shapeid === shape.id) {
					const image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
					image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', event.data.screenshot)
					image.setAttribute('width', shape.props.w.toString())
					image.setAttribute('height', shape.props.h.toString())
					g.appendChild(image)
					window.removeEventListener('message', windowListener)
					clearTimeout(timeOut)
					resolve(g)
				}
			}
			const timeOut = setTimeout(() => {
				resolve(g)
				window.removeEventListener('message', windowListener)
			}, 2000)
			window.addEventListener('message', windowListener)
			//request new screenshot
			const firstLevelIframe = document.getElementById(`iframe-1-${shape.id}`) as HTMLIFrameElement
			if (firstLevelIframe) {
				firstLevelIframe?.contentWindow?.postMessage(
					{ action: 'take-screenshot', shapeid: shape.id },
					'*'
				)
			} else {
				console.log('first level iframe not found or not accessible')
			}
		})
	}

	indicator(shape: PreviewNode) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}

const ROTATING_BOX_SHADOWS = [
	{
		offsetX: 0,
		offsetY: 2,
		blur: 4,
		spread: -1,
		color: '#0000003a',
	},
	{
		offsetX: 0,
		offsetY: 3,
		blur: 12,
		spread: -2,
		color: '#0000001f',
	},
];

const getRotatedBoxShadow = (rotation: number) => {
	const cssStrings = ROTATING_BOX_SHADOWS.map((shadow) => {
		const { offsetX, offsetY, blur, spread, color } = shadow
		const vec = new Vec2d(offsetX, offsetY)
		const { x, y } = vec.rot(-rotation)
		return `${x}px ${y}px ${blur}px ${spread}px ${color}`
	})
	return cssStrings.join(', ')
};