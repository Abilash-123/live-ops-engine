const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_CODE = "Abiandvigneshfriends"
const {offer} = require("../schemas/offer-schema");
const getUserByToken = (token)=>{
   return new Promise ((resovle, reject)=>{
        if(token){
            let userData
            try{
                userData = jwt.verify(token, SECRET_CODE)
                resovle(userData)
            } catch(err){
                reject("Invalid Token!")
            }
        }else{
            reject("Token not found")
        }
    })
}
router.post("/list", async(req, res)=>{
    const validOffers = []
    offer.find().then((offers)=>{
        // console.log(offers,"offer list")
        offers.filter((offer)=>{
            const rule = offer.target.split("and")
            //['age > 30', 'instaled_days < 5']
            // console.log(rule);
            rules.forEach(()=>{
                let ruleKey = {};
                if(rule.includes(">")){
                    ruleKey = {key : rule.trim().split(">")[0].trim(), value : rule.trim().split(">")[1]}
                    if(req.body[ruleKey.key] > ruleKey.value ){
                        validOffers.push(offer)
                    }
                    console.log(validOffers)
                }else{
                    ruleKey = {key : rule.trim().split("<")[0].trim(), value : rule.trim().split("<")[1]}
                    if(req.body[ruleKey.key] < ruleKey.value ){
                        validOffers.push(offer)
                    }
                    console.log(validOffers)
                }
            })
        })
        res.status(200).send(validOffers)
    }).catch(()=>{
        res.status(500).send("Internal Server Error")
    })

})
router.post("/create", async(req, res)=>{
    // find the user
    getUserByToken(req.headers.authorization).then((user)=>{
        // create a offer based on user
        offer.create({...req.body, username: user.username}).then((offer)=>{
            res.status(200).send(offer)

        }).catch((err)=>{
            res.status(400).send(err)

        })
        // res.status(200).send(user)

    }).catch((err)=>{
        res.status(400).send({message: err.message})
    })
})
router.put("/update", async()=>{
    offer.updateOne("identifierData", "newData")

})
router.delete("/delete", async()=>{
    offer.deleteOne({_id: req.body.id})
    
})
module.exports = router;