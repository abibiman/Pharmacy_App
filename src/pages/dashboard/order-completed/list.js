import { Helmet } from 'react-helmet-async';
// sections
import { OrderListView } from 'src/sections/orders-completed/view';

// ----------------------------------------------------------------------

export default function CompletedOrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Completed Orders</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
