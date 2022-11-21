import React, { useState } from 'react';
import AppoinmentBanner from './AppoinmentBanner';
import AvailableAppoinments from './AvailableAppoinments';

const MakeAppoinment = () => {
    const [selected, setSelected] = useState(new Date());
    return (
        <div className='mx-auto  my-20'>
            <AppoinmentBanner selected={selected} setSelected={setSelected} />
            <AvailableAppoinments selectedDate={selected} />
        </div>
    );
};

export default MakeAppoinment;