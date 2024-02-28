import React,{useState} from 'react'
import '../style.css'

function Question(props) {
    function unescapeHtml(data) {
        return data.replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
      }
    const q=unescapeHtml(props.question)
   
    const answerElements=props.answers.map(ans=>{
        const isCorrect = ans === props.correctAns;
        const isSelected = ans === props.selectedAnswer;
        let optionClass = "option";

        if (props.showResult) {
            if (isSelected && isCorrect) {
                optionClass = "correct option";
            } else if (isSelected && !isCorrect) {
                optionClass = "wrong option";
            } else if (isCorrect) {
                optionClass = "correct option";
            }
        } else if (isSelected) {
            optionClass = "option selected";
        }
        
        
        return <>
         <input 
            type="radio" 
            name={props.id} 
            id={ans} 
            value={ans}
            onChange={(event)=>props.submitAnswer(event)} 
            checked={props.selectedAnswer===ans}
            disabled={props.showResult}
            /><label className={optionClass} htmlFor={ans}>{ans}</label>
        </>
    })
  return (
    <div className="question-container">
        <p className="question">{q}</p>
        <ul className="options-list">
        {answerElements}
        </ul>
       
    </div>
  )
}

export default Question