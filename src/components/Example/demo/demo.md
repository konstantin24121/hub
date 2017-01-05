
Example component:

    <span>
      <Example
        required="Best component ever"
      />
    </span>

Использовать только в экстренных случаях.

    const mockData = require('./mocks');
    <span>
      <Example
        string="Best component zad"
        list="big"
        booliat={true}
        array={['zad', 'zad', 'zad', 'zad', 'zad', 'zad', 'zad', 'zad', 'zad']}
        required="Best component ever"
        integer={5}
        node={<div>шляпа</div>}
        stringObjects={{1: 'zad', 2:'kazadov'}}
        arrayOfShapes={[
          { id: 1, name: 'Rashpil' },
          { id: 4, name: 'Raps' },
        ]}
        mockedShape={mockData.shape}
        onCallback={(...atr) => {console.log(atr)}}
      />
    </span>
