/*
    相关命令
*/

define(['ship/log', 'ship/ship', 'ship/base'], function(log, ship, _) {
    
    var order = {
        
        //发射命令
        sendOrder: function(id, orderType) {
            
            this.proxy(id, orderType)
        },
        
        //代理 有可能有丢包的情况
        proxy: function(id, type) {
            var lossPack = Math.round(Math.random() * (9 - 1) + 1);
            
            if (lossPack <= 3) {
                log.getOrder('信息被截断' + id + '号小船未收到指令', 'error')
                return false;
            }
            
            log.getOrder(id + '号小船接收到命令', 'success');
            
            
            setTimeout(function(){
                order.setState(id, type)
            }, 800)
        },
        
        //改变状态
        setState: function(id, type) {
 
            if (ship.stateItems[id] && ship.stateItems[id].state == type) {
                log.getOrder( id + '号小船执行过' + type + '指令了！' , 'warn')
                return false;
            }
            
            log.getOrder(id + '号小船' + type + '指令即将开始施行！', 'default');
            
            if (type != 'creat') {
                var ships = document.getElementsByClassName('ship');
                var el = _.findDom(ships, id);
            } else {
                var el = '';
            }
        
            ship.$set(id, 'state', type, el);
       },
    };
    
    return order;
});
