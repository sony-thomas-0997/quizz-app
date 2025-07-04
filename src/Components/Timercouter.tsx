import React, { useEffect, useState } from 'react'
import "./Timercounter.css"
import { useDispatch } from 'react-redux'
import { timeFinishedBooleanToTrue } from '../redux_toolkit/TimeOutReducer'
import { updatecurrenttimestyle } from '../redux_toolkit/TimeNowStyleReducer'

function Timercouter() {
    const [minute, setMinute] = useState(2)
    const [second, setSecond] = useState(59)
    const timeoutdispatch = useDispatch()
    const timeforstyledispatch = useDispatch()
    useEffect(() => {
        const interval = setInterval(() => {

            if (minute !== 0 && second === 0) {
                setMinute(minute - 1)
                setSecond(59)
            }
            else if (minute !== 0 && second !== 0) {
                setSecond(second - 1)
            }
            else if (minute === 0 && second !== 0) {
                setSecond(second - 1)
            }
            else if (minute === 0 && second === 0) {
                clearInterval(interval);
                return "sorry Timeout";
            }

        }, 1000);
        return () => clearInterval(interval);

    }, [minute, second]);
    useEffect(() => {
        if (minute === 0 && second === 0) {
            timeoutdispatch(timeFinishedBooleanToTrue())
        }

timeforstyledispatch(updatecurrenttimestyle({
    currentminute:minute,
    currentsecond:second
}))
    }, [minute, second])

    return (
        <div key={second}>
            <div className='counterbox ' >
                <span className='remainingtimetext'>Remaining time<br></br></span>
                <span className='minute'><span className={second <= 40 && second >= 21 && minute === 0 ? "second-warning" : second <= 20 && minute === 0 ? "second-danger" : ""}>{minute}</span></span>
                <span className='minutesecondseparator'><span className={second % 2 === 0 ? " timersepartardotblinkwhite" : "timersepartardotblinkblack"}   >  : </span></span>
                <span className='second'><span className={second <= 40 && second >= 21 && minute === 0 ? "second-warning" : second <= 20 && minute === 0 ? "second-danger" : ""}>{second.toString().padStart(2, "0")}</span></span>
            </div>

        </div>
    )
}

export default Timercouter
