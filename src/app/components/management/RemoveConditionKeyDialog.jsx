import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

export default function RemoveConditionKeyDialog(props) {
  const { confirmRemoveConditionKey, conditionKey } = props;
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
        <DialogTitle>Remove Condition Key</DialogTitle>
        <DialogContent>
          <Typography gutterBottom style={{ textDecoration: 'underline' }}>
            Are you sure you want to remove the following Condition Key
          </Typography>
          <Typography variant="subtitle1" color="textPrimary" gutterBottom>
            {conditionKey}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => confirmRemoveConditionKey(conditionKey)} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
