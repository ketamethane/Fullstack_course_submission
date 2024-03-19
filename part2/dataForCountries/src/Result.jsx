import { useEffect, useState } from "react"
import axios from 'axios'
// const api_key = "2240a3d4d7085c616f20ed6f2953b960"

const api_key = import.meta.env.VITE_SOME_KEY

// variable api_key now has the value set in startup

const Country = ({name, capital, area, languages, flag, latlng}) => {
    console.log('langs:', languages)
    console.log('langs values:', Object.values(languages))
    const [icon, setIcon] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [temp, setTemp] = useState('')

    const lat = latlng[0]
    const lng = latlng[1]

    console.log('api key',api_key)

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
    .then(response => {
      console.log('report', response.data)
      console.log('wind', response.data.wind.speed)
      console.log('icon', response.data.weather[0].icon)
    //     setReport(response)
        setWindSpeed(response.data.wind.speed)
        setTemp(response.data.main.temp)
        setIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
        


    })

    // const windSpeed = report.current.wind_speed
    // const temp = report.current.temp


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
            <h3>
                Weather in {capital}
            </h3>
            <p>temperature {temp} Celcius</p>
            <img src={icon} />
            <p>wind {windSpeed} m/s</p>
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
                latlng={country.capitalInfo.latlng}
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
                latlng={cty.capitalInfo.latlng}
                /> 
            )}
            </div>
        )
    }
    
}

export default Result