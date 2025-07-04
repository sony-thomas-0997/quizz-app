import { Button, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import "./Errorcomponent.css"
function Errorcomponent() {
  const qstn_loading_error_navigate = useNavigate()
  const qstn_lodng_err_msg_frm_prev_page = useLocation().state
  const backtohome = () => {
    qstn_loading_error_navigate("/")
  }

  return (
    <div>
      <div className='errordiv'>
      <Typography variant='h6' className='errormsgtext'> Sorry! {qstn_lodng_err_msg_frm_prev_page?qstn_lodng_err_msg_frm_prev_page:"invalid url"} </Typography> 
        <Button onClick={backtohome} variant='contained' className='home_btn_style' > Back To  Home </Button>
      </div>

    </div>
  )
}

export default Errorcomponent
