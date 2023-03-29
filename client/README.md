############## INSTALACION DE MYSQL #################

1. Instalar mysql

            apt update
            apt install mysql-server
            sytemctl start mysql.service

2. Configurar usuarios

            $ mysql
            mysql> alter user 'root'@'localhost' identified with mysql_native_password by 'password' ;
            mysql> create user 'brojas'@'localhost' identified with mysql_native_password by 'password' ;
            mysql> grant all privileges on *.* to 'brojas'@'localhost' with grant option ;
            mysql> flush privileges ;
            mysql> exit ;

3. Revisar status de mysql

            systemctl status mysql.service

4. Instalar la BD

            mysql> create database olimpio;
            mysql> exit
            $ mysql -u root -p olimpio < olimpio.sql



############## INSTALACION DE LA APLICACION Y EL SERVER DE API ####################

Este vídeo fue importante para el deploy inicial:
https://www.youtube.com/watch?v=Nxw2j1-srVc&ab_channel=LamaDev

1. Contratar HOSTINGER (Con Ubuntu)
2. ssh-keygen -t rsa (Linux o Mac)
2. Utilizar putty y puttygen
3. Guardar la llave primaria
4. Se puede utilizar putty para conectarse al servidor utilizando la llave primaria creada
5. Desinstalar apache

            systemctl stop apache2
            systemctl disable apache2
            apt remove apache2
            apt autoremove
            apt clean && apt update
            rm -rf /var/www/html

6. Instalar Nginx

            apt install nginx

7. Instalar firewall

            apt install ufw
            ufw enable
            ufw allow ssh
            ufw allow "Nginx Full"

8. Crear un HTML de prueba

            mkdir /var/www/olimpio
            vi /var/www/olimpio/index.htm

                  Este es un archivo de prueba

9. Borrar los archivos default de nginx

            rm /etc/nginx/sites-available/default
            rm /etc/nginx/sites-enabled/default

10. Crear un archivo de configuracion para nginx

            vi /etc/nginx/sites-available/olimpio

            server {
                  listen 80;

                  location / {
                        root /var/www/olimpio/client;
                        index index.html index.htm;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                        try_files $uri $uri/ /index.html;
                  }

                  location /api {
                        proxy_pass http://5.183.8.10:8080;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                  }
            }

11. Crear liga para que los archivos de sites-available sean iguales a sites-eabled

            ln -s /etc/nginx/sites-available/olimpio /etc/nginx/sites-enabled/olimpio

12. Arrancar nginx  
      Primero probamos que el archivo este OK

            nginx -t

      Si todo esta OK, lo arrancamos

            systemctl start nginx

13. Instalar git

            apt install git

14. Crear repositorio en github
15. Hacer la carga del proyecto a github (Posicionarse en el root del proyecto), en .gitignore hay que agregar .env

            git init
            git add .
            git commit -m "commit"
            git remote add origin "<github url>"
            git push origin master

16. Crear las aplicaciones en la máquinad de producción
      Irse a root de la maquina
      Crear un directorio para la aplicación (mkdir olimpio)

            cd ~
            mkdir olimpio
            cd olimpio
            git clone <git hub url> .

17. Configurar la location para el API (Ya se hizo en el paso 10)
18. Instalar node js y npm

            apt install nodejs
            apt install npm

19. Crear el backend

            cd backend
            npm install

20. Instalar pm2 y correr el server de apis

            npm i -g pm2
            pm2 start --name api server.js
            pm2 startup ubuntu                  # Esto es para que se arranque cuando arranca el SO
            pm2 status                          # Con esto podemos ver los procesos corriendo como pm2

21. Hacer deploy de la app

            cd /root/olimpio
            npm install
            npm run build
            mkdir /var/www/olimpio/client
            cp -r build/* /var/www/olimpio/client

22. Configurar el directorio raíz de nginx para que apunte al cliente (Ya se hizo en el paso 10)

            sytemctl reload nginx

######### REVISION DE LOGS #########

Los logs de pm2 se pueden revisar así:

            ls -l /root/.pm2/logs/*


