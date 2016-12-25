Example component:

	<span>
		<Example
			required="Best component ever"
		/>
	</span>

Использовать только в экстренных случаях.

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
				{id: 1, name: 'Piter'},
				{id: 4, name: 'Zek'},
			]}
			onCallback={(...atr) => {console.log(atr)}}
		/>
	</span>
