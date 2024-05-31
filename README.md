# Relative Date Element

## Descripción

`Relative Date Element` es un custom element que muestra el tiempo relativo desde una fecha dada. Este componente es capaz de mostrar la diferencia de tiempo tanto en el pasado como en el futuro y tiene soporte para múltiples idiomas.

## Características

- **Soporte multilenguaje**: Inglés, Español, Portugués, Alemán, Francés, Italiano y Ruso.
- **Actualización automática**: Opción de actualizar el valor periódicamente cada segundo.
- **Formato de tiempo relativo**: Muestra la diferencia en segundos, minutos, horas, días y semanas.

## Uso

### Instalación

Para usar `DateCustomElement`, solo necesitas incluir el código en tu proyecto y definir el elemento personalizado en tu HTML.

### Ejemplo básico

```html
<date-custom-element date="2023-05-30T12:00:00" lang="es"></date-custom-element>
````

## Atributos

### date
Define la fecha desde la cual calcular el tiempo relativo. Este atributo es obligatorio.

```html
<date-custom-element date="2023-05-30T12:00:00"></date-custom-element>
```

### loop
Si se incluye este atributo, el componente actualizará su valor cada segundo. Este atributo es opcional.

```html
<date-custom-element date="2023-05-30T12:00:00" loop></date-custom-element>
```

### lang

Define el idioma en el cual se mostrará el tiempo relativo. Si no se especifica, se usará el idioma del documento HTML (document.documentElement.lang). Este atributo es opcional.

Idiomas soportados:

- Inglés (en)
- Español (es)
- Portugués (pt)
- Alemán (de)
- Francés (fr)
- Italiano (it)
- Ruso (ru)

Ejemplo:

```html
<date-custom-element date="2023-05-30T12:00:00" lang="fr"></date-custom-element>
```

### Ejemplos de Uso

Ejemplo en Español
```html
<date-custom-element date="2023-05-30T12:00:00" lang="es"></date-custom-element>
```

Ejemplo con Actualización Automática
```html
<date-custom-element date="2023-05-30T12:00:00" loop></date-custom-element>
```

Ejemplo en Portugués
```html
<date-custom-element date="2023-05-30T12:00:00" lang="pt"></date-custom-element>
```






