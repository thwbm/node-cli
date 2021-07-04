const mongoose=require("mongoose")
// 定义schema  描述文档类型
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    // 通过判断parentId来区分层级，默认为零
    parentId:{type:String,required:true,default:"0"}
})
//定义model
const CategoryModel=mongoose.model("categorys",categorySchema)

module.exports=CategoryModel