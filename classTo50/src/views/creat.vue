<template>
   {{$data.proInfo | json}}
    <div class="container">
       <div class="container form-title">
           <h2>表单名称</h2>
           <span>
               <input class="ipt center" type="text" v-model="headTitle">
           </span>
       </div>
        <ul class="form-list-info" v-for="item in proInfo" track-by="$index">
            <li>
                <h2>{{$index + 1}}:{{item.title}} <em class="must-should" v-if="item.must"><span>*</span></em></h2> 
                <ol v-if=" item.type !== 'textarea' ">
                    <li v-for="list in item.content">
                        <b>{{$index+1}}:{{list.text}}</b>
                        <input type="{{ item.type }}" :name="item.title + Date.now()">
                    </li>
                </ol>
                <ol v-else>
                    <li>
                        <textarea class="trea" cols="70" rows="2"></textarea>
                    </li>
                </ol>
                
                <div class="btn-group">
                    <button class="btn btn-default" @click="delList($index)">
                        删除
                    </button>
                    <button class="btn btn-default" @click="upList($index)">
                        上移
                    </button>
                    <button class="btn btn-default" @click="downList($index)">
                        下移
                    </button>
                    <button class="btn btn-default" @click="copyList($index)">
                        复用
                    </button>
                </div>
            </li>
        </ul>
    </div>
    <div v-for="item in formList.form" :class="item.type">
        <h3>{{item.title}}</h3>
        <ul class="list-unstyled">
            <li v-for="list in item.faq" >
                <label v-if="item.type !== 'textarea'"> 
                    <input type="{{item.type}}" name="{{item.title}}">
                    <span>{{list}}</span>
                </label>
                <label v-else>
                    <textarea v-model="list" style="width:400px; height:120px"></textarea>
                </label>
            </li>
        </ul>
    </div>
    <div class="container form-pro center">
        <h3>选择你的问答类型</h3>
        <div class="checkType">
            <ul>
                <li v-for="type in proType.text">
                    <label>
                        <b>{{ type | cktype}}</b>
                        <span>
                            <input type="radio" name="proType" 
                            @click="changeType(type)">
                        </span>
                    </label>
                </li>
            </ul>
        </div>
        <!-- checkbox or radio -->
        <div class="contentInfo" v-if=" proType.type && proType.type != 'textarea' ">
            <div class="form-pro-title">
                <h4>标题</h4>
                <input class="ipt ipt-s" type="text" v-model=" proType.title ">
            </div>
            <div class="form-pro-info">
                <h6>问题</h6>
                <ul class="form-item">
                    <li v-for="item in proType[proType.type]">
                        <input class="ipt ipt-s" type="text" v-model="item.text">
                        <button class="btn btn-default" @click="delPro($index)">-</button>
                    </li>
                </ul>
            </div>
            <button class="btn btn-primary" @click="addPro">+</button>
        </div>
        
        <!-- textarea -->
        <div class="contentInfo" v-if=" proType.type && proType.type == 'textarea' ">
            <div class="form-pro-title">
                <h4>标题</h4>
                <input class="ipt ipt-s" type="text" v-model="proType.title">
            </div>
        </div>
        
    </div>
    <div class="container form-creat center">
        <button class="btn btn-primary" @click="creat">
            创建问题
        </button>
        <input type="checkbox" v-model="ismust">必填吗？
    </div>
    <div class="container form-data">
        <div class="form-data-info">
            <input type="text" class="ipt" placeholder="YYYY-MM-DD" :value="ymd" @focus="datec.isShow = true;">
            <b>选择结束日期</b>
            <em class="error" v-if="datec.error"><span>*</span><i>选择日期不能晚于当前时间.</i></em>
        </div>
        <date :datec.sync="datec"></date>
    </div>
    <div class="container center form-bottom otherp">
        <button class="btn btn-primary" @click="end" v-if="$route.name == 'creat'">
            问答创建完成
        </button>
        <button class="btn btn-primary" @click="edit" v-else> 
            问答编辑完成
        </button>
        <a class="btn btn-default" @click="changeType('q')" role="button" v-link="'/'">
            返回列表页
        </a>
    </div>
</template>

