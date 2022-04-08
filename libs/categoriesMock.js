const {v4} = require('uuid');

const pigLangDefaultCategories = [
    {
        id: v4(),
        value: 'Основные расходы'
    },
    {
        id: v4(),
        value: 'Продукты'
    },
    {
        id: v4(),
        value: 'Машина'
    },
    {
        id: v4(),
        value: 'Забота о себе'
    },
    {
        id: v4(),
        value: 'Забота о детях'
    },
    {
        id: v4(),
        value: 'Товары для дома'
    },
    {
        id: v4(),
        value: 'Образование'
    },
    {
        id: v4(),
        value: 'Досуг'
    },
    {
        id: v4(),
        value: 'Другие расходы'
    },
];

const enLangDefaultCategories = [
    {
        id: v4(),
        value: 'Basic expenses'
    },
    {
        id: v4(),
        value: 'Products'
    },
    {
        id: v4(),
        value: 'Car'
    },
    {
        id: v4(),
        value: 'Self care'
    },
    {
        id: v4(),
        value: 'Child care'
    },
    {
        id: v4(),
        value: 'Household products'
    },
    {
        id: v4(),
        value: 'Education'
    },
    {
        id: v4(),
        value: 'Leisure'
    },
    {
        id: v4(),
        value: 'Other expenses'
    },
];

module.exports = {
    pigLangDefaultCategories,
    enLangDefaultCategories
}