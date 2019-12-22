import React, {Component} from 'react'
import { connect } from 'react-redux'
import Leaflet from 'leaflet'
import {Marker as LeafletMarker} from 'react-leaflet'
import mapIcon from '../svg/map.svg' 
import Popup from './Popup'
import './Marker.css'

class Marker extends Component {

    onMouseOver = (e) => e.target.openPopup()
    onMouseOut = (e) => e.target.closePopup()

    render () {
        const {business, isHover} = this.props
        return (
            <LeafletMarker
                position={{
                    lat: business.coordinates.latitude,
                    lng: business.coordinates.longitude,
                }}
                riseOnHover
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                icon={(isHover) ? new Leaflet.Icon({
                    iconUrl: mapIcon,
                    iconSize: [40,70],
                    popupAnchor:[0, -35],
                }) : new Leaflet.Icon({
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

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps.id, state)
    return ({     
        isHover: ownProps.id === state.mouseHover.resultId
    })
}

export default connect(mapStateToProps)(Marker)
