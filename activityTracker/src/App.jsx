import { Outlet } from 'react-router-dom'
import RootLayout from './Utils/Toaster'

function App() {
  return(
  <RootLayout>
      <Outlet/>
    </RootLayout>
  )
}

export default App
