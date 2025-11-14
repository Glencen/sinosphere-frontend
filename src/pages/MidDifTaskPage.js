import { useState } from 'react';
import { tasksData } from '../data/tasksData';

const MidDifTaskPage = () => {
  const levelData = tasksData.find(task => task.level === 'Средний');
  const tasks = levelData ? levelData.tasks : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (tasks.length === 0) return <p style={{ textAlign: 'center' }}>Вопросы не найдены</p>;

  const currentTask = tasks[currentIndex];

  const handleAnswer = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = index;
    setSelectedAnswers(newAnswers);
  };

  const nextTask = () => {
    if (currentIndex < tasks.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const finishTest = () => setShowResults(true);

  const correctCount = selectedAnswers.filter(
    (a, i) => a === tasks[i].correctIndex
  ).length;

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Средний уровень</h2>

      {!showResults ? (
        <>
          <p style={{ textAlign: 'center' }}>{currentTask.question}</p>
          {currentTask.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              style={{
                display: 'block',
                margin: '8px 0',
                backgroundColor: selectedAnswers[currentIndex] === idx ? '#2563EB' : '#f0f0f0',
                color: selectedAnswers[currentIndex] === idx ? 'white' : 'black',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                minWidth: '200px',
                textAlign: 'center'
              }}
            >
              {opt}
            </button>
          ))}
          {currentIndex < tasks.length - 1 ? (
            <button onClick={nextTask} style={{ marginTop: '12px' }}>Следующий вопрос</button>
          ) : (
            <button onClick={finishTest} style={{ marginTop: '12px' }}>Завершить тест</button>
          )}
        </>
      ) : (
        <>
          <p style={{ textAlign: 'center' }}>
            Результат: {correctCount} из {tasks.length} правильных ({Math.round((correctCount / tasks.length) * 100)}%)
          </p>
          <button onClick={() => setShowDetails(!showDetails)} style={{ marginBottom: '12px' }}>
            {showDetails ? 'Скрыть ответы' : 'Подробнее'}
          </button>
          {showDetails && (
            <ul style={{ textAlign: 'center', listStyle: 'none', padding: 0 }}>
              {tasks.map((task, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  {task.question} <br />
                  Ваш ответ: {selectedAnswers[idx] !== undefined ? task.options[selectedAnswers[idx]] : 'Не выбран'} <br />
                  Правильный ответ: {task.options[task.correctIndex]}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default MidDifTaskPage;
