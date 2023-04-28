# BAP-8

## Installation
1. Clone the repository
````shell
$ git clone git@github.com:lucaschrng/BAP-8.git
````
2. Go to the project directory
````shell
$ cd bap-8
````
3. Install composer
````shell
$ composer install
````

4. Duplicate the `.env` file and name it `.env.local`
5. Update the `DATABASE_URL` variable in the `.env.local` file with your database credentials. It should look like this : <br>
```php
DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7"
```
6. Create the database
````shell
$ php bin/console doctrine:database:create
````
7. Run the migrations
````shell
$ php bin/console doctrine:migrations:migrate
````

8. Load the fixtures
```shell
$ php bin/console d:f:l
```
9. Run the server
````shell 
$ symfony serve
````
10. Run encore build
````shell 
$ npm run watch
````
11. Go to http://localhost:8000

12. Enjoy!

## Accéder a l'admin : http://127.0.0.1:8000/admin <br>

  Mail : plessisrobinsonadmin@admin.com <br>
  Mot de passe : aMLBkroE6gJmS&$$ <br>
