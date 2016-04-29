
<template>
    <div>
        <navt :user="user"></navt>
        <div class="container"> 
            <router-view keep-alive></router-view>       
        </div>
    </div>
</template>
 

<script>
    import store from '../store';
    import navt from '../components/nav'; 
    
    export default{ 
        data() {
            let serverData = store.fetch();
            
            return {
                user: serverData.user,
            }
        },
        
        components: {
            navt   
        }
    }
    
    
</script>