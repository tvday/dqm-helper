package handlers

import (
	"fmt"
)

type InputError struct {
	missing []string
}

func NewInputError() *InputError {
	return &InputError{}
}

func (e *InputError) addMissingField(field string) {
	e.missing = append(e.missing, field)
}

func (e *InputError) isError() bool {
	return len(e.missing) > 0
}

func (e *InputError) Error() string {
	out := ""
	for field := range e.missing {
		out += fmt.Sprintf("Missing required field %v.\n", field)
	}
	return out
}
