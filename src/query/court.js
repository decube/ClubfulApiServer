module.exports = function() {
      return {
          insertCourt : "INSERT INTO court (seq, address, addressShort, cname, latitude, longitude, description, picArrayCnt, make_dt, update_dt, status, category_seq) VALUES ((SELECT fn_get_seq('court')), ?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?)",
          getCourtSeq : "SELECT fn_get_seq('court')",
      };
  }
