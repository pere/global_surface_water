$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var layers_correspondence = {
    'countries': { layer_ids: ['gaul_0_simple', 'gaul_0_fixed', 'gaul_0_simplified_highlighted', 'gaul_0_fixed_highlighted'] },
    'gaul_1': ['gaul_1', 'gaul1_simple'],
    'basins_6': ['basins_06_lines'],
    'basins_5': ['basins_5_adm_0_fill']
};

function show_hide_layers(action, data_layer) {
    layers_correspondence[data_layer].forEach(function(d) {
        console.dir(d)
        var visibility = map.getLayoutProperty(d, 'visibility');
        console.warn(visibility + ' for layer ' + d)
        if (action == 'hide') {
            map.setLayoutProperty(d, 'visibility', 'none');
        } else {

            if (!map.getLayer(d)) {
                map.addLayer(d, 'gaul_0_simple')
            }
            map.setLayoutProperty(d, 'visibility', 'visible');
        }
    })


    // if (action == 'hide') {
    //     if (map.getLayer('basins_5_adm_0_fill')) {
    //         console.log('hide basins')
    //         map.removeLayer(basins_6_adm_0_layer)
    //         //map.setFilter('basins_6_adm_0', null)

    //         // map.setPaintProperty(data_layer, "fill-opacity", 1);
    //     }
    // }
    // else {
    //     if (!map.getLayer('basins_5_adm_0_fill')) {
    //         console.log('add basins')
    //         console.info(d)
    //         map.addLayer('basins_5_adm_0_fill')
    //         //map.setFilter('basins_6_adm_0', null)

    //         map.setPaintProperty('basins_5_adm_0_fill', "fill-opacity", 1);
    //         map.setLayoutProperty('basins_5_adm_0_fill', 'visibility', 'visible');
    //     }
    // }

}

function getUniqueFeatures(array, comparatorProperty) {

    var existingFeatureKeys = {};
    var uniqueFeatures = array.filter(function(el) {
        if (existingFeatureKeys[el.properties[comparatorProperty]]) {
            return false;
        } else {
            existingFeatureKeys[el.properties[comparatorProperty]] = true;
            return true;
        }
    });

    return uniqueFeatures;
}

function get_chart(data) {

    console.log(JSON.stringify(data))
    var all_years = data.years;
    var all_permanent = data.permanent_data;

    var chart = new Highcharts.Chart({
        chart: {
            type: 'column',
            zoomType: 'xy',
            renderTo: $('.highcharts_container_bottom')[0]
                // height:409                             
        },
        title: {
            //text: 'Only landcover classes with bigger than 1% surface are shown on this graphic'
            text: 'Water change'
        },
        xAxis: {
            categories: all_years
        },


        yAxis: {
            title: {
                text: null
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointWidth: 10,
                dataLabels: {
                    enabled: false,
                    //format: '{point.y:.1f}%'
                }
            }
        },

        yAxis: {

            title: {
                text: null,
                align: 'center'
            }
        },

        tooltip: {
            shared: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Permanent',
            color: 'rgba(165,170,217,1)',
            data: all_permanent,
            pointPadding: 0.3,
            pointPlacement: -0.2
        }, {
            name: 'Projected',
            color: 'rgba(126,86,134,.9)',
            data: all_projected,
            pointPadding: 0.4,
            pointPlacement: -0.2
        }]
    });
}

