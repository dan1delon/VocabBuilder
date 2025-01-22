import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changePage, changeRecommendPage } from '../../../redux/words/slice';
import {
  selectPage,
  selectRecommendPage,
  selectTotalPages,
} from '../../../redux/words/selectors';
import css from './WordsPagination.module.css';
import { useScrollContext } from '../../../context/ScrollContext';

const WordsPagination = () => {
  const dispatch = useDispatch();
  const pageCount = useSelector(selectTotalPages) || 1;
  const location = useLocation();
  const currentPage =
    location.pathname === '/dictionary'
      ? useSelector(selectPage) || 1
      : useSelector(selectRecommendPage) || 1;
  const { headerRef } = useScrollContext();

  const scrollToHeader = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (event, value) => {
    scrollToHeader();
    if (location.pathname === '/dictionary') {
      dispatch(changePage(value));
    } else if (location.pathname === '/recommend') {
      dispatch(changeRecommendPage(value));
    }
  };

  if (pageCount <= 1) return null;

  return (
    <div className={css.wrapper}>
      <Stack spacing={2} className={css.pagination}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          siblingCount={0}
          boundaryCount={1}
          sx={{
            '& .MuiPaginationItem-root': {
              border: '1px solid rgba(18, 20, 23, 0.1)',
              borderRadius: '8px',
              padding: '10px',
              width: '32px',
              height: '32px',
              color: '#121417',
              fontFamily: 'MacPaw Fixel Display',
              fontWeight: 600,
              fontSize: '13px',
            },

            '& .MuiPaginationItem-root:hover': {
              background: '#85aa9f',
              color: 'white',
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default WordsPagination;
