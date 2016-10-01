module.exports = function() {
      return {
          getDevice: 'SELECT * FROM DEVICE WHERE UUID = ?',
          getNewCategoryVer: 'SELECT ver FROM CATEGORY_VER ORDER BY MAKEDT DESC LIMIT 1',
          getNewNoticeVer: 'SELECT noticeVer as ver FROM NOTICE_VER ORDER BY MAKEDT DESC LIMIT 1',
          getNewDeviceVer: 'SELECT ver FROM DEVICE_VER WHERE DEVICE =? AND LANGUAGE=? ORDER BY MAKEDT DESC LIMIT 1',
          getCategoryList: 'select seq, categoryNM from category where ver = ? order by seq asc',
          insertDevice : 'INSERT INTO DEVICE (token, device_type, version, language, uuid, makeDT, updateDT, deviceVerSeq) values(?,?,?,?,?,now(),now(),(select seq from device_ver order by seq desc limit 1))',
          getTokenSeq : "SELECT fn_get_seq('token')",
      };
  }
