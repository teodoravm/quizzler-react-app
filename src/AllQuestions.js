import React, { component, Suspense, lazy} from 'react';
import './Question';
import Question from './Question';
import './AllQuestions.css';


export default function AllQuestions(props) {

    const [finished, setFinished] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([])
    const [rightAnswers, setRightAnswers] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(
            function fetchData() {
                if(questions.length === 0) {
                    fetch("https://opentdb.com/api.php?amount=10")
                    .then(res => res.json())
                    .then(data => {
                      setQuestions(data.results)
        
                      setQuestionsAndAnswers(data.results.map(questionObj => {
                        const correctAnswer = questionObj.correct_answer
                        const options = createRandomArray([
                            ...questionObj.incorrect_answers, questionObj.correct_answer]) 
        
                        return {
                            question: questionObj.question,
                            correctAnswer: correctAnswer,
                            options: options,
                            selectedAnswer: ""
                        }
                      }))
        
                    })

                }
            }
        , [questionsAndAnswers])

     function createRandomArray(arr) {
         let myArr = arr
         let newArr = []

         while(myArr.length > 0) {
            let randomIndex = Math.floor(Math.random() * myArr.length)
            newArr.push(myArr[randomIndex])
            myArr.splice(randomIndex, 1)
         }
            return newArr  
    }

    function selectAnswer(answer, currentQuestion) {
        setQuestionsAndAnswers(questionsAndAnswers.map(questionObj => {
            return questionObj.question === currentQuestion ?
            {...questionObj, selectedAnswer: answer} :
            questionObj
        }))
        console.log("selected")
    }

    function checkAnswers() {
        
        questionsAndAnswers.forEach(questionObj => {
           if(questionObj.selectedAnswer === questionObj.correctAnswer) {
            setRightAnswers(prevAns => prevAns + 1)
           }
        })


        setFinished(true)
    }


    function playAgain() {
       
        setQuestionsAndAnswers([])
        setQuestions([])
        setFinished(false)
        setRightAnswers(0)
        props.setStarted(false)
    }
    
    const questionElements = questionsAndAnswers.map((questionObj, index) => {
        return <Question 
            key={index}
            question={questionObj.question}
            allAnswers={questionObj.options}
            correctAnswer={questionObj.correctAnswer}
            selectedAnswer={questionObj.selectedAnswer}
            selectAnswer={selectAnswer}
            finished={finished}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            />
    })


    return (
        <div className='allQuestions-container'>
            {questionElements}

            {finished &&
            <div className='result-box'>
                <h3>You have {rightAnswers}/10 correct answers.</h3>
            </div>}
            {isLoading ? <div className='empty-screen'><h1>Loading...</h1></div> : <button className='btn-check' onClick={finished ? playAgain : checkAnswers}>
                {finished ? "Play again" : "Check results"}</button> }
    
         </div>
)
     
    
}
