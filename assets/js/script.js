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
  
  // 2. LUEGO escribir la tabla completa
  document.writeln('<table class="table table-striped">');
  document.writeln('<thead class="table-dark">');
  document.writeln('<tr>');
  document.writeln('<th>Nombre</th>');
  document.writeln('<th>Edad</th>');
  document.writeln('<th>RUT</th>');
  document.writeln('<th>Diagnóstico</th>');
  document.writeln('</tr>');
  document.writeln('</thead>');
  document.writeln('<tbody>');
  
  // 3. AHORA iterar sobre datos que ya tiene contenido
  for (var j = 0; j < datos.length; j++) {
    var registro = datos[j];
    document.writeln('<tr>');
    document.writeln(
      '<td>' + registro.nombre + '</td>' +
      '<td>' + registro.edad + '</td>' +
      '<td>' + registro.rut + '</td>' +
      '<td>' + registro.diagnostico + '</td>'
    );
    document.writeln('</tr>');
  }
  
  // 4. CERRAR la tabla
  document.writeln('</tbody>');
  document.writeln('</table>');
  
  return datos;
};
 
// Instancias de ejemplo (uso de new) y demostración
var paciente1 = new Paciente('Juan Pérez', 30, '12.345.678-9', 'Gripe');
var paciente2 = new Paciente('María López', 25, '11.222.333-4', 'Alergia');
var paciente3 = new Paciente('Pedro Sánchez', 40, '9.888.777-6', 'Migraña');

var consultorio1 = new Consultorio('Consultorio Central', [paciente1, paciente2, paciente3]);

// Mostrar todos los pacientes
consultorio1.mostrarTodosLosPacientes();
