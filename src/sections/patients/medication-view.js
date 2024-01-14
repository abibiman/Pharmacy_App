// @mui
import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// ----------------------------------------------------------------------

export default function MedicationView({ row }) {
  console.log(row);
  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <List>
        <h4>Medication</h4>
        {row.medications.map((medication) => (
          <div key={medication._id}>
            <ListItemButton>
              <ListItemText primary="Medication" secondary={medication.medication} />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary="Dosage" secondary={medication.dosage} />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary="Duration" secondary={medication.dateStarted} />
            </ListItemButton>
            <Divider />
          </div>
        ))}

        {row.treatmentPlan && row.treatmentPlan.length > 0 ? (
          <>
            <h4>Treatment Plan</h4>
            {row.treatmentPlan.map((plan) => (
              <div key={plan._id}>
                <ListItemButton>
                  <ListItemText primary="" secondary={plan.name} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemText primary="" secondary={plan.doctor} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemText primary="" secondary={plan.dateStarted} />
                </ListItemButton>
                <Divider />
              </div>
            ))}
          </>
        ) : null}
      </List>
    </TableContainer>
  );
}
