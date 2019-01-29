package com.muzhi.service;

import com.muzhi.dao.MenuItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuItemService {
    @Autowired
    MenuItemMapper menuItemMapper;
}
