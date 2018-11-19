import $ from 'jquery';
import './index.css';

let timetableID = -1;//current timetable owner's ID, -1 = team's
let memberID = 0;//for adding new members
let memberNumber = 0;//total number of members
let timetable = new Array(7);

for(let i = 0; i<7; i++){ //making place to save the data of timetable
    timetable[i] = new Array(24);
    for (let j = 0; j<24; j++){
        timetable[i][j] = new Array();
    }
}

//timetable

function drawTable(){//Drawing the timetable in the beginning FINISHED

    const weekday = ["월", "화", "수", "목", "금", "토", "일"];

    $("#timetable").append('<tr id = "week"></tr>');
    $("#week").append('<th id = "timetableName" align:center>우리팀 시간표</th>');

    for (let i = 0; i < 7; i++) { // weekdays
        $('#week').append(`<th>${weekday[i]}</th>`); //질문: 왜 ${}을 사용할 때 '대신 `을 사용하는지
    }

    for (let i =0; i<24; i++){ // times
        $("#timetable").append(
            `<tr class = "block"><td align = "center" class = "range">${i}:00 ~${i+1}:00</td></tr>`
        )
    }

    for (let i = 0; i < 7; i++) { //the actual table
        $('.block').append((e) => {
            return `<td class = "time" data-time="${i.toString() + e.toString()}"></td>`;
        });
    }
}


$('#showTeamTimetable').click(function(){ //show team timetable NOT TESTED
    if(memberNumber>0){
        console.log("in showing team timetable");
        for(let i =0; i<7;i++){
            for(let j=0; j<24;j++){
                let color = (255*(1-(timetable[i][j].length/memberNumber)))>>0;
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`)[0].setAttribute("style",`background-color:rgb(color,color,color)`);
            }
        }
    }
})

function showMemberTimetable(memID){ //FINISHED
    timetableID = memID;
    const memberName = $("#memberList").find(`[data-memberID='${timetableID}']`)[0].innerText;
    $("#timetable").find("#timetableName")[0].innerText = `${memberName}의 시간표`; //`${memberName}의 시간표
    for(let i =0; i<7;i++){
        for(let j=0; j<24;j++){
            if(timetable[i][j].includes(timetableID)){
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`).css("background-color","rgb(0,0,0)");
            }else{
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`).css("background-color","rgb(255,255,255)");
            }
        }
    }
}

function attachTableClickEvent(){ //to change member's timetable FINISHED
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
    }
})
}

//memberList

$('#addMemberButton').click(function(){ //to add a new member FINISHED
    const memberName = document.getElementById("addedMember").value;
    document.getElementById("addedMember").value = "";
    $('#memberList').append(`<li data-memberID ='${memberID}' data-memberName = '${memberName}'><input type="checkbox"></input>${memberName}</li>`);
    showMemberTimetable(memberID);
    memberNumber++;
    memberID++;
})

$('#deleteMemberButton').click(function(){ // to delete a member FINISHED
    const memberList = $("#memberList").find("li");
    for(let i = memberNumber-1; i>=0; i--){
        const chkbox = memberList[i].children[0];
        if(chkbox != null && chkbox.checked == true) {
            deleteMemberfromTimetable(memberList[i].getAttribute('data-memberID'));
            memberList[i].remove();
            memberNumber--;
        }
    }
})

function deleteMemberfromTimetable(memID){//to delete deleted member's data on timetable FINISHED
    for(let i = 0; i<7; i++){
        for (let j = 0; j<24; j++){
            console.log(i,j,timetable[i][j],timetable[i][j].includes(parseInt(memID)));
            if(timetable[i][j].includes(parseInt(memID))){
                console.log("deleted");
                const idx = timetable[i][j].indexOf(memID);
                timetable[i][j].pop(idx);
            }
        }
    }
}

$(document).ready(()=>{
    drawTable();
    attachTableClickEvent();
})