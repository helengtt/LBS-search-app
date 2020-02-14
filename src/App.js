import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import Navbar from './components/Navbar'

class App extends Component {
    render () {
        return (
            <div className="container">
                <Navbar />
                <Main />
            </div>
        )
    }
}

export default App