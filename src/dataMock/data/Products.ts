import IProduct from 'src/modules/inventory/products/models/IProduct'

const Products:IProduct[] = [
  {
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
  },
  {
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
  },
  {
    id: 3,
    code: '003',
    name: 'Jugo de fruta',
    description: 'Jugo natural en agua con sabor a piña, mango, mora o fresa',
    status: 'Active',
    price: 2500,
    images: [
      'https://i.blogs.es/73a8cc/1366_2000-4-/1366_2000.jpg',
      'https://mejorconsalud.as.com/wp-content/uploads/2015/09/jugos-para-tomar-en-ayunas-500x339.jpg'
    ]
  },
  {
    id: 4,
    code: '004',
    name: 'Gaseosa',
    description: 'Gaseosas como coca cola, cuatro, manzana, colombiana, piña hipinto, uva por 400ml',
    status: 'Active',
    price: 1400,
    images: [
      'https://cdn.shopify.com/s/files/1/0492/2458/1274/products/supermercados_la_vaquita_supervaquita_gaseosa_coca_cola_1.5l_nr_bebidas_liquidas_512x512.jpg?v=1620489417',
      'https://admin.consumo.com.co/backend/admin/backend/web/archivosDelCliente/items/images/20210219114402-Bebidas-Gaseosas-y-Maltas-GASEOSA-CANADA-DRY-X-15-LT-GINGER-SIN-C-8501202102191144029878.png',
      'https://mistiendas.com.co/2051-large_default/gaseosa-premio-x15-lt.jpg'
    ]
  }
]

export default Products
