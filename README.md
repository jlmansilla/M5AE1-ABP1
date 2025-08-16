# Consultorio Médico - Sistema de Gestión de Pacientes

## 📋 Descripción del Proyecto

Este proyecto implementa un sistema de gestión de consultorio médico en **JavaScript ES5 estricto**, que permite administrar pacientes con sus datos personales y mostrar la información en una interfaz web responsive con Bootstrap.

## 🎯 Objetivos de la Actividad

- Implementar constructores para `Paciente` y `Consultorio` en ES5
- Proteger datos mediante getters y setters
- Mostrar todos los pacientes en una tabla
- Implementar sistema de filtrado por nombre
- Mantener compatibilidad ES5 estricto
- Crear interfaz responsive con Bootstrap

## 🏗️ Arquitectura de la Solución

### 1. **Constructores ES5 (Orientación a Objetos)**

#### Constructor `Paciente`
```javascript
function Paciente(nombre, edad, rut, diagnostico) {
  var _nombre = nombre;
  var _edad = edad;
  var _rut = rut;
  var _diagnostico = diagnostico;

  // Getters y Setters para protección de datos
  this.getNombre = function() { return _nombre; };
  this.setNombre = function(nombre) { _nombre = nombre; };
  // ... más getters y setters
}
```

**Características:**
- ✅ **Encapsulación**: Variables privadas con `var`
- ✅ **Protección de datos**: Getters y setters para acceso controlado
- ✅ **ES5 estricto**: Solo `var` y funciones tradicionales

#### Constructor `Consultorio`
```javascript
function Consultorio(nombre, pacientes) {
  var _nombre = nombre;
  var _pacientes = Object.prototype.toString.call(pacientes) === '[object Array]' ? pacientes : [];

  // Métodos para gestión de pacientes
  this.getPacientes = function() { return _pacientes.slice(0); };
  this.agregarPaciente = function(paciente) { _pacientes.push(paciente); };
}
```

**Características:**
- ✅ **Validación de arrays**: Verifica que `pacientes` sea un array válido
- ✅ **Copia defensiva**: `slice(0)` para evitar modificaciones externas
- ✅ **Métodos de gestión**: Agregar y obtener pacientes

### 2. **Sistema de Visualización**

#### Método `mostrarTodosLosPacientes()`
```javascript
Consultorio.prototype.mostrarTodosLosPacientes = function() {
  var lista = this.getPacientes();
  var datos = [];
  
  // 1. Recolectar datos
  for (var i = 0; i < lista.length; i++) {
    var p = lista[i];
    var registro = {
      nombre: p.getNombre(),
      edad: p.getEdad(),
      rut: p.getRut(),
      diagnostico: p.getDiagnostico()
    };
    datos.push(registro);
  }
  
  // 2. Usar tabla existente en HTML
  var tbody = document.getElementById('tablaPacientes');
  // ... lógica de renderizado
}
```

**Características:**
- ✅ **Manipulación del DOM**: Usa `getElementById` en lugar de `document.writeln`
- ✅ **Preserva Bootstrap**: Mantiene las clases CSS existentes
- ✅ **Estructura limpia**: Solo modifica el `tbody`, preserva `thead`

### 3. **Sistema de Filtrado**

#### Configuración del Filtro
```javascript
function configurarFiltro() {
  var filtroPacientes = document.getElementById("filtroPacientes");
  if (filtroPacientes) {
    filtroPacientes.addEventListener("input", function(e) {
      var valorFiltro = e.target.value.toLowerCase();
      
      if (valorFiltro === '') {
        restaurarTodosLosPacientes();
      } else {
        var pacientesFiltrados = consultorio1.getPacientes().filter(function(paciente) {
          return paciente.getNombre().toLowerCase().indexOf(valorFiltro) !== -1;
        });
        mostrarPacientesFiltrados(pacientesFiltrados);
      }
    });
  }
}
```

**Características:**
- ✅ **Filtrado en tiempo real**: Se activa al escribir
- ✅ **Búsqueda insensible**: No distingue mayúsculas/minúsculas
- ✅ **Restauración automática**: Muestra todos cuando el filtro está vacío

#### Funciones de Filtrado
```javascript
function mostrarPacientesFiltrados(pacientes) {
  var tbody = document.getElementById('tablaPacientes');
  tbody.innerHTML = '';
  
  for (var i = 0; i < pacientes.length; i++) {
    var p = pacientes[i];
    var fila = document.createElement('tr');
    fila.innerHTML = '<td>' + p.getNombre() + '</td>' + /* ... más celdas */;
    tbody.appendChild(fila);
  }
  
  if (pacientes.length === 0) {
    var filaVacia = document.createElement('tr');
    filaVacia.innerHTML = '<td colspan="4" class="text-center">No se encontraron pacientes</td>';
    tbody.appendChild(filaVacia);
  }
}
```

## 🎨 Interfaz de Usuario

