import { User } from '../../types';

export const user = {
  get(): Promise<User> {
    return Promise.resolve({
      id: 'user-id',
      name: 'Anastasia',
      email: 'anastasia@email.com',
      weight: 62,
      height: 5.5,
      age: 27,
    });
  },
};
