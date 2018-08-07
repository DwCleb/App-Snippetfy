const { Snippet, Category } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryId } = req.params;

      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: categoryId,
      });

      req.flash('success', 'Snippet registered');

      return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async show(req, res, next) {
    try {
      const { categoryId, id } = req.params;

      const categories = await Category.findAll({
        include: [Snippet],
        where: {
          UserId: req.session.user.id,
        },
      });

      const snippets = await Snippet.findAll({
        where: {
          CategoryId: categoryId,
        },
      });

      const snippet = await Snippet.findById(id);

      return res.render('snippets/show', {
        activeCategory: categoryId,
        categories,
        snippets,
        currentSnippet: snippet,
      });
    } catch (err) {
      return next(err);
    }
  },
  async update(req, res, next) {
    try {
      const snippet = await Snippet.findById(req.params.id);

      await snippet.update(req.body);

      req.flash('success', 'Success Snippet Updated!');

      return res.redirect(`/app/categories/${req.params.categoryId}/snippets/${req.params.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      await Snippet.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Success Snippet Removed!');

      return res.redirect(`/app/categories/${req.params.categoryId}`);
    } catch (err) {
      return next(err);
    }
  },
};
