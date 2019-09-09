# chat-prueba

## Funcionalidades

El proyecto es una versión reducida de una aplicación de mensajeria instantánea.

El proyecto esta compuesto por:

1. Una barra de navegación la cual tiene un boton de Log Out cuando el usuario esta conectado para que pueda desconectarse.

2. El cuerpo de la página.

### Cuerpo de la pagina.

Aqui se permite al usuario hacer un login con su cuenta de Google.

Una vez hecho el Login aparecerá la aplicación de mensajeria instantánea para el navegador.

La aplicación contiene una barra superior con un boton "CREATE CHAT", tu imagen y aparecera la imagen y el nombre de la persona con la que estes hablando al lado del boton. Abajo hay una barra lateral a la izquierda donde apareceran todos los chats creados o que tienes abiertos en el momento. A la derecha apareceran los mensajes del chat que tengas seleccionado y debajo de la zona donde aparecen los mensajes hay un area para escribir y al lado un boton para enviar mensajes.

El boton "CREATE CHAT", habre un desplegable donde aparecen todos los usuarios que tienen cuenta en la aplicación. Al lado de cada usuario hay un boton de crear "Create" para crear un chat nuevo con la persona elegida.

Cada chat creado aparecerá en la barra lateral y cada chat de la barra lateral tiene un boton "Delete" para borrar la conversación con esa persona pero la otra persona, aún tendra el chat para ver los mensajes que le hayas enviado. Al pulsar encima de un nombre y/o fotografia de uno de los chats abiertos en la barra lateral cambiaras de conversación con otra persona. Al cambiar se cargaran los mensajes de mas reciente a menos reciente, siendo los más antiguos los que esten más arriba.

## Clonar proyecto

1. Ir al directorio deseado dentro de tu ordenador con la terminal.

2. Clonar el proyecto utilizando el comando:

```
git clone https://github.com/Tarkras/chat-prueba.git
```

## Ejecutar proyecto

### 1. Configurar proyecto

Ir a la carpeta del proyecto en la terminal.

```
cd chat-prueba
```

Instalar todos los paquetes y dependencias necesarias del proyecto a traves del comando:

```
npm install
```

### 2. Ejecutar proyecto

En la carpeta del proyecto a traves de la terminal utilizar comando para ejecutar el proyecto:

```
npm run serve
```

Esto hara un compilado y una recarga en caliente para poder visualizar el proyecto en el navegador. Para visualizarlo escribe en el navegador el puerto local mostrado en la terminal. Normalmente es:

```
localhost:8080
```