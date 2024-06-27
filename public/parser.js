function parse_img(body_obj) {
    try {
        const img = body_obj['entry']['content']
        const img_base64 = img['base64_encoded_data']
        const img_type = img['type']
        return 'data:'+img_type+';base64,'+img_base64
    } catch (error) {
        if (!(error instanceof TypeError)) {
            throw error
        }
    }
    return ''
}

function parse(json_string) {
    const input_split = json_string.split('Rest Api Logger.INFO:  ')
    const input_json = input_split[1].replace(' []', '')
    const input_obj = JSON.parse(input_json)
    input_obj['request']['body'] = JSON.parse(input_obj['request']['body'])
    input_obj['response']['body'] = JSON.parse(input_obj['response']['body'])
    const img_string = parse_img(input_obj['request']['body'])
    return [JSON.stringify(input_obj, null, 4), img_string]
}

function htmlManager() {
    const output_elem = document.getElementById("output")
    const img_elem = document.getElementById("output-img")
    const logarea_elem = document.getElementById("logarea")
    output_elem.value = ''
    img_elem.style.display = null
    logarea_elem.value = ''
    try {
        const [parsed_json, img_string] = parse(document.getElementById("input").value)
        output_elem.value = parsed_json
        if (img_string) {
            img_elem.style.display = 'block'
            img_elem.src = img_string
        }
    } catch (error) {
        logarea_elem.value = error
    }
}

async function loadExample() {
  const response = await fetch("./example.log")
  document.getElementById("input").value = await response.text()
}

document.getElementById("btn-parse").addEventListener("click", htmlManager)
document.getElementById("btn-example").addEventListener("click", loadExample)
