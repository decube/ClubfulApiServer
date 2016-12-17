module.exports = function() {
      return {
          insertCourt : "INSERT INTO court (seq, address, addressShort, cname, latitude, longitude, description, makeDT, updateDT, status, categorySeq, makenToken) VALUES (?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?, ?)",
          getCourtSeq : "SELECT fnGetSeq('court') as courtSeq",
          getCourtList : "select court.seq"
                            +", court.address"
                            +", court.addressShort"
                            +", category.categoryNM"
                            +", court.description"
                            +", img.img1 AS img"
                            +", court.cname from court court, category category, court_img img"
                        +" WHERE court.categorySeq = category.seq"
                        +" AND court.seq = img.courtSeq"
                        +" AND court.address like concat('%',?,'%')"
                        +" AND court.categorySeq = ?",
          checkInterest : "select interestYN from user_interest where courtSeq = ? and deviceToken = ?",
          getInterestCnt : "select count(*) as cnt from user_interest where courtSeq = ?",
          insertInterest : "INSERT INTO user_interest (seq, interestYN, courtSeq, deviceToken) VALUES ((SELECT fnGetSeq('interest')), 'Y', ?, ?)",
          updateInterest : "update user_interest set interestYN ='Y' where courtSeq = ? and deviceToken = ?",
          insertCourtImg : "INSERT INTO court_img (seq, img1,img2,img3,img4,img5,img6,courtSeq) VALUES ((SELECT fnGetSeq('courtImg')),?,?,?,?,?,?,?)",
          getCourt : "select seq"
                            +", address"
                            +", addressShort"
                            +", description"
                            +", cname from court court where seq = ?",
          insertReply : "INSERT INTO reply (seq, context, token, id, courtSeq) VALUES ((SELECT fnGetSeq('reply')), ?, ?, ?, ?)",
          getCourt :    "select court.seq"
                            +", court.address"
                            +", court.addressShort"
                            +", category.categoryNM"
                            +", court.description"
                            +", (select img from court_img where courtSeq = court.seq order by seq asc limit 1) as img"
                            +", court.cname from court court, category category"
                        +" WHERE court.categorySeq = category.seq"
                        +" AND court.seq = ?",
          getImgList : "SELECT * from court_img where courtSeq = ?",
      }
  }
