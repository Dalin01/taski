import { Workspace } from './types';
export function getCurrentWorkspace(
  workspaces: Workspace,
  name: string,
  id: string
) {
  const { workspace } = workspaces;
  for (let i = 0; i < workspace.length; i++) {
    if (workspace[i].name === name && String(workspace[i].id) === id) {
      return workspace[i];
    }
  }
}
