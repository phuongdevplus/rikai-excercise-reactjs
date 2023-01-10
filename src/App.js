import './App.css';
import { AppProvider } from './context/AppContext';
import RouterApp from './routers';
function App() {
  return (
    <AppProvider>
      <RouterApp>
      </RouterApp>
    </AppProvider>
  )
}

export default App;
