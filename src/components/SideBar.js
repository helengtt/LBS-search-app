import React, { Component } from 'react';
import './SideBar.css';
import SearchBar from './SearchBar'
import Suggestions from './Suggestions'

export default class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-title">Location</div>
                <SearchBar
                    onSearch={this.props.onSearch}
                    results={this.props.results}
                />
                <Suggestions results={this.props.results}/>
            </div>
        )
    }
}
