import logo from './logo.svg';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import Navbar from './components/Navbar';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <div className="App">
    <Navbar/>
     <MainRoutes/>
  
    </div>
  );
}

export default App;
