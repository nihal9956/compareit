import { useState } from 'react'
import Dashboard from './Dashboard/Dashboard'
import { Grid } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid sx={{fontFamily:'poppins'}}>
    <Dashboard/>
    </Grid>
  )
}

export default App
