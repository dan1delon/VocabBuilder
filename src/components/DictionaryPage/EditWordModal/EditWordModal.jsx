import { useForm } from 'react-hook-form';
import css from './EditWordModal.module.css';
import { useModal } from '../../../context';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import Icon from '../../../shared/Icon/Icon';
import { editWord, fetchUsersWords } from '../../../redux/words/operations';
import { selectPage } from '../../../redux/words/selectors';
import { useSelector } from 'react-redux';

const EditWordModal = ({ word }) => {
  const { closeModal } = useModal();
  const currentPage = useSelector(selectPage);
  const dispatch = useDispatch();

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
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      en: word.en,
      ua: word.ua,
      category: word.category,
    },
  });

  const onSubmit = async (data, e) => {
    try {
      const wordData = {
        en: data.en.trim().toLowerCase(),
        ua: data.ua.trim().toLowerCase(),
        category: data.category,
      };

      if (word.isIrregular) {
        wordData.isIrregular = word.isIrregular;
      }

      await dispatch(editWord({ id: word._id, wordData })).unwrap();
      await dispatch(
        fetchUsersWords({ category: '', isIrregular: '', page: currentPage })
      ).unwrap();
    } catch (error) {
      console.log('Unexpected error:', error);
    } finally {
      closeModal(e);
      reset();
    }
  };

  const onCancel = e => {
    closeModal(e);
    reset();
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
          <button type="submit" className={css.buttonAdd}>
            Save
          </button>
          <button type="button" onClick={onCancel} className={css.buttonCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWordModal;
