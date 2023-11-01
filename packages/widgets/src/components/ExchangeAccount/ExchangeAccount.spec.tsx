import { ExchangeAccount } from './ExchangeAccount';
import { dataValues } from './helpers';

const commonProps = {
  platform: dataValues[0].platform,
  title: dataValues[0].title,
  status: dataValues[0].status,
  data: dataValues[0].data,
};

describe('ExchangeAccount', () => {
  it('Renders with platform', () => {
    console.log(dataValues[0].data);
    const { getByText } = render(
      <ExchangeAccount
        // platform="test"
        // title="test"
        // status="Active"
        // data={dataValues[0].data}
        {...commonProps}
        deleteOnClick={() => console.log('object')}
      />,
    );
    getByText(new RegExp('test', 'i'));
  });
});
