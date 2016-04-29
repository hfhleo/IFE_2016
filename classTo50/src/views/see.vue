<template>
    <div class="container seeBox center">
        <div data-map="{{item.type}}" v-for="item in formList.form">
            <h3>{{item.title}}</h3>
            <div class="mapBox" id="{{'map' + $index}}" v-map="item">
            </div>    
        </div>
    </div>
    <div class="container form-bottom center">
        <a class="btn btn-primary" v-link="'/'">
            返回 
        </a>
    </div>
</template>


<script>
    
    import store from '../store';
    import filter from '../filter';
    import vload from '../vLoad.js'; 
    
    export default{ 
        data() {
            return {
                formList: {}
            }
        },
        route: {
            data (transition) {
                let id = transition.to.params.id;
                let data = store.fetch().formList;
                
                var self = this;
                
                data.forEach(function(key, i) {
                    if (key.id == id) {
                        self.$data.formList = key;
                    }
                })
            }
        },
        
        filters: filter
    }
    
    
</script>