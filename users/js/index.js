$(document).ready(function() {
    let studentCount = 0;
    const randomNumbers = [0];
    const students = [
        { id: ++studentCount, name: "علی تقوایی", turn: createRandomNumber(50) },
    ];
    let mySortVar = 1;
    let timerID = setInterval(showDate, 1000);

    myRead();

    function showDate() {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        hour < 10 ? hour = "0" + hour : hour;
        minute < 10 ? minute = "0" + minute : minute;
        second < 10 ? second = "0" + second : second;
        $(".container-date").html(`<span id='hour'>${hour}</span><span id='minute'>${minute}</span><span id='second'>${second}</span>`);
    }

    function myRead(sortType) {
        let text = "";
        if (students.length == 0) {
            $("#delLastTurn").attr("disabled", "disabled").addClass("disabled");
            text = `<tr><td colspan='5'>هیچ کاربری وجود ندارد</td></tr>`;
            $("table > tbody").html(text);
        } else {
            $("#delLastTurn").removeAttr("disabled").removeClass("disabled");
            if (students.length >= 50) {
                $("#add").attr("disabled", "disabled").addClass("disabled");
                $("#countStudent").addClass("redColor");
            } else {
                $("#add").removeAttr("disabled").removeClass("disabled");
                $("#countStudent").removeClass("redColor");
            }
            switch (sortType) {
                case "name":
                    students.sort(function(a, b) {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();
                        if (x < y) {
                            return -1 * mySortVar;
                        }
                        if (x > y) {
                            return 1 * mySortVar;
                        }
                        return 0;
                    });
                    break;
                case "turn":
                    students.sort(function(a, b) {
                        return (a.turn - b.turn) * mySortVar;
                    });
                    break;

                default:
                    break;
            }
            for (let i in students) {
                text += `<tr id=${students[i].id}>
                        <td>${Number(i) + 1}</td>
                        <td class='edit'>${students[i].name}</td>
                        <td class='turn'>${students[i].turn}</td>
                        <td><button class = "delete"><i class="fas fa-trash-alt"></i></button></td>
                        <td><button class = "update"><i class="fas fa-edit"></i></button></td>
                        </tr>`;
            }
            $("table > tbody").html(text);
            $(".delete").on("click", deleteUser);
            $(".update").on("click", updateUser);
            ShowCountStudent(students.length);
            const turns = getTurns(students);
            showMaxTurn(turns);
        }
    }

    $("#add").click(function(event) {
        event.preventDefault();
        event.stopPropagation();

        let stuName = $("#name").val();
        if (checkName(stuName)) {
            myCreate(stuName);
            showSuccess();
            $("#name").val("");
        } else {
            showErr();
        }
    });

    $("#delLastTurn").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        students.sort(function(a, b) {
            return (a.turn - b.turn) * mySortVar;
        });
        students.pop();
        myRead();
        showSuccess();
    });

    $(".btn").on("click", function() {
        $(this).parents(".toast").fadeOut(700);
    });

    $('input#filterName').on('input', function(event) {
        event.stopPropagation();
        let value = $(this).val();
        let text = "";
        let results = students.filter(obj => {
            return obj.name.includes(value);
        });
        if (results.length > 0) {
            for (let i in results) {
                text += `<tr id=${results[i].id}>
                        <td>${Number(i) + 1}</td>
                        <td class='edit'>${results[i].name}</td>
                        <td class='turn'>${results[i].turn}</td>
                        <td><button class = "delete"><i class="fas fa-trash-alt"></i></button></td>
                        <td><button class = "update"><i class="fas fa-edit"></i></button></td>
                        </tr>`;
            }
            $("table > tbody").html(text);
            $(".delete").on("click", deleteUser);
            $(".update").on("click", updateUser);
            ShowCountStudent(results.length);
            const turns = getTurns(results);
            showMaxTurn(turns);
        } else {
            text += `<tr><td colspan='5'>نتیجه ای پیدا نشد <span style="fons-size:14px;">&#128531;</span></td></tr>`;
            $("table > tbody").html(text);
        }

    });

    $('input#filterAverage').on('input', function(event) {
        event.stopPropagation();
        let val = $(this).val();
        val = String(val);
        let text = "";
        let results = students.filter(obj => {
            return String(obj.turn).includes(val);
        });
        if (results.length > 0) {
            for (let i in results) {
                text += `<tr id=${results[i].id}>
                        <td>${Number(i) + 1}</td>
                        <td class='edit'>${results[i].name}</td>
                        <td class='turn'>${results[i].turn}</td>
                        <td><button class = "delete"><i class="fas fa-trash-alt"></i></button></td>
                        <td><button class = "update"><i class="fas fa-edit"></i></button></td>
                        </tr>`;
            }
            $("table > tbody").html(text);
            $(".delete").on("click", deleteUser);
            $(".update").on("click", updateUser);
            ShowCountStudent(results.length);
            const turns = getTurns(results);
            showMaxTurn(turns)
        } else {
            text += `<tr><td colspan='5'>نتیجه ای پیدا نشد <span style="fons-size:14px;">&#128531;</span></td></tr>`;
            $("table > tbody").html(text);
        }
    });

    $("#closeModal").click(closeModal);

    $("#closeModa").hover(function() {
        $(this).css("color", "green");
    }, function() {
        $(this).css("color", "#000");
    })

    $("#closeModalBtn").click(closeModal);

    $("thead tr th:nth-child(2)>i").click(function() {
        mySortVar *= -1;
        myRead("name");
    });

    $("thead tr th:nth-child(3)>i").click(function() {
        mySortVar *= -1;
        myRead("turn");
    });


    function checkName(name) {
        if (name.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    function showErr() {
        $(".toast:nth-of-type(2)").fadeIn(500, function() {
            setTimeout(() => {
                $(".toast:nth-of-type(2)").fadeOut(500);
            }, 1000);
        });
    }

    function showSuccess(obj) {
        if (obj) {
            let [user] = obj;
            $(".toast:nth-of-type(1)").children('.content').children('.report').html(`شما <span style='color:red;'>${user.name}</span> را با آیدی <span style='color:red;'>${user.turn}</span> پاک کردید`)
            $(".toast:nth-of-type(1)").fadeIn(50, function() {
                setTimeout(() => {
                    $(".toast:nth-of-type(1)").fadeOut();
                }, 3000);
            });
        } else {
            $(".toast:nth-of-type(1)").children('.content').children('.report').text("عملیات با موفقیت انجام شد");
            $(".toast:nth-of-type(1)").fadeIn(50, function() {
                setTimeout(() => {
                    $(".toast:nth-of-type(1)").fadeOut();
                }, 3000);
            });
        }
    }

    function myCreate(name) {
        studentCount++;
        let stuTurn = createRandomNumber(50);
        const student = {
            id: studentCount,
            name: name,
            turn: stuTurn,
        };
        students.push(student);
        myRead();
    }

    function deleteUser() {
        let id = $(this).parent().parent().attr("id");
        showModal();
        $(".deleteUserOnly").click(() => {
            let deletedUser = myDelete(Number(id));
            closeModal();
            showSuccess(deletedUser);
            myRead();
        });
    }

    function myDelete(id) {
        let deletedUser;
        for (let item of students) {
            if (item.id == id) {
                deletedUser = students.splice(students.indexOf(item), 1);
                break;
            }
        }
        return deletedUser;
    }

    function updateUser() {
        if ($(this).children("i").hasClass("fa-edit")) {
            $(this).children("i").removeClass("fa-edit").addClass("fa-check-square");
            $(this).addClass("bg-green");
            let text = $(this).parent().siblings(".edit").text();
            $(this)
                .parent()
                .siblings(".edit")
                .html(`<input class="editable" type='text' value="${text}">`);
        } else {
            $(this).children("i").removeClass("fa-check-square").addClass("fa-edit");
            $(this).removeClass("bg-green");
            let newID = $(this).parent().parent().attr("id");
            let newName = $(this).parent().siblings(".edit").children("input").val();
            let newTurn = $(this).parent().siblings(".turn").text();
            const user = {
                id: newID,
                name: newName,
                turn: newTurn,
            };
            myUpdate(user);
            myRead();
        }
    }

    function myUpdate(user) {
        for (let item in students) {
            if (students[item].id == user.id) {
                students.splice(students.indexOf(students[item]), 1, user);
                break;
            }
        }
    }

    function closeModal() {
        $(".modal").fadeOut(300, function() {
            $(".container-modal").fadeOut(300);
        });
    }

    function showModal() {
        $(".container-modal").fadeIn(300, function() {
            $(".modal").fadeIn(300);
        });
    }

    function createRandomNumber(to) {
        if (to < randomNumbers.length) {
            return;
        }
        let newNumber = createNumber(to);
        if (checkExist(newNumber)) {
            while (true) {
                newNumber = createNumber(to);
                if (!checkExist(newNumber)) break;
            }
            randomNumbers.push(newNumber);
        } else {
            randomNumbers.push(newNumber);
        }
        return newNumber;
    }

    function createNumber(number) {
        return Math.floor(Math.random() * (number + 1));
    }

    function checkExist(number) {
        let isExist = false;
        if (randomNumbers.indexOf(number) !== -1) {
            isExist = true;
        }
        return isExist;
    }

    function ShowCountStudent(number) {
        $("#countStudent").html(number);
    }

    function showMaxTurn(array) {
        let max = Math.max(...array);
        $("#maxTurn").html(max);
    }

    function getTurns(array) {
        let turns = [];
        array.forEach(obj => {
            turns.push(obj.turn);
        });
        return turns;
    }

    $(".goTop").click(function() {
        $("html,body").animate({ scrollTop: "0" }, 1000);
    });

    $(window).scroll(function(event) {
        if ($(this).scrollTop() >= 200) {
            $(".arrow-up").fadeIn(500);
        } else {
            $(".arrow-up").fadeOut(500);
        }
    });

    $('table').contextmenu(function(event) {
        event.preventDefault();
        event.stopPropagation();
        let x = event.originalEvent.clientX;
        let y = event.originalEvent.clientY;
        $('.contextmenu').fadeIn(100).css({ "top": `${y}px`, "left": `${x}px` });
    });

    $('.fff').click(function(event) {
        event.stopPropagation();
        $("tbody").toggleClass('colour');
    });

    $("*").click(function() {
        $('.contextmenu').fadeOut(100);
    });

    $("#circleMenu-link").click(function() {
        $(this).parent().toggleClass('active');
    })
});