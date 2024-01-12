import { Helmet } from 'react-helmet-async';
// sections
import { OrderListView } from 'src/sections/orders-pending/view';

// ----------------------------------------------------------------------

export default function PendingOrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Pending Orders</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
