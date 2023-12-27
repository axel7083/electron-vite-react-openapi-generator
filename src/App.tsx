import {useEffect, useState} from 'react'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './App.css'
import { Counter } from '@generated/models/Counter'

function App() {

    const [ counters, setCounters ] = useState<Counter[]>([]);
    const [invalidate, setInvalidate] = useState<boolean>(true);

    useEffect(() => {
      window.api.getCounters().then(setCounters).finally(() => setInvalidate(false));
    }, [invalidate]);

    const increment = (counter: Counter) => {
      window.api.setValue(counter.id, counter.value + 1).finally(() => setInvalidate(true));
    }

    const createCounter = () => {
        window.api.createCounter(0).finally(() => setInvalidate(true));
    }

    return (
    <div className='App'>
      <div className='logo-box'>
        <a href='https://github.com/electron-vite/electron-vite-react' target='_blank'>
          <img src={logoVite} className='logo vite' alt='Electron + Vite logo' />
          <img src={logoElectron} className='logo electron' alt='Electron + Vite logo' />
        </a>
      </div>
      <h1>Electron + Vite + React + openapi-generator</h1>
        <div className="card flex flex-col">
            {
                counters.map((counter) => (
                    <button style={{marginBottom: "8px"}} key={counter.id} onClick={() => increment(counter)}>
                        Counter n°{counter.id} has value {counter.value}
                    </button>
                ))
            }
            <button style={{backgroundColor: '#646cff'}} onClick={() => createCounter()}>
                Create counter
            </button>
        </div>
        <p className="read-the-docs">
            Click on the Electron + Vite logo to learn more
        </p>
        <div className="flex-center">
        Place static files into the<code>/public</code> folder <img style={{ width: '5em' }} src='./node.svg' alt='Node logo' />
      </div>

    </div>
  )
}

export default App