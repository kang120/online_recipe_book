package com.lwk.group_category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/group_category")
@CrossOrigin
public class GroupCategoryController {

	@Autowired
	private GroupCategoryService groupCategoryService;
	
	@GetMapping
	public List<GroupCategory> getGroupCategories() {
		return groupCategoryService.getGroupCategories();
	}
}
