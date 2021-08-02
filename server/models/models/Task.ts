import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Workspace } from './Workspace';

@Table
export class Task extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id!: number;

  @Column
  task!: string;

  @Column
  assignedTo!: string;

  @Column
  createdBy!: string;

  @Column
  deadline!: string;

  @Column
  status!: string;

  @Column
  workspaceName!: string;

  @ForeignKey(() => Workspace)
  @Column
  workspaceId!: string;

  @BelongsTo(() => Workspace)
  workspace?: Workspace;
}
