import {
  Table,
  Model,
  Column,
  BelongsToMany,
  Scopes,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { Workspace } from './Workspace';
import { UserWorkspace } from './UserWorkspace';

@Table
export class User extends Model<User> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  })
  id!: number;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @BelongsToMany(() => Workspace, () => UserWorkspace)
  workspaces?: Workspace[];

  async matchPassword(password: string) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (e) {
      return new Error('Match Failed');
    }
  }
}
