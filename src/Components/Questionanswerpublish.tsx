import React, { useEffect, useState } from 'react'
import "./Questionanswerpublish.css"

function Questionanswerpublish(props: any) {
    let [qustn_answer_set_as_props, setQustn_answer_set_as_props] = useState(props.questionanswerset)
    let [qustn_answer_set_mapped_display, setQustn_answer_set_mapped_display] = useState()

    useEffect(() => {

        const sortedByQstnNumber = qustn_answer_set_as_props.sort(function (a: any, b: any) { return a.askedQstnNumber - b.askedQstnNumber });

        const variable_to_map_question_list = qustn_answer_set_as_props.map((element: any, index: any,) => {
            if (element.askedQstnToUser !== "") {
                return (
                    <div key={index + 1}>
                        <p className='questiontext'><span className="colorofnosepqstn">(Q.{index + 1}).{` `} </span>  { element.askedQstnToUser}  </p>
                        <p className='correctanswertext '> Correct Answer : <span className='correctanswercolor'>{element.askedQstnCorrectAnswer}  </span>   </p>
                        <p className='choosedanswertext' >
                            Your Answer :
                            {element.askedQstnCorrectAnswer === element.userSelectedAns ?
                                <span className='correctanswercolor'>{element.userSelectedAns}</span> :
                                <span className='wronganswercolor'>{element.userSelectedAns}</span>}
                        </p>
                       
                    </div>
                    
                )
            }else{
                return( <p style ={{color:"#fff"}}>{  `Sorry! no Question and answer found. May be you didn't answer any question with in time. Thanks for the participation` }</p>
           )
            }
        });
        setQustn_answer_set_mapped_display(variable_to_map_question_list)
    }, [qustn_answer_set_as_props])

    return (
        <div className='questiondisplayboxflex'>
            <div className='allquestionstyle'>
                <h4 className='checkyouranswerhead'>Check your answers</h4>
                <div>{qustn_answer_set_mapped_display} </div>
                 {qustn_answer_set_as_props.length!==0 && qustn_answer_set_as_props.length<10&& qustn_answer_set_as_props[0].askedQstnToUser!==""?<p className='no_of_answred_qstn_txt'>Sorry! You answerd only {qustn_answer_set_as_props.length} questions out of 10 questions.</p>:"" }
                        
                </div>
        </div>
    )
}
export default Questionanswerpublish
