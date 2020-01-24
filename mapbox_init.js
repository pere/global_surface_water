var basins_6_adm_0_layer, gaul_0_simple_layer;

function init_map() {

    // mapboxgl.accessToken = 'pk.eyJ1IjoicGVyaWt1dCIsImEiOiJVNzBjMl9FIn0.38swLsSY2ao8E8rU8FYgyw';
    map = new mapboxgl.Map({
        container: 'map',
        attributionControl: false,
        style: {
            "version": 8,
            "sources": {
                "geoserver": {
                    "type": "vector",
                    "tiles": [
                        "https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=hotspots:gaul_0_simplified&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"
                    ],
                }
            },
            "layers": [{
                "id": "gaul_0_simple",
                "source": "geoserver",
                "source-layer": "gaul_0_simplified",
                "type": "fill",
                'paint': {
                    "fill-color": "#8bc34a",
                    "fill-outline-color": "#6e9090",
                    "fill-opacity": 0.4

                }
            }]
        },
        // style: 'mapbox://styles/mapbox/light-v10',
        //  style: 'mapbox://styles/perikut/ck1xa74kk1c2c1cmtdho498go',
        //style: 'mapbox://styles/v1/perikut/ck1xa74kk1c2c1cmtdho498go',
        center: [-100, 22],
        //    center: [-2, 41],
        //center: [73, 62],
        zoom: 2
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', function() {

        country_popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true,
            //offset: [20, -20]
            offset: {
                'bottom': [0, -20],
                'top': [0, 55],
                'top-left': [0, 0], //[linearOffset, (markerHeight - markerRadius - linearOffset) * -1],
                'top-right': [0, 0], //[-linearOffset, (markerHeight - markerRadius - linearOffset) * -1],

                // 'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                // 'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                //'left': [markerRadius, (markerHeight - markerRadius) * -1],
                //'right': [-markerRadius, (markerHeight - markerRadius) * -1]
            }
        });

        bassins_popup = new mapboxgl.Popup({
            'bottom': [0, -20],
            'top': [0, 55],
            'top-left': [0, 0], //[linearOffset, (markerHeight - markerRadius - linearOffset) * -1],
            'top-right': [0, 0], //[-linearOffset, (markerHeight - markerRadius - linearOffset) * -1],
            closeButton: false,
            closeOnClick: true
        });



        map.addSource("basins_06", {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:adm_0_level_6&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
        });



        map.addSource("gaul1_simple", {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:gaul1_simple&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
        });
        map.addSource("gaul_1", {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:gaul_1&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
        });
        map.addSource("gaul_0_simple", {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:gaul_0_simplified&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
        });



        map.addSource("gaul_0", {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:gaul_0_fixed&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
        });

        map.addSource("gaul_0_simple_lines", {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:gaul_0_simple_lines&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
        });

        map.addSource("basins_5_adm_0", {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:basins_5_adm_0&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
        });

        var layers_correspondence_new = [];

        var basins_5 = {
            "id": "basins_5_adm_0_fill",
            "type": "fill",

            "source": "basins_5_adm_0",
            "source-layer": "basins_5_adm_0",
            // "layout": {
            //     'text-field': '{pfaf_id}',
            //     'text-font': ["Lato Bold"],
            //     'text-size': {
            //         "base": 1,
            //         "stops": [
            //             [12, 12],
            //             [16, 16]
            //         ]
            //     }
            // },
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                "fill-color": "#b183dc",
                //'line-color': "#5a5a5a",
                "fill-outline-color": "#5a5a5a",
                "fill-opacity": 0.1

            }
            // 'filter': ['any', ['==', 'adm_0_code', 204]]

        }

        basins_6_adm_0_layer = {
            "id": "basins_6_adm_0",
            "type": "fill",
            "source": "basins_06",
            "source-layer": "adm_0_level_6",
            'layout': {
                'visibility': 'none'

            },

            'paint': {
                "fill-color": "#ff7f50",
                "fill-outline-color": "#fec46c",
                "fill-opacity": 0.1

            }
            // "layout": {
            //     'text-field': '{pfaf_id}',
            //     'text-font': ["Lato Bold"],
            //     'text-size': {
            //         "base": 1,
            //         "stops": [
            //             [12, 12],
            //             [16, 16]
            //         ]
            //     }
            // },
            // "paint": {
            //     //"fill-color": expression,
            //     "fill-color": '#9cb9ef',
            //     "fill-opacity": 0,
            //     'fill-outline-color': {
            //         "stops": [
            //             [3, '#8a2be2'],
            //             [6, '#8a2be2'],
            //             [8, '#8a2be2']



            //             //  [8, 'rgba(255, 255, 255, 0.1)']
            //         ]
            //     }



            // }
        };
        layers_correspondence_new.push(layer, 'basins_5_adm_0_fill');
        //   layers_correspondence
        //    map.addLayer(layer, 'country-label');

        var layer = {
            "id": "basins_06_lines",
            "type": "line",
            "source": "basins_06",

            "source-layer": "adm_0_level_6",
            'layout': {
                'visibility': 'none'

            },
            'paint': {

                'line-color': "#0aa6ec",
                'line-width': 0.02

            }

        }


        map.addLayer(layer);
        map.addLayer(basins_6_adm_0_layer);

        layers_correspondence_new.push(layer);



        //  map.setLayoutProperty('basins_6_adm_0', "visibility", "none");

        // map.addLayer({
        //     "id": "basins-label",
        //     "type": "symbol",
        //     "source": "basins_06",
        //     "source-layer": "adm_0_level_6",
        //     "layout": {
        //         "text-field": "{pfaf_id}",
        //         "text-font": [

        //             "Arial Unicode MS Bold"
        //         ],
        //         "text-size": 12
        //     }
        // });

        var layer = {
            "id": "gaul1_simple",
            "type": "fill",
            "source": "gaul1_simple",
            "source-layer": "gaul1_simple",
            "minzom": 1,
            'maxzoom': 5,
            'layout': {
                'visibility': 'none'

            },

            'paint': {
                "fill-color": "#ff7f50",
                "fill-outline-color": "#fec46c",
                "fill-opacity": 1

            },

        }

        layers_correspondence_new.push(layer);

        map.addLayer(layer);



        var layer = {
            "id": "gaul_1",
            "type": "fill",
            "source": "gaul_1",
            "source-layer": "gaul_1",
            //  "minzom": 1,
            'minzoom': 5,
            'layout': {
                'visibility': 'none'

            },

            'paint': {
                "fill-color": "#f34606",
                "fill-outline-color": "white",
                "fill-opacity": 1

            },

        }

        map.addLayer(layer);

        layers_correspondence_new.push(layer);

        gaul_0_simple_layer = {
            "id": "gaul_0_simple",
            "type": "fill",
            "source": "gaul_0_simple",
            "source-layer": "gaul_0_simplified",
            // "minzom": 1,
            // 'layout': {
            //     'visibility': 'none'

            // },
            // 'maxzoom': 5,

            'paint': {
                "fill-color": "#0ff",
                "fill-outline-color": "#fec46c",
                "fill-opacity": 0

            }

        }
        map.addLayer(basins_5);
        map.addLayer(gaul_0_simple_layer);


        // map.setLayoutProperty('basins_5_adm_0_fill', "visibility", "visible");




        layers_correspondence_new.push(gaul_0_simple_layer);

        var layer = {
            "id": "gaul_0_fixed",
            "type": "fill",
            "source": "gaul_0",
            //from 6 on, show this
            'minzoom': 5,
            "source-layer": "gaul_0_fixed",
            'layout': {
                'visibility': 'visible'

            },
            'paint': {
                "fill-color": "#b183dc",
                "fill-outline-color": "#fec46c",
                "fill-opacity": 0

            },

        }
        map.addLayer(layer);
        layers_correspondence_new.push(layer);





        map.addLayer({
            "id": "basins_5_adm_0_line",
            "type": "line",
            "source": "basins_5_adm_0",

            "source-layer": "basins_5_adm_0",
            'layout': {
                'visibility': 'none'

            },
            'paint': {

                'line-color': "#b183dc",
                'line-width': 6

            },
            'filter': ['any', ['==', 'adm_0_code', 204]]

        });



        map.addLayer({
            "id": "gaul_0_simple_lines",
            "type": "line",
            "source": "gaul_0_simple_lines",

            "source-layer": "gaul_0_simple_lines",
            'layout': {
                'visibility': 'visible'

            },
            'paint': {

                'line-color': "#e91e63",
                'line-width': 2

            },
            'filter': ['any', ['==', 'adm_0_code', '']]

        });

        // map.addLayer({
        //     "id": "gaul_0_fixed",
        //     "type": "fill",
        //     "source": "gaul_0",
        //     //from 6 on, show this
        //     'minzoom': 5,
        //     "source-layer": "gaul_0_fixed",
        //     'layout': {
        //         'visibility': 'visible'

        //     },
        //     'paint': {
        //         "fill-color": "#b183dc",
        //         "fill-outline-color": "#fec46c",
        //         "fill-opacity": 0

        //     },

        // }, 'country-label');

        // map.addLayer({
        //     "id": "gaul_0_fixed",
        //     "type": "fill",
        //     "source": "gaul_0",
        //     //from 6 on, show this
        //     'minzoom': 5,
        //     "source-layer": "gaul_0_fixed",
        //     'layout': {
        //         'visibility': 'visible'

        //     },
        //     'paint': {
        //         "fill-color": "#b183dc",
        //         "fill-outline-color": "#fec46c",
        //         "fill-opacity": 0

        //     },

        // }, 'country-label');

    });

    var y = 1;

    function loaded() {
        window.clearInterval(window.checkLoaded);
        if (map.getLayer('basins_6_adm_0')) {
            console.log('tiles loaded: ', map.areTilesLoaded());
        }
        if (map.areTilesLoaded()) {

            if (y == 0) {
                console.log('should not be executed, y = ' + y)
                console.log(window.checkLoaded)
                clearInterval(window.checkLoaded);
                debugger;

            }

            console.log('tiles loaded: ', map.areTilesLoaded());

            //  if (y == 0) return false;

            var features = map.querySourceFeatures("basins_06", {
                sourceLayer: 'adm_0_level_6',
                filter: ['any', ['==', 'adm_0_code', 85]]
            });
            console.info(features.length);
            if (features.length == 0) {
                // y = 0;
                console.info(features.length)
                return false;
            } else {
                if (y == 0) {
                    console.log('y == 0')
                        //  y = 0;
                        //   return false;
                } else {
                    console.log('y == 1 should return false')
                    y = 0;
                    var uniques = getUniqueFeatures(features, "pfaf_id");
                    console.info('visualizing ' + uniques.length + ' BASSINS');
                    clearInterval(window.checkLoaded);
                    debugger;

                    //return false;
                }
            }

        }
    }
    //var checkLoaded;
    map.on('sourcedataloading', function(e) {

        // console.log('sourcedataloading');
        //    window.checkLoaded = setInterval(loaded, 2200);


    });

    class MyCustomControl {
        onAdd(map) {
            this.map = map;
            this.container = document.createElement('div');
            this.container.className = 'my-custom-control';
            //this.container.textContent = '<h5>Just a test</h5>';
            return this.container;
        }
        onRemove() {
            this.container.parentNode.removeChild(this.container);
            this.map = undefined;
        }
    }

    var myCustomControl = new MyCustomControl();

    map.addControl(myCustomControl, 'bottom-right');

    $('.my-custom-control').html('<div class="scale"><svg><g></g></svg></div><div class="highcharts_container_bottom">highcharts</div>')
}