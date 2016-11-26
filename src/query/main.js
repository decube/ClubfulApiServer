module.exports = function() {
      return {

          getCourtList : "select court.seq"
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
