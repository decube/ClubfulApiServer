module.exports = function() {
      return {
          insertLocation : "INSERT INTO location (seq, token, latitude, longitude, makeDT) values( (SELECT fnGetSeq('location')),?,?,?,now())",
          getTokenSeq : "SELECT fnGetSeq('location')",

      };
  }
