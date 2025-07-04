import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Difficultyselection.css"
import { useDispatch, useSelector } from 'react-redux'
import { changedifficultyvalue } from "../redux_toolkit/difficultyoptionReducer"
import { Link, useNavigate } from 'react-router'
import { emptyskippedqstns } from '../redux_toolkit/SkippedQuestionsreducer'

function Difficultyselection() {
 
    const dispatchForDifficulty = useDispatch()
    const reduxdifficultyvalue = useSelector((state: any) => {
        return state.difficultyValueOfQuestion
    })
 const dispatchtoemptyskiipedvalues = useDispatch()
    useEffect(() => {
        dispatchForDifficulty(changedifficultyvalue("choose"))
    }, [])
 useEffect(()=>{
dispatchtoemptyskiipedvalues(emptyskippedqstns())
 },[])
    const changethedifficultyvalue = (e: any) => {
        dispatchForDifficulty(changedifficultyvalue(e.target.value))
    }
    const navigate_qstn_on_btn_click = useNavigate()
    const function_for_qstn_load_button = () => {
        navigate_qstn_on_btn_click('./Questions', {
        })
    }

    return (
        <div>
            <FormControl className='difficultywidth difficultyfont' >
                <InputLabel
                    className='difficultylabel' id="demo-simple-select-label">Choose Difficulty</InputLabel>

                <Select className='difficultyvalues'
                    labelId="demo-simple-select-label"
                    onChange={changethedifficultyvalue} required
                >
                    <MenuItem key={reduxdifficultyvalue.legth + 1} value={"easy"} >Easy </MenuItem>
                    <MenuItem key={reduxdifficultyvalue.legth + 2} value={"medium"}>Medium</MenuItem>
                    <MenuItem key={reduxdifficultyvalue.legth + 3} value={"hard"}>Hard</MenuItem>
                </Select>

                <p className='pleaseselectdifficulty'>
                    {reduxdifficultyvalue === "choose" ? '**Please select a Difficulty level to continue' : ''}
                </p>

                {reduxdifficultyvalue === "choose" ? <Button disabled className='startbtnintrodisabled' variant="contained" >Start</Button> :
                    <Button className='startbtnintro' onClick={function_for_qstn_load_button}>Start</Button>
                }
            </FormControl>
        </div>
    )
}

export default Difficultyselection;
