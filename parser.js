function parse(json_string) {
    const input_split = json_string.split('Rest Api Logger.INFO:  ')
    const input_json = input_split[1].replace(' []', '')
    const input_obj = JSON.parse(input_json)
    input_obj['request']['body'] = JSON.parse(input_obj['request']['body'])
    input_obj['response']['body'] = JSON.parse(input_obj['response']['body'])
    return JSON.stringify(input_obj, null, 4)
}

function htmlManager() {
    const output_elem = document.getElementById("output")
    const logarea_elem = document.getElementById("logarea")
    output_elem.value = ''
    logarea_elem.value = ''
    try {
        const parsed_json = parse(document.getElementById("input").value)
        output_elem.value = parsed_json
    } catch (error) {
        logarea_elem.value = error
    }
}

document.getElementById("btn-parse").addEventListener("click", htmlManager)
