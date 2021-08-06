import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import User from './UserModel';
import Taskspace from './TaskspaceModel';

@Table
export default class UserTaskspace extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Taskspace)
  @Column
  workspaceId!: number;
}
