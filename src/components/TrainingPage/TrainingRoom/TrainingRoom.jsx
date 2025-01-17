import { useState, useEffect, useRef } from 'react';
import css from './TrainingRoom.module.css';
import { useDispatch } from 'react-redux';
import { postAnswer } from '../../../redux/words/operations';
import { useModal } from '../../../context';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/Icon/Icon';
import ModalResults from '../ModalResults/ModalResults';
import toast from 'react-hot-toast';

const TrainingRoom = ({ tasks, userAnswers, setUserAnswers, setProgress }) => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const currentTask = tasks[currentTaskIndex] || {};

  const capitalizeFirstLetter = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleNext = () => {
    if (userInput.trim() && currentTask._id) {
      const updatedAnswer = handleUserAnswer(userInput, currentTask.task, {
        _id: currentTask._id,
        en: currentTask.en,
        ua: currentTask.ua,
        task: currentTask.task,
      });

      setUserAnswers([...userAnswers, updatedAnswer]);
      setUserInput('');
    }
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handleSave = async () => {
    const updatedAnswer =
      userInput.trim() && currentTask._id
        ? handleUserAnswer(userInput, currentTask.task, {
            _id: currentTask._id,
            en: currentTask.en,
            ua: currentTask.ua,
            task: currentTask.task,
          })
        : null;

    const updatedAnswers = updatedAnswer
      ? [...userAnswers, updatedAnswer]
      : userAnswers;

    if (updatedAnswers.length > 0) {
      setUserAnswers(updatedAnswers);

      try {
        const response = await dispatch(postAnswer(updatedAnswers)).unwrap();

        setUserInput('');
        setProgress(0);
        openModal(<ModalResults answers={response} />);
      } catch (err) {
        toast.error('Error while saving answers: ' + err);
        navigate('/dictionary');
      }
    } else {
      toast.error('You need to answer at least one task.');
    }
  };

  const handleUserAnswer = (userAnswer, taskType, wordObject) => {
    const trimmedAnswer = userAnswer.trim();

    const referenceWord = taskType === 'en' ? wordObject.ua : wordObject.en;

    const formattedAnswer =
      referenceWord[0] === referenceWord[0].toLowerCase()
        ? trimmedAnswer.charAt(0).toLowerCase() + trimmedAnswer.slice(1)
        : trimmedAnswer.charAt(0).toUpperCase() + trimmedAnswer.slice(1);

    if (taskType === 'en') {
      wordObject.en = formattedAnswer;
    } else if (taskType === 'ua') {
      wordObject.ua = formattedAnswer;
    }

    return wordObject;
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      if (currentTaskIndex < tasks.length - 1) {
        handleNext();
      } else {
        handleSave();
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentTaskIndex]);

  return (
    <div className={css.trainingRoom}>
      <div className={css.blocksWrapper}>
        <div className={css.wordBlockUa}>
          {currentTask.task === 'en' ? (
            <p className={css.word}>{capitalizeFirstLetter(currentTask.ua)}</p>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введіть переклад"
              className={css.input}
            />
          )}
          <div className={css.btnAndFlagWrapper}>
            {currentTask.task === 'ua' &&
              currentTaskIndex < tasks.length - 1 && (
                <button onClick={handleNext} className={css.nextButton}>
                  Next <Icon iconId="icon-arrow" className={css.iconArrow} />
                </button>
              )}
            <div className={css.flagBlock}>
              <Icon iconId="icon-ukraine" className={css.iconFlag} />
              <p className={css.language}>Ukrainian</p>
            </div>
          </div>
        </div>

        <div className={css.wordBlockEn}>
          {currentTask.task === 'ua' ? (
            <p className={css.word}>{capitalizeFirstLetter(currentTask.en)}</p>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter translation"
              className={css.input}
            />
          )}
          <div className={css.btnAndFlagWrapper}>
            {currentTask.task === 'en' &&
              currentTaskIndex < tasks.length - 1 && (
                <button onClick={handleNext} className={css.nextButton}>
                  Next <Icon iconId="icon-arrow" className={css.iconArrow} />
                </button>
              )}
            <div className={css.flagBlock}>
              <Icon iconId="icon-united-kingdom" className={css.iconFlag} />
              <p className={css.language}>English</p>
            </div>
          </div>
        </div>
      </div>

      <div className={css.buttonsBlock}>
        <button onClick={handleSave} className={css.saveButton}>
          Save
        </button>
        <NavLink to="/dictionary" className={css.cancelButton}>
          Cancel
        </NavLink>
      </div>
    </div>
  );
};

export default TrainingRoom;
