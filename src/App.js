import { useEffect } from 'react'
import {Route } from 'react-router-dom'
import { useHistory } from 'react-router'
import Appointment from "./pages/Appointment";
function App() {

  const history = useHistory()

    useEffect(()=>{
      if(history.location.pathname === "/"){
        const year_no = new Date().getFullYear();
        const month_no = new Date().getMonth();
        history.push(`year/${year_no}/month/${month_no+1}`)
      }
    },[])
  return (
    <div>
      <Route path="/year/:year_no/month/:month_no" component={Appointment}/>
    </div>
  );
}


export default App
