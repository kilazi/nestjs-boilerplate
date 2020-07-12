import { Injectable } from "@nestjs/common";
import { User, UserDto } from "./user";

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(user: User) {        
        this.users.push(user)
    }

    getAll(): User[] {
        return this.users;
    }
}