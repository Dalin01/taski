import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

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

  @CreatedAt
  @Column(DataType.DATE)
  createdAt?: Date | number;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt?: Date | number;

  async matchPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
