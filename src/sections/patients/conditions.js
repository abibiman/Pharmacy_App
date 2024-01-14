// @mui
import Table from '@mui/material/Table';
import { useState, useCallback, useEffect,useContext } from 'react';
import { useParams } from 'react-router';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// components
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import axios from 'axios'
import { AuthContext } from 'src/auth/context/jwt';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const TABLE_DATA = [
  createData('Frozen yoghurt'),
  createData('Ice cream sandwich'),
  createData('Eclair'),
  createData('Cupcake'),
  createData('Gingerbread'),
];

const TABLE_HEAD = [
  { id: 'dessert', label: 'Condition' },



  { id: 'protein', label: 'Medication Type' },

  { id: 'protfein', label: 'Year' },

];

// ----------------------------------------------------------------------

export default function Conditions() {

  const {id} = useParams()
  const { user } = useContext(AuthContext);
  const [data,setData] = useState([])
  const quickEdit = useBoolean();
  const popover = usePopover();


  useEffect(()=> {
    axios.get(`https://abibiman-api.onrender.com/conditions/${id}`, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      })
    .then(res =>{
      setData(res.data.items)

    })
    .catch(err => {
      console.log(err.data)
    })

  },[id, user?.token])

  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {data?data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>

                <TableCell>{row.onMedication?row.medicationType:"N/A"}</TableCell>

                <TableCell>{row.year}</TableCell>

                <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                  <Tooltip title="View" placement="top" arrow>
                    <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
                      <Iconify icon="solar:eye-bold" />
                    </IconButton>
                  </Tooltip>

                  <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />



        </TableCell>
              </TableRow>
            )):<a></a>}


          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
