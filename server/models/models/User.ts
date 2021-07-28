import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
