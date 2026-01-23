import FolderKanban from "lucide-react/dist/esm/icons/folder-kanban";
import type { CodexEnvironment } from "../../../types";

type SidebarHeaderProps = {
  onSelectHome: () => void;
  onAddWorkspace: () => void;
  codexEnvironments: CodexEnvironment[];
  activeCodexEnvironmentId: string | null;
  onSelectCodexEnvironment: (id: string | null) => void;
};

export function SidebarHeader({
  onSelectHome,
  onAddWorkspace,
  codexEnvironments,
  activeCodexEnvironmentId,
  onSelectCodexEnvironment,
}: SidebarHeaderProps) {
  const selectedId =
    activeCodexEnvironmentId &&
    codexEnvironments.some((env) => env.id === activeCodexEnvironmentId)
      ? activeCodexEnvironmentId
      : "default";
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-row">
        <button
          className="subtitle subtitle-button"
          onClick={onSelectHome}
          data-tauri-drag-region="false"
          aria-label="Open home"
        >
          <FolderKanban className="sidebar-nav-icon" />
          Projects
        </button>
        <button
          className="ghost workspace-add"
          onClick={onAddWorkspace}
          data-tauri-drag-region="false"
          aria-label="Add workspace"
        >
          +
        </button>
      </div>
      <div className="sidebar-env">
        <div className="sidebar-env-label">Environment</div>
        <select
          className="sidebar-env-select"
          value={selectedId}
          onChange={(event) => {
            const value = event.target.value;
            onSelectCodexEnvironment(value === "default" ? null : value);
          }}
        >
          <option value="default">Default</option>
          {codexEnvironments.map((env) => (
            <option key={env.id} value={env.id}>
              {env.name.trim() || "Unnamed"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
