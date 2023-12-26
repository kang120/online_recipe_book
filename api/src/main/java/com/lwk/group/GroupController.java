package com.lwk.group;

import com.lwk.response_body.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/group")
@CrossOrigin
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping
    public Response createNewGroup(@RequestBody Group group){
        return groupService.createNewGroup(group);
    }
}
