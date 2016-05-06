<template>
<div class="pop-mark" @click="close"></div>
<div class="modal-content">
    <div class="modal-header">
        <span @click="close">×</span>
        <h4 class="modal-title" id="gridModalLabel">提示：</h4>
    </div>
    <div class="modal-body">
        <div class="col-md-4">{{pop.msg}}</div>
    </div>
    <div class="modal-footer center">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="del">删除</button>
    </div>
</div>
</template>


<script>
    export default{
        props:['pop', 'formList', 'checks'],
        methods: {
            
            del(){
                var self = this;
                var formList = this.formList;
                var checks = this.checks;
                var popId = this.pop.id;
                
                for(var i = 0; i < formList.length; i++) {
                    
                    for(var k = 0; k < popId.length; k++) {
                        
                        if(popId[k] == formList[i].id) {
                            formList.splice(i, 1);
                            checks.splice(i,1);
                        };
                        
                    }
                    
                };
                
                
                this.close();
                 
            },
            
            close() {
                this.pop.id = [];
                this.pop.isShowPop = false
            }
        }
    }
</script>


<style lang="less">

    .modal-transition{
        transition: all .3s ease;
    }
    .modal-enter, .modal-leave {
      opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
</style>