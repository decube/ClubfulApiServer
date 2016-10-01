module.exports = function() {
      return {
          insertUser : 'INSERT INTO USER_INFO (userID, password, nickName, sex, birthDay, userLatitude, userLongitude, userAddress, userAddressShort, isNoticePush, isInsertPush, isDistancePush, isInterestPush, pushStartTime, pushEndTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          checkUser : 'SELECT * FROM USER_INFO WHERE userID = ?',
          updateDevice : 'update device set gcmID = ? , userID =? where token = ?',
          getUserDevice : 'select * from user_info u, device d where u.userID = d.userID and u.userID = ?',
          updateUser : 'update user_info set password=?, nickName=?, sex=?, birthDay=?,userLatitude=?,userLongitude=?, userAddress=?, userAddressShort=? where userID = ?',
          logoutCheck : 'select * from user_info u, device d where u.userID = d.userID and u.userID = ? and d.token = ?',
          updateUserSetting : 'update user_info set isNoticePush=?, isInsertPush=?, isInterestPush=?, isDistancePush=?,pushStartTime=?,pushEndTime=? where userID = ?',
      };
  }
