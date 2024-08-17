const { Router } = require("express");
const Profile = require("../models/profile.model")
const router = Router();

router.get("/ProfileEdit", (req, res) => {
    return res.render("ProfileEdit")
})

router.get("/Profilepage", (req, res) => {
    return res.render("Profilepage")
})

router.post("/ProfileEdit",async(req, res) => {
    const {name, Bio, College, location,  SocilAcounts, dailyContrubution,  profilePhoto} = req.body;
  const userProfile = await Profile.create({
        name,
        Bio,
        College,
        location,
        SocilAcounts,
        dailyContrubution,
        profilePhoto
    })
  console.log("UserProfileEdited", userProfile);
  
 return res.redirect("Profilepage");

})



module.exports = router;