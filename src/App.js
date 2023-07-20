import logo from './logo.svg';
import './App.css';
import MyComponent from './Home';
import Login from './Login';
import Signup from './Signup';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
function App() {
  // /dashboard
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<MyComponent />} /> */}
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
    </div>
  );
}

export default App;
