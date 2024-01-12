import { Helmet } from 'react-helmet-async';
// sections
import { OrderListView } from 'src/sections/orders-new/view';

// ----------------------------------------------------------------------

export default function NewOrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: New Orders</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
