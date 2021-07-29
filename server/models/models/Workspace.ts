import {
  Table,
  Model,
  Column,
  BelongsToMany,
  Scopes,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './User';
import { UserWorkspace } from './UserWorkspace';

@Table
export class Workspace extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @BelongsToMany(() => User, () => UserWorkspace)
  user?: User[];
}