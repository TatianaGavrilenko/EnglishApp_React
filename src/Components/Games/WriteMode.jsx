import React from 'react'
import { useRef } from 'react'

export default (props) =>{
    //const arrayElement = ['1', '2', '5']
    const inputRef = useRef()
   // const arrayRef = useRef(Array(arrayElement.length))
    {/*const checkWord = () => {
       let s = arrayRef.current[2]

    }*/}
    return (
        <div className='mode-wrapper'>
           <input ref={inputRef} id='inputID' type="text" placeholder='Enter word'/>
           {/*<button onClick={checkWord}>Check</button>*/}
           {/*{arrayElement.map((element, index) => <div
                ref={el => arrayRef.current[index] = el}
           >
               {element}

           </div>)} */}
        </div>
    )
}