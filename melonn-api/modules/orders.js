const moment = require('moment');
const additionalOrderFields = require('./additionalOrderFields');
let orders = [];

const getAll = async (req, res) => {
    return res.send(orders);
}

const getOne = (req, res) => {
    const id = req.params.id;
    const order = orders.find(x => x.id === id);
    return res.send(order);
}

const addOne = async (req, res) => {

    let id = '';
    const date = new Date(); 
    id += (date.getTime() - date.getMilliseconds()) / 1000;
    id += (Math.floor(Math.random() * 100) + 1).toString().padStart(3, '0');
    
    const additionalFields = await additionalOrderFields(Number(req.body.idShippingMethod), req.body.items);

    console.log(additionalFields);
    let order = {
        id,
        creationDate: moment(new Date()).format('YYYY-MM-DD'),
        ...req.body,
        ...additionalFields
    }
    orders = [...orders, order];
    return res.status(201).send(order);
}


module.exports = {
    getAll,
    getOne,
    addOne
} 