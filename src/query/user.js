module.exports = function() {
      return {
          insertUser : 'INSERT INTO USER_INFO (user_id, password, nickName, sex, birthDay, userLatitude, userLongitude, userAddress, userAddressShort, is_notice_push, is_insert_push, is_distance_push, is_interest_push, push_start_time, push_end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          checkUser : 'SELECT * FROM USER_INFO WHERE user_id = ?',
          updateDevice : 'update device set gcm_id = ? , user_id =? where token = ?',
          getUserDevice : 'select * from user_info u, device d where u.user_id = d.user_id and u.user_id = ?',
          updateUser : 'update user_info set password=?, nickName=?, sex=?, birthDay=?,userLatitude=?,userLongitude=?, userAddress=?, userAddressShort=? where user_id = ?',
      };
  }
