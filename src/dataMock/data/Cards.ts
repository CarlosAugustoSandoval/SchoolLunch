import ICard from 'src/modules/cards/models/ICard'

const Cards:ICard[] = [
  {
    id: 1,
    name: 'Tarjeta de carlos 2023',
    code: '0015059042',
    status: 'Active',
    balance: 18500,
    member: {
      id: 1,
      first_name: 'Carlos Augusto',
      last_name: 'Sandoval Cachay',
      identification_type: 'CC',
      identification: '1118533658',
      sex: 'male',
      avatar: '/src/assets/SantiProfile.jpg',
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
    }
  }
]

export default Cards
