import React, { Component } from 'react';
import './SearchBar.css';
import SearchResults from './SearchResults';
import { debounce } from 'throttle-debounce';
import { autoComplete } from '../modules/yelpAutocompleteApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            showSuggestions: false,
            showSearchResults:false,
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

    autocompleteSearchDebounced = debounce(300, this.autocompleteSearch)

    // debounce an autocompleteSearch input
    handleTextChange = (e) => {
        this.setState({ text: e.currentTarget.value}, () => {
            // console.log('handleTextChange() text=', Date.now(), this.state.text)
            this.autocompleteSearchDebounced(this.state.text.trim());
        });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                showSuggestions: false,
                showSearchResults: true             
            })                  
        }
    }

    onClick = (e) => {
        this.props.onSearch(e.currentTarget.innerText);
        this.setState({
            suggestions: [],
            showSuggestions: false,
            showSearchResults:true,
            text: e.currentTarget.innerText
        })
    }

    render() {
        const {
            handleTextChange,
            handleKeyPress,
            onClick,
            state: {
                suggestions,
                showSuggestions,
                showSearchResults,
                text
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && text) {
            if (suggestions.length) {
                suggestionsListComponent = (
                    <ul 
                        className="suggestions"
                        ref={this.focusRef}
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
                    placeholder="Restaurants, shops, services ..."
                    value={text}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyPress}
                />
                <FontAwesomeIcon className="search-bar-icon" icon={faSearch}></FontAwesomeIcon>
                {suggestionsListComponent}
                <SearchResults 
                    results = {this.props.results}
                    showSearchResults = {showSearchResults}
                />
            </div>
        )
    }
}
