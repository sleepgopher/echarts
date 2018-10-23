// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
option = {
    title: {
        text: '豆瓣电影top250 (numberOfPeoples(1代表10000))'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['scores','numberOfPeoples',]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        // verticalAlign: top,
        data: ['豆瓣电影top250 numberOfPeoples(1代表10000)']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'scores',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'numberOfPeoples',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        }
    ]
}

var ajax = function(method, path, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    // 发送请求
    r.send(data)
}
var __main = function() {
    ajax('GET', '/douban/all', '', function(r){
        // console.log(r.response)
        var response = JSON.parse(r.response)
        option.xAxis.data = response.names
        console.log(response.names)
        option.series[0].data = response.scores
        option.series[1].data = response.numberOfPeoples
        // console.log(option.xAxis.data)
        myChart.setOption(option)

    })
}
__main()

// 使用刚指定的配置项和数据显示图表。
