<template>
<div class="pop-mark" @click="close"></div>
<div class="modal-content">
    <div class="modal-header">
        <span @click="close">×</span>
        <h4 class="modal-title" id="gridModalLabel">提示：</h4>
    </div>
    <div class="modal-body">
        <div class="col-md-4">你确定要删除吗？</div>
    </div>
    <div class="modal-footer center">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="del">删除</button>
    </div>
</div>
</template>


<script>
    export default{
        props:['pop', 'formList'],
        methods: {
            
            del(){
                var self = this;
              
                this.formList.forEach(function(key, i) {
                    
                    if (self.pop.id == key.id) {
                        self.formList.splice(i, 1)
                    }
                     
                })
                
                this.close();
                 
            },
            
            close() {
                this.pop.id = 0;
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