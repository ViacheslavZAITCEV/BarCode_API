import { UserModel } from './user.model';

describe('AuthModele', () => {
  it('should be defined', () => {
    expect(new UserModel()).toBeDefined();
  });
});
