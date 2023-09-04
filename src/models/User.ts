import { Model, Table, Column, PrimaryKey, AutoIncrement, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import 'reflect-metadata';
import bcrypt from 'bcrypt';

@Table
class UserModel extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @Column
    firstName!: string;
  
    @Column
    lastName!: string;

    @Column({ unique: true })
    userName!: string;

    @Column
    password!: string;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: UserModel) {
        if (instance.changed('password')) {
            const hashedPassword = await bcrypt.hash(instance.password, 10);
            instance.password = hashedPassword;
        }}

}

export default UserModel;
