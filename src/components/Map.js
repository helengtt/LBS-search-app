import React, { Component } from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import './Map.css'
import Marker from './Marker.js'

const MAP_BOX_API_KEY = 'pk.eyJ1IjoiaGVsZW5ndHQiLCJhIjoiY2pzZ3FlMHcxMTVxYTQzbnNoejR1bG1sdyJ9.oKBUY-fs0opIeFgE5KbAnQ'

export default class Map extends Component {
    
    mapRef = React.createRef()
    render() {
        const {results, onViewportChanged, initialViewport} = this.props

        return (
            <LeafletMap
                className="leaflet-map"
                viewport={initialViewport}
                ref={this.mapRef}
                zoomControl={false}
                animate
                onViewportChanged={onViewportChanged}
            >
                <TileLayer 
                    id="streets-v11"
                    tileSize={512}
                    zoomOffset={-1}
                    url={`https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=${MAP_BOX_API_KEY}`}
                />
                {results.map(business => (
                    <Marker 
                        key={business.id}
                        id={business.id} 
                        business={business}
                    />
                ))}
            </LeafletMap>
        )
    }
}

