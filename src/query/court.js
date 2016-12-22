module.exports = function() {
      return {
          insertCourt : "INSERT INTO court (seq, address, addressShort, cname, latitude, longitude, description, makeDT, updateDT, status, categorySeq, makenToken) VALUES (?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?, ?)",
          getCourtSeq : "SELECT fnGetSeq('court') as courtSeq",
          getCourtList : "select court.seq"
                            +", court.address"
                            +", court.addressShort"
                            +", court.latitude"
                            +", court.longitude"
                            +", category.categoryNM"
                            +", court.description"
                            +", img.img1 as image1"
                            +", court.cname from court court, category category, court_img img"
                        +" WHERE court.categorySeq = category.seq"
                        +" AND court.seq = img.courtSeq"
                        +" AND (court.address like concat('%',?,'%') OR court.cname like concat('%',?,'%')  )"
                        +" AND court.categorySeq = ?",
          getCourtList2 : "select court.seq"
                            +", court.address"
                            +", court.addressShort"
                            +", court.latitude"
                            +", court.longitude"
                            +", category.categoryNM"
                            +", court.description"
                            +", img.img1 as image1"
                            +", court.cname from court court, category category, court_img img"
                        +" WHERE court.categorySeq = category.seq"
                        +" AND court.seq = img.courtSeq"
                        +" AND ( court.address like concat('%',?,'%') OR court.cname like concat('%',?,'%')  )"
                        +" AND court.categorySeq != ?",
          checkInterest : "select interestYN from user_interest where courtSeq = ? and deviceToken = ?",
          getInterestCnt : "select count(*) as cnt from user_interest where courtSeq = ? and interestYN = 'y'",
          insertInterest : "INSERT INTO user_interest (seq, interestYN, courtSeq, deviceToken) VALUES ((SELECT fnGetSeq('interest')), ?, ?, ?)",
          updateInterest : "update user_interest set interestYN =? where courtSeq = ? and deviceToken = ?",

          insertCourtImg : "INSERT INTO court_img (seq, img1,img2,img3,img4,img5,img6,courtSeq) VALUES ((SELECT fnGetSeq('courtImg')),?,?,?,?,?,?,?)",
          getCourt : "select seq"
                            +", address"
                            +", addressShort"
                            +", description"
                            +", cname "
                            +", (select count(*) from user_interest where courtSeq= ? ) as interest from court court where seq = ?",
          insertReply : "INSERT INTO reply (seq, context, token, id, courtSeq) VALUES ((SELECT fnGetSeq('reply')), ?, ?, ?, ?)",
          getCourt :    "select court.seq"
                            +", court.address"
                            +", court.addressShort"
                            +", category.categoryNM"
                            +", court.description"
                            +", court.latitude"
                            +", court.longitude"
                            +", img.img1 AS image1"
                            +", img.img2 AS image2"
                            +", img.img3 AS image3"
                            +", img.img4 AS image4"
                            +", img.img5 AS image5"
                            +", img.img6 AS image6"
                            +", court.cname,  (select count(*) from user_interest where courtSeq= ? and interestYN='Y') as interest from court court, category category , court_img img"
                        +" WHERE court.categorySeq = category.seq"
                        +" AND court.seq = img.courtSeq"
                        +" AND court.seq = ?",
          getImgList : "SELECT * from court_img where courtSeq = ?",
          getMainCourtList : "select court.seq"
                            +", category.categorySeq"
                            +", category.categoryNM"
                            +", court.address"
                            +", court.addressShort"
                            +", court.cname"
                            +", court.latitude"
                            +", court.longitude"
                            +", court.description"
                            +", (select img from court_img where courtSeq = court.seq order by seq asc limit 1) as img"
                            +", (select count(*) from user_interest where courtSeq = court.seq ) as interest"
                            +" from court court, category category"
                        +" WHERE court.categorySeq = category.seq"
                        +" AND court.categorySeq = ?"
                        +"order by court.seq desc "
                        +"limit  (? - 1) * ?, ? "
      }
  }
