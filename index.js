//Dependencies
const Axios = require("axios")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <input> <output>")
    process.exit()
}

if(!Fs.existsSync(Self_Args[0])){
    console.log("Invalid input.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output.")
    process.exit()
}

const file_data = Fs.readFileSync(Self_Args[0], "utf8").split("\n")

if(!file_data.length){
    console.log("Input data is empty.")
    process.exit()
}

var results = []
var token_index = 0

Check()
async function Check(){
    if(token_index === file_data.length){
        if(!results.length){
            console.log("No valid tokens found.")
            process.exit()
        }

        console.log(`${results.length} valid tokens found.`)
        console.log(`Saving the results to ${Self_Args[1]}`)
        Fs.writeFileSync(Self_Args[1], results.join("\n"), "utf8")
        console.log(`Results successfully saved to ${Self_Args[1]}`)
        process.exit()
    }

    try{
        await Axios({
            method: "GET",
            url: "https://discord.com/api/v8/users/@me",
            headers: {
                authorization: file_data[token_index]
            }
        })

        console.log(`Valid token ${file_data[token_index]}`)
        results.push(file_data[i])
    }catch{
        console.log(`Invalid token ${file_data[token_index]}`)
    }

    token_index++
    Check()
}