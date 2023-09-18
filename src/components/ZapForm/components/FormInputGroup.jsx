import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { CaretDown } from 'react-bootstrap-icons'

export const FormInputGroup = ({
   value,
   onChange,
   onPick,
   id,
   placeholder,
   label,
   ...restProps
}) => {
   return (
      <>
         <h4>{label}</h4>
         <InputGroup className="mb-3">
            <Form.Control
               placeholder={placeholder}
               aria-label={placeholder}
               aria-describedby={id}
               value={value || ''}
               onChange={onChange}
               {...restProps}
            />
            <Button variant="outline-secondary" id={id} onClick={onPick}>
               <CaretDown /> Pick
            </Button>
         </InputGroup>
      </>
   )
}
