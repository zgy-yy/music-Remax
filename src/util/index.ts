// import {NodeJS} from "timers";

let timer: any = null;
export function debounce(callBack: Function, time: number) {

    return function () {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(callBack, time);
    }
}
