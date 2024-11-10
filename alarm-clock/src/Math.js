import React, { useState, useEffect } from 'react';

const MathProblem = () => {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  
  const appId = 'P4Q2RY-99L8PG5A7U';  // Your Wolfram Alpha API key
  
  useEffect(() => {
    // Generate a random problem
    const generateProblem = () => {
      const problems = ['2+2', '3*5', '12-4', '7*8', '25/5']; // Static problems for now
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];
      setProblem(randomProblem);
      
      // Fetch the correct answer from Wolfram Alpha
      fetch(`https://api.wolframalpha.com/v1/result?i=${randomProblem}&appid=${appId}`)
        .then(response => response.text())
        .then(answer => setCorrectAnswer(answer))
        .catch(error => console.error('Error fetching result:', error));
    };

    generateProblem();
  }, []);

  const handleSubmit = () => {
    if (userAnswer === correctAnswer) {
      setResultMessage('Correct! Well done.');
    } else {
      setResultMessage(`Incorrect. The correct answer was ${correctAnswer}.`);
    }
    // Generate a new problem after a delay
    setTimeout(() => {
      setResultMessage('');
      setUserAnswer('');
      setCorrectAnswer(null);
      setProblem(null);
    }, 3000);
  };

  return (
    <div>
      <h2>Math Challenge</h2>
      {problem && <p>What is {problem}?</p>}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <button onClick={handleSubmit}>Submit</button>
      {resultMessage && <p>{resultMessage}</p>}
    </div>
  );
};

export default MathProblem;
