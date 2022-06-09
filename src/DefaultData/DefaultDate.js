const minutes = ["00", "15", "30", "45"];

const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
                "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
                "20", "21", "22", "23"];

const days31 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
"11", "12", "13", "14", "16", "17", "18", "19", "20",
"21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

const days30 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
"11", "12", "13", "14", "16", "17", "18", "19", "20",
"21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];

const days29 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
"11", "12", "13", "14", "16", "17", "18", "19", "20",
"21", "22", "23", "24", "25", "26", "27", "28", "29"];

const days28 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
"11", "12", "13", "14", "16", "17", "18", "19", "20",
"21", "22", "23", "24", "25", "26", "27", "28"];

const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
                'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

const years = ["2022", "2023", "2024", "2025"];

const defaultDate = {
    minutes: "0",
    hour: "0",
    day: "1",
    month: "styczeń",
    year: "2022"
}

function getMonthNumber(month) {
    switch(month) {
        case "styczeń": return 1
        case "luty": return 2
        case "marzec": return 3
        case "kwiecień": return 4
        case "maj": return 5
        case "czerwiec": return 6
        case "lipiec": return 7
        case "sierpień": return 8
        case "wrzesień": return 9
        case "październik": return 10
        case "listopad": return 11
        default: return 12
    }
}

function getDays(month, year) {

    switch(month) {
        case "kwiecień":
        case "czerwiec":
        case "wrzesień":
        case "listopad":
            return days30;
        case "luty": {
            if(parseInt(year) % 4) return days28;
            else return days29;
        }
        default:
            return days31;
    }
}

export {getDays, defaultDate, minutes, hours, months, years}