import { User, UserTable } from '../users';

const table = new UserTable();
describe('Users model', () => {
  it('should have an index method', () => {
    expect(table.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(table.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(table.create).toBeDefined();
  });
  it('should have a authenticate method', () => {
    expect(table.authenticate).toBeDefined();
  });

  it('create method should create a user', async () => {
    const result = await table.create({
      first_name: 'mohammed',
      last_name: 'test',
      password: '123',
    });
    expect(result).toEqual({
      id: 1,
      first_name: 'mohammed',
      last_name: 'test',
    } as User);
  });

  it('index method should return all users', async () => {
    const result = await table.index();
    expect(result).toEqual([
      {
        id: 1,
        first_name: 'mohammed',
        last_name: 'test',
      },
    ] as User[]);
  });

  it('show method should show the correct user', async () => {
    const result = await table.show('1');
    expect(result).toEqual({
      id: 1,
      first_name: 'mohammed',
      last_name: 'test',
    } as User);
  });
});
