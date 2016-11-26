module.exports = function() {
      return {
          insertLocation : "INSERT INTO location (seq, token, latitude, longitude) values(SELECT fnGetSeq('location'),?,?,?)",
          getTokenSeq : "SELECT fnGetSeq('location')",

      };
  }
