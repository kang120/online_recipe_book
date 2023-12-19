package com.lwk.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

	private AdminRepository adminRepository;
	
	@Autowired
	public AdminService(AdminRepository adminRepository) {
		this.adminRepository = adminRepository;
	}
	
	public List<Admin> getAdmins(){
		return adminRepository.findAll();
	}
	
	public void addAdmin(Admin admin) {
		adminRepository.save(admin);
	}
	
	public Long authenticate(Admin admin) {
		String username = admin.getUsername();
		String password = admin.getPassword();
		
		Optional<Admin> loginAdmin = adminRepository.authenticate(username, password);
		
		if(loginAdmin.isPresent()) {
			return loginAdmin.get().getId();
		}else {
			return (long) -1;
		}
	}
}
