import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { jwtConstants } from "src/auth/auth.constants";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        })
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService]
})
export class UserModule { }