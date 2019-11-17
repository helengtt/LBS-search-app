import React, {Component} from 'react'
import Leaflet from 'leaflet'
import {Marker as LeafletMarker} from 'react-leaflet'
import mapIcon from '../svg/map.svg' 
import Popup from './Popup'
import './Marker.css'

export default class Marker extends Component {
    render () {
        const {business} = this.props
        return (
            <LeafletMarker
                position={{
                    lat: business.coordinates.latitude,
                    lng: business.coordinates.longitude,
                }}
                riseOnHover
                icon={new Leaflet.Icon({
                    iconUrl: mapIcon,
                    iconSize: [25,55],
                    popupAnchor:[0, -35],
                })}
            >
                <Popup business={business} />
            </LeafletMarker>
        )
    }
}