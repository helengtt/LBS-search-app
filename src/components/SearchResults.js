import React, { Component } from 'react'
import { connect } from 'react-redux'
import './SearchResults.css'
import {mouseEnter, mouseLeave} from '../actions'

class SearchResults extends Component {
    onMouseEnter = (e) => {
        const { dispatch } = this.props

        console.log(dispatch(mouseEnter(e.target.id)))
        return dispatch(mouseEnter(e.target.id))
    }

    onMouseLeave = (e) => {
        const {dispatch} = this.props

        console.log(dispatch(mouseLeave()))
        return dispatch(mouseLeave())
    }

    render() {
        const {results, showSearchResults} = this.props

        let searchresults

        if (showSearchResults) {
            searchresults = results.map((business) => {
                let ratingstar = "",
                    greystar = "",
                    ratingint = Math.floor(business.rating),
                    ratingdec = business.rating-ratingint,
                    ratinggrey = 5 - Math.ceil(business.rating);
                for (let i=0; i<ratingint; i++)
                    ratingstar += "★"
                if (ratingdec !== 0) 
                    ratingstar += "☆"
                for (let i=0; i<ratinggrey; i++)
                    greystar += "★"

                let distance;    
                if (business.distance <1000)
                    distance = Math.round(business.distance) + "m"
                else
                    distance = (business.distance/1000).toFixed(1) + "km"

                const category = business.categories[0].alias.charAt(0).toUpperCase() + business.categories[0].alias.slice(1)    
                return (
                    <li 
                        key={business.id}
                        id={business.id} 
                        className="searchresult"
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    >       
                        <div className="thumbnail">
                            <img 
                                src={business.image_url}
                                alt={business.name}
                            />
                        </div>
                        <div className="searchresult-right" >
                            <a href={business.url} rel="noopener noreferrer" target="_blank" className="name">
                                {business.name}
                            </a>
                            <div>
                                <span> {business.rating.toFixed(1)} </span>
                                <span className="ratingstar"> {ratingstar} </span>
                                <span className="greystar"> {greystar} </span>
                                <span>({business.review_count})</span>
                            </div>
                            <div>
                                <span className="distance"> {distance} </span>
                                <span> {category} </span>
                                {business.price && <span> • {business.price} </span>}

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

export default connect()(SearchResults)