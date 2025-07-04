import React from 'react'
import { Route, Routes } from 'react-router'
import Intropage from '../Pages/Intropage'
import Questiondisplaypage from '../Pages/Questiondisplaypage'
import Resultcard from './Resultcard'
import Resultcardtry from './Resultcardtry'
import Result from '../Pages/Result'
import Errorpage from '../Pages/Errorpage'

function MenuComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intropage/>}></Route>
        <Route path="Questions" element={<Questiondisplaypage/>}></Route>
        <Route path="Result" element={<Result />}></Route>
        <Route path="Error" element={<Errorpage />}></Route>
      </Routes>
    </div>
  )
}

export default MenuComponent
