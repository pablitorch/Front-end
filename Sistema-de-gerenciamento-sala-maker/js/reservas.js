function classToggle() {
    const navs = document.querySelectorAll('.side_items')

    navs.forEach(nav => nav.classList.toggle('sidebar_exibir'));
}

function handleClickOutside(event) {
    const navs = document.querySelectorAll('.side_items');
    const menuSand = document.querySelector('.fa-bars');

    // Verifica se o clique foi fora do menu e do botão de alternância
    if (!Array.from(navs).some(nav => nav.contains(event.target)) && !menuSand.contains(event.target)) {
        navs.forEach(nav => nav.classList.remove('sidebar_exibir'));
    }
}

document.querySelector('.fa-bars').addEventListener('click', classToggle);
document.addEventListener('click', handleClickOutside);

const calendario = document.querySelector('.calendario'),
    date = document.querySelector('.data'),
    daysContainer = document.querySelector('.dias'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    todayBtn = document.querySelector('.today-btn'),
    gotoBtn = document.querySelector('.goto-btn'),
    dateInput = document.querySelector('.date-input'),
    eventDay = document.querySelector(".dia-evento"),
    eventDate = document.querySelector(".data-evento"),
    eventsContainer = document.querySelector(".eventos");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

//array de eventos padrao
const eventsArr = [
    {
        day: 5,
        month: 10,
        year: 2024,
        events: [
            {
                title: "Event 1",
                horaIni: "08:00",
                horaFim: "08:30",
            },
            {
                title: "Event 2",
                horaIni: "09:00",
                horaFim: "09:30",
            }
        ],
    },
    {
        day: 9,
        month: 10,
        year: 2024,
        events: [
            {
                title: "Event 1",
                horaIni: "08:00",
                horaFim: "08:30",
            },
        ],
    },
];

//funcao de adicionar dias

function initCalendar() {
    //para pegar os dias do mes passado, todos os dias do mes atual e os dias do mes seguinte
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //atualizar data em cima do calendário
    date.innerHTML = months[month] + " " + year;

    //adicionando dias com DOM
    let days = "";

    //dias do mes anterior
    for (let x = day; x > 0; x--) {
        days += `<div class = "dia mes-ant">${prevDays - x + 1}</div>`;
    }

    //dias do mes atual

    for (let i = 1; i <= lastDate; i++) {

        //verificar se tem evento dia atual

        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                //se tiver evento
                event = true;

            }
        })
        //se o dia for hoje, adicionar classe hoje
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {

            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            //se evento for encontrado, adicionar classe do evento
            //adicionar ativo ao dia atual inicialmente
            if (event) {
                days += `<div class = "dia hoje ativo evento">${i}</div>`;
            } else {
                days += `<div class = "dia hoje ativo">${i}</div>`;
            }
        }
        //adicionar dias restantes
        else {
            if (event) {
                days += `<div class = "dia evento">${i}</div>`;
            } else {
                days += `<div class = "dia">${i}</div>`;
            }
        }

    }
    //dias do proximo mes
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class = "dia prox-mes">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    //addlistener depois de inicializar calendario
    addListener();
}

initCalendar();

//mes passado

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//proximo mes

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

//adicionar eventlistener no proximo e anterior

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//configuracao do goto

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    // Permitir que somente números sejam adicionados
    dateInput.value = dateInput.value.replace(/[^0-9]/g, "");

    // Adicionar a barra (/) após os dois primeiros dígitos (mês)
    if (dateInput.value.length > 2) {
        dateInput.value = dateInput.value.slice(0, 2) + "/" + dateInput.value.slice(2);
    }

    // Limitar a 7 caracteres (MM/YYYY)
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }

    // Se o usuário deletar, ajustar a formatação
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    console.log(dateArr);
    //validação de dados
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    //se a data for invalida
    alert("Data inválida! Tente novamente.");
}
gotoBtn.addEventListener("click", gotoDate);

const reservaBtn = document.querySelector(".botao-reserva"),
    fecharBtn = document.querySelector(".close"),
    dialogReserva = document.querySelector(".add-reserva"),
    nomeEvento = document.querySelector(".event-name"),
    respEvento = document.querySelector(".event-owner"),
    dataEvento = document.querySelector(".event-date"),
    descEvento = document.querySelector(".event-desc"),
    statusEvento = document.querySelector(".event-status"),
    localEvento = document.querySelector(".event-place"),
    horaIniEvento = document.querySelector(".event-time-from"),
    horaFimEvento = document.querySelector(".event-time-to");

