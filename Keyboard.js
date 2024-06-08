/* Clase para controlar el teclado
Nuestra clase keyboardClass, consiste en una implementación elegante y eficiente para controlar el 
teclado con JavaScript. Además de utilizar los típicos «oyentes» JavaScript del teclado, vamos a añadirle 
unas cuantas funciones para guardar y liberar las teclas que se van pulsando y soltando. Veamos cómo funciona 
y qué funciones ofrece nuestro controlador de teclado JavaScript:
 */
class keyboardClass {
  constructor() {	
    this.item = [];	
    document.addEventListener("keyup", this.onKeyUp.bind(this));					
    document.addEventListener("keydown", this.onKeyDown.bind(this));	
  }
  onKeyDown(event) {
    let preventKeys = ['Escape', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
    if (preventKeys.indexOf(event.key) > -1) event.preventDefault();
    if (this.item.indexOf(event.key) < 0) this.item.push(event.key);	
  }
  onKeyUp(event) {
    let i = this.item.indexOf(event.key);
    if (i > -1) this.item.splice(i, 1);
  }
  getKeys() { 
    return this.item
  }
  click(key) { 
    let i = this.item.indexOf(key);
    if (i > -1) this.item.splice(i, 1);
    return (i > -1);
  }
  key(key) { 
    return (this.item.indexOf(key) > -1);
  }
}
/* Codigo del controlador de teclado
Con esta sencilla clase JavaScript estamos preparados para controlar el teclado en cualquiera de 
nuestras aplicaciones, vamos a explicar cómo funciona:

>>> Constructor: El constructor de la clase inicializa un array llamado item que almacenará las teclas 
actualmente pulsadas. Además, agrega dos «event listeners» para los eventos keyup y keydown, que 
llaman a las funciones onKeyUp y onKeyDown respectivamente.

>>> onKeyDown(event): Esta función se ejecuta cuando se presiona una tecla. Primero, verifica si la 
tecla pulsada está en una lista de teclas que queremos prevenir (por ejemplo, evitar que la tecla 
de flecha mueva la ventana del navegador). Si es así, previene el comportamiento predeterminado del 
navegador para esa tecla. Luego, agrega la tecla pulsada al array item si aún no está presente.

>>> onKeyUp(event): Esta función se ejecuta cuando se suelta una tecla. Busca la tecla en el array item 
y la elimina si está presente.

>>> getKeys(): Devuelve el array item, que contiene las teclas pulsadas en ese momento.

>>> click(key): Esta función toma una tecla como argumento y devuelve true si la tecla está pulsada, 
eliminándola del array item. De lo contrario, devuelve false.

>>> key(key): Toma una tecla como argumento y devuelve true si esa tecla está actualmente pulsada, 
de lo contrario devuelve false. */