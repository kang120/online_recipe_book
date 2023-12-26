package com.lwk.group_category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupCategoryService {
	
	@Autowired
	private GroupCategoryRepository groupCategoryRepository;

	public List<GroupCategory> getGroupCategories() {
		return groupCategoryRepository.findAll();
	}
}
