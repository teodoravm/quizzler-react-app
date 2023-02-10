import React from 'react';
import {decode} from 'html-entities';

export default function Question(props) {

    function clickAnswer(answer, currentQuestion) {
        props.selectAnswer(answer, currentQuestion)
    }

    React.useEffect(() => {
        props.setIsLoading(false)
    }, [props.isLoading])
   
    const answerElements = props.allAnswers.map(answer => {
        return (
            <div onClick={() => clickAnswer(answer, props.question)}
                className={`unselected 
                ${!props.finished && answer === props.selectedAnswer ? "selected" : ""}
                ${props.finished && answer===props.selectedAnswer &&
                    answer != props.correctAnswer ? "incorrect" : ""}
                ${props.finished && answer===props.correctAnswer ? "correct" : ""}

                `}>{decode(answer)}
            </div>
             )
    })

    return (
        <div className='question-box'>
            <h3 className='question'>{decode(props.question)}</h3>
            <div className='answers' >
                {answerElements}
            </div>
            <hr className='line'></hr>
        </div>
        
    )

}