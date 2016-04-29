<template> 
    <table class="table center">
      <caption>Optional table caption.</caption>
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
          <td height="45">{{item.id}}</th>
          <td>{{item.title}}</td>
          <td>{{item.state}}</td>
          <td>{{item.now | times }}</td>
          <td>{{item.end | times }}</td>
          <td>
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
                 @click="sents($index, item)">
                  发表
              </button>
              
              <button 
                 class="btn btn-default" 
                 @click="showPop(item)" 
                 v-if="item.state !== 'sent'">
                  删除
              </button>
               
          </td>  
        </tr>
      </tbody>
    </table>
    
    <pop :pop.sync="pop" :form-list.sync="formList" v-if="pop.isShowPop"></pop>
    
</template>


<script>
    import store from '../store';
    import pop from '../components/pop';
    import filter from '../filter';
     
    export default{
        data() { 
            
            let serverData = store.fetch();
            
            return {
                user: serverData.user,
                allId: serverData.allId,
                formList: serverData.formList,
                pop: {
                    isShowPop: false,
                    id: 0
                }
            }
        },
        
        methods: {
            showPop(item) {
                this.pop.id = item.id; 
                this.pop.isShowPop = true;  
            },
            sents(i, item) {
                this.formList[i].state = 'sent';
            }
        },
        
        watch: {
            formList: {
                deep: true,
                handler() {
                    
                    //检测时否已经结束
                    this.formList.forEach(function(key, i) {
                        if (key.end <= key.now) {
                            key.state = 'end'
                        }
                    });
                    
                    
                    store.save({
                        allId: this.allId,
                        user: this.user,
                        formList: this.formList
                    })
                }
            }
        },
        
        filters: filter,
        
        route:{
            data(transition) {
                let serverData = store.fetch().formList;
            
                if (serverData != this.formList) {
                    this.formList = serverData;
                }
                
            }
        },
        
        components: {
            pop
        }
        
    }
    
</script>