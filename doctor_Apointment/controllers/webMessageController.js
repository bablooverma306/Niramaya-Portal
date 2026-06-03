import webMessageModel from "../models/webMessage.js"

//  7 create message 
 export const createMessage = async(req,res)=>{
try{
    const {name ,contact,message}= req.body

    if(!name || !contact || !message){
        return res.status(400).send({   // ✅ 402 → 400
            success:false,
            message:'please provide all fields'
        })
    }

    const webMessage = new webMessageModel({name,contact,message})

    await webMessage.save();   // ✅ await add kiya

    res.status(201).send({
        success:true,
        message:'yous message send successfully ',
        webMessage,
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        success : false,
        message:'error in web message api',
        error
    })
}
};

///  8 get all massage

export const getAllMessage = async(req,res)=>{
try{
   
   const webMessages = await webMessageModel.find({})

    res.status(201).send({
        success:true,
        message:'All webMssages',
        totalCount:webMessages.length,
        webMessages,
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        success : false,
        message:'error in get all web massages ',
        error
    })
}
};

/// 9 delete massage

export const deleteWebMessage = async(req,res)=>{
try{
   
  const {id} = req.params
  if(!id){
    return res.status(404).send({
        success:false,
        message:'please provide message id '
    })
  }
  // find message 
  const webMessage = await webMessageModel.findByIdAndDelete(id)

    res.status(201).send({
        success:true,
        message:'message has been deleted',
       
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        success : false,
        message:'delete message api',
        error
    })
}
};

