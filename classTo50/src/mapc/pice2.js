var data = function(op) {
    
    
    var datas = op.content[0];
    
    var option = {
        color:['#42b983', '#ccc'],
        title : {
            subtext: op.title,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['有效','无效']
        },
        series : [
            {
                name: '类型',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:datas.yes, name:'有效'},
                    {value:datas.no, name:'无效'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    return option;
}

export default data;