function do_legend(params) {
    console.warn(params)

    var class_function = get_thresholds_class(params);
    var color_function = get_thresholds_colors(params);

    $('.general_stats .permanent_stats .data').empty().html('<div>Average <span>' + params.avg + '</span></div><div> Minimum <span>' +
            params.min + '</span></div><div> Maximum <span>' + params.max + '</span></div>')
        // $('#slide-out').sidenav('open')
    var arr = []
    selects._data.forEach(function(d) {
        arr.push({
            data: d.avg_permanent,
            _class: class_function(d.avg_permanent),
            color: color_function(d.avg_permanent)
        })
    })
    console.info(arr)

    var x = d3v5.scaleLinear()
        .domain([params.min, params.max])
        .rangeRound([1, 500])
    var classified_data = class_function.range().map(function(_class) {
        var d = class_function.invertExtent(_class);
        if (d[0] == null) d[0] = x.domain()[0]; //+30;
        if (d[1] == null) d[1] = x.domain()[1];
        //var avg = Number((total_avg / index).toFixed(2));
        console.log(d)
        return d
    })

    var arr_classified = [];
    var temp_arr = []
    arr.forEach(function(d) {
        var pos = temp_arr.indexOf(d._class)
        if (temp_arr.indexOf(d._class) == -1) {
            temp_arr.push(d._class);
            arr_classified.push({ data_range: classified_data[d._class], _class: d._class, count: 1, color: d.color })
        } else {
            arr_classified[pos].count++;
        }
    })
    console.log(arr_classified)

    var legend_wrapper = $('.scale');
    var x = d3v5.scaleLinear()
        .domain([params.min, params.max])
        .rangeRound([1, 500])
        //  .rangeRound([1,legend_wrapper.width()-70])


    var xAxis = d3v5.axisBottom(x)
        .tickSize(15)
        .tickValues(color_function.domain())
        .tickFormat(function(d, i) {
            if (i == 0 || i == 2 || i == 7 || i == 12)
                return parseInt(d); // === 0.5 ? formatPercent(d) : formatNumber(100 * d);
        });
    $(".scale").empty();
    $('.my-custom-control').show();

    var all = color_function.range().map(function(color) {
            var d = color_function.invertExtent(color);
            if (d[0] == null) d[0] = x.domain()[0]; //+30;
            if (d[1] == null) d[1] = x.domain()[1];

            return d;
        })
        //console.log(all)

    //params.total_features
    var params_html = '<div class="scale_params"><span>' + params.total_features + ' features symbolized</span><span>Min: ' + params.min + '</span><span> Average: ' + params.avg +
        '</span><span>Max ' + params.max + '</span></div><div class="scale2"></div>';
    $('.scale').append(params_html)

    all.forEach(function(d, i) {
        var item = $("<div class='color'>");
        var c = color_function(d[0]);
        console.log(c)
        item.css("background", c)
        item.css("height", "2vw");
        item.css("width", 0)
        item.addClass('cat_' + i);
        $('.scale2').append(item)
        item.animate({ "width": x(d[1]) - x(d[0]) }, 1000);

    });

    // $('.scale').append('' + params_html)
    setTimeout(function() {
            $('.scale .color').each(function() {
                var cat = $(this).attr('class').split('_')[1];
                console.log(cat)
                var filtered = arr_classified.filter(function(d) {
                    // console.log(d)
                    return d._class == cat;
                })[0];
                //console.info(filtered)
                if (filtered) {

                    var range_txt = filtered.data_range[0] + ' - ' + filtered.data_range[1];

                    $(this).attr('data-tooltip', '<div class="section"> <div class="title" style="background-color:' + filtered.color + '">' + range_txt + '</div>' + filtered.count + ' records found</div>');
                } else {
                    $(this).attr('data-tooltip', "<b>No data in this category</b>");
                }



                $(this).attr("data-position", "top");

                $(this).tooltip({
                    enterDelay: 10,
                    //  exitDelay: 5050,
                    position: 'top',
                    html: true
                });
            })

            $('.scale .color').on('mouseout', function(e) {
                console.info('mouseout cat ' + $(e.target).attr('class'))
                $('.scale .color').tooltip('close');
            })

            $('.scale .color').on('hover', function(e) {
                //   var _this = $(e.target)

                $(this).tooltip('open');
            });
        }, 500)
        /*
      var g = d3v5.select(".scale g").call(xAxis);
  
      g.select(".domain")
          .remove();
  
     
      g.selectAll("rect")
          .data(color_function.range().map(function (color) {
              var d = color_function.invertExtent(color);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().insert("rect", ".tick")
          .attr("height", 35)
          .attr('padding', '15px')
          .attr("x", function(d) {
              return x(d[0]);
          })
          .attr("width", function(d,i) {
              //if (i<arr_classified.length-1)
              var _x=x(d[1]) - x(d[0])+20;
              if (_x<10)
              _x=_x+20
  
              console.info(_x)
              return _x 
              //x(d[1]) - x(d[0])+20;
          })
          .attr("fill", function(d) {
              return color_function(d[0]);
          });
  
      g.append("text")
          .attr("fill", "#000")
  
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .attr("y", -17)
          */

    //.text("Data");
}

function get_thresholds_class(params) {
    var domain = params.arrs;
    var data_range = d3v5.range(0, domain.length, 1);
    console.info(domain)
    console.log(data_range)


    return d3v5.scaleThreshold()
        .domain(domain)
        .range(data_range)

}

function get_thresholds_colors(params) {
    var domain = params.arrs;
    var colorInterpolator = d3v5.interpolateRainbow; //("red", "green");
    var steps = domain.length + 1;
    //14
    var colorArray = d3v5.range(0, (1 + 1 / steps), 1 / (steps - 1)).map(function(d) {
        return colorInterpolator(d)
    });
    console.warn(d3v5.range(0, (1 + 1 / steps), 1 / (steps - 1)))
    console.log(domain)
    console.log(colorArray)
    var range = colorArray


    return d3v5.scaleThreshold()
        //min, avg,
        .domain(domain)
        // .range(["#6e7c5a", "#a0b28f", "#d8b8b3", "#b45554", "#760000"]);
        .range(range)

}

function get_thresholds_classification(params) {
    var domain = params.arrs;
    // var colorInterpolator = d3v5.interpolateRainbow;//("red", "green");


    //var colorInterpolator = d3v5.interpolateRgb("white", "green","red");

    var steps = domain.length;

    var colorArray = d3v5.range(0, (1 + 1 / steps), 1 / (steps - 1)).map(function(d) {
        return colorInterpolator(d)
    });

    console.log(colorArray)
    var range = colorArray

    return d3v5.scaleThreshold()
        //min, avg,
        .domain(domain)
        // .range(["#6e7c5a", "#a0b28f", "#d8b8b3", "#b45554", "#760000"]);
        .range(range)

}

function get_colors(pfafs_avg_max) {
    return d3v5.scaleLinear()
        .domain([pfafs_avg_min, pfafs_avg_max])
        //  .clamp(true)
        //.interpolator(d3v5.interpolateWarm);
        .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598",
            "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"
        ]);
}