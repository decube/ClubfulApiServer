module.exports = function() {
      return {
          insertCourt : "INSERT INTO COURT (seq, address, addressShort, cname, latitude, longitude, description, picArrayCnt, make_dt, update_dt, status, category_seq) VALUES ((SELECT fn_get_seq('court')), ?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?)",
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
      }
  }
