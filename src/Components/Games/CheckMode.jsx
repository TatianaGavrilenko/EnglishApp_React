import React from 'react'
import { useEffect, useState} from 'react'
 
export default (props) =>{
    const checkWord = (word) =>{
        if(library.length -1 !== currentWordIndex) {
            if(word === library[currentWordIndex].word) {
                props.setCorrectAnswer(props.correctAnswer + 1)
                props.setScore(props.score + 1)
                setCurrentWordIndex(currentWordIndex + 1)
                props.CheckLevel()
                library[currentWordIndex].correct = library[currentWordIndex].correct +1
                localStorage.setItem('Library', JSON.stringify(library))
            } else {
                props.setWrongAnswer(props.wrongAnswer + 1)
                library[currentWordIndex].error = library[currentWordIndex].error +1
                localStorage.setItem('Library', JSON.stringify(library))
            }
        } else{
            alert ('Game over!')
            props.setCorrectAnswer(0)
            props.setWrongAnswer(0)
            setCurrentWordIndex(0)
        }
    }
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('Library')) || {id: 0, word: '', translation: ''}, {id: 0, word: '', translation: ''}, {id: 0, word: '', translation: ''}) 
    const [checkArr, setCheckArr] = useState([])
    const currentWord = library[currentWordIndex].translation
    const [initialScore, setInitialScore] = useState(props.score)

    useEffect(() => {
        const filterArr = library.filter((item, index) => index !== currentWordIndex)
        filterArr.sort(() => Math.random() - 0.5) 
        const checkArr = [filterArr[0].word, filterArr[1].word, library[currentWordIndex].word]
        setCheckArr(checkArr.sort(() => Math.random() - 0.5))
    }, [props.correctAnswer])
    useEffect(() => {
        //return () => {
            //props.setScore(initialScore)
       // }
    }, [])

    useEffect(() => {
        localStorage.setItem('score', props.score)
    }, [props.score])

    return (
        <div className='mode-wrapper'>
            <div className="mode-title-word">
                {currentWord}
            </div>
            <p className="mode-title-word-description">Set translation for this word</p>
            <div className="check-item-block">
                {checkArr.map((item, index) => <div key={index} className='check-item' onClick={() => checkWord(item)}>
                    {item}
                </div>)}
            </div>
        </div>
    )
}