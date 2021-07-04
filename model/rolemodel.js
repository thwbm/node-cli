// rolemodel的作用：
const mongoose=require("mongoose")
// 定义schema   描述文档结构
const roleSchema=new mongoose.Schema({
    name:{type:String,required:true},
    auth_name:String, //授权人
    auth_time:Number,  //授权时间
    create_time:{type:Number,default:Date.now},//创建时间
    menu:Array  //角色可以操控的菜单
})
// 定义model
const RoleModel=mongoose.model("roles",roleSchema)
module.exports=RoleModel