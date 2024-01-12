// routes
import { paths } from 'src/routes/paths';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'About Us',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.about,
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.contact,
  },
  {
    title: 'Pricing',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.pricing,
  },
  {
    title: 'How It Works',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.contact,
  },
];
