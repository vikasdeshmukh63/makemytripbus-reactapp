import './App.css';
import "./resources/global.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Home from "./pages/Home";
import Public from './components/Public';
import Protected from './components/Protected';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminBookings from "./pages/Admin/AdminBookings";
import BookNow from './pages/BookNow';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';

function App() {

  const {loading} = useSelector(state=>state.alerts);
  return (
    <div>
      {loading && <Loader/>}
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Protected><Home/></Protected>}/>
      <Route path="/admin/buses" element ={<Protected><AdminBuses/></Protected>}/>
      <Route path="/admin/users" element ={<Protected><AdminUsers/></Protected>}/>
      <Route path="/admin/bookings" element ={<Protected><AdminBookings/></Protected>}/>
      <Route path="/bookings" element ={<Protected><Bookings/></Protected>}/>
      <Route path="/booknow/:id" element ={<Protected><BookNow/></Protected>}/>
      <Route path="/profile" element ={<Protected><Profile/></Protected>}/>
      <Route path="/register" element ={<Public><Register/></Public>}/>
      <Route path="/login" element ={<Public><Login/></Public>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
