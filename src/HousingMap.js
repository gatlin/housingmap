import React from 'react';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import './HousingMap.css';
import coords from './coords';

class HousingMap extends React.Component {
    state = {
        lat:  30.2711286,
        lng: -97.7436995,
        zoom: 11,
        height: 0
    };

    updateDimensions = () => {
        const height = window.innerHeight;
        this.setState({ height });
    };

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div id='map-wrapper' style={{height: this.state.height}}>
              <Map
                center={position}
                zoom={this.state.zoom}
                >
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                {
                      coords.map(positions => (
                          <Polygon
                            color='black'
                            positions={positions}/>
                      ))
                }
              </Map>
            </div>
        );
    }
};

export { HousingMap };
