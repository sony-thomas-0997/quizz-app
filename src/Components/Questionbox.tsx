import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import './Questionbox.css'
import Questionslocal from '../Data/Questionslocal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewQstnToSkippedArray, removeQstnFromSkippedArray } from '../redux_toolkit/SkippedQuestionsreducer'
import { askedQuestiontouser, singleQustnArrayToDisplayOneByOne } from './QuestionBoxVariables'

function Questionbox() {
  const reduxDifficultyValueForQstnFilter = useSelector((state: any) => {
    return state.difficultyValueOfQuestion
  })
  const timefinishedbooloan = useSelector((state: any) => {
    return state.checktimefinishedornot
  })


  // ------------------------ ----------- ------------------------ ------------------------ //
  //qustn_no_for_itartion is used as a filter value to take questions one by one. after each answer... 
  //....the value will be increment to filter the next question  
  //single_question is a object variable used to receive each full question from question set and is used to diplay the value
  // ------------------------------------------------------------------------------------------------ //
  var questionfetched = Questionslocal; //here all questions are imported from the local page jsx
  let [qustn_no_for_itartion, setQustn_no_for_itartion] = useState(0)
  const skippedQuestionsStore = useSelector((state: any) => {
    return state.Skippedquestions
  })
  let [skippedQstnNoItration, setSkippedQstnNoItration] = useState(0)
  let [qstnNoAfterFirstRound, setQstnNoAfterFirstRound] = useState(0)
  let [contestantallanswer, setContestantallanswer] = useState([{
    ...askedQuestiontouser
  }])
  let [itrationfinishedboolean, setItrationfinishedboolean] = useState(false)


  let [contestantselectedanswer, setContestantselectedanswer] = useState({
    ...askedQuestiontouser //to reduce page size,values are in anther page
  })

  const [single_question, setSingle_question] = useState([
    ...singleQustnArrayToDisplayOneByOne //to reduce page size,values are in anther page 
  ])

  const navigate_route_to_result = useNavigate()




  // Here only the questions came under the choosen difficulty level is filtered and save into the variable
  var all_qstns_by_choosed_difficulty = questionfetched.filter((item) => {
    return item.Difficulty.toLowerCase() === reduxDifficultyValueForQstnFilter;

  })


  // if insufficent questions redirect to error page start //
  if (all_qstns_by_choosed_difficulty.length < 10) {
    navigate_route_to_result("/Error", {
      replace: true,
      state: "!nsufficent data to run the quizz!. We will fix it soon. Sorry for the inconvenience"
    })
  }
  // if insufficent questions redirect to error page end //
  // if reload  redirect to error page Start //

  if (reduxDifficultyValueForQstnFilter === "choose" || reduxDifficultyValueForQstnFilter === "") {
    navigate_route_to_result("/Error", {
      replace: true,
      state: "You  reloaded the page"
    })
  }
  useEffect(() => {

    if (skippedQuestionsStore.length !== 0 && itrationfinishedboolean) {
      let contestantAttendedQstnId = contestantallanswer.map((allanswerset: any, allanswersetIndex) => {
        return allanswerset.askedQstnId
      })

      let skippedQstnId = skippedQuestionsStore.map((skippedQstn: any, skippedQstnIndex: any) => {
        return skippedQstn.id
      })
      contestantAttendedQstnId.map((item, index) => {
        let booleanforsamevalues = skippedQstnId.includes(item)
        if (booleanforsamevalues) {
          let indexofsameQstn = skippedQstnId.indexOf(item)

          dispatchForQstnSkipped(removeQstnFromSkippedArray({
            IdOfQstnToRemove: item,
            indexOfQstnToRemove: indexofsameQstn
          }))

          if (skippedQstnNoItration > 0) {
            setSkippedQstnNoItration((state: number) => {
              return state - 1
            })
          } else {
            setSkippedQstnNoItration((state: number) => {
              return 0
            })
          }
        }
      })
    }

  }, [contestantallanswer])

  useEffect(() => {

    let single_question_filtered_by_qstn_no = [];
    if (qustn_no_for_itartion < 10) {
      single_question_filtered_by_qstn_no = all_qstns_by_choosed_difficulty.filter((item, index) => {
        return index === qustn_no_for_itartion
      })
    }

    /*----   take questions from skipped array ------------------------  */
    if (qustn_no_for_itartion >= 10 && skippedQuestionsStore[0] !== undefined) {
      single_question_filtered_by_qstn_no =
        skippedQuestionsStore.filter((skippedeachqstn: any, skippedeachqstnindex: any) => {
          return skippedeachqstnindex === skippedQstnNoItration
        })
      if (single_question_filtered_by_qstn_no[0] !== undefined) {
        setQstnNoAfterFirstRound(single_question_filtered_by_qstn_no[0].thisqstnno)
      }
      if ((skippedQstnNoItration + 1) < skippedQuestionsStore.length) {
        setSkippedQstnNoItration((state) => {
          return state + 1
        })
      }
      if (skippedQstnNoItration + 1 >= skippedQuestionsStore.length) {

        setSkippedQstnNoItration((state) => {
          return 0
        })
      }
      setItrationfinishedboolean((state) => {
        return true
      })
    }

    /*----   take questions from skipped array ------------------------  */
    //here from the set of questions filter by difficulty, each question is extracted to give to the displaying variable 

    setSingle_question(single_question_filtered_by_qstn_no)

  }, [qustn_no_for_itartion])

  // --------------------------------------------------------------------

  const uservaluetarget = (e: any) => {
    setContestantselectedanswer(() => {
      return {
        askedQstnId: single_question[0].id ? single_question[0].id : 0,
        askedQstnToUser: single_question[0].question ? single_question[0].question : "Sorry something happend",
        userSelectedAns: e.target.value,
        askedQstnCorrectAnswer: single_question[0].id ? single_question[0].options.Rightanswer : "",
        askedQstnNumber: itrationfinishedboolean ? qstnNoAfterFirstRound : qustn_no_for_itartion + 1
      }
    }
    )
  }

  const fnToSaveaAnsIncreseQstnNo = () => {

    setContestantallanswer((state) => {

      if (contestantallanswer[0].askedQstnToUser === "") {
        return [
          {
            ...contestantselectedanswer,
          }
        ]
      }
      else return [
        ...state,
        {
          ...contestantselectedanswer,
        }
      ]
    })

    setQustn_no_for_itartion(qustn_no_for_itartion + 1)
    //the individual question answer variable is reset in the following portion. it is done to enable and disable button...
    //...(the condition checking helps to disable the button in case value is not selected) 
    setContestantselectedanswer(() => {
      return {
        ...askedQuestiontouser
      }
    })

  }
  const function_for_final_result = () => {
    navigate_route_to_result('/Result', {
      replace: true,
      state: contestantallanswer,
    })
  }

  useEffect(() => {
    if (contestantallanswer.length === 10 || timefinishedbooloan) {
      function_for_final_result()
    }
  }, [contestantallanswer, timefinishedbooloan])

  const dispatchForQstnSkipped = useDispatch()
  const fnToSkipQstn = (single_question: any, thisqstnno: number) => () => {
    const combinedQstnDataWithQstnNo = single_question.map((allelements: any) => ({ ...allelements, thisqstnno: thisqstnno }))
    let checkQstnAlreadyInSkippedArray = skippedQuestionsStore.filter((item: any, index: any) => {
      return item.id === combinedQstnDataWithQstnNo[0].id
    })

    if (checkQstnAlreadyInSkippedArray[0] === undefined) {
      dispatchForQstnSkipped(addNewQstnToSkippedArray(combinedQstnDataWithQstnNo))
    }

    setQustn_no_for_itartion(qustn_no_for_itartion + 1)

    setContestantselectedanswer(() => {
      return {
        ...askedQuestiontouser
      }
    })

  }
  useEffect(() => {
    if (contestantallanswer.length === 10) {
      setSingle_question(() => {
        return ([
          ...singleQustnArrayToDisplayOneByOne
        ])
      })
    }
  }, [contestantallanswer])

  const { current_minute, current_second } = useSelector((state: any) => {
    return state.currenttimeusedtostyle
  })

  return (

    <div className='questionboxflexcenter'>
      <Box component="section" className={current_minute !== 0 || current_second > 20 ? "questionboxstyle" : "questionboxstylewarning"}>
        <FormControl className='questionandoptions' onChange={uservaluetarget}>
          <Grid2 container className='questions-answer-position-flex'>
            <RadioGroup row name="radio-buttons-group"
              key={qustn_no_for_itartion + 1}
            >
              <Typography className='skippedQstnstext' variant="body1">{itrationfinishedboolean ? "SKIPPED QUESTIONS" : ""} <span className='difficltymarktext'> Level : {reduxDifficultyValueForQstnFilter} </span> </Typography>
              <Grid2 className='questionstylegrid' size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <FormLabel className='questionstyleinlilneclass' id="demo-radio-buttons-group-label">
                  {itrationfinishedboolean ? qstnNoAfterFirstRound + `. ` + single_question[0].question :
                    single_question[0].question ? qustn_no_for_itartion + 1 + `. ` + single_question[0].question :
                      "Sorry something happend"}

                </FormLabel>
              </Grid2>

              <Grid2 className='' size={{ xs: 12, sm: 6, md: 6 }}>
                <div className='optionsstyle option-box-width'>
                  <FormControlLabel key={single_question[0].id} value={single_question[0].options.optionA
                  } control={<Radio />} label={single_question[0].options.optionA} />
                </div>

              </Grid2>
              <Grid2 className='' size={{ xs: 12, sm: 6, md: 6 }}>
                <div className='optionsstyle option-box-width'>
                  <FormControlLabel key={single_question[0].id} value={single_question[0].options.optionB} control={<Radio />} label={single_question[0].options.optionB} />
                </div>
              </Grid2>

              <Grid2 className='' size={{ xs: 12, sm: 6, md: 6 }}>
                <div className='optionsstyle option-box-width'>
                  <FormControlLabel key={single_question[0].id} value={single_question[0].options.optionC} control={<Radio />} label={single_question[0].options.optionC} />
                </div>
              </Grid2>

              <Grid2 className='' size={{ xs: 12, sm: 6, md: 6 }}>
                <div className='optionsstyle option-box-width'>
                  <FormControlLabel key={single_question[0].id} value={single_question[0].options.optionD} control={<Radio />} label={single_question[0].options.optionD} />
                </div>
              </Grid2>

            </RadioGroup>

            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
              {contestantallanswer.length < 9 ? <Button className='skip-btn-prop' sx={{ mt: 1, mr: 1 }} type="submit" variant="contained" onClick={fnToSkipQstn(single_question, qustn_no_for_itartion + 1)} disabled={contestantallanswer.length === 9 ? true : false}   >      {qustn_no_for_itartion < 9 ? "Skip " : "Skip"}
              </Button> : <Button className='skip-btn-prop skip-btn-disabled' style={{ background: "#ffff0047", color: "red" }} sx={{ mt: 1, mr: 1 }} type="submit" variant="contained" onClick={fnToSkipQstn(single_question, qustn_no_for_itartion + 1)} disabled={true}   >      {qustn_no_for_itartion < 9 ? "Skip " : "Skip"}
              </Button>}
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained" onClick={fnToSaveaAnsIncreseQstnNo} disabled={contestantselectedanswer.userSelectedAns === "" ? true : false}>      {contestantallanswer.length < 9 ? "Save and next " : "Save and result"}
              </Button>
            </Grid2>

            <Typography className='questionnextreminder' variant="body1">{contestantselectedanswer.userSelectedAns === "" ? "**please select an option to continue or you can skip" : ""}       </Typography>
          </Grid2>
        </FormControl>

      </Box >
    </div >
  )
}

export default Questionbox
