//add to tbl
function addStudentToTbl(index, student) {
    const tableBody = document.getElementById('output-table')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope', 'row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)
    cell = document.createElement('td')
    let div = document.createElement('div')
    let pic = document.createElement('img')
    pic.setAttribute('src', student.image)
    pic.setAttribute('alt', student.image)
    pic.style.height = '150px'
    pic.classList.add('img-thumbnail')
    div.appendChild(pic)
    cell.appendChild(div)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.studentId
    row.appendChild(cell)
    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerHTML = 'DELETE'
    button.addEventListener('click', function () {
        let text = `Delete ${student.name}`;
        if (confirm(text)) {
            deleteStudet(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    row.addEventListener('click',function(){
        showStudentBlock(student)
    })
    tableBody.appendChild(row)
    // console.log(student)
}
function addStudentList(studentList) {
    let counter = 1;
    let tableBody = document.getElementById('output-table')
    tableBody.innerHTML = ""
    for (student of studentList) {
        addStudentToTbl(counter++, student)
    }
}

// single show
function addStudentData(student) {
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)
}

document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
        .then(respond => {
            return respond.json()
        }).then(student => {
            addStudentData(student)
        })
})

function addStudentToDB(student) {
    fetch('http://dv-student-backend-2019.appspot.com/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(respond => {
        if (respond.status === 200) {
            return respond.json()
        }
        else {
            throw Error(respond.statusText)
        }
    }).then(data => {
        console.log('success', data)
        showAllStudent()
    }).catch(error => {
        return null
    })
}
function deleteStudet(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
        method: 'DELETE'
    }
    ).then(respond => {
        if (respond.status === 200) {
            return respond.json()
        } else {
            throw Error(respond.statusText)
        }
    }).then(data => {
        alert(`student name ${data.name} is now deleted`)
        showAllStudent()
    }).catch(error => {
        alert('failed')
    })
}
function onAddStudentClick() {
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student)
}
document.getElementById('addButton').addEventListener('click', function () {
    onAddStudentClick()
})
function showAllStudent() {
    fetch('http://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data => {
            addStudentList(data)
        })
}

function showStudentBlock(student){
    addStudentData(student)
}
function onLoad() {

    fetch('http://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    }).then(data => {
            addStudentList(data)
        })
}
