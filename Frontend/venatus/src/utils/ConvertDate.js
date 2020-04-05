export default function ConvertDate(date="") {

    date = date.split('T');
    date = date[0].split('-');
    
    // console.log(date);

    switch(date[1]) {
        case '01': date[1] = 'Janeiro'; break;
        case '02': date[1] = 'Fevereiro'; break;
        case '03': date[1] = 'Março'; break;
        case '04': date[1] = 'Abril'; break;
        case '05': date[1] = 'Maio'; break;
        case '06': date[1] = 'Junho'; break;
        case '07': date[1] = 'Julho'; break;
        case '08': date[1] = 'Agosto'; break;
        case '09': date[1] = 'Setembro'; break;
        case '10': date[1] = 'Outubro'; break;
        case '11': date[1] = 'Novembro'; break;
        case '12': date[1] = 'Dezembro'; break;
        default: date[1] = 'Erro'; break;
    }

    date = `${date[2]} de ${date[1]} de ${date[0]}` 

    return date;
    // console.log(date);
}
