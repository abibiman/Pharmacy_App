import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  metrics: icon('ic_metrics'),
  dashboard: icon('ic_dashboard'),
  appointment: icon('ic_appointment'),
  ai: icon('ic_ai'),
  history: icon('ic_history'),
  mycare: icon('ic_mycare'),
  listings: icon('ic_listings'),
  providers: icon('ic_providers'),
  primary_care: icon('ic_primary_care'),
  help: icon('ic_help'),
  subscription: icon('ic_subscription'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('menu'),
        items: [
          {
            title: t('My Home'),
            path: paths.dashboard.root,
            icon: <Iconify icon="clarity:home-solid" />
          },
          {
            title: t('All Orders'),
            path: paths.dashboard.order.root,
            icon: ICONS.order
          },
          {
            title: t('New Orders'),
            path: paths.dashboard.order.new,
            icon: <Iconify icon="fluent-mdl2:reservation-orders" />
          },
          {
            title: t('Processing'),
            path: paths.dashboard.order.processing,
            icon: <Iconify icon="fluent-mdl2:processing-run" />
          },
          {
            title: t('Pending Delivery'),
            path: paths.dashboard.order.pending,
            icon: <Iconify icon="carbon:delivery" />
          },
          {
            title: t('Completed Orders'),
            path: paths.dashboard.order.completed,
            icon: <Iconify icon="fluent-mdl2:completed" />
          },
          {
            title: t('Account'),
            path: paths.dashboard.user.account,
            icon: ICONS.user,
          },
        ],
      },


    ],
    [t]
  );

  return data;
}
