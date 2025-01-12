import { ERole } from "src/utils/enums/role.enum";

export interface LoggedInterface {
  id: number;
  email: string;
  role: ERole;
}
