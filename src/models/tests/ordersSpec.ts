import { Order_Class} from "../orders";

const orderObj = new Order_Class();

describe('Order model', () => {
  describe('Order methods should be defined', () => {
  it('should have a show method', () => {
    expect(orderObj.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(orderObj.create).toBeDefined();
  });
});

describe('Order methods should work as expected', () =>{
  it('create method should create an order', async () => {
    const result = await orderObj.create({
      status: 'open',
      user_id: '1'
    });
    expect(result).toEqual({
      id: 1,
      status: 'open',
      user_id: '1'
    });
  });

  it('show method should show the all orders made by the user using his user_id ', async () => {
    const result = await orderObj.show('1');
    expect(result).toEqual([{
      id: 1,
      status:'open',
      user_id: '1'
    }]);
  });
});
});
