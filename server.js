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
