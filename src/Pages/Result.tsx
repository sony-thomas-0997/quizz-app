import { Grid2 } from '@mui/material'
import React from 'react'
import Resultcardtry from '../Components/Resultcard'
import Resultcard from '../Components/Resultcard'
import "./Result.css"
import Questionanswerpublish from '../Components/Questionanswerpublish'
function Result() {
    return (
        <div>
            <Grid2 container className="resultpagebg">
                <Grid2 size={{xs: 12, sm: 12, md: 12} }>
                    <Resultcard />
                </Grid2>
             
              
                </Grid2>
        

        </div>
    )
}

export default Result
