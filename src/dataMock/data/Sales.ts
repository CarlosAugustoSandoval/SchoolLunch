import ISale from 'src/modules/sales/models/ISale'

const Sales:ISale[] = [
  {
    id: 1,
    code: '2023005',
    status: 'Active',
    date: '01-25-2023 10:30',
    total_amount: 8500,
    member: {
      id: 1,
      first_name: 'Carlos Augusto',
      last_name: 'Sandoval Cachay',
      identification_type: 'CC',
      identification: '1118533658',
      sex: 'male',
      course: {
        id: 2,
        name: 'B',
        status: 'Active',
        grade: {
          id: 2,
          name: 'Primero',
          status: 'Active'
        }
      },
      labels: [
        {
          id: 4,
          name: 'Padre de familia',
          color: '#AABB33'
        }
      ]
    },
    items: [
      {
        id: 12,
        status: 'Active',
        amount: 4000,
        count: 2,
        product: {
          id: 1,
          code: '001',
          name: 'Empanada hojaldre',
          description: 'Empanada hojaldre, rellena de carne arroz y pollo cocinada en horno',
          status: 'Active',
          price: 2000,
          images: [
            'https://recetasabc.com/wp-content/uploads/2015/09/empanadadehojaldre2.jpg',
            'https://static.diabetesfoodhub.org/system/thumbs/system/images/recipes/1745-espanol-diabetic-empanadas-hojaldre-rellenas-maiz-queso_latin-comfort-foods_013019_3885281428.jpg',
            'https://recetasabc.com/wp-content/uploads/2015/09/Empanadasdehojaldre1.jpg',
            'https://i.pinimg.com/originals/ee/18/29/ee18293de68712ea24a9dfae627bf48c.jpg'
          ]
        }
      },
      {
        id: 12,
        status: 'Active',
        amount: 4500,
        count: 3,
        product: {
          id: 2,
          code: '002',
          name: 'Preparada',
          description: 'Refrescante bebida de limon con panela, lulo o mandarina de 600ml',
          status: 'Active',
          price: 1500,
          images: [
            'https://i.pinimg.com/736x/d0/ae/e0/d0aee0140841f7d359154ecc4415319c--tes-natural.jpg',
            'https://assets.kraftfoods.com/recipe_images/opendeploy/163631_640x428.jpg',
            'https://hips.hearstapps.com/hmg-prod/images/bebidas-verano-portada-elle-1658494280.jpg'
          ]
        }
      }
    ],
    note: 'Una prueba de observaciones.'
  }
]

export default Sales
