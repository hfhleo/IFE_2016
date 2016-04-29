
var data = function(op) {
    
    var titles = [],
        datas = [];
    
    op.content.forEach(function(key, i) {
        titles.push(key.text);
        datas.push(key.pic);
    });
    
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        color:['#42b983'],
        legend: {
            data: [op.title]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: titles
        },
        series: [

            {
                name: op.title,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: datas
            },
            
        ]
    };
    return option;
}

export default data;