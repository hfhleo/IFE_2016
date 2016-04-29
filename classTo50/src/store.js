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
                title: '示例介绍1', 
                state: 'draft', //有三种状态   end：结束 draft:未发布 sent:发布中
                now: now,
                end: now + 1000 * 60 * 60 * 24 * 50,
                form:[
                        {
                            "title":"meiki",
                            "type":"checkbox",
                            "content":[
                                {
                                    "text":"problr for 1",
                                    'pic':'15'
                                },
                                {
                                    "text":"problr for 2",
                                    'pic':'45'
                                },
                                {
                                    "text":"problr for 3",
                                    'pic':'6'
                                }
                            ]
                        },
                        {
                            "title":"loki",
                            "type":"radio",
                            "content":[
                                {
                                    "text":"proLife for 1",
                                    'pic':'80'
                                },
                                {
                                    "text":"proLife for 2",
                                    'pic':'15'
                                },
                                {
                                    "text":"proLife for 3",
                                    'pic':'66'
                                }
                            ]
                        }
                    ]
            },
            {
                id: 3,
                title: '示例介绍2',
                state: 'draft', //有三种状态   end：结束 draft:未发布 sent:发布中
                now: now,
                end: now + 1000 * 60 * 60 * 24 * 50,
                form:[
                        {
                            "title":"oop",
                            "type":"checkbox",
                            "content":[
                                {
                                    "text":"opp js?",
                                    'pic':'67'
                                },
                                {
                                    "text":"oop java?",
                                    'pic':'2'
                                },
                                {
                                    "text":"oop ruby?",
                                    'pic':'70'
                                }
                            ]
                        },
                        {
                            "title":"oop for python?",
                            "type":"textarea",
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
                title: '网络游戏报告',
                state: 'sent', //有三种状态   end：结束 draft:未发布 sent:发布中
                now: now,
                end: now + 1000 * 60 * 60 * 24 * 50,
                form:[
                        {
                            "title":"性别",
                            "type":"radio",
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
                            "content":[{ 
                                text:"",
                                yes:'80',
                                no: '30'
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