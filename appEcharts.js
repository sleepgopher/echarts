const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const log = function() {
    console.log.apply(console, arguments)
}
const fs = require('fs')

app.use(bodyParser.json())
app.use(express.static('static'))

var sendHtml = function(path, response) {
    const options = {
        encoding: 'utf-8',
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data) {
        if(err === null) {
            // log('data', data)
            response.send(data)
        } else {
            response.send('')
        }
    })
}

var doubanAll = function(callback) {
    const options = {
        encoding: 'utf-8',
    }
    var path = 'doubandianying.txt'
    fs.readFile(path, options, function(err, data) {
        if(err === null) {
            var array = JSON.parse(data)
            callback(array)
        } else {
            log('读取失败')
        }
    })
}
var find = function(s1, s2) {
    for (var i = 0; i < s1.length; i++) {
        if(s1[i] === s2) {
            s1 = s1.slice(0, i)
        }
    }
    return s1
}


var fromData = function(array) {
    var result = {}
    var scores = []
    var names = []
    var numberOfPeoples = []
    for (let i = 0; i < array.length; i++) {
        let a = array[i]
        scores.push(a.score)
        var s = find(a.name, '/')
        log('s', s, a.name)
        names.push(s)
        numberOfPeoples.push(parseInt(a.numberOfPeople) / 10000)
    }
    // log('scores', scores)
    result.scores = scores
    result.names = names
    result.numberOfPeoples = numberOfPeoples
    return result
}

app.get('/', function(request, response){
    var path = 'echarts.html'
    sendHtml(path, response)
})

app.get('/douban/all', function(request, response){
    var data = doubanAll(function(data) {
        log('data', data)
        var result = fromData(data)
        log('result', result)
        if(result !== undefined) {
            response.send(result)
        } else {
            response.send('error')
        }
    })
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    log("应用实例, 访问地址为 http://%s:%s", host, port)

})
