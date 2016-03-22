/*
    封装一些方法和工具
*/
var _ = {
    getId: function(idName) {
        return document.getElementById(idName)
    },
    
    find: function(object) {
        
    },
    
    on: function(parent, child, method, fn) {
        parent.attachEvents(method, _fn, method);
        
        function _fn() {
            
        };
        
    },
    
    each: function(arr, fn) {
        for(var i = 0, len = arr.length; i < len; i++) {
            fn && fn.call(fn, arr[i], i)
        }
    },
    
    getTime: function() {
        var dateNameArr = ['getHours', 'getMinutes', 'getSeconds'];
        var date = new Date(),
            dateArr = [];
        _.each(dateNameArr, function(key, i) {
            dateArr.push(date[key]())
        })
        return dateArr.join(':');
    }
};

/*
    控制台
*/

var consoles = {
    /*
        指令有三种颜色
        绿色： 成功
        红色： 失败
        黄色： 警告
        普通： 灰黑
    */
    getMsg: function(msg, type) {
        
        var color = {
            success: '#0DAD16',
            error: '#CE331F',
            warn: '#BDB402',
            default: '#343434'
        };
        
        var str = '<p style="color:'+ color[type] +'">'+ _.getTime() + ' ' + msg +'</p>';
        
        this.sendMsg(str) 
    },
    
    sendMsg: function(msg) {
        var box = _.getId('msg');
        box.innerHTML = msg + box.innerHTML
    }
    
};

/*
    中间代理
*/

var proxy = {
    
    /*
        不管任何命令 都有可能丢包  丢包率在 30%之间
        在一定时间内没有回应 会回接收到命令失败
    */
    loss: function(fn, msg) {
        
        var packLoss = Math.round(Math.random() * (3 - 1) + 1);
        
        if (packLoss === 1) {
            //丢包了
            consoles.getMsg('信息被截断！','error');
            return false;
        }
        
        //成功了
        consoles.getMsg('信息成功接收，即将按照指令执行', 'success');
        
        setTimeout(function() {
            fn();
            consoles.getMsg(msg, 'default');
        }, 500);
    },
};

/**
    航舰相关
**/


var ship = {
    shipId: 0,
    
    shipInit: function() {
        //初始化航舰状态
        
        var initState = {
            id: this.shipId,
            state: 'creatIng',
            getOrder: null,
            power: 100
        };
            
        return initState;
    },
            
    shipItem: [],
};

/*
    指令相关
*/

var order = {
    creatShip: function() { 
        
        var shipMsg = ship.shipInit();
        
        shipMsg.state = 'creat';
        
        ship.shipItem.push(shipMsg);
   
    },
    
    setState: function() {},
    
    template: function(msg) {
        return '<div class="ship"><div class="powerBox" style="'+ msg.power +'"> </div><span class="name">'+ msg.id +'号航舰</span><span class="power">'+ msg.power +'%</span></div>'
    }
};
        
        
(function() {
    
    // 创建非床
    _.getId('creat').onclick = function() {
        proxy.loss(order.creatShip, '创建成功')
    };
    
})();