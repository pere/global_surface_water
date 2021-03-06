$(document).ready(function () {

    var arr_adm_names = {}
    countries_data.forEach(function (d) {
        arr_adm_names[d.adm_0_name] = null;
    })
    console.info(arr_adm_names)



    $('.collapsible').collapsible();
    $('.sidenav .list').on('click', function (e) {
        var target = $(e.target)
        var container = target.parents().closest('.row');

        if (target.hasClass('material-icons')) {
            var info_type = container.attr('info_container');

            if (info_type.indexOf('lake') !== -1) {
                var main_li = $('.lakes_li');
            }
            if (info_type.indexOf('reservoirs') !== -1) {
                var main_li = $('.reservoirs_li');
            }

            if (target.hasClass('info')) {
                if (target.hasClass('on') == false) {
                    //  alert(info_type.indexOf('lake'))

                    // if ($('.lakes_li').is(':visible')) {
                    //     $('.lakes_li').hide();
                    //     $('.lakes_li').find('.collapsible-body').hide()
                    // }
                    // else {
                    main_li.show()
                    main_li.find('.collapsible-body').show()
                    $('.' + info_type).show();

                } else {

                    //   $('.lakes_li').show()
                    //  $('.lakes_li').find('.collapsible-body').show()
                    $('.' + info_type).hide();


                }
                target.toggleClass('on');

            }
        }
    })

    $('.dropdown-trigger').dropdown({
        inDuration: 300,
        constrainWidth: false,
        closeOnClick: false,
        container: '#layers_menu',
        outDuration: 225,
        hover: false, // Activate on hover,
        stopPropagation: true,
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

    // $('.dropdown-button').dropdown({
    //     inDuration: 300,
    //     outDuration: 225,
    //     constrain_width: false, // Does not change width of drop
    //     alignment: 'left' // Displays dropdown with edge aligned to the left of button
    // });
    $('input.autocomplete').autocomplete({
        data: arr_adm_names,
        onAutocomplete: function (txt) {
            var adm_name = txt;
            console.info(adm_name)
            countries_data.forEach(function (d) {
                /* if (d.adm_0_name == adm_name) {
                     console.log(d.bbox)
                     var bbox_arr = d.bbox.coordinates[0];
                     console.info(bbox_arr)
                     //var bbox = [coords[0][2], coords[0][0]];
                     var bbox = [bbox_arr[2], bbox_arr[0]]
                     map.fitBounds(bbox);
                 }
                 */

                if (d.adm_0_name == adm_name) {
                    console.log(d)
                    var _bbox = d.bbox.coordinates[0];
                    //var bbox = [coords[0][2], coords[0][0]];
                    var bbox = [_bbox[2], _bbox[0]]

                    //USA
                    if (d.adm_0_code == 259) {
                        var bbox = [
                            [-198.281250, 19.808054],
                            [-31.025391, 69.595890]
                        ];
                    }
                    var code = d.adm_0_iso;

                    //map.flyTo({ 'center': d.centroid });
                    map.fitBounds(bbox);
                    clicked_sel_f = { sel_code: code, sel_latlng: d.centroid };
                    selects.adm_0_code = d.adm_0_code;
                    app.plot_thematic_map(d.adm_0_code)
                    // map.fire('flystart');
                    //  fxs.click_map(clicked_sel_f);
                    //map.fire('click');
                    // setTimeout(function () {
                    //     mousemove_map({ sel_code: code, sel_latlng: d.centroid })
                    // }, 1600)



                }
            })



        }
    })

    $("#map").on('mousemove', function (e) {
        // console.log('mouseovering map')
        // console.info($(e.target))
        var parentOffset = $(this).parent().offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;

        var relY = e.pageY - parentOffset.top;

        if (relY < $('nav').height() * 2) {
            $('.mapboxgl-popup').css('visibility', 'hidden');
        } else {
            $('.mapboxgl-popup').css('visibility', 'visible');
        }
    });
    $('.overlay_layers_collection .main.collection-item').on('click', function (e) {
        var collection_item = $(this);
        if (collection_item.hasClass('main'))
            e.stopPropagation();

        var target = $(e.target);
        console.log(collection_item)
        var data_layer = collection_item.attr('data-layer');

        console.log('layer ' + data_layer);

        //switch layers_correspondence_new in mapbox_init.js!!!!!
        switch (data_layer) {
            case 'countries':
                var layers = ['gaul_0_simple', 'gaul_0_fixed'];
                break;
            case 'basins_6':
                var layers = ['basins_6_adm_0'];
                break;
            case 'basins_5':
                var layers = ['basins_5_adm_0_fill'];
                break;
            case 'gaul_1':
                var layers = ['gaul_1', 'gaul_1_simple'];
                break;
            default:
                break;
        }
        /*
        DO DATA_LAYER IN HTML CORRESPONDENT TO THESE ONES
        var layers_correspondence = {
            'countries': ['gaul_0_simple', 'gaul_0_fixed', 'gaul_0_simplified_highlighted', 'gaul_0_fixed_highlighted'],
            'gaul_1': ['gaul_1', 'gaul1_simple'],
            'basins_6': ['basins_6_adm_0'],
            'basins_5': ['basins_5_adm_0_fill']
        };
        */


        if (target.hasClass('show_hide_layer')) {
            var data_layer = collection_item.attr('data-layer');

            if (target.hasClass('on') == false) {
                target.toggleClass('on');
                show_hide_layers('show', data_layer)
            } else {
                target.toggleClass('on');

                // layers.forEach(function(l) {
                //     l.setPaintProperty(d, "fill-color", '');
                // })
                show_hide_layers('hide', data_layer);
            }
        }
        if (target.hasClass('palette')) {
            var data_layer = collection_item.attr('data-layer');
            $('.overlay_layers_collection').find('.theme_container.on').removeClass('on');
            if (target.hasClass('on') == false) {
                //no on

                target.toggleClass('on')
                collection_item.find('.theme_container').addClass('on');
            } else {
                // layers.forEach(function(l) {
                //     l.setPaintProperty(d, "fill-color", '');
                // })
                target.toggleClass('on');

            }
        }
        if (target.hasAttr('data-avg')) {
            var data_layer = collection_item.attr('data-layer');
            if (target.hasClass('on') == false) {
                selects.avg_layer = data_layer;
                selects.avg_type = target.attr('data-avg');
                $('.overlays_dropdown').find('.collection-item.on').removeClass('on');
                target.addClass('on');
                console.log('avg_layer is' + selects.avg_layer)
                app.plot_features_on_click();
                // if (first_time_clicked==true)
                // {
                //     first_time_clicked=false;
                //     target.attr('prev_clicked',true);
                //     layers.forEach(function(l) {
                //         console.info(map)
                //         l.original_style=map.getStyle()
                //         map.setPaintProperty(l, "fill-color", l.paint['fill-color']);
                //     })

                // }

            } else {
                target.removeClass('on');
                console.log('we should remove the layer!');
                // selects.avg_layer = data_layer;
                // selects.avg_type = target.attr('data-avg');
                selects.avg_layer = null;
                selects.avg_type = null;
                // layers.forEach(function(l) {
                //     console.info(map)

                //     map.setPaintProperty(l, "fill-color", l.paint['fill-color']);
                // })
            }
        }


    });
    // $('#overlays_dropdown .material-icons').each(function () {
    //     if ($(this).hasClass('layers'))
    //         $(this).attr('data-tooltip', "<b>Use this icon to show on/off this layer</b>");

    //     if ($(this).hasClass('palette'))
    //         $(this).attr('data-tooltip', "<b>Use this icon to symbolize this layer</b>");

    //     $(this).attr("data-position", "top");

    //     $(this).tooltip({
    //         enterDelay: 10,
    //         exitDelay: 5050,
    //         position: 'right',
    //         html: true
    //     });
    // })

    $('#overlays_dropdown .material-icons').on('mouseout', function () {
        $(this).tooltip('close');
    })

})