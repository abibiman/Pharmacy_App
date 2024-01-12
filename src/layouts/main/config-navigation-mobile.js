// routes
import { paths } from 'src/routes/paths';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export const navConfigMobile = [
  {
    title: 'Home',
    icon: <Iconify icon="ic:baseline-home" />,
    path: '/',
  },
  {
    title: 'About Us',
    icon: <Iconify icon="mdi:about-circle-outline" />,
    path: paths.about,
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="bxs:contact" />,
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
  {
    title: 'Service Providers',
    icon: <Iconify icon="fontisto:doctor" />,
    path: paths.contact,
  },
  {
    title: 'Login',
    icon: <Iconify icon="clarity:login-solid" />,
    path: PATH_AFTER_LOGIN,
  },
];
