function createEmployeeRecord(array){
    const obj = {

    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return obj;
}
function createEmployeeRecords(twoRows){
    let anArray = []
    twoRows.array.forEach(element => {
      anArray.push(createEmployeeRecords(element))  
    });
    return anArray;
}

function createTimeInEvent(employee, datestamp){
    let [date, hour] = datestamp.split('')
    employee.timeInEvents.push({
        type: 'timeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee;
}
function createTimeOutEvents(employee,  datestamp){
    let [date, hour] = datestamp.split('')
    employee.timeOutEvents.push({
        type: 'timeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return employee;
}
function hoursWorkedOnDate (employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
    
}

function wagesEarnedOnDate(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
    *employee.payPerHour
    return parseFloat(rawWage.toString())
}
function allWagesFor(employee){
    let eligbleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable =eligbleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable;
} 
function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}
function  calculatePayroll(arrayofEmployeeRecords){
    return arrayofEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0);
}