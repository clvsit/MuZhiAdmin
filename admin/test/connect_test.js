/**
 * 用户模块：用户登录
 */
Mock.mock(/http:\/\/test.com\/admin\/user\/login\?*?/, {
    code: "1",
    msg: "登录成功！",
    data: {
        "id": "@word(13)",
        "name": "@cname()",
        "email": "@email()",
        "phone|13000000000-17000000000": 1,
        "auth": 1
    }
});

/**
 * 用户管理：获取权限列表
 */
Mock.mock(/http:\/\/test.com\/admin\/auth\/get\?*?/, {
    code: "1",
    msg: "获取权限列表成功！",
    data: {
        "authList": [
            {
                "id": 1,
                "name": "管理员",
                "dateCreate": "2019-01-05 15:31",
                "dateModify": "2019-01-05 15:31",
                "modifier": "超级管理员",
                "content": "*",
                "contentName": "所有权限"
            }, {
                "id": 2,
                "name": "未激活",
                "dateCreate": "2019-01-09 15:31",
                "dateModify": "2019-01-09 15:31",
                "modifier": "超级管理员",
                "content": "0",
                "contentName": "无权限"
            }, {
                "id": 3,
                "name": "系统测试人员",
                "dateCreate": "2019-01-09 15:31",
                "dateModify": "2019-01-09 15:31",
                "modifier": "测试人员",
                "content": "1|2",
                "contentName": "用户管理、数据管理"
            }
        ]
    }
});

/**
 * 用户管理：添加权限信息
 */
Mock.mock(/http:\/\/test.com\/admin\/auth\/add\?*?/, {
    code: "1",
    msg: "添加权限信息成功",
    data: {}
});

/**
 * 用户管理：编辑权限信息
 */
Mock.mock(/http:\/\/test.com\/admin\/auth\/edit\?*?/, {
    code: "1",
    msg: "编辑权限信息成功",
    data: {}
});

/**
 * 用户管理：删除权限信息
 */
Mock.mock(/http:\/\/test.com\/admin\/auth\/del\?*?/, {
    code: "1",
    msg: "删除权限信息成功",
    data: {}
});

/**
 * 用户管理：获取员工列表
 */
Mock.mock(/http:\/\/test.com\/admin\/user\/get\?*?/, {
    code: "1",
    msg: "获取用户列表成功！",
    data: {
        count: 150,
        "userList|20": [
            {
                "id": "@word(13)",
                "name": "@cname()",
                "email": "@email()",
                "phone|13000000000-17000000000": 1,
                "auth": "1",
                "authName": "普通人员",
                "dateCreate": "@date('yyyy-MM-dd HH:mm')",
                "creater": "@cname()"
            }
        ]
    }
});

/**
 * 用户管理：创建用户信息
 */
Mock.mock(/http:\/\/test.com\/admin\/user\/add\?*?/, {
    code: "1",
    msg: "创建用户成功",
    data: {}
});

/**
 * 用户管理：编辑用户信息
 */
Mock.mock(/http:\/\/test.com\/admin\/user\/edit\?*?/, {
    code: "1",
    msg: "编辑用户信息成功",
    data: {}
});

/**
 * 用户管理：删除用户信息
 */
Mock.mock(/http:\/\/test.com\/admin\/user\/del\?*?/, {
    code: "1",
    msg: "删除用户信息成功",
    data: {}
});

