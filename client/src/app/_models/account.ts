import { Role } from './role';

export class Account {
    id: string | undefined;
    title: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    role: Role | undefined;
    jwtToken?: string;
}