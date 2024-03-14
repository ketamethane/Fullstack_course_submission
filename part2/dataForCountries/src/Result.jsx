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

const CountryInList = ({name}) => {
    return (
            {name}
    )
}

const Result = ({data, input}) => {
    const filteredResult = data.filter(cty => cty.name.common.toLowerCase().includes(input))
    console.log('result: filtered countries', filteredResult)

    if (filteredResult.length > 10 && input!=='') {
        console.log('more than 10 countries')
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if ((filteredResult.length <= 10 && filteredResult.length > 1) && input!=='') {
        console.log('less than 10 countries')
        return (
            <div>
            {filteredResult.map(cty => 
                <CountryInList key={cty.name.common} name={cty.name.common}></CountryInList>
            )}
            </div>
        )
    }

    if (filteredResult.length===1 && input!=='') {
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