import React, { Component } from 'react';
import './SearchBar.css';
import SearchResults from './SearchResults';
import { debounce } from 'throttle-debounce';
import { autoComplete } from '../modules/yelpAutocompleteApi'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            showSuggestions: false,
            showSearchResults:false,
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

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                showSuggestions: false,
                showSearchResults: true             
            })                  
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

    onClick = (e) => {
        this.setState({
            filteredSuggestions: [],
            showSuggestions: false,
            text: e.currentTarget.innerText
        }, () => {
            this.autocompleteSearchDebounced(this.state.text);
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
                    placeholder="Search and press enter"
                    value={text}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyPress}
                />
                {suggestionsListComponent}
                <SearchResults 
                    results = {this.props.results}
                    showSearchResults = {showSearchResults}
                />
            </div>
        )
    }
}
