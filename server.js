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
// 车辆运营趋势图 柱状图+折线图
option = {
    backgroundColor: '#fff',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '5%',
                    top: '16%',
                    containLabel: true
                },
                legend: {
                    data: ['用户总数', '新增会员', '用户', '其它'],
                    left: '20px',
                    top:0,
                    icon:'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
                    textStyle: {
                        color: "#333"
                    },
                    itemWidth: 10,
                    itemHeight: 10,
                },
                xAxis: {
                    type: 'category',
                    data: ['2019/01/01', '2019/01/02', '2019/01/03', '2019/01/04', '2019/01/05', '2019/01/06', '2019/01/07'],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(0,0,0,0.5)'
                        }
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                    },
                },
                yAxis: {
                    type: 'value',
                    max: '1200',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#f1f1f1'
                        }
                    },
                    axisLabel: {
                        color: '#999',
                        textStyle: {
                            fontSize: 12
                        },
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                    },
                },
                series: [{
                        name: '用户总数',
                        type: 'bar',
                        barWidth: '15%',
                        itemStyle: {
                            normal: {
                                color: '#9C9AFF',
                                barBorderRadius: [12, 12, 0, 0],
                            },
                        },
                        data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
                    },
                    {
                        name: '新增会员',
                        type: 'bar',
                        barWidth: '15%',
                        itemStyle: {
                            normal: {
                                color: '#FC8B62',
                                barBorderRadius: [12, 12, 0, 0],
                            }

                        },
                        data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
                    },
                    {
                        name: '用户',
                        type: 'bar',
                        barWidth: '15%',
                        itemStyle: {
                            normal: {
                                color: '#FF679F',
                                barBorderRadius: [12, 12, 0, 0],
                            }
                        },
                        data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
                    },
                    {
                        name: '其它',
                        type: 'line',
                        barWidth: '15%',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#FFCA71',
                                barBorderRadius: [12, 12, 0, 0],
                            }
                        },
                        data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
                    }
                ]
};
// 异常提醒 横向柱状图
option = {
  backgroundColor:"#000a3f",
     
      grid: {
          top: '15%',
          right: '15%',
          left: "15%",
          bottom: '12%'
      },
      yAxis: [{
          name: "异常类型",
          type: 'category',
          data: ["连续多天未运营","单日超350km","轨迹异常","纯电行驶","车辆未行驶"],
          axisLine: {
              lineStyle: {
                  color: '#FFFFFF'
              }
          },
          axisLabel: {
              margin: 10,
              color: '#e2e9ff',
              textStyle: {
                  fontSize: 12
              },
          },
          axisTick: {
              show: false
          }
      }],
      xAxis: [{
          name: "车辆数",
          axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff',
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: true,
              lineStyle: {
                  color: '#FFFFFF'
              }
          },
          splitLine: {
              lineStyle: {
                  color: 'rgba(255,255,255,0.12)'
              }
          }
      }],
      series: [{
          type: 'bar',
          data: [2000,1520,1850,3400,2756],
         
          itemStyle: {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0,244,255,1)' // 0% 处的颜色
                  }, {
                      offset: 1,
                      color: 'rgba(0,77,167,1)' // 100% 处的颜色
                  }], false)
                
              }
          },
          label: {
              normal: {
                  show: true,
                  lineHeight: 10,
                  formatter: '{c}',
                  position: 'right',
                  textStyle: {
                      color: '#00D6F9',
                      fontSize: 12
                  }

              }
          }
      }]
  };
// 仪表盘 半个
var value = 68
var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    {
        offset: 0,
        color: '#2EE5E3',
    },
    {
        offset: 1,
        color: '#385CF7',
    },
]);
option = {
    title:{
       show: true,
       text:"达标完成率",
       left:'50%',
       bottom:'50%',
       textAlign:'center',
       textStyle: {
           color: 'rgba(0,0,0,0.65)',
           fontSize: '1rem',
       },
    },
    series: [
        {
            name: '已到人数',
            type: 'gauge',
            radius: '80%',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,

            title: {
                show: false,
            },
            detail: {
                color:'#1890FF',
                show: true,
                fontFamily: '"Microsoft Yahei","微软雅黑"',
                fontWeight:900,
                fontSize: '5rem',
                offsetCenter:[0,'-30%']
            },
            axisLine: {
                roundCap: true,
                show: true,
                lineStyle: {
                    width: 20,
                    color: [
                        [
                            value/100, color
                        ],
                        [
                            1, 'rgba(225,225,225,0.4)'
                        ]
                    ],
                    // shadowColor: 'rgba(0,138,255,0.35)',
                    // shadowBlur: 5,
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show:false,
                width: 20,
                length: 120,
            },
            itemStyle: {
                color: color,
                shadowColor: 'rgba(0,138,255,0.45)',
                shadowBlur: 10,
                
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
            },
            splitLine: {
                show: false,
                length: 20,
                distance: -20,
                lineStyle: {
                    color: '#fff',
                    width: 1,
                },
            },
            data: [
                {
                    value: 68,
                    name: '达标完成率',
                },
            ],
        },
    ],
}
