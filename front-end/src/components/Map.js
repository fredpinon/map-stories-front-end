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

  componentWillReceiveProps (nextProps) {
    if (
      this.map.getSource('markers')
      && nextProps.markers !== this.props.markers
    ) {
      this.map
      .getSource('markers')
      .setData(this.createGeoJson(nextProps.markers));
      if(nextProps.markers && nextProps.markers[0] && nextProps.markers[0].lng) {
        console.log(nextProps.markers[0]);
        this.flyToCoordinates(nextProps.markers[0]);
      }
    }
  }

  componentDidMount () {
    const center =
      this.props.markers
      && this.props.markers.length > 0
      && this.props.markers[0].lng !== undefined
      ? [this.props.markers[0].lng, this.props.markers[0].lat]
      : [2.15, 41.36];

    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYWNvbGxpbnM4NSIsImEiOiJjajhnMGZwYzMwOHBxMnhxajd0aWppbWE5In0.i6PUo_ai7q6NeIWBFPtGKA';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center,
      zoom: 9
    });
    this.map.doubleClickZoom.disable();
    this.map.on('load', (e) => {
      this.map.addSource('markers', {
        type: 'geojson',
        data: this.createGeoJson(this.props.markers)
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

      if (this.props.editor) {
        this.mapExtras();
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

  flyToCoordinates = (coords) => {
    this.map.flyTo({
      center: [
        coords.lng,
        coords.lat
      ]
    })
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
