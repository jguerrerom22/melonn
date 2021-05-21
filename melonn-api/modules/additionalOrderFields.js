const awsAPI = require('../request/awsApi');
const moment = require('moment');

const constants = {
    currentDate: new Date(),
    cases: [],
    offDays: [],
    nextBusinessDays: []
}

module.exports = async (shippingMethod, items) => {
    const respRules = await awsAPI.get(`/shipping-methods/${shippingMethod}`);
    const rules = respRules.data.rules;

    const respOffDays = await awsAPI.get('/off-days');
    constants.offDays = respOffDays.data;

    getNextBusinessDays();

    let orderWeight = 0;
    items.map(x => (orderWeight += x.weight));

    const minWeight = rules.availability.byWeight.min;
    const maxWeight = rules.availability.byWeight.max;

    if (minWeight <= orderWeight && orderWeight <= maxWeight) {
        
        let dayType = rules.availability.byRequestTime.dayType;
        let fromTimeOfDay = rules.availability.byRequestTime.fromTimeOfDay;
        let toTimeOfDay = rules.availability.byRequestTime.toTimeOfDay;

        switch (dayType) {
            case 'ANY':
                break;
            case 'BUSINESS':
                if (constants.offDays.includes(moment(constants.currentDate).format('YYYY-MM-DD'))) {
                    return returnDefaultValues();
                }
                break;
            default:
                return returnDefaultValues();
        }

        if (fromTimeOfDay <= constants.currentDate.getHours() && constants.currentDate.getHours() <= toTimeOfDay) {

            constants.cases = rules.promisesParameters.cases;
            let priority = 1;

            return priorityCases(priority);

        } else {
            return returnDefaultValues();
        }

    } else {
        return returnDefaultValues()
    }
}

const priorityCases = (priority) => {
    const casesPriority = constants.cases.filter(x => x.priority === priority);
    if (casesPriority.length === 0) {
        return returnDefaultValues();
    }

    for (let i in casesPriority) {
        let x = casesPriority[i];

        let dayType = x.condition.byRequestTime.dayType;
        let fromTimeOfDay = x.condition.byRequestTime.fromTimeOfDay;
        let toTimeOfDay = x.condition.byRequestTime.toTimeOfDay;

        switch (dayType) {
            case 'ANY':
                break;
            case 'BUSINESS':
                if (constants.offDays.includes(moment(constants.currentDate).format('YYYY-MM-DD'))) {
                    return priorityCases(priority + 1);
                }
                break;
            default:
                return returnDefaultValues();
        }

        if (fromTimeOfDay <= constants.currentDate.getHours() && constants.currentDate.getHours() <= toTimeOfDay) {

            // PackPromise
            const { min: packPromiseMin, max: packPromiseMax } = calculatePromise({
                minType: x.packPromise.min.type,
                minDeltaHours: x.packPromise.min.deltaHours,
                minDeltaBusinessDays: x.packPromise.min.deltaBusinessDays,
                minTimeOfDay: x.packPromise.min.timeOfDay,
                maxType: x.packPromise.max.type,
                maxDeltaHours: x.packPromise.max.deltaHours,
                maxDeltaBusinessDays: x.packPromise.max.deltaBusinessDays,
                maxTimeOfDay: x.packPromise.max.timeOfDay
            });

            // ShipPromise
            const { min: shipPromiseMin, max: shipPromiseMax } = calculatePromise({
                minType: x.shipPromise.min.type || null,
                minDeltaHours: x.shipPromise.min.deltaHours,
                minDeltaBusinessDays: x.shipPromise.min.deltaBusinessDays,
                minTimeOfDay: x.shipPromise.min.timeOfDay,
                maxType: x.shipPromise.max.type || null,
                maxDeltaHours: x.shipPromise.max.deltaHours,
                maxDeltaBusinessDays: x.shipPromise.max.deltaBusinessDays,
                maxTimeOfDay: x.shipPromise.max.timeOfDay
            });

            // DeliveryPromise
            const { min: deliveryPromiseMin, max: deliveryPromiseMax } = calculatePromise({
                minType: x.deliveryPromise.min.type || null,
                minDeltaHours: x.deliveryPromise.min.deltaHours,
                minDeltaBusinessDays: x.deliveryPromise.min.deltaBusinessDays,
                minTimeOfDay: x.deliveryPromise.min.timeOfDay,
                maxType: x.deliveryPromise.max.type || null,
                maxDeltaHours: x.deliveryPromise.max.deltaHours,
                maxDeltaBusinessDays: x.deliveryPromise.max.deltaBusinessDays,
                maxTimeOfDay: x.deliveryPromise.max.timeOfDay
            });

            // PickPromise
            const { min: readyPickupPromiseMin, max: readyPickupPromiseMax } = calculatePromise({
                minType: x.readyPickUpPromise.min.type || null,
                minDeltaHours: x.readyPickUpPromise.min.deltaHours,
                minDeltaBusinessDays: x.readyPickUpPromise.min.deltaBusinessDays,
                minTimeOfDay: x.readyPickUpPromise.min.timeOfDay,
                maxType: x.readyPickUpPromise.max.type || null,
                maxDeltaHours: x.readyPickUpPromise.max.deltaHours,
                maxDeltaBusinessDays: x.readyPickUpPromise.max.deltaBusinessDays,
                maxTimeOfDay: x.readyPickUpPromise.max.timeOfDay
            });
        
            return {
                packPromiseMin,
                packPromiseMax,
                shipPromiseMin,
                shipPromiseMax,
                deliveryPromiseMin,
                deliveryPromiseMax,
                readyPickupPromiseMin,
                readyPickupPromiseMax
            };

        } else {
            return priorityCases(priority + 1);
        }
    }
}

const getNextBusinessDays = () => {
    let nextBusinessDays = [];
    let i = 1;
    while (i <= 10) {
        let nextDate = constants.currentDate;
        nextDate.setDate(nextDate.getDate() + 1);
        if (!constants.offDays.includes(nextDate)) {
            nextBusinessDays.push(new Date(nextDate));
            i++;
        }
    }
    constants.nextBusinessDays = nextBusinessDays;
}

const calculatePromise = ({
        minType,
        minDeltaHours,
        minDeltaBusinessDays,
        minTimeOfDay,
        maxType,
        maxDeltaHours,
        maxDeltaBusinessDays,
        maxTimeOfDay
    }) => {
    let min;
    let max;

    switch (minType) {
        case null:
            min = null;
            break;
        case 'DELTA-HOURS':
            min = constants.currentDate + minDeltaHours;
            break;
        case 'DELTA-BUSINESSDAYS':
            min = constants.nextBusinessDays[minDeltaBusinessDays - 1];
            min += ` ${minTimeOfDay}`
            break;
    }

    switch (maxType) {
        case null:
            max = null;
            break;
        case 'DELTA-HOURS':
            max = constants.currentDate + maxDeltaHours;
            break;
        case 'DELTA-BUSINESSDAYS':
            max = constants.nextBusinessDays[maxDeltaBusinessDays - 1];
            max += ` ${maxTimeOfDay}`
            break;
    }

    if (min !== null) {
        min = new Date(min).toUTCString();
    }

    if (max !== null) {
        max = new Date(max).toUTCString();
    }
    return { min, max };
}

const returnDefaultValues = () => {
    return {
        packPromiseMin: null,
        packPromiseMax: null,
        shipPromiseMin: null,
        shipPromiseMax: null,
        deliveryPromiseMin: null,
        deliveryPromiseMax: null,
        readyPickupPromiseMin: null,
        readyPickupPromiseMax: null
    }
}