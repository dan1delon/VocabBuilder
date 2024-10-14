import AddWordForm from '../AddWordForm/AddWordForm';
import css from './AddWordModal.module.css';

const AddWordModal = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.textWrapper}>
        <h3 className={css.title}>Add word</h3>
        <p className={css.paragraph}>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
      </div>
      <AddWordForm />
    </div>
  );
};

export default AddWordModal;
