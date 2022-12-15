const user1 = require('../model/user')
const db = require('../database')
const console = require('console')
const { where } = require('sequelize')

//post

const add = async (req, res) => {
  try {
    const resp = await user1.bulkCreate(req.body)

    console.log(' records saved successfully')

   // console.log(resp.toJSON())

    res.status(200).json({
      message: 'records saved successfully',
      res: resp
    })
  } catch (err) {
    console.error(err.message)
    res.status(400).json({
      message: 'unable to save the record',
      err: err.message
    })
  }
}
//delete user based on expirydate
const deleteUser = async (req, res) => {
  try {
    var date = new Date()
    var formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`
    console.log("formattedDate",formattedDate)
    await user1.destroy({
      where: {
        expiryDate: formattedDate
      }
    })
    console.log('rows deleted in db')
    console.log('running in every 20sec')
  } catch (error) {
    console.error(err.message)
    res.status(400).json({
      message: 'record not saved successfully',
      err: err.message
    })
  }
}
//delete the user based on validity status
const updateAndDelete = async (req, res) => {
  try {
    var date = new Date()
    var formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`
    console.log("formattedDate",formattedDate)
    const result = await user1.findAll()

    const columnName = "expiryDate";

    const result1 = result.map(x => x[columnName])
    console.log(result1);

        for(let i=0 ; i<result1.length ;i++ ){
          console.log("value",result1[i])

            if(result1[i] == formattedDate){

                const record ={where:{expiryDate:formattedDate}}
                console.log("record",record)
                const updateRecord = {validity:"expiry"}
                console.log(updateRecord)
                const resp =  await user1.update(updateRecord,record);

                console.log(resp)
                console.log(user1.name)
                const result2 = result.map(x => x["validity"])
                console.log("result:",result2)
                
                 const resp1 = await user1.destroy({where:{
                    validity:"expiry"
                  }});
               console.log("users deleted")

            }else{
                console.log("null")

            }
        }
    console.log('rows updated in db')
    console.log('running in every 20sec')
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      message: 'record not saved successfully',
      err: error.message
    })
  }
}

module.exports = { add,deleteUser,updateAndDelete }
