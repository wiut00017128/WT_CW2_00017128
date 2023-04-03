const express = require('express')
const articleRoute = express.Router()
const { updateFiles, readFiles } = require('../helper-functions')

articleRoute.get('/create', async (req, res) => {
  res.render('pages/create', { article: {} })
})

articleRoute.post('/create', async (req, res) => {
  const data = await readFiles();
  const newOne = {
    id: data.articles.length + 1,
    title: req.body.title,
    description: req.body.description
  }
  updateFiles({
    articles: [...data.articles, newOne]
  })
  res.redirect("/")
})

articleRoute.get('/update/:id', async (req, res) => {
  const data = await readFiles();
  const byId = data.articles.find(post => {
    return post.id == req.params.id
  });
  res.render('pages/update', { article: byId })
})

articleRoute.post('/update/:id', async (req, res, next) => {
  const data = await readFiles()
  const article = data.articles.find(post => post.id == req.params.id)
  req.article = article
  next()
}, saveData('/update'))

articleRoute.post('/delete/:id', async (req, res) => {
  const data = await readFiles();
  const filteredData = data.articles.filter(post => {
    return post.id != req.params.id
  });

  updateFiles({
    articles: filteredData
  })
  res.redirect("/")
})

function saveData(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    try {
      const data = await readFiles();
      updateFiles({
        articles: data.articles.map(post => {
          if (post.id == req.params.id) {
            return article
          }
          return post
        }
        )
      })
      res.redirect("/")
    } catch (e) {
      res.render(`pages/${path}`, { article: article })
    }
  }
}

module.exports = articleRoute