module.exports = function() {
      return {
          getNewestDevice : 'select * from device_ver where device=? ORDER BY seq DESC LIMIT 1',

  }
