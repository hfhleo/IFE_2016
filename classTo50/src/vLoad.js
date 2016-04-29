import echarts from './echarts.common.min';

//地图配置
import liner from './mapc/liner';
import pice from './mapc/pice';
import pice2 from './mapc/pice2';

Vue.directive('map', function(value) {
   
   setTimeout(function(){
       
       var dom = echarts.init(this.el);

       switch(value.type) {
           case 'checkbox':
               dom.setOption(liner(value));
               break;
           case 'radio':
               dom.setOption(pice(value));  
               break;
           case 'textarea':
               dom.setOption(pice2(value));
               break;
       }
       
       
       
   }.bind(this), 300)
   
})