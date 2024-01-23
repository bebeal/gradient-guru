'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { BaseBoxShapeUtil, HTMLContainer, SvgExportContext, TLBaseShape, toDomPrecision, useIsEditing, useValue, Vec } from '@tldraw/tldraw';
import { useToasts } from '@/hooks';
import { LINK_HOST, PROTOCOL } from '@/utils';
import { EditingIndicator, formatNodeId } from '../../Extensions/shared';
import { Loading, PreviewNodeDropdown } from '@/components';
import { Suspense } from 'react';

export type PreviewNodeBaseProps = {
  html: string;
  source?: string;
  version?: number;
  dateCreated?: number;
};

export type PreviewNodeProps = PreviewNodeBaseProps & {
  w: number;
  h: number;
  uploadedNodeId?: string;
};

export type PreviewNode = TLBaseShape<'preview', PreviewNodeProps>;

export class PreviewNodeUtil extends BaseBoxShapeUtil<PreviewNode> {
  static override type = 'preview' as const;

  getDefaultProps(): PreviewNode['props'] {
    return {
      w: (960 * 2) / 3,
      h: (540 * 2) / 3,
      html: '',
      source: '',
      dateCreated: Date.now(),
    };
  }

  override canEdit = () => true;
  override isAspectRatioLocked = (node: PreviewNode) => false;
  override canResize = (node: PreviewNode) => true;
  override canBind = (node: PreviewNode) => false;
  override canUnmount = () => false;

  override component(node: PreviewNode) {
    const { w, h, html, source, version, dateCreated } = node.props;
    const id = formatNodeId(node.id);
    const uploadUrl = `${PROTOCOL}${LINK_HOST}/${id}`;
    const isLoading = html.length < 25 || version === undefined;
    const isEditing = useIsEditing(node.id);
    const toast = useToasts();

    const boxShadow = useValue('box shadow', () => {
        const rotation = this.editor.getShapePageTransform(node)!.rotation();
        return getRotatedBoxShadow(rotation);
    }, [this.editor]);

    return (
      <HTMLContainer className="tl-embed-container bg-primary w-auto h-auto flex justify-center items-center pointer-events-auto" id={`html-container-${id}`}>
        {isLoading ? (
          <div
            className="bg-primary flex items-center justify-center w-auto h-auto"
            style={{
              boxShadow,
              border: '1px solid var(--color-panel-contrast)',
              borderRadius: 'var(--radius-2)',
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
          <Suspense fallback={<Loading />}>
            <iframe
              id={`iframe-preview-${id}`}
              src={`${uploadUrl}?preview=1`}
              width={toDomPrecision(w)}
              height={toDomPrecision(h)}
              draggable={false}
              style={{
                pointerEvents: isEditing ? 'auto' : 'none',
                boxShadow,
                border: '1px solid var(--color-panel-contrast)',
                borderRadius: 'var(--radius-2)',
              }}
            />
            </Suspense>
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

  override toSvg(node: PreviewNode, _ctx: SvgExportContext): SVGElement | Promise<SVGElement> {
    const id = formatNodeId(node.id);
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // while screenshot is the same as the old one, keep waiting for a new one
    return new Promise((resolve, _) => {
      if (window === undefined) return resolve(g);
      const windowListener = (event: MessageEvent) => {
        const eventId = formatNodeId(event.data?.nodeid);
        if (event.data.screenshot && eventId === id) {
          const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', event.data.screenshot);
          image.setAttribute('width', node.props.w.toString());
          image.setAttribute('height', node.props.h.toString());
          g.appendChild(image);
          window.removeEventListener('message', windowListener);
          clearTimeout(timeOut);
          resolve(g);
        }
      };
      const timeOut = setTimeout(() => {
        resolve(g);
        window.removeEventListener('message', windowListener);
      }, 5000);
      window.addEventListener('message', windowListener);
      // request new screenshot
      const firstLevelIframe = document.getElementById(`iframe-preview-${id}`) as HTMLIFrameElement;
      if (firstLevelIframe) {
        firstLevelIframe?.contentWindow?.postMessage({ action: 'take-screenshot', nodeid: id }, '*');
      } else {
        console.log('first level iframe not found or not accessible', id);
      }
    });
  }

  indicator(node: PreviewNode) {
    return <rect width={node.props.w} height={node.props.h} />;
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