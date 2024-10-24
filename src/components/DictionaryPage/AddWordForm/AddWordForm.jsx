import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import css from './AddWordForm.module.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from '../../../shared/Icon/Icon';
import { useModal } from '../../../context';
import { selectCategories } from '../../../redux/categories/selectors';
import { usePopover } from '../../../hooks/usePopover';
import {
  createWord,
  fetchStatistics,
  fetchUsersWords,
} from '../../../redux/words/operations';
import clsx from 'clsx';
import { selectPage } from '../../../redux/words/selectors';
import toast from 'react-hot-toast';

const AddWordForm = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const categories = useSelector(selectCategories);
  const currentPage = useSelector(selectPage);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIrregular, setIsIrregular] = useState(false);

  const validationSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    en: Yup.string()
      .required('English word is required')
      .matches(
        /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
        'Invalid English word format'
      ),
    ua: Yup.string()
      .required('Ukrainian word is required')
      .matches(
        /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
        'Invalid Ukrainian word format'
      ),
    category: Yup.string().required('Category is required'),
    isIrregular: Yup.boolean(),
  });

  const {
    isOpen,
    isVisible,
    handleTogglePopover,
    handleClosePopover,
    popoverRef,
  } = usePopover();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    register,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      en: '',
      ua: '',
      category: '',
    },
  });

  const handleCategoryChange = category => {
    setValue('category', category);
    setSelectedCategory(category);
    clearErrors('category');
    handleClosePopover();
  };

  const onSubmit = async (data, e) => {
    try {
      setIsSubmitting(true);

      const wordData = {
        en: data.en.trim(),
        ua: data.ua.trim(),
        category: selectedCategory,
      };

      if (isIrregular) {
        wordData.isIrregular = isIrregular;
      }

      await dispatch(createWord(wordData)).unwrap();
      await dispatch(
        fetchUsersWords({
          category: '',
          isIrregular: '',
          page: currentPage,
        })
      ).unwrap();
      await dispatch(fetchStatistics()).unwrap();
      closeModal(e);
      reset();
      toast.success('Word added successfully!');
    } catch (error) {
      toast.error('Unexpected error:' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCancel = e => {
    closeModal(e);
    reset();
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.label} ref={popoverRef}>
        <div className={css.categoryWrapper}>
          <button
            type="button"
            className={css.buttonCategories}
            onClick={handleTogglePopover}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            {capitalizeFirstLetter(selectedCategory) || 'Categories'}
            <Icon
              iconId="icon-down-white"
              className={clsx(css.iconDown, { [css.iconRotate]: isOpen })}
            />
          </button>
          {errors.category && (
            <div className={css.messageWrapper}>
              <Icon className={css.iconMessage} iconId="icon-error" />
              <p className={css.errorMessage}>{errors.category?.message}</p>
            </div>
          )}
        </div>

        {isOpen && (
          <div className={clsx(css.popover, { [css.visible]: isVisible })}>
            <ul className={css.popoverList}>
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

        {selectedCategory === 'verb' && (
          <div className={css.verbWrapper}>
            <div className={css.verbType}>
              <label className={css.labelWrap}>
                <input
                  type="radio"
                  {...register('isIrregular')}
                  value="false"
                  onChange={() => setIsIrregular(false)}
                  className={css.radio}
                />
                <span className={css.radioCustom}></span>
                Regular
              </label>
              <label className={css.labelWrap}>
                <input
                  type="radio"
                  {...register('isIrregular')}
                  value="true"
                  onChange={() => setIsIrregular(true)}
                  className={css.radio}
                />
                <span className={css.radioCustom}></span>
                Irregular
              </label>
            </div>
            {isIrregular && (
              <p className={css.verbText}>
                Such data must be entered in the format I form-II form-III form.
              </p>
            )}
          </div>
        )}
      </div>

      <div className={css.MainInputsWrapper}>
        <label className={css.labelInputWrapper}>
          <div className={css.flagWrapper}>
            <Icon iconId="icon-ukraine" className={css.iconFlag} />
            <p className={css.labelText}>Ukrainian</p>
          </div>
          <div className={css.inputWrapper}>
            <input
              type="text"
              {...register('ua')}
              placeholder="Enter Ukrainian word"
              className={clsx(css.input, { [css.inputError]: errors.ua })}
              aria-invalid={errors.ua ? 'true' : 'false'}
            />
            {errors.ua && (
              <div className={css.messageWrapper}>
                <Icon className={css.iconMessage} iconId="icon-error" />
                <p className={css.errorMessage}>{errors.ua?.message}</p>
              </div>
            )}
          </div>
        </label>

        <label className={css.labelInputWrapper}>
          <div className={css.flagWrapper}>
            <Icon iconId="icon-united-kingdom" className={css.iconFlag} />
            <p className={css.labelText}>English</p>
          </div>
          <div className={css.inputWrapper}>
            <input
              type="text"
              {...register('en')}
              placeholder="Enter English word"
              aria-invalid={errors.en ? 'true' : 'false'}
              className={clsx(css.input, { [css.inputError]: errors.en })}
            />
            {errors.en && (
              <div className={css.messageWrapper}>
                <Icon className={css.iconMessage} iconId="icon-error" />
                <p className={css.errorMessage}>{errors.en?.message}</p>
              </div>
            )}
          </div>
        </label>
      </div>

      <div className={css.buttonWrapper}>
        <button type="submit" disabled={isSubmitting} className={css.buttonAdd}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
        <button type="button" onClick={onCancel} className={css.buttonCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddWordForm;
