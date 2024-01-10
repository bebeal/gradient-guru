'use client'

import { useBreakpoint, useReadonly, useEditor } from "@tldraw/tldraw";
import { ActionsMenu } from "@tldraw/tldraw/src/lib/ui/components/ActionsMenu";
import { DuplicateButton } from "@tldraw/tldraw/src/lib/ui/components/DuplicateButton";
import { PageMenu } from "@tldraw/tldraw/src/lib/ui/components/PageMenu/PageMenu";
import { RedoButton } from "@tldraw/tldraw/src/lib/ui/components/RedoButton";
import { TrashButton } from "@tldraw/tldraw/src/lib/ui/components/TrashButton";
import { UndoButton } from "@tldraw/tldraw/src/lib/ui/components/UndoButton";
import { Menu } from "@tldraw/tldraw/src/lib/ui/components/Menu";

export interface FlowMenuProps {
}

export const FlowMenu: React.FC<FlowMenuProps> = () => {
  const editor = useEditor()

	const breakpoint = useBreakpoint()
	const isReadonly = useReadonly()

	return (
		<div className="tlui-menu-zone">
			<div className="tlui-buttons__horizontal w-full">
				<Menu />
				<PageMenu />
				{breakpoint >= 6 && !isReadonly && !editor.isInAny('hand', 'zoom') && (
					<>
						<UndoButton />
						<RedoButton />
						<TrashButton />
						<DuplicateButton />
						<ActionsMenu />
					</>
				)}
			</div>
		</div>
	);
};
