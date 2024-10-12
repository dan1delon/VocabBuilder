import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchWords } from '../../../redux/words/operations';
import css from './Filters.module.css';
import { fetchCategories } from '../../../redux/categories/operations';
import { selectCategories } from '../../../redux/categories/selectors';
import Icon from '../../../shared/Icon/Icon';

const Filters = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchChange = e => {
    setKeyword(e.target.value.trim());
  };

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
    dispatch(fetchWords({ category: e.target.value }));
  };

  const debouncedSearch = debounce(searchKeyword => {
    dispatch(
      fetchWords({ keyword: searchKeyword, category: selectedCategory })
    );
  }, 300);

  useEffect(() => {
    if (keyword) {
      debouncedSearch(keyword);
    } else {
      dispatch(fetchWords({ category: selectedCategory || 'all' }));
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [keyword, selectedCategory, dispatch]);

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
        <button type="button" className={css.button}>
          <Icon iconId="icon-search" className={css.icon} />
        </button>
      </label>

      <label className={css.label}>
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className={css.select}
        >
          <option value="" className={css.option}>
            All categories
          </option>
          {Array.isArray(categories) &&
            categories.map(category => (
              <option key={category} value={category} className={css.option}>
                {category}
              </option>
            ))}
        </select>
        <button type="button" className={css.button}>
          <Icon iconId="icon-down" className={css.icon} />
        </button>
      </label>

      {selectedCategory === 'verb' && (
        <div className={css.verbType}>
          <label className={css.labelWrap}>
            <input
              type="radio"
              name="verbType"
              value="regular"
              className={css.radio}
            />
            Regular
          </label>
          <label className={css.labelWrap}>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              className={css.radio}
            />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
};

export default Filters;
