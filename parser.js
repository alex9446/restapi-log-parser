function parse() {
    const input = document.getElementById("input").value
    const input_split = input.split('Rest Api Logger.INFO:  ')
    const input_json = input_split[1].replace(' []', '')
    const input_obj = JSON.parse(input_json)
    input_obj['request']['body'] = JSON.parse(input_obj['request']['body'])
    input_obj['response']['body'] = JSON.parse(input_obj['response']['body'])
    const output_json = JSON.stringify(input_obj, null, 4)
    document.getElementById("output").value = output_json
}

document.getElementById("btn-parse").addEventListener("click", parse)
