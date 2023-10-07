
function calculateDays() {
    let startDateInput = document.getElementById("start-date").value;
    let endDateInput = document.getElementById("end-date").value;

    let startDate = new Date(startDateInput);
    let endDate = new Date(endDateInput);

    let timeDiff = endDate - startDate;
    let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    document.getElementById("result").innerHTML = "จำนวนวัน: " + daysDiff + " วัน";
  }
// รับข้อมูลวันที่ปัจจุบัน
// let currentDate = new Date().toLocaleDateString('fr-ca');
let currentDate = new Date();
let currentDateString = currentDate.toISOString().split('T')[0];
// // ตั้งค่าวันที่สูงสุดใน input เป็นวันปัจจุบัน
document.getElementById("start-date").setAttribute("min", currentDateString);
document.getElementById("end-date").setAttribute("min", currentDateString);










// // รับค่าวันเริ่มต้นและวันที่สิ้นสุดจากผู้ใช้
// var startDateInput = prompt("ป้อนวันที่เริ่มต้น (yyyy-mm-dd):");
// var endDateInput = prompt("ป้อนวันที่สิ้นสุด (yyyy-mm-dd):");

// // แปลงข้อความที่รับมาเป็นวัตถุ Date
// var startDate = new Date(startDateInput);
// var endDate = new Date(endDateInput);

// // คำนวณผลต่างของเวลาเป็นมิลลิวินาที
// var timeDiff = endDate - startDate;

// // คำนวณจำนวนวันระหว่างวันที่ทั้งสอง
// var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

// console.log("วันที่เริ่มต้น:", startDate.toDateString());
// console.log("วันที่สิ้นสุด:", endDate.toDateString());
// console.log("จำนวนวัน:", daysDiff, "วัน");

