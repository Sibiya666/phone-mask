const input = document.getElementById('i');
input.maxLength = 18;

/**
 * @param {KeyboardEvent} event 
 */ 
let onKeyboardHandler = (event) => {
    /**
     * @type {string}
     */
    let value = input.value;
    let valueReplaced = value.replace(/\D/g, '');
    let valueReplacedLength = valueReplaced.length;
    let cursorPosition;

    switch(true) {
        
        case  valueReplacedLength > 9:
        valueReplaced = valueReplaced.replace(/7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '+7 ($1) $2-$3-$4')
        break;
        
        case valueReplacedLength > 7:
        valueReplaced = valueReplaced.replace(/7(\d{0,3})(\d{0,3})(\d{0,2})/, '+7 ($1) $2-$3-_')
        break;
        
        case valueReplacedLength > 4:
        valueReplaced = valueReplaced.replace(/7(\d{0,3})(\d{0,3})/, '+7 ($1) $2-__-_')
        break;
        
        case valueReplacedLength > 1: 
        valueReplaced = valueReplaced.replace(/7(\d{0,3})/, '+7 ($1) ___-__-_')
        break;
        
        case valueReplacedLength == 1 && valueReplaced.search(/([7-8])/) !== -1:
        valueReplaced = valueReplaced.replace(/([7-8])/,'+7 (');
        break;
        
        case valueReplacedLength == 1:
        valueReplaced = valueReplaced.replace(/(\d)/, '+7 ($1__) ___-__-__')
    }
    console.log(valueReplaced);
    input.setSelectionRange(value.length +1, value.length +1);
    input.value = valueReplaced;
}
input.addEventListener('input', onKeyboardHandler)