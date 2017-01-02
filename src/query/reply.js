module.exports = function() {
      return {
          insertReply : "INSERT INTO reply (seq, context, id, makeDT, courtSeq) VALUES ((SELECT fnGetSeq('reply')), ?, ?, now(), ?)",
      };
  }
