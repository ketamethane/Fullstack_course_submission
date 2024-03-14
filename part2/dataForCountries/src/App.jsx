import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Result from './Result'

const App = () => {
  const [name, setName] = useState('')
  const [result, setResult] = useState([])


  /// need a one time pulling of data
  useEffect(() => {
    console.log('filter:', name)

    

    // skip if currency is not defined
    if (name !== '') {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
        .then(response => {
          console.log(response.data)
          setResult(response.data)
        })
        /// search all. retrieve all. if i can filter out 1 country based on common name, 
        /// then I will retrieve the remaining data
        /// check what data is retrieved.
        /// 3 cases: more than 10, less than 10, 1 only
        /// use Result component to render the 3 cases

    }
  }, [name])

  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }

  return (
    <div>
      <Filter value={name} onChange={handleFilterChange}/>
      <Result data={result} input={name}></Result>
      {/* <pre>
        {JSON.stringify(rates, null, 2)}
      </pre> */}
    </div>
  )
}

export default App