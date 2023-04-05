const $tabContainer = document.querySelector('#tabs')
const $tablist = $tabContainer.querySelectorAll('.tab')

const today = new Date()
let weekday = today.getDay();

const week = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
]
function nextDay(day) {
    
    if(day===6){
        return 0;
    }
    return day + 1
}
$tablist.forEach(($tab, index) => {
    if(index===0){
        $tab.textContent='Hoy'
        weekday = nextDay(weekday)
    return false
    }
    $tab.textContent = week[weekday];
    weekday = nextDay(weekday);
    
})