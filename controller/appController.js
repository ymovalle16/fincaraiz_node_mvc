import { Precio, Categoria, Propiedad } from "../models/index.js"
import  Sequelize  from "sequelize";


const inicio = async (req, res) => {

    const [ categorias, precios, casas, departamentos ] = await Promise.all([
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaId: 1
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaId: 2
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
    ])


    res.render('inicio', {
        pagina: 'Inicio',
        categorias, 
        precios,
        casas,
        departamentos,
        csrfToken: req.csrfToken()

    })
}

const categoria = async (req, res) => {
    const { id } = req.params
    
    //comprobar que la categoria exista, usamos la relacion
    const categoria = await Categoria.findByPk(id)

    if(!categoria) {
        return res.redirect('/404')
    }




    //obtener las propiedades de la categoria 
    const propiedades = await Propiedad.findAll({
        where: {
            categoriaId: id 
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    })

    
    //se envia a la categoria que se seleccione y muestra su respectivo nombre
    res.render('categoria', {
        pagina: `${categoria.nombre}s en Venta`,
        propiedades,
        Categoria,
        csrfToken: req.csrfToken()
    })
}

const noEncontrado = (req, res) => {
    res.render('404', {
        pagina: 'No encontrada',
        csrfToken: req.csrfToken()

    })

}



const buscador = async (req, res) => {
    console.log(req.body);
    const { termino } = req.body;

    //se valida que la variable termino no se encuentre vacia
    if(!termino.trim()){
        return res.redirect('back');
    }
    //si todo sale bien, se consulta propiedades
    const propiedades = await Propiedad.findAll({
        where: {
            titulo: { //columna para habilitar la busqueda
                [Sequelize.Op.like] : '%' + termino + '%' //like funciona comolike SQL 
            }
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    })

    res.render('busqueda', {
        pagina: 'Resultado de la busqueda', 
        propiedades,
        csrfToken: req.csrfToken()
    })
}

export {
    inicio,
    categoria, 
    noEncontrado, 
    buscador
}