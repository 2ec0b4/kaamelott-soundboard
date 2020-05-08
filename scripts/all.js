/* eslint-disable */
const path = require('path')
const fs = require('fs')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const directoryPath = path.join(__dirname, '../sounds')

const main = async () => {
    const mp3s = await listLocalDir()
    const originalDir = "./sounds/original"
    await fs.promises.mkdir(originalDir, { recursive: true })

    console.log(`Found ${mp3s.length} mp3`)

    for (let i = 0; i < mp3s.length; i++) {
        const mp3 = mp3s[i]
        console.log(i, mp3)
        await exec(`cp "sounds/${mp3}" "sounds/original/${mp3}"`);
        await exec(`sh scripts/normalize.sh "sounds/${mp3}"`);
    }

    console.log("\n\nDone")
}

const listLocalDir = async () => {
    return new Promise((resolve, reject) => fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log('Unable to scan directory: ' + err)
            reject('Unable to scan directory: ' + err)
            return
        }
        resolve(files.filter(file => file.endsWith(".mp3"))
            .filter(file => !file.endsWith(".copy.mp3")))
    }))
}

main()
    .catch(error => {
        console.error(error)
    })
