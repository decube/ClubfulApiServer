module.exports = function() {
      return {
          insertCourt : "INSERT INTO COURT (seq, address, addressShort, cname, latitude, longitude, description, make_dt, update_dt, status, category_seq) VALUES ((SELECT fn_get_seq('court')), ?, ?, ?, ?, ?, ?, now(), now(), ?, ?)",
          getCourtSeq : "SELECT fn_get_seq('court')",
          getCourtList : "select court.seq"
                            +", court.address"
                            +", court.addressShort"
                            +", category.category_nm"
                            +", court.description"
                            +", court.cname from court court, category category"
                        +" WHERE court.category_seq = category.seq"
                        +" AND court.address like concat('%',?,'%')"
                        +" AND court.category_seq = ?",
          checkInterest : "select interest_yn from INTEREST where court_seq = ? and device_token = ?",
          getInterestCnt : "select count(*) as cnt from INTEREST where court_seq = ?",
          insertInterest : "INSERT INTO INTEREST (seq, interest_yn, court_seq, device_token) VALUES ((SELECT fn_get_seq('interest')), 'Y', ?, ?)",
          updateInterest : "update INTEREST set interest_yn ='Y' where court_seq = ? and device_token = ?",
      }
  }
