module.exports = function() {
      return {

        insertCategory :  "INSERT INTO category (seq, ver, categoryNM, makeDT, updateDT, categoryVerSeq, status) values( (SELECT fnGetSeq('category')),(select MAX(ver) from category_ver),?,now(),now(),(select seq from category_ver where ver=(select MAX(ver) from category_ver)), 'N')",

      }
}
