import $ from 'jquery';
import './index.css';

//timetable

//making timetable

var idx = 0;
var id = 0;

function drawTable(){

    var i;

    var weekday = ["월", "화", "수", "목", "금", "토", "일"];

    $("#timetable").append('<tr id = "week"></tr>');
    $("#week").append('<th class = "time">시간</th>');

    for (i = 0; i < 7; i++) { // weekdays
        $('#week').append(`<th>${weekday[i]}</th>`); //질문: 왜 ${}을 사용할 때 '대신 `을 사용하는지
    }

    for (i =9; i<19; i++){ // times
        $("#timetable").append(
            `<tr class = "block"><td align = "center" class = "range">${i}:00 ~${i+1}:00</td></tr>`
        )
    }

    for (i = 0; i < 7; i++) { //the actual table
        $('.block').append(`<td class = "time"></td>`);
    }
}


//memberList

//if you add a new member NOT FINISHED
function addMember(){
    $('#memberList').append(`<li><input type="checkbox" id =${id}></li>`);
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

$(document).ready(()=>{
    drawTable();
})