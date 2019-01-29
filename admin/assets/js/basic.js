// 测试代码
const auth = [
    {
        id: 1,
        name: "管理员"
    }, {
        id: 2,
        name: "普通员工"
    }
];
const menu = [
    {
        id: 1,
        name: "用户管理"
    }, {
        id: 2,
        name: "数据管理"
    }, {
        id: 3,
        name: "系统配置"
    }
];
const plantType = [
    {
        id: 1,
        name: "一、二年生花卉"
    }, {
        id: 2,
        name: "宿根花卉"
    }, {
        id: 3,
        name: "球根花卉"
    }, {
        id: 4,
        name: "多浆植物"
    }, {
        id: 5,
        name: "兰科花卉"
    }, {
        id: 6,
        name: "水生花卉"
    }, {
        id: 7,
        name: "高山花卉及岩生植物"
    }, {
        id: 8,
        name: "木本植物"
    }, {
        id: 9,
        name: "蕨类植物"
    }, {
        id: 10,
        name: "苔藓植物"
    }
];
const menuList = [
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
];
sessionStorage.setItem("auth", JSON.stringify(auth));
sessionStorage.setItem("menu", JSON.stringify(menu));
sessionStorage.setItem("plantType", JSON.stringify(plantType));
// sessionStorage.setItem("user", "test");

window.onload = function () {

    // if (url.indexOf("login") === -1 && !username) {
    // 	Layer.alert("您还未登录，请登录后再执行操作。", 5, function () {
    // 		location.href = "login.html";
    // 	});
    // }
};

