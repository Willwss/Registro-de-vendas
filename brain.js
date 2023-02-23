const toggleDarkModeButton = document.querySelector('#toggle-dark-mode');
toggleDarkModeButton.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
});

class RegistroProduto {
constructor() {
  this.produtos = [];
}

 registrarProduto() {
  // Pega valores do formulário
  const nomeCliente = document.querySelector('#nomeCliente').value;
  const cpf = document.querySelector('#cpf').value;
  const telefone = document.querySelector('#telefone').value;
  const dataCompra = document.querySelector('#dataCompra').value;
  const nomeProduto = document.querySelector('#nomeProduto').value;
  const validadeProduto = document.querySelector('#validadeProduto').value;
  const valorProduto = document.querySelector('#valorProduto').value;
  const numParcelas = document.querySelector('#numParcelas').value;

  // Pega nomes dos campos do formulário
  const formFields = document.querySelectorAll('#form input');
  const fieldNames = Array.from(formFields).map(field => field.name);

  // Cria uma linha com os títulos dos campos
  const titleRow = `${fieldNames.join(',')}\n`;

  // Adiciona a linha de títulos ao arquivo CSV
  let csvData = `data:text/csv;charset=utf-8,${titleRow}`;

  // Obter o valor de cada campo e criar uma linha no formato CSV com as informações do produto
  const csvRow = `${nomeCliente},${cpf},${telefone},${dataCompra},${nomeProduto},${validadeProduto},${valorProduto},${numParcelas}\n`;

    // Adiciona a linha de dados ao arquivo CSV
    csvData += `${csvRow}`;

    // Cria um elemento de link de download
    const link = document.createElement('a');
    const nomeArquivo = document.querySelector('#nomeArquivo').value;
    link.setAttribute('href', encodeURI(csvData));
    link.setAttribute('download', `${nomeArquivo}.csv`);

    // Adiciona o elemento ao corpo do documento
    document.body.appendChild(link);

    // Clica no elemento para iniciar o download
    link.click();

    // Cria um objeto com as informações do produto
    const produto = {
      nomeCliente,
      cpf,
      telefone,
      dataCompra,
      nomeProduto,
      validadeProduto,
      valorProduto,
      numParcelas
    };

    // Adiciona o produto ao array de produtos
    this.produtos.push(produto);

    // Exibe mensagem de sucesso
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerText = 'Produto registrado com sucesso!';
    document.body.appendChild(successMessage);

    // Limpa os campos do formulário
    document.querySelector('#form').reset();

    // Esconde a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }
}

// Instancia um objeto de RegistroProduto
const registroProduto = new RegistroProduto();

// Adiciona um listener de evento para o botão de registro
document.querySelector('#btn-registrar').addEventListener('click', (event) => {
  event.preventDefault();
  // Chama o método de registro do objeto
  registroProduto.registrarProduto();
});
