const input = document.getElementById('i');
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
}

input.addEventListener('input', onKeyboardHandler)
input.addEventListener('keydown', (event) => {
    isDelete = ((keyCode.backspace || keyCode.delete) == event.keyCode);
})