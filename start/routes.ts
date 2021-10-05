import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'WelcomeController.index')

Route.get('/rentals/:vehicleType', 'RentalsController.show')
Route.post('/rentals/:vehicleType', 'RentalsController.new')
