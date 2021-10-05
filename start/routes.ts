import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/rentals/:vehicleType', 'RentalsController.show')

Route.post('/rentals/:vehicleType', 'RentalsController.new')
