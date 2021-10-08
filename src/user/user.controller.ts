
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, Headers } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { LoginDto, OnboardingStatus, SignupDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }


  @Post('signup')
  async signup(@Body() create: SignupDto, @Res() response: Response) {
    console.log('signup', create);
    create.password = await bcrypt.hash(create.password, 10);
    if(!create.onboard) {
      create.onboard = OnboardingStatus.None;
    }
    let user = await this.userService.create(create).catch(err => {
      console.log('create user error', err.message);
    })
    if (user) {
      console.log('User create', user);
      response.status(HttpStatus.CREATED)
        .send({
          token: this.jwtService.sign({
            email: user.email,
            type: user.type,
            onboard: user.onboard
          }),
        });
    } else {
      response.status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'User with this email already exists' });
    }
  }

  @Post('login')
  async login(@Body() login: LoginDto, @Res() response: Response) {
    
    let user = await this.userService.find(login.email).catch(err => {
      response.status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'Email or password is incorrect' });
    });
    if (user) {
      const isMatch = await bcrypt.compare(login.password, user.password);
      if (user && isMatch) {
        response.status(HttpStatus.ACCEPTED)
          .send({
            token: this.jwtService.sign({
              email: user.email,
              type: user.type,
              onboard: user.onboard
            }),
          });
      } else {
        response.status(HttpStatus.UNAUTHORIZED)
          .send({ message: 'Email or password is incorrect' });
      }
    } else {
      response.status(HttpStatus.NOT_FOUND)
          .send({ message: 'User not found' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@AuthUser() auth: any, @Res() response: Response) {


    let res: any;
    let err: any;

    if (auth && auth.user && auth.user.email) {
      let user = await this.userService.find(auth.user.email).catch(err => {
        response.status(HttpStatus.NOT_FOUND)
          .send({ message: 'User not found' });
      });
      if (user) {
       
        response.status(HttpStatus.ACCEPTED)
          .send({
            email: user.email,
            type: user.type,
            name: user.name,
            onboard: user.onboard
          });
      } else {
        response.status(HttpStatus.NOT_FOUND)
          .send({ message: 'User not found' });
      }
    } else {
      response.status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'Invalid token' });
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('renew')
  async renewJwt(@AuthUser() auth: any, @Res() response: Response) {
    if (auth && auth.user && auth.user.email) {
      let user = await this.userService.find(auth.user.email).catch(err => {
        response.status(HttpStatus.NOT_FOUND)
          .send({ message: 'User not found' });
      });
      if (user) {       
        response.status(HttpStatus.CREATED)
        .send({
          token: this.jwtService.sign({
            email: user.email,
            type: user.type,
            onboard: user.onboard
          }),
        });
      }
    } else {
      response.status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'Invalid token' });
    }
  }
}


  // @Get()
  // async findAll(): Promise<User[]> {
  //   // console.log('user GET req');
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param() params): Promise<User> {
  //   console.log('user GET req');
  //   return this.userService.find(params.id);
  // }
