import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

class Map extends Component {

  constructor (props) {
    super(props);
    this.state = {
      coordinates: {}
    };
  }

  createGeoJson(points = []){
    return {
      type: "FeatureCollection",
      features: points.map(point => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [
            point.lng,
            point.lat,
          ]
        }
      }))
    }
  }

  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYWNvbGxpbnM4NSIsImEiOiJjajhnMGZwYzMwOHBxMnhxajd0aWppbWE5In0.i6PUo_ai7q6NeIWBFPtGKA';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center: [2.15, 41.36],
      zoom: 9
    });
    this.map.doubleClickZoom.disable();
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });
    this.map.addControl(geocoder, 'top-right');
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    this.map.on('load', (e) => {
      console.log('loaded');
      this.map.addSource('markers', {
        type: 'geojson',
        data: this.createGeoJson()
      });
      this.map.addLayer({
        id: 'carina',
        type: 'circle',
        paint: {
          'circle-radius': 8,
          'circle-color': 'purple'
        },
        source: 'markers',
      });

      this.map.on('click', (e) => {
        console.log('clicked');
        this.map.getSource('markers').setData(this.createGeoJson([{
          lng: e.lngLat.lng,
          lat: e.lngLat.lat
        }]));
        console.log(this.createGeoJson([{
          lng: e.lngLat.lng,
          lat: e.lngLat.lat
        }]));
      })
    });
  }

  render () {
    return (
      <div className="Map">
        <div id="map"></div>
      </div>
    )
  }
}

export default Map;
