const { Category } = require('../../models');
const CreateError = require('http-errors');

const {
    ok,
    notFound
} = require('../../libs').HTTP_RESPONSES;


const removeCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const { collectionId, isEnglishVersion } = req.body;
    let deletedCategory;
    
    const categoryList = await Category.findById(collectionId);

    if(isEnglishVersion) {
        Object.entries(categoryList.en).forEach((item, i ) => {
            if(item[1].id === categoryId) {
                deletedCategory = {...categoryList.en[i]};

                categoryList.en.splice(i, 1)
            }
        })
    } else {
        Object.entries(categoryList.ru).forEach((item, i )=> {
            if(item[1].id === categoryId) {
                deletedCategory = {...categoryList.ru[i]};

                categoryList.ru.splice(i, 1)
            }
        })
    }

    await Category.findByIdAndUpdate(collectionId, categoryList)

    if(deletedCategory) {
        res.status(ok.code).json(categoryList)
    } else {
        throw new CreateError(notFound.code, notFound.status)
    }
}

module.exports = removeCategory;