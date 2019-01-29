package com.muzhi.muzhiapi;

import com.muzhi.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/system/menuItem")
public class menuItem {
    @Autowired
    MenuItemService menuItemService;
}
