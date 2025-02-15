import { IEntity } from "src/interfaces/IEntity";
import { ERole } from "src/utils/enums/role.enum";
import { Entity, Column } from "typeorm";

@Entity("users")
export class User extends IEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: ERole })
  role: ERole;
}
