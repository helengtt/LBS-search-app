import React from 'react';
import './Suggestions.css'

const Suggestions = (props) => {
    const options = props.results.map(r => (
        <li key={r.id}>
            {r.name}
        </li>
    ))
    return <ul className='suggestion-list'>{options}</ul>
}

export default Suggestions