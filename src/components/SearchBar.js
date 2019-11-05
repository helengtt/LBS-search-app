import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: '',
        }
    }

    handleTextChange = (event) => {
        this.setState({ text: event.target.value })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter' && this.state.text.length > 2) {
            console.log (this.state.text)
            this.props.onSearch(this.state.text);
        }
    }

    render() {
        return (
            <div className="search-bar">
                <input 
                    className="search-bar-input"
                    placeholder="Search and press enter"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    onKeyPress={this.handleKeyPress}
                />
            </div>
        )
    }
}
