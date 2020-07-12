import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export class UserDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password?: string;
}

export interface User extends Document {
    name: String;
    email: String;
    password?: String;
}
