import $ from 'jquery';
import './index.css';

let timetableID = -1;//current timetable owner's ID, -1 = team's
let memberID = 0;//for adding new members
let memberNumber = 0;//total number of members
let timetable = new Array(7);

for(let i = 0; i<7; i++){ //making place to save the data of timetable
    timetable[i] = new Array(24);
    for (let j = 0; j<24; j++){
        timetable[i][j] = [];
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
            return `<td class = "time" data-time="${i.toString() + e.toString()}"><span></span></td>`;
        });
    }
}

function TimetableColor(percent){ //Color of timetable depending on percentage of people unavailable FINISHED
    if(percent == 1){
        return "rgb(0,0,0)";
    }else if (percent>0.9){
        return "rgb(0,0,102)";
    }else if (percent>0.8){
        return "rgb(0,0,153)";
    }else if (percent>0.7){
        return "rgb(0,0,204)";
    }else if (percent>0.6){
        return "rgb(0,0,255)";
    }else if (percent>0.5){
        return "rgb(51,51,255)";
    }else if (percent>0.4){
        return "rgb(77,77,255)";
    }else if (percent>0.3){
        return "rgb(102,102,255)";
    }else if (percent>0.2){
        return "rgb(153,153,255)";
    }else if (percent>0.1){
        return "rgb(179,179,255)";
    }else if (percent>0){
        return "rgb(204,204,255)";
    }else if (percent == 0){
        return "aliceblue";
    }else{
        console.log("Invalid percent in TimetableColor");
        return "red";
    }
}

function showMemberTimetable(memID){ //show member's timetable FINISHED
    timetableID = parseInt(memID);
    const memberName = $("#memberList").find(`[data-memberID='${timetableID}']`)[0].innerText;
    $("#timetable").find("#timetableName")[0].innerText = `${memberName}의 시간표`; //`${memberName}의 시간표
    for(let i =0; i<7;i++){
        for(let j=0; j<24;j++){
            if(timetable[i][j].includes(timetableID)){
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`).css("background-color",TimetableColor(1));
            }else{
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`).css("background-color",TimetableColor(0));
            }
        }
    }
}

$('#showTeamTimetable').click(function(){ //show team timetable FINISHED
    console.log(timetable); //testing
    timetableID = -1;
    $("#timetable").find("#timetableName")[0].innerText = `우리팀 시간표`;
    if(memberNumber>0){
        for(let i =0; i<7;i++){
            for(let j=0; j<24;j++){
                let percent = (timetable[i][j].length/memberNumber);
                $("#timetable").find(`[data-time="${i.toString() + j.toString()}"]`)[0].setAttribute("style",`background-color:${TimetableColor(percent)}`);
            }
        }
    }else{
        console.log("There are no members");
    }
})

function attachTableClickEvent(){ //to change member's timetable by click and drag FINISHED
    let day1,day2,time1,time2,include;
    let flag = 0;
    $(".time").mousedown((e) => {
        if(timetableID != -1){
            const clickedElement = $(e.currentTarget);
            day1 = parseInt(clickedElement.attr('data-time')[0]);
            time1 = parseInt(clickedElement.attr('data-time').slice(1,3));
            console.log(day1, time1);
            if (timetable[day1][time1].includes(timetableID)){
                include = 1;
            }else{
                include = 0;
            }
            flag = 1;
        }
    })
    $(".time").mouseup((e) =>{
        if (timetableID != -1){
            const clickedElement = $(e.currentTarget);
            day2 = parseInt(clickedElement.attr('data-time')[0]);
            time2 = parseInt(clickedElement.attr('data-time').slice(1,3));
            console.log(day2, time2);

            if(flag == 1){
                if(day1 >day2){
                    let temp = day1;
                    day1 = day2;
                    day2 = temp;
                }
    
                if(time1 >time2){
                    let temp = time1;
                    time1 = time2;
                    time2 = temp;
                }
    
                for(let day = day1; day<=day2; day++){
                    for(let time = time1; time <=time2; time++){
                        if (timetable[day][time].includes(timetableID) == include){ //need to change the status
                            const block = $("#timetable").find(`[data-time="${day.toString() + time.toString()}"]`);
                            if (timetable[day][time].includes(timetableID)) {//chosen
                                if (timetable[day][time].indexOf(timetableID) >= 0) { // 클릭한 시간이 times에 존재할 경우
                                    const idx  = timetable[day][time].indexOf(timetableID);
                                    timetable[day][time].pop(idx); // 그 시간에서 timetableID 제거
                                }
                                block.css('background-color', TimetableColor(0)); // white
                            } else {
                                timetable[day][time].push(timetableID);
                                block.css('background-color', TimetableColor(1)); // black
                            }
                        }
                    }
                }
            }
        }
    })
}

//memberList

$('#addMemberButton').click(function(){ //to add a new member FINISHED
    const memberName = document.getElementById("addedMember").value;
    document.getElementById("addedMember").value = "";
    $('#memberList').append(`<li class='member' data-memberID ='${memberID}' data-memberName = '${memberName}'><input type="checkbox"></input>${memberName}</li>`);
    attachMemberClickEvent(memberID);
    showMemberTimetable(memberID);
    memberNumber++;
    memberID++;
})

function attachMemberClickEvent(memID){//when member clicked, show member's timetable FINISHED
    const member= $("#memberList").find(`[data-memberID='${memID}']`);    
    $(member).click((e) =>{
        const mem = $(e.currentTarget);
        const memID = mem.attr('data-memberID');
        showMemberTimetable(memID);
    })
}

function attachShowUnavailableMembersEvent(){
    let flag = 0;
    $(".time").mouseover((e) =>{
        if(timetableID == -1 && flag ==0){
            const hoverElement = $(e.currentTarget);
            const day = parseInt(hoverElement.attr('data-time')[0]);
            const time = parseInt(hoverElement.attr('data-time').slice(1,3));
            const memIDs = timetable[day][time];
            for (let a in memIDs){
                const memberName = $("#memberList").find(`[data-memberID='${a}']`)[0].innerText;
                $("#unavailableMembers")[0].append(`${memberName} `);
            }
            $("#unavailableMembers")[0].append("is not available");
            flag = 1;
        }
    })
    $(".time").mouseout((e) =>{
        if(timetableID==-1 && flag ==1){
            $("#unavailableMembers")[0].innerText = "";
            flag = 0;
        }
    })
}


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
    attachShowUnavailableMembersEvent();
})