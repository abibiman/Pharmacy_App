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
  { id: 'dessert', label: 'Use' },
  { id: 'dessert', label: 'Per Week' },
  { id: 'protein', label: 'Years Active' },
  { id: 'protein', label: 'Regular Type' },

  { id: 'di', label: 'Needed To Function', align: 'right' },
];

// ----------------------------------------------------------------------

export default function Alcohol() {

  const {id} = useParams()
  const { user } = useContext(AuthContext);
  const [data,setData] = useState({})
  const [socialHistory,setSocialHistory] = useState({})
  const [alcohol,setalcohol] = useState({})
  const [work,setWork] = useState({})
  const [sex,setSex] = useState({})
  const [smoking,setSmoking] = useState({})
  const [excercise,setExercise] = useState({})


  useEffect(()=> {
    axios.get(`https://abibiman-api.onrender.com/users/social-habits/${id}`, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      })
    .then(res =>{
      setData(res.data.data)
      setSocialHistory(data.socialHistory)
      setalcohol(socialHistory.alcohol)
      setSmoking(socialHistory.smoking)
      setSex(data.sexualHistory)
      setExercise(data.exercise)
      setWork(data.workHabits)

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

              <TableRow key={alcohol?.everUsedAlcohol}>
                <TableCell>{alcohol?.everUsedAlcohol ==="Yes"? "Yes" : "No"}</TableCell>
                <TableCell>{alcohol?.howManyDringPerWeek}</TableCell>
                <TableCell>{alcohol?.howManyYearsDrinking}</TableCell>
                <TableCell>{alcohol?.typeOfAlcohol}</TableCell>
                <TableCell align="right">{alcohol?.alcoholNeededInADay}</TableCell>
              </TableRow>

          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
