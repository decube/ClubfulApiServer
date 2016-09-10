module.exports = function() {
      return {
          getDevice: 'SELECT * FROM DEVICE WHERE UUID = ?',
          getNewCategoryVer: 'SELECT ver FROM CATEGORY_VER ORDER BY MAKE_DT DESC LIMIT 1',
          getNewNoticeVer: 'SELECT notice_ver as ver FROM NOTICE_VER ORDER BY MAKE_DT DESC LIMIT 1',
          getNewDeviceVer: 'SELECT ver FROM DEVICE_VER WHERE DEVICE =? AND LANGUAGE=? ORDER BY MAKE_DT DESC LIMIT 1',
          getCategoryList: 'select seq, category_nm from category where ver = ? order by seq asc',
          insertDevice : 'INSERT INTO DEVICE (token, device_type, version, language, uuid, make_dt, update_dt, device_ver_seq) values(?,?,?,?,?,now(),now(),(select seq from device_ver order by seq desc limit 1))',
          getTokenSeq : "SELECT fn_get_seq('token')",
      };
  }
