import { useState, useCallback, useContext, useEffect } from 'react';
// @mui
// import { useTheme, alpha } from '@mui/material/styles';
// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { AuthContext } from 'src/auth/context/jwt';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils

// components
// import Label from 'src/components/label';
import customAxios from 'src/utils/customAxios';
import { LoadingScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import AppointmentTableRow from '../appointment-table-row';
import AppointmentsTableToolbar from '../appointment-table-toolbar';
// import AppointmentTableFiltersResult from '../appointment-table-filters-result';

// ----------------------------------------------------------------------

const demoAPI = [
  {
    orderNo: 'LO-21341',
    patient: "John Ansah",
    doctor: 'Dr. Phyllis Dwamenah',
    reqDate: '2023-12-22',
    orderType: 'EKG',
    priority: 'Emergency',
    status: 'Awaiting'
  },
  {
    orderNo: 'LO-21342',
    patient: "Alice Koomson",
    doctor: 'Dr. Mark Appah',
    reqDate: '2023-12-21',
    orderType: 'Blood Test',
    priority: 'Routine',
    status: 'Completed'
  },
  {
    orderNo: 'LO-21343',
    patient: "Michael Suhum",
    doctor: 'Dr. Susan Danquah',
    reqDate: '2023-12-20',
    orderType: 'MRI',
    priority: 'Urgent',
    status: 'In Progress'
  },
  {
    orderNo: 'LO-21344',
    patient: "Karen Davis",
    doctor: 'Dr. John Okeke',
    reqDate: '2023-12-19',
    orderType: 'CT Scan',
    priority: 'Emergency',
    status: 'Awaiting'
  },
  {
    orderNo: 'LO-21345',
    patient: "Robert Bomah",
    doctor: 'Dr. Angela Yen',
    reqDate: '2023-12-18',
    orderType: 'Ultrasound',
    priority: 'Routine',
    status: 'Completed'
  },
  {
    orderNo: 'LO-21346',
    patient: "Linda Dovu",
    doctor: 'Dr. Mohammed Alhassan',
    reqDate: '2023-12-17',
    orderType: 'X-Ray',
    priority: 'Urgent',
    status: 'In Progress'
  },
  {
    orderNo: 'LO-21347',
    patient: "Emily Clark",
    doctor: 'Dr. Lisa Tetteh',
    reqDate: '2023-12-16',
    orderType: 'Biopsy',
    priority: 'Emergency',
    status: 'Awaiting'
  },
  {
    orderNo: 'LO-21348',
    patient: "James Achia",
    doctor: 'Dr. Kevin Tannoh',
    reqDate: '2023-12-15',
    orderType: 'Echocardiogram',
    priority: 'Routine',
    status: 'Completed'
  },
  {
    orderNo: 'LO-21349',
    patient: "Jessica Sarpong",
    doctor: 'Dr. Amy Sekyi',
    reqDate: '2023-12-14',
    orderType: 'PET Scan',
    priority: 'Urgent',
    status: 'In Progress'
  },
  {
    orderNo: 'LO-21350',
    patient: "William Banahene",
    doctor: 'Dr. Carlos Oppong',
    reqDate: '2023-12-13',
    orderType: 'Mammogram',
    priority: 'Emergency',
    status: 'Awaiting'
  }
];


const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Order No.' },
  { id: 'createDate', label: 'Patient' },
  { id: 'dueDate', label: 'Doctor' },
  { id: 'price', label: 'Order Type' },
  { id: 'prices', label: 'Order Date' },
  { id: 'status', label: 'Status' },
  { id: '' },
  { id: '' },
];

const defaultFilters = {
  appointmentType: 'Audio',
  status: ['pending', 'cancelled', 'approved'],
  appointmentDate: null,
  defaultValues: ['audio', 'video', 'in-person'],
};

// ----------------------------------------------------------------------