### **HTML Estructurado**
```html
<!-- Filtro de búsqueda -->
<div class="row mb-3">
  <div class="col-12">
    <input type="text" id="filtroPacientes" placeholder="Buscar paciente por nombre..." class="form-control">
  </div>
</div>

<!-- Tabla de pacientes -->
<div class="row">
  <div class="col-12">
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>RUT</th>
          <th>Diagnóstico</th>
        </tr>
      </thead>
      <tbody id="tablaPacientes">
        <!-- Los datos se cargan via JavaScript -->
      </tbody>
    </table>
  </div>
</div>
```

### **Bootstrap Responsive**
- ✅ **`table table-striped`**: Tabla con filas alternadas
- ✅ **`table-dark`**: Encabezado oscuro para contraste
- ✅ **`mb-3`**: Espaciado entre secciones
- ✅ **`col-12`**: Diseño responsive para todas las pantallas

## 🔧 Desafíos Técnicos y Soluciones

### **1. Compatibilidad ES5 Estricto**
**Problema**: Mantener compatibilidad con navegadores antiguos
**Solución**: 
- Solo `var` para declaraciones
- Solo funciones tradicionales
- Métodos DOM nativos ES5
- Sin arrow functions ni `const`/`let`

### **2. Preservación del DOM**
**Problema**: `document.writeln()` destruía el DOM y el filtro
**Solución**: 
- Cambiar a manipulación del DOM con `getElementById`
- Preservar estructura HTML existente
- Solo modificar el `tbody` necesario

### **3. Filtrado en Tiempo Real**
**Problema**: El filtro se ejecutaba antes de que el DOM estuviera listo
**Solución**: 
- Función `configurarFiltro()` separada
- Verificación del estado del DOM
- Espera a `DOMContentLoaded` si es necesario

### **4. Estructura HTML Limpia**
**Problema**: Divs duplicados y mal cerrados
**Solución**: 
- Eliminar divs superfluos
- IDs únicos para cada elemento
- Estructura semántica clara
- Comentarios explicativos

## 📁 Estructura del Proyecto

```
consultorio/
├── index.html              # Interfaz principal con Bootstrap
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos personalizados
│   └── js/
│       └── script.js      # Lógica ES5 del consultorio
└── README.md              # Este archivo
```

## 🚀 Instalación y Uso

### **Requisitos**
- Navegador web compatible con ES5
- Conexión a internet para Bootstrap CDN

### **Ejecución**
1. Abrir `index.html` en un navegador web
2. Los pacientes se cargan automáticamente
3. Usar el campo de filtro para buscar por nombre
4. Los resultados se muestran en tiempo real

## 🧪 Casos de Uso

### **Pacientes de Ejemplo**
```javascript
var paciente1 = new Paciente('Juan Pérez', 30, '12.345.678-9', 'Gripe');
var paciente2 = new Paciente('María López', 25, '11.222.333-4', 'Alergia');
var paciente3 = new Paciente('Pedro Sánchez', 40, '9.888.777-6', 'Migraña');

var consultorio1 = new Consultorio('Consultorio Central', [paciente1, paciente2, paciente3]);
```

### **Funcionalidades**
- ✅ **Crear pacientes** con datos personales
- ✅ **Mostrar todos** en tabla responsive
- ✅ **Filtrar por nombre** en tiempo real
- ✅ **Restaurar vista completa** automáticamente
- ✅ **Protección de datos** con getters/setters

## 🎓 Aprendizajes Clave

### **ES5 Estricto**
- Uso correcto de `var` y funciones tradicionales
- Encapsulación mediante closures
- Prototipos para métodos compartidos

### **Manipulación del DOM**
- `getElementById` vs `querySelector`
- Preservación de estructura HTML
- Modificación selectiva de elementos

### **Arquitectura de Software**
- Separación de responsabilidades
- Constructores y prototipos
- Manejo de eventos y callbacks

### **Bootstrap y Responsive Design**
- Clases CSS utilitarias
- Grid system responsive
- Componentes de tabla

## 🔮 Mejoras Futuras

- **Persistencia de datos** con localStorage
- **Validación de formularios** para nuevos pacientes
- **Ordenamiento** por columnas
- **Paginación** para grandes volúmenes
- **Exportación** a CSV/PDF
- **Autenticación** de usuarios

## 📝 Conclusión

Este proyecto demuestra la implementación exitosa de un sistema de gestión de consultorio médico usando **JavaScript ES5 estricto**, manteniendo compatibilidad con navegadores antiguos mientras proporciona una experiencia de usuario moderna y responsive.

La solución aborda todos los requisitos de la actividad:
- ✅ Constructores ES5 con getters/setters
- ✅ Protección de datos personales
- ✅ Visualización en tabla Bootstrap
- ✅ Sistema de filtrado funcional
- ✅ Código limpio y mantenible
- ✅ Compatibilidad ES5 estricto

El enfoque de manipulación del DOM en lugar de `document.writeln()` fue crucial para mantener la funcionalidad del filtro y preservar la estructura HTML con Bootstrap.
