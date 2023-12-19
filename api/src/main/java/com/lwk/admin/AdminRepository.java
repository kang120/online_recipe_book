package com.lwk.admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
	
	@Query("SELECT a FROM Admin a WHERE a.username=?1 and a.password=?2")
	Optional<Admin> authenticate(String username, String password);
}
