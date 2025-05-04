const getHome = async (req,res) => {
    res.render('index');
}

const getProductDetail = async(req,res)=>{
    res.render('product')
}

const getFavorites = async (req, res) => {
    res.render('favorites');
}

const getCategories = async (req, res) => {
    res.render('categories');
}

const getContact = async (req, res) => {
    res.render('contact');
}

module.exports ={
    getHome,
    getProductDetail,
    getFavorites,
    getCategories,
    getContact
}