import React, { Component } from 'react';
import './SearchBar.css';
import { debounce } from 'throttle-debounce';

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSuggestion: null,
            filteredSuggestions: [],
            showSuggestions: false,
            searchresults: [],
            text: ''
        }

        this.focusRef= React.createRef();
    }
    autocompleteSearch = () => {
        // console.log('autocompleteSearch() text=', Date.now(), this.state.text)
        this.props.onSearch(this.state.text).then(() => {
            // console.log('autocompleteSearch_then() text=', Date.now(), this.state.text)
            const suggestions = this.props.results.map(r => r.name);
            // console.log("suggestions=", suggestions);
            // Filter our suggestions that don't contain the user's input
            const filteredSuggestions = suggestions.filter(
                suggestion => suggestion.toLowerCase().indexOf(this.state.text.trim().toLowerCase())
            );

            this.setState({
                filteredSuggestions,
                showSuggestions: true
            })
        })
    }
    /* Another way for async */
    // autocompleteSearch = async() => {
    //     console.log('autocompleteSearch() text=', Date.now(), this.state.text)
    //     await this.props.onSearch(this.state.text)
    //     console.log('autocompleteSearch_afterawait() text=', Date.now(), this.state.text)
    //     const suggestions = this.props.results.map(r => r.name)
    //     console.log("suggestions=", suggestions)
    //     const filteredSuggestions = suggestions.filter(
    //         suggestion => suggestion.toLowerCase().indexOf(this.state.text.toLowerCase())
    //     )

    //     this.setState({
    //         filteredSuggestions,
    //         showSuggestions: true
    //     })
    // }
    autocompleteSearchDebounced = debounce(300, this.autocompleteSearch)

    // debounce an autocomplete input
    handleTextChange = (e) => {
        this.setState({ text: e.currentTarget.value}, () => {
            // console.log('handleTextChange() text=', Date.now(), this.state.text)
            this.autocompleteSearchDebounced(this.state.text.trim());
        });
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

    searchKeyPress =(e) => {
        if (e.key === 'Enter') {
            this.setState({
                showSuggestions: false,
                text:e.currentTarget.value                
            })
            if (this.state.filteredSuggestions.length > 2) {
                this.setState({searchresults: this.props.results.map((r,index) => (
                    <li key={r.id}>
                        {r.name}
                    </li>
                ))})
            } else {
                this.setState({searchresults:[]})
            }
        }
        else if (e.key === "ArrowDown") {
            this.setState({activeSuggestion: 0 })
            console.log(this.focusRef.current)
            this.focusRef.current.focus()
        }
    }

    suggestionKeyPress = (e) => {
        // User pressed the down arrow, increment the index
        if (e.key === 'ArrowDown') {
            this.setState({ activeSuggestion: this.state.activeSuggestion + 1 })
            if (this.state.activeSuggestion - 1 === this.state.filteredSuggestions.length) {
                return;
            }
        }
        // User pressed the up arrow, decrement the index
        else if (e.key === 'ArrowUp') {
            if (this.state.activeSuggestion === 0) {
                this.setState({activeSuggestion: null})
                return;
            }

            this.setState({ activeSuggestion: this.state.activeSuggestion - 1 })
        }
        // User pressed the enter key, update the input and close the suggestions
        else if (e.key === 'Enter') {
            this.setState({
                activeSuggestion: null,
                showSuggestions: false,
                text: this.state.filteredSuggestions[this.state.activeSuggestion]
            })           
        }
    }

    render() {
        const {
            handleTextChange,
            onClick,
            searchKeyPress,
            suggestionKeyPress,
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
                    <ul 
                        className="suggestions"
                    >
                        {filteredSuggestions.map((suggestion, index) => {
                            let className, ref;
                            if (index === activeSuggestion) {
                                className = "suggestion-active"
                                ref = this.focusRef
                            }

                            return (
                                <li
                                    className={className}
                                    key={index}
                                    onClick={onClick}
                                    ref={ref}
                                    onKeyDown={suggestionKeyPress}
                                >
                                    {suggestion}
                                </li>
                            )
                        })}
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
                    // ref={input => this.search = input}
                    onChange={handleTextChange}
                    onKeyDown={searchKeyPress}
                />
                <div className="search-sub-border"></div>
                {suggestionsListComponent}
                <ul className='searchresults-list'>
                    {this.state.searchresults}
                </ul>
            </div>
        )
    }
}
