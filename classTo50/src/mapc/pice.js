var data = function(op){
    
     var titels = [], 
         datas = [];
    
    op.content.forEach(function(key, i) {
        titels.push(key.text);
        
        datas.push({
            name: key.text,
            value: key.pic
        });
    });
    
    
    var option = {
        color:['#42b983','#52C5FF', '#ff6e5c', '#c08'],    
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:titels
        },
        series: [ 
            {
                name:'投票指数',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: '100'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: datas
            }
        ]
    };
    return option;
}
export default data;