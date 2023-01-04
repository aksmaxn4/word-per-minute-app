import React from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
  } from 'reactstrap';
  import {useState , useEffect} from 'react'
import Countdown from 'react-countdown';
import Result from './Result';
import GameFieldClass from './GameFieldClass'

const Starter = () => {
const [dropdownOpen, setDropDownOpen] = useState(false)
const [gameDuration, setGameDuration] = useState(0)
const [gameFieldIsShown, showGameField] = useState(false)
const [formDisabled, setFromDisabled] = useState(false)
const toggle = () => setDropDownOpen((state) => !state)


const handleClick = () => {
    if(gameDuration){
        showGameField(state => !state)
        setFromDisabled(state => !state)
    }
}

const handleStartAgain = () => {
    showGameField(false);
    setFromDisabled(false);
}


 return (
    <div  className='.container-md'>
        <div className="row justify-content-md-center">
            <h2 className='display-4'>Word Per Minute Game</h2>
        </div>
        <div className="row d-flex p-5 justify-content-md-center">
            {gameDuration ? <p className='display-5' style={{fontSize: '1.9rem'}}>Game duration is set to {gameDuration/1000} s <br/> Remember to confirm your input with space!</p>  : ''}
        </div>

        <div style={formDisabled ? {pointerEvents: "none", opacity: "0.4"} : {}} className="row justify-content-md-center">
            <div className="col col-lg-2">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} menuRole='listbox' active>
                    <DropdownToggle caret size='lg'>Game Modes</DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem header>Choose game duration</DropdownItem>
                    <DropdownItem onClick={function (){
                        setGameDuration(30000)
                    }}>30s</DropdownItem>
                    <DropdownItem onClick={function (){
                        setGameDuration(60000)
                    }}>1m</DropdownItem>
                    <DropdownItem onClick={function (){
                        setGameDuration(90000)
                    }}>1.5m</DropdownItem>
                    <DropdownItem onClick={function (){
                        setGameDuration(120000)
                    }}>2m</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="col col-lg-2">
                <Button  className='btn btn-success'
                    onClick={handleClick}>
                        Start the game
                </Button>
            </div>
        </div>

        {/* {gameFieldIsShown && <GameField  gameDuration={gameDuration}/>} */}
        {gameFieldIsShown && <GameFieldClass gameDuration={gameDuration} startAgain={handleStartAgain}/>}    
        
    </div>
  )
}

export default Starter