import Product from './Product';
import Validator from './Validator';
import addForm from './addForm';

const validator = new Validator();

const products = [];

const createProduct = document.querySelector('.btn-product-creator');
const table = document.querySelector('tbody');
const modalWindow = document.querySelector('.modal-window');
const btnDeleteProd = modalWindow.querySelector('.btn_delete');
const btnCancelProd = modalWindow.querySelector('.btn_modal-cancel');
const mainContainer = document.querySelector('.main-container');

function buildProductList(productList, tableList) {
  tableList.innerHTML = ` <tr class="products-table_thead">
                <th class="thead-product-name">Название</th>
                <th class="thead-product-price">Стоимость</th>
                <th class="thead-product-actions">Действия</th>
            </tr>`;

  productList.forEach((product, index) => {
    const el = document.createElement('tr');
    el.classList.add('product');
    el.innerHTML = `  <td class="product-name">${product.name}</td>
                <td class="product-price">${product.cost}</td>
                <td class="product-actions">
                    <div class="btn-product-update">
                        <i class="fas fa-pencil-alt fa-lg"></i>
                    </div>
                    <div class="btn-product-delete">
                        <i class="fas fa-times fa-lg"></i>
                    </div>
                </td>`;

    tableList.appendChild(el);

    const close = el.querySelector('.btn-product-delete');
    const update = el.querySelector('.btn-product-update');

    close.addEventListener('click', () => {
      modalWindow.classList.remove('hidden');
      modalWindow.classList.add('active');

      btnDeleteProd.addEventListener('click', () => {
        productList.splice(index, 1);
        el.remove();
        modalWindow.classList.add('hidden');
        modalWindow.classList.remove('active');
      });

      btnCancelProd.addEventListener('click', () => {
        modalWindow.classList.add('hidden');
        modalWindow.classList.remove('active');
      });
    });

    update.addEventListener('click', () => {
      const updateForm = addForm('editor-form');
      const updateInputName = updateForm.querySelector('.editor-form-input-name');
      const updateInputCost = updateForm.querySelector('.editor-form-input-cost');
      const updateFields = updateForm.querySelectorAll('.field');

      mainContainer.appendChild(updateForm);

      updateInputName.value = product.name;
      updateInputCost.value = product.cost;

      updateForm.addEventListener('reset', (e) => {
        e.preventDefault();

        mainContainer.removeChild(updateForm);
      });

      updateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        validator.removeValidation(updateFields);

        validator.checkFieldsPresence(updateForm, updateFields);

        validator.checkPrice(updateInputCost);

        validator.keyUp(updateFields);

        if (validator.isValid(updateFields)) {
          if (updateInputName.value !== product.name) {
            productList[index].name = updateInputName.value;
            el.querySelector('.product-name').textContent = productList[index].name;
          }

          if (Number(updateInputCost.value) !== product.cost) {
            productList[index].cost = Number(updateInputCost.value);
            el.querySelector('.product-price').textContent = productList[index].cost;
          }

          mainContainer.removeChild(updateForm);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  products.push(new Product('iPhone XR', 60000));
  buildProductList(products, table);

  products.push(new Product('Samsung Galaxy S10+', 80000));
  buildProductList(products, table);

  products.push(new Product('Huawei View', 50000));
  buildProductList(products, table);
});

createProduct.addEventListener('click', () => {
  const createForm = addForm('create-form');
  const inputName = createForm.querySelector('.create-form-input-name');
  const inputCost = createForm.querySelector('.create-form-input-cost');
  const fields = createForm.querySelectorAll('.field');

  mainContainer.appendChild(createForm);

  createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    validator.removeValidation(fields);

    validator.checkFieldsPresence(createForm, fields);

    validator.checkPrice(inputCost);

    validator.keyUp(fields);

    if (validator.isValid(fields)) {
      const newProduct = new Product(inputName.value, inputCost.value);
      products.push(newProduct);

      buildProductList(products, table);
      createForm.reset();
    }
  });

  createForm.addEventListener('reset', (e) => {
    e.preventDefault();

    mainContainer.removeChild(createForm);
  });
});
