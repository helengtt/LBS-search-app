import React, {Component} from 'react'
import {Popup as LeafletPopup} from 'react-leaflet'
import './Popup.css'

export default class Popup extends Component {
    render() {
        const {business} = this.props;
        let ratingstar = "",
            greystar = "",
            ratingint = Math.floor(business.rating),
            ratingdec = business.rating-ratingint,
            ratinggrey = 5 - Math.ceil(business.rating);
        for (let i=0; i<ratingint; i++)
            ratingstar += "★"
        if (ratingdec !== 0) 
            ratingstar += "☆"
        for (let i=0; i<ratinggrey; i++)
            greystar += "★"

        const category = business.categories[0].alias.charAt(0).toUpperCase() + business.categories[0].alias.slice(1);    
        
        return (
            <LeafletPopup
                closeButton={false} 
                autoPan={false}
            >
                <a 
                    className="popup-title"
                    href={business.url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {business.name}
                </a>
                {business.image_url &&
                        <div className="popup-thumbnail">
                            <a  
                                href={business.url}
                                rel="noopener noreferrer" 
                                target="_blank"
                            >
                                <img 
                                    src={business.image_url}
                                    alt={business.name}
                                />
                            </a>
                        </div>
                }
                <div className="popup-price">
                    {business.price}
                </div>
                <div className="popup-ratings">
                    <span className="ratingstar"> {ratingstar} </span>
                    <span className="greystar"> {greystar} </span>
                    <span>({business.review_count})</span>
                </div>
                <div>{category}</div>
                <div className="popup-phone"> {business.display_phone} </div>
            </LeafletPopup>
        )
    }
}