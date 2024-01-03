'use client'

import { DropdownMenu, IconSetCache } from '@/components';
import { useToasts } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { openStackBlitzUrl, createCodePenUrl, createCodeSandboxUrl, createReplitUrl } from '@/utils';

export const PreviewNodeDropdown = (props: any) => {
  const {
    html,
    uploadUrl,
  } = props;
  const toast = useToasts();

	const copyLink = useCallback(() => {
		if (navigator && navigator.clipboard) {
			navigator.clipboard.writeText(uploadUrl);
			toast.addToast({
				icon: 'link',
				title: 'Copied link to clipboard',
			});
		}
	}, [uploadUrl, toast])

	const copyHtml = useCallback(() => {
		if (navigator && navigator.clipboard) {
			navigator.clipboard.writeText(html)
			toast.addToast({
				icon: 'code',
				title: 'Copied html to clipboard',
			})
		}
	}, [html, toast])

	const openInCodeSandbox = useCallback(() => {
		try {
			const sandboxUrl: any = createCodeSandboxUrl(html);
			window.open(sandboxUrl);
		} catch {
			toast.addToast({ title: 'There was a problem opening in CodeSandbox.' })
		}
	}, [html, toast])

	const openInStackBlitz = useCallback(() => {
		try {
			openStackBlitzUrl(html);
		} catch (e) {
			toast.addToast({ title: 'There was a problem opening in Stackblitz.' })
		}
	}, [html, toast])

	const openInReplit = useCallback(async () => {
		try {
			const { error, url }: any = createReplitUrl(html);
			console.log(error, url)
			if (error) {
				console.error(error)
				throw Error()
			}
			window.open(url)
		} catch (e) {
			toast.addToast({ title: 'There was a problem opening in Replit.' })
		}
	}, [html, toast])

	const openInCodePen = useCallback(async () => {
    try {
      const { error, url }: any = createCodePenUrl(html);
      console.log(error, url);
      if (error) {
        console.error(error);
        throw Error();
      }
      window.open(url);
    } catch (e) {
      toast.addToast({ title: 'There was a problem opening in CodePen.' });
    }
	}, [html, toast])

  const DropdownItems: any = useMemo(() => {
    return [
      {
        type: 'item',
        children: (<div className="flex gap-1 h-full items-center justify-center"><IconSetCache.Carbon.Link height={"100%"} />Copy Link</div>),
        action: copyLink,
      },
      {
        type: 'item',
        children: (<div className="flex gap-1 h-full items-center justify-center"><IconSetCache.Carbon.Code height={"100%"} />Copy Code</div>),
        action: copyHtml,
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        children: (<div className="flex gap-1 h-full items-center justify-center"><IconSetCache.Carbon.NewTab height={"100%"} />Open in New Tab</div>),
        action: () => window.open(uploadUrl),
      },
      {
        type: 'item',
        title: 'CodePen',
        children: (<div className="flex gap-1 h-full items-center justify-center"><IconSetCache.Logos.CodePen height={"100%"} />Open in CodePen</div>),
        action: openInCodePen,
        disabled: true,
      },
      {
        type: 'item',
        title: 'CodeSandbox',
        children: (<div className="flex gap-1 h-full items-center justify-center"><IconSetCache.Logos.CodeSandbox height={"100%"} />Open in CodeSandbox</div>),
        action: openInCodeSandbox,
      },
      {
        type: 'item',
        title: 'Replit',
        children: (<div className="flex gap-1 h-full items-center justify-center"><IconSetCache.Logos.Replit height={"100%"} />Open in Replit</div>),
        action: openInReplit,
        disabled: true,
      },
      {
        type: 'item',
        title: 'StackBlitz',
        children: (<div className="flex gap-1 h-full items-center"><IconSetCache.Logos.StackBlitz height={"100%"} />Open in StackBlitz</div>),
        action: openInStackBlitz,
      }
    ];
  }, [copyHtml, copyLink, openInCodePen, openInCodeSandbox, openInReplit, openInStackBlitz, uploadUrl]);
  
  return (
    <DropdownMenu items={DropdownItems}>
      <IconSetCache.Carbon.Menu width="100%" height="100%" />
    </DropdownMenu>
  )
};
