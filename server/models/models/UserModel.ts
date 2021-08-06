import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import Taskspace from './TaskspaceModel';
import UserTaskspace from './UserTaskspaceModel';

@Table
export default class User extends Model<User> {
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

  @BelongsToMany(() => Taskspace, () => UserTaskspace)
  workspaces?: Taskspace[];

  async matchPassword(password: string) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (e) {
      console.error(e);
    }
  }
}
