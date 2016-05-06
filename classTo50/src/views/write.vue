<template>
   
    <div class="contaienr">
       <h3 class="center">{{headTitle}}</h3>
        <ul class="form-list-info" v-for="item in proInfo" track-by="$index">
            <li>
                <h2>{{$index + 1}}:{{item.title}} <em class="must-should" v-if="item.must"><span>*</span></em></h2> 
                <ol v-if=" item.type !== 'textarea' ">
                    <li v-for="list in item.content">
                        <b>{{$index+1}}:{{list.text}}</b>
                        <input 
                        type="{{ item.type }}" 
                        :name="item.title + Date.now()" 
                        v-model="list.chose">
                    </li>
                </ol>
                <ol v-else>
                    <li v-for="list in item.content">
                        <textarea class="trea" cols="70" rows="2" v-model="list.text"></textarea>
                    </li>
                </ol>
            </li>
        </ul>
    </div>
    <div class="container center" v-if="isError">
        <em class="error" >
             <span>*</span>
             <i>你有必填项没有填，请检查下~</i>
         </em>
    </div>
    <div class="container center form-bottom otherp">
        <button class="btn btn-primary" @click="writeEnd">
            填写完毕
        </button>
        <a class="btn btn-default" role="button" v-link="'/'">
            返回列表页
        </a>
    </div>
</template>


<script>
    import store from '../store';
    
    export default{
        data(){
            let serverData = store.fetch();
            return {
                formList:  serverData.formList,
                user: serverData.user,
                allId: serverData.allId,
                proInfo:[],
                headTitle: '',
                isError: false,
            }
        },
        
        
        methods:{
            writeEnd(){
                
                //判断是否必填
                var isMust = true;
                this.proInfo.forEach(function(key, i) {
                    
                    if (key.type == 'textarea') {
                        if (key.must && !key.content[0].text) {
                            isMust = false;
                        }
                    } else {
                        
                        if (key.must) {
                            
                            var o = 0;
                            
                            key.content.forEach(function(val, k) {
                                if (val.chose) {
                                    o++;
                                }
                            });
          
                            if (o == 0) {
                                isMust = false;
                            }
                        }
                    }
                });
                
                
                if (!isMust) {
                    this.isError = true;
                    console.log('没有填好');
                    return false;
                }
                
                this.isError = false;
                // 改变数据
                this.proInfo.forEach(function(key, i) {
                    if (key.type == 'textarea') {
               
                        !key.content[0].text.trim() ? key.content[0].no++ : key.content[0].yes++;
                        
                        key.content[0].text = '';
                    } else {
                        key.content.forEach(function(val, k) {
                            if (val.chose) {
                                val.pic++
                            }
                            val.chose = false;
                        });
                    }
                    
                });
                
                //保存到本地数据库中
                const id = this.$router._currentRoute.params.id;
                
                var self = this;
                this.formList.forEach(function(key, i){
                    if (key.id == id) {
                        key.form = self.proInfo;
                    }
                });
                
                
                store.save({
                    allId: this.allId,
                    user: this.user,
                    formList: this.formList
                })
                
                
                this.$router.go('/');
                
            },
        },
        
        route: {
            data(transition) {
                
                let id = transition.to.params.id;
                let serverData = store.fetch();
                let self = this;
                
                
                this.formList.forEach(function(key, i) {
                    
                    if (key.id == id) {
                        
                        ///@ 如果不是sent就返回首页
                        if (key.state != 'sent'){ 
                            self.$router.go('/');
                            return false;
                        }
                        
                        self.headTitle = key.title;
                        self.proInfo = key.form;
                        
                    } 
                });
            }
        },
    }
    
</script>