const MuZhi = {
    layer: null,

    /**
     * 初始化 MuZhi 类
     * @param fn 回调函数
     */
    init(fn) {
        layui.use('layer', function () {
            MuZhi.layer = layui.layer;
            if (fn) {
                fn.call(this);
            }
        });
    },

    /**
     * @name: 视图类
     * 专门用以处理页面相关的业务逻辑
     */
    View: {
        /**
         * 生成权限多选框
         * @param checkboxDom 多选框 DOM 对象
         * @param menuData    菜单数据
         * @param form        layui 表单对象
         * @param formFilter  layui 表单对象过滤值
         * @param contents    多选框初始化
         */
        generateAuthCheckbox(checkboxDom, menuData, form, formFilter, contents) {
            let checkbox_str = "",
                init_data = {};

            menuData.forEach(item => {
                checkbox_str += "<input type='checkbox' name='auth_" + item.id + "' title='" + item.name + "' />";
            });
            checkboxDom.innerHTML = checkbox_str;
            if (contents) {
                contents.forEach(item => {
                    init_data["auth_" + item] = true;
                });
                form.val("edit", init_data);
            }
            form.render("checkbox");
        },

        /**
         * 转换权限多选框的内容
         * @data 表单输入内容
         */
        convertCheckbox(data) {
            let auth = [];

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    // 寻找与权限相关的内容
                    if (/auth_*/.test(key)) {
                        auth.push(key.replace("auth_", ""));
                    }
                }
            }
            return auth.join("|");
        },

        /**
         * 生成权限下拉框
         * @param SelectDom 下拉框 DOM 对象
         * @param authData  权限数据
         * @param form      layui 表单对象
         */
        generateAuthSelect(SelectDom, authData, form) {
            let select_str = "";

            authData.forEach(item => {
                select_str += "<option value='" + item.id + "'>" + item.name + "</option>";
            });
            SelectDom.innerHTML += select_str;
            form.render("select");
        },

        /**
         * 生成植物分类下拉框
         * @param SelectDom 下拉框 DOM 对象
         * @param typeData  植物分类数据
         * @param form      layui 表单对象
         */
        generateTypeSelect(SelectDom, typeData, form) {
            let select_str = "";

            typeData.forEach(item => {
                select_str += "<option value='" + item.id + "'>" + item.name + "</option>";
            });
            SelectDom.innerHTML += select_str;
            form.render("select");
        },

        /**
         * 生成菜单下拉框
         * @param SelectDom 下拉框 DOM 对象
         * @param menuData  菜单数据
         * @param form      layui 表单对象
         */
        generateMenuSelect(SelectDom, menuData, form) {
            let select_str = "";

            menuData.forEach(item => {
                select_str += "<option value='" + item.id + "'>" + item.name + "</option>";
            });
            SelectDom.innerHTML = select_str;
            form.render("select");
        },

        /**
         * 生成菜单图标单选框
         * @param radioDom  单选框 DOM 对象
         * @param iconData  图标数据
         * @param form      layui 表单对象
         */
        generateIconRadio (radioDom, iconData, form) {
            let radio_str = "";

            iconData.forEach(item => {
                radio_str += "<li>" +
                    "<i class='icon iconfont'>" + item.code + "</i>" +
                    "<input type='radio' value='" + item.code + "' name='icon' class='layui-input' checked />" +
                    "</li>";
            });
            radioDom.innerHTML = radio_str;
            form.render("radio");
        }
    },

    /**
     * @name: 验证类
     * 用以验证表单输入内容
     */
    Verify: {
        /**
         * 验证中文字段
         * @param value      输入的内容
         * @param name       字段名称
         * @param length     长度要求
         * @returns {string} 提示文字
         */
        chineseName(value, name, length) {
            if (value.length === 0) {
                return name + "字段不能为空";
            }
            if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
                return "请填写中文内容";
            }
            if (value.length > length) {
                return "超出" + name + "字段的长度限制";
            }
        },

        /**
         * 验证英文字段
         * @param value      输入内容
         * @param name       字段名称
         * @param length     长度要求
         * @returns {String} 提示文字
         */
        englishName(value, name, length) {
            if (value.length === 0) {
                return name + "字段不能为空";
            }
            if (value.length > length) {
                return "超出" + name + "字段的长度限制";
            }
        },

        /**
         * 验证长度要求字段
         * @param value      输入内容
         * @param name       字段名称
         * @param length     长度要求
         * @param isEmpty    是否允许为空
         * @returns {string} 提示文字
         */
        lengthRequired (value, name, length, isEmpty) {
            if (value.length === 0 && !isEmpty) {
                return name + "字段不能为空";
            }
            if (value.length > length) {
                return "超出" + name + "字段的长度限制";
            }
        },

        /**
         * 验证账号信息
         * @param value      输入内容
         * @param name       字段名称
         * @param length     长度要求
         * @returns {String} 提示文字
         */
        account(value, name, length) {
            if (value.length < length[0] || value.length > length[1]) {
                return name + '字段的长度限制在 6- 12 位，请不要超出范围';
            }
            if (!/\w{6,12}/.test(value)) {
                return name + "字段格式不正确，请输入英文数字组合";
            }
        },

        /**
         * 验证后台管理系统登录账号
         * @param value      输入内容
         * @returns {string} 提示文字
         */
        username (value) {
            if (!/\w{6,12}/.test(value)) {
                return "用户账号格式不正确！";
            }
        }
    },

    /**
     * @name: 工具类
     * 一些常用的函数
     */
    Util: {
        /**
         * 获取 URL 中的参数
         * @param url       url 内容
         * @return {object} 返回参数对象
         */
        getUrlParams(url) {
            let _url = url.replace("?", ""),
                params = _url.split("&"),
                result = {};

            for (let i = 0, len = params.length; i < len; i++) {
                const param_split = params[i].split("=");

                result[param_split[0]] = decodeURIComponent(param_split[1]);
            }
            return result;
        },

        /**
         * 类型转换
         * @param data Object         待转换的数据对象
         * @param target String|Array 要转换的属性
         * @param type String         转换后的类型
         */
        changeType(data, target, type) {
            if (typeof target === "string") {
                try {
                    if (type === "int") {
                        data[target] = Number(data[target]);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                target.forEach(item => {
                    try {
                        if (type === "int") {
                            data[item] = Number(data[item]);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        },

        /**
         * 从数组中删除指定数据
         * @param data  Array  数据数组
         * @param param String 条件
         * @param value *      条件值
         * @returns {*}
         */
        deleteFromArray(data, param, value) {
            let flag = false;

            for (let i = 0, len = data.length; i < len; i++) {
                const item = data[i];

                if (flag) {
                    data[i - 1] = data[i];
                    continue;
                }
                if (item[param] === value) {
                    flag = true;
                }
            }
            if (flag) {
                data.pop();
            }
            return data;
        },

        /**
         * 获取指定格式的系统时间
         * @param format String 指定格式
         * @returns {*}
         */
        getSystemTime (format) {
            const date = new Date(),
                param = {
                    "Y+": date.getFullYear() + "",
                    "M+": date.getMonth() + 1 + "",
                    "d+": date.getDate() + "",
                    "H+": date.getHours() + "",
                    "m+": date.getMinutes() + "",
                    "s+": date.getSeconds() + ""
                };

            for (const key in param) {
                if (new RegExp("(" + key + ")").test(format)) {
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length === 2 ?
                            (param[key].length === 1 ?
                                "0" + param[key] : param[key].substr(-2)) :
                            param[key]);
                }
            }
            return format;
        }
    },

    Layer: {
        msg(msg) {
            MuZhi.layer.msg(msg, {icon: 1, time: 1000});
        },
        warn(msg) {
            MuZhi.layer.msg(msg, {icon: 2, time: 1000});
        },
        prompt(msg) {
            MuZhi.layer.msg(msg, {icon: 4, time: 1000});
        },
        showLoading() {
            return MuZhi.layer.load(1);
        },
        closeLoading(layerIndex) {
            MuZhi.layer.close(layerIndex);
        },
        alert(msg, icon, fn) {
            MuZhi.layer.alert(msg, {icon: icon}, fn);
        },
        alertSuccess(msg) {
            MuZhi.layer.alert(msg, {icon: 6}, function () {
                try {
                    parent.layer.close(parent.layer.getFrameIndex(window.name));
                } catch (error) {
                    layer.closeAll();
                }
            });
        },
        alertFailed(msg) {
            MuZhi.layer.alert(msg, {icon: 5}, function () {
                try {
                    parent.layer.close(parent.layer.getFrameIndex(window.name));
                } catch (error) {
                    layer.closeAll();
                }
            });
        },
        confirm(msg, fn) {
            MuZhi.layer.confirm(msg, function () {
                fn();
            });
        },

        /**
         * 打开页面
         * @param title 标题
         * @param url   请求的url
         * @param w     弹出层宽度（缺省调默认值）
         * @param h     弹出层高度（缺省调默认值）
         */
        open(title, url, w, h) {
            if (title == null || title === "") {
                title = false;
            }
            if (url == null || url === "") {
                url = "404.html";
            }
            if (w == null || w === "") {
                w = ($(window).width() * 0.9);
            }
            if (h == null || h === "") {
                h = ($(window).height() - 50);
            }
            layer.open({
                type: 2,
                area: [w + 'px', h + 'px'],
                fix: false, //不固定
                maxmin: true,
                shadeClose: true,
                shade: 0.4,
                title: title,
                content: url
            });
        },
        close() {
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        }
    },

    Link: {
        isTest: true,
        urls: {},
        connect: function (type, param) {
            let info;

            if (!type) {
                throw new Error("参数 type 必须要填写！");
            }
            info = MuZhi.Link.urls[type](param);
            if (!info) {
                throw new Error("连接信息不存在！");
            } else {
                let xhr = new XMLHttpRequest(),
                    url = "";

                if (MuZhi.Link.isTest) {
                    url = "http://test.com/";
                }

                xhr.onreadystatechange = function () {
                    console.log(xhr);
                    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
                        const fn = param.successFn ? param.successFn : function (res) {
                            if (Number(res.code) === 1) {
                                MuZhi.Layer.alertSuccess(res.msg);
                            } else {
                                MuZhi.Layer.alertFailed(res.msg);
                            }
                        };
                        fn.call(this, JSON.parse(xhr.responseText));
                    } else if (xhr.readyState === 4 && xhr.status !== 200) {
                        const fn = param.errorFn ? param.errorFn : function () {
                            MuZhi.Layer.warn("连接到服务器失败！");
                        };
                        fn.call(this);
                    }
                    const fn = param.completeFn ? param.completeFn : null;

                    if (fn) {
                        fn.call(this);
                    }
                };
                xhr.open(info.type, url + info.url);
                if (info.type === "get") {
                    xhr.setRequestHeader("token", "test");
                    xhr.send();
                } else {
                    xhr.setRequestHeader("token", "test");
                    xhr.send(info.data);
                }
            }
        }
    }
};

/**
 * 用户管理：员工登录
 */
MuZhi.Link.urls.login = function (data) {
    return {
        type: "post",
        url: "admin/user/login",
        data: {
            "jcqos": data.account,
            "bcakq": data.password
        }
    }
};

/**
 * 用户管理：获取权限列表
 */
MuZhi.Link.urls.getAuthList = function () {
    return {
        type: "get",
        url: "admin/auth/get",
    }
};

/**
 * 用户管理：添加权限信息
 */
MuZhi.Link.urls.addAuth = function (data) {
    return {
        type: "post",
        url: "admin/auth/add",
        data: {
            "kiwua": data.name,
            "mwbqs": data.content
        }
    }
};

/**
 * 用户管理：编辑权限信息
 */
MuZhi.Link.urls.editAuth = function (data) {
    return {
        type: "post",
        url: "admin/auth/edit",
        data: {
            "qcsua": data.id,
            "uqysh": data.name,
            "mcqjs": data.content
        }
    }
};

/**
 * 用户管理：删除权限信息
 */
MuZhi.Link.urls.delAuth = function (data) {
    return {
        type: "post",
        url: "admin/auth/del",
        data: {
            "nckaj": data.id
        }
    }
};

/**
 * 用户管理：获取用户列表
 */
MuZhi.Link.urls.getUserList = function () {
    return {
        type: "get",
        url: "admin/user/get",
    }
};

/**
 * 用户管理：创建用户
 */
MuZhi.Link.urls.addEmployee = function (data) {
    return {
        type: "post",
        url: "admin/user/add",
        data: {
            "uqnck": data.account,
            "tqhck": data.name,
            "nkalc": data.email,
            "ckqbk": data.phone,
            "cajiw": data.auth
        }
    }
};

/**
 * 用户管理：编辑用户
 */
MuZhi.Link.urls.editEmployee = function (data) {
    return {
        type: "post",
        url: "admin/user/edit",
        data: {
            "jchan": data.id,
            "bqhsm": data.name,
            "ncbak": data.email,
            "uqihc": data.phone,
            "cnakv": data.auth
        }
    }
};

/**
 * 用户管理：删除员工信息
 */
MuZhi.Link.urls.delEmployee = function (data) {
    return {
        type: "post",
        url: "admin/user/del",
        data: {
            "cjwqk": data.employee
        }
    }
};

/**
 * 数据管理：获取植物分类列表
 */
MuZhi.Link.urls.getPlantType = function () {
    return {
        type: "get",
        url: "data/plant/type/get",
    }
};

/**
 * 数据管理：新增植物分类
 */
MuZhi.Link.urls.addPlantType = function (data) {
    return {
        type: "post",
        url: "data/plant/type/add",
        data: {
            "uqish": data.name,
            "qojsd": data.brief
        }
    }
};

/**
 * 数据管理：编辑植物分类
 */
MuZhi.Link.urls.editPlantType = function (data) {
    return {
        type: "post",
        url: "data/plant/type/edit",
        data: {
            "kqinc": data.id,
            "owina": data.name,
            "uajcv": data.brief
        }
    }
};

/**
 * 数据管理：删除植物分类
 */
MuZhi.Link.urls.delPlantType = function (data) {
    return {
        type: "post",
        url: "data/plant/type/del",
        data: {
            "yscks": data.id
        }
    }
};

/**
 * 数据管理：获取植物列表
 */
MuZhi.Link.urls.getPlantList = function () {
    return {
        type: "get",
        url: "data/plant/data/get",
    }
};

/**
 * 数据管理：获取植物详情
 */
MuZhi.Link.urls.getPlant = function () {
    return {
        type: "get",
        url: "data/plant/data/detail",
    }
};

/**
 * 数据管理：新增植物信息
 */
MuZhi.Link.urls.addPlant = function () {
    return {
        type: "post",
        url: "data/plant/data/add",
    }
};

/**
 * 数据管理：上传植物图片
 * @returns {{type: string, url: string}}
 */
MuZhi.Link.urls.uploadPlantPicture = function () {
    return {
        type: "post",
        url: "data/plant/picture/add"
    }
};

MuZhi.Link.urls.delPlantPicture = function () {
    return {
        type: "post",
        url: "data/plant/picture/del"
    }
};

/**
 * 数据管理：编辑植物信息
 */
MuZhi.Link.urls.editPlant = function () {
    return {
        type: "post",
        url: "data/plant/data/edit",
    }
};

/**
 * 数据管理：删除植物信息
 */
MuZhi.Link.urls.delPlant = function () {
    return {
        type: "post",
        url: "data/plant/data/del",
    }
};

/**
 * 系统配置：获取所有菜单数据
 */
MuZhi.Link.urls.getMenuAll = function () {
    return {
        type: "get",
        url: "system/menu/getAll",
    }
};

/**
 * 系统配置：获取菜单数据
 */
MuZhi.Link.urls.getMenuList = function () {
    return {
        type: "get",
        url: "system/menu/get",
    }
};

/**
 * 系统配置：新增菜单信息
 */
MuZhi.Link.urls.addMenu = function (data) {
    return {
        type: "post",
        url: "system/menu/add",
        data: {
            "jwush": data.name,
            "cbsak": btoa(data.account)
        }
    }
};

/**
 * 系统配置：编辑菜单信息
 */
MuZhi.Link.urls.editMenu = function (data) {
    return {
        type: "post",
        url: "system/menu/edit",
        data: {
            "nwkah": data.id,
            "cnakm": data.name,
            "icujw": btoa(data.account)
        }
    }
};

/**
 * 系统配置：删除菜单信息
 */
MuZhi.Link.urls.delMenu = function (data) {
    return {
        type: "post",
        url: "system/menu/del",
        data: {
            "uwakc": data.id,
            "naklc": btoa(data.account)
        }
    }
};

/**
 * 系统配置：获取菜单项数据
 */
MuZhi.Link.urls.getMenuItem = function () {
    return {
        type: "get",
        url: "system/menuItem/get",
        data: {}
    }
};

/**
 * 系统配置：新增菜单项信息
 */
MuZhi.Link.urls.addMenuItem = function (data) {
    return {
        type: "post",
        url: "system/menuItem/add",
        data: {
            "qkqos": data.name,
            "habdm": data.url,
            "nwuqk": data.belong,
            "yqhms": btoa(data.account)
        }
    }
};

/**
 * 系统配置：编辑菜单项信息
 */
MuZhi.Link.urls.editMenuItem = function (data) {
    return {
        type: "post",
        url: "system/menuItem/edit",
        data: {
            "ehayn": data.id,
            "iqosj": data.name,
            "bchsg": data.url,
            "kwnqa": data.belong,
            "xafsj": btoa(data.account)
        }
    }
};

/**
 * 系统配置：删除菜单项信息
 */
MuZhi.Link.urls.delMenuItem = function (data) {
    return {
        type: "post",
        url: "system/menuItem/del",
        data: {
            "trsak": data.id,
            "xbsha": btoa(data.account)
        }
    }
};