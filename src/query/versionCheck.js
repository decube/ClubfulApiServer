module.exports = function() {
      return {
          getDevice: 'SELECT * FROM DEVICE WHERE UUID = ?',
          getNewCategoryVer: 'SELECT ver FROM CATEGORY_VER ORDER BY MAKE_DT DESC LIMIT 1',
          getNewNoticeVer: 'SELECT notice_ver as ver FROM NOTICE_VER ORDER BY MAKE_DT DESC LIMIT 1',
          getNewDeviceVer: 'SELECT ver FROM DEVICE_VER WHERE DEVICE =? AND LANGUAGE=? ORDER BY MAKE_DT DESC LIMIT 1',
          getCategoryList: 'select seq, category_nm from category where ver = ? order by seq asc',

      };
  }
