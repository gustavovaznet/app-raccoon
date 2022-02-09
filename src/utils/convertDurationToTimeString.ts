//CONVERT DURATION TO TIME STRING FUNCTION
export function convertDurationToTimeString(duration: number){
    
    //TIME
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    //TIME STRING
    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2,'0'))
        .join(':')

    return timeString;
}
