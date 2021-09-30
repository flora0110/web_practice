var Today=new Date();
var now_year = Today.getFullYear();
var now_month = Today.getMonth()+1;
//預設會從零開始
var now_date = Today.getDate();
function isValidDate(date,month,year){
    if(date=="" || month=="" || year==""){
        alert("輸入不符合規則");
        return false;
    }
    if( (year < (now_year-1000)) || (year > (now_year+1000)) || (month <= 0) || (month > 12) ){
        alert("輸入不符合規則");
        return false;
    }
    // Set dates for each month and adjust for leap years

      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
          monthLength[1] = 29;
      }

      // Check the range of the day
      if(date <= 0 || date > monthLength[month - 1]){
          alert("輸入不符合規則");
          return false;
      }
      return true;
}
$(function(){
  for(var i=1;i<=31;i++){
    if(i<10){
      $("#date").append($("<option value='0" + i + "'>0"+i+"</option>"));
    }else{
      $("#date").append($("<option value='" + i + "'>"+i+"</option>"));
    }
  }
  var month = ["n","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
  for(var i=1;i<=12;i++){
      if(i<10){
        $("#month").append($("<option value='0" + i + "--"+month[i]+"'>0" + i + "--"+month[i]+"</option>"));
      }else{
        $("#month").append($("<option value='" + i + "--"+month[i]+"'>" + i + "--"+month[i]+ "</option>"));
      }
  }
  for(var i=-1000;i<=1000;i++){
    $("#year").append($("<option value='" + (i+now_year) + "'>"));
  }
  $("#btn").click(function(){
      $("#date").val(now_date);
      $("#month").val(now_month);
      $("#year").val(now_year);
  });
  $("#cnt").click(function(){
      var date  = ($("#date").val());
      var month = $("#month").val();
      var year = $("#year").val();
      var chan_date = ($(".date").val() !== "")?$(".date").val():0;
      var chan_week = ($(".week").val() !== "")?$(".week").val():0;
      var chan_month = ($(".month").val() !== "")?$(".month").val():0;
      var chan_year = ($(".year").val() !== "")?$(".year").val():0;
      if(isValidDate(date,month,year)){
          var dat = new Date(year,month,date, 0, 0, 0, 0);
          var start = "開始日期: " + dat.toDateString();
          var msg="";
          if($("select").val() === "+") {
              dat.setDate(dat.getDate() + chan_date + chan_week*7);
              dat.setMonth(dat.getMonth() + chan_month);
              dat.setFullYear(dat.getFullYear() + chan_year);
              msg += "開始日期往後" + chan_year.toString() + "年" + chan_month.toString() + "月" + chan_week.toString() + "週" + chan_date.toString() + "天: " + dat.toDateString();
          }
          else if($("select").val() === "-") {
              dat.setDate(dat.getDate() - chan_date - chan_week*7);
              dat.setMonth(dat.getMonth() - chan_month);
              dat.setFullYear(dat.getFullYear() - chan_year);
              msg += "開始日期往前" + chan_year.toString() + "年" + chan_month.toString() + "月" + chan_week.toString() + "週" + chan_date.toString() + "天: " + dat.toDateString();
          }
          $("#end").append($("<p>"+start+"</p>"));
          $("#end").append($("<p>"+msg+"</p>"));
      }
  });
});
