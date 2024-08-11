const { isValidObjectId } = require("mongoose");
const articleModel = require("../../models/article");

exports.create = async (req, res) => {
  const { title, category, body, href, description } = req.body;
  if (!isValidObjectId(category)) {
    return res.status(422).json({ message: "Category ID is not Valid" });
  }
  const article = await articleModel.create({
    title,
    category,
    body,
    href,
    description,
    author: req.user._id,
    cover: req.file.filename,
    published: 1,
  });
  if (article) {
    return res
      .status(201)
      .json({ message: "Article Created Successfully", article });
  } else {
    return res.status(500).json({ message: "Unkown Error" });
  }
};

exports.getAll = async (req, res) => {
  const articles = await articleModel.find({}).lean();
  if (articles) {
    return res.status(200).json({ articles });
  } else {
    return res.status(404).json({ message: "There is No Article" });
  }
};

exports.getOne = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const article = await articleModel.findOne({ _id: req.params.id }).lean();
  if (article) {
    return res.status(200).json({ article });
  } else {
    return res.status(404).json({ message: "There is No Article" });
  }
};

exports.draft = async (req, res) => {
  const { title, category, body, href, description } = req.body;
  if (!isValidObjectId(category)) {
    return res.status(422).json({ message: "Category ID is not Valid" });
  }
  const article = await articleModel.create({
    title,
    category,
    body,
    href,
    description,
    author: req.user._id,
    cover: req.file.filename,
    published: 0,
  });
  if (article) {
    return res
      .status(201)
      .json({ message: "Article Created Successfully", article });
  } else {
    return res.status(500).json({ message: "Unkown Error" });
  }
};

exports.remove = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const deletedarticle = await articleModel
    .findOneAndDelete({ _id: req.params.id })
    .lean();
  if (deletedarticle) {
    return res
      .status(200)
      .json({ message: "Article Deleted Successfully", deletedarticle });
  } else {
    return res
      .status(404)
      .json({ message: "There is No Article With This ID" });
  }
};

exports.publish = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const article = await articleModel
    .findOneAndUpdate({ _id: req.params.id }, { $set: { published: 1 } })
    .lean();
  if (article) {
    return res.status(200).json({ article });
  } else {
    return res.status(404).json({ message: "There is No Article" });
  }
};
exports.unpublish = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const article = await articleModel
    .findOneAndUpdate({ _id: req.params.id }, { $set: { published: 0 } })
    .lean();
  if (article) {
    return res.status(200).json({ article });
  } else {
    return res.status(404).json({ message: "There is No Article" });
  }
};
exports.update = async (req, res) => {
  const { newHref, description, title, category, body } = req.body;
  const { href } = req.params;
  const article = await articleModel.find({ href }).lean();
  if (!article) {
    return res
      .status(404)
      .json({ message: "There is No Article with this href" });
  }
  if (!(await articleModel.findOne({ href, author: req.user._id }))) {
    console.log(article.author + "   " + req.user._id);
    return res.status(403).json({ message: "you are Not The Author" });
  }
  const updatedArticle = await articleModel.findOneAndUpdate(
    { href },
    {
      $set: {
        body,
        href: newHref,
        description,
        title,
        category,
      },
    }
  );
  if (updatedArticle) {
    return res.status(202).json({ message: "Article Updated Successfully" });
  } else {
    return res.status(500).json({ message: "Unkown Error" });
  }
};
