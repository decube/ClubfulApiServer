module.exports = function() {
      return {
          insertReply : "INSERT INTO reply (seq, content, id, makeDT, courtSeq) VALUES ((SELECT fnGetSeq('reply')), ?, ?, now(), ?)",
          selectReply : "select seq, content, makeDT as date, id as userId, nickName from reply reply , user_info info where reply.id = info.userId and courtSeq=? and seq>? order by seq desc",
          selectPagingReply : "select seq, content, makeDT as date, id as userId, nickName from reply reply , user_info info where reply.id = info.userId and courtSeq=? order by seq desc limit  ?, ?",  
      };   
  }
