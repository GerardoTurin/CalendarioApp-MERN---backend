import moment from "moment/moment.js";




const isDate = (value) => {

    if ( !value ) {
        return false;
    }

    const fecha = moment( value );

    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
};



export { isDate };