package model

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Item string
	Status uint
}
