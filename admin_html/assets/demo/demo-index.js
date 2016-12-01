jQuery(document).ready(function() {

    $(function() {



        // data
    var datax = [
        { label: "Velacheri",  data: 10, color: Utility.getBrandColor('danger')},
        { label: "Adyar",  data: 30, color: Utility.getBrandColor('warning')},
        { label: "Nungambackam",  data: 90, color: Utility.getBrandColor('midnightblue')},
        { label: "IIT Campus",  data: 70, color: Utility.getBrandColor('info')},
        { label: "Royappettah",  data: 80, color: Utility.getBrandColor('success')},
        { label: "JP Nagar",  data: 110, color: Utility.getBrandColor('inverse')}
    ];




    // INTERACTIVE
        $.plot($("#interactive"), datax,
            {
                series: {
                        pie: {
                                show: true
                        }
                },
                grid: {
                        hoverable: true,
                        clickable: true
                },
                legend: {
                    show: false
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%p.0%, %s"
                }

            });
            $("#interactive").bind("plothover", pieHover);


    function pieHover(event, pos, obj)
    {
            if (!obj)
                    return;
            percent = parseFloat(obj.series.percent).toFixed(2);
            $("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
    }


    //Switchery
        Switchery(document.querySelector('.js-switch-success'), {color: Utility.getBrandColor('success')});

    // EasyPieChart

        try {
            $('.easypiechart#progress').easyPieChart({
                barColor: "#cddc39",
                trackColor: 'rgba(255, 255, 255, 0.32)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 96,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent-non').text(Math.round(percent));
                }
            });
        } catch(e) {}
    });

    
    //Loading Button in Timeline
    $('.loading-example-btn').click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        },3000 )
    });


    // Visitor Stats
        function randValue() {
            return (Math.floor(Math.random() * (2)));
        }

        var fans = [[1, 17], [2, 34], [3, 73], [4, 47], [5, 90], [6, 70], [7, 40]];
        var followers = [[1, 54], [2, 40], [3, 10], [4, 25], [5, 42], [6, 14], [7, 36]];

        var plot = $.plot($("#socialstats"),
            [{ data: fans, label: "Previous Week" },
             { data: followers, label: "This Week" }], {
                series: {

                    shadowSize: 0,
                    lines: { 
                        show: false,
                        lineWidth: 0
                    },
                    points: { show: true },
                    splines: {
                        show: true,
                        fill: 0.08,
                        tension: 0.3, // float between 0 and 1, defaults to 0.5
                        lineWidth: 2 // number, defaults to 2
                    },
                },
                grid: {
                    labelMargin: 8,
                    hoverable: true,
                    clickable: true,
                    borderWidth: 0,
                    borderColor: '#fafafa'
                },
                legend: {
                    backgroundColor: '#fff',
                    margin: 8
                },
                yaxis: { 
                    min: 0, 
                    max: 100, 
                    tickColor: '#fafafa', 
                    font: {color: '#bdbdbd', size: 12},
                    // tickFormatter: function (val, axis) {
                    //     if (val>999) {return (val/1000) + "K";} else {return val;}
                    // }
                },
                xaxis: { 
                    tickColor: 'transparent',
                    tickDecimals: 0, 
                    font: {color: '#bdbdbd', size: 12}
                },
                colors: ['#95a5a6', '#2ecc71'],
                tooltip: true,
                tooltipOpts: {
                    content: "Date: %x, Sales: %y"
                }
            });

   

    // Donut
        var datax = [
            { label: "Returning",  data: 68, color: '#7e57c2'},
            { label: "New",  data: 32, color: '#26c6da'}
        ];

        $.plot($("#newvsreturning"), datax,
            {
                series: {
                        pie: {
                            innerRadius: 0.55,
                            show: true,
                            // label: {
                            //     formatter: function (label, series) {
                            //         if (label=="New Visits")        { return '<div style="font-size:8pt;text-align:center; position:relative; left: 20px">' + label + '<br/>' + Math.round(series.percent) + '%</div>'; }
                            //         if (label=="Returning Visits")  { return '<div style="font-size:8pt;text-align:center; position:relative; right: 20px">' + label + '<br/>' + Math.round(series.percent) + '%</div>'; }
                            //     }
                            // }
                            offset : {
                                left: 0
                            }
                        }
                },
                legend: {
                    show: true,
                    margin: 8
                },
                grid: {
                    hoverable: true,
                    labelMargin: 8
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%p.0%, %s"
                }

            });

    // Live Dynamic    
});