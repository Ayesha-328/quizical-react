import { useState, useEffect } from 'react'
import './App.css';
import './style.css'
import Question from './components/Question';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [quiz, setQuiz] = useState(false)
  const [quizdata, setQuizData] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  // console.log(quiz)
  // console.log(quizdata)

  function toggleQuiz() {
    setQuiz(prevQuiz => {
      console.log("reset quiz ran")
      return !prevQuiz;
    })
  }

  useEffect(function () {
    if (quiz) {
      console.log("UseEffect ran")
      fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => {
          let questionArray = []
          data.results.map((result) => {
            return questionArray.push(
              {
                id: nanoid(),
                question: result.question,
                correct_ans: result.correct_answer,
                answers: result.incorrect_answers.concat(result.correct_answer).sort(() => Math.random() - 0.5),
                selectedAnswer: ""
              }
            )
          })
          setQuizData(questionArray)
        })
        .catch(err => console.log(err))
    }

  }, [quiz])

  const quizElements = quizdata.map(question => {
    return <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAns={question.correct_ans}
      answers={question.answers}
      selectedAnswer={question.selectedAnswer}
      submitAnswer={submitAnswer}
      showResult={showResult} />
  })

  function submitAnswer(event) {
    const { name, value } = event.target;
    const updatedQuizArray = quizdata.map(question => {
      if (question.id === name) {
        // console.log("condition true")
        question.selectedAnswer = value;
      }
      return question
    })
    setQuizData(updatedQuizArray)
  }

  function checkAnswers() {
    let correct = 0;
    setShowResult(prevShowResult => !prevShowResult)
    quizdata.map(question => {
      if (question.selectedAnswer === question.correct_ans) {
        correct++;
      }
    })
    setScore(correct)
    // console.log("Your score is " + score)
  }

  function handleReset() {
    setQuizData([]);
    setQuiz(prevQuiz => !prevQuiz)
    setShowResult(prevShowResult => !prevShowResult);
    setScore(0);
  }



  return (
    <>
      {
        quiz ?
            quizdata.length > 0?
            <>
            < div className='quiz-page'>
            <div className="quiz-container">
              {quizElements}
            </div>
      
            {
              showResult ?
                <>
                  {score === 5 && <Confetti />}
                  <div className="result">
                    <p className="score">You scored {score}/5 correct answers</p>
                    <button className="btn" onClick={handleReset}>Play Again</button>
                  </div>
                </>
                :
                <button className="btn" onClick={checkAnswers}>{showResult ? "Play Again" : "Check Answers"}</button>
            }
      
          </div >
          </>
              : <h3>Loading...</h3>
          
    
      :
  <div className="main-page-container">
    <svg className="bottom-bob" width="168" height="138" viewBox="0 0 148 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8" />
    </svg>
    <h1 className="site-title">Quizzical</h1>
    <p className="site-desc">
      Test your knowledge!
    </p>
    <button className="btn" onClick={toggleQuiz}>Start Quiz</button>
    <svg className="top-bob" width="214" height="217" viewBox="0 0 194 197" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M99.4095 81.3947C71.1213 50.8508 33.3179 21.7816 37.1727 -19.6933C41.4394 -65.599 75.854 -105.359 118.419 -123.133C158.797 -139.994 206.035 -130.256 241.822 -105.149C271.947 -84.0141 272.823 -43.8756 282.141 -8.27104C292.17 30.0508 318.521 70.8106 296.501 103.779C273.538 138.159 224.991 143.432 183.931 138.768C148.318 134.723 123.751 107.677 99.4095 81.3947Z" fill="#FFFAD1" />
    </svg>

  </div>

}
      
    </>
  );
}

export default App;
