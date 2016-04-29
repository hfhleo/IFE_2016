<template id="tem-ui-date">
        <div class="ui-date" v-if="datec.isShow">
            <div class="ui-date-head">
                <b class="ui-data-pre" @click="change('-')"></b>
                <b class="ui-data-next" @click="change('+')"></b>

                <div class="ui-data-select ui-year" 
                   :class="[slider.year? 'active': '']" >
                    <div class="data-hd">
                        <b class="data-icon" @click="active('year')"></b>
                        <span>{{date.year}}</span>
                    </div>
                    <div class="data-bd">
                        <ul>
                            <li v-for="year in years" 
                                track-by="$index" 
                                @click="changeDay(year, '')">
                                <a href="javascript:;">{{year}}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="ui-data-select ui-month" 
                   :class="[slider.month? 'active': '']" >
                    <div class="data-hd">
                        <b class="data-icon" @click="active('month')"></b>
                        <span>{{date.month}}</span> 
                    </div>
                    <div class="data-bd">
                        <ul>
                            <li v-for="month in months" 
                                track-by="$index" 
                                @click="changeDay('', month)">
                                <a href="javascript:;">{{month}}</a></li>  
                        </ul>
                    </div>
                </div>

            </div>
            <div class="ui-date-title"> 
                <ul>
                    <li v-for="week in weeks">{{week}}</li>
                </ul>
            </div>
            <div class="ui-date-body" id="j-data-day"> 
                <ul class="clearfix">
                    <li v-for="day in days"  track-by="$index" :class="[day == date.day? 'active': '']">
                        <a href="javascript:;" @click="chengeOther(day)">{{day}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </template>


<script>
/*
    添加数据
*/

var data = {
    weeks:['日', '一', '二', '三', '四', '五', '六'],
    date: {
        year: moment().year,
        month: moment().month,
        day: moment().day
    },
    slider: {
        year: false,
        month: false
    },
    months: _month(),
    years: _yearTem(),
    days: _day(),
}

function _yearTem() {
    var nowYear = moment().year;
     
    var arr = [];
    
    for (var i = (nowYear-30); i < nowYear; i++) {
        arr.push(i)
    }
    
    for (var k = nowYear; k < (nowYear+30); k++) {
        arr.push(i)
    }
    return arr;
};

function _month() {
    var arr = [];
    for(var i = 0; i < 12; i++) {
        arr.push((i+1))
    }
    return arr;
}; 

function _day(time) {
    var time = time || +Date.now();
    var date = moment(time);
    var dayAll = date.getDay + 1;
    var day = date.day;
    
    var posTime = date.formate('YYYY-MM') + '-01'; 
    var pos = new Date(posTime).getDay();
    
    var arr = [];
    
    for (var i = 0; i < pos; i++) {
        arr.push('')
    }

    for (var i = 1; i < dayAll; i++) {
        arr.push(i)
    }
    
    return arr;
}

/*
    定义组件
*/

export default{

    props:['datec'],
    
    data: function() {
        
        return data;
    },
    
    ready() {
        var das = this.datec.time;
        if (!das) return false;
        
        var newDate = moment(das);
        
        this.date = {
            year: newDate.year,
            month: newDate.month,
            day: newDate.day
        }
        
    },
    
    methods: {
        
        //改变下拉状态
        active: function(state) {
            this.$data.slider[state] = !this.$data.slider[state];
        },
        
        //上下点击变换
        change: function(type) {
            
            var data = this.$data.date; 
            if (type == '-') {
                data.month--;
                if (data.month < 1) {
                    data.month = 12;
                    data.year--
                }
            } else {
                data.month++;
                if (data.month > 12) {
                    data.month = 1;
                    data.year++
                }
            }
            
            //注入
            this.render(data.year + '-' + data.month + '-1');
        },
        
        //点击年月变换日期
        changeDay: function(year, month) {
            
            var year = year || this.date.year;
            var month = month || this.date.month;
            
            this.$data.date.year = year;
            this.$data.date.month = month;
            
            this.render(year + '-' + month + '-1');
            
            this.sliderUp();
        },
        
        //改变日程 传递消息给实例
        chengeOther: function(num) {
            this.$data.date.day = num;
            var day = this.date.year + '-' + this.date.month + '-' + this.date.day;
            var value = moment().analysis(day);
            this.datec.time = value;
            this.datec.fn && this.datec.fn(value);
            this.datec.isShow = false;
        },
        
        //下拉关闭
        sliderUp: function() {
            this.$data.slider.year = this.$data.slider.month = false;
        },
        
        //重新注入
        render: function(str) {
            return false;
            this.date.day = 1;
            var time = moment().analysis(str);
            this.days = _day(time)
        }
    }
}

</script>