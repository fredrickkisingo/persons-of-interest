# Project Installation Guide

This guide outlines the steps to install and set up both the frontend and backend for the project which are in 2 seperate repositories.

## Prerequisites
Ensure you have the following installed on your system:
- **WAMP/XAMPP** (Windows Apache MySQL PHP) for backend development
- **Node.js** (Latest LTS version) for frontend development
- **Composer** for managing PHP dependencies
-  The project .env example uses postgres as the db choice but that can be changed to mysql


## Backend Installation (Laravel 11)

1. **Clone the repository**:
   ```sh
   git clone https://github.com/fredrickkisingo/FETCH-WANTED.git
   cd most-wanted-api
   ```

2. **Install dependencies**:
   ```sh
   composer install
   ```

3. **Set up environment file**:
   ```sh
   cp .env.example .env
   ```
    - Configure database connection (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`)

4. **Generate application key**:
   ```sh
   php artisan key:generate
   ```

5. **Run database migrations**:
   ```sh
   php artisan migrate --seed
   ```

6. **Install Passport for API authentication**:
   ```sh
   php artisan passport:install
   ```

7. **Run the application**:
   ```sh
   php artisan serve
   ```
   The backend will now be running at `http://127.0.0.1:8000`.

## Frontend Installation (Vue 3 with Vite & TailwindCSS)

1. **Clone the repository**:
   ```sh
   cd most-wanted-frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment file**:
   ```sh
   cp .env.example .env
   ```
    - Configure API base URL (`VITE_API_BASE_URL=http://127.0.0.1:8000/api`)

4. **Run the development server**:
   ```sh
   npm run dev
   ```
   The frontend will now be running at `http://localhost:5173`.


## Running Tests

### Backend Tests (PHPUnit)
Run the following command inside the backend directory:
```sh
php artisan test
```

### Frontend Tests (Vitest)
Run the following command inside the frontend directory:
```sh
npm run test which is using jest for the project
```

## Ensure also your cors.php config is configured to allow the current frontend url being used to communicate with the backend!


#To run Docker make sure it is ran in Windows command prompt and ran the following command:

```sh
docker-compose down
docker-compose build
docker-compose up -d
```



## Troubleshooting
- **Database issues**: Ensure `.env` is properly configured and MySQL/Postgres service is running.
- **Node package issues**: Run `npm cache clean --force` and `npm install`.
- **Permission issues**: Ensure storage and bootstrap cache directories are writable.

## License
This project is licensed under the MIT License.

