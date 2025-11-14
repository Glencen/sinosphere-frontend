import { useState } from 'react';
import { tasksData } from '../data/tasksData';

const HardDifTaskPage = () => {
  const levelData = tasksData.find(task => task.level === 'Продвинутый');
  const tasks = levelData ? levelData.tasks : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (tasks.length === 0) return <p style={{ textAlign: 'center' }}>Вопросы не найдены</p>;

  const currentTask = tasks[currentIndex];

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const nextTask = () => {
    if (currentIndex < tasks.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const finishTest = () => setShowResults(true);

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Продвинутый уровень</h2>

      {!showResults ? (
        <>
          <p style={{ textAlign: 'center' }}>{currentTask.question}</p>
          <textarea
            value={answers[currentIndex] || ''}
            onChange={handleAnswerChange}
            rows={4}
            style={{ width: '80%', marginBottom: '12px', textAlign: 'center' }}
          />
          {currentIndex < tasks.length - 1 ? (
            <button onClick={nextTask} style={{ marginBottom: '12px' }}>Следующий вопрос</button>
          ) : (
            <button onClick={finishTest} style={{ marginBottom: '12px' }}>Завершить тест</button>
          )}
        </>
      ) : (
        <>
          <p style={{ textAlign: 'center' }}>Тест завершён!</p>
          <button onClick={() => setShowDetails(!showDetails)} style={{ marginBottom: '12px' }}>
            {showDetails ? 'Скрыть ответы' : 'Подробнее'}
          </button>
          {showDetails && (
            <ul style={{ textAlign: 'center', listStyle: 'none', padding: 0 }}>
              {tasks.map((task, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  {task.question} <br />
                  Ваш ответ: {answers[idx] || 'Не введён'} <br />
                  Правильный ответ: {task.options ? task.options[task.correctIndex] : 'N/A'}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default HardDifTaskPage;
