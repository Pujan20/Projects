package com.example.LoginApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserCredRepo {

	@Autowired
    private  JdbcTemplate jdbcTemplate;

    @SuppressWarnings("deprecation")
	public userCredentials findByUsername(String username) {
        try{String sql = "SELECT * FROM userCredentials WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, (resultSet, rowNum) ->
                new userCredentials(
                        resultSet.getString("username"),
                        resultSet.getString("password")
                )
        );
    }catch (EmptyResultDataAccessException e) {
    	
               return null; 
               
    }
}

    public void save(userCredentials user) {
        String sql = "INSERT INTO userCredentials (username, password) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getUsername(), user.getPassword());
    }
    
    
    public void saveDashboardData(DashboardData dashboardData) {
        try {
			String sql = "INSERT INTO dashboard_data(`name`, `procedure`, `place`, `procedureBy`, `dateTime`)"+
					"VALUES (?,?,?,?,?)";


			 jdbcTemplate.update(sql,
		                dashboardData.getName(),
		                dashboardData.getProcedure(),
		                dashboardData.getPlace(),
		                dashboardData.getProcedureBy(),
		                dashboardData.getDateTime());
		                }
        catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
