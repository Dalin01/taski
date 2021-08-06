import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Taskspace from './TaskspaceModel';

@Table
export default class Task extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id!: number;

  @Column({
    type: DataTypes.STRING(500),
  })
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

  @ForeignKey(() => Taskspace)
  @Column
  workspaceId!: number;

  @BelongsTo(() => Taskspace)
  workspace?: Taskspace;
}
