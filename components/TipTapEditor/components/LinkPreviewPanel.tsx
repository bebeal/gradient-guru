import { Icon } from "@/components/Primitives/Icons/Icon"
import { Tooltip } from "@/components/Primitives/Tooltip"
import { TipTapToolbar } from "../TipTapToolbar"

export type LinkPreviewPanelProps = {
  url: string
  onEdit: () => void
  onClear: () => void
}

export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-white dark:bg-black rounded-lg">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline break-all">
        {url}
      </a>
      <TipTapToolbar.Divider />
      <Tooltip content="Edit link">
        <TipTapToolbar.Button onClick={onEdit}>
          <Icon set="Lucide" icon="Pen" />
        </TipTapToolbar.Button>
      </Tooltip>
      <Tooltip content="Remove link">
        <TipTapToolbar.Button onClick={onClear}>
          <Icon set="Lucide" icon="Trash2" />
        </TipTapToolbar.Button>
      </Tooltip>
    </div>
  )
};
