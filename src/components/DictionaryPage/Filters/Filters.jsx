import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchUsersWords, fetchWords } from '../../../redux/words/operations';
import { changePage, changeRecommendPage } from '../../../redux/words/slice';
import css from './Filters.module.css';
import { fetchCategories } from '../../../redux/categories/operations';
import { selectCategories } from '../../../redux/categories/selectors';
import Icon from '../../../shared/Icon/Icon';
import { usePopover } from '../../../hooks/usePopover';
import clsx from 'clsx';
import {
  selectPage,
  selectRecommendPage,
  selectUsersWords,
} from '../../../redux/words/selectors';

const Filters = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [verbType, setVerbType] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const categories = useSelector(selectCategories);
  const currentPage =
    location.pathname === '/dictionary'
      ? useSelector(selectPage) || 1
      : useSelector(selectRecommendPage) || 1;
  const words = useSelector(selectUsersWords);

  const prevFilters = useRef({});

  const {
    isOpen,
    isVisible,
    handleTogglePopover,
    handleClosePopover,
    popoverRef,
  } = usePopover();

  useEffect(() => {
    if (categories.length > 0) return;
    dispatch(fetchCategories());
  }, [dispatch]);

  const resetPageIfNeeded = () => {
    if (location.pathname === '/dictionary' && currentPage !== 1) {
      dispatch(changePage(1));
    } else if (location.pathname !== '/dictionary' && currentPage !== 1) {
      dispatch(changeRecommendPage(1));
    }
  };

  const updateWords = () => {
    const currentFilters = {
      category: selectedCategory,
      isIrregular: verbType,
      keyword,
      page: currentPage,
    };

    if (
      JSON.stringify(prevFilters.current) === JSON.stringify(currentFilters)
    ) {
      return;
    }

    prevFilters.current = currentFilters;

    if (!selectedCategory && !verbType && !keyword) return;

    const fetchParams = {
      category: selectedCategory,
      isIrregular: verbType,
      page: currentPage,
    };

    if (location.pathname === '/dictionary') {
      dispatch(fetchUsersWords(fetchParams));
      console.log('filters:', words);
    } else if (location.pathname === '/recommend') {
      dispatch(fetchWords(fetchParams));
    }
  };

  const handleSearchChange = e => {
    const newKeyword = e.target.value.trim();
    setKeyword(newKeyword);

    if (!newKeyword) {
      resetPageIfNeeded();
      updateWords();
    }
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);

    if (category !== 'verb') {
      setVerbType('');
    }

    resetPageIfNeeded();
    updateWords();
    handleClosePopover();
  };

  const debouncedSearch = debounce(searchKeyword => {
    resetPageIfNeeded();
    if (location.pathname === '/dictionary') {
      dispatch(
        fetchUsersWords({
          keyword: searchKeyword,
          category: selectedCategory,
          isIrregular: verbType,
          page: 1,
        })
      );
    } else if (location.pathname === '/recommend') {
      dispatch(
        fetchWords({
          keyword: searchKeyword,
          category: selectedCategory,
          isIrregular: verbType,
          page: 1,
        })
      );
    }
  }, 300);

  const handleVerbTypeChange = e => {
    const { value } = e.target;
    setVerbType(value);

    resetPageIfNeeded();
    updateWords();
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const resetPageIfNeeded = () => {
      if (currentPage !== 1) {
        if (location.pathname === '/dictionary') {
          dispatch(changePage(1));
        } else if (location.pathname === '/recommend') {
          dispatch(changeRecommendPage(1));
        }
      }
    };

    const updateFilters = () => {
      const currentFilters = {
        category: selectedCategory,
        isIrregular: verbType,
        keyword,
        page: currentPage,
      };

      if (
        JSON.stringify(prevFilters.current) === JSON.stringify(currentFilters)
      ) {
        return;
      }

      prevFilters.current = currentFilters;

      const fetchParams = {
        category: selectedCategory,
        isIrregular: verbType,
        keyword,
        page: currentPage,
      };

      if (location.pathname === '/dictionary') {
        dispatch(fetchUsersWords(fetchParams));
      } else if (location.pathname === '/recommend') {
        dispatch(fetchWords(fetchParams));
      }
    };

    if (keyword) {
      resetPageIfNeeded();
      debouncedSearch(keyword);
    } else if (selectedCategory || verbType || currentPage) {
      updateFilters();
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [
    keyword,
    selectedCategory,
    verbType,
    currentPage,
    dispatch,
    location.pathname,
  ]);

  return (
    <div className={css.wrapper}>
      <label className={css.label}>
        <input
          type="text"
          value={keyword}
          onChange={handleSearchChange}
          placeholder="Find the word"
          className={css.input}
        />
        <button
          type="button"
          className={css.button}
          onClick={handleSearchChange}
        >
          <Icon iconId="icon-search" className={css.icon} />
        </button>
      </label>

      <div className={css.label} ref={popoverRef}>
        <button
          type="button"
          className={css.buttonCategories}
          onClick={handleTogglePopover}
        >
          {selectedCategory === 'All' || !selectedCategory
            ? 'Categories'
            : capitalizeFirstLetter(selectedCategory)}
          <ExpandMoreIcon
            className={clsx(css.iconDown, { [css.iconRotate]: isOpen })}
          />
        </button>

        {isOpen && (
          <div
            className={clsx(css.popover, { [css.visible]: isVisible })}
            ref={popoverRef}
          >
            <ul className={css.popoverList}>
              <li
                className={clsx(css.popoverItem, {
                  [css.selected]: selectedCategory === 'All',
                })}
                onClick={() => handleCategoryChange('All')}
              >
                All
              </li>
              {Array.isArray(categories) &&
                categories.map(category => (
                  <li
                    key={category}
                    className={clsx(css.popoverItem, {
                      [css.selected]: category === selectedCategory,
                    })}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {capitalizeFirstLetter(category)}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {selectedCategory === 'verb' && (
        <div className={css.verbType}>
          <label className={css.labelWrap}>
            <input
              type="radio"
              name="verbType"
              value="false"
              className={css.radio}
              checked={verbType === 'false'}
              onChange={handleVerbTypeChange}
            />
            <span className={css.radioCustom}></span>
            Regular
          </label>
          <label className={css.labelWrap}>
            <input
              type="radio"
              name="verbType"
              value="true"
              className={css.radio}
              checked={verbType === 'true'}
              onChange={handleVerbTypeChange}
            />
            <span className={css.radioCustom}></span>
            Irregular
          </label>
        </div>
      )}
    </div>
  );
};

export default Filters;