/**
 * 数据管理：获取植物分类列表
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/type\/get\?*?/, {
    code: "1",
    msg: "获取植物分类列表成功",
    data: {
        "typeList": [
            {tid: 1, name: "一、二年生花卉", brief: "@cword(16)"},
            {tid: 2, name: "宿根花卉", brief: "@cword(16)"},
            {tid: 3, name: "球根花卉", brief: "@cword(16)"},
            {tid: 4, name: "多浆植物", brief: "@cword(16)"},
            {tid: 5, name: "兰科花卉", brief: "@cword(16)"},
            {tid: 6, name: "水生花卉", brief: "@cword(16)"},
            {tid: 7, name: "高山花卉及岩生植物", brief: "@cword(16)"},
            {tid: 8, name: "木本植物", brief: "@cword(16)"},
            {tid: 9, name: "蕨类植物", brief: "@cword(16)"},
            {tid: 10, name: "苔藓植物", brief: "@cword(16)"}
        ]
    }
});

/**
 * 数据管理：新增植物分类
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/type\/add/, {
    code: "1",
    msg: "新增植物分类成功",
    data: {}
});

/**
 * 数据管理：编辑植物分类
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/type\/edit/, {
    code: "1",
    msg: "编辑植物分类成功",
    data: {}
});

/**
 * 数据管理：删除植物分类
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/type\/del/, {
    code: "1",
    msg: "删除植物分类成功",
    data: {}
});

/**
 * 数据管理：植物列表-获取简略植物列表
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/data\/get\?*?/, {
    code: "1",
    msg: "获取植物列表成功",
    data: {
        count: 265,
        "plantList|20": [
            {
                "id": 1,
                "type": "@cword(8)",
                "name": "@cword(6)",
                "sname": "@word(10)",
                "genera": "@cword(12)",
                "dateCreate": "@date('yyyy-MM-dd')",
                "dateModify": "@date('yyyy-MM-dd')",
                "modifier": "@cname()"
            }
        ]
    }
});

/**
 * 数据管理：植物列表-获取植物列表
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/data\/get\?*?/, {
    code: "1",
    msg: "获取植物列表成功",
    data: {
        count: 265,
        "plantList|20": [
            {
                "id": 1,
                "tname": "@cword(8)",
                "name": "@cword(6)",
                "sname": "@word(10)",
                "oname": "@cword(16)",
                "genera": "@cword(12)",
                "distribution": "@csentence()",
                "characteristics": "@csentence()",
                "advice": "@csentence()",
                "flang": "@csentence()",
                "temperature": "22|24",
                "moisture": "200|300",
                "fertility": "30|48",
                "light": "50|60",
                "picture": "",
                "dateCreate": "@date('yyyy-MM-dd')",
                "dateModify": "@date('yyyy-MM-dd')",
                "modifier": "@cname()"
            }
        ]
    }
});

/**
 * 数据管理：植物列表-获取植物详情
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/data\/detail\?*?/, {
    code: "1",
    msg: "获取植物详情成功",
    data: {
        "detail": {
            "id": 1,
            "tname": "一、二年生花卉",
            "name": "一串红",
            "sname": "Salvia splendens",
            "oname": "墙下红、草象牙红、爆竹红、西洋红",
            "genera": "唇形科鼠尾草属",
            "distribution": "原产南美巴西，各地广为栽培",
            "characteristics": "一串红不耐寒，生育适温24℃，喜阳光充足，稍耐半阴，喜疏松肥沃的土壤",
            "advice": "建议种植于南面阳台，每周浇100ml的水，浇水要掌握见干见湿的原则，保持土壤60%左右的土壤含水量",
            "flang": "恋爱的心，象征男女之间纯洁的爱情",
            "temperature": "22|24",
            "moisture": "200|300",
            "fertility": "30|48",
            "light": "50|60",
            "picture": "",
            "dateCreate": "2019-01-23",
            "dateModify": "2019-01-23",
            "modifier": "测试一号"
        }
    }
});

/**
 * 数据管理：新增植物信息
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/data\/add/, {
    code: "1",
    msg: "新增植物信息成功",
    data: {}
});

/**
 * 数据管理：上传植物图片
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/picture\/add/, {
    code: "1",
    msg: "上传植物图片成功",
    data: {}
});

/**
 * 数据管理：删除上传的植物图片
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/picture\/del/, {
    code: "1",
    msg: "删除上传的植物图片成功",
    data: {}
});

/**
 * 数据管理：编辑植物信息
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/data\/edit/, {
    code: "1",
    msg: "编辑植物信息成功",
    data: {}
});

/**
 * 数据管理：删除植物信息
 */
Mock.mock(/http:\/\/test.com\/data\/plant\/data\/del/, {
    code: "1",
    msg: "删除植物信息成功",
    data: {}
});


