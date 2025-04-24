const getHome = async (req,res) => {
    res.render('index');
}

const getProductDetail = async(req,res)=>{
    res.render('product')
}

module.exports ={
    getHome,
    getProductDetail
}