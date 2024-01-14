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
  { id: 'dessert', label: 'Condition' },

  { id: 'protein', label: 'Date Occured', align: 'right' },
];

// ----------------------------------------------------------------------

export default function BasicTable() {

  const {id} = useParams()
  const { user } = useContext(AuthContext);
  const [data,setData] = useState({})
  const [medicalConditions,setMedicalConditions] = useState([])
  const [surgeries,setSurgeries] = useState([])
  const [allergies,setAllergies] = useState([])
  const [immunizations,setImmunizations] = useState([])
  const [accidents,setAccidents] = useState([])
  const [pastHospitalizations,setPastHospitalizations] = useState([])
  const [familyMedicalHistory,setFamilyMedicalHistory] = useState([])
  const [pastMedicalConditions,setPastMedicalConditions] = useState([])

  useEffect(()=> {
    axios.get(`https://abibiman-api.onrender.com/users/medicalhistory/${id}`, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      })
    .then(res =>{
      setData(res.data.data)
      setMedicalConditions(data.medicalConditions)
      setSurgeries(data.surgeries)
      setAllergies(data.allergies)
      setImmunizations(data.immunizations)
      setAccidents(data.accidents)
      setPastHospitalizations(data.pastHospitalizations)
      setFamilyMedicalHistory(data.familyMedicalHistory)
      setPastMedicalConditions(data.pastMedicalConditions)

      console.log(accidents)
    })
    .catch(err => {
      console.log(err.data)
    })

  },[accidents, data.accidents, data.allergies, data.familyMedicalHistory, data.immunizations, data.medicalConditions, data.pastHospitalizations, data.surgeries, id, user?.token])

  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {pastMedicalConditions?pastMedicalConditions.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>

                <TableCell align="right">{row.dateOccurred}</TableCell>
              </TableRow>
            )):<a></a>}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
