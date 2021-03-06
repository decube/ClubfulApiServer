module.exports = function() {
      return {
          insertUser : 'INSERT INTO user_info (userID, password, nickName, sex, birthDay, userLatitude, userLongitude, userAddress, userAddressShort, isNoticePush, isInsertPush, isDistancePush, isInterestPush, pushStartTime, pushEndTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          checkUser : 'SELECT * FROM user_info WHERE userID = ?',
          updateDevice : 'update device set gcmID = ? , userID =? where token = ?',
          getUserDevice : 'select u.* from user_info u, device d where u.userID = d.userID and u.userID = ?',
          updateUser : 'update user_info set password=?, nickName=? where userID = ?',
          updateOtherUser : 'update user_info set nickName=? where userID = ?',
          logoutCheck : 'select u.userId from user_info u, device d where u.userID = d.userID and u.userID = ? and d.token = ?',
          updateUserSetting : 'update user_info set isNoticePush=?, isInsertPush=?, isInterestPush=?, isDistancePush=?,pushStartTime=?,pushEndTime=? where userID = ?',
          getUserInterestList : "select A.seq,C.img1 as image1,C.img2 as image2,C.img3 as image3,C.img4 as image4,C.img5 as image5,C.img6 as image6,A.address,A.addressShort,A.cname,D.categoryNM  from court A, user_interest B, court_img C, category D where A.seq = B.courtSeq and A.seq = C.courtSeq and A.categorySeq = D.seq and B.interestYN='Y' and B.deviceToken = ?",
          getUserInsertList : 'select A.seq,C.img1 as image1,C.img2 as image2,C.img3 as image3,C.img4 as image4,C.img5 as image5,C.img6 as image6,A.address,A.addressShort,A.cname,D.categoryNM  from court A, court_img C, category D where  A.seq = C.courtSeq and A.categorySeq = D.seq and A.makenToken = ?',
          upateAppSet : 'update user_info set pushStartTime=?, pushEndTime=?, isNoticePush=?, isInsertPush=?, isDistancePush=?, isInterestPush=? where userId=?',
          updateUserInfo : 'update user_info set sex=?, birthDay=?, userLatitude=?, userLongitude=?, userAddress=?, userAddressShort=? where userId=?',
      };
  }
