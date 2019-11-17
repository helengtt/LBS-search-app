import React, { Component } from 'react';
import './App.css';
import SideBar from './components/SideBar'
import Map from './components/Map'
import {searchBusiness} from './modules/yelpApi'

const INITIAL_VIEWPORT = {
  center: [-33.872961, 151.208452],
  zoom: 17,

}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      mapCenter: {
        lat: INITIAL_VIEWPORT.center[0],
        lng: INITIAL_VIEWPORT.center[1],
      },
      searchStr: '',
    }
  }
  
  /* Test with mock API */
  // resolveSoon = (x) => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve([x]);
  //     }, 2000);
  //   });
  // }

  // searchBusiness = (searchStr, meh) =>
  //   this.resolveSoon(searchStr);

  handleSearch = async (searchStr) => {
    console.log('handleSearch() searchStr=', Date.now(), searchStr)    
    return searchBusiness(searchStr, this.state.mapCenter)
      .then((data) => {
        console.log('handleSearch() searchStr=', Date.now(), searchStr)            
        console.log('data=', data)
        this.setState({ results: data, searchStr: searchStr })
      })
    /* Another way for async */    
    // console.log('handleSearch() searchStr=', Date.now(), searchStr)  
    // const results = await searchBusiness(searchStr, this.state.mapCenter)
    // console.log('handleSearch() searchStr=', Date.now(), searchStr)  
    // this.setState({ results, searchStr })
    // console.log('this.state.results=', this.state.results)
  }

  handlePanSearch = async () => {
    if (!this.state.searchStr || this.state.searchStr.length < 3) {
      return
    }

    this.handleSearch(this.state.searchStr)
  }

  handleViewportChange = (viewport) => {
    this.setState({
      mapCenter: {
        lat: viewport.center[0],
        lng: viewport.center[1],
      },
    })

    if (viewport.zoom > 14) this.handlePanSearch()
  }

  render() {
    return (
      <div className="container">
        <SideBar
          onSearch={this.handleSearch}
          results={this.state.results}
        />
        <Map
          initialViewport={INITIAL_VIEWPORT}
          results={this.state.results}
          onViewportChanged={this.handleViewportChange}
        />
      </div>
    );
  }
}

export default App;
