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
import Quiz from './components/Quiz';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/confirmation" element={<ConfirmationEmail />} />
              <Route path="/" element={<Home />} />
              <Route path="/diccionario" element={<Diccionary />} />
              <Route path="/quiz" element={<Quiz />} />
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
