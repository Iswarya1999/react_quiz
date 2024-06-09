import React, { useState, useEffect } from 'react';
import './quiz.css'; // Import your CSS file
import Question from '../data/aprilthirdtopsixty.json';
import { useParams } from 'react-router-dom'; // Import useParams
import { Link } from 'react-router-dom'; // Import Link

const QuizApp = () => {
  const {month, id } = useParams(); // Access the parameter from the URL
  const [data,setData]= useState([]);
useEffect(()=>{
  getData()
},[id])
const getData = () =>{
  let q;
if(month === "april" && id === "3"){
  q = Question.quizdata;
}
// if(month === 'may' && id === "3"){
//    q = MayThirdTopSixty.quizdata;
// }
setData(q)

}
let questions = data;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(null));
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(1800); // 1800 seconds = 30 minutes
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    let countdown;
    if (quizStarted && timer > 0 && !testCompleted) {
      countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 || testCompleted) {
      clearTimeout(countdown);
      handleSubmitButtonClick();
    }

    return () => clearTimeout(countdown);
  }, [quizStarted, timer, testCompleted]);

  const handleAnswerOptionClick = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = option;
    setSelectedOptions(updatedSelectedOptions);

    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handlePreviousButtonClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextButtonClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleStartButtonClick = () => {
    setQuizStarted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    let timeString = '';
    if (minutes > 0) {
      timeString += `${minutes} min `;
    }
    if (remainingSeconds > 0) {
      timeString += `${remainingSeconds} sec`;
    }
    return timeString.trim();
  };

  const handleSubmitButtonClick = () => {
    setShowScore(true);
    setTestCompleted(true);
  };

  const wrongQuestions = questions.filter((question, index) => {
    return selectedOptions[index] !== question.answer;
  });

  return (
    <div className="quiz-app">
      {!quizStarted ? (
        <button onClick={handleStartButtonClick}>Start</button>
      ) : (
        <>
          {showScore ? (
            <div className="score-section">
              <div>You scored {score} out of {questions.length}</div>
              <div>Test completed in {formatTime(1800 - timer)}</div>
              {wrongQuestions.length > 0 && (
                <>
                <div className="wrong-questions-section">
                  <h2>Wrong Questions:</h2>
                  {wrongQuestions.map((question, index) => (
                    <div key={index} className="wrong-question">
                      <div>Question {index + 1}: {question.question}</div>
                      <div style={{color:"green"}}>Correct Answer: {question.answer}</div>
                    </div>
                  ))}
                </div>
                <div><Link className='startbtn' to="/" >Back to Home</Link></div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className='maindiv'>
                <div className="timer-section">
                  Timer: {formatTime(timer)}
                  <Link className='startbtn' to="/" >Back to Home</Link>
                </div>
                <div className="question-section">
                  <div className="question-count">
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className="question-text">
                    {questions[currentQuestion].question}
                  </div>
                </div>
                <div className="answer-section">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerOptionClick(option)}
                      className={selectedOptions[currentQuestion] === option ? 'selected' : ''}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="button-section">
                  {currentQuestion > 0 && (
                    <button onClick={handlePreviousButtonClick}>Previous</button>
                  )}
                  {currentQuestion < questions.length - 1 && (
                    <button onClick={handleNextButtonClick}>Next</button>
                  )}
                  {currentQuestion === questions.length - 1 && (
                    <button onClick={handleSubmitButtonClick}>Submit</button>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;
