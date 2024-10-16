import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import css from './ProgressBar.module.css';

const ProgressBar = ({ progress }) => {
  return (
    <Box className={css.progressBar}>
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{
          color: '#d4f8d3',
          position: 'absolute',
        }}
        size={24}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{
          color: 'lightgreen',
          position: 'absolute',
          zIndex: 1,
        }}
        size={24}
      />
    </Box>
  );
};

export default ProgressBar;
