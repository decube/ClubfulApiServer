module.exports = function() {
      return {
          getDevice: 'SELECT * FROM device WHERE uuid = ?',
          getNewCategoryVer: 'SELECT ver FROM category_ver ORDER BY makeDT DESC LIMIT 1',
          getNewNoticeVer: 'SELECT noticeVer as ver FROM notice_ver ORDER BY makeDT DESC LIMIT 1',
          getNewDeviceVer: 'SELECT ver FROM device_ver WHERE device =? AND language=? ORDER BY makeDT DESC LIMIT 1',
          getCategoryList: 'select seq, categoryNM from category where ver = ? order by seq asc',
          insertDevice : 'INSERT INTO device (token, deviceType, version, language, uuid, makeDT, updateDT, deviceVerSeq) values(?,?,?,?,?,now(),now(),(select seq from device_ver order by seq desc limit 1))',
          getTokenSeq : "SELECT fnGetSeq('token')",
      };
  }
