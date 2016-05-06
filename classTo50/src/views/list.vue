<template>

    <div class="table-content">
       <p>Optional table caption.</p>
        <div class="table-l">
            <table class="table center">
                <thead>
                    <tr>
                        <th height="50">
                            <input 
                                type="checkbox" 
                                @click="clickAll($event)" 
                                :checked="allcheck"
                                :disabled="isdisable">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="check in checks">
                        <td height="45">
                            <input type="checkbox" v-model="check.ck">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-r">
            <table class="table center">
              <thead>
                <tr>
                  <th height="50">ID</th>
                  <th>Title</th>
                  <th>State</th>
                  <th>Satr Time</th>
                  <th>End Time</th>
                  <th>
                      <a class="btn btn-other" v-link="'creat'" role="button">Creat</a> 
                  </th> 
                </tr>
              </thead>
              <tbody>  
                <tr v-for="item in formList">
                  <td height="45">     
                      {{item.id}}
                  </td>
                  <td>{{item.title}}</td>
                  <td>{{item.state}}</td>
                  <td>{{item.now | times }}</td>
                  <td>{{item.end | times }}</td>
                  <td class="tab-btn">
                      <a 
                          class="btn btn-primary"
                          v-link="{name:'see', params:{ id: item.id } }"
                          v-if=" item.state !== 'draft' "  
                          role="button">
                          查看
                      </a>

                      <button 
                         class="btn btn-primary" 
                         v-link="{name:'edit', params:{id: item.id }}" 
                         v-if=" item.state === 'draft' ">
                          编辑
                      </button>

                      <button 
                         class="btn btn-other" 
                         v-if=" item.state === 'draft' " 
                         @click="state($index, item, 'sent')">
                          发表
                      </button>

                      <button 
                         class="btn btn-default" 
                         v-if=" item.state === 'sent' " 
                         @click="state($index, item, 'end')">
                          结束
                      </button>

                      <button 
                         class="btn btn-default" 
                         @click="showPop(item)" 
                         v-if="item.state !== 'sent'">
                          删除
                      </button>
                    
                      <button 
                         class="btn btn-blue"
                         v-link="{name:'write', params:{ id: item.id } }" 
                         v-if="item.state === 'sent'">
                          填写
                      </button>            
                      
                  </td>  
                </tr>
              </tbody>
            </table>
        </div>
    </div>
    <div class="container">
        <button class="btn btn-default" @click="delAll">
            删除
        </button>
         <em class="error" v-if="isError">
             <span>*</span>
             <i>你选的列表中有发布的,请点击结束后再删除，或者取消该选中状态</i>
         </em>
    </div>
    <pop 
        :pop.sync="pop" 
        :form-list.sync="formList" 
        :checks.sync="checks" 
        v-if="pop.isShowPop">
    </pop>
    
</template>


<script>
    import store from '../store';
    import pop from '../components/pop';
    import filter from '../filter';

      
    export default{
        data() { 
            
            let serverData = store.fetch();
            
            return {
                type: 'success',
                user: serverData.user,
                allId: serverData.allId,
                formList: serverData.formList,
                checks:[],
                isError: false,
                pop: {
                    isShowPop: false,
                    msg:'确定要删除吗?',
                    id: []
                }
            }
        },
        
        ready() {
            
            //@初始化选择项目  | 应该有更好的办法的
            this.update();
        },
        
        //@计算是否被全部选中
        computed:{
            allcheck() {
                var i = 0;
                var len = this.checks.length;
                
                var result;
                this.checks.forEach(function(key, k){
                    if(key.ck) {
                        i++
                    }
                    if (i == len) result = true;
                });
                
                return result;
                
            }
        },
        
        methods: {
            
            update(){ 
                //@初始化选择项目  | 应该有更好的办法的
                var self = this;
                this.checks = [];
                this.formList.forEach(function(key, i) {
                    self.checks.push({
                        id: key.id,
                        ck: false,
                        state: key.state
                    })
                })
            },
            //@是否删除
            showPop(item) {
                
                if(!Array.isArray(item)){
                    this.pop.id = [item.id];
                } else {
                    this.pop.id = item;
                }
                 
                this.pop.isShowPop = true;  
            },
            
            //@更改状态
            state(i, item, state) {
                this.formList[i].state = state;
                this.update();
            },
            
            //@选择全部和取消    | -应该有更好的办法的
            clickAll(ev) {
                var elCk = ev.srcElement.checked;
                var self = this;
                self.pop.id = [];
                
                if(elCk) {
                    
                    this.checks.forEach(function(key, i){
                        key.ck = true;
                        self.pop.id.push(key.id)
                    })
                    
                } else{
                    
                    this.checks.forEach(function(key, i){
                        key.ck = false;
                    })
                }
                
            },
            
            //@选择性删除
            delAll() {
                var idArr = [];
                var self = this;
                
                this.isError = false;
                
                this.checks.forEach(function(key, i) {
                    if (key.ck) {
                        idArr.push(key.id)
                        
                        //@检测是否有发布中的列表
                        if (key.state == 'sent') {
                           self.isError  = true;
                        }
                    }
                });

                if (idArr.length == 0 || this.isError) return false;
                
                
                this.showPop(idArr);
            }
            
        },
        
        //监听formList数据是否变化，如果变化则保存在本地数据库中
        watch: {
            formList: {
                deep: true,
                
                //@：个人理解：检测发生变动后的回调函数
                handler() {
                    
                    //@检测是否已经结束文件调查时间
                    this.formList.forEach(function(key, i) {
                        if (key.end <= key.now) {
                            key.state = 'end'
                        }
                    });
                    
                    //@保存数据
                    store.save({
                        allId: this.allId,
                        user: this.user,
                        formList: this.formList
                    })
                }
            }
        },
        
        filters: filter,
        
        //@路由检测数据是否一样， 不一样更新   |  -应该有更好的办法
        route:{
            data(transition) {
                let serverData = store.fetch();
            
                if (serverData.formList != this.formList) {
                    this.formList = serverData.formList;
                }
                
                if(serverData.allId != this.allId) {
                    this.allId = serverData.allId
                }
                
                
                this.update();
            }
        },
        
        components: {
            pop
        }
        
    }
    
</script>