# 数据管理接口文档
数据管理主要用于对木直小程序的所有数据进行统一管理，内容包括：
- 植物分类
- 植物列表

【说明】：增删改操作需要记录当前操作信息，形式如“谁在什么时候做了什么”。因此，后台需要从 token 中取出用户账号，测试过程可以自行先用缺省值来代替。

## 获取植物分类
拥有数据管理权限的员工可以获取并查看**数据管理**下的**植物分类**的所有数据。

![获取植物分类](https://i.imgur.com/MNVbnVm.png)

#### 前端请求
- 请求方式：GET
- 请求地址：/data/plant/type/get
- 请求参数：无
- 请求示例：无

#### 后台响应
- 操作视图：view\_plant\_type
- 返回字段：id、name、brief
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "获取植物分类列表成功",
    data: {
        "typeList": [
            {tid: 1, name: "一、二年生花卉", brief: ""},
            {tid: 2, name: "宿根花卉", brief: ""},
            {tid: 3, name: "球根花卉", brief: ""},
            {tid: 4, name: "多浆植物", brief: ""},
            {tid: 5, name: "兰科花卉", brief: ""},
            {tid: 6, name: "水生花卉", brief: ""},
            {tid: 7, name: "高山花卉及岩生植物", brief: ""},
            {tid: 8, name: "木本植物", brief: ""},
            {tid: 9, name: "蕨类植物", brief: ""},
            {tid: 10, name: "苔藓植物", brief: ""}
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

## 添加植物分类信息
> 拥有数据管理权限的员工可以添加新的植物分类信息。

![新增植物分类信息](https://i.imgur.com/h4HoyBW.png)

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/type/add
- 请求参数：植物分类名（uqish）、分类简介（qojsd）
- 请求示例：

```
uqish: "苔藓植物"
qijsd："关于苔藓植物的介绍"
```

#### 后台响应
- 操作数据表：kplanttype、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "新增植物分类信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 编辑植物分类信息
> 拥有数据管理权限的用户可以编辑已有的植物分类信息。

![编辑植物分类信息](https://i.imgur.com/DOJENia.png)

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/type/edit
- 请求参数：植物分类号（kqinc）、植物分类名称（owina）、植物分类简介（uajcv）
- 请求示例：

```
kqinc：1
owina: "苔藓植物"
uajcv："关于苔藓植物的介绍2"
```

#### 后台响应
- 操作数据表：kplanttype、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "编辑植物分类信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 删除植物分类信息
> 拥有数据管理权限的用户可以删除已有的植物分类信息。

![删除植物分类信息](https://i.imgur.com/qRu3iGt.png)

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/type/del
- 请求参数：植物分类号（yscks）
- 请求示例：

```
yscks：1
```

#### 后台响应
- 操作数据表：kplanttype、nplant、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "删除植物分类信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

【说明】：删除植物分类时，需要先将从属该分类的植物的 Ptid 字段（植物分类号）设置为 0，表示无分类。然后再从 nplant 中将当前分类数据给移除。

## 获取简略植物列表
拥有数据管理权限的员工可以获取并查看**数据管理**下的**植物列表**的所有数据。

#### 前端请求
- 请求方式：GET
- 请求地址：/data/plant/data/get
- 请求参数：无
- 请求示例：无

#### 后台响应
- 操作视图：view\_plant\_summary
- 返回字段：id、name、sname、type、genera、dateCreate、dateModify、modifier
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "获取植物列表成功",
    data: {
        count: 265,
        plantList: [
            {
                "id": 1,
                "type": "一、二年生花卉",
                "name": "一串红",
                "sname": "Salvia splendens",
                "genera": "唇形科鼠尾草属",
                "dateCreate": "2019-01-28",
                "dateModify": "2019-01-28",
                "modifier": "测试一号"
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

【说明】：返回的 count 表示符合当前搜索条件的所有植物数据的个数。

## 获取植物详情
拥有数据管理权限的员工可以获取并查看特定植物的详细数据。

#### 前端请求
- 请求方式：GET
- 请求地址：/data/plant/data/detail
- 请求参数：植物号（ycakn）
- 请求示例：

```
ycakn: 1
```

#### 后台响应
- 操作视图：view\_plant\_detail
- 返回字段：id、tname、name、sname、oname、genera、distribution、characteristics、advice、flang、temperature、moisture、fertility、light、picture、dateCreate、dateModify、modifier
- 响应示例：

```JSON
// 请求成功
{
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
            "picture": "picture/1/20190129214317.jpg|picture/1/20190129214332.jpg,
            "dateCreate": "2019-01-23",
            "dateModify": "2019-01-23",
            "modifier": "测试一号"
        }
    }
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【说明】：关于 picture 字段，需要商讨图片在服务器的存放地址以及图片的格式。

## 添加植物信息
> 拥有数据管理权限的员工可以添加新的植物信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/data/add
- 请求参数：植物名称（jmalc）、植物学名（bansk）、植物别名（mcavc）、所属分类（ywnac）、植物科属（qjall）、产地与分布（lamch）、生物学特性（tqjck）、养护建议（bnamc）、花语（yahsk）、适宜温度（nalcs）、适宜水份（qnalk）、适宜肥力（bakcn）、适宜光照（bqksl）、植物图片（qlpsf）
- 请求示例：

```
jmalc: "一串红"
bansk："Salvia splendens"
mcavc: "墙下红、草象牙红、爆竹红、西洋红"
ywnac: 1
qjall: "唇形科鼠尾草属"
lamch: "原产南美巴西，各地广为栽培"
tqjck: "一串红不耐寒，生育适温24℃，喜阳光充足，稍耐半阴，喜疏松肥沃的土壤"
bnamc: "建议种植于南面阳台，每周浇100ml的水，浇水要掌握见干见湿的原则，保持土壤60%左右的土壤含水量"
yahsk: "恋爱的心，象征男女之间纯洁的爱情"
nalcs: "22|24"
qnalk: "200|300"
bakcn: "30|48"
bqksl: "50|60"
qlpsf: "20190129214317|20190129214332"
```

#### 后台响应
- 操作数据表：nplant、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "新增植物信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 上传植物图片
> 拥有数据管理权限的员工可以在新增植物信息的同时，上传与当前植物相关的图片。

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/picture/add
- 请求参数：图片名称（hqkcn）、图片内容（yqinc）
- 请求示例：

```
hqkcn: "20190129211745"
yqinc: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD..."
```

#### 后台响应
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "上传植物图片成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【说明】：到指定的服务器文件夹中创建该图片文件。

## 删除上传的植物图片
> 拥有数据管理权限的员工可以删除已上传的植物图片。

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/picture/del
- 请求参数：图片名称（jqlcs）
- 请求示例：

```
jqlcs: "20190129211745"
```

#### 后台响应
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "删除上传的植物图片成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```
【说明】：到指定服务器文件夹中删除该图片。

## 编辑植物信息
> 拥有数据管理权限的员工可以编辑已有的植物信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/data/edit
- 请求参数：植物名称（jqkcn）、植物学名（uqisk）、植物别名（uwicn）、所属分类（bcnak）、植物科属（namcl）、产地与分布（vxhan）、生物学特性（bafkd）、养护建议（feusk）、花语（rjsal）、适宜温度（tquso）、适宜水份（qiske）、适宜肥力（xvsml）、适宜光照（qkofs）、植物图片（hajsk）
- 请求示例：

```
jqkcn: "一串红"
uqisk："Salvia splendens"
uwicn: "墙下红、草象牙红、爆竹红、西洋红"
bcnak: 1
namcl: "唇形科鼠尾草属"
vxhan: "原产南美巴西，各地广为栽培"
bafkd: "一串红不耐寒，生育适温24℃，喜阳光充足，稍耐半阴，喜疏松肥沃的土壤"
feusk: "建议种植于南面阳台，每周浇100ml的水，浇水要掌握见干见湿的原则，保持土壤60%左右的土壤含水量"
rjsal: "恋爱的心，象征男女之间纯洁的爱情"
tquso: "22|24"
qiske: "200|300"
xvsml: "30|48"
qkofs: "50|60"
hajsk: "20190129214317|20190129214332"
```

#### 后台响应
- 操作数据表：nplant、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "编辑植物信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```

## 删除植物信息
> 拥有数据管理权限的员工可以删除已有的植物信息。

#### 前端请求
- 请求方式：POST
- 请求地址：/data/plant/data/del
- 请求参数：植物号（uqock）
- 请求示例：

```
uqock：1
```

#### 后台响应
- 操作数据表：nplant、nwatch
- 返回字段：无
- 响应示例：

```JSON
// 请求成功
{
    code: "1",
    msg: "删除植物信息成功",
    data: {}
}

// 请求失败
{
    "code": "0",
    "msg": "具体的错误信息",
    "data": {}
}
```