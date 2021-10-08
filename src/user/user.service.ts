import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async create(user: any): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async find(email: string): Promise<User> {
        return this.userModel.findOne({ email: email }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}