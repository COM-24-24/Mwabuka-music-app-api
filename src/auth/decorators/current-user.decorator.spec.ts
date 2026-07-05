import { ExecutionContext } from '@nestjs/common';
import { getCurrentUser } from './current-user.decorator';

describe('CurrentUser', () => {
  it('returns the authenticated user from the request', () => {
    const user = { id: 1, email: 'fan@example.com' };
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as unknown as ExecutionContext;

    expect(getCurrentUser(ctx)).toEqual(user);
  });
});
