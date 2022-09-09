import Datepicker from 'flowbite-datepicker/Datepicker';

export function generate(id) {
    console.log(id);
    const elm = document.getElementById(id);
    new Datepicker(elm);
}