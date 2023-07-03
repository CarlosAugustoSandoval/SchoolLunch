import ICourse from 'src/modules/courses/models/ICourse'

const Courses:ICourse[] = [
  {
    id: 1,
    name: 'A',
    status: 'Active',
    grade: {
      id: 2,
      name: 'Primero',
      status: 'Active'
    }
  },
  {
    id: 2,
    name: 'B',
    status: 'Active',
    grade: {
      id: 2,
      name: 'Primero',
      status: 'Active'
    }
  },
  {
    id: 3,
    name: 'A',
    status: 'Active',
    grade: {
      id: 3,
      name: 'Segundo',
      status: 'Active'
    }
  },
  {
    id: 4,
    name: 'B',
    status: 'Active',
    grade: {
      id: 3,
      name: 'Segundo',
      status: 'Active'
    }
  },
  {
    id: 4,
    name: 'C',
    status: 'Active',
    grade: {
      id: 3,
      name: 'Segundo',
      status: 'Active'
    }
  }
]

export default Courses
