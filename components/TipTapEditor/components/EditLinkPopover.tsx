import { Icon } from '@/components/Primitives/Icons/Icon'
import * as Popover from '@radix-ui/react-popover'
import { TipTapToolbar } from '../TipTapToolbar'
import { LinkEditorPanel } from './LinkEditorPanel'

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <TipTapToolbar.Button tooltip="Set Link">
          <Icon set="Lucide" icon="Link" />
        </TipTapToolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popover.Content>
    </Popover.Root>
  )
}
