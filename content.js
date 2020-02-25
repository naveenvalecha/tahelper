// If the current Url is the HRM Attendance page e.g. http://hrm.techaspect.com/symfony/web/index.php/pim/viewAttendance/empNumber/1228
if (window.location.href.includes("/symfony/web/index.php/pim/viewAttendance/empNumber")) {
  var myTab = document.getElementById('DataTables_Table_0');
  var total_office_days = 0;
  var total_office_time = 0;
  var average_office_time = 0;
  for (i = 1; i < myTab.rows.length; i++) {
    var objCells = myTab.rows.item(i).cells;
    // if the Date holds the week day and the in time, out time and total time in office exists
    if (isWeekday(objCells.item(1).innerText) && objCells.item(2).innerText.length > 0 && objCells.item(3).innerText.length > 0 && objCells.item(4).innerText.length > 0) {
      // Increment the total office days and total office time.
      total_office_time += parseInt(inOfficeTime(objCells.item(4).innerText));
      total_office_days++;
    }
  }
  if (total_office_time > 0 && total_office_time > 0) {
    average_office_time = (total_office_time/ total_office_days) / 60;
    average_office_time = parseFloat(average_office_time).toFixed(2);
  }
  // Append the average office time into the table.
  var average_office_time_row = myTab.insertRow(myTab.rows.length);
  average_office_time_row.innerHTML = '<tr><td colspan="6" style="background-color: #ff0000; font-weight: bold; text-align: center;">Total days in office are '+ total_office_days +' and average time in office is '+ average_office_time +' hours.</td></tr>';
}

/*
 * It validates whether the string holds the working day string.
 *
 * @param attendance_date
 *  The string containing the week day along with other information. Example 2019-12-30 (Monday)
 *
 * @return bool
 *  Return true if the string contains the week day otherwise false.
 *
*/
function isWeekday(attendance_date) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  if (weekdays.some(function(v) { return attendance_date.indexOf(v) >= 0; })) {
    return true;
  }
  else {
    return false;
  }
}

/*
 * It returns the time of an employee inside the office in minutes.
 *
 * @param officeTime
 *  The string containing the time in office in hours and minutes. Example 8 hrs 40 min
 *
 * @return integer
 *  Return the total office time of an employee in minutes.
 *
*/
function inOfficeTime(officeTime){
  var total_time = officeTime.split(" ");
  var total_minutes = 0;
  if (total_time[0]) {
   total_minutes += parseInt(total_time[0]) * 60;
  }
  if (total_time[2]) {
    total_minutes += parseInt(total_time[2]);
  }
  return total_minutes;
}
