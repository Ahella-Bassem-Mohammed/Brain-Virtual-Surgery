import React from 'react'
import './LoginSignup/LoginSignup.css';

export const Home = ()=>{
    return <div className='home'>
        <div className='content'>
            <h1>Brain <br></br>Virtual Surgery</h1>
            <p className='details'>
                When you see it is Difficult<br></br>
                We Decided  to make it More Safe and Easier!<br></br>            
            </p>
            <div className='header-btns'>
                <button onClick={() => window.location="/about" }className="header-btn">Learn more..</button>
        </div>
    </div>
</div>;
};