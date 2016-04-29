export default{
    times(value) {
        return moment(value).formate('YYYY-MM-DD hh:mm:ss')
    },
    
    cktype(value) {
        var str = value.toLowerCase();
        
        switch(str) {
            case 'radio':
                return '单选题';
                break;
            case 'checkbox':
                return '多选题';
                break;
            case 'textarea':
                return '自定义回答';
                break;
        }
    },
    
}