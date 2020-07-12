import { Controller, Get, Post, Param, Put, Body, Delete } from '@nestjs/common';
import { UserDto, User } from './user';
import { ApiOperation, ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {

    }

    @ApiOperation({ description: "Create User" })
    @Post('create') 
    async create(@Body() userDto: UserDto): Promise<User> {
        let created = await this.usersService.create(userDto)
        return created;
    }

    @ApiOperation({ description: "Get all users" })
    @Get('all')
    getAll(): string {
        return 'This one returns all the users'
    }
    
    @ApiOperation({ description: "Create User by ID" })
    @Get('get/:id')
    getOne(@Param('id') id): string {
        return 'This one returns user with id ' + id
    }

    @ApiOperation({ description: "Update User" })
    @Put('update/:id') 
    update(@Param('id') id, @Body() userDto: UserDto):string {
        return 'This one updates user with id ' + id
    }

    @ApiOperation({ description: "Delete User" })
    @Delete('delete/:id')
    remove(@Param('id') id): string {
        return 'This one deletes user with id ' + id
    }
}