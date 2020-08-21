import React, {Component} from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {MapPin} from '../../helpers/svgIcons';

const pin = L.icon({
    iconUrl: MapPin,
    iconSize: [30, 45],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
});

class ItemMap extends Component {
    state = {
        lat: this.props.address.latitude,
        lng: this.props.address.longitude,
        zoom: 7,
      }
    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map 
            className="h-64 w-full m-auto rounded mt-10" 
            center={position} 
            zoom={this.state.zoom}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={pin}>
                    <Popup>
                        <div className="text-xl">
                            {this.props.address.city},
                            {this.props.address.state.name}, <br/>
                            {this.props.address.state.country.name}
                        </div>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

export default ItemMap
