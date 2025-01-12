// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { getUser } from 'src/utils/auth.util';

// export const GetCompanyId = createParamDecorator(async (_: unknown, context: ExecutionContext) => {
//   const request = context.switchToHttp().getRequest();
//   const user = getUser(request);
//   const companyService = request.companyService;
//   return await companyService.getCompanyIdByUserId(user.id);
// });
