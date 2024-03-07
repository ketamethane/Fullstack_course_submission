const PersonForm = ({onSubmit, name, nameHandle, num, numHandle}) => {
    return (
        <form onSubmit={onSubmit}>
        <div>
          name: <input value={name}
          onChange={nameHandle}
          />
        </div>
        <div>
        number: <input value={num}
          onChange={numHandle}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm