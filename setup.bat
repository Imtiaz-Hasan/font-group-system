@echo off
echo Setting up Font Group System...

echo.
echo 1. Installing Laravel dependencies...
composer install

echo.
echo 2. Copying environment file...
if not exist .env copy .env.example .env

echo.
echo 3. Generating application key...
php artisan key:generate

echo.
echo 4. Running database migrations...
php artisan migrate

echo.
echo 5. Creating storage link...
php artisan storage:link

echo.
echo 6. Installing frontend dependencies...
cd frontend
npm install

echo.
echo 7. Building frontend...
npm run build

echo.
echo Setup complete! 
echo.
echo To start the development servers:
echo 1. Start Laravel: php artisan serve
echo 2. Start React: cd frontend && npm start
echo.
pause 