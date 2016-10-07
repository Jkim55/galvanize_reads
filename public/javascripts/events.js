$("#choiceOfAuths").click(() => {
  let authName = $('select[name=choiceOfAuths] option:selected').text()
  let authID = $('select[name=choiceOfAuths] option:selected').attr("id")
  if($('#selectedAuths').text().indexOf(authName) === -1){
    let $authName= $("<option>", {
      "id": authID,
      "text": authName,
      "selected":"true"
    })
    $("#selectedAuths").append($authName)
  } else {
    alert('author already exists!')
  }
})
