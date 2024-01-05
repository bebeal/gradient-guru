'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { BaseBoxShapeUtil, HTMLContainer, SvgExportContext, TLBaseShape, toDomPrecision, useIsEditing, useValue, Vec } from '@tldraw/tldraw';
import { useToasts } from '@/hooks';
import { LINK_HOST, PROTOCOL } from '@/utils';
import { EditingIndicator, formatNodeId } from '../../Extensions/shared';
import { Loader, PreviewNodeDropdown } from '@/components';

export type PreviewNode = TLBaseShape<
  'preview',
  {
    html: string;
    source: string;
    w: number;
    h: number;
    uploadedNodeId?: string;
    dateCreated?: number;
    version?: number;
    availableVersions?: number[];
  }
>;

export class PreviewNodeUtil extends BaseBoxShapeUtil<PreviewNode> {
  static override type = 'preview' as const;

  getDefaultProps(): PreviewNode['props'] {
    return {
      html: '',
      source: '',
      w: (960 * 2) / 3,
      h: (540 * 2) / 3,
      uploadedNodeId: '',
      dateCreated: Date.now(),
      version: 0,
      availableVersions: [],
    };
  }

  override canEdit = () => true;
  override isAspectRatioLocked = (node: PreviewNode) => false;
  override canResize = (node: PreviewNode) => true;
  override canBind = (node: PreviewNode) => false;
  override canUnmount = () => false;

  override component(node: PreviewNode) {
    const isEditing = useIsEditing(node.id);
    const toast = useToasts();

    const boxShadow = useValue('box shadow', () => {
        const rotation = this.editor.getShapePageTransform(node)!.rotation();
        return getRotatedBoxShadow(rotation);
    }, [this.editor]);

    const { html, uploadedNodeId } = node.props;

    const isLoading = uploadedNodeId !== node.id;

    const uploadUrl = [PROTOCOL, LINK_HOST, '/', formatNodeId(node.id)].join('');

    const stopPropagation = (e: any) => {
      e.stopPropagation();
    };

    return (
      <HTMLContainer className="tl-embed-container bg-primary w-auto h-auto flex justify-center items-center pointer-events-auto" id={node.id}>
        {isLoading ? (
          <div
            className="bg-primary flex items-center justify-center w-full h-full"
            style={{
              boxShadow,
              border: '1px solid var(--color-panel-contrast)',
              borderRadius: 'var(--radius-2)',
            }}
          >
            <Loader />
          </div>
        ) : (
          <>
            <iframe
              id={`iframe-1-${node.id}`}
              src={`${uploadUrl}?preview=1&version=${node.props.version}`}
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
              <PreviewNodeDropdown html={html} uploadUrl={uploadUrl} />
            </div>
            <EditingIndicator isEditing={isEditing} />
          </>
        )}
      </HTMLContainer>
    );
  }

  override toSvg(shape: PreviewNode, _ctx: SvgExportContext): SVGElement | Promise<SVGElement> {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // while screenshot is the same as the old one, keep waiting for a new one
    return new Promise((resolve, _) => {
      if (window === undefined) return resolve(g);
      const windowListener = (event: MessageEvent) => {
        if (event.data.screenshot && event.data?.shapeid === shape.id) {
          const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', event.data.screenshot);
          image.setAttribute('width', shape.props.w.toString());
          image.setAttribute('height', shape.props.h.toString());
          g.appendChild(image);
          window.removeEventListener('message', windowListener);
          clearTimeout(timeOut);
          resolve(g);
        }
      };
      const timeOut = setTimeout(() => {
        resolve(g);
        window.removeEventListener('message', windowListener);
      }, 2000);
      window.addEventListener('message', windowListener);
      //request new screenshot
      const firstLevelIframe = document.getElementById(`iframe-1-${shape.id}`) as HTMLIFrameElement;
      if (firstLevelIframe) {
        firstLevelIframe?.contentWindow?.postMessage({ action: 'take-screenshot', shapeid: shape.id }, '*');
      } else {
        console.log('first level iframe not found or not accessible');
      }
    });
  }

  indicator(shape: PreviewNode) {
    return <rect width={shape.props.w} height={shape.props.h} />;
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
    const { offsetX, offsetY, blur, spread, color } = shadow;
    const vec = new Vec(offsetX, offsetY);
    const { x, y } = vec.rot(-rotation);
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  });
  return cssStrings.join(', ');
};
