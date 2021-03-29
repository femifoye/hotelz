import React from 'react';
import HotelForm from './HotelForm';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-inner">
                <div className="overlay">
                    <HotelForm></HotelForm>
                </div>
            </div>
        </div>
    )
}

export default Hero