import React, { useState, useEffect} from 'react'
import { useRef } from 'react'

export default (props) =>{
    const inputRef = useRef()
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('Library')).sort(() => Math.random() -0.5) || [{id: 0, word: '', translation: ''}])
    const [index, setIndex] = useState(0)
    useEffect(() => {
        return () => {
            localStorage.setItem('score', props.score)
        }
    })
    const checkKeyPress = (event) => {
        if(event.key === 'Enter') {
            checkGame()
        }
    }
    const checkGame = () => {
       if(index == library.length -1){
            if(inputRef.current.value === library[index].translation.replace('the ', '').toLowerCase()) {
                //setIndex(index + 1)
                //props.setCorrectAnswer(props.correctAnswer +1)
               // props.setScore(props.score +1)
                library[index].correct = library[index].correct +1
                localStorage.setItem('Library', JSON.stringify(library))
            } else{
                //props.setWrongAnswer(props.wrongAnswer +1)
                library[index].error = library[index].error +1
                localStorage.setItem('Library', JSON.stringify(library))
            }
    
        } else {
           setLibrary(JSON.parse(localStorage.getItem('Library')).sort(() => Math.random() -0.5) )
        }
        if(inputRef.current.value === library[index].translation.replace('the ', '').toLowerCase()){
            props.setCorrectAnswer(props.correctAnswer +1)
            props.setScore(props.score +1)
        } else{
            props.setWrongAnswer(props.wrongAnswer +1)

        }
     inputRef.current.value = ''
    }
    return (
        <div className='mode-wrapper'>
            <div className='mode-title-word'>
                {library[index].word}
            </div>
            <p className='mode-title-word-description'>Write translation for this word </p>
            <div className='input-block'>
                <input onKeyPress={checkKeyPress} ref={inputRef} id='inputID' type="text" placeholder='Enter word' className='customInput'/>
                <button className='btn-enter' onClick={checkGame}>Enter</button>
            </div>
        </div>
    )
}