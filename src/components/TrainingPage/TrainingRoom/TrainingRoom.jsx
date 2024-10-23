import { useEffect, useState } from 'react';
import css from './TrainingRoom.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postAnswer } from '../../../redux/words/operations';
import { useModal } from '../../../context';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/Icon/Icon';
import ModalResults from '../ModalResults/ModalResults';
import toast from 'react-hot-toast';
import { selectTasksResults } from '../../../redux/words/selectors';

const TrainingRoom = ({ tasks, userAnswers, setUserAnswers, setProgress }) => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();
  const tasksResults = useSelector(selectTasksResults);
  const currentTask = tasks[currentTaskIndex] || {};

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
    if (userInput.trim() && currentTask._id) {
      const updatedAnswer = handleUserAnswer(userInput, currentTask.task, {
        _id: currentTask._id,
        en: currentTask.en,
        ua: currentTask.ua,
        task: currentTask.task,
      });

      const updatedAnswers = [...userAnswers, updatedAnswer];
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
    }
  };

  const handleUserAnswer = (userAnswer, taskType, wordObject) => {
    if (taskType === 'en') {
      wordObject.en = userAnswer;
    } else if (taskType === 'ua') {
      wordObject.ua = userAnswer;
    }
    return wordObject;
  };

  return (
    <div className={css.trainingRoom}>
      <div className={css.blocksWrapper}>
        <div className={css.wordBlockUa}>
          {currentTask.task === 'en' ? (
            <p className={css.word}>{currentTask.ua}</p>
          ) : (
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
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
            <p className={css.word}>{currentTask.en}</p>
          ) : (
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
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
