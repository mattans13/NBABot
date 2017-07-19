const fetch = require('node-fetch')
const cheerio = require('cheerio')

const ARR_LENGTH = 4

let i = 0;
fetch('https://sports.yahoo.com/nba/scoreboard/?schedState=3&dateRange=2017-03-14')
    .then( (res) => {
        return res.text()
    })
    .then( (body) => {
        let teams = []
        const $ = cheerio.load(body)
        $('li').each(function() {
            let data = $(this).children()
            if ($(this).attr('class') && $(this).attr('class').includes("D(tb) team")){
                console.log(i + ": team " + (i++ % 2 == 0? "one ": "two ") + data.text().replace(" ",""))
                teams.push(data.text().replace(" ",""))
            }
        })
        return teams
    })
    .then( (teams) => {
        let homeTeamsCities = [], homeTeamsNames = [], homeTeamsScores = [], awayTeamsCities = [], awayTeamsNames = [], awayTeamsScores = []
        for (let i = 0; i < teams.length; i++) {
            let team = teams[i].split(/(?=[A-Z])|(\d+)/).filter(x => x).join(' ')
            console.log(team)
            let teamComponents = team.split(/\s+/)
            if (teamComponents.length == 4) {
                teamComponents[0] += " " + teamComponents[1]
                teamComponents.splice(1,1)
            }
            if (i % 2 == 0) {
                homeTeamsCities.push(teamComponents[0])
                homeTeamsNames.push(teamComponents[1])
                homeTeamsScores.push(teamComponents[2])
            }
            else {
                awayTeamsCities.push(teamComponents[0])
                awayTeamsNames.push(teamComponents[1])
                awayTeamsScores.push(teamComponents[2])
            }
        }
        console.log(homeTeamsCities)
        console.log(awayTeamsCities)
    })
    .catch( (err) => {
        console.log(err)
    });