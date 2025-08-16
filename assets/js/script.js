// Constructor Paciente (ES5)
function Paciente(nombre, edad, rut, diagnostico) {
  var _nombre = nombre;
  var _edad = edad;
  var _rut = rut;
  var _diagnostico = diagnostico;

  this.getNombre = function() {
    return _nombre;
  };
  this.setNombre = function(nombre) {
    _nombre = nombre;
  };

  this.getEdad = function() {
    return _edad;
  };
  this.setEdad = function(edad) {
    _edad = edad;
  };

  this.getRut = function() {
    return _rut;
  };
  this.setRut = function(rut) {
    _rut = rut;
  };

  this.getDiagnostico = function() {
    return _diagnostico;
  };
  this.setDiagnostico = function(diagnostico) {
    _diagnostico = diagnostico;
  };
}

// Constructor Consultorio (ES5)
function Consultorio(nombre, pacientes) {
  var _nombre = nombre;
  var _pacientes = Object.prototype.toString.call(pacientes) === '[object Array]' ? pacientes : [];

  this.getNombre = function() {
    return _nombre;
  };
  this.setNombre = function(nombre) {
    _nombre = nombre;
  };

  this.getPacientes = function() {
    return _pacientes.slice(0);
  };
  this.setPacientes = function(pacientes) {
    _pacientes = pacientes;
  };
  this.agregarPaciente = function(paciente) {
    _pacientes.push(paciente);
  };
}

// Métodos en prototype para mostrar todos los pacientes
Consultorio.prototype.mostrarTodosLosPacientes = function() {
  var lista = this.getPacientes();
  var datos = [];
  
  // 1. PRIMERO recolectar todos los datos
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
  
  // 2. Usar la tabla existente en el HTML
  var tbody = document.getElementById('tablaPacientes');
  
  if (tbody) {
    // Limpiar solo el tbody
    tbody.innerHTML = '';
    
    // 3. Agregar filas de datos
    for (var j = 0; j < datos.length; j++) {
      var registro = datos[j];
      var fila = document.createElement('tr');
      fila.innerHTML = 
        '<td>' + registro.nombre + '</td>' +
        '<td>' + registro.edad + '</td>' +
        '<td>' + registro.rut + '</td>' +
        '<td>' + registro.diagnostico + '</td>';
      tbody.appendChild(fila);
    }
  }
  
  return datos;
};
 
// Instancias de ejemplo (uso de new) y demostración
var paciente1 = new Paciente('Juan Pérez', 30, '12.345.678-9', 'Gripe');
var paciente2 = new Paciente('María López', 25, '11.222.333-4', 'Alergia');
var paciente3 = new Paciente('Pedro Sánchez', 40, '9.888.777-6', 'Migraña');

var consultorio1 = new Consultorio('Consultorio Central', [paciente1, paciente2, paciente3]);

// Mostrar todos los pacientes
consultorio1.mostrarTodosLosPacientes();

// Configurar filtro cuando la página esté lista (ES5 estricto)
function configurarFiltro() {
    var filtroPacientes = document.getElementById("filtroPacientes");
    if (filtroPacientes) {
        filtroPacientes.addEventListener("input", function(e) {
            var valorFiltro = e.target.value.toLowerCase();
            
            if (valorFiltro === '') {
                // Si el filtro está vacío, restaurar todos los pacientes
                restaurarTodosLosPacientes();
            } else {
                // Aplicar filtro
                var pacientesFiltrados = consultorio1.getPacientes().filter(function(paciente) {
                    return paciente.getNombre().toLowerCase().indexOf(valorFiltro) !== -1;
                });
                mostrarPacientesFiltrados(pacientesFiltrados);
            }
        });
    } else {
        console.log('Elemento de filtro no encontrado. Asegúrate de tener un input con id="filtroPacientes"');
    }
}

// Esperar a que el DOM esté listo (ES5 estricto)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configurarFiltro);
} else {
    configurarFiltro();
}

// Función para mostrar pacientes filtrados
function mostrarPacientesFiltrados(pacientes) {
    // Usar específicamente la tabla con Bootstrap
    var tbody = document.getElementById('tablaPacientes');
    
    if (tbody) {
        // Limpiar solo el tbody
        tbody.innerHTML = '';
        
        // Agregar las filas filtradas
        for (var i = 0; i < pacientes.length; i++) {
            var p = pacientes[i];
            var fila = document.createElement('tr');
            fila.innerHTML = 
                '<td>' + p.getNombre() + '</td>' +
                '<td>' + p.getEdad() + '</td>' +
                '<td>' + p.getRut() + '</td>' +
                '<td>' + p.getDiagnostico() + '</td>';
            tbody.appendChild(fila);
        }
        
        // Si no hay resultados, mostrar mensaje
        if (pacientes.length === 0) {
            var filaVacia = document.createElement('tr');
            filaVacia.innerHTML = '<td colspan="4" class="text-center">No se encontraron pacientes</td>';
            tbody.appendChild(filaVacia);
        }
    }
}

// Función para restaurar todos los pacientes
function restaurarTodosLosPacientes() {
    var tbody = document.getElementById('tablaPacientes');
    
    if (tbody) {
        // Limpiar solo el tbody
        tbody.innerHTML = '';
        
        // Obtener todos los pacientes
        var todosLosPacientes = consultorio1.getPacientes();
        
        // Agregar todas las filas
        for (var i = 0; i < todosLosPacientes.length; i++) {
            var p = todosLosPacientes[i];
            var fila = document.createElement('tr');
            fila.innerHTML = 
                '<td>' + p.getNombre() + '</td>' +
                '<td>' + p.getEdad() + '</td>' +
                '<td>' + p.getRut() + '</td>' +
                '<td>' + p.getDiagnostico() + '</td>';
            tbody.appendChild(fila);
        }
    }
}