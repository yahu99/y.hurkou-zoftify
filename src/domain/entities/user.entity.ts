import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRolesEnum } from '../enums/roles.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserRolesEnum,
    default: UserRolesEnum.USER,
  })
  role: UserRolesEnum;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
