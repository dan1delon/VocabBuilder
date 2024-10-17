import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Icon from '../../../shared/Icon/Icon';
import css from './ActionsBtn.module.css';
import { useDispatch } from 'react-redux';
import {
  deleteWord,
  fetchStatistics,
  fetchUsersWords,
} from '../../../redux/words/operations';

const ActionsBtn = ({ word }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditWord = () => {
    handleClose();
  };

  const handleDeleteWord = async () => {
    try {
      await dispatch(deleteWord(word._id)).unwrap();
      await dispatch(
        fetchUsersWords({
          category: '',
          isIrregular: '',
        })
      ).unwrap();
      dispatch(fetchStatistics()).unwrap();
      handleClose();
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={css.wrapper}>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className={css.btnDots}
      >
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
          <Button className={css.btn} onClick={handleEditWord}>
            <Icon iconId="icon-edit" className={css.icon} />
            Edit
          </Button>
          <Button className={css.btn} onClick={handleDeleteWord}>
            <Icon iconId="icon-trash" className={css.icon} />
            Delete
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default ActionsBtn;
