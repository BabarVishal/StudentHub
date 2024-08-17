const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const Comment = require("../models/comment");
const Profile = require("../models/profile.model");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  console.log( "blogs deta :",blog);
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
  const profile = await Profile.findById(req.params._id).populate("crearedBy");
  console.log("your Profile deta is :", profile);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
    profile
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.post("/Profilepage", upload.single("profilePhoto"), async (req, res) => {
  const { name, Bio, College, location } = req.body;
  const Profile = await Profile.create({
    name,
    Bio,
    College,
    location,
    profilePhoto: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/profilepage/${Profile._id}`);
});

module.exports = router;
