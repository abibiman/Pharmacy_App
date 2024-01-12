import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';
// utils
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
// Context
import { AuthContext } from 'src/auth/context/jwt';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import customAxios from 'src/utils/customAxios';
import {
  TableHeadCustom,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  useTable,
} from 'src/components/table';
import { ConfirmConditionDialog } from './postMedication';

// ----------------------------------------------------------------------

export default function ConditionList({
  title,
  subheader,
  tableLabels,
  setConditionsData,
  conditionsData,
  ...other
}) {
  const { user } = useContext(AuthContext);

  //
  const table = useTable();

  const notFound = conditionsData.length === 0;

  const denseHeight = table.dense ? 56 : 76;

  const getCondition = async () => {
    const {
      data: { items },
    } = await customAxios.get(`/conditions/${user.userID}`);
    setConditionsData(items);
  };

  useEffect(() => {
    getCondition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {conditionsData?.map((row) => (
                <ConditionsList key={row._id} row={row} setConditionsData={setConditionsData} />
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, conditionsData.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

ConditionList.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
  conditionsData: PropTypes.array,
  setConditionsData: PropTypes.func,
};

// ----------------------------------------------------------------------

function ConditionsList({ row, setConditionsData }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const popover = usePopover();

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText primary={row.name} secondary={row.category} />
        </TableCell>

        <TableCell>
          {/* {row.year} */}
          18/05/1700
        </TableCell>

        <TableCell>
          <Label
            variant={isLight ? 'soft' : 'filled'}
            color={
              (row.onMedication === true && 'success') ||
              (row.onMedication === false && 'warning') ||
              'error'
            }
          >
            {row.onMedication ? 'true' : 'false'}
          </Label>
        </TableCell>

        <TableCell>
          {/* {row.onMedication === true
            ? row.medications.map((medication) => medication.medication).join(', ')
            : 'Not Available'} */}
          45%
        </TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>

        <ConfirmConditionDialog
          open={openModal}
          onClose={handleClose}
          conditionID={row._id}
          setConditionsData={setConditionsData}
        />
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <Link
          to={`/dashboard/my-care/prescription/view-condition/${row._id}`}
          style={{ textDecoration: 'none', color: '#000' }}
        >
          <MenuItem>
            <Iconify icon="eva:eye-fill" />
            View
          </MenuItem>
        </Link>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => setOpenModal(true)}>
          <Iconify icon="eva:plus-fill" />
          Add Medication
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

ConditionsList.propTypes = {
  row: PropTypes.object,
  setConditionsData: PropTypes.func,
};

// ----------------------------------------------------------------------
