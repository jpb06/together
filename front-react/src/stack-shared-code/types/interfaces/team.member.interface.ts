import { TerseUser } from "./user.interfaces";

export interface TeamMember extends TerseUser {
  status: string;
  joinDate: string;
}
