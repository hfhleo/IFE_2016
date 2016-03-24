require(['./ship/order', './ship/base'], function(order, _) {
    
    var orderS = _.getClassFirst('user-console');

    orderS.addEventListener('click', _fn, false);
    
    function _fn(ev) {
        var ev  = window.event || ev;
        
        var target = ev.target;

        if (target.nodeName.toLowerCase() !== 'button') return false;
        
        var $par = _.closet(target, 'div');
        var $id = _.data($par, 'id');
        var $type = _.data(target, 'type');
        
        
        order.sendOrder($id, $type);
        
    };
    
    
})