import React from "react";

export default function MainScreen(props) {

    return (
    <div className='quiz-main'>
         <span className="blob"></span>
         <h1>Quizzler</h1> 
         <h3>A fun quiz of 10 questions. Test your knowledge on various categories!</h3>
         <button className='btn-start' onClick={() => props.setStarted(true)}>Start quiz</button>
         <div className="blobtwo"></div>
    </div>
    )
}