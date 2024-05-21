import './App.css';
import{ BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './component/Create';
import Read from './component/Read';
import Update from './component/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={ <Create /> }></Route>
        <Route exact path='/read' element={ <Read /> }></Route>
        <Route exact path='/update' element={ <Update /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
