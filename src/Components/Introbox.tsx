import { Box, Grid2, Typography } from '@mui/material'
import "./Introbox.css"
import Difficultyselection from './Difficultyselection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { timeFinishedBooleanToFalse } from '../redux_toolkit/TimeOutReducer'
function Introbox() {
    const timeoutdispatchintropage = useDispatch()
    useEffect(() => {
        timeoutdispatchintropage(timeFinishedBooleanToFalse())
    }, [])
    return (
        <div>
            <Box className="introboxoutline">
                <Typography className='introboxheading' variant="h5" component="h2">
                    Welcome To The   Quizz!
                </Typography>

                <div className='istructionhighlight'>
                    <Typography className='introboxinstruchead' variant="body1" component="h2">
                        Instructions
                    </Typography>

                    <Typography variant="body1" className='listinstructions' >
                        * You have 3 minutes to complete 10 questions
                    </Typography>
                    <Typography className='listinstructions' variant="body1" >
                        * you can skip any question and can re-attend the skipped questions after finishing remaining questions.
                    </Typography>
                    <Typography className='listinstructions' variant="body1" >
                        * if time exceeds, your current score will be calculated out of 10.
                    </Typography>
                </div>
                <br></br>
                <Grid2 container size={12} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: 'center',
                    gap: 2
                }}>

                    <Grid2 size={{ xs: 12, md: 12, sm: 12 }}>
                        <Difficultyselection />
                    </Grid2>

                </Grid2>
            </Box>
        </div>
    )
}

export default Introbox
