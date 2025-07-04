import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Resultcard.css'
import { Grid2 } from '@mui/material';
import Questionanswerpublish from './Questionanswerpublish';

function Resultcard() {
    const resultfromqstnboxusenavigate = useLocation().state
    let [result_out_of_ten, setResult_out_of_ten] = useState<number>(0)
   
    useEffect(() => {    
        setResult_out_of_ten(0)
        resultfromqstnboxusenavigate.forEach((element: any, index: number) => {
            if (element.askedQstnToUser !== "") {
                if (element.askedQstnCorrectAnswer === element.userSelectedAns) {

                    setResult_out_of_ten(result => result + 1)
                }
            }
        });

    }, [resultfromqstnboxusenavigate])

    return (
        <div>
            <Grid2 container >
                <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }} className='scoreboardposition'>
                    <div className={'scoreboard '} >
                        <p className='youscoredtextbg'><span className='youscored'> Your Score : </span><br></br><br></br></p>
                        <p className='scorevaluebg'>       <span className='scorevalue'>   {result_out_of_ten}</span>
                            <span className='outof'>  Out of </span>
                            <span className='outofvalue'>  10</span> </p>
                    </div>
                </Grid2>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                <Questionanswerpublish questionanswerset={resultfromqstnboxusenavigate} />
            </Grid2>
        </div >
    )
}

export default Resultcard