<script>
    import store from '../store';
    import filter from '../filter';
    import date from '../components/date';
    
    export default{
        data() {
            let serverData = store.fetch();
            
            return {
                formList:  serverData.formList,
                ismust: false,
                datec:{
                    isShow: false,
                    time: '',
                    error: false, 
                    fn(i){
                        var oldTime = Date.now();

                        if (oldTime >= i) {
                            this.time = '';
                            this.error = true;
                        } else {
                            this.error = false;
                        }
                        
                    }
                },
                proInfo: [],
                allId: serverData.allId,
                headTitle:'',
                user: serverData.user, 
                proType:{
                    text:['Checkbox', 'Radio', 'Textarea'],
                    type:'',
                    title:'',
                    checkbox:[],
                    radio:[],
                    textarea:[]
                }
            }  
        },
        
        computed:{
            ymd(){            
                return moment(this.datec.time).formate('YYYY-MM-DD')
            }
        },
        
        watch: {
            formList: {
                deep: true,
                handler() {
                    store.save({
                        allId: this.allId,
                        user: this.user,
                        formList: this.formList
                    })
                }
            },
            
            
        },
        
        filters: filter,
        
        methods: {
            changeType(value) {
                let newVal = value.toLowerCase();
                let data = this.proType;
                data.type = newVal;
                
                data.checkbox = data.textarea = data.radio = [];
                data.title = '';
                this.ismust = false;
            },
            
            addPro() {
                let type = this.proType.type;
                this.proType[type].push({text: '', pic: 0}); 
 
            },
            
            delPro(i) {
                
                let type = this.proType.type;
                this.proType[type].splice(i, 1);
            },
            
            creat() {
                let type = this.proType.type;
                let content;
                
                if (!this.proType.title) return false;
                
                if (this.proInfo.length >= 10) return false;
                
                if(type == 'textarea'){
                    content = [{
                        text: '',
                        yes: 0,
                        no:0
                    }]

                } else {
                    content = this.proType[type];
                }
                
                this.proInfo.push({
                    title: this.proType.title,
                    type: type,
                    must: this.ismust,
                    content: content
                });
                
                //清空
                this.changeType(type)
            },
            
            upList(i) {
                
                let oldData = this.proInfo[i];
                
                this.proInfo.splice(i, 1);
                this.proInfo.splice(i-1, 0, oldData)
                
            },
            
            downList(i) {
                let oldData = this.proInfo[i];
                
                this.proInfo.splice(i, 1);
                this.proInfo.splice(i+1, 0, oldData)
            },
            
            delList(i) {
                this.proInfo.splice(i, 1);
            },
            
            copyList(i) {
                var cl = this.proInfo[i];
                //console.log(this.proInfo)
                this.proInfo.splice(i, 0, cl);
            },
            
            end() {
                
                
                if (!this.headTitle || !this.proInfo || this.datec.error) return false;
                
                if (this.datec.time <= Date.now()) {
                    this.datec.error = true;
                    return false;
                }
                
                this.datec.error = false;
                
                this.allId++; 
                
                this.formList.push({
                    id: this.allId,
                    title: this.headTitle,
                    state: 'draft',
                    end: this.datec.time,
                    now: Date.now(),
                    form: this.proInfo,
                })
                
                this.changeType('no');
                this.headTitle = '';
                
                this.$router.go('/');
            },
            
            edit() {
                
                let self = this;
                
                if (!this.headTitle || !this.proInfo || this.datec.error  ) return false;
                
                if (this.datec.time <= Date.now()) {
                    this.datec.error = true;
                    return false;
                }
                
                this.datec.error = false;
                
          
                this.formList.forEach(function(key, i) {
                    if (key.id == self.$route.params.id) {
                        
                        self.formList.splice(i, 1)
                        self.formList.splice(i, 0, {
                            id: key.id,
                            title: self.headTitle,
                            state: 'draft',
                            end: self.datec.time,
                            now: Date.now(),
                            form: self.proInfo,
                        })
                    }
                })
                
                this.headTitle = '';
                
                this.$router.go('/');
            }
            
        },
        
        route: {
            data(transition) {
                let id = transition.to.params.id;
                let serverData = store.fetch();
                let self = this;
                
                if (!id) {
                    this.proInfo = [];
                    this.headTitle = [];
                    this.time = '';
                    this.proType.type = '';
                    return false;
                }; 
                
                this.formList.forEach(function(key, i) {
                    if (key.id == id) {
                        self.headTitle = key.title;
                        self.proInfo = key.form;
                        self.datec.time = key.end;
                    }
                })
            }
        },
        
        components:{
            date
        }
        
    }
</script>










