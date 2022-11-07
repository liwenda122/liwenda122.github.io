// pie 环形图
option = {
    backgroundColor: '#fff',
    title: [{
        text: '95%',
        textStyle: {
            color: '#22ac38',
            fontSize: 35
        },
        itemGap: 20,
        left: '46%',
        top: '40%'
    },{
        text: '总体完成度',
        textStyle: {
            color: '#444444',
            fontSize: 35,
            fontWeight:'normal'
        },
        itemGap: 20,
        left: '41.5%',
        top: '50%'
    }],
    grid: [{
        top: '10%',
        width: '50%',
        left: '45%',
        containLabel: true
    }],
    angleAxis: {
        polarIndex: 0,
        min: 0,
        max: 100,
        show: false,
        // boundaryGap: ['40%', '40%'],
        startAngle: 90,
    },
    radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
            show: false,
        },
        axisLine: {
            show: false,

        },
        axisTick: {
            show: false
        },
    },
    polar: [{
        center: ['50%', '50%'], //中心点位置
        radius: '80%' //图形大小
    }],
    series: [
        {
            type: 'bar',
            z: 10,
            name: "完成度",
            data: [95],
            showBackground: false,
            backgroundStyle: {
                borderWidth: 10,
                width: 10
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 35, //大的占比环
            itemStyle: {
                normal: {
                    opacity: 1,
                    color: "#14d88e"
                }
            },
        },
        {
            type: 'pie',
            name: '内层细圆环',
            radius: ['46%', '34%'],
            center: ['50%', '50%'], //中心点位置
            startAngle: 90,
            hoverAnimation: false,
            clockWise: true,
             silent: true,
            itemStyle: {
                normal: {
                    color: '#f3f3f7',
                    shadowBlur: 0,
                    shadowColor: '#66666a',
                }
            },
            tooltip: {
                show: false,
            },
            label: {
                show: false
            },
            data: [100]
        }
    ]
};
// 柱状图 条形百分比
option = {
    grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '10%',
        containLabel: true
    },
    backgroundColor: '#ffffff',
    xAxis: {
        show: false,
        type: 'value'
    },
    yAxis: [{
        type: 'category',
        inverse: true,
        axisLabel: {
            show: true,
            textStyle: {
                color: '#303133',
                fontSize: '14'
            },
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        data: ['客车', '重工', '商用车', '专用车']
    }, {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
            textStyle: {
                color: '#303133',
                fontSize: '14'
            },
            formatter: function(value) {
                if (value >= 10000) {
                    return (value / 10000).toLocaleString() + '万';
                } else {
                    return value.toLocaleString() + '%'
                }
            },
        },
        data: [23, 18, 12, 6]
    }],
    series: [{
            name: '次数',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
                normal: {
                    barBorderRadius: 0,
                    color: '#419fff'
                },
            },
            // barWidth: 8,
            data: [23, 18, 12, 6]
        },
        {
            name: '背景',
            type: 'bar',
            // barWidth: 8,
            barGap: '-100%',
            data: [23, 23, 23, 23],
            itemStyle: {
                normal: {
                    color: '#E4E7ED',
                    barBorderRadius: 0,
                }
            },
        },
    ]
};
// 饼图 车辆状态
var data = [
    {
        name: '良好',
        value:20,
    },
    {
        name: '一般',
        value: 10,
    },
    {
        name: '较差',
        value: 5,
    },
];
var colorArr = ['#138AF5', '#2CD7F9', '#20D189'];
function getRich() {
    let result = {};
    colorArr.forEach((v, i) => {
        result[`normal${i}`] = {
            fontSize: 16,
            align: 'left',
            padding: [30, 4, 0, 0],
            color: '#BDC8DC',
            fontFamily: 'PingFang',
        };
    });
    return result;
}

option = {
    color: colorArr,
    grid: {
        bottom: 150,
        left: 100,
        right: '10%',
    },
    series: [
        // 主要展示层的
        {
            radius: ['35%', '60%'],
            center: ['50%', '50%'],
            type: 'pie',
       startAngle: 20,
            label: {
                normal: {
                    show: true,
                    formatter: function (params, ticket, callback) {
                        aa = params.dataIndex;
                        var percent = 0;
                        var total = 0;
                        for (var i = 0; i < data.length; i++) {
                            total += data[i].value;
                        }
                        percent = ((params.value / total) * 100).toFixed(0) + '%';
                        const index = params.dataIndex;
                        return [`{normal${index}|${params.name}：}{normal${index}|${percent}}`].join('\n');
                    },
                    padding: [0, -80],
                    rich: getRich(),
                },
                emphasis: {
                    show: true,
                },
            },
            labelLine: {
                lineStyle: {
                    color: '#124DBD',
                },
                length: 10,
                length2: 80,
            },
            name: '民警训练总量',
            data: data,
        },
        // 边框的设置
        {
            radius: ['30%', '30%'],
            center: ['50%', '50%'],
            type: 'pie',
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: false,
                },
            },
            labelLine: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: false,
                },
            },
            animation: false,
            tooltip: {
                show: false,
            },
            data: [
                {
                    value: 1,
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: 'rgba(126,158,255,0.43)',
                        },
                    },
                },
            ],
        },
        {
            name: '外边框',
            type: 'pie',
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ['50%', '50%'],
            radius: ['65%', '65%'],
            label: {
                normal: {
                    show: false,
                },
            },
            data: [
                {
                    value: 9,
                    name: '',
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: 'rgba(126,158,255,0.43)',
                        },
                    },
                },
            ],
        },
    ],
};

