

var options = {};
var app = {};
var selects = {};
// selects.avg_layer = data_layer;
// selects.avg_type = target.attr('data-avg');
var adm_code;
var clicked = false;
selects.avg_type = 'avg_permanent';
selects.avg_layer = 'basins_6';
// var elem = document.querySelector('.sidenav');
// var instance = new M.Sidenav(elem);
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = new M.Collapsible(collapsibleElem, options);
$(document).ready(function () {

    // var $toastContent = $('<span>Goal has been added</span>')
    // M.toast({ html: $toastContent })//, 300, 'goal_toast black'});

    $("#sidenav-overlay").unbind('click');
    //$('#map').css('top', $('nav').height() + 'px');

    $('#slide-out').sidenav({

        edge: 'left', // Choose the horizontal origin
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpenEnd: function (el) {
            $('.sidenav-trigger').addClass('on');
            // setTimeout(function()
            // {
            //     $('.sidenav-trigger').tri
            // },500)
        },
        //     setTimeout(function() {

        //         $('.sidenav-overlay').remove();
        //     }, 400)

        //     $('.sidenav-trigger i').addClass('on');
        //     $('.sidenav-trigger i.on').unbind('click');
        //     $('.sidenav-trigger i.on').on('click', function() {
        //         console.info('triggering close sidenav')
        //             // $('.sidenav-overlay').trigger('click');
        //         $('#slide-out').sidenav('close')
        //     })





        // }, // A function to be called when sideNav is opened
        onCloseEnd: function (el) { }, // A function to be called when sideNav is closed
    });

    $('.sidenav-trigger').on('click', function (e) {
        if ($(this).hasClass('on')) {
            e.preventDefault()
            $('#slide-out').sidenav('close');
            $(this).removeClass('on')
            return false
        }
    })

    init_map();


    //     $('.sidenav').sidenav()

    //     menuWidth: 300,
    //     edge: 'left',
    //     draggable: true,
    //     onOpen: function () {
    //         console.log('Menu Open')
    //     },
    //     onClose: function () {
    //         console.log('Menu Close')
    //     }
    // });

    // setTimeout(function () {
    //     $('.sidenav-trigger').sideNav('show');
    // }, 1000)





    // $('#avg_menu a').on('click', function () {
    //     if (clicked == false && $(this).hasClass('avg_seasonal')) {


    //         clicked = true;
    //     }
    //     if ($(this).hasClass('avg_seasonal')) {
    //         selects.avg_type = 'avg_seasonal';

    //     } else {
    //         selects.avg_type = 'avg_permanent';
    //     }
    //     app.plot_features_on_click();
    // });

    function plot_thematic_map(adm_0_code) {
        //working??
        console.info(adm_0_code)
        console.log(selects)

        if (adm_0_code) {
            //for the moment, force basins 6
            selects.avg_layer = 'basins_6';
        }
        if (selects.avg_layer == 'countries') {
            //stored in countries_stats>: name, NO bbox!!, some stats
            var this_data_container = countries_data;
        }

        if (selects.avg_layer == 'gaul_1') {
            alert('data not ready for Gaul 1');
            return false;
        }
        if (selects.avg_layer == 'basins_5')
            var this_data_container = all_basins5_simple;

        if (selects.avg_layer == 'basins_6')
            var this_data_container = all_basins6_simple;

        //  if (selects.avg_layer == 'countries') 
        if (selects.adm_0_code == 'global') {

            var this_data = this_data_container;

        } else {

            map.setFilter('gaul_0_simple_lines', ['==', 'adm_0_code', adm_0_code]);

            // var this_data = all_basins6_simple.filter(function (d) {
            //     return d.adm_0_code == adm_0_code;
            // })[0];
            console.warn(this_data_container)

            var this_data = this_data_container.filter(function (d) {
                if (d.adm_0_code == adm_0_code) {
                    console.log(d)
                }
                return d.adm_0_code == adm_0_code;
            })[0];
        }
        var id_avg_arr = [];

        console.info(JSON.stringify(selects._data))
        var total_avg = 0;
        var index = 0;
        if (selects.avg_layer !== 'countries') {
            if (selects.adm_0_code == 'global') {
                console.log('requesting global info')

                var symbol_expression = ["match", ["get", "pfaf_id"]];

                this_data.forEach(function (country) {
                    for (var p in country.pfaf_features) {
                        id_avg_arr.push(country.pfaf_features[p][selects.avg_type])
                        total_avg += country.pfaf_features[p][selects.avg_type];
                        index++;
                    }
                })
            }

            else {
                console.info('not countries')

                // var features_test = map.querySourceFeatures("basins_06", {
                //     sourceLayer: 'adm_0_level_6',
                //     filter: ['any', ['==', 'adm_0_code', adm_0_code]]
                //     //204]]
                // });
                // console.log(features_test);

                // var filter_expression = features_test.reduce(
                //     function (memo, feature) {
                //         //feature.properties.adm_0_pfaf.split
                //         console.log(feature.properties)
                //         var avg=feature.properties[avg_type];

                //         if (memo.indexOf(feature.properties.adm_0_pfaf) == -1) {
                //             id_avg_arr.push(avg);
                //     total_avg += avg;
                //     index++;
                //             memo.push(feature.properties.adm_0_pfaf, '#5662d4');
                //         }
                //         return memo;
                //     },
                //     ["match", ["get", "adm_0_pfaf"]]
                // );
                // filter_expression.push("#d0c4c4");
                // //     map.addLayer('basins_6_adm_0', 'country-label');

                // //    map.setPaintProperty('basins_6_adm_0', "fill-opacity", 0.7);
                // map.setPaintProperty('basins_6_adm_0', "fill-color", filter_expression);

                // return false;


                var symbol_expression = ["match", ["get", "pfaf_id"]];
                //   if (selects.avg_type == 'avg_seasonal') {
                for (var pfaf_id in this_data['pfaf_features']) {
                    var unique_id = adm_0_code + '$' + pfaf_id;

                    id_avg_arr.push(this_data['pfaf_features'][pfaf_id][selects.avg_type]);
                    total_avg += this_data['pfaf_features'][pfaf_id][selects.avg_type];
                    index++;
                }
                //  }

                selects.filtered = this_data;
            }

            // for (var pfaf_id in this_data['pfaf_features']) {

            //     id_avg_arr.push(this_data['pfaf_features'][pfaf_id][selects.avg_type]);
            //     total_avg += this_data['pfaf_features'][pfaf_id][selects.avg_type];
            //     index++;
            // }
        } else {
            console.log(this_data)
            console.warn('doing countries symbols expression')

            var symbol_expression = ["match", ["get", "adm_0_code"]];
            this_data.forEach(function (d) {
                id_avg_arr.push(d[selects.avg_type]);
                total_avg += d[selects.avg_type];
                index++;
            })



        }
        var avg = Number((total_avg / index).toFixed(2));
        var max = Number(d3v5.max(id_avg_arr).toFixed(2));
        var min = Number(d3v5.min(id_avg_arr).toFixed(2));

        var domain = []
        var buckets = 10;
        var below_sub_buckets = 4;

        var sub_step = (avg / 8);

        var min_range = d3v5.range(min, avg / 2, sub_step);
        var max_range = d3v5.range(avg, avg * 2, sub_step);

        //var all_ranges=[]
        var arrs = [].concat(min_range).concat(max_range).concat([max]);
        var arrs_decimals = arrs.map(function (d) {
            //   console.info(Number(d))
            if (typeof d !== 'Number')
                var d = Number(d);

            return Number(d.toFixed(2));
        })
        // console.info(JSON.stringify(arrs_decimals))

        params = {
            total_features: index,
            max: max,
            min: min,
            avg: avg,
            type: selects.avg_type,
            buckets: buckets,
            arrs: arrs_decimals
        }


        if (selects.avg_type == 'avg_seasonal') {
            var interpolate = d3v5.interpolatePiYG;
        }
        else {
            var interpolate = d3v5.interpolateRainbow;
        }

        //return d3v5.scaleThreshold()
        //return d3v5.scaleSymlog([params.min + 2, params.max - 10], d3v5.schemeYlGnBu[5])
        var threshold_colors_pfafs_avg = get_thresholds_colors(params);
        var class_function = get_thresholds_class(params);
        //var threshold_colors_pfafs_avg=sequentialScale
        //    params.color_function = threshold_colors_pfafs_avg;
        selects._data = [];
        console.warn(selects);


        if (selects.avg_layer !== 'countries') {

            if (selects.adm_0_code == 'global') {
                this_data.forEach(function (country) {
                    console.info(country)
                    for (var pfaf_id in country.pfaf_features) {
                        var this_avg = country.pfaf_features[pfaf_id][selects.avg_type];
                        if (selects.avg_type == 'avg_permanent') {
                            var this_label = 'avg_permanent';
                            var other_avg_label = 'avg_seasonal';
                            var other_avg = country.pfaf_features[pfaf_id]['avg_seasonal']

                        }
                        else {
                            var this_label = 'avg_seasonal';
                            var other_avg_label = 'avg_permanent';
                            var other_avg = country.pfaf_features[pfaf_id]['avg_permanent']
                        }
                        //  console.warn({other_avg_label: other_avg})
                        symbol_expression.push(parseInt(pfaf_id), threshold_colors_pfafs_avg(this_avg));
                        var obj = { pfaf_id: pfaf_id, color: threshold_colors_pfafs_avg(this_avg) };
                        obj[this_label] = this_avg;
                        obj[other_avg_label] = other_avg;
                        selects._data.push(obj);
                    }
                })
                console.info(selects)
                //  debugger;


            }
            else {
                //map.setFilter('basins_06', { filter: ['any', ['==', 'adm_0_code', country_f[0].properties.adm_0_code]] })
                //  map.setFilter('basins_06_lines', { filter: ['any', ['==', 'adm_0_code', adm_0_code]] });
                map.setFilter('basins_6_adm_0', ['==', 'adm_0_code', adm_0_code]);

                for (var pfaf_id in this_data['pfaf_features']) {
                    var this_avg = this_data['pfaf_features'][pfaf_id][selects.avg_type];
                    // console.warn(this_avg)
                    if (selects.avg_type == 'avg_permanent') {
                        var this_label = 'avg_permanent';
                        var other_avg_label = 'avg_seasonal';
                        var other_avg = this_data['pfaf_features'][pfaf_id]['avg_seasonal']

                    }
                    else {
                        var this_label = 'avg_seasonal';
                        var other_avg_label = 'avg_permanent';
                        var other_avg = this_data['pfaf_features'][pfaf_id][selects.avg_type];
                        //  var other_avg=country.pfaf_features[pfaf_id]['avg_permanent']
                    }
                    console.warn({ other_avg_label: other_avg })
                    symbol_expression.push(parseInt(pfaf_id), threshold_colors_pfafs_avg(this_avg));

                    var obj = { pfaf_id: pfaf_id, color: threshold_colors_pfafs_avg(this_avg) };
                    obj[this_label] = this_avg;
                    obj[other_avg_label] = other_avg;
                    selects._data.push(obj);
                }
            }
        } else {
            //(selects.avg_layer == 'countries') 
            this_data.forEach(function (d) {

                if (selects.avg_type == 'avg_permanent') {
                    var this_label = 'avg_permanent';
                    var other_avg_label = 'avg_seasonal';
                    var other_avg = d['avg_seasonal']
                    var this_avg = d[selects.avg_type];

                }
                else {
                    var this_label = 'avg_seasonal';
                    var other_avg_label = 'avg_permanent';
                    //  var other_avg=country.pfaf_features[pfaf_id]['avg_permanent']
                    var other_avg = d[selects.avg_type];
                }
                console.warn({ other_avg_label: other_avg })
                symbol_expression.push(parseInt(d.adm_0_code), threshold_colors_pfafs_avg(this_avg));

                var obj = { country_id: d.adm_0_code, color: threshold_colors_pfafs_avg(this_avg) };
                obj[this_label] = this_avg;
                obj[other_avg_label] = other_avg;

                selects._data.push(obj);
            })
        }
        //  console.info(symbol_expression)
        // console.log(JSON.stringify(selects._data))

        do_legend(params);
        $('.mapboxgl-ctrl-bottom-right').show();

        //set up transparent by default not working...
        //https://stackoverflow.com/questions/18189201/is-there-a-color-code-for-transparent-in-html/18189313
        symbol_expression.push("#d0c4c4");
        //rgba(0,0,0,0)
        // console.info(symbol_expression)
        if (selects.avg_layer !== 'countries') {
            if (selects.adm_0_code == 'global') {
                var bbox = [[-167.167969, -61.270233], [167.343750, 61.270233]];
                map.fitBounds(bbox);
            }
            else {
                var coords = this_data.bbox.coordinates;
                //USA
                if (this_data.adm_0_code == 259) {
                    var bbox = [[-198.281250, 19.808054], [-31.025391, 69.595890]];
                }
                else {
                    var bbox = [coords[0][2], coords[0][0]];
                    //  var bbox = [[-198.281250 19.808054], [-31.025391 69.595890]];
                }
                //  -198.281250,19.808054,-31.025391,69.595890
                console.info(this_data)



                console.log(bbox)


                map.fitBounds(bbox);
            }

            switch (selects.avg_layer) {
                case 'basins_6': var layer_name = 'basins_6_adm_0'; break;
                case 'basins_5': var layer_name = 'basins_5_adm_0_fill'; break;
                default: break;
            }
            // map.setLayoutProperty('gaul_0_simple_lines', 'visibility', 'visible');
            // map.setPaintProperty('basins_6_adm_0', "fill-opacity", 0);
            map.setPaintProperty('basins_06_lines', "line-width", 2);

            //  var point = [bbox[0][1] + bbox.width/2, bbox.y + bbox.height/2];
            map.setLayoutProperty('basins_06_lines', "visibility", "visible");

            map.setPaintProperty(layer_name, "fill-opacity", 1);
            map.setPaintProperty(layer_name, "fill-color", symbol_expression);

            map.setLayoutProperty(layer_name, "visibility", "visible");


            //  map.setLayoutProperty('gaul_0_simple', "visibility", "none");
            map.setLayoutProperty('gaul_0_fixed', "visibility", "none");
            map.setLayoutProperty('gaul1_simple', "visibility", "none");
            map.setLayoutProperty('gaul_1', "visibility", "none");
        } else {
            //  map.setLayoutProperty('gaul_0_simple', "visibility", 'visible');
            map.setPaintProperty('gaul_0_simple', "fill-color", symbol_expression);
            map.setPaintProperty('gaul_0_simple', "fill-opacity", 1);
        }
        // map.setFilter('basins_6_adm_0', ['==', 'adm_0_code', adm_0_code]);
        selects.pfafs_avg_expression = symbol_expression;
    }
    //end new function by feature

    app.plot_features_on_click = function (e) {
        console.log(e)

        //                 var bbox=[[-86.72, 32.72],[-118.36, 14.53]];
        // var features = turf.featureCollection([
        //   turf.point( [-86.72, 32.72]),
        //   turf.point( [-118.36, 14.53]),

        // ]);

        // var center = turf.center(features);
        // console.log(center)



        if (!e) {
            var e = options.map_element;

            var bbox = [
                [-151.079178, -34.552942],
                [70.053635, 55.905345]
            ];
            console.log(bbox);
            selects.adm_0_code = 'global';

            map.fitBounds(bbox);
            plot_thematic_map()
        }
        else {
            // var features = map.querySourceFeatures(e.point);
            var country_f = map.queryRenderedFeatures(e.point, {
                layers: ['gaul_0_simple'] // replace this with the name of the layer
            });
            console.info(country_f)
            var adm_0_code = country_f[0].properties.adm_0_code;

            map.setFilter('gaul_0_simple_lines', ['==', 'adm_0_code', adm_0_code]);
            var features = map.querySourceFeatures("basins_06", {
                sourceLayer: 'adm_0_level_6',
                filter: ['any', ['==', 'adm_0_code', adm_0_code]]
                //204]]
            });
            // map.setFilter('basins_6_adm_0', ['==', 'adm_0_code', adm_0_code]);


            options.map_element = e;
            selects.adm_0_code = adm_0_code;
            plot_thematic_map(adm_0_code)


            // features.forEach(function (d) {
            //     console.log(d)
            //     // if (d.layer.id == 'gaul_0_fixed' ||
            //     //     d.layer.id == 'gaul_0_simple' || d.layer.id == 'basins_6_adm_0') {
            //     console.log(d)

            //     //var adm_0_code = d.properties.adm_0_code;
            //     if (adm_0_code == selects.adm_0_code) {
            //         console.log('re-clicked same country!')
            //         return false;

            //     }

            //     console.log(adm_0_code)


            //     // ['any', ['==', 'adm_0_code', 85]]
            //     //  map.setPaintProperty('gaul_0_simple_lines', "fill-color", ['any', ['==', 'adm_0_code', 126]]);
            //     // return false;




            //     // }
            // })
        }

        // if (selects.avg_layer == 'basins_6') {
        //     console.log('we take previous e')

        //     var features = map.queryRenderedFeatures(e.point);
        //     //this is the 'country' selected feature
        //     console.warn(features)
        //     features.forEach(function (d) {
        //         if (d.layer.id == 'gaul_0_fixed' ||
        //             d.layer.id == 'gaul_0_simple' || d.layer.id == 'basins_6_adm_0') {
        //             adm_0_code = parseInt(d.properties.adm_0_code);
        //             options.map_element = e;
        //             selects.adm_0_code = adm_0_code;
        //             plot_thematic_map(adm_0_code)
        //         }
        //     })

        // } else {
        //     //countries
        //     // var bbox = [coords[0][2], coords[0][0]];
        //     //-151.079178,-34.552942,70.053635,55.905345

        // }

    }
    map.on("click", function (e) {
        options.map_element = e;
        console.log(e)
        map.setPaintProperty('basins_6_adm_0', "fill-opacity", 0);
        map.setPaintProperty('basins_06_lines', "line-width", 0);
        map.setFilter('basins_6_adm_0', ['has', 'adm_0_code']);
        setTimeout(function () {

            map.setPaintProperty('basins_06_lines', "line-width", 2);
        }, 1000)
        app.plot_features_on_click(e);
    })



    function throttle(fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    hovering_features = null;
    map.on('zoom', function (e) {
        var zoom = map.getZoom();
        //  console.log(e)
        var point = e._lngLat
        //the BIGGER the zoom, closer we are
        if (zoom > 6) {

            console.info(country_popup)
            country_popup.remove();
            // throttle(function (e) {
            // console.info('throttling basins lines')
            var relatedFeatures = map.queryRenderedFeatures(point, { layers: ['basins_6_adm_0'] });

            hovering_features = getUniqueFeatures(relatedFeatures, "pfaf_id");
            console.log(hovering_features.length + ' BASINS')
            //   hovering_features=uniqueFeatures

            // }, 500)

        }
        if (zoom < 8) {
            bassins_popup.remove();

        }
    });

    function throttle2(method, scope) {
        if (method._tId)
            clearTimeout(method._tId);

        method._tId = setTimeout(function () {
            method.call(scope);
        }, 500);
    }

    function hovering_basins(pfaf_id) {

        console.log('hovering features')
        hovering_features.forEach(function (d) {
            console.log(d)

            if (d.properties.pfaf_id == pfaf_id) {
                console.warn(pfaf_id)
                map.setFilter('basins_06_lines', ['==', 'pfaf_id', pfaf_id]);
            }
        })

    }

    map.on("mousemove", throttle(function (e) {
        var zoom = map.getZoom();

        var features = map.queryRenderedFeatures(e.point);
        //  console.info(features)

        //only layers that we are mouseovering...
        var mouseov_layers = features.map(function (d) {
            return d.layer.id;
        });
        //console.info(mouseov_layers)
        var html = '';

        if (mouseov_layers.length == 1 && mouseov_layers[0] == 'water') {
            if ($('.bassins_popup').length > 0)
                bassins_popup.remove();
            if ($('.country_popup').length > 0)
                country_popup.remove();
        }

        features.forEach(function (f) {


            if (f.layer.id == 'gaul_0_simple' || f.layer.id == 'gaul_0_fixed') {
                var adm_0_code = f.properties.adm_0_code;
                //    console.log(adm_0_code)


                //   html += '<h5>' + f.properties.adm_0_name + '<h5>';
                //closer, bigger zoom
                if (zoom < 6) {

                    html += ' <div class="country_popup small_popup"> <div class="section"> <div class="adm_name">' + f.properties.adm_0_name + '</div>'
                        + '<div class="row"> <div>' + getRandomInt(-100, 100) + '</div>'
                        + '<div class="title">Water quality</div></div><div class="row"> <div>' + getRandomInt(-100, 100) + '</div><div class="title avg_seasonal">Water quantity</div></div>'

                    // console.info(html)
                    if (selects.adm_0_code == 'global' && selects.avg_layer == 'countries') {
                        var _sel = selects._data.filter(function (d) {
                            return d.country_id == adm_0_code;
                        })[0]
                        console.info(_sel)

                        // if (selects.avg_type=='avg_permanent')
                        html += '<div class="title" style="color:' + _sel.color + '">Average permanenent</div><div class="row">' + _sel.avg_permanent + '<div></div>'
                        html += '<div class="title">Average seasonal</div><div class="row">' + _sel.avg_seasonal + '<div></div>'
                    }
                    html += '</div></div>';
                    html += '</div></div>';
                    //  console.log(html)
                    /* html += '<div class="flow-text adm_name">' + f.properties.adm_0_name + '</div><hr>  <div class="row popup_info">'+
                 '<div class="col s12"> <span class="badges">' + getRandomInt(-100, 100) + '% </span> <div>Spatial area </div>'+
                  '</div> <div class="col s12"> <span class="badges">' + getRandomInt(-100, 100) + '% </span>'+
                     '<div>Water quality </div> </div> <div class="col s12"> <span class="badges">' + getRandomInt(0, 100) + ' % </span> <div>Water quantity </div> </div> </div>'; */
                    country_popup.setLngLat(e.lngLat)
                    country_popup.setHTML(html) //<hr>'+feature.properties.adm_0_name)
                        .addTo(map);
                }

                map.setFilter('gaul_0_simple_lines', ['==', 'adm_0_code', adm_0_code]);
                map.setLayoutProperty('gaul_0_simple_lines', 'visibility', 'visible');

            }
            if (f.layer.id == 'basins_6_adm_0') {
                //  console.log(f.properties)
                var adm_0_code = f.properties.adm_0_code;
                var pfaf_id = f.properties.pfaf_id;

                //closer, bigger zoom
                //far, little zoom
                if (zoom < 3) {
                    // bassins_popup.remove();
                    return false;
                }

                var adm_0_code = f.properties.adm_0_code;
                map.setFilter('gaul_0_simple_lines', ['==', 'adm_0_code', adm_0_code]);
                //   map.setFilter('basins_06_lines', ['==', 'pfaf_id', pfaf_id]);
                //  console.log(hovering_features)

                if (hovering_features) {
                    //throttle2(hovering_basins(pfaf_id))
                }
                // throttle(function () {
                //     if (hovering_features) {
                //         console.log('hovering features')
                //         hovering_features.forEach(function (d) {
                //             console.log(d)

                //             if (d.properties.pfaf_id == pfaf_id) {
                //                 console.warn(pfaf_id)
                //                 map.setFilter('basins_06_lines', ['==', 'pfaf_id', pfaf_id]);
                //             }
                //         })
                //     }
                // }, 50)




                if (selects.adm_0_code) {
                    if (adm_0_code == selects.adm_0_code || selects.adm_0_code == 'global') {
                        selects._data.forEach(function (d) {
                            //   console.info(d)
                            if (parseInt(d.pfaf_id) == parseInt(f.properties.pfaf_id)) {
                                // html += '<div class="bassins_popup"><div class="section">Bassin id: <div>' + f.properties.pfaf_id + '</div>'+
                                //'<span>Average permanent</span><div><div class="divider">' + d.avg_permanent + '<p><div class="section">'+
                                //    '<span>Average seasonal</span><div class="divider">' + d.avg_seasonal + '</div></div>';
                                html += ' <div class="bassins_popup"> <div class="section"> <div class="row"> <div>' + f.properties.pfaf_id + '</div>'
                                    + '<div class="title id">Bassin id</div></div><div class="row"> <div>' + d.avg_permanent + '</div>'
                                    + '<div class="title avg_permanent">Average permanent</div></div><div class="row"> <div>' + d.avg_seasonal + '</div><div class="title avg_seasonal">Average seasonal</div></div></div></div>'
                                //    console.log(html)
                            }
                        })

                        html += '<div class"highcharts_container"></div>';
                    }
                }
                else {
                    html += ' <div class="bassins_popup"> <div class="section"> <div class="row"> <div>' + f.properties.pfaf_id + '</div></div></div></div>'
                }
                bassins_popup.setLngLat(e.lngLat)


                bassins_popup.setHTML(html) //<hr>'+feature.properties.adm_0_name)
                    .addTo(map);

                var this_data = all_basins6_simple.filter(function (d) {
                    return d.adm_0_code == adm_0_code;
                })[0];
            }
        })
        // get_chart(this_data);

    }, 1));


})