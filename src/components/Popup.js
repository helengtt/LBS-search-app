import React, {Component} from 'react'
import {Popup as LeafletPopup} from 'react-leaflet'
import './Popup.css'

export default class Popup extends Component {
    render() {
        const {business} = this.props
        return (
            <LeafletPopup
                closeButton={false} 
                autoPan={false}
            >
                <a 
                    className="popup-tile"
                    href={business.url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {business.name}
                </a>
                {business.image_url &&
                        <div className="popup-thumbnail">
                            <img 
                                src={business.image_url}
                                alt={business.name}
                            />
                        </div>
                }
            </LeafletPopup>
        )
    }
}