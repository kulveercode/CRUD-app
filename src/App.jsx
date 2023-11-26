import React from 'react';
import{ BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
    
      <Route exact path='/' element={ <Create/> }></Route>
      <Route exact path='/read' element={ <Read/> }></Route>
    </Routes>
    </BrowserRouter>
  )
}
