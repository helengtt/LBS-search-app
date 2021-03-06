import React, { Component } from 'react';
import './Main.css';
import SideBar from './components/SideBar'
import Map from './components/Map'
import {searchBusiness} from './modules/yelpBusinessApi'

class Main extends Component {  
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      mapCenter: {
        lat: -33.872961,
        lng: 151.208452,
      },
      zoom: 17,
      searchStr: '',
    }

  }

  // geolocation
  componentDidMount = () => {

    let appstate = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          appstate.setState({
            mapCenter: {lat,lng}
          })
        }
      )
    }
 
  }

  /* Test with mock API */
  // resolveSoon = (x) => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {resolve([x]);}, 2000);
  //   });
  // }

  // searchBusiness = (searchStr, meh) =>
  //   this.resolveSoon(searchStr);

  handleSearch = async (searchStr) => {
    // console.log('handleSearch() searchStr=', Date.now(), searchStr)  
    const results = await searchBusiness(searchStr, this.state.mapCenter)
    // console.log('handleSearch() searchStr=', Date.now(), searchStr)  
    this.setState({ results, searchStr })
    console.log('this.state.results=', this.state.results)
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
      zoom: viewport.zoom
    })

    if (viewport.zoom > 14) this.handlePanSearch()
  }

  render() {
    const {mapCenter, zoom} = this.state
    const INITIAL_VIEWPORT = {
      center: [mapCenter.lat, mapCenter.lng],
      zoom,
    }
    return (
      <div className="main">
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

export default Main;
