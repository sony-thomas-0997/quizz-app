import React, { useEffect, useState } from 'react'
import './Questionanswerpublish.css';

function Questionanswercheck(props: any) {
  let [qustn_answer_set_as_props, setQustn_answer_set_as_props] = useState(props.questionanswerset)
  let [qustn_answer_set_mapped_display, setQustn_answer_set_mapped_display] = useState()

  useEffect(() => {

    const variable_to_map_question_list = qustn_answer_set_as_props.map((element: any, index: any,) => {
      return (
        <div key={index + 1}>
          <p className='questiontext'>Q.{index + 1}{")"} {element.askedQstnToUser}  </p>
          <p className='correctanswertext'> Correct Answer :  {element.askedQstnCorrectAnswer}   </p>
          <p className='choosedanswertext' > Your Answer :  {element.userSelectedAns}  </p>
        </div>
      )
    });

    setQustn_answer_set_mapped_display(variable_to_map_question_list)
  }, [qustn_answer_set_as_props])



  return (
    <div>
      <div className='allquestionstyle'>
        <h4 className='checkyouranswerhead'>Check your answers</h4>
        <div>{qustn_answer_set_mapped_display} </div>
      </div>
    </div>
  )
}

export default Questionanswercheck
