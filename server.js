const axios = require('axios')
const express = require('express')
const next = require('next')
const scrapeIt = require('scrape-it')
const _ = require('lodash')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/locate', (req, res) => {
    const address = req.query.address
    if (address && address !== '') {
      axios
        .get(
          `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${
            process.env.GOOGLE_CIVIC_API_KEY
          }&address=${encodeURIComponent(address)}&electionId=${req.query
            .electionId || 2000}`
        )
        .then(response => {
          res.json(response.data)
        })
        .catch(error => {
          res.status(500).json({ error: 'an error occurred' })
        })
    } else {
      res.status(400).json({ error: 'no address specified' })
    }
  })

  server.get('/positions', (req, res) => {
    const { rep, state } = req.query
    if (!name || name === '' || !rep || rep === '') {
      res
        .status(400)
        .json({ error: 'invalid parameters, name and rep are required.' })
    }
    axios
      .get(`https://votesmart.org/x/search?s=${encodeURIComponent(rep)}`)
      .then(response => {
        response.data.results.forEach(element => {
          if (state === element.state_id && element.incumbent !== true) {
            const baseUrl =
              'https://votesmart.org/candidate/political-courage-test/'
            const vsUrl = `${baseUrl}${
              element.votesmart_candidate_id
            }/${_.kebabCase(element.name)}`
            scrapeIt(vsUrl, {
              questions: {
                listItem: 'tr.question-answer',
                data: {
                  response: 'td.span-3',
                  question: '.span-3'
                }
              }
            }).then(({ data, response }) => {
              console.log(`Status Code: ${response.statusCode}`)
              console.log(data)
            })
          }
        })
      })
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
