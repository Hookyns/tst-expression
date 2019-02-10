import {fieldIdFor} from "./field-id-for";

// Some module scope variable
const someGlobalVar = 10;

// Some module scope class
class Foo {
	// const
	public static Bar: string = "BAZ";
	
	// field
	public baz = {
		deepProp: "baz"
	};
}

function printThisExpression(expr: Expression<(m) => boolean> | any/* any or | ((m) => boolean) to be more strict; otherwise method-call will emit type mismatch error */) {
	console.log("Compiled expression:", expr.compiled.toString());
	console.log("Calling context:", expr.context);
}

((filter) => {
	let localVar = false;

	printThisExpression(m => m.foo >= someGlobalVar || !!localVar && Foo.Bar === "BAZ" && m.a == filter.a);
	
	console.log("------------------------------");
	
	console.log("Baz Id:", fieldIdFor<Foo>(m => m.baz.deepProp));
	console.log("Baz Id:", fieldIdFor<Foo>(m => m.baz));
	
})(/* filter */{ a: "foo" });