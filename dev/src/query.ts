import {ExpressionKind} from "js-expr-tree";

/**
 * Where expression builder
 */
class WhereExpression {
	private static operatorMap = {
		[ExpressionKind.BarBarToken]: "or",
		[ExpressionKind.AmpersandAmpersandToken]: "and",
		[ExpressionKind.EqualsEqualsEqualsToken]: "=",
		[ExpressionKind.EqualsEqualsToken]: "=",
		[ExpressionKind.ExclamationEqualsEqualsToken]: "!=",
		[ExpressionKind.ExclamationEqualsToken]: "!=",
		[ExpressionKind.GreaterThanEqualsToken]: ">=",
		[ExpressionKind.LessThanEqualsToken]: "<=",
		[ExpressionKind.GreaterThanToken]: ">",
		[ExpressionKind.LessThanToken]: "<",
	};
	
	private conditions = [];
	private args = [];
	
	public addExpression(expression: any) {
		if (expression.kind != ExpressionKind.ArrowFunction) {
			throw new Error("Expression must be arrow function");
		}

		if (expression.body.kind == ExpressionKind.Block) {
			throw new Error("Member expression must not have block body");
		}

		// Remove top level parenthesis if exists
		if (expression.body.kind == ExpressionKind.ParenthesizedExpression) {
			expression = expression.expression;
		}
		
		let groups = this.splitBinaryExpressions(expression.body);
		console.log(groups);
	}
	
	public getSql() {
		return ``;
	}

	/**
	 * Returns array of binary expressions
	 * @param expression
	 */
	private splitBinaryExpressions(expression: any)// : Array<BinaryExpression>
	{
		if (expression.kind == ExpressionKind.BinaryExpression) {
			
			return this.splitBinaryExpressions(expression.left)
				.concat(this.getOperator(expression.operatorToken), this.splitBinaryExpressions(expression.right));
		}
			
		return [expression];
	}

	/**
	 * Get operator text by token
	 * @param operatorToken
	 */
	private getOperator(operatorToken: any): string
	{
		return WhereExpression.operatorMap[operatorToken.kind];
	}
}

/**
 * Query class for building SQL -> Linq to SQL (like C# EntityFramework)
 */
class Query<TEntity>
{
	/**
	 * Name of entity/table
	 */
	private readonly entityName: string;

	/**
	 * Where expression builder
	 */
	private where: WhereExpression = new WhereExpression();
	
	/**
	 * Ctor
	 * @param entityName
	 */
	constructor(entityName: string)
	{
		this.entityName = entityName;
	}

	/**
	 * Add filter criteria to query
	 * @param filterExpression
	 */
	public filter(filterExpression: Expression<(entity: TEntity) => boolean>): Query<TEntity>
	{
		this.where.addExpression(filterExpression.expression);
		return this;
	}

	/**
	 * Returns SQL
	 */
	public getSql() {
		return `SELECT * FROM ${this.entityName} ${this.where.getSql()}`;
	}
}

/**********************************************************************
 *
 * USAGE
 *
 **********************************************************************/

/**
 * Some class aka DB entity
 */
class Human
{
	public firstName: string;
	public lastName: string;
	public age: number;
}

// Some filter object
const filter = {
	age: 18,
	nameStarts: "R"
};

let sql;
sql = new Query<Human>("Human")
	.filter(x => x.firstName.startsWith(filter.nameStarts) && x.lastName != "Zuckerberg" || x.age > filter.age && !!ExpressionKind.NullKeyword)
	.getSql();

console.log(sql);
