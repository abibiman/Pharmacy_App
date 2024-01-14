// @mui
import Table from '@mui/material/Table';
import { useState, useCallback, useEffect,useContext } from 'react';
import { useParams } from 'react-router';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// components
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import axios from 'axios'
import { AuthContext } from 'src/auth/context/jwt';

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
  { id: 'dessert', label: 'Medication' },
  { id: 'dessert', label: 'Dosage' },
  { id: 'protein', label: 'Meals' },
  { id: 'protein', label: 'Date Startef',align: 'right' },
  { id: 'di', label: 'Date Completed', align: 'right' },
];

// ----------------------------------------------------------------------

export default function Medication() {

  const {id} = useParams()
  const { user } = useContext(AuthContext);
  const [data,setData] = useState([])


  useEffect(()=> {
    axios.get(`https://abibiman-api.onrender.com/medications/users/${id}`, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      })
    .then(res =>{
      setData(res.data.data)
      console.log(" i Work")
      console.log(data)

    })
    .catch(err => {
      console.log(err.data)
    })

  })

  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {data?.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.drug}</TableCell>
                <TableCell>{row.dosage}</TableCell>
                <TableCell>{row.intakeInstruction}</TableCell>
                <TableCell align="right">{row.dateStarted}</TableCell>
                <TableCell align="right">{row.dateCompleted?row.dateCompleted:"-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
