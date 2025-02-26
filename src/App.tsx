import React from 'react';
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext';
import GetData from '../components/GetApiData'
import './App.css'

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use dark mode from context

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 transition-all duration-100'
      }`}
    >
      <div className="flex justify-center items-center h-full p-4 overflow-auto transition-all duration-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 transition-all duration-300">Rick and Morty API</h1>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-md mb-4 transition-all duration-200 ${
              isDarkMode ? 'bg-emerald-600  text-white' : 'bg-green-500 text-gray-900'
            } text-white`}
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>

          {/* GetData Component to fetch and display characters */}
          <GetData />
        </div>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <DarkModeToggle />
    </DarkModeProvider>
  );
}

export default App;

/*function GetData(){
  const[apiData, setapiData]= useState(null);
    useEffect(()=>{
      const fetchData = async () =>{
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const result =await response.json();
        setapiData(result);
      };
      fetchData();
    },[]);

    if (!apiData || !apiData.results) {
      return <div>No data available</div>; 
    }

    return(
      <div>
        <h1 className ="text-2xl font-bold mb-4">Characters</h1>
        <ul className="block space-y-4">
          {apiData.results.map((character)=>(
            <li key = {character.id} className ="mb-4">
              name : {character.name} species : {character.species} origin : {character.origin.name}</li>
          ))}
        </ul>
      </div>
    );
  }
export default GetData;  */

/*function App() {
  const [count, setCount] = useState(0)
    async function getEl(){
      try {
        const response = await
        fetch('https://rickandmortyapi.com/api');
        if(response.ok){
          const data = await response.json();
          console.log(data);
        }else {

          throw new Error('failed');
        }
      }
      catch(error){
        console.log('Error:', error);
      }
    }
    getEl();

    return(  
      <div>
        <h1>Fetched Data</h1>
      </div>  
    );
  }
  export default App  */ 