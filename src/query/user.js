module.exports = function() {
      return {
          insertUser : 'INSERT INTO user_info (userID, password, nickName, sex, birthDay, userLatitude, userLongitude, userAddress, userAddressShort, isNoticePush, isInsertPush, isDistancePush, isInterestPush, pushStartTime, pushEndTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          checkUser : 'SELECT * FROM user_info WHERE userID = ?',
          updateDevice : 'update device set gcmID = ? , userID =? where token = ?',
          getUserDevice : 'select u.* from user_info u, device d where u.userID = d.userID and u.userID = ?',
          updateUser : 'update user_info set password=?, nickName=?, sex=?, birthDay=?,userLatitude=?,userLongitude=?, userAddress=?, userAddressShort=? where userID = ?',
          logoutCheck : 'select u.userId from user_info u, device d where u.userID = d.userID and u.userID = ? and d.token = ?',
          updateUserSetting : 'update user_info set isNoticePush=?, isInsertPush=?, isInterestPush=?, isDistancePush=?,pushStartTime=?,pushEndTime=? where userID = ?',
      };
  }