reservaBtn.addEventListener("click", function () {
    dialogReserva.showModal();
})
fecharBtn.addEventListener("click", function () {
    dialogReserva.close();
})

//max 50 caracteres no nome do evento

nomeEvento.addEventListener("input", (e) => {
    nomeEvento.value = nomeEvento.value.slice(0, 50);
});

//Formatação da dataEvento

dataEvento.addEventListener("input", (e) => {
    // Permitir que somente números sejam adicionados
    dataEvento.value = dataEvento.value.replace(/[^0-9]/g, "");

    // Adicionar a barra (/) após os dois primeiros dígitos (dia)
    if (dataEvento.value.length > 2) {
        dataEvento.value = dataEvento.value.slice(0, 2) + "/" + dataEvento.value.slice(2);
    }
    // Adicionar a barra (/) após os dois primeiros dígitos (mês)
    if (dataEvento.value.length > 4) {
        dataEvento.value = dataEvento.value.slice(0, 5) + "/" + dataEvento.value.slice(5);
    }

    // Limitar a 9 caracteres (DD/MM/YYYY)
    if (dataEvento.value.length > 10) {
        dataEvento.value = dataEvento.value.slice(0, 10);
    }

    // Se o usuário deletar, ajustar a formatação
    if (e.inputType === "deleteContentBackward") {
        // Remover barra após o dia
        if (dataEvento.value.length === 3) {
            dataEvento.value = dataEvento.value.slice(0, 2);
        }
        // Remover barra após o mês
        if (dataEvento.value.length === 6) {
            dataEvento.value = dataEvento.value.slice(0, 5);
        }
    }
});

//max 30 caracteres no local evento

localEvento.addEventListener("input", (e) => {
    localEvento.value = localEvento.value.slice(0, 30);
});

//Max 30 caracteres no responsavel evento

respEvento.addEventListener("input", (e) => {
    respEvento.value = respEvento.value.slice(0, 30);
});


//vou entender ainda rs

function addListener() {
    const days = document.querySelectorAll(".dia");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //colocar dia atual como dia ativo
            activeDay = Number(e.target.innerHTML);

            //chamar activeday depois de clicar
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            //remover ativo do dia antes ativo

            days.forEach((day) => {
                day.classList.remove("ativo");
            });

            //se clicar no dia do mes anterior, ir para mes anterior e adicionar ativo
            if (e.target.classList.contains("mes-ant")) {
                prevMonth();

                setTimeout(() => {
                    //selecionar todos os dias daquele mes
                    const days = document.querySelectorAll(".dia");

                    days.forEach((day) => {
                        if (!day.classList.contains("mes-ant") && day.innerHTML === e.target.innerHTML) {
                            days.classList.add("ativo");
                        }
                    })
                }, 100);
                //o mesmo com proximo mes
            } else if (e.target.classList.contains("prox-mes")) {
                nextMonth();

                setTimeout(() => {
                    //selecionar todos os dias daquele mes
                    const days = document.querySelectorAll(".day");

                    days.forEach((day) => {
                        if (!day.classList.contains("prox-mes") && day.innerHTML === e.target.innerHTML) {
                            days.classList.add("ativo");
                        }
                    })
                }, 100);
            } else {
                //restante dos dias
                e.target.classList.add("ativo");
            }
        });
    })
}


//mostrar eventos e data do dia ativo


function getActiveDay(date) {
    const day = new Date(year, month, date);
    const daysOfWeek = {
        "Sun": "Dom",
        "Mon": "Seg",
        "Tue": "Ter",
        "Wed": "Qua",
        "Thu": "Qui",
        "Fri": "Sex",
        "Sat": "Sáb"
    };
    const dayName = daysOfWeek[day.toString().split(" ")[0]];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " de " + months[month] + ", " + year;
}

//funcao de exibir eventos

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        //pegar eventos apenas do dia atual
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            //mostrar evento no documento

            event.events.forEach((event) => {
                events += `
                <div class="evento">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="titulo-evento">${event.title}</h3>
                    </div>
                    <div class="hora-evento">
                        <span class="hora-evento">${event.horaIni} - ${event.horaFim}</span>
                    </div>
                </div>`;
            });
        }
    });

    //se nao achar nenhum evento
    if (events === "") {
        events = `
        <div class="no-events">
            <h3>Nenhum evento</h3>
        </div>`;
    }

    eventsContainer.innerHTML = events;
}
