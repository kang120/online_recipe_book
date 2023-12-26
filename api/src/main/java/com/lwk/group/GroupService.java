package com.lwk.group;

import com.lwk.response_body.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Response createNewGroup(Group group){
        if(group.getIsPrivate()){
            String rawPassword = group.getPassword();
            String encodedPassword = encodePassword(rawPassword);
            group.setPassword(encodedPassword);
        }

        groupRepository.save(group);

        return new Response("Success", "Successfully create group");
    }

    public String encodePassword(String rawPassword){
        return passwordEncoder.encode(rawPassword);
    }

    public boolean decodePassword(String rawPassword, String encodedPassword){
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
