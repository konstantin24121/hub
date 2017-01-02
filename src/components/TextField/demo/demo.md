Текстовое поле для ввода текстовой информации, позволяет пользователям вводить данные.

    <TextField name="test_field" value="Just a value" placeholder="Simple placebobr"/>

Текстовое поле с плавающей меткой

    <TextField name="the_field" placeholder="Put text here" floatingLabel="label"/>

Поле с подсказкой. Подсказка может использоватся как указание до ввода данных
для пользователя что вводить в поле ввода или же для показа ошибок валидации уже после ввода.

    <TextField
      name="the_field"
      value="Wrong value"
      status="danger"
      hint="You put wrong value idiot"
    />
