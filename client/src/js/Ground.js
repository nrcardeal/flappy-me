//Ground.js
import React, { useState, useEffect } from 'react';
import '../css/Ground.css'

function Ground() {
    const [msg, setMsg] = useState('Bem Vindo');
    const [count, setCount] = useState(0);

    useEffect( () => {
        const msgs = ["Dia 11/05", "Às 21h", "Hamburgueria Hã", "Carnaxide", "Avisa até 09/05"]
        setTimeout(() => {
            setCount(c => c+1)
            setMsg(msgs[count % msgs.length])
        }, 6000)
    }, [count])

    return (
        <div className='Ground'>
            <p>{msg}</p>
        </div>
    );
}

export default Ground