import { Header } from './components/Header';
import { Login } from './components/Login';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AuthProvider from './context/AuthProvider';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import ConfirmationEmail from './components/ConfirmationEmail';
import Diccionary from './components/Diccionary';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Words from './components/Words';
import Media from './components/Media';
import AddSignPattern from './components/AddSignPattern';
import HandSignPractice from './components/HandSignPractice';
import Users from './components/Users';
import Questions from './components/Questions';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/confirmation" element={<ConfirmationEmail />} />
              <Route path="/diccionario" element={<Diccionary />} />
              <Route path="/practice" element={<HandSignPractice />} />
              <Route path="/admin" element={<AdminPanel />} >
                <Route path='words' element={<Words/>} />
                <Route path='media' element={<Media />} />
                <Route path='users' element={<Users />}/>
                <Route path="signs" element={<AddSignPattern />} />
                <Route path='questions' element={<Questions />}/> 
              </Route>
            </Routes>
            <ToastContainer />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
