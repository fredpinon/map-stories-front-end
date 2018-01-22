import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

class Map extends Component {

  createGeoJson (point = {}) {
    return {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [
            point.lng,
            point.lat,
          ]
        }
      }]
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
      this.map.getSource('marker')
      && nextProps.marker !== this.props.marker
    ) {
      this.map
      .getSource('marker')
      .setData(this.createGeoJson(nextProps.marker));
      if (nextProps.marker && nextProps.marker.lng && nextProps.marker.lat) {
        this.flyToCoordinates(nextProps.marker);
      }
    }
  }

  componentDidMount () {
    const center =
      this.props.marker
      && this.props.marker.lng !== undefined
      && this.props.marker.lat !== undefined
      ? [this.props.marker.lng, this.props.marker.lat]
      : [2.15, 41.36];

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fyc3RlbjY5IiwiYSI6ImNqY2x4b2s5dTBidWsyem4wazkyejF3ZW4ifQ.8S-nsS9Dwl0kbL1y1zcOzw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center: center,
      zoom: 10
    });

    this.map.doubleClickZoom.disable();

    this.map.on('load', (e) => {
      this.map.addSource('marker', {
        type: 'geojson',
        data: this.createGeoJson(this.props.marker)
      });

      this.map.addLayer({
        id: 'purpleCircle',
        type: 'circle',
        paint: {
          'circle-radius': 8,
          'circle-color': 'purple'
        },
        source: 'marker',
      });

      if (this.props.editor) {
        this.mapExtras();
        this.map.on('click', (e) => {
          const point = {
            lng: e.lngLat.lng,
            lat: e.lngLat.lat
          };
          this.map.getSource('marker').setData(this.createGeoJson(point));
          this.props.onMarkerAdded(point);
        })
      } else this.map.getSource('marker').setData(this.createGeoJson(this.props.marker));
    }
  );
  }

  flyToCoordinates = (coords) => {
    this.map.flyTo({
      center: [
        coords.lng,
        coords.lat
      ],
      curve: 1.42,
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
