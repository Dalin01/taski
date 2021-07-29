import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Workspace } from './Workspace';

@Table
export class UserWorkspace extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Workspace)
  @Column
  workspaceId!: number;
}
