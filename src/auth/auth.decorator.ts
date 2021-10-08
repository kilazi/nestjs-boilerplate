import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  // console.log('HEADERS', req.args[0]);

  return req.args[0].user;
});