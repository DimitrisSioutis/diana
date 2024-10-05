import express from 'express'
import { Article } from '../models/articleModel.js'
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find({})
        return res.status(201).send(articles)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.get('/latest', async (req, res) => {
    try {
        const articles = await Article.find({})
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(9); // Limit the result to the next 6 articles (4th to 9th)
        return res.status(200).send(articles); 
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message }); 
    }
});

router.get('/page', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if no page query parameter
        const pageSize = 10; // Number of articles per page

        const count = await Article.countDocuments({});
        const articles = await Article.find()
            .sort({ createdAt: -1 })  // Sort by creation date, most recent first
            .skip(pageSize * (page - 1)) // Correct skip calculation
            .limit(pageSize); // Limit the result to pageSize documents

        res.status(200).json({ articles, count });
    } catch (error) {
        console.error('Error fetching articles:', error.message);
        return res.status(500).send({ message: error.message });
    }
});




router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id)
        return res.status(201).send(article)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Article.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Article not found' });
        }

        return res.status(200).send({ message: 'Article updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Article.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Article not found' });
        }

        return res.status(200).send({ message: 'Article deleted' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const newArticle = {
        title: req.body.title,
        desc: req.body.desc,
        body: req.body.body,
        img: req.body.img,
    }

    const article = await Article.create(newArticle)

    return res.status(201).send(article)
})

export default router;