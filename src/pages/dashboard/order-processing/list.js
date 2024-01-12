import { Helmet } from 'react-helmet-async';
// sections
import { OrderListView } from 'src/sections/orders-processing/view';

// ----------------------------------------------------------------------

export default function ProcessingOrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Orders Processing</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
