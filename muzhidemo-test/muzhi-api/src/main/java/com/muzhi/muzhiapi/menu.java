package com.muzhi.muzhiapi;

import com.muzhi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/system/menu")
public class menu {
    @Autowired
    MenuService menuService;

    /**
     * @param
     * @return
     * @method
     * @Description 获取所有菜单信息
     * @Date:11:31 2019\1\28 0001
     * @Author:Tao.Chen
     */
    @GetMapping("/getAll")

}
