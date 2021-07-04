const mongoose = require("mongoose")
const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },//名字
    describe: { type: String },//描述
    Price: { type: Number, required: true },//价格
    classification: { type: String }, //分类
    image: { type: Array }, //图片
    details: { type: String }, //详情
    time: { type: Number, default: Date.now },
    state:{type:String,default:"0"}  //商品状态  0上架   1下架
})

const shopModel = mongoose.model("shops", shopSchema)

module.exports = shopModel