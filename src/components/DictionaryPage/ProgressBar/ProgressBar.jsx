import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import css from './ProgressBar.module.css';
import { useLocation } from 'react-router-dom';

const ProgressBar = ({ progress, isMobile, total }) => {
  const location = useLocation();

  const progressPercentage = (progress / total) * 100;

  return (
    <>
      {location.pathname === '/dictionary' && (
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
      )}

      {location.pathname === '/training' && (
        <Box className={css.progressBarTraining}>
          <span className={css.tasksCount}>{progress}</span>
          <div className={css.trainingCircularProgressWrapper}>
            <CircularProgress
              variant="determinate"
              value={100}
              sx={{
                color: '#fcfcfc',
                position: 'absolute',
              }}
              size={isMobile ? 44 : 58}
            />
            <CircularProgress
              variant="determinate"
              value={progressPercentage || 0}
              sx={{
                color: '#85aa9f',
                position: 'absolute',
                zIndex: 1,
              }}
              size={isMobile ? 44 : 58}
            />
          </div>
        </Box>
      )}
    </>
  );
};

export default ProgressBar;
