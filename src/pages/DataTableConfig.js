import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-buttons/js/buttons.print.min";
import 'datatables.net-buttons/js/buttons.colVis.min.js';
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";
import "datatables.net-responsive-bs4";
import "datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css"
import JSZip from 'jszip';
window.JSZip = JSZip;

const initializeDataTable = (tableRef) => {
  return $(tableRef).DataTable({
    dom: 'Bfrltip',
    buttons: [
      { extend: 'copy', className: 'btn btn-info' },
      { extend: 'csv', className: 'btn btn-info' },
      { extend: 'excel', className: 'btn btn-info' },
      { extend: 'print', className: 'btn btn-info' }
    ],
    colReorder: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },
    responsive: true,
  });
};


export default initializeDataTable;
