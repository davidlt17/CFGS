document.addEventListener('DOMContentLoaded', function() {
    const pantalla = document.getElementById('pantalla');
    const botones = document.querySelectorAll('button');
    let operacionActual = '';
    let operacionAnterior = '';
    let operador = '';
    let resultadoCalculado = false;

    // Asignar eventos a los botones
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const valorBoton = this.textContent;

            if (!isNaN(valorBoton)) {
                manejarNumero(valorBoton);
            } else if (valorBoton === '.') {
                manejarDecimal();
            } else if (['+', '-', '*', '/'].includes(valorBoton)) {
                manejarOperador(valorBoton);
            } else if (valorBoton === '=') {
                calcular();
            } else if (valorBoton === 'C') {
                limpiar();
            } else if (valorBoton === '⌫') {
                borrar();
            }

            actualizarPantalla();
        });
    });

    function manejarNumero(numero) {
        if (resultadoCalculado) {
            operacionActual = numero;
            resultadoCalculado = false;
        } else {
            operacionActual = operacionActual === '0' ? numero : operacionActual + numero;
        }
    }

    function manejarDecimal() {
        if (resultadoCalculado) {
            operacionActual = '0.';
            resultadoCalculado = false;
        } else if (!operacionActual.includes('.')) {
            operacionActual = operacionActual === '' ? '0.' : operacionActual + '.';
        }
    }

    function manejarOperador(op) {
        if (operacionActual === '' && operacionAnterior === '') return;
        
        if (operacionActual === '' && operacionAnterior !== '') {
            operador = op;
            return;
        }

        if (operador !== '' && operacionActual !== '') {
            calcular();
        }

        operador = op;
        operacionAnterior = operacionActual;
        operacionActual = '';
    }

    function calcular() {
        if (operacionAnterior === '' || operacionActual === '' || operador === '') return;

        const num1 = parseFloat(operacionAnterior);
        const num2 = parseFloat(operacionActual);
        let resultado;

        switch (operador) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case '*':
                resultado = num1 * num2;
                break;
            case '/':
                resultado = num1 / num2;
                break;
            default:
                return;
        }

        operacionActual = resultado.toString();
        operacionAnterior = '';
        operador = '';
        resultadoCalculado = true;
    }

    function limpiar() {
        operacionActual = '';
        operacionAnterior = '';
        operador = '';
        resultadoCalculado = false;
    }

    function borrar() {
        operacionActual = operacionActual.slice(0, -1);
        if (operacionActual === '') operacionActual = '0';
    }

    function actualizarPantalla() {
        pantalla.value = operacionActual || '0';
    }
});