## Latepost - сервис отложенной публикации сообщений (в стадии разработки)
#### Установка зависимостей
```bash
docker compose run --rm --no-deps frontend npm install </br>
docker compose run --rm --no-deps php-fpm composer install </br>
```
#### Запуск
```bash
docker compose up --force-recreate
```
#### Вход в контейнер с php-fpm
```bash
docker compose exec php-fpm sh
```
#### Выполнение миграций (внутри контейнера php-fpm)
```bash
php bin/console doctrine:migrations:migrate
```
#### Генерация ключей для авторизации (внутри контейнера php-fpm)
```bash
php bin/console lexik:jwt:generate-keypair
```
