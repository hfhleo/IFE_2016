import Vue from 'vue';
import Router from './vue-router.min';  
import App from './components/app';

import List from './views/list';
import Creat from './views/creat';
import See from './views/see';
import Write from './views/write';


Vue.config.debug = true;

Vue.use(Router);

var router = new Router(); 


router.map({
    '/':{
        component: List
    },
    'creat':{
        name:'creat',
        component: Creat
    },
    '/see/:id': {
        name: 'see',  
        component: See
    },
    '/edit/:id': {
        name: 'edit',
        component: Creat
    },
    '/write/:id': {
        name: 'write',
        component: Write
    }
})



router.start(App, '#app');    