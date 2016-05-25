## 0.5.0
- now Group, Array and fields will receive validation state and message, thus creating more flexible components is possible.

## 0.4.2
- update readme and keywords on npm

## 0.4.1
- update readme on npm

## 0.4.0
- build full value using cleanValue method of each field to prevent dirty value after schema changing
- compute validation result before updating
- return an editable value in onSubmit and submit methods
- return validation summary and detail in onChange method of form
- support set form type by props.type

## 0.3.0
- support change schema

## 0.2.0
- support full value cache
- support validate against full form value, aka, change validate(value) to validate(value, formValue)
- support ignore value of a field in a group

## 0.1.0
first release
