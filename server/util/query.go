package util

import "fmt"

type Query struct {
	baseQuery      string
	whereClauses   string
	args           []interface{}
	orderByClauses string
	err            error
}

// NewQuery creates a new Query object with a base query.
// The base query should be the SELECT, FROM, and JOIN clauses.
func NewQuery(query string) *Query {
	return &Query{baseQuery: query}
}

// Where adds a WHERE clause to the query.
func (q *Query) Where(predicate string, arg any) *Query {
	q.args = append(q.args, arg)

	if q.whereClauses == "" {
		q.whereClauses = fmt.Sprintf("WHERE %s = $1", predicate)
	} else {
		q.whereClauses += fmt.Sprintf("AND %s = $%d", predicate, len(q.args)+1)
	}
	return q
}

// OrderBy adds an ORDER BY clause to the query. Order is set by what columns where specified first.
func (q *Query) OrderBy(col string) *Query {
	if q.orderByClauses == "" {
		q.orderByClauses = "ORDER BY " + col
	} else {
		q.orderByClauses += ", " + col
	}

	return q
}

// Build returns a completed query with search parameter placeholders in place.
func (q *Query) Build() string {
	stmt := q.baseQuery
	if q.whereClauses != "" {
		stmt += "\n" + q.whereClauses
	}
	if q.orderByClauses != "" {
		stmt += "\n" + q.orderByClauses
	}

	return stmt + ";"
}

// GetArgs returns a list of arguments for the parameter placeholders.
func (q *Query) GetArgs() []interface{} {
	return q.args
}
