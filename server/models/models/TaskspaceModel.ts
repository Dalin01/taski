import {
  Table,
  Model,
  Column,
  BelongsToMany,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import User from './UserModel';
import UserTaskspace from './UserTaskspaceModel';
import Task from './TaskModel';

@Table
export default class Taskspace extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  createdBy!: number;

  @BelongsToMany(() => User, () => UserTaskspace)
  user?: User[];

  @HasMany(() => Task)
  tasks?: Task[];
}
