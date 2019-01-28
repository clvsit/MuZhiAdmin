# 系统配置接口文档
【说明】：增删改操作需要记录当前操作信息，形式如“谁在什么时候做了什么”。因此，后台需要从 token 中取出用户账号，测试过程可以自行先用缺省值来代替。

## 获取所有菜单信息
> 在用户成功登录到后台管理系统时，需要获取所有的菜单信息，用以渲染界面。其次，当页面缓存不存在时，前端会再次主动发起请求以获取菜单信息。

【所有菜单信息】：

- 菜单列表
- 菜单项列表

#### 前端请求
- 请求方式：GET
- 请求地址：/system/menu/getAll
- 请求参数：无
- 请求示例：无

#### 后台响应
- 操作视图：view\_menu、view\_menuitem
- 返回字段：将两张视图的字段全部返回。
- 响应示例：

```JSON
// 请求成功
{
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
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 获取菜单列表
> 获取菜单列表（一级菜单）。

#### 前端请求
- 请求方式：GET
- 请求地址：/system/menu/get
- 请求参数：无
- 请求示例：无

#### 后台响应
- 操作视图：view\_menu
- 返回字段：id、name
- 响应示例：

```JSON
// 请求成功
{
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
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 获取菜单项列表
> 获取菜单项列表（二级菜单）。

#### 前端请求
- 请求方式：GET
- 请求地址：/system/menuItem/get
- 请求参数：无
- 请求示例：无

#### 后台响应
- 操作视图：view\_menuitem
- 返回字段：id、name、url、belong、menu
- 响应示例：

```JSON
// 请求成功
{
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
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 添加菜单信息
> 拥有菜单管理权限的用户可以添加新的菜单信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/system/menu/add
- 请求参数：菜单名称（jwush）、菜单图标（jqklc）
- 请求示例：

```
jwush: "用户管理"
jqklc: "&#xe6b8;"
```

#### 后台响应
- 操作数据表：bmenu、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "新增菜单信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【操作过程】：

- 首先将前端传递的**菜单名称**和**菜单图标**插入到 bmenu 表中。
- 然后再获取服务器的时间戳和系统日期（符合 nwatch Ndate 字段的要求）。
- 接着根据不同的接口生成对应的**操作内容**，例如添加菜单信息接口对应的操作内容就是**添加菜单信息**。
- 最后将时间戳、系统日期、操作内容以及前端传递的用户名称一并插入到 nwatch 表中。

【说明】：后续的接口操作过程同**添加菜单信息**。

## 编辑菜单信息
> 拥有菜单管理权限的用户可以编辑已有的菜单信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/system/menu/edit
- 请求参数：菜单号（nwkah）、菜单名称（cnakm）、菜单图标（icujw）
- 请求示例：

```
nwkah：1
cnakm: "用户管理"
icujw: "&#xe6b8;"
```

#### 后台响应
- 操作数据表：bmenu、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "编辑菜单信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 删除菜单信息
> 拥有菜单管理权限的用户可以删除已有的菜单信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/system/menu/del
- 请求参数：菜单号（uwakc）
- 请求示例：

```
uwakc：1
```

#### 后台响应
- 操作数据表：bmenu、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "删除菜单信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

【说明】：需要进行级联删除，将该菜单下的所有菜单项也一并删除。

## 添加菜单项信息
> 拥有菜单管理权限的用户可以添加新的菜单项信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/system/menuItem/add
- 请求参数：菜单项名称（qkqos）、链接地址（habdm）、所属菜单（nwuqk）
- 请求示例：

```
qkqos: "用户管理"
habdm："/url/apath/adad"
nwuqk：1
```

#### 后台响应
- 操作数据表：rmenuitem、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "新增菜单项信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 编辑菜单项信息
> 拥有菜单管理权限的用户可以编辑已有的菜单项信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/system/menuItem/edit
- 请求参数：菜单项号（ehayn）、菜单项名称（iqosj）、链接地址（bchsg）、所属菜单（kwnqa）
- 请求示例：

```
ehayn：1
iqosj: "用户管理"
bchsg："/path/asda"
kwnqa：1
```

#### 后台响应
- 操作数据表：rmenuitem、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "编辑菜单项信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 删除菜单项信息
> 拥有菜单管理权限的用户可以删除已有的菜单项信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/system/menuItem/del
- 请求参数：菜单项号（trska）
- 请求示例：

```
trska：1
```

#### 后台响应
- 操作数据表：rmenuitem、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "删除菜单项信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```