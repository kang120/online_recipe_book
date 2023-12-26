package com.lwk.group;

import com.lwk.group_category.GroupCategory;
import com.lwk.user.User;
import jakarta.persistence.*;

@Entity
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;
    private boolean isPrivate;
    private String password;

    @ManyToOne
    @JoinColumn(name = "leader_id", nullable = false)
    private User leader;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private GroupCategory category;

    public Group(){}

    public Group(Long id, String groupName, boolean isPrivate, String password, User leader, GroupCategory category){
        this.id = id;
        this.groupName = groupName;
        this.isPrivate = isPrivate;
        this.password = password;
        this.leader = leader;
        this.category = category;
    }

    public Group(String groupName, boolean isPrivate, String password, User leader, GroupCategory category){
        this.groupName = groupName;
        this.isPrivate = isPrivate;
        this.password = password;
        this.leader = leader;
        this.category = category;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setGroupName(String groupName){
        this.groupName = groupName;
    }

    public String getGroupName(){
        return groupName;
    }

    public void setIsPrivate(boolean isPrivate){
        this.isPrivate = isPrivate;
    }

    public boolean getIsPrivate(){
        return isPrivate;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){
        return password;
    }

    public void setLeader(User leader){
        this.leader = leader;
    }

    public User getLeader(){
        return leader;
    }

    public void setCategory(GroupCategory category){
        this.category = category;
    }

    public GroupCategory getCategory(){
        return category;
    }
}
