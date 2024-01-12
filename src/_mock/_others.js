import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _carouselsMembers = [...Array(6)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  role: _mock.role(index),
  avatarUrl: _mock.image.portrait(index),
}));

// ----------------------------------------------------------------------

export const _faqs = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}`,
  detail: _mock.description(index),
}));

// ----------------------------------------------------------------------

export const _addressBooks = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  email: _mock.email(index + 1),
  fullAddress: _mock.fullAddress(index),
  phoneNumber: _mock.phoneNumber(index),
  company: _mock.companyName(index + 1),
  addressType: index === 0 ? 'Home' : 'Office',
}));

// ----------------------------------------------------------------------

export const _contacts = [...Array(20)].map((_, index) => {
  const status =
    (index % 2 && 'online') || (index % 3 && 'offline') || (index % 4 && 'alway') || 'busy';

  return {
    id: _mock.id(index),
    status,
    role: _mock.role(index),
    email: _mock.email(index),
    name: _mock.fullName(index),
    phoneNumber: _mock.phoneNumber(index),
    lastActivity: _mock.time(index),
    avatarUrl: _mock.image.avatar(index),
    address: _mock.fullAddress(index),
  };
});

// ----------------------------------------------------------------------

export const _notifications = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: [
    _mock.image.avatar(1),
    _mock.image.avatar(2),
    _mock.image.avatar(3),
    _mock.image.avatar(4),
    _mock.image.avatar(5),
    null,
    null,
    null,
    null,
    null,
  ][index],
  type: ['friend', 'project', 'file', 'tags', 'payment', 'order', 'chat', 'mail', 'delivery'][
    index
  ],
  category: [
    'Communication',
    'Project UI',
    'File Manager',
    'File Manager',
    'File Manager',
    'Order',
    'Order',
    'Communication',
    'Communication',
  ][index],
  isUnRead: _mock.boolean(index),
  createdAt: _mock.time(index),
  title:
    (index === 0 && `<p><strong>Deja Brady</strong> sent you a friend request</p>`) ||
    (index === 1 &&
      `<p><strong>Jayvon Hull</strong> mentioned you in <strong><a href='#'>Minimal UI</a></strong></p>`) ||
    (index === 2 &&
      `<p><strong>Lainey Davidson</strong> added file to <strong><a href='#'>File Manager</a></strong></p>`) ||
    (index === 3 &&
      `<p><strong>Angelique Morse</strong> added new tags to <strong><a href='#'>File Manager<a/></strong></p>`) ||
    (index === 4 &&
      `<p><strong>Giana Brandt</strong> request a payment of <strong>$200</strong></p>`) ||
    (index === 5 && `<p>Your order is placed waiting for shipping</p>`) ||
    (index === 6 && `<p>Delivery processing your order is being shipped</p>`) ||
    (index === 7 && `<p>You have new message 5 unread messages</p>`) ||
    (index === 8 && `<p>You have new mail`) ||
    '',
}));

// ----------------------------------------------------------------------

export const _mapContact = [
  {
    latlng: [33, 65],
    address: _mock.fullAddress(1),
    phoneNumber: _mock.phoneNumber(1),
  },
  {
    latlng: [-12.5, 18.5],
    address: _mock.fullAddress(2),
    phoneNumber: _mock.phoneNumber(2),
  },
];

// ----------------------------------------------------------------------

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/caitlyn.kerluke',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/caitlyn.kerluke',
  },
];

// ----------------------------------------------------------------------

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: ['Standard', 'Standard Plus', 'Extended'][index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design Resources',
    'Commercial applications',
  ],
  icons: [
    '/assets/icons/platforms/ic_figma.svg',
    '/assets/icons/platforms/ic_js.svg',
    '/assets/icons/platforms/ic_ts.svg',
  ],
}));

// ----------------------------------------------------------------------

export const _pricingPlans = [
  {
    subscription: 'basic',
    price: 0,
    caption: 'Forever',
    lists: ['Find a Specialist', 'Audio & Video Consultation', 'Health Library'],
    labelAction: 'Current Plan',
  },
  // {
  //   subscription: 'starter',
  //   price: 4.99,
  //   caption: 'Saving $24 a year',
  //   lists: [
  //     '3 Prototypes',
  //     '3 Boards',
  //     'Up To 5 Team Members',
  //     'Advanced Security',
  //     'Issue Escalation',
  //   ],
  //   labelAction: 'Choose Starter',
  // },
  {
    subscription: 'premium',
    price: 199,

    lists: [
      'AI Chat',
      'Care Team: Care health centre',
      'Chat With Healthcare Providers',
      'Condition Management',
      'Primary Physician',
      'Medical Folder',
      'Medical Delivery',
      'Preventive Care',
    ],
    labelAction: 'Choose Premium',
  },
];

// ----------------------------------------------------------------------

export const _testimonials = [
  {
    name: 'Kwabena Adjei',
    postedDate: _mock.time(1),
    ratingNumber: _mock.number.rating(1),
    avatarUrl:
      'https://img.freepik.com/free-photo/elegant-businessman-wearing-stylish-eyeglasses_273609-14887.jpg?size=626&ext=jpg&uid=R95405944&ga=GA1.1.1030567334.1696220542&semt=ais',
    content: `Using this telehealth platform has transformed my approach to healthcare. The convenience and expertise are unmatched!`,
  },
  {
    name: 'Afia Atsufui',
    postedDate: _mock.time(2),
    ratingNumber: _mock.number.rating(2),
    avatarUrl:
      'https://st.depositphotos.com/1008939/2127/i/450/depositphotos_21274701-stock-photo-profile.jpg',
    content: `I never thought I'd say this, but managing my health has never been easier. This platform is a game-changer!`,
  },
  {
    name: 'Kwami Amega',
    postedDate: _mock.time(3),
    ratingNumber: _mock.number.rating(3),
    avatarUrl:
      'https://img.freepik.com/free-photo/clever-man-model-with-gentle-smile-has-clever-look-being-sure-his-success-wears-round-spectacles-casual-sweater_273609-17340.jpg?size=626&ext=jpg&uid=R95405944&ga=GA1.1.1030567334.1696220542&semt=ais',
    content: `The seamless integration with health devices makes monitoring vitals a breeze. Highly recommended!`,
  },
  {
    name: 'Ama Dede',
    postedDate: _mock.time(4),
    ratingNumber: _mock.number.rating(4),
    avatarUrl:
      'https://st3.depositphotos.com/1008939/14230/i/450/depositphotos_142308338-stock-photo-woman-from-profile.jpg',
    content: `I had my reservations about telehealth, but this platform proved me wrong. The quality of care I received was top-notch.`,
  },
  // {
  //   name: 'Kofi Atitsogbe',
  //   postedDate: _mock.time(5),
  //   ratingNumber: _mock.number.rating(5),
  //   avatarUrl:
  //     'https://img.freepik.com/free-photo/young-african-man-standing-isolated_171337-9640.jpg?size=626&ext=jpg&uid=R95405944&ga=GA1.1.1030567334.1696220542&semt=ais',
  //   content: `Having moved to a remote area, access to quality healthcare was a concern. This platform has been a lifesaver!`,
  // },
  // {
  //   name: 'Afiba Afelete',
  //   postedDate: _mock.time(6),
  //   ratingNumber: _mock.number.rating(6),
  //   avatarUrl:
  //     'https://st4.depositphotos.com/2964705/29079/i/450/depositphotos_290798878-stock-photo-young-pretty-african-american-woman.jpg',
  //   content: `The video consultations are as effective as in-person visits. The doctors and practitioners here are truly professional.`,
  // },
  // {
  //   name: 'Kojo Kugbeadzor',
  //   postedDate: _mock.time(7),
  //   ratingNumber: _mock.number.rating(7),
  //   avatarUrl:
  //     'https://img.freepik.com/free-photo/man-s-portrait-isolated-green-studio-wall_155003-31918.jpg?size=626&ext=jpg&uid=R95405944&ga=GA1.1.1030567334.1696220542&semt=ais',
  //   content: `Managing my elderly parents' health has become so much simpler. Thanks to the device integrations and easy consultations.`,
  // },
  // {
  //   name: 'Akosua Agbavor',
  //   postedDate: _mock.time(8),
  //   ratingNumber: _mock.number.rating(8),
  //   avatarUrl:
  //     'https://st5.depositphotos.com/79147440/65578/i/450/depositphotos_655782424-stock-photo-black-woman-black-woman-portrait.jpg',
  //   content: `The platform's focus on prioritizing health and providing quality care is evident. It's a breath of fresh air!`,
  // },
  // {
  //   name: 'Kwasi Eklu',
  //   postedDate: _mock.time(9),
  //   ratingNumber: _mock.number.rating(9),
  //   avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
  //   content: `As a frequent traveler, having a telehealth platform that I can rely on is essential. This platform has been consistently excellent.`,
  // },
  // {
  //   name: 'Adjoa Adjeley',
  //   postedDate: _mock.time(10),
  //   ratingNumber: _mock.number.rating(10),
  //   avatarUrl:
  //     'https://st4.depositphotos.com/1715570/21771/i/450/depositphotos_217711954-stock-photo-close-profile-portrait-beautiful-young.jpg',
  //   content: `With data-driven insights and easy device integrations, my health management has never been this personalized and efficient.`,
  // },
];
