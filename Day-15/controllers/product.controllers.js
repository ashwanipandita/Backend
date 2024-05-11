export const addProduct = async(req,res)=>{
    try{
const {name,category,price,quantity,tags}= req.body.productData;
const {userId} = req.body;
if(!name|| !category|| !price|| !quantity || !tags || !userId){
    return res.json({success:false,error:"All fields are required"});
}

const newProduct = new ProductSchema({
name : name,
category : category,
price: price,
quantity : quantity,
tags : tags,
user : userId,
});

await newProduct.save();
return res.json({success:true,message:"Product successfully stored"});

    }catch(error){
        return res.json({success:false,error});
    }
};

export const getProductsByCategoryPrice = async function (req,res){
    try{
        const pipeline = [
            {$match:{ category:"electronics", price:{$gt:98000}}},
            {
                $group:{
                    _id : "$product",
                    totalQuantity : {$sum:"$quantity"},
                    totalPrice:{$sum:{$multiply: ["$quantity","$price"]}},
                },
            },
        ];

        const aggResult = await ProductSchema.aggregate(pipeline);

        return res.json ({
            success: true,
            message:"Products Aggregated",
            data: aggResult,
        });
    } catch (error) {
        return res.json({success:false,message:"Error",error});
    }
}



export const getProductsBySeller = async (req, res) => {
    try {
      const { userId } = req.body;
      const products = await ProductSchema.find({ user: userId }).populate(
        "user"
      );
      res.send(products);
    } catch (error) {
      console.log(error);
      return res.json({ success: false, error });
    }
  };

export const getAllProducts = async (req, res) => {
    try {
      const products = await ProductSchema.find({});
      return res.json({ success: true, products: products });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error, success: false });
    }
  };