const makeRequest = async()=>{
    console.log("abcd")
    const url = document.getElementById("url").value
    const method = String(document.getElementById("method").value).toLowerCase()
    let body = document.getElementById("req-body").value
    //alert(body.length)
    if(body.length===0)
    {
        body = {}
    }
    else
    {
        body = JSON.parse(body)
    }

    //alert(JSON.stringify(body))


    const response = await axios({
        method,
        url,
        data:body
    })

    alert(JSON.stringify(response.data))
}