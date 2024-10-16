import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Icon from '../../../shared/Icon/Icon';
import css from './ActionsBtn.module.css';

const ActionsBtn = ({ word }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={css.popover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '15px',
            boxShadow: '0 4px 47px 0 rgba(18, 20, 23, 0.08)',
          },
        }}
      >
        <div className={css.btnWrapper}>
          <Button className={css.btn} onClick={() => console.log('Edit', word)}>
            <Icon iconId="icon-edit" className={css.icon} />
            Edit
          </Button>
          <Button
            className={css.btn}
            onClick={() => console.log('Delete', word)}
          >
            <Icon iconId="icon-trash" className={css.icon} />
            Delete
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default ActionsBtn;
