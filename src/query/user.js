module.exports = function() {
      return {
          insertUser : 'INSERT INTO user_info (userID, password, nickName, sex, birthDay, userLatitude, userLongitude, userAddress, userAddressShort, isNoticePush, isInsertPush, isDistancePush, isInterestPush, pushStartTime, pushEndTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          checkUser : 'SELECT * FROM user_info WHERE userID = ?',
          updateDevice : 'update device set gcmID = ? , userID =? where token = ?',
          getUserDevice : 'select u.* from user_info u, device d where u.userID = d.userID and u.userID = ?',
          updateUser : 'update user_info set password=?, nickName=?, sex=?, birthDay=?,userLatitude=?,userLongitude=?, userAddress=?, userAddressShort=? where userID = ?',
          logoutCheck : 'select u.userId from user_info u, device d where u.userID = d.userID and u.userID = ? and d.token = ?',
          updateUserSetting : 'update user_info set isNoticePush=?, isInsertPush=?, isInterestPush=?, isDistancePush=?,pushStartTime=?,pushEndTime=? where userID = ?',
          getUserInterestList : 'select A.seq,C.img1,C.img2,C.img3,C.img4,C.img5,C.img6,A.address,A.addressShort,A.cname,D.categoryNM as categoryName  from court A, user_interest B, court_img C, category D where A.seq = B.courtSeq and A.seq = C.courtSeq and A.categorySeq = D.seq and B.deviceToken = ?',
          getUserInsertList : 'select A.seq,C.img1 as image1,C.img2 as image2,C.img3 as image3,C.img4 as image4,C.img5 as image5,C.img6 as image6,A.address,A.addressShort,A.cname,D.categoryNM as categoryName  from court A, user_interest B, court_img C, category D where A.seq = B.courtSeq and A.seq = C.courtSeq and A.categorySeq = D.seq and A.makenToken = ?',

      };
  }
