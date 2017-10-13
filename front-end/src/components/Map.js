import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

class Map extends Component {

  createGeoJson (points = []) {
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

  mapExtras() {
    console.log("its happening");
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
    if (this.props.editorPage) this.mapExtras();
    this.map.on('load', (e) => {
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

      if (!this.props.markers || this.props.markers.length===0) {
        this.map.on('click', (e) => {
          const point = {
            lng: e.lngLat.lng,
            lat: e.lngLat.lat
          };
          this.map.getSource('markers').setData(this.createGeoJson([point]));
          console.log('we show marker editor puts on map with coords ->', point);
          this.props.onMarkerAdded(point);
        })
      } else {
        this.map.getSource('markers').setData(this.createGeoJson(this.props.markers));
        console.log('we show from EditorPage markers with coords ->', this.props.markers);
      }
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
