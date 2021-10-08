import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UserType {
  Investor = 'investor',
  WealthManager = 'wealth-manager'
}

export enum OnboardingStatus {
  None = 'none',
  AllSet = 'all-set'
}

export class SignupDto {
  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  onboard: OnboardingStatus;
}

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}