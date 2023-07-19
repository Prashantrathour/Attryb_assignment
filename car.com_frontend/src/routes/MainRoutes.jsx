import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/UserRegsiterPage'

import Login from '../pages/UserLoginPage'
import AllInventoryPage from '../pages/InventoryPage'
import AddInventoryPage from '../pages/AddinventoryPage'

function MainRoutes() {
  return (
   <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/addinventory' element={<AddInventoryPage/>}/>
    <Route path='/' element={<AllInventoryPage/>}/>
   </Routes>
  )
}

export default MainRoutes