/**
 * 系统配置：菜单管理-获取菜单相关数据
 */
Mock.mock(/http:\/\/test.com\/system\/menu\/getAll\?*?/, {
    code: "1",
    msg: "获取所有菜单数据成功",
    data: {
        "menuList": [
            {
                "id": 1,
                "name": "用户管理",
                "icon": "&#xe6b8;"
            }, {
                "id": 2,
                "name": "数据管理",
                "icon": "&#xe723;"
            }, {
                "id": 3,
                "name": "系统配置",
                "icon": "&#xe6da;"
            }
        ],
        "menuItem": [
            {
                "id": 1,
                "name": "权限管理",
                "url": "./page/user/auth-list",
                "belong": 1,
                "menu": "用户管理"
            }, {
                "id": 2,
                "name": "用户列表",
                "url": "./page/user/admin-list",
                "belong": 1,
                "menu": "用户管理"
            }, {
                "id": 3,
                "name": "植物分类",
                "url": "./page/user/type-list",
                "belong": 2,
                "menu": "数据管理"
            }, {
                "id": 4,
                "name": "植物列表",
                "url": "./page/user/plant-list",
                "belong": 1,
                "menu": "数据管理"
            }
        ]
    }
});

/**
 * 系统配置：菜单管理-获取菜单数据
 */
Mock.mock(/http:\/\/test.com\/system\/menu\/get\?*?/, {
    code: "1",
    msg: "获取菜单数据成功",
    data: {
        "menuList": [
            {
                "id": 1,
                "name": "用户管理",
                "icon": "&#xe6b8;"
            }, {
                "id": 2,
                "name": "数据管理",
                "icon": "&#xe723;"
            }, {
                "id": 3,
                "name": "系统配置",
                "icon": "&#xe6da;"
            }
        ]
    }
});

/**
 * 系统配置：新增菜单信息
 */
Mock.mock(/http:\/\/test.com\/system\/menu\/add/, {
    code: "1",
    msg: "新增菜单信息成功",
    data: {}
});

/**
 * 系统配置：编辑菜单信息
 */
Mock.mock(/http:\/\/test.com\/system\/menu\/edit/, {
    code: "1",
    msg: "编辑菜单信息成功",
    data: {}
});

/**
 * 系统配置：删除菜单信息
 */
Mock.mock(/http:\/\/test.com\/system\/menu\/del/, {
    code: "1",
    msg: "删除菜单信息成功",
    data: {}
});

/**
 * 系统配置：菜单管理-获取菜单项数据
 */
Mock.mock(/http:\/\/test.com\/system\/menuItem\/get\?*?/, {
    code: "1",
    msg: "获取菜单项数据成功",
    data: {
        "menuItem": [
            {
                "id": 1,
                "name": "权限管理",
                "url": "./page/user/auth-list",
                "belong": 1,
                "menu": "用户管理"
            }, {
                "id": 2,
                "name": "用户列表",
                "url": "./page/user/admin-list",
                "belong": 1,
                "menu": "用户管理"
            }, {
                "id": 3,
                "name": "植物分类",
                "url": "./page/user/type-list",
                "belong": 2,
                "menu": "数据管理"
            }, {
                "id": 4,
                "name": "植物列表",
                "url": "./page/user/plant-list",
                "belong": 2,
                "menu": "数据管理"
            }
        ]
    }
});

/**
 * 系统配置：新增菜单项信息
 */
Mock.mock(/http:\/\/test.com\/system\/menuItem\/add/, {
    code: "1",
    msg: "新增菜单项信息成功",
    data: {}
});

/**
 * 系统配置：编辑菜单项信息
 */
Mock.mock(/http:\/\/test.com\/system\/menuItem\/edit/, {
    code: "1",
    msg: "编辑菜单项信息成功",
    data: {}
});

/**
 * 系统配置：删除菜单项信息
 */
Mock.mock(/http:\/\/test.com\/system\/menuItem\/del/, {
    code: "1",
    msg: "删除菜单项信息成功",
    data: {}
});