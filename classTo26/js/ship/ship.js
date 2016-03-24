/**
	小船的基本信息
**/
define(['ship/base'], function(_) {
    var ship = {
    
        //储存状态
        stateItems:[],

        //定时器管理
        timer: [],
        

        //判断属性变化然后做出相应的回调
        $set: function(id, key, i, el) {
            console.log(key)
            if(i == 'creat') {
                this.creat(id)
            } else {
                if (this.stateItems[id][key] !== i) {
                    this.stateItems[id][key] = i;
                    this[i](id, el);
                }
            }
        },

        //飞行状态改变其位置
        fly: function(id, el) {
            var self = this;
            var id = Number(id); 
            var r;
  
            switch (id) {
                case 0:
                    r = 180;
                    break;
                case 1:
                    r = 230;
                    break;
                case 2:
                    r = 275;
                    break;
                case 3:
                    r = 320;
                    break;
            }
            
            var radiusBox = _.getClassFirst('spaceAdd');
            
            var x = radiusBox.offsetLeft + 140 - 33;
            var y = radiusBox.offsetTop + 140 - 33;
            console.log(id)
            clearInterval(this.timer[id])
            
            this.timer[id] = setInterval(function(){
        
                var a = Math.sin(self.stateItems[id].deg * Math.PI / 180) * r;
                var b = Math.cos(self.stateItems[id].deg * Math.PI / 180) * r ;
                
                self.powerAbout(id, el, 'fly');
                
                el.style.left = x + a + 'px';
                el.style.top = y + b + 'px';
                
                self.stateItems[id].deg++;
                
                
            }, this.stateItems[id].speed);
        },

        //停止
        stop: function(id, el) {
            clearInterval(this.timer[id]);
            this.timer[id] = setInterval(function(){
                this.powerAbout(id, el, 'stop');
            }.bind(this), 500)
        },

        //创建
        creat: function(id) {
            var road = document.getElementsByClassName('ship-road' + id)[0];
            var view = _.getClassFirst('game-stage');
            
            this.stateItems[id] = {state: 'creat', power: 100, speed: 40, deg: 180};
            
            this.setButton(id, false);
            
            //定位小船位子
            var y = road.offsetTop - 33;
            var x = road.offsetLeft + (road.clientWidth + 1)/2 - 33;
            
            view.appendChild(this.template(id, x, y));
            
        },

        //销毁
        destroy: function(id, el) {
            
            el.parentNode.removeChild(el);
            ship.stateItems[id] = {};
            
            this.setButton(id, true);
            
        },
        
        //能源相关
        powerAbout: function(id, el, type) {
            //运动消耗
            if (type == 'fly') {
                
                if (this.stateItems[id].power <= 0) {
                    this.stateItems[id].power = 0
                    this.stop(id, el);
                }
                
                this.stateItems[id].power -= 0.1
                
            } else {
            //停止, 加油
                
                if (this.stateItems[id].power >= 99) {
                    this.stateItems[id].power = 100
                } else {
                    
                    this.stateItems[id].power += 2
                }
            }
            
            var powerBox = el.getElementsByClassName('powerBox')[0];
            var power = el.getElementsByClassName('power')[0];
            power.innerHTML = parseInt(this.stateItems[id].power) + '%';
            powerBox.style.top = (100 - this.stateItems[id].power) + '%';
        },
        
        //初始模板
        template: function(id, x, y) {
            var d = document.createElement('div');
            
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            d.className = 'ship';
            d.setAttribute('data-id', id);
            
            d.innerHTML = '<div class="powerBox" style="top:'+ (100 - ship.stateItems[id].power) +'%"></div><span class="name">'+ id +'号航舰</span><br /><span class="power">'+ ship.stateItems[id].power +'% </span>';
            
            return d;
        },
        
        //改变按钮状态
        setButton: function(id, bl) {
            var box = document.getElementsByClassName('item')[id];
            
            var button = box.getElementsByClassName('default');
            var creatBt = box.getElementsByClassName('blue')[0];
            
            creatBt.disabled = !bl;
            _.each(button, function(key, i) {
                key.disabled = bl;
            })
        }
    };
    
    return ship;
});
