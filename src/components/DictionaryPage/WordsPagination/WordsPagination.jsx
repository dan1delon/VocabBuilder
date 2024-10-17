import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../../redux/words/slice';
import { fetchUsersWords } from '../../../redux/words/operations';
import { useEffect } from 'react';
import { selectPage, selectTotalPages } from '../../../redux/words/selectors';
import css from './WordsPagination.module.css';

const WordsPagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage) || 1;
  const pageCount = useSelector(selectTotalPages) || 1;

  useEffect(() => {
    const filters = {
      keyword: '',
      category: '',
      isIrregular: '',
      page: currentPage,
    };
    dispatch(fetchUsersWords(filters));
  }, [dispatch, currentPage]);

  const handleChange = (event, value) => {
    dispatch(changePage(value));
  };

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
