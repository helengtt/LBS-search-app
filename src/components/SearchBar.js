import React, { Component } from 'react';
import './SearchBar.css';
import { debounce } from 'throttle-debounce';

export default class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            text: '',
        }
    }

    // debounce an autocomplete input
    handleTextChange =  async(e) => {
        e.persist();
        const text = e.currentTarget.value;
        await this.props.onSearch(text);
        const suggestions = this.props.results.map(r => r.name);
        console.log("suggestions=", suggestions);
        const filteredSuggestions = suggestions.filter(
            suggestion =>suggestion.toLowerCase().indexOf(text.toLowerCase())
        );

        this.setState({
            activeSuggestion:0,
            filteredSuggestions, 
            showSuggestions:true,
            text: text
        })
    }

    onClick = (e) => {
        this.setState({
            activeSuggestion:0,
            filteredSuggestions:[],
            showSuggestions:false,
            text: e.currentTarget.innerText
        })
    }

    handleKeyPress = (e) => {
        // User pressed the enter key, update the input and close the suggestions
        if (e.key === 'Enter') {
            this.setState({
                activeSuggestion:0,
                showSuggestions:false,
                text:this.state.filteredSuggestions[this.state.activeSuggestion]
            })
        }
        // User pressed the up arrow, decrement the index
        else if (e.key === 'Up') {
            if (this.state.activeSuggestion === 0) {
                return;
            }

            this.setState({activeSuggestion: this.state.activeSuggestion - 1})
        }
        // User pressed the down arrow, increment the index
        else if (e.key === 'Down') {
            if (this.state.activeSuggestion - 1 === this.state.filteredSuggestions.length) {
                return;
            } 

            this.setState({activeSuggestion: this.state.activeSuggestion + 1})
        }
    }

    render() {
        const {
            handleTextChange,
            onClick,
            handleKeyPress,
            state: {
              activeSuggestion,
              filteredSuggestions,
              showSuggestions,
              text
            }
          } = this;
      
        let suggestionsListComponent;

        if (showSuggestions && text) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestion) {
                                className = "suggestion-active"
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            )
                        })}
                    </ul>
                )
            } else {
                suggestionsListComponent = (
                    <div>
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
                    // ref={input => this.search = input}
                    onChange={handleTextChange}
                    onKeyPress={handleKeyPress}
                />
                <div className="search-sub-border"></div>
                {suggestionsListComponent}

            </div>
        )
    }
}
