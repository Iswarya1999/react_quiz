import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './CurrentAffair.css';

const CurrentAffair = () => {
    return (
      <div className='mainComponent'>
        <h1>Current Affairs</h1>
        <h2>Top 60 Question</h2>
        <div className='topdiv'>
          <h3>April 3rd week</h3>
          <Link className='startbtn' to="/quiz/april/3">Start Test</Link>
        </div>
        {/* <div className='topdiv'>
          <h3>April 4th week</h3>
          <Link className='startbtn' to="/quiz/april/4">Start Test</Link>
        </div>
        <div className='topdiv'>
          <h3>May 1st week</h3>
          <Link className='startbtn' to="/quiz/may/1">Start Test</Link>
        </div>
        <div className='topdiv'>
          <h3>May 2nd week</h3>
          <Link className='startbtn' to="/quiz/may/2">Start Test</Link>
        </div>
        <div className='topdiv'>
          <h3>May 3rd week</h3>
          <Link className='startbtn' to="/quiz/may/3">Start Test</Link>
        </div>
        <div className='topdiv'>
          <h3>May 4th week</h3>
          <Link className='startbtn' to="/quiz/may/4">Start Test</Link>
        </div> */}
      </div>
    );
  };
  
  export default CurrentAffair;
