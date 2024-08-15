
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './Components/SignIn';

import HomePage from './Components/HomePage';
import ResponsiveAppBar from './Components/SecondHomePage';
import Register from './Components/Registration';
import WhyUs from './Components/Whyus';
import Confirm from './Components/Confirm';
import Categories from './Components/Categories';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Explore from './Components/Explore';
import BookBike from './Components/BookBike';
import NewCategories from './Components/NewCategories';
import BikeExplore from './Components/BikeExplore';
import CarBook from './Components/CarBook';
import CarExplore from './Components/CarExplore';
import MapComponent from './Components/Map';
import Chat from './Components/Chat';
import BicycleExplore from './Components/BicycleExplore';
import BicycleBook from './Components/BicycleBook';
import Profile from './Components/ProfilePage';
import { UserProvider } from './Components/UserContext';

function App() {
  return (
    <GoogleOAuthProvider clientId="591707316014-p189a7264gm7kt5550353fpr59gi4lfo.apps.googleusercontent.com">

<UserProvider>

    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/si' element={<SignIn/>}></Route>
        <Route path='/ho'element={<ResponsiveAppBar/>}></Route>
        <Route path='/re'element={<Register/>}></Route>
        <Route path='/wh'element={<WhyUs/>}></Route>
        <Route path='/co'element={<Confirm/>}></Route>
        <Route path='/ca'element={<Categories/>}></Route>
        <Route path='/ex'element={<Explore/>}></Route>
        <Route path='/bb'element={<BookBike/>}></Route>
        <Route path='/nc'element={<NewCategories/>}></Route>
        <Route path='/be'element={<BikeExplore/>}></Route>
        <Route path='/cb'element={<CarBook/>}></Route>
        <Route path='/ce'element={<CarExplore/>}></Route>
        <Route path='/bie'element={<BicycleExplore/>}></Route>
        <Route path='/bibo'element={<BicycleBook/>}></Route>
        <Route path='/pp'element={<Profile/>}></Route>
      </Routes>
      </BrowserRouter>
      {/* <MapComponent/> */}
      <Chat/>
    </div>
</UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;


