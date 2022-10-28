#Simple Laravel Blog for BIT Students

App contains seeders for both admin users and posts generation.
Copy and rename file '.env.example' to '.env' and setup your application configuration.

First run command  `composer install` in order to add dependencies.

Command `npm install` will update nodejs module vendors.

Run `php artisan passport:install` in order to generate authentification migrations and keys.

`php artisan migrate` run laravel migrations 

If running app in development mode you'll need to setup two separate terminals and launch `npm run dev` for vite resource server.

Finally to launch main application run `php artisan serve` and open app with given localhost port.

##Database seeder

If you want to seed database with automatically generated admin user run command:
`php artisan db:seed`

When user is generated you'll have the ability to fill database with 10 automatically generated posts in each launch. 
Run command `php artisan db:seed PostsSeeder` and voilà your all set.

Happy coding!
