import { Injectable, Inject } from "@nestjs/common";
import { User, UserDto } from "./user";
import { USER_MODEL } from "../../db/constants";
import { Model } from "mongoose";

@Injectable()
export class UsersService {

    constructor(
        @Inject(USER_MODEL)
        private userModel: Model<User>
    ) {

    }

    async create(user: UserDto): Promise<User> {        
        const created = new this.userModel(user);
        return created.save();
    }

    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    // getAll(): User[] {
    //     // return this.users;
    // }
}