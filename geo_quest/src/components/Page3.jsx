
import React from 'react';
import bg from '../assets/bg-page3.png';
import cameraLogo from '../assets/camera-page3.png';
import mapIcon from '../assets/map-icon-page3.png';
import floatBtn from '../assets/float-btn.png';

const Login = () => {
    return (
        <div class="h-[10%] mb-0 w-screen " >
        <img src={bg} alt="bg" class="w-[100%] h-20 !absolute bottom-0"/>
        <div class="flex-row justify-between">
             <div>
            <img src={cameraLogo} alt="camera" class="w-11 my-4 absolute bottom-0 left-[4vw]"/>
        </div>
        <div>
            <img src={mapIcon} alt="map" class=" w-11 absolute bottom-0 my-5  @apply right-[4vw]"/>
        </div>
        <div class="flex justify-center">
            <img src={floatBtn} alt="btn" class="w-[4.5rem] my-4 absolute bottom-3"/>
        </div>
        </div>
       
    </div>
    );
};

export default Login;
