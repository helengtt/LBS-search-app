import React, { Component } from 'react';
import './SearchBar.css';
import { debounce } from 'throttle-debounce';
import { autoComplete } from '../modules/yelpAutocompleteApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            showSuggestions: false,
            searchresults: [],
            text: ''
        }
    }
    autocompleteSearch = () => {
        // console.log('autocompleteSearch() text=', Date.now(), this.state.text)
        autoComplete(this.state.text)
        .then((terms) => {
            // console.log('autocompleteSearch_then() text=', Date.now(), this.state.text)
            const suggestions = terms.map(term => term.text);
            // console.log("suggestions=", suggestions);

            this.setState({
                suggestions,
                showSuggestions: true
            })
        })
        this.props.onSearch(this.state.text)
    }
    /* Another way for async */
    // autocompleteSearch = async() => {
    //     console.log('autocompleteSearch() text=', Date.now(), this.state.text)
    //     const results = await autoCompleteSearch(this.state.text)
    //     console.log('autocompleteSearch_afterawait() text=', Date.now(), this.state.text)
    //     const suggestions = results.map(r => r.name)
    //     console.log("suggestions=", suggestions)
    //     )

    //     this.setState({
    //         showSuggestions: true
    //     })
    // }
    autocompleteSearchDebounced = debounce(300, this.autocompleteSearch)

    // debounce an autocompleteSearch input
    handleTextChange = (e) => {
        this.setState({ text: e.currentTarget.value}, () => {
            // console.log('handleTextChange() text=', Date.now(), this.state.text)
            this.autocompleteSearchDebounced(this.state.text.trim());
        });
    }

    searchKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                showSuggestions: false             
            })       
            if (this.state.suggestions.length > 2) {               
                this.setState({searchresults: this.props.results.map((r,index) => {
                    // let ratingstar = document.createElement("div"), 
                    //     starfull = <FontAwesomeIcon icon={faStar} className="rating-star"/>, 
                    //     starhalf= <FontAwesomeIcon icon={faStarHalfAlt} className="rating-star"/>,
                    //     lenint = Math.floor(r.rating),
                    //     lendec = r.rating-lenint;
                    // for (let i=0; i<lenint; i++){
                    //     ratingstar.appendChild(starfull)
                    // }
                    // if (lendec !== 0) 
                    //     ratingstar.appendChild(starhalf)
                    
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
                            <div className="searchresult-right">
                                <a href={r.url} className="searchresult-name">
                                    {r.name}
                                </a>
                                {/* {ratingstar} */}
                                <FontAwesomeIcon icon={faStar} className="rating-star"/>
                            </div>
                        </li>
                )})})
            } else {
                this.setState({searchresults:[]})
            }
        }
    }

    onClick = (e) => {
        this.setState({
            suggestions: [],
            showSuggestions: false,
            text: e.currentTarget.innerText
        }, () => {
            this.autocompleteSearchDebounced(this.state.text);
        })
    }

    render() {
        const {
            handleTextChange,
            searchKeyPress,
            onClick,
            state: {
                suggestions,
                showSuggestions,
                searchresults,
                text
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && text) {
            if (suggestions.length) {
                suggestionsListComponent = (
                    <ul 
                        className="suggestions"
                    >
                        {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            )
                        )}
                    </ul>
                )
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestion">
                        <em>No suggestions found</em>
                    </div>
                )
            }
        }

        return (
            <div className="search-bar">
                <input
                    className="search-bar-input"
                    type="text"
                    placeholder="Search and press enter"
                    value={text}
                    onChange={handleTextChange}
                    onKeyDown={searchKeyPress}
                />
                <div className="search-sub-border"></div>
                    {suggestionsListComponent}
                <ul className='searchresults-list'>
                    {searchresults}
                </ul>
            </div>
        )
    }
}
