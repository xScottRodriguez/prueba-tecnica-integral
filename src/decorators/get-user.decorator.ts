import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// get user decorator
export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  console.log('request.user', request.user);
  return request.user;
});
