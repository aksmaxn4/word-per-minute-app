import {Button, Input} from 'reactstrap'
import Countdown from 'react-countdown';
import {useState, useEffect} from 'react'
import React from 'react';
import Result from './Result';

class GameFieldClass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: Date.now(),
            words: ["economic","return","gleaming","energetic","truthful","compete","meek","weigh","dirty","event","motionless","purpose","perpetual","floor","minister","end","decorate","loving","offer","nutritious","strengthen","great","extra-small","produce","bare","low","ignore","fearless","vessel","tail","hill","ossified","wry","dream","fuzzy","crush","crook","absent","airplane","fog","rice","evanescent","pretty","poke","familiar","parallel","alive","disastrous","grieving","clever","pop","tramp","squalid","tall","smart","prickly","delirious","peel","wait","science","serve","saw","tired","breakable","pretend","pedal","prefer","found","tranquil","kill","puzzled","abnormal","raspy","loud","damaging","dam","self","door","quilt","coherent","mitten","elbow","territory","oafish","eatable","salty","knowing","plucky","quicksand","aback","gamy","profuse","lopsided","tin","faint","building","soggy","disarm","magnificent","tacit","spiritual","crazy","group","jittery","towering","sore","provide","bells","drunk","scare","rural","orange","bare","creator","thunder","sand","faint","key","offend","kittens","foot","fairies","curious","coordinated","yoke","godly","dapper","unit","cute","ashamed","appliance","hurt","nest","attack","trees","early","null","scared","solid","turkey","back","deafening","ruin","count","rhetorical","different","capable","dizzy","verse","haunt","doubtful","old","skin","stream","woebegone","windy","fierce","pipe","dysfunctional","oval","radiate","unadvised","tired","knit","exciting","trite","outstanding","pigs","toothpaste","nauseating","travel","famous","mother","launch","torpid","tremble","examine","tangy","behave","act","snore","uneven","object","yam","ban","pale","fine","muddle","girl","scold","aftermath","sigh","cellar","mug","wren","kaput","care","substance","skip","angry","dangerous","wrap","materialistic","greedy","value","cars","step","smile","cautious","disturbed","road","swing","twist","shaggy","art","current","intelligent","shiny","breath", 'coward', 'breaking', 'beautiful', 'cringe', 'quit', 'rock', 'horse'],
            index: 0,
            gameDuration: this.props.gameDuration,
            currentWord: '',
            userInput: '',
            currentWordMistaken: '',
            pastWords: '',
            mistakes: 0,
            score: 0,
            isDisabled: {},
            isDisabledNum: 0,
        }
    }

    disableComponent(){
        if(this.state.isDisabledNum === 0){
            this.setState({isDisabledNum: 1})
            document.activeElement.blur()
            this.setState({isDisabled: {pointerEvents: "none", opacity: "0.4"}})
        }   
        
    }

    componentDidMount(){
        let randomInt = Math.floor(Math.random() * (this.state.words.length - 35 + 1));
        this.setState({index: randomInt}, () => {this.setState({currentWord: this.state.words[this.state.index]})})
    }

    updateInput(event){
        this.setState({userInput: event.target.value})
        this.checkWord(event)
    }

    showMistake(){
        let str = ''
        for(var i = 0; i < this.state.currentWord.length; i++){
            if(this.state.currentWord[i] != this.state.userInput[i]){
                str += `<span style="color: red; font-size: 2rem">${this.state.currentWord[i]}</span>`
                this.setState({mistakes: this.state.mistakes+1})
            }else{
                str += this.state.currentWord[i]
            }
        }
        return str
    }

    checkWord(event){
        if(this.state.userInput == this.state.currentWord){
            this.setState({index: this.state.index+1},() => {
                this.setState({pastWords: this.state.pastWords + ' ' + this.state.currentWord}, () => {
                    this.setState({currentWord: this.state.words[this.state.index]}, () => {
                        this.setState({userInput: ''},()=>{
                            event.target.value = ''
                        })
                    })
                })
            })
            this.setState({currentWordMistaken: ''})
            this.setState({score: this.state.score+1})
        }else if(this.state.userInput.length == this.state.currentWord.length && this.state.userInput !== this.state.currentWord){
            this.setState({currentWordMistaken: this.showMistake()})
        }
    }

    // componentDidCatch(error, info) {
    //     console.log(error, info)
    //   }

    renderer = ({hours, minutes, seconds,completed}) => {
        if(completed){
            this.disableComponent()
            return <Result score={this.state.score} duration={this.state.gameDuration } correctWords={this.state.pastWords}/>
        }
        else{
            return <span style={{fontSize: '24px'}}>0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>;
        }
    }

    setWordOrMistake(){
        if(this.state.currentWordMistaken)
            return {__html: this.state.currentWordMistaken}
        else
            return {__html: this.state.currentWord}
    }

    justDoIt = () => {
        this.props.startAgain()
    }

    render(){
         return(
            <div className='conainer' style={styles.container}>
            <Countdown date={this.state.date + this.state.gameDuration}
                        renderer={this.renderer}
                        />
            {!this.state.isDisabledNum && <p className='display-6' style={{width: '50%', alignSelf: 'center', fontSize: '1.8rem'}} dangerouslySetInnerHTML={this.setWordOrMistake()} >
                
            </p>}
            <div className="row justify-content-md-center">
                <div className="col col-lg-2">
                    <Input autoComplete='false' autoFocus style={this.state.isDisabled} id='input' bsSize='sm' onInput={evt => this.updateInput(evt)}/>
                    {/* {this.state.userInput} */}
                </div>
                <div className="col col-lg-2">
                <Button className='btn btn-outline-info'
                        onClick={this.justDoIt}>
                    Start Again
                </Button>
                </div>
            </div>
            {/* <p>{this.state.pastWords}</p> */}
        </div>
         );
    }
}

var styles = {
    container:{
        display: "flex",
        flexDirection: 'column',
    }
}
export default GameFieldClass;