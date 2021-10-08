import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // console.log('login req', req);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('onboarding')
  getOnboarding(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('onboarding-step')
  setOnboardingStep(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('wealth-manager-company')
  setWMCompany(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('wealth-manager-company')
  getWMCompany(@Request() req) {
    return req.user;
  }
 
}
