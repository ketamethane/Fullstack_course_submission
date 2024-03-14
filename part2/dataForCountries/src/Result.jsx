import { useEffect, useState } from "react"
import axios from 'axios'


const Country = ({name, capital, area, languages, flag}) => {
    console.log('langs:', languages)
    console.log('langs values:', Object.values(languages))
    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(languages).map((language, index) => (
                    <li key={index}>
                        {language}
                    </li>
                ))}
</ul>

            <img src={flag}></img>
        </div>
    )
}


const Result = ({data, input}) => {
    const filteredResult = data.filter(cty => cty.name.common.toLowerCase().includes(input))
    console.log('result: filtered countries', filteredResult)

    const [show, setShow] = useState(false)
    const [country, setCountry] = useState(false)
    useEffect(() => {
        setShow(false)

    }, [input])

    const viewCountry = (name) => {
        const lowerCaseName = name.toLowerCase()
        console.log('lCName', lowerCaseName)
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${lowerCaseName}`)
        .then(response => {
          console.log(response.data)
          setCountry(response.data)
          setShow(true)
        })
    }

    if (show===true) {

        return(
            <div>
                <Country key={country.name} name={country.name.common} 
                capital={country.capital[0]} area={country.area} 
                languages={country.languages} flag={country.flags.png}
                /> 
            </div>
        )
        }


    if (filteredResult.length > 10 && input!=='') {
        console.log('more than 10 countries')
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if ((filteredResult.length <= 10 && filteredResult.length > 1) && input!=='') {
        console.log('less than 10 countries')
        const list = []
        filteredResult.forEach(cty => list.push(cty.name.common))
        console.log('list', list)
        return (
            <div>
            {list.map((country, index) => (
        <div key={index}>
          <span>{country}</span>
          <button onClick={() => viewCountry(country)}>show</button>
          
        </div>
        ))}
            </div>
        )
    }

    if (filteredResult.length===1 && input!=='' || show===true) {
        
        console.log('found the country!',filteredResult[0])
        return(
            <div>
                {filteredResult.map(cty =>
                <Country key={cty.name} name={cty.name.common} 
                capital={cty.capital[0]} area={cty.area} 
                languages={cty.languages} flag={cty.flags.png}
                /> 
            )}
            </div>
        )
    }
    
}

export default Result