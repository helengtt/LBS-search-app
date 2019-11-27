import React, { Component } from 'react';
import './SearchResults.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.starRef = React.createRef();
    }
    render() {
        let searchresults;

        if (this.props.showSearchResults) {
            searchresults = this.props.results.map((r) => {
                let starnode = this.starRef.current,
                    starfull = <FontAwesomeIcon icon={faStar} className="rating-star"/>, 
                    starhalf= <FontAwesomeIcon icon={faStarHalfAlt} className="rating-star"/>,
                    lenint = Math.floor(r.rating),
                    lendec = r.rating-lenint;
                console.log(starnode)
                for (let i=0; i<lenint; i++){
                    starnode.appendChild(starfull)
                }
                if (lendec !== 0) 
                    starnode.appendChild(starhalf)
            return (
                <li key={r.id} className="searchresult">
                    {r.image_url &&
                        <div className="searchresult-thumbnail">
                            <img 
                                src={r.image_url}
                                alt={r.name}
                            />
                        </div>
                    }
                    <div className="searchresult-right" ref={this.starRef}>
                        <a href={r.url} className="searchresult-name">
                            {r.name}
                        </a>
                        <div className="ratingstar"></div>
                        {/* <FontAwesomeIcon icon={faStar} className="rating-star"/> */}
                    </div>
                </li>
            )})
        }

        return (
            <ul className='searchresults-list'>
                {searchresults}
            </ul>
        )
    }
}