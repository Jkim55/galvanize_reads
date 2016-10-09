$("#choiceOfAuths").click(() => {
  let authName = $('select[name=choiceOfAuths] option:selected').text()
  let authID = $('select[name=choiceOfAuths] option:selected').attr("id")
  if($('#selectedAuths').text().indexOf(authName) === -1){
    let $authName = $("<option>", {
      "name": authID,
      "class": "selected",
      "text": authName,
      "selected":"true"
    })

    $("#selectedAuths").append($authName)
  } else {
    alert('author already exists!')
  }
})

$("#selectedAuths").click(() => {
  let id = $('select[name=selectedAuths] option:selected').attr("id")
  let selectedAuthID = $('select[name=selectedAuths] option:selected').remove();
});
