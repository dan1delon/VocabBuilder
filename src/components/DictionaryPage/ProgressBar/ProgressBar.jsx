import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import css from './ProgressBar.module.css';

const ProgressBar = ({ progress, isMobile }) => {
  return (
    <Box className={css.progressBar}>
      <span className={css.percentageLabel}>{progress}%</span>
      <div className={css.circularProgressWrapper}>
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{
            color: '#d4f8d3',
            position: 'absolute',
          }}
          size={isMobile ? 24 : 26}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          sx={{
            color: 'lightgreen',
            position: 'absolute',
            zIndex: 1,
          }}
          size={isMobile ? 24 : 26}
        />
      </div>
    </Box>
  );
};

export default ProgressBar;
