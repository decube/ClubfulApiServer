module.exports = function() {
      return {
          insertCourt : "INSERT INTO COURT (seq, address, addressShort, cname, latitude, longitude, description, makeDT, updateDT, status, categorySeq, makenToken) VALUES ((SELECT fnGetSeq('court')), ?, ?, ?, ?, ?, ?, now(), now(), ?, ?, ?)",
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
          checkInterest : "select interestYN from INTEREST where courtSeq = ? and deviceToken = ?",
          getInterestCnt : "select count(*) as cnt from INTEREST where courtSeq = ?",
          insertInterest : "INSERT INTO INTEREST (seq, interestYN, courtSeq, deviceToken) VALUES ((SELECT fnGetSeq('interest')), 'Y', ?, ?)",
          updateInterest : "update INTEREST set interestYN ='Y' where courtSeq = ? and deviceToken = ?",
      }
  }
