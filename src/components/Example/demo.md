Example component:

	<span>
		<Example
			required="Best component ever"
		/>
	</span>

Использовать только в экстренных случаях.

	<Example
		string="Best component zad"
		list="big"
		booliat={true}
		array={['zad', 'zad', 'zad']}
		required="Best component ever"
		node={<div>шляпа</div>}
		onCallback={(...atr) => {console.log(atr)}}
	/>
