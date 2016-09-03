module.exports = function() {
      return {
          insertUser : 'INSERT INTO USER_INFO (user_id, password, nickName, sex, birthDay, userLatitude, userLongitude, userAddress, userAddressShort, noticePush, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          checkUser: 'SELECT * FROM USER_INFO WHERE user_id = ?',

      };
  }
