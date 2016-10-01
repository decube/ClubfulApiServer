module.exports = function() {
      return {
          getNewestDevice : 'select * from deviceVer where device=? ORDER BY seq DESC LIMIT 1'
        };
  }
