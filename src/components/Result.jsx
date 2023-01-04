import React from 'react'

const Result = (props) => {


  return (
    <div className='display-5 row justify-content-md-center' style={{width: '50%', alignSelf: 'center', fontSize: '1.8rem', marginTop: '0.5cm'}}>
        <p>Your score is <span style={{fontWeight: 'bold'}}>{props.score} words.</span> </p>
        <p>You type <span style={{fontWeight: 'bold'}}>{(props.score/(props.duration/1000)).toFixed(2)} words per second</span> and {props.score/(props.duration/1000)*60} per minute on average.</p>
        <p style={{fontSize: '20px'}}>The words you made correctly: {props.correctWords}</p>
    </div>
  )
}

export default Result