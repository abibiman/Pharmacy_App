// utils
import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  waitlist: '/waitlist',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/kAYnYYdib0aQPNKZpgJT6J/%5BPreview%5D-Minimal-Web.v5.0.0?type=design&node-id=0%3A1&t=Al4jScQq97Aly0Mn-1',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      verify: `${ROOTS.AUTH}/jwt/verify`,
      resetPassword: `${ROOTS.AUTH}/jwt/reset-password`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: (id) => `${ROOTS.DASHBOARD}/chat/${id}`,
    aiChat: `${ROOTS.DASHBOARD}/ai-chat`,
    video: `${ROOTS.DASHBOARD}/videochat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      metrics: `${ROOTS.DASHBOARD}/metrics`,
      records: `${ROOTS.DASHBOARD}/records`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
      mycare: `${ROOTS.DASHBOARD}/my-care`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      pending: `${ROOTS.DASHBOARD}/order/pending`,
      completed: `${ROOTS.DASHBOARD}/order/completed`,
      new: `${ROOTS.DASHBOARD}/order/new`,
      processing: `${ROOTS.DASHBOARD}/order/processing`,
      details: (id) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    providers: {
      root: `${ROOTS.DASHBOARD}/providers`,
      categories: `${ROOTS.DASHBOARD}/providers/providers-categories`,
      collection: `${ROOTS.DASHBOARD}/providers/providers-collection`,
      specialty: (id) => `${ROOTS.DASHBOARD}/specialty/${id}`,
      details: (id) => `${ROOTS.DASHBOARD}/providers/specialist/${id}`,
    },
    primaryCare: {
      root: `${ROOTS.DASHBOARD}/primary-care`,
      list: `${ROOTS.DASHBOARD}/primary-care/list`,
      chat: `${ROOTS.DASHBOARD}/primary-care/chat`,
      details: (id) => `${ROOTS.DASHBOARD}/providers/specialist/${id}`,
      profile: (id) => `${ROOTS.DASHBOARD}/providers/specialist/${id}`,
    },
    facilities: {
      root: `${ROOTS.DASHBOARD}/facilities`,
      hospitals: `${ROOTS.DASHBOARD}/facilities/hospitals`,
      pharmacies: `${ROOTS.DASHBOARD}/facilities/pharmacies`,
      diagnosticCenters: `${ROOTS.DASHBOARD}/facilities/diagnostic-centers`,
    },
    records: {
      root: `${ROOTS.DASHBOARD}/records`,
      allmetrics: `${ROOTS.DASHBOARD}/records/vitals`,
      medicalHistory: `${ROOTS.DASHBOARD}/records/medical-history`,
    },
    mycare: {
      root: `${ROOTS.DASHBOARD}/my-care`,
      conditions: `${ROOTS.DASHBOARD}/my-care/conditions`,
      preventive: `${ROOTS.DASHBOARD}/my-care/preventive`,
      devices: `${ROOTS.DASHBOARD}/my-care/devices`,
      vitals: `${ROOTS.DASHBOARD}/my-care/vitals`,
      prescriptions: `${ROOTS.DASHBOARD}/my-care/prescription`,
      medications: `${ROOTS.DASHBOARD}/my-care/medication`,
    },
    appointments: {
      root: `${ROOTS.DASHBOARD}/appointments`,
      new: `${ROOTS.DASHBOARD}/appointments/new`,
      details: (id) => `${ROOTS.DASHBOARD}/appointments/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/appointments/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/appointments/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/appointments/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
    patients: {
      root: `${ROOTS.DASHBOARD}/my-patients`,
      requests: `${ROOTS.DASHBOARD}/my-patients/requests`,
      requestlist: `${ROOTS.DASHBOARD}/my-patients/request-list`,
      new: `${ROOTS.DASHBOARD}/my-patients/new`,
      details: (id) => `${ROOTS.DASHBOARD}/my-patients/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/my-patients/${id}/edit`,
      view: (id) => `${ROOTS.DASHBOARD}/my-patients/view/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/my-patients/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/my-patients/${MOCK_ID}/edit`,
      },
    },
  },
};
