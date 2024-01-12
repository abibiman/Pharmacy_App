import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
// import { OverviewDiagnosis, OverviewMedicalNotes } from 'src/sections/overview/records/view';
// import AllVitals from '../../pages/dashboard/records/vitals';

// ----------------------------------------------------------------------

// OVERVIEW
export const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewMetricsPage = lazy(() => import('src/pages/dashboard/metrics'));
const OverviewRecordsPage = lazy(() => import('src/pages/dashboard/records'));
const OverViewMyCarePage = lazy(() => import('src/pages/dashboard/mycare'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
const CompletedListPage = lazy(() => import('src/pages/dashboard/order-completed/list'))
const NewListPage = lazy(() => import('src/pages/dashboard/order-new/list'))
const PendingListPage = lazy(() => import('src/pages/dashboard/order-pending/list'))
const ProcessingListPage = lazy(() => import('src/pages/dashboard/order-processing/list'))
// APPOINTMENTS
const AppointmentListPage = lazy(() => import('src/pages/dashboard/appointment/list'));
const AppointmentDetailsPage = lazy(() => import('src/pages/dashboard/appointment/details'));
const AppointmentCreatePage = lazy(() => import('src/pages/dashboard/appointment/new'));
const AppointmentEditPage = lazy(() => import('src/pages/dashboard/appointment/edit'));
// PRICING
const PricingPage = lazy(() => import('src/pages/pricing'));
// USERS
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// PROVIDERS
const ProvidersCollectionPage = lazy(() => import('src/pages/dashboard/providers/collection'));
const ProvidersListPage = lazy(() => import('src/pages/dashboard/providers/list'));
const ProvidersProfilePage = lazy(() => import('src/pages/dashboard/providers/providersProfile'));
const ProvidersSpecialtyCardList = lazy(() => import('src/pages/dashboard/providers/specialty'));
// PRIMARY-CARE
const PrimaryCareListPage = lazy(() => import('src/pages/dashboard/primary-care/list'));
const PrimaryCareChatPage = lazy(() => import('src/pages/dashboard/primary-care/chat'));
const PrimaryCareProfilePage = lazy(() =>
  import('src/pages/dashboard/primary-care/general-profile')
);
const PrimaryCareMainPage = lazy(() => import('src/pages/dashboard/primary-care/main-page'));

// FACILITIES
const PharmaciesMap = lazy(() => import('src/pages/dashboard/facilities/pharmacies'));
const DiagnosticCentersMap = lazy(() =>
  import('src/pages/dashboard/facilities/diagnostic-centers')
);
const HospitalsMap = lazy(() => import('src/pages/dashboard/facilities/hospitals'));
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const AIChatPage = lazy(() => import('src/pages/dashboard/ai-chat'));

// const VideoChatPage = lazy(() => import('src/pages/dashboard/videochat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));
// MYCARE
// const VitalsPage = lazy(() => import('src/pages/dashboard/records/vitals'));
const ConditionPage = lazy(() => import('src/sections/mycare/conditions'));
const PreventivePage = lazy(() => import('src/sections/mycare/preventive'));
const MedicationPage = lazy(() => import('src/sections/mycare/medication'));
const DevicesPage = lazy(() => import('src/sections/mycare/devices'));
const PrescriptionPage = lazy(() => import('src/sections/mycare/prescription'));
const ViewCondition = lazy(() => import('src/sections/mycare/conditions/viewCondition'));
const ViewPreventiveCondition = lazy(() => import('src/sections/mycare/preventive/viewCondition'));
const ViewMedicationCondition = lazy(() => import('src/sections/mycare/medication/viewCondition'));
const ViewPrescriptionCondition = lazy(() =>
  import('src/sections/mycare/prescription/viewCondition')
);

// HEALTH RECORDS
const VitalsPage = lazy(() => import('src/pages/dashboard/records/vitals'));
const OverviewHealthHistoryPage = lazy(() => import('src/pages/dashboard/records/health-records'));

// const OverviewHealthHistoryPage = lazy(() => import('src/pages/dashboard/records/health-records'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'metrics', element: <OverviewMetricsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      // { path: 'records', element: <OverviewRecordsPage /> },
      { path: 'pricing', element: <PricingPage /> },
      {
        path: 'records',
        children: [
          { element: <OverviewRecordsPage />, index: true },
          { path: 'vitals', element: <VitalsPage /> },
          { path: 'medical-history', element: <OverviewHealthHistoryPage /> },
        ],
      },
      {
        path: 'my-care',
        children: [
          { element: <OverViewMyCarePage />, index: true },
          { path: 'conditions', element: <ConditionPage /> },
          { path: 'preventive', element: <PreventivePage /> },
          { path: 'devices', element: <DevicesPage /> },
          { path: 'vitals', element: <VitalsPage /> },
          { path: 'prescription', element: <PrescriptionPage /> },
          { path: 'medication', element: <MedicationPage /> },
          { path: 'view-condition/:id', element: <ViewCondition /> },
          { path: 'preventive-care/view-condition/:id', element: <ViewPreventiveCondition /> },
          { path: 'medication/view-condition/:id', element: <ViewMedicationCondition /> },
          { path: 'prescription/view-condition/:id', element: <ViewPrescriptionCondition /> },
        ],
      },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: 'processing', element: <ProcessingListPage /> },
          { path: 'new', element: <NewListPage /> },
          { path: 'pending', element: <PendingListPage /> },
          { path: 'completed', element: <CompletedListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'appointments',
        children: [
          { element: <AppointmentListPage />, index: true },
          { path: 'list', element: <AppointmentListPage /> },
          { path: ':id', element: <AppointmentDetailsPage /> },
          { path: ':id/edit', element: <AppointmentEditPage /> },
          { path: 'new', element: <AppointmentCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      // {
      //   path: 'job',
      //   children: [
      //     { element: <JobListPage />, index: true },
      //     { path: 'list', element: <JobListPage /> },
      //     { path: ':id', element: <JobDetailsPage /> },
      //     { path: 'new', element: <JobCreatePage /> },
      //     { path: ':id/edit', element: <JobEditPage /> },
      //   ],
      // },
      {
        path: 'providers',
        children: [
          { element: <ProvidersListPage />, index: true },
          { path: 'provider-categories', element: <ProvidersListPage /> },
          { path: 'specialist/:id', element: <ProvidersProfilePage /> },
          { path: 'providers-collection', element: <ProvidersCollectionPage /> },

          { path: 'specialty/:name', element: <ProvidersSpecialtyCardList /> },
        ],
      },
      {
        path: 'primary-care',
        children: [
          { element: <PrimaryCareMainPage />, index: true },
          { path: 'list', element: <PrimaryCareListPage /> },
          { path: 'chat', element: <PrimaryCareChatPage /> },
          { path: 'profile/:id', element: <PrimaryCareProfilePage /> },
          { path: 'chat/:id', element: <ChatPage /> },
        ],
      },
      {
        path: 'facilities',
        children: [
          { element: <HospitalsMap />, index: true },
          { path: 'hospitals', element: <HospitalsMap /> },
          { path: 'pharmacies', element: <PharmaciesMap /> },
          { path: 'diagnostic-centers', element: <DiagnosticCentersMap /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      // { path: 'chat', element: <ChatPage /> },
      { path: 'ai-chat', element: <AIChatPage /> },
      // { path: 'videochat', element: <VideoChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
