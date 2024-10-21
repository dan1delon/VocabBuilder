import { useState } from 'react';
import css from './TrainingRoom.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postAnswer } from '../../../redux/words/operations';
import { useModal } from '../../../context';
import { NavLink } from 'react-router-dom';

const TrainingRoom = ({ tasks }) => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  const currentTask = tasks[currentTaskIndex];

  console.log(tasks);

  console.log(currentTask);

  const handleNext = () => {
    if (userInput.trim()) {
      setUserAnswers([
        ...userAnswers,
        { taskId: currentTask._id, answer: userInput },
      ]);
      setUserInput('');
    }
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handleSave = async () => {
    if (userInput.trim()) {
      setUserAnswers([
        ...userAnswers,
        { taskId: currentTask._id, answer: userInput },
      ]);
    }
    try {
      await dispatch(postAnswer(userAnswers)).unwrap();
      // openModal(<WellDoneModal results={userAnswers} />);
    } catch (err) {
      setError('Failed to save progress. Redirecting to Dictionary.');
    }
  };

  return (
    <div className={css.trainingRoom}>
      <div className={css.wordBlock}>
        <p className={css.word}>{currentTask.en}</p>
      </div>
      <div className={css.translateBlock}>
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Enter your translation"
        />
        {currentTaskIndex < tasks.length - 1 && (
          <button onClick={handleNext} className={css.nextButton}>
            Next
          </button>
        )}
      </div>
      <div className={css.buttonsBlock}>
        <button onClick={handleNext} className={css.saveButton}>
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
