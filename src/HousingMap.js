import React from 'react';
import {
    Map,
    TileLayer,
    Marker,
    Popup,
    Polygon,
    LayersControl,
    FeatureGroup,
    GeoJSON
} from 'react-leaflet';

import './HousingMap.css';
import coords from './coords';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import * as data from './austindistricts.json';
import * as alcohol from './no_public_consumption.json';
const { BaseLayer, Overlay } = LayersControl;
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
        console.log('data', data);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    renderDots = coords => (
        coords.map((positions, idx) => (
            <Polygon
              key={'pos-'+idx}
              color='black'
              positions={positions}/>
        ))
    );

    onEachDistrict = (feature, layer) => {
        console.log('layer', layer);
        layer.bindPopup(`District ${feature.properties.council_district}`);
        return;
    };

    districtStyle = feature => {
        const colors = [
            "#e41a1c",
            "#377eb8",
            "#4daf4a",
            "#984ea3",
            "#ff7f00",
            "#ffff33",
            "#a65628",
            "#f781bf",
            "#999999"
        ];
        console.log('[style]', feature.properties.council_district);
        return {
            color: colors[(feature.properties.council_district-1)]
        };
    };

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div id='map-wrapper' style={{height: this.state.height}}>
              <Map
                center={position}
                zoom={this.state.zoom}
                >
                <LayersControl position='topright' >
                  <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  <Overlay checked name="Austin Districts">
                    <GeoJSON
                      opacity={0.45}
                      data={data} color='purple'
                      style={this.districtStyle}
                      onEachFeature={this.onEachDistrict}
                      />
                  </Overlay>
                  <Overlay name='No Public Drinking'>
                    <GeoJSON
                      opacity={0.7}
                      data={alcohol} color='red'
                      />
                  </Overlay>
                </LayersControl>
              </Map>
            </div>
        );
    }
};

export { HousingMap };
