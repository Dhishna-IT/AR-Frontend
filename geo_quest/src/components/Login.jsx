
import React from 'react';
// import './login.css';
import logo from '../assets/logo.png';

const Login = () => {
    return (
        <div className="full-body">
            <div className="bg-[#111] text-center text-[0.94rem] text-[#fff] font-SFProText min-h-screen flex flex-col justify-center">
                <div className="font-headline-20px button bg-white bg-opacity-5 rounded-xl border border-white max-w-4xl p-5 my-10 mx-7">
                    <img className="max-w-full h-auto mx-auto mt-28" src={logo} alt="image" />
                    <p className="text-2xl leading-7 text-center mt-6">LOGIN TO PLAY</p>
                    <div className="p-5 md:p-10">
                        <form id="loginform">
                            <div>
                                <label className="text-white font-inter block py-2.5 font-medium text-base md:text-lg leading-7 md:leading-8 text-left" htmlFor="email">Email:</label>
                                <input id="email" className="w-full py-2.5 pl-2.5 box-border font-inter bg-glass01 border border-border02 rounded-xl" type="email" name="email" placeholder="Enter email" required />
                            </div>
                            <div>
                                <label className="text-white font-inter block py-2.5 font-medium text-base md:text-lg leading-7 md:leading-8 text-left" htmlFor="password">Password:</label>
                                <input id="password" className="w-full py-2.5 pl-2.5 box-border font-inter bg-glass01 border border-border02 rounded-xl" type="password"  name="unique-id" placeholder="Enter unique id" required />
                            </div>
                            <button className="mt-6 rounded-xl py-2 pl-2 w-full [background:linear-gradient(100.3deg,_rgba(190,_22,_208,_0.8),_rgba(250,_127,_3,_0.8)_0.01%,_rgba(233,_10,_23,_0.8)_99.99%,_rgba(178,_2,_248,_0.8))] [backdrop-filter:blur(10px)] box-border overflow-hidden flex-shrink-0 text-center text-[1.25rem] font-headline-20pxbutton border-[1px] border-solid border-border02" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
