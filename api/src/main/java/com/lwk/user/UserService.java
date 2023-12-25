package com.lwk.user;

import java.util.List;
import java.util.Optional;

import com.lwk.request_body.AuthRequest;
import com.lwk.response_body.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;

@Service
public class UserService {

    @Autowired
	private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService() {}

	public List<User> getUsers() {
		return userRepository.findAll();
	}

    public User getUser(Long id){
        Optional<User> user = userRepository.findById(id);

        return user.orElseGet(User::new);
    }

    public UserResponse addUser(User user){
        String rawPassword = user.getPassword();
        String encodedPassword = encodePassword(rawPassword);
        user.setPassword(encodedPassword);

        userRepository.save(user);

        return new UserResponse("success", "Successfully create new user", "");
    }

	public UserResponse verifyNewUser(User user) {
        Optional<User> dbEmail = userRepository.existEmail(user.getEmail());
        Optional<User> dbUsername = userRepository.existUsername(user.getUsername());

        if(dbEmail.isEmpty() && dbUsername.isEmpty()){
            return new UserResponse("success", "Email and Username are valid", "");
        }else if(dbEmail.isPresent() && dbUsername.isPresent()){
            return new UserResponse("error", "Email and Username have been taken", "");
        }else if(dbEmail.isPresent()){
            return new UserResponse("error", "Email has been taken", "");
        }else{
            return new UserResponse("error", "Username has been taken", "");
        }
	}

    public UserResponse checkEmailExist(String email){
        Optional<User> dbEmail = userRepository.existEmail(email);

        if(dbEmail.isPresent()){
            User user = dbEmail.get();
            return new UserResponse("success", "Email is found", String.valueOf(user.getId()));
        }else{
            return new UserResponse("error", "Email not found", email);
        }
    }

    public UserResponse resetPassword(Long id, String password){
        User user = getUser(id);

        if(user.getEmail().isEmpty()){
            return new UserResponse("error", "User not found", "");
        }

        password = encodePassword(password);
        user.setPassword(password);
        userRepository.save(user);

        return new UserResponse("success", "Successfully update password", "");
    }

    public UserResponse auth(AuthRequest authRequest){
        String identity = authRequest.getIdentity();

        Optional<User> dbUser = userRepository.auth(identity);

        if(dbUser.isPresent()){
            User user = dbUser.get();

            String rawPassword = authRequest.getPassword();
            String encodedPassword = user.getPassword();

            if(decodePassword(rawPassword, encodedPassword)){
                return new UserResponse("success", "Successfully authenticate", String.valueOf(user.getId()));
            }else{
                return new UserResponse("error", "Invalid authentication", "");
            }
        }else{
            return new UserResponse("error", "Invalid authentication", "");
        }
    }

    public String encodePassword(String rawPassword){
        return passwordEncoder.encode(rawPassword);
    }

    public boolean decodePassword(String rawPassword, String encodedPassword){
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
