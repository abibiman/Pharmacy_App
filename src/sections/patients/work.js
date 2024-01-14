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
  { id: 'dessert', label: 'Occupation' },


  { id: 'protein', label: 'Physical' },

  { id: 'di', label: 'Work Schedule', align: 'right' },
];

// ----------------------------------------------------------------------

export default function Work() {

  const {id} = useParams()
  const { user } = useContext(AuthContext);
  const [data,setData] = useState({})
  const [socialHistory,setSocialHistory] = useState({})
  const [alcohol,setalcohol] = useState({})
  const [work,setWork] = useState({})
  const [sex,setSex] = useState({})
  const [smoking,setSmoking] = useState({})
  const [ecercise,setExercise] = useState({})


  useEffect(() => {
    axios.get(`https://abibiman-api.onrender.com/users/social-habits/${id}`, {
      headers: {
        Authorization: `Basic ${user?.token}`,
      },
    })
      .then(res => {
        setData(res.data.data);
        setSocialHistory(data.socialHistory);
        setalcohol(socialHistory.alcohol);
        setSmoking(socialHistory.smoking);
        setSex(data.sexualHistory);
        setExercise(data.exercise);
        setWork(data.worKHabit);

      })
      .catch(err => {
        console.log(err.data);
      });
  });
  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
              <TableRow key={work?.typeOfWork}>
              <TableCell>{work?.typeOfWork}</TableCell>
                <TableCell>{work?.isPhysicallyDemanding}</TableCell>
                <TableCell align="right">{work?.workSchedule}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
