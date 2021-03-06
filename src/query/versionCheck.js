module.exports = function() {
      return {
          insertReply: 'SELECT * FROM device WHERE uuid = ?',
          getNewCategoryVer: 'SELECT ver FROM category_ver ORDER BY makeDT DESC LIMIT 1',
          getNewNoticeVer: 'SELECT noticeVer as ver FROM notice_ver ORDER BY makeDT DESC LIMIT 1',
          getNewDeviceVer: 'SELECT ver FROM device_ver WHERE device =? AND language=? ORDER BY makeDT DESC LIMIT 1',
          getCategoryList: "select seq, categoryNM from category where ver = ? and status='Y' order by seq asc",
          insertDevice : 'INSERT INTO device (token, deviceType, language, uuid, makeDT, updateDT, deviceVerSeq) values(?,?,?,?,now(),now(),(select seq from device_ver where device = ? order by seq desc limit 1))',
          getTokenSeq : "SELECT fnGetSeq('token') as tokenSeq",
          getNewestDevice : 'select * from device_ver where device=? ORDER BY seq DESC LIMIT 1'
      };
  }
