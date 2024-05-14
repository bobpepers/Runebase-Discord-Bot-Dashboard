import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

export default function RemoveDailyEnergyKeyDialog(props) {
  const { confirmRemoveDailyEnergyKey, dailyEnergyKey } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Remove Key
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove DailyEnergy Key</DialogTitle>
        <DialogContent>
          <Typography gutterBottom style={{ textDecoration: 'underline' }}>
            Are you sure you want to remove the following Daily Energy Key
          </Typography>
          <Typography variant="subtitle1" color="textPrimary" gutterBottom>
            {dailyEnergyKey}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => confirmRemoveDailyEnergyKey(dailyEnergyKey)} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
