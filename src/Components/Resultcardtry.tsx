import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Questionanswercheck from './Questionanswercheck';
import './Resultcard.css'
import { Grid2 } from '@mui/material';
import Questionanswerpublish from './Questionanswerpublish';

function Resultcardtry() {
    const resultfromqstnboxusenavigate = useLocation().state
    let [result_out_of_ten, setResult_out_of_ten] = useState<number>(0)
    let [allqstnandansertodispaly, setAllqstnandansertodispaly] = useState()
    console.log(resultfromqstnboxusenavigate);

 
    useEffect(() => {
        console.log("use effect render");
        setResult_out_of_ten(0)
        resultfromqstnboxusenavigate.forEach((element: any, index: number) => {
            console.log(element.contestantselectedanswer.question_correct_Answer, index);

            if (element.contestantselectedanswer.question_correct_Answer === element.contestantselectedanswer.questionSelectedAnswer) {

                setResult_out_of_ten(result => result + 1)
            }

        });


    }, [resultfromqstnboxusenavigate])

    return (
        <div>
            <Grid2 container >
                <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }} className='scoreboardposition'>
                    <div className={'scoreboard '} >
                        <p><span className='youscored'> score  </span>
                            <span className='scorevalue'>   {result_out_of_ten}</span>
                            <span className='outof'>  Out of </span>
                            <span className='outofvalue'>  10</span> </p>
                    </div>
                </Grid2>
 
            </Grid2>
         
<Questionanswerpublish questionanswerset={resultfromqstnboxusenavigate  }/>
        </div >
    )
}

export default Resultcardtry
