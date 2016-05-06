const key = 'Form';

// 虚拟数据
if (!localStorage.getItem(key)) {
    let now = Date.now(); 
    let data = {
        // 登录用户
        user: {
            id: 1,
            name: '我的空间',
            img: 'dist/images/1.jpg'
        }, 
        
        allId: 4,
        
        // 调查列表列表
        formList: [
            
            {
                id: 2,
                title: '示例1',
                state: 'sent', //有三种状态   end：结束 draft:未发布 sent:发布中
                now: now,
                end: now + 1000 * 60 * 60 * 24 * 50,
                form:[
                        {
                            "title":"你写什么类型的 JavaScript?",
                            "type":"checkbox",
                            'must': true,
                            "content":[
                                {
                                    "text":"web端程?",
                                    'pic':'67',
                                },
                                {
                                    "text":"服务端?",
                                    'pic':'2',
                                },
                                {
                                    "text":"Tessel?",
                                    'pic':'70',
                                }
                            ]
                        },
                        {
                            "title":"你写测试吗?",
                            "type":"textarea",
                            'must': false,
                            "content":[{
                                text:"",
                                yes:'80',
                                no: '30',
                            }]
                        }
                    ]
            },
            {
                id: 3,
                title: '示例2',
                state: 'end', //有三种状态   end：结束 draft:未发布 sent:发布中
                now: now,
                end: now - 1000 * 10,
                form:[
                        {
                            "title":"性别",
                            "type":"radio",
                            'must': false,
                            "content":[
                                {
                                    "text":"男",
                                    'pic':'67'
                                },
                                {
                                    "text":"女",
                                    'pic':'30'
                                },
                                
                            ]
                        },
                        {
                            "title":"年级",
                            "type":"radio",
                            'must': true,
                            "content":[
                                {
                                    "text":"大一",
                                    'pic':'67'
                                },
                                {
                                    "text":"大二",
                                    'pic':'30'
                                },
                                {
                                    'text':'大三',
                                    'pic': '20'
                                },
                                {
                                    'text':'大四',
                                    'pic': '9'
                                }
                                
                            ]
                        },
                        {
                            "title":"你喜欢以下什么游戏？",
                            "type":"checkbox",
                            'must': false,
                            "content":[
                                {
                                    "text":"龙之谷",
                                    'pic':'67'
                                },
                                {
                                    "text":"剑灵",
                                    'pic':'79'
                                },
                                {
                                    "text":"穿越火线",
                                    'pic':'30'
                                },
                                {
                                    "text":"魔兽",
                                    'pic':'70'
                                },
                                {
                                    "text":"lol",
                                    'pic':'170'
                                },
                                {
                                    "text":"暗黑3",
                                    'pic':'32'
                                },
                                {
                                    "text":"其他",
                                    'pic':'36'
                                }
                            ]
                        },
                        {
                            "title":"接触网游的原因",
                            "type":"textarea",
                            "must": false,
                            "content":[{ 
                                text:"",
                                yes:'80',
                                no: '30'
                            }]
                        }
                    ]
            },
            {
                id: 4,
                title: '示例3',
                state: 'draft', //有三种状态   end：结束 draft:未发布 sent:发布中
                now: now,
                end: now + 1000 * 60 * 60 * 24 * 50,
                form:[
                        {
                            "title":"您对英雄联盟网站内容的满意程度如何？",
                            "type":"checkbox",
                            'must': true,
                            "content":[
                                {
                                    "text":"满意",
                                    'pic':'0'
                                },
                                {
                                    "text":"一般",
                                    'pic':'0'
                                },
                                {
                                    "text":"不满意",
                                    'pic':'0'
                                }
                            ]
                        },
                        {
                            "title":"对游戏模式有什么想法?",
                            "type":"textarea",
                            'must': false,
                            "content":[{
                                text:"",
                                yes:'0',
                                no: '0'
                            }]
                        }
                    ]
            },
            
        ],
         
        // 查看数据详情
        
        
    };

    localStorage.setItem(key, JSON.stringify(data));
}

export default {
    fetch () {
        return JSON.parse(localStorage.getItem(key));
    },
    
    save (store) {
        localStorage.setItem(key, JSON.stringify(store));
    },
};