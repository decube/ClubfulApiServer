module.exports = function() {
      return {
          insertCourt : "INSERT INTO court (seq, address, addressShort, cname, latitude, longitude, description, makeDT, updateDT, status, categorySeq, makenToken) VALUES (?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?, ?)",
          getCourtSeq : "SELECT fnGetSeq('court')",
          getCourtList : "select court.seq"
                            +", court.address"
                            +", court.addressShort"
                            +", category.categoryNM"
                            +", court.description"
                            +", court.cname from court court, category category"
                        +" WHERE court.categorySeq = category.seq"
                        +" AND court.address like concat('%',?,'%')"
                        +" AND court.categorySeq = ?",
          checkInterest : "select interestYN from user_interest where courtSeq = ? and deviceToken = ?",
          getInterestCnt : "select count(*) as cnt from user_interest where courtSeq = ?",
          insertInterest : "INSERT INTO user_interest (seq, interestYN, courtSeq, deviceToken) VALUES ((SELECT fnGetSeq('interest')), 'Y', ?, ?)",
          updateInterest : "update user_interest set interestYN ='Y' where courtSeq = ? and deviceToken = ?",
          insertCourt : "INSERT INTO court_img (seq, img, courtSeq) VALUES ((SELECT fnGetSeq('courtImg')), ?, ?)",
          getCourt : "select seq"
                            +", address"
                            +", addressShort"
                            +", description"
                            +", cname from court court where seq = ?",
                            
      }
  }
