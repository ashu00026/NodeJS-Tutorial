const { query } = require('express')
const product = require('../models/product')
const Product=require('../models/product')

const getAllProductsStatic=async(req,res)=>{
    const search='den'
    const products=await Product.find({price:{$gt:30}}).sort('price').select('name price')
    res.status(200).json({products, nbhit:products.length})
}
const getAllProducts=async(req,res)=>{
    const {featured,company,name,sort,fields,numericFilters}=req.query;
    queryObject={}
    if(featured){
        queryObject.featured=featured==='true'?true:false;
    }
    if(company){
        queryObject.company= company
    }
    if(name){
        queryObject.name= {$regex:name,$options:'i'};
    }
    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx=/\b(<|>|>=|=|<|<=)\b/g
        let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        options=['price','rating']
        filters=filters.split(',')
        filters.forEach((item)=>{
            [field,operator,value]=item.split('-')
            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)}
            }
        })
        // console.log(queryObject)
    }


    console.log(queryObject)
    let result= product.find(queryObject)
    if(sort){
        const sortedList=sort.split(',').join(' ');
        result= result.sort(sortedList)
    }
    else{
        result=result.sort('createdAt')
    }
    if(fields){
        const fieldsList=fields.split(',').join(' ');
        result= result.select(fieldsList)
    }
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||10
    const skip=(page-1)*limit;

    result= result.skip(skip).limit(limit)
    


    const products= await result
    res.status(200).json({products,nbhit:products.length})
}

module.exports={getAllProductsStatic,getAllProducts}