import {
  Table,
  Model,
  Column,
  BelongsToMany,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { User } from './User';
import { UserWorkspace } from './UserWorkspace';
import { Task } from './Task';

@Table
export class Workspace extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  createdBy!: number;

  @BelongsToMany(() => User, () => UserWorkspace)
  user?: User[];

  @HasMany(() => Task)
  tasks?: Task[];
}
