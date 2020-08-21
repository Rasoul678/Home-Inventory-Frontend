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

class AddressMap extends Component {
    state = {
        lat: '33.650',
        lng: '53.437',
        zoom: 4,
      }
    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map 
            oncontextmenu={(e) => {
                console.log(e);
                this.props.setLatLng(e.latlng);
                this.setState({
                    ...this.state,
                    zoom:13,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                });
            }} 
            className="h-64 w-full m-auto rounded border-2 mt-10 border-gray-700" 
            center={position} 
            zoom={this.state.zoom}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={pin}>
                    <Popup>
                        <div className="text-xl">
                            New Address
                        </div>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

export default AddressMap
