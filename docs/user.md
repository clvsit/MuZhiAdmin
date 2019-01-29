用户管理主要用于对木直小程序的所有用户数据进行统一管理，内容包括：

- 用户登录
- 权限管理
- 员工列表

【说明】：增删改操作需要记录当前操作信息，形式如“谁在什么时候做了什么”。因此，后台需要从 token 中取出用户账号，测试过程可以自行先用缺省值来代替。

## 用户登录验证
> 拥有管理系统账号的员工可以登录到管理系统中。

#### 前端请求 
- 请求方式：GET
- 请求地址：/admin/employee/login
- 请求参数：员工账号（jcqos）、员工密码（bcakq）
- 请求示例：

```
jcqos: NDYyMWQzNzNjYWRlNGU4Mw==
bcakq: NDliYTU5YWJiZTU2ZTA1Nw==
```

#### 后台响应
- 操作视图：view\_admin、view_menu
- 返回字段：
    - view\_admin: auth
    - view\_menu: id, name, url, belong, icon, menu
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "员工登录成功！",
    data: {
        "token": "",
        "auth": "1",
        "menuList": [
            {
                id: 1,
                name: "权限管理",
                url: "./page/user/auth-list.html",
                belong: 1,
                icon: "&#xe6b8;",
                menu: "用户管理"
            }, {
                id: 2,
                name: "员工列表",
                url: "./page/user/admin-list.html",
                belong: 1,
                icon: "&#xe6b8;",
                menu: "用户管理"
            }, {
                id: 3,
                name: "植物分类",
                url: "./page/data/type-list.html",
                belong: 2,
                icon: "&#xe723;",
                menu: "数据管理"
            }, {
                id: 4,
                name: "植物数据",
                url: "./page/data/plant-list.html",
                belong: 2,
                icon: "&#xe723;",
                menu: "数据管理"
            }, {
                id: 5,
                name: "菜单管理",
                url: "./page/system/menu.html",
                belong: 3,
                icon: "&#xe6da;",
                menu: "系统配置"
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
【说明】：

- 用户账号与密码经过前端 base64 加密，因此后台需先进行 base64 解码，然后对账号和密码进行验证。
- 验证成功后，根据 auth 字段来检索当前员工可进入的菜单内容，并将菜单内容与 auth 一同整合返回给前端。
- token 的生成与验证请参考：https://clvsit.github.io/MuZhiAdmin/site/request/

## 获取权限角色信息
> 若当前员工拥有权限管理权限，则可以获取后台管理系统的权限信息。

【说明】：默认角色。

- 超级管理员：可以分配管理员，且无法被其他管理员识别。超级管理员不存储在数据库中，而是存放到配置文件中，并需要进行加密处理。
- 管理员：能够管理除管理员身份外的所有权限角色。
- 未激活：没有任何权限，仅能登录到管理系统。一般是批量导入员工，以及删除已有权限时会产生未激活员工。

【说明】：操作视图

- 超级管理员：若是超级管理员，则查询 view\_auth\_root 视图。
- 其他：其他拥有权限管理权限的角色，则查询 view\_auth 视图。

#### 前端请求 
- 请求方式：GET
- 请求地址：/admin/auth/get
- 请求参数：无
- 请求示例：无

#### 后台响应
- 操作视图：view\_auth 或 view\_auth\_root
- 返回字段：id、name、dateCreate、dateModify、modifier、content、contentName（对已有字段信息进行处理后生成的内容）。
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "获取权限列表成功！",
    data: {
        "authList": [
            {
                "id": 1,
                "name": "管理员",
                "dateCreate": "2019-01-12 19:21",
                "dateModify": "2019-01-12 19:21",
                "modifier": "",
                "content": "*",
                "contentName": "所有权限"
            }, {
                "id": 2,
                "name": "未激活",
                "dateCreate": "2019-01-12 19:22",
                "dateModify": "2019-01-12 19:22",
                "modifier": "",
                "content": "0",
                "contentName": "无权限"
            }, {
                "id": 3,
                "name": "数据填写员",
                "dateCreate": "2019-01-12 19:22",
                "dateModify": "2019-01-29 15:06",
                "modifier": "测试账号",
                "content": "2",
                "contentName": "数据管理"
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
【说明】：由于权限表存储的权限形式为 “1|2”，因此在表连接的时候非常难以处理，直接在页面显示 “1|2” 肯定是不行，需要通过一种转换将 "1|2" 转换为对应的内容。这部分内容如果后台可以处理，就由后台来处理，要是麻烦的话，就让前台来实现。

【转换规则】：

- *：转化为“所有权限”；
- 0：转化为“无权限”；
- 1-任何数字：对应 bmenu 表的 Uname 字段内容。

## 添加权限信息
> 拥有用户管理权限的员工可以添加新的权限角色为信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/admin/auth/add
- 请求参数：角色名称（kiwua）、权限内容（mwbqs）
- 请求示例：

```
kiwua: "系统管理员"
mwbqs："1|2"
```

#### 后台响应
- 操作数据表：pauth、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "新增权限信息成功",
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

- 首先将前端传递的**角色名称**插入到 pauth 表中。
- 然后再获取服务器的时间戳和系统日期（符合 nwatch Ndate 字段的要求）。
- 接着根据不同的接口生成对应的**操作内容**，例如添加菜单信息接口对应的操作内容就是**添加权限信息**。
- 最后将时间戳、系统日期、操作内容以及前端传递的用户名称一并插入到 nwatch 表中。

【说明】：后续的接口操作过程同**添加权限信息**。

## 编辑权限信息
> 拥有用户管理权限的员工可以编辑已有的权限信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/admin/auth/edit
- 请求参数：权限号（qcsua）、权限内容（uqysh）、角色名称（mcqjs）
- 请求示例：

```
qcsua：1
uqysh: "管理者"
mcqjs："1|2"
```

#### 后台响应
- 操作数据表：pauth、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "编辑权限信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【注意】：需要更新 pauth 记录的**修改日期**和**修改人**两个字段的值。修改日期取当前系统时间，修改人则由 token 中携带的**用户账号**。

## 删除权限信息
> 拥有用户管理权限的用户可以删除已有的权限信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/admin/auth/del
- 请求参数：权限号（nckaj）
- 请求示例：

```
nckaj：1
```

#### 后台响应
- 操作数据表：pauth、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "删除权限信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【说明】：当删除指定的权限角色之后，需要将分配该权限角色的所有用户的权限角色设置为未激活（kadmin 的 Bauth 字符设置为 2）。

## 获取员工信息
> 若当前员工拥有用户管理权限，则可以获取后台管理系统的员工信息。

![获取员工信息](https://i.imgur.com/uBt3D4s.png)

【说明】：权限角色

- 超级管理员：可以查看和管理除自身以外的所有员工信息，包括管理员。
- 拥有用户管理权限的员工：可以查看和管理除超级管理员和管理员之外的所有员工信息。

【说明】：查询视图

- 超级管理员：若当前员工为超级管理员，则查询 view\_admin\_root 视图。
- 其他：其他非超级管理员但拥有用户管理权限的员工，则查询 view\_admin 视图。

#### 前端请求
- 请求方式：GET
- 请求地址：/admin/employee/get
- 请求参数：起始日期（cjajw）、结束日期（cqojs）、检索条件（qyquc）、检索内容（kcnal）、权限角色（coqsd）、起始记录数（twyiq）、每页记录数（jkams）、
- 请求示例：

```
cjajw: "2019-01-01"
cqojs: "2019-01-12"
qyquc: 0
kcnal: "测试一号"
coqsd: 1
twyiq: 0
jkams: 20
```
【说明-检索条件】：

- -1：没有检索条件
- 0：员工工号
- 1：员工姓名
- 2：手机号码
- 3：登录人工号

【说明-权限角色】：

- -1：所有角色
- 具体数字：对应角色

#### 后台响应
- 操作视图：view\_admin 或 view\_admin\_root
- 返回字段：id、name、email、phone、auth、authName（根据 auth 字段生成的新内容）、dateCreate、creater。
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "获取用户列表成功！",
    data: {
        count: 150,
        userList: [
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
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【说明】：返回示例使用 mock.js 自动生成。

## 添加员工信息
> 拥有用户管理权限的员工可以添加新的员工信息。

![添加员工信息](https://i.imgur.com/dTU12s2.png)

#### 前端请求
- 请求方式：POST
- 请求地址：/admin/employee/add
- 请求参数：员工账号（uqnck）、员工姓名（tqhck）、员工邮箱（nkalc）、手机号码（ckqbk）、权限角色（cajiw）
- 请求示例：

```
uqnck: "MTU0NzE5MjE3MDEzMmpzdWNoZW5="
tqhck: "测试一号"
nkalc: "ceshi@163.com"
ckqbk: "17826857055"
cajiw: 1
```
【说明】：员工账号需要进行加密和解密。前端会进行 base64 加密，后台在收到后对其进行解密。

#### 后台响应
- 操作数据表：kadmin、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "新增员工信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【操作过程-kadmin】：

- 将前端传递的参数依次插入到 kadmin 表的指定字段，登录日期取当前系统时间（注意格式），登录人则填写 token 中携带的“操作者账号”。

【操作过程-nwatch】：

- 先获取服务器的时间戳和系统日期（符合 nwatch Ndate 字段的要求）。
- 接着根据不同的接口生成对应的**操作内容**，例如添加员工信息接口对应的操作内容就是**添加员工信息**。
- 最后将时间戳、系统日期、操作内容一并插入到 nwatch 表中。

【说明】：后续的接口操作过程同**添加员工信息**。

## 编辑员工信息
> 拥有用户管理权限的员工可以编辑已有员工的信息。

![编辑员工信息](https://i.imgur.com/vaQoiw4.png)

#### 前端请求
- 请求方式：POST
- 请求地址：/admin/employee/edit
- 请求参数：员工号（jchan）、员工姓名（bqhsm）、员工邮箱（ncbak）、手机号码（uqihc）、权限角色（cnakv）
- 请求示例：

```
jchan: "1547471774769"
bqhsm: "朱娜"
ncbak: "p.mnhfavng@grirxwt.dz"
uqihc: "15585858447"
cnakv: 1
```

#### 后台响应
- 操作数据表：kadmin、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "编辑员工信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 删除员工信息
> 拥有用户管理权限员工可以删除已有的员工信息。

![删除员工信息](https://i.imgur.com/Ob2of0O.jpg)

#### 前端请求
- 请求方式：POST
- 请求地址：/admin/employee/del
- 请求参数：员工号（cjwqk）
- 请求示例：

```
cjwqk："1547471774769"
```

#### 后台响应
- 操作数据表：kadmin、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "删除员工信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```