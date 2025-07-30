/*
    EVENT LOOP:

        - La funcion que se encuentra el interior del setTimeout es código asincrono:

            - Se ejecuta al final aunque el tiempo sea 0
            - los mensajes en consola son:
                Preparados ....
                Listos ... 
                Servidor escuchando en el puerto 3000
                YA!!!

            - No bloquea el hilo de ejecución de la app

        - El servidor responde lo siguiente:
            - Si accedo a la raiz del sitio muestra la bienvenida
            - Si accedo a /about ejecuto un codigo bloqueante
                - Hasta que no acabe la tarea pesada no pasa a la siguiente
                - Esto se soluciona con codigo asíncrono
            - Llegado a este punto si no ha devuelto nada devuelve error 404

*/

// Se muestra en primer lugar
console.log('Preparados ....')

// Se muestra en tercer lugar de forma asincrona
setTimeout(() => {
    console.log('YA!!!')
}, 0)

// Se muestra en segundo lugar
console.log('Listos ... ')

// Monto un servidor que está escuchando en el puerto 3000. Accedo a él mediante: http://localhost:3000/
const http = require('http')
const server = http.createServer((req, res) => {

    if(req.url === '/') {
        res.write('<h1>Bienvenido al servidor!</h1>')
        return res.end()
    } 

    // Este return ha unido en una sola línea el res.write y el res.end y funciona igual que la anterior ruta
    if(req.url === '/about') {

        //  Blocking code
        for(let i=0; i<100000; i++) {
            console.log(i)
        }

        return res.end('<h1>Acerda de</h1>')
    } 

    // También uní en este res.end
    res.end(`
        <h1>Error 404:</h1>
        <p>Pagina no encontrada</p>
        <a href='/'>Volver a la pagina principal</a>
    `)
    
})

server.listen(3000)

// Muestro en consola el mensaje de informacion
console.log('Server on port 3000')