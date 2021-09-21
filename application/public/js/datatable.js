// Call the dataTables jQuery plugin

$(document).ready(function() {
  var searchHash = location.search.substr(1),
      searchString = searchHash.substr(searchHash.indexOf('search='))
                    .split('&')[0]
                    .split('=')[1];
  $('#dataTable').DataTable({
    "oSearch": { "sSearch": searchString },
  //   "language": {
  //     "sEmptyTable":   "Não foi encontrado nenhum registo",
  //     "sLoadingRecords": "A carregar...",
  //     "sProcessing":   "A processar...",
  //     "sLengthMenu":   "Mostrar _MENU_ registos",
  //     "sZeroRecords":  "Não foram encontrados resultados",
  //     "sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registos",
  //     "sInfoEmpty":    "Mostrando de 0 até 0 de 0 registos",
  //     "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
  //     "sInfoPostFix":  "",
  //     "sSearch":       "Procurar:",
  //     "sUrl":          "",
  //     "oPaginate": {
  //         "sFirst":    "Primeiro",
  //         "sPrevious": "Anterior",
  //         "sNext":     "Seguinte",
  //         "sLast":     "Último"
  //     },
  //     "oAria": {
  //         "sSortAscending":  ": Ordenar colunas de forma ascendente",
  //         "sSortDescending": ": Ordenar colunas de forma descendente"
  //     }
  // }
  });
});
