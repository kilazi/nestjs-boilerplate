import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getAll(): string {
        return 'This one returns all the users'
    }

    @Post() 
    create(): string {
        return 'This one creates a user'
    }
}