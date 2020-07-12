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

    @Get('all')
    getAll(): string {
        return 'This one returns all the users'
    }
    
    @Get('get/:id')
    getOne(@Param('id') id): string {
        return 'This one returns user with id ' + id
    }

    @Put('update/:id') 
    update(@Param('id') id, @Body() userDto: UserDto):string {
        return 'This one updates user with id ' + id
    }

    @Delete('delete/:id')
    remove(@Param('id') id): string {
        return 'This one deletes user with id ' + id
    }

    @Get('admins')
    getAdmins(): string {
        return 'This one returns only admin users'
    }
}