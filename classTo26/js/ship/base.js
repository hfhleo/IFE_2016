/**
	基本方法
**/

define([], function() {
    var _ = {
        getFirst: function(arg) {
            return Array.prototype.shift.call(arg)
        },
        getId: function(IdName) {
            return document.getElementById(IdName);
        },
        getClassFirst: function(className) {
            return document.getElementsByClassName(className)[0];
        },
        each: function(arr, cb) {
            for(var i = 0, len = arr.length; i < len; i++) {
                cb && cb.call(cb, arr[i], i)
            }
        },

        ckecked: function(object, i, value, cb) {
            if (object[i] != value) {
                cb && cb(value)
            }
        },

        findFirstChild: function(par, nodeName) {
            var nodeList = par.getElementsByClassName(nodeName);
            return this.getFirst(nodeList)
        },

        closet: function(node, parNodeName) {
            var par = node,
                name;

            while (par.nodeName.toLowerCase() != parNodeName) {
                par = node.parentNode;
            }
            return par;
        },

        findDom: function(domArg, id) {
            var dom;
            this.each(domArg, function(key, i) {
                if (_.attr(key, 'data-id') == id) {
                    dom = key;
                }
            });
            return dom;
        },

        attr: function(dom, value) {
            return dom.getAttribute(value)
        },
        
        data: function(dom, dataType) {
            return this.attr(dom, 'data-' + dataType)
        }
    };

    return _;
});