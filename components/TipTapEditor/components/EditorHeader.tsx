import { WebSocketStatus } from "@hocuspocus/provider"
import { EditorUser } from "../constants"
import { TipTapToolbar } from "../TipTapToolbar"
import { Icon } from "@/components/Primitives"
import { EditorInfo } from "./EditorInfo"
import { cn } from "@/utils/utils"

export type EditorHeaderProps = {
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  characters: number
  words: number
  collabState?: WebSocketStatus
  users: EditorUser[]
}

export const EditorHeader = ({
  characters,
  collabState,
  users,
  words,
  isSidebarOpen=false,
  toggleSidebar,
}: EditorHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-primary border-b w-full dark:border-neutral-800 border-neutral-200">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="flex items-center gap-x-1.5">
          <TipTapToolbar.Button
            tooltip={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={cn(isSidebarOpen ? 'bg-transparent' : '', 'h-8')}
          >
            <Icon set="Lucide" icon={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'} />
          </TipTapToolbar.Button>
        </div>
      </div>
      <EditorInfo characters={characters} words={words} collabState={collabState} users={users} />
    </div>
  )
}
