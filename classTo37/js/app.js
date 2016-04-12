/*
    基本方法
*/
var _ = {
    getId: function(id) {
        return document.getElementById(id)
    },
    
    css: function(obj, json) {
        for(var i in json) {
            obj.style[i] = json[i] + 'px'
        }
    },
    
    addClass: function(obj, className) {
        var oldName = obj.className;
        obj.className = oldName + ' ' + className;
    },
    
    creatNode: function(elType) {
        return document.createElement(elType);
    },
    
    findClass: function(par, className) {
        var par = par || document;
        return par.getElementsByClassName(className)[0];
    }
}
/*
    定义ui主要内容
    
    
    width | height => {number}
    drag | resize => {bl}
    
*/


var ui_pop = function(op) {
    
    this.width = op.width || 400;
    this.height = op.height || 220;
    this.isDrag = op.drag || false;
    this.resize = op.resize || false;
    this.title = op.title || 'title';

};

ui_pop.prototype = {
        
    show: function() {
        if (!_.findClass('', 'ui_pop_war')) {
            this.template();
        }
        
        this.drag();
    },

    close:function() {
        var bg = _.findClass('', 'ui_pop_bg');
        var war = _.findClass('', 'ui_pop_war');
        var body = document.getElementsByTagName('body')[0];

        body.removeChild(bg);
        body.removeChild(war);
        
    },

    drag: function() {
        if (!this.isDrag) return false;
        
        var title = _.findClass('','ui_pop_title'),
            war = _.findClass('', 'ui_pop_war'),
            posX,
            posY,
            m_width = this.width/2,
            m_height = this.height/2;
        
        title.onmousedown = function(ev) {
            
            var ev = ev || event;
            
            posX = ev.clientX - parseInt(war.offsetLeft);
            posY = ev.clientY - parseInt(war.offsetTop);
            document.onmousemove = function(ev) {
                _move(ev)
            };
            
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
        
        function _move(ev) {
            var ev  = ev || event;

            var x = ev.clientX - posX + m_width;
            var y = ev.clientY - posY + m_height;

            war.style.left = x + 'px';
            war.style.top = y + 'px';
            
        }
        
        
    },

    template: function() {
        var bg = _.creatNode('div');
        var war = _.creatNode('div');
        console.log(this)
        var contentHtml = '<div class="ui_pop_close">x</div><div class="ui_pop_title">'+ this.title +'</div><div class="ui_pop_content"></div>'

        //添加class和样式

        _.addClass(war, 'ui_pop_war');
        _.addClass(bg, 'ui_pop_bg');
        _.css( war, {
            width: this.width,
            height: this.height,
            'marginLeft': (-this.width/2),
            'marginTop': (-this.height/2)
        });

        //组装
        war.innerHTML = contentHtml;

        //添加事件
        _.findClass(war, 'ui_pop_close').onclick = this.close;
        bg.onclick = this.close;

        //插入dom
        document.getElementsByTagName('body')[0].appendChild(bg);
        document.getElementsByTagName('body')[0].appendChild(war);
        
    }
};













