import React from 'react'
import Timercouter from '../Components/Timercouter'
import Questionbox from '../Components/Questionbox'
import { Grid2 } from '@mui/material'
import "./Questiondisplaypage.css"
import { useSelector } from 'react-redux'

function Questiondisplaypage() {

  let difficultylevelinstore = useSelector((state: any) => {
    return state.difficultyValueOfQuestion
  })

  const { current_minute, current_second } = useSelector((state: any) => {
    return state.currenttimeusedtostyle
  })


  return (
    <div className='pagebg'>
      <div className={current_minute === 0 && current_second <= 40 && current_second > 20 ? "currenttimewarning" : ""}>
      <div className={current_minute === 0 && current_second <= 20 ? "currenttimedanger" : ""}>
        <Grid2 container key={difficultylevelinstore}>
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Timercouter />
          </Grid2>

        </Grid2>
        <Grid2 container >
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
            <Questionbox key={difficultylevelinstore} />
          </Grid2>
        </Grid2>
      </div>
    </div>
    </div>
  )
}

export default Questiondisplaypage
