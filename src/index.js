import $ from 'jquery';
import './index.css';

let timetableID = -1;//current timetable owner's ID, -1 = team's
let memberID = 0;//for adding new members
let memberNumber = 0;//total number of members
let timetable = new Array(7);

for(let i = 0; i<7; i++){
    timetable[i] = new Array(24);
    for (let j = 0; j<24; j++){
        timetable[i][j] = new Array();
    }
}

//timetable

function drawTable(){//Drawing the timetable in the beginning Finished

    var weekday = ["월", "화", "수", "목", "금", "토", "일"];

    $("#timetable").append('<tr id = "week"></tr>');
    $("#week").append('<th id = "timetableName" align:center>우리팀 시간표</th>');

    for (var i = 0; i < 7; i++) { // weekdays
        $('#week').append(`<th>${weekday[i]}</th>`); //질문: 왜 ${}을 사용할 때 '대신 `을 사용하는지
    }

    for (var i =0; i<24; i++){ // times
        $("#timetable").append(
            `<tr class = "block"><td align = "center" class = "range">${i}:00 ~${i+1}:00</td></tr>`
        )
    }

    for (var i = 0; i < 7; i++) { //the actual table
        $('.block').append((e) => {
            return `<td class = "time" data-time="${i.toString() + e.toString()}"></td>`;
        });
    }
}


$('#showTeamTimetable').click(function(){ //show team timetable NOT TESTED
    if(memberNumber>0){
        for(var i =0; i<7;i++){
            for(var j=0; j<24;j++){
                var color = 255*(timetable[i][j].length/memberNumber);
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`).setAttribute("style",`background-color:rgb(0,0,0,${color})`);
            }
        }
    }
})

function showMemberTimetable(memID){ //NOT TESTED
    timetableID = memID;
    const memberName = $("#memberList").find(`[data-memberID='${timetableID}']`)[0].innerText;
    $("#timetable").find("#timetableName")[0].innerText = `${memberName}의 시간표`; //`${memberName}의 시간표
    for(let i =0; i<7;i++){
        for(let j=0; j<24;j++){
            if(timetable[i][j].includes(timetableID)){
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`).css("background-color","rgb(0,0,0,255)");
                console.log("Checking and coloring black");
            }else{
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`).css("background-color","rgb(0,0,0,0)");
                console.log("Checking and coloring white");
            }
        }
    }
    console.log("Checking complete");
}

function attachTableClickEvent(){ //when timetable space clicked,
    $(".time").click((e) => {
    if(timetableID != -1){
        const clickedElement = $(e.currentTarget);
        const day = parseInt(clickedElement.attr('data-time')[0]);
        const time = parseInt(clickedElement.attr('data-time').slice(1,3));

        if (timetable[day][time].includes(timetableID)) {//chosen
            if (timetable[day][time].indexOf(timetableID) >= 0) { // 클릭한 시간이 times에 존재할 경우
                const idx  = timetable[day][time].indexOf(timetableID);
                timetable[day][time].pop(idx); // 그 시간에서 timetableID 제거
            }
            clickedElement.css('background-color', 'rgba(0, 0, 0, 0)'); // white
        } else {
            timetable[day][time].push(timetableID);
            clickedElement.css('background-color', 'rgba(0, 0, 0, 255)'); // black
        }
        console.log(day, time, timetable[day][time]);
    }
})
}

//memberList

$('#addMemberButton').click(function(){ //if you add a new member FINISHED
    var memberName = document.getElementById("addedMember").value;
    document.getElementById("addedMember").value = "";
    $('#memberList').append(`<li data-memberID ='${memberID}' data-memberName = '${memberName}'><input type="checkbox"></input>${memberName}</li>`);
    showMemberTimetable(memberID);
    memberNumber++;
    memberID++;
})

$('deleteMemberButton').click(function(){ // if you delete a member NOT FINISHED
    var memberList = document.getElementById('memberList');
    var rowCount = memberlist.length;

    for(var i=0; i<rowCount; i++) {
        var chkbox = document.getElementById(memberlist[i])
        if(chkbox != null && chkbox.checked == true) {
            table.deleteRow(i+1);
            memberlist.splice(i, 1);
        }
    }
    //need to subtract from memberNumber
})

$(document).ready(()=>{
    drawTable();
    attachTableClickEvent();
})