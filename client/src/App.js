import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';
import axios from 'axios';

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('messenger-token');
  config.headers['x-access-token'] = token;

  return config;
});

function App() {
  return (
    <div className="App" id="app">
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
