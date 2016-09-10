module.exports = function() {
      return {
          insertUser : 'INSERT INTO USER_INFO (user_id, password, nickName, sex, birthDay, userLatitude, userLongitude, userAddress, userAddressShort, is_notice_push, is_interest_push, push_start_time, push_end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          checkUser: 'SELECT * FROM USER_INFO WHERE user_id = ?',

      };
  }
