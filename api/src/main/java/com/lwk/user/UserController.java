package com.lwk.user;

import java.util.List;

import com.lwk.request_body.AuthRequest;
import com.lwk.response_body.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
	private UserService userService;


	public UserController() {}

	@GetMapping
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@PostMapping
	public UserResponse addUser(@RequestBody User user) {
		return userService.addUser(user);
	}

    @PostMapping("/verify_new_user")
    public UserResponse verifyNewUser(@RequestBody User user) {
        return userService.verifyNewUser(user);
    }

    @PostMapping("/check_email_exist")
    public UserResponse checkEmailExist(@RequestBody String email){
        return userService.checkEmailExist(email);
    }

    @PutMapping("/reset_password/{id}")
    public UserResponse resetPassword(@PathVariable Long id, @RequestBody String password){
        return userService.resetPassword(id, password);
    }

    @PostMapping("/auth")
    public UserResponse auth(@RequestBody AuthRequest authRequest){
        return userService.auth(authRequest);
    }
}
