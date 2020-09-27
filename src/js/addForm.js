export default function addForm(className) {
  const form = document.createElement('form');
  form.classList.add(className);
  form.setAttribute('novalidate', '');
  form.innerHTML = ` <div class="name-container">
                <label for="name" class="form-title-name">Название</label>
                <input id="name" class="${className}-input-name field" type="text">
                <span>Введите название товара</span>
            </div>
            <div class="cost-container">
                <label for="cost" class="form-title-cost">Стоимость</label>
                <input id="cost" class="${className}-input-cost field" type="number" min="1">
                <span>Введите стоимость товара</span>
            </div>
            <div class="btn-container">
                <button class="btn ${className}-btn_save" type="submit">Сохранить</button>
                <button class="btn ${className}-btn_cancel" type="reset">Отмена</button>
            </div>`;

  return form;
}
