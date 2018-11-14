import $ from 'jquery';
import './timetable.css';

//making timetable

var idx = 0;

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

