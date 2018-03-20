const input = document.getElementById('i');
<<<<<<< HEAD
const keyCode = {
    backspace: 8,
    delete: 46
};
let isDelete = false;
input.focus();

/**
 * 
 * @param {string} mask
 * @param {itemPosition} number
 * @param {valueNormalized} string
 * @return {string}
 */
const getValueReplace = (mask, itemPosition, valueNormalized, event) => {
    const tempValue = mask.replace(/./g, (item) => {
        if (/[_\d]/.test(item) &&  itemPosition < valueNormalized.length) {
            return valueNormalized[ itemPosition++]
        } else if ( itemPosition >= valueNormalized.length) {
            return ''
        } else {
            return item
        }
    })
    getCursorPosition(tempValue.length);
    return tempValue + mask.slice(tempValue.length);
}

/**
 * 
 * @param {string} value 
 * @param {string} maskNormalized 
 * @return {string}
 */
const getValueNormalized = (value, maskNormalized) => {
    let tempValue = value.replace(/\D/g, '');

    if (maskNormalized.length >= tempValue.length) {
        tempValue = /([7-8])/.test(tempValue[0]) ? maskNormalized  : maskNormalized + tempValue
    }

    return tempValue
}

/**
 * 
 * @param {number} valueReplacedLength 
 */
const getCursorPosition = (valueReplacedLength) => {
    cursorPosition = isDelete ? input.selectionStart : valueReplacedLength;
}

/**
 * 
 * @param {KeyboardEvent} event 
 */ 
const onKeyboardHandler = (event) => {
    let itemPosition = 0;
    const value = input.value;
    const mask = `+7 (___) ___-__-__`;
    const maskNormalized = mask.replace(/\D/g, '');
    const valueNormalized = getValueNormalized(value, maskNormalized);
    const valueReplaced = getValueReplace(mask, itemPosition, valueNormalized, event);
    input.value = valueReplaced;
    input.setSelectionRange(cursorPosition, cursorPosition);
=======
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
>>>>>>> 304cd86929055d4992ab3f9cbebd0015f59d6ea1
}

input.addEventListener('input', onKeyboardHandler)
input.addEventListener('keydown', (event) => {
    isDelete = ((keyCode.backspace || keyCode.delete) == event.keyCode);
})