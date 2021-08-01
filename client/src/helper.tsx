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

export function getMembersNames(members: any) {
  let membersNames = [];

  for (let i = 0; i < members.user.length; i++) {
    membersNames.push({
      name: `${members.user[i].firstName} ${members.user[i].lastName}`,
      id: String(members.user[i].id),
      createdBy: String(members.createdBy),
    });
  }

  console.log(membersNames);
  return membersNames;
}
