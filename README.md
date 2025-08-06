Abra o projeto appgobarber (front-end mobile):
Esse projeto é feito com React Native, e você pode executá-lo em um emulador Android ou em um dispositivo físico.

No terminal, navegue até a pasta appgobarber e execute:

yarn android

(Certifique-se de que o emulador está rodando ou que o celular está conectado e com a depuração USB ativada.)

Inicie o Docker:
Antes de rodar o back-end, abra o Docker Desktop e inicie os containers necessários.
O container do banco de dados que será utilizado é:

Nome da imagem: gostack_postgres
Container ID: 0153bb3c270b

Abra o projeto do back-end:
Navegue até a pasta do back-end e execute:

yarn dev:server

Isso iniciará o servidor Express na porta 3333, e a API estará disponível em:

http://localhost:3333

Verificar a database no DBeaver (ou outro client SQL):
Conecte-se ao container do PostgreSQL.
Você verá uma database chamada gostack_gobarber. Dentro dessa database, ficam armazenadas as tabelas e migrations criadas pelo projeto.
As tabelas são criadas automaticamente ao rodar as migrations do projeto.

