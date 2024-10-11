import express from 'express'
import { Fixture } from '../models/fixturesModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get page number from query, default to 1
        const limit = 10; // Number of fixtures per page
        const fixtures = await Fixture.find({})
            .skip((page - 1) * limit) // Skip the fixtures from previous pages
            .limit(limit); // Limit to the specified number of fixtures

        const totalFixtures = await Fixture.countDocuments(); // Get total count of fixtures
        const hasMore = totalFixtures > page * limit; // Check if there are more fixtures

        return res.status(200).send({
            fixtures,
            hasMore,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get('/highlights', async (req, res) => {
    try {
        const fixtures = await Fixture.find({ highlights: { $ne: null } }).sort({ date: -1 }).limit(10);
        return res.status(201).send(fixtures)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.get('/latest-highlight', async (req, res) => {
    try {
        const fixture = await Fixture.findOne({ highlights: { $ne: null } }) // Check if highlights are not null
            .sort({ date: -1 }); // Sort by date in descending order

        return res.status(200).send(fixture); // Use 200 for a successful response
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});


router.get('/latest', async (req, res) => {
    try {
        const currentDate = new Date();

        const oldFixtures = await Fixture.find({
            date: { $lt: currentDate.toISOString() }
        }).sort({ date: -1 }).limit(2);

        const newFixtures = await Fixture.find({
            date: { $gt: currentDate.toISOString() }
        }).sort({ date: 1 }).limit(2);

        const fixtures = [...oldFixtures, ...newFixtures];

        return res.status(200).json(fixtures);
    } catch (error) {
        console.error("Error in /latest route:", error);
        return res.status(500).json({ message: 'Error fetching fixtures', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fixture = await Fixture.findById(id)
        return res.status(201).send(fixture)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Fixture.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Fixture not found' });
        }

        return res.status(200).send({ message: 'Fixture updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Fixture.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Fixture not found' });
        }

        return res.status(200).send({ message: 'Fixture deleted' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const newFixture = {
        home: req.body.home,           // Home team
        away: req.body.away,           // Away team
        homelogo: req.body.homelogo,   // Home team logo URL
        awaylogo: req.body.awaylogo,   // Away team logo URL
        date: req.body.date,           // Fixture date
        score: req.body.score,         // (Optional) Score of the match
        highlights: req.body.highlights,  // (Optional) YouTube highlights URL
    };

    try {
        const fixture = await Fixture.create(newFixture);
        return res.status(201).send(fixture);
    } catch (error) {
        return res.status(500).send({ error: 'Failed to create fixture' });
    }
});


export default router;