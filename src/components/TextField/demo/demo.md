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
      floatingLabel="label"
    />

Иногда поле может быть неактивно, для этого ему можно просто передать атрибут disabled, совсем как в HTML не правда ли

    <TextField
      name="the_field"
      placeholder="This field disable"
      floatingLabel="label"
      disabled={true}
      onFocus={() => {console.log('Focus mother fucker, can you do it?')}}
    />
