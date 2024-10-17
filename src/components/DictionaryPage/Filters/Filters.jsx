import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchUsersWords } from '../../../redux/words/operations';
import css from './Filters.module.css';
import { fetchCategories } from '../../../redux/categories/operations';
import { selectCategories } from '../../../redux/categories/selectors';
import Icon from '../../../shared/Icon/Icon';
import { usePopover } from '../../../hooks/usePopover';
import clsx from 'clsx';
import { selectPage } from '../../../redux/words/selectors';

const Filters = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [verbType, setVerbType] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const currentPage = useSelector(selectPage);

  const {
    isOpen,
    isVisible,
    handleTogglePopover,
    handleClosePopover,
    popoverRef,
  } = usePopover();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchChange = e => {
    setKeyword(e.target.value.trim());
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    if (category !== 'verb') {
      setVerbType('');
    }
    dispatch(
      fetchUsersWords({ category, isIrregular: verbType, page: currentPage })
    );
    handleClosePopover();
  };

  const debouncedSearch = debounce(searchKeyword => {
    dispatch(
      fetchUsersWords({
        keyword: searchKeyword,
        category: selectedCategory,
        isIrregular: verbType,
      })
    );
  }, 300);

  useEffect(() => {
    if (keyword) {
      debouncedSearch(keyword);
    } else {
      dispatch(
        fetchUsersWords({
          category: selectedCategory,
          isIrregular: verbType,
        })
      );
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [keyword, selectedCategory, verbType, dispatch]);

  const handleVerbTypeChange = e => {
    const { value } = e.target;
    setVerbType(value);
    dispatch(
      fetchUsersWords({
        category: selectedCategory,
        isIrregular: value === 'true',
      })
    );
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
          {capitalizeFirstLetter(selectedCategory) || 'Categories'}
          <Icon
            iconId="icon-down"
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
                className={css.popoverItem}
                onClick={() => handleCategoryChange('')}
              >
                All categories
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
