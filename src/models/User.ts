import { Model, Table, Column, PrimaryKey, AutoIncrement, BeforeCreate } from 'sequelize-typescript';
import 'reflect-metadata';
import bcrypt from 'bcrypt';

/**
 * User model representing a user in the database.
 */
@Table({ tableName: 'Users' })
class User extends Model {
    
    /**
     * Unique id for the user.
     * @type {number}
     */
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    // Ajouter une colonne rôle de type enum avec les valeurs Admin et User
    @Column({ type: 'enum', values: ['Admin', 'User'], defaultValue: 'User' })
    role!: string;
    
    @Column
    firstName!: string;
  
    @Column
    lastName!: string;

    @Column({ unique: true })
    userName!: string;

    @Column
    password!: string;


    /**
     * Hashes the user's password before creating or updating the user record.
     */
    @BeforeCreate
    static async hashPassword(instance: User) {
        if (instance.changed('password')) {
            const hashedPassword = await bcrypt.hash(instance.password, 10);
            instance.password = hashedPassword;
        }}

}

export default User;
