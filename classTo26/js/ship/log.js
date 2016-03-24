/*
    控制台输出
*/

define(['ship/base'], function(_) {
    var log = {
    
        color: {
            'default': '#343434',
            'success': 'green',
            'error': 'red',
            'warn': '#9C9C91'
        },
        
        //时间
        getTime: function() {
            var date = new Date();
            var dateArr = ['getHours', 'getMinutes', 'getSeconds'];
            var arr = [];
            
            _.each(dateArr, function(key, i) {
                arr.push(date[key]())
            });
            
            return arr.join(':') + ' ';
        },
        
        //消息盒子
        box: function() {
            return _.getId('msg');
        },
        
        //输出消息
        getOrder: function(msg, type) {
            var template = '<p style="color:'+ this.color[type] +'">'+ this.getTime() + msg +'</p>';
            this.box().innerHTML = template + this.box().innerHTML;
        },

    };
    
    return log
})