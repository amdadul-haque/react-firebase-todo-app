import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import CreateTodo from './components/CreateTodo/CreateTodo';
import Home from './components/Home/Home';
import MainTodo from './components/MainTodo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<CreateTodo />} />
      </Routes>
    </Router>
    // <Home />
  );
}

export default App;
