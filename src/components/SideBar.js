import React, { Component } from 'react';
import './SideBar.css';
import SearchBar from './SearchBar'

export default class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-title">Find your restaurant</div>
                <SearchBar
                    onSearch={this.props.onSearch}
                    results={this.props.results}
                />
            </div>
        )
    }
}
