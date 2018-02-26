const input = document.getElementById('i');
const maxLength = 18;

/**
 * @param {KeyboardEvent} event 
 */ 
let onKeyboardHandler = (event) => {
    /**
     * @type {string}
     */
    const valueNormalized = input.value.replace(/\D/g, '');
    const valueNormalizedLength = valueNormalized.length;
    let indexLastCharacter;

    if (input.value.length > maxLength) {
        input.value =  input.value.replace(/\d$/, '');
        return
    }

    switch(true) {
        
        case  valueNormalizedLength > 9:
        input.value = valueNormalized.replace(/7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '+7 ($1) $2-$3-$4')
        break;
        
        case valueNormalizedLength > 7:
        input.value = valueNormalized.replace(/7(\d{0,3})(\d{0,3})(\d{0,2})/, '+7 ($1) $2-$3-_')
        break;
        
        case valueNormalizedLength > 4:
        input.value = valueNormalized.replace(/7(\d{0,3})(\d{0,3})/, '+7 ($1) $2-__-_')
        break;
        
        case valueNormalizedLength > 1: 
        input.value = valueNormalized.replace(/7(\d{0,3})/, '+7 ($1) ___-__-_');

        break;
        
        case valueNormalizedLength == 1 && valueNormalized.search(/([7-8])/) !== -1:
        input.value = valueNormalized.replace(/([7-8])/,'+7 (');
        break;
        
        case valueNormalizedLength == 1:
        input.value = valueNormalized.replace(/(\d)/, '+7 ($1) ___-__-__');
        break;
    }
    
    indexLastCharacter = input.value.lastIndexOf(valueNormalized.slice(-1))
    input.setSelectionRange(indexLastCharacter + 1, indexLastCharacter + 1);
}
input.addEventListener('input', onKeyboardHandler)