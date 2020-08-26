const reqEstado = new XMLHttpRequest()

reqEstado.open("GET", "https://servicodados.ibge.gov.br/api/v1/localidades/estados", true)
reqEstado.send()

reqEstado.onreadystatechange = function () {
  if (reqEstado.readyState == 4 && reqEstado.status == 200) {
    const dadosJSON = reqEstado.responseText
    const dadosJSONOBJ = JSON.parse(dadosJSON)
    const estados = document.getElementById('estadosOpt')
    for (i = 0; i < dadosJSONOBJ.length; i++) {
      estados.innerHTML += "<option value=" + dadosJSONOBJ[i].sigla + ">" + dadosJSONOBJ[i].nome + "</option>"
    }
  }
}

const mudança = document.getElementById("estados")
mudança.addEventListener("change", function () {
  const select = document.querySelector('select')
  const valorSelectEstado = select.value

  const carregando = document.getElementById("CidadesOpt")
  carregando.innerHTML = "<option selected>Carregando...</option>"

  const reqCidades = new XMLHttpRequest()
  reqCidades.open("GET", "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + valorSelectEstado + "/municipios", true)
  reqCidades.send()

  reqCidades.onreadystatechange = function () {
    if (reqCidades.readyState == 4 && reqCidades.status == 200) {
      carregando.innerHTML = ""
      const dadosJSONCidades = reqCidades.responseText
      const dadosJSONOBJCidades = JSON.parse(dadosJSONCidades)

      const cidades = document.getElementById("CidadesOpt")

      for (i = 0; i < dadosJSONOBJCidades.length; i++) {
        cidades.innerHTML += "<option value=" + dadosJSONOBJCidades[i].id + ">" + dadosJSONOBJCidades[i].nome + "</option>"
      }
    }
  }
})