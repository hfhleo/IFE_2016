var ui_date = function(el, op) {

    //初始化参数
    var initDate = moment().analysis(op.date) || moment().getTime;
    
    //内部工具
    var _ = {};
    
    //工具库
    var $ = {
        
        shift: function(obj) {
            return Array.prototype.shift(obj);
        },
        
        each: function(arr, fn) {
            for (var i = 0; i < arr.length; i++) {
                fn.call(arr[i], arr[i], i)
            }
        },
        
        findClass: function(cname, par) {
            var par = par || document;
            return par.getElementsByClassName(cname)[0]
        },
        
        getId: function(id, par) {
            var par = par || document;
            return par.getElementById(id);
        },
        
        getTag: function(tag, par) {
            var par = par || document;
            return par.getElementsByTagName(tag)[0];
        },
        
        creatDom: function(dom) {
            return document.createElement(dom)
        },
         
        on: function(obj, tag, method, cb) {
            obj.addEventListener(method, _fn, false);

            function _fn(ev) {
                var ev = ev || window.event;
                var target = ev.target;

                if (target.nodeName.toLowerCase() != tag) return false;

                cb.call(target);

            }
        },
        removeT:  function(obj, tag, method, cb) {
            obj.removeEventListener(method, _fn, false);

            function _fn(ev) {
                var ev = ev || window.event;
                var target = ev.target;

                if (target.nodeName.toLowerCase() != tag) return false;

                cb.call(target);

            }
        },
        
    }; 
    
    //pos 位置相关
    var elX = el.offsetLeft;
    var elY = el.offsetTop;
    
    //dom初始化
    var dateTem = $.getId(op.template).innerHTML;
    var box = $.creatDom('div');
    box.className = 'ui-date';
    box.style.left = elX + 'px';
    box.style.top = elY + el.outerHeight + 'px';
    box.innerHTML = dateTem;
    
    el.value = moment(initDate).formate('YYYY-MM-DD');
    //拼接dom

    var monthBox = _getS('ul', 'ui-month');
    var weekBox = _getS('ul', 'ui-date-title');
    var yearBox = _getS('ul', 'ui-year');
    var dayBox = _getS('ul', 'ui-date-body');
    
    //初始信息
    var yearS = _getS('span', 'ui-year');
    var monthS = _getS('span', 'ui-month');
    
    
    //下拉按钮dom
    var yearDown = _getS('b', 'ui-year');
    var monthDown = _getS('b', 'ui-month');
    
    //上下按钮dom
    var pre = $.findClass('ui-data-pre', box);
    var next = $.findClass('ui-data-next', box);
    
    //选择框
    var selectBox = box.getElementsByClassName('ui-data-select');
    
    function _getS(tag, csname) {
        return $.getTag(tag, $.findClass(csname, box));
    }
    
    //日期处理
    _.date = {
        weekType: ['日', '一', '二', '三', '四', '五', '六'],
        
    };
    
    //模板
    _.template = {
        render: function() {
            weekBox.innerHTML = _.template.weekTem();
            monthBox.innerHTML = _.template.monthTem();
            _.template.yearTem(yearBox);
            _.template.dayTem(dayBox);
            _.template.msg();
            
            document.body.appendChild(box) 
        },
        
        init: function(time, no) {
            var year = moment(time).year;
            
            _.template.dayTem(dayBox, time, no);
            _.template.yearTem(yearBox, year);
            _.template.msg(time);
        },
        
        msg: function(time) {
            var date = time && moment(time) || moment(initDate);
            
            yearS.innerHTML = date.year;
            monthS.innerHTML = date.month;
        },
        
        //不变的
        weekTem: function() {
            var tem = '';
            
            $.each(_.date.weekType, function(key) {
                tem += '<li>'+ key +'</li>'
            })
            
            return tem;
        },
        
        monthTem: function(obj) {
            var tem = '';
            
            for (var i = 1; i < 13; i++) {
                tem += '<li><a href="javascript:;">'+ i +'</a></li>'
            }
            return tem;
        },
        
        //默认60年间上下
        yearTem: function(obj, year) {
            var nowYear = year || moment(initDate).year;
            var tem = '';
            for (var i = nowYear + 30; i > (nowYear - 30); i--) {
                tem += '<li><a href="javascript:;">'+ i +'</a></li>'
            }
            obj.innerHTML =  tem;
        },
        
        //日
        dayTem: function(el, date, no) {

            var date = date && moment(date) || moment(initDate);
            var dayAll = date.getDay + 1;
            var day = date.day;
   
            //判断位置
            var posTime = date.formate('YYYY-MM') + '-01'; 
            var pos = new Date(posTime).getDay();
            
            var tem = '',
                tem2 = '';
            
            for (var i = 0; i < pos; i++) {
                tem += '<li></li>'
            }
            
            for (var i = 1; i < dayAll; i++) {
                if (i == day && !no) {
                    tem2 += '<li class="active"><a href="javascript:;">'+ i +'</a></li>' 
                } else {
                    tem2 += '<li><a href="javascript:;">'+ i +'</a></li>'
                }
            }
            
            el.innerHTML = (tem + tem2);
            
        }
    };
    
    //事件
    _.event = {
        init: function() {
            this.select();
            this.click();
            this.focus();
        },
        click: function() {
            
            pre.onclick = function() {
                _getDate('-')
            };
            
            next.onclick = function() {
                _getDate('+')
            };
            
            function _getDate(type) {
                var year = Number(yearS.innerHTML);
                var month = Number(monthS.innerHTML);

                if (type == '-') {
                    month = month - 1;
                    if (month < 1) {
                        month = 12;
                        year--
                    }
                } else {
                    month = month + 1;
                    console.log(month)
                    if (month > 12) {
                        month = 1;
                        year++
                    }
                }
               
                var time = moment().analysis(year + '-' + month + '-1');
                
                _.template.init(time, 'no');
            }
            
            //点击日期
            $.removeT(dayBox, 'a', 'click', _fn)
            $.on(dayBox, 'a', 'click', _fn)
                 
                 
            function _fn(){
                    var day = this.innerHTML;
                    var year = yearS.innerHTML;
                    var month = monthS.innerHTML;
                    var date = year + '-' + addZero(month) + '-' + addZero(day);
                    //var time =  moment().analysis(date);
                    //_.template.init(time);
                    var liAll = dayBox.getElementsByTagName('li');

                    $.each(liAll, function(key, i) {

                        (function(el){
                            if (el.childNodes[0] && el.children[0].innerHTML == day) {

                                el.className += ' active'
                            } else {
                                el.className = el.className.replace(/active/, '');
                            }
                        })(key)
                    })



                    el.value = date;

                    op.complete && op.complete(date)

                    _.event.blur();

                    function addZero(n) {
                        return n < 10? '0' + n:n;
                    }
            }     
            
        },
        select: function() {
            var rg = /active/;
            
            yearDown.onclick = _click;
            
            monthDown.onclick = _click;
            
            $.on(yearBox, 'a', 'click', function(){
                var year = this.innerHTML;
                _active(year);
            });
            $.on(monthBox, 'a', 'click', function(){
                var month = this.innerHTML;
                _active('', month);
            });
            // time, no
            
            function _click(ev) {
                ev.preventDefault();

                var parnode = this.parentNode.parentNode;
                if (rg.test(parnode.className)) {
                    parnode.className = parnode.className.replace(rg, '')
                } else {
                    parnode.className += ' active';
                }
            }
            function _active(year, month) {
                var year = year || yearS.innerHTML;
                var month = month || monthS.innerHTML;
                
                var time = moment().analysis(year + '-' + month + '-1');
                _.template.init(time, 'no');
         
                $.each(selectBox, function(key) {
                    key.className = key.className.replace(rg, '')
                });
                
            }
        },
        focus: function() {
            el.onfocus = function() {
                var time = moment().analysis(this.value)
                _.template.render();
                _.template.init(time) 
                box.style.display = 'block'
            }
        },
        blur: function() {
            //var data = $.findClass('ui-date');
            box.style.display = 'none'
        },
        
    };
    
    (function(){
        _.event.init();
    })()
    
};



