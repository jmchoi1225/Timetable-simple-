import $ from 'jquery';
import './index.css';

//timetable

//making timetable

var idx = 0;
var id = 0;

var times = [];

var weekday = ["월", "화", "수", "목", "금", "토", "일"];

$("#timetable").append('<tr id = "week"></tr>');

for (var i = 0; i < 7; i++) { // weekdays
    $('#week').append(`<th>${weekday[i]}</th>`);
}

for (var i =9; i<19; i++){ // times
    $("#timetable").append(
        '<tr class = "block">',
            '<td align="center">', i,':00 ~ ',i+1,':00</td>',
        '</tr>'
    )
}

for (var i = 0; i < 7; i++) { //the actual table
    $('.block').append((e) => {
        if (times[idx] === e.toString() + i.toString()) {
            idx += 1;
            return `<td>tt</td>`;
        } else {
            return `<td></td>`;
        }
    })
}

//memberList

//if you add a new member NOT FINISHED
{
    $('#memberList').append('<li><input type="checkbox" id =',id,'></li>');
    id++;
}

function deleteMember() { // if you delete a member NOT FINISHED
    var memberList = document.getElementById('memberList');
    var rowCount = memberlist.length;

    for(var i=0; i<rowCount; i++) {
        var chkbox = document.getElementById(memberlist[i])
        if(chkbox != null && chkbox.checked == true) {
            table.deleteRow(i+1);
            memberlist.splice(i, 1);
        }
    }
}