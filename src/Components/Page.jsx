import React from 'react';

class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: true,
            translation: '',
            value: '',
            library: JSON.parse(localStorage.getItem('Library')) || [{id: 0, word: '', translation: ''}]
        }

        this.changeMode = this.changeMode.bind(this)
        this.getValue = this.getValue.bind(this)
        this.addWordToLibrary = this.addWordToLibrary.bind(this)
    }

    componentDidMount(){
        document.addEventListener('keydown', (event) => {
            if (this.state.value.length > 0 && this.state.isOpen && event.key === 'Enter') {
                this.addWordToLibrary()
            }
        })
    }

    changeMode(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    async removeWordFromLibrary(index) {
        await this.setState(prevState => ({
            library: prevState.library.filter((word, i) => i !== index)
        }))
        await localStorage.setItem('Library', JSON.stringify(this.state.library))
    }

    async addWordToLibrary() {
        try {
            const response = await fetch(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=ru&target=en&input=${this.state.value}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
                    "x-rapidapi-key": "f9871e9028mshc949b36dd6ede42p19eea8jsnfe9903109b31"
                }
            })
            const result = await response.json()

            if (result.outputs) {
                await this.setState(()=> ({
                    translation: result.outputs[0].output
                }))
            }

            await this.setState(prevState => ({
                library: [...prevState.library, {id: this.state.library.length, word: this.state.value, translation: this.state.translation}]
            }))
    
            await localStorage.setItem('Library', JSON.stringify(this.state.library))
            await this.changeMode()
            await this.setState(()=> ({
                translation: ''
            }))
        }
        
            catch (error) {
                console.log(error)
            }
    }

    async getValue(event){
        const value = event.currentTarget.value
        this.setState(()=> ({
            value: value
        }))
           
    }

    render() {
        return(
            <div className="page-container">
                <div className="add-word-container">
                    {this.state.isOpen ? 
                        <span className="label-title">Add new word</span> : 
                        <div>
                            <input onChange={this.getValue} placeholder = "Enter new word"/>
                            <span>{this.state.translation}</span>
                            <button onClick={this.addWordToLibrary} className = "btn-check"> ✓</button>
                        </div>
                    }
                    <button onClick ={this.changeMode} className = {this.state.isOpen ? 'btn-add': 'btn-close'}></button>
                </div>
                <div className='library-container'>
                    <div className="library-header">
                        <div>Word</div>
                        <div>Translation</div>
                        <div>Learn Level</div>
                    </div>
                    {this.state.library.map((word, index) => (
                        <div key={index}> 
                            <div>
                                {word.id}
                            </div>
                            <div>
                                {word.word}
                            </div>
                            <div>
                                {word.translation}
                            </div>
                            <div onClick={() => this.removeWordFromLibrary(index)}>Delete</div>
                        </div>
                    ))}
                   
                </div>
            </div>
        )
    }

}

export default Page