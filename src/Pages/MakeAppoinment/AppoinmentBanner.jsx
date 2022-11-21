import React from 'react';
import chair from "../../assets/images/chair.png";
import { DayPicker } from 'react-day-picker';
const AppoinmentBanner = ({ selected, setSelected }) => {
    return (
        <header>
            <div className="hero mb-20">
                <div className="hero-content flex-col lg:justify-between lg:flex-row-reverse">
                    <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt="" />
                    <div>
                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppoinmentBanner;