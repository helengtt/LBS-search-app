import React, { Component } from 'react';
import './SearchResults.css';

export default class SearchResults extends Component {
    render() {
        let searchresults;

        if (this.props.showSearchResults) {
            searchresults = this.props.results.map((r) => {
                let ratingstar = "",
                    greystar = "",
                    ratingint = Math.floor(r.rating),
                    ratingdec = r.rating-ratingint,
                    ratinggrey = 5 - Math.ceil(r.rating);
                for (let i=0; i<ratingint; i++)
                    ratingstar += "★"
                if (ratingdec !== 0) 
                    ratingstar += "☆"
                for (let i=0; i<ratinggrey; i++)
                    greystar += "★"

                let distance;    
                if (r.distance <1000)
                    distance = Math.round(r.distance) + "m"
                else
                    distance = (r.distance/1000).toFixed(1) + "km"

                const category = r.categories[0].alias.charAt(0).toUpperCase() + r.categories[0].alias.slice(1)    
                return (
                    <li key={r.id} className="searchresult">       
                        <div className="thumbnail">
                            <img 
                                src={r.image_url}
                                alt={r.name}
                            />
                        </div>
                        <div className="searchresult-right" >
                            <a href={r.url} target="_blank" className="name">
                                {r.name}
                            </a>
                            <div>
                                <span> {r.rating.toFixed(1)} </span>
                                <span className="ratingstar"> {ratingstar} </span>
                                <span className="greystar"> {greystar} </span>
                                <span>({r.review_count})</span>
                            </div>
                            <div>
                                <span className="distance"> {distance} </span>
                                <span> {category} </span>
                                {r.price && <span> • {r.price} </span>}

                            </div>
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