export default function AppointmentListView() {
  // const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'appointmentDate' });

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);

  const [sort, setSort] = useState(false);

  const [filters, setFilters] = useState(defaultFilters);

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getAllUserAppointments = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await customAxios.get(`/appointments/user/${user?.userID}`);

      setTableData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUserAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.name || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // const getInvoiceLength = (status) => tableData.filter((item) => item.status === status).length;

  // const TABS = [
  //   { value: 'all', label: 'All', color: 'default', count: tableData.length },
  //   {
  //     value: 'paid',
  //     label: 'Completed',
  //     color: 'success',
  //     count: getInvoiceLength('paid'),
  //   },
  //   {
  //     value: 'pending',
  //     label: 'Pending',
  //     color: 'warning',
  //     count: getInvoiceLength('pending'),
  //   },
  //   {
  //     value: 'overdue',
  //     label: 'Missed',
  //     color: 'error',
  //     count: getInvoiceLength('overdue'),
  //   },
  // ];

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.appointments.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.appointments.details(id));
    },
    [router]
  );

  // const handleFilterStatus = useCallback(
  //   (event, newValue) => {
  //     handleFilters('status', newValue);
  //   },
  //   [handleFilters]
  // );

  // const handleResetFilters = useCallback(() => {
  //   setFilters(defaultFilters);
  // }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Appointments"
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: 'Appointments',
              href: paths.dashboard.appointments.root,
            },
            {
              name: 'List',
            },
          ]}

          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        {loading ? (
          <LoadingScreen />
        ) : (
          <Card>
            {/* <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs> */}
{/* 
            <AppointmentsTableToolbar
              filters={filters}
              onFilters={handleFilters}
              //
              dateError={dateError}
              appointmentOptions={defaultFilters.defaultValues}
              status={defaultFilters.status}
            /> */}

            {/* {canReset && (
            <AppointmentTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )} */}

            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
                action={
                  <Stack direction="row">
                    <Tooltip title="Sent">
                      <IconButton color="primary">
                        <Iconify icon="iconamoon:send-fill" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Download">
                      <IconButton color="primary">
                        <Iconify icon="eva:download-outline" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Print">
                      <IconButton color="primary">
                        <Iconify icon="solar:printer-minimalistic-bold" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={confirm.onTrue}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              />

              <Scrollbar>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    numSelected={table.selected.length}
                    onSort={setSort}
                    setSort={setSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        tableData.map((row) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {demoAPI
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row) => (
                        <AppointmentTableRow
                          key={row._id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          setTableData={setTableData}
                        />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                    />

                    <TableNoData notFound={notFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={dataFiltered.length}
              page={table.page}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
              //
              dense={table.dense}
              onChangeDense={table.onChangeDense}
            />
          </Card>
        )}
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, status, defaultValues } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0].appointmentDate, b[0].appointmentDate);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        invoice.invoiceTo.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (defaultValues.length > 0) {
    inputData = inputData.filter((appointment) =>
      // appointment.appointmentType.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      // invoice.invoiceTo.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
      defaultValues.includes(appointment.appointmentType.toLowerCase())
    );
  }

  if (status.length > 0) {
    inputData = inputData.filter((appointment) =>
      // appointment.appointmentType.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      // invoice.invoiceTo.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
      status.includes(appointment.status.toLowerCase())
    );
  }

  // if (status !== 'all') {
  //   inputData = inputData.filter((invoice) => invoice.status === status);
  // }

  // if (service.length) {
  //   inputData = inputData.filter((invoice) =>
  //     invoice.items.some((filterItem) => service.includes(filterItem.service))
  //   );
  // }

  // if (!dateError) {
  //   if (startDate && endDate) {
  //     inputData = inputData.filter(
  //       (invoice) =>
  //         fTimestamp(invoice.createDate) >= fTimestamp(startDate) &&
  //         fTimestamp(invoice.createDate) <= fTimestamp(endDate)
  //     );
  //   }
  // }

  return inputData;
}
