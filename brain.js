const toggleDarkModeButton = document.querySelector('#toggle-dark-mode');
toggleDarkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

class RegistroProduto {
  constructor() {
    this.produtos = [];
  }

  registrarProduto() {
    // Obter os valores do formulário
    const nomeCliente = document.querySelector('#nomeCliente').value;
    const cpf = document.querySelector('#cpf').value;
    const telefone = document.querySelector('#telefone').value;
    const dataCompra = document.querySelector('#dataCompra').value;
    const nomeProduto = document.querySelector('#nomeProduto').value;
    const validadeProduto = document.querySelector('#validadeProduto').value;
    const valorProduto = document.querySelector('#valorProduto').value;
    const numParcelas = document.querySelector('#numParcelas').value;

    // Obter os nomes dos campos do formulário
    const formFields = document.querySelectorAll('#form input');
    const fieldNames = Array.from(formFields).map(field => field.name);

    // Criar uma linha com os títulos dos campos
    const titleRow = `${fieldNames.join(',')}\n`;

    // Adicionar a linha de títulos ao arquivo CSV
    let csvData = `data:text/csv;charset=utf-8,${titleRow}`;

    // Obter o valor de cada campo e criar uma linha no formato CSV com as informações do produto
    const csvRow = `${nomeCliente},${cpf},${telefone},${dataCompra},${nomeProduto},${validadeProduto},${valorProduto},${numParcelas}\n`;

    // Adicionar a linha de dados ao arquivo CSV
    csvData += `${csvRow}`;

    // Criar um elemento de link de download
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvData));
    link.setAttribute('download', 'produtos.csv');

    // Adicionar o elemento ao corpo do documento
    document.body.appendChild(link);

    // Clicar no elemento para iniciar o download
    link.click();

    // Criar um objeto com as informações do produto
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

    // Adicionar o produto ao array de produtos
    this.produtos.push(produto);

    // Exibir mensagem de sucesso
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerText = 'Produto registrado com sucesso!';
    document.body.appendChild(successMessage);

    // Limpar os campos do formulário
    document.querySelector('#form').reset();

    // Esconder a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }
}

// Instanciar um objeto de RegistroProduto
const registroProduto = new RegistroProduto();

// Adicionar um listener de evento para o botão de registro
document.querySelector('#btn-registrar').addEventListener('click', (event) => {
  event.preventDefault();
  // Chamar o método de registro do objeto
  registroProduto.registrarProduto();
});
