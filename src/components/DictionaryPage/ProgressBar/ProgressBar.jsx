import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = ({ progress }) => {
  return <LinearProgress variant="determinate" value={progress} />;
};

export default ProgressBar;
