'use strict';

angular.module('smartschoolApp')
    .controller('ClasseDetailController', function ($scope, $rootScope, $stateParams,$state, entity, Classe, ClasseType, Inscription,Eleve,Ecole, EnseignantCours,EnseignantEcole,EleveClasse,AnneeScolaire,EleveInscriptions,EnseignantCoursClasse,CoursEcole,AnneeScolaireFromEcole,CoursAffectation,NoteCours,NoteCoursInit,NoteCoursBulletin,EmploiFromClasse,Emploi) {
        $scope.classe = entity;
        $scope.notes = [];
        $scope.colorEventValid = "#689F43";
        $scope.colorEventInvalid = "#03a9f4";
        $scope.notesExcel = [];
        $scope.moyenneBulletin = [];
        $scope.noteInit = [];
        $scope.noteInitId = [];
        $scope.selection=false;
        $scope.emplois = [];
        $scope.periode="1";
        $scope.orderby = "eleve.nom";
        $scope.inscriptionR = null;
        $scope.updateNotes=false;
        $scope.moyenne = 0;
        $scope.anneeScolaireCourante = AnneeScolaireFromEcole.get({idclasse:$stateParams.id});
        $scope.enseignants = EnseignantEcole.query({idclasse:$stateParams.id});
        $scope.mescours = CoursEcole.query({idclasse:$stateParams.id});
        $scope.coursAffectations = CoursAffectation.query({idclasse:$stateParams.id});
        $scope.anneescolaires = AnneeScolaire.query({size:5});
        $scope.inscriptions = EleveClasse.query({id:$stateParams.id});
        $scope.cours = EnseignantCoursClasse.query({id:$stateParams.id});

        $scope.listsize="col-md-12";
        $scope.formAjout=true;
        $scope.showModal = false;

        $scope.toggleModal = function(id){
                $scope.showModal = !$scope.showModal;
                $scope.deleteid = id;
        };

        $scope.update = function(){
            $scope.updateNotes = true;
        };

        $scope.rechercheOption = false;
        $scope.load = function (id) {
            Classe.get({id: id}, function(result) {
                $scope.classe = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:classeUpdate', function(event, result) {
            $scope.classe = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.changedetail = function(id,ideleve) {
            Inscription.get({id: id}, function(result) {
                  $scope.inscriptiondetail = result;
                  $scope.detailValue = true;
                  $scope.listsize = "col-md-8";
                  $scope.elevecursus(ideleve);
            });

        };



        var onSaveSuccess = function (result) {
                    $scope.$emit('smartschoolApp:enseignantCoursUpdate', result);
                    $scope.isSaving = false;
                    EnseignantCoursClasse.query({id:$stateParams.id},function(result){
                           $scope.cours = result;
                    });
                    CoursEcole.query({idclasse:$stateParams.id},function(result){
                                               $scope.mescours = result;
                    });
                    $scope.enseignantCours.enseignant = "";
                    $scope.enseignantCours.cours = "";
                    CoursAffectation.query({idclasse:$stateParams.id},function(result){
                           $scope.coursAffectations = result;
                    });
                };

        var onDeleteSuccess = function (){
                EnseignantCoursClasse.query({id:$stateParams.id},function(result){
                       $scope.cours = result;
                });
                CoursEcole.query({idclasse:$stateParams.id},function(result){
                       $scope.mescours = result;
                });
        };

        var onSaveError = function (result) {
             $scope.isSaving = false;
        };

        $scope.deleteAssociation = function(id){
               $scope.deleteid = id;
               $scope.formAjout = false;
        };

        $scope.confirmDelete = function(id){
                                EnseignantCours.delete({id:id},onDeleteSuccess,onSaveError);
                                $scope.showModal = !$scope.showModal;
        };


        $scope.save = function () {
                    $scope.isSaving = true;
                    $scope.enseignantCours.classe = $scope.classe;
                    EnseignantCours.save($scope.enseignantCours, onSaveSuccess, onSaveError);
        };

        $scope.redouble = function(inscription){
            Inscription.update(inscription);
        };

        $scope.loadList = function(){
            $scope.cours = EnseignantCoursClasse.query({id:$stateParams.id});
        };

        $scope.rechercheActivate = function(){
                    if($scope.rechercheOption == true)
                    {
                        $scope.rechercheOption = false;
                        $scope.inscriptionR = null;
                    }
                    else
                        $scope.rechercheOption = true;
                };

        $scope.elevecursus = function(id){
            Eleve.get({id:id}, function(result){
                $scope.currenteleve = result;
                $scope.cursus = EleveInscriptions.query({id:$scope.currenteleve.id});
            });
        };

        $scope.hideDetail = function() {
                                  $scope.detailValue = false;
                                  $scope.listsize = "col-md-12 sample-show-hide";
        };

        $scope.exportData = function () {
                         var blob = new Blob([document.getElementById('exportable').innerHTML], {
                             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
                         });
                         saveAs(blob, "Liste d'eleves.xls");
        };

        $scope.notesExport = function () {
                                 var blob = new Blob([document.getElementById('notesExcel').innerHTML], {
                                     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
                                 });
                                 saveAs(blob, "notes.xls");
                };

        $scope.exportDataPdf = function () {
                                 var blob = new Blob([document.getElementById('exportable').innerHTML], {
                                     type: "application/x-pdf"
                                 });
                                 saveAs(blob, "Liste d'eleves.pdf");
        };

        $scope.initNotes = function(inscription,cours,numPeriode,index){
            NoteCoursInit.get({idinscription:inscription.id,idcours:cours.id,periode:numPeriode}, function(result){
                    if(result.id == null){
                        result.inscription=inscription;
                        result.cours=cours;
                        result.periode=numPeriode;
                    }
                    $scope.notes[index] = result;
            }, function(response) {
                    if(response.status === 404) {
                          $scope.notes[index] = "";
                    }
            });
        };

        $scope.changePeriode = function(){
            $scope.notes= [];
             angular.forEach($scope.inscriptions, function (inscription,keyInscriptions) {
                angular.forEach($scope.coursAffectations, function (cours,keyCours) {
                    $scope.initNotes(inscription,cours,$scope.periode,(keyInscriptions*$scope.coursAffectations.length)+keyCours);
                    $scope.bulletinCalcul(inscription.id,keyInscriptions);
                });
             });

        };

        $scope.selectAll = function(){
            angular.forEach($scope.coursAffectations, function (cours,key) {
                       cours.show = $scope.selection;
            });
        };

        $scope.selectionLisnner = function(){
            var all = true;
            angular.forEach($scope.coursAffectations, function (cours,key) {
                     if(!cours.show){
                          $scope.selection=false;
                          all = false;
                     }
            });
            $scope.selection = all;
        };


        $scope.enregisterNotes = function () {
                   $scope.updateNotes = false;
                   angular.forEach($scope.notes, function (item) {
                        if (item.id != null) {
                            NoteCours.update(item);
                        } else {
                            NoteCours.save(item);
                        }
                   });
                   $scope.changePeriode();

        };

        $scope.moyenneCalcul = function(cours){
            var somme = 0;
            var i = 0;
            angular.forEach($scope.notes, function (item) {
                    if(item.cours.id == cours.id && item.note != null){
                        somme = somme + item.note;
                        i++;
                    }
            });
            return somme/i;
        };

        $scope.bulletinCalcul = function(id,index){
                    NoteCoursBulletin.get({idinscription:id,periode:$scope.periode},function(result){
                        $scope.moyenneBulletin[index] = result.note;
                    });
        };
        $scope.emploisEvents = [];
        $scope.getEventFromDB = function(){
            EmploiFromClasse.query({idclasse:$stateParams.id},function(result){
                        $scope.emplois = result;
                        angular.forEach($scope.emplois, function (item,key) {
                            var dowpush = [];
                            dowpush.push(item.dow);
                            var emploiEvent = {
                                id : item.id,
                                start : item.start,
                                end : item.end,
                                backgroundColor : item.backgroundColor,
                                dow : dowpush,
                                title : item.title,
                                enseignantCours : item.enseignantCours,
                                update : false
                            }
                            $scope.emploisEvents[key]=emploiEvent;
                        });
                        $(document).ready(function() {
                                                           		$('#calendar').fullCalendar({
                                                           		    lang: 'fr',
                                                           		    defaultView: 'agendaWeek',
                                                           			header: {
                                                           				left: '',
                                                           				center: '',
                                                           				right: '',
                                                           			},
                                                           			editable: true,
                                                           			columnFormat : "dddd",
                                                           			events: $scope.emploisEvents,
                                                           			minTime: "08:00:00",
                                                                    maxTime: "18:00:00",
                                                                    allDaySlot : false,
                                                                    height: 500,
                                                                    weekends : false,
                                                                    droppable: true,
                                                                    eventColor: $scope.colorEventValid,
                                                                    eventDragStop: function(event, jsEvent) {
                                                                                var trashEl = jQuery('#calendarTrash');
                                                                                var ofs = trashEl.offset();

                                                                                var x1 = ofs.left;
                                                                                var x2 = ofs.left + trashEl.outerWidth(true);
                                                                                var y1 = ofs.top;
                                                                                var y2 = ofs.top + trashEl.outerHeight(true);

                                                                                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                                                                                   jsEvent.pageY>= y1 && jsEvent.pageY <= y2) {
                                                                                   if(event.id != null){
                                                                                      Emploi.delete({id:event.id});/*$state.go('classe.deleteEmploi',{idEmploi:event.id}, null);*/
                                                                                      $('#calendar').fullCalendar('removeEvents', event.id);
                                                                                   }
                                                                                   else{
                                                                                      $('#calendar').fullCalendar('removeEvents', event.id);
                                                                                   }
                                                                                }
                                                                    }

                                                           		});
                                                           		$('.fc-toolbar').remove();
                        });
            });
        };
        $( "#calendarTrash .droppable" ).droppable({
            drop: function( event, ui ) {
                  var $item = ui.draggable;
                  $item.fadeOut(function() {
                  console.log(event.title);
                  $item.css( {"left":"", "top":"", "bottom":"", "right":"" }).fadeIn();
            });
            $item.appendTo( this );
            }
        });

        $scope.setEvent = function(){
         var eventdow = [];
         eventdow.push($scope.event.dow);
         var ex = {
                     id : null,
                     title: $scope.coursEvent.cours.intitule+'('+$scope.coursEvent.enseignant.nom+')',
                     start: $scope.event.start, // a start time (10am in this example)
                     end: $scope.event.end, // an end time (6pm in this example)
                     dow: eventdow, // Repeat monday and thursday
                     backgroundColor: $scope.colorEventInvalid,
                     enseignantCours : $scope.coursEvent,
                     update : true,
                  };
              $(document).ready(function() {
                $('#calendar').fullCalendar( 'renderEvent',ex);
              });
              $scope.coursEvent = null;
              $scope.event.start = "";
              $scope.event.end = "";
              $scope.event.dow = [];

        };
        $scope.sizeEmploi = "col-md-12";
        $scope.emploiAjout = false;

        $scope.modifierEmploi = function(){
              $scope.emploiAjout = true;
              $scope.sizeEmploi = "col-md-8";
        };
         $scope.saveEvents = function(){
            $(document).ready(function() {
                           var eventsAdd = $('#calendar').fullCalendar( 'clientEvents');
                           angular.forEach(eventsAdd, function (item,key) {
                                               item.backgroundColor = $scope.colorEventValid;
                                               console.log(item.start);
                                               var start = moment(item.start).format("HH:mm");
                                               var end = moment(item.end).format("HH:mm");
                                               var emploi = {
                                                     id : item.id,
                                                     title : item.title,
                                                     start : start,
                                                     end : end,
                                                     enseignantCours : item.enseignantCours,
                                                     backgroundColor : item.backgroundColor,
                                                     dow : item.dow[0],
                                               }
                                               if(item.update){
                                                    if(emploi.id == null){
                                                          var ok = Emploi.save(emploi);
                                                          item.id = ok.id;
                                                          item.update = false;
                                                    }
                                                    else{
                                                          Emploi.update(emploi);
                                                    }
                                               }
                           });
                           $('#calendar').fullCalendar('addEventSource', eventsAdd);

            });
            $scope.emploiAjout = false;
            $scope.sizeEmploi = "col-md-12 sample-show-hide";
         };
         $scope.annulerEvents = function(){
                           $(document).ready(function() {
                                    $('#calendar').fullCalendar( 'refetchEvents' );
                           });
                           $scope.emploiAjout = false;
                           $scope.sizeEmploi = "col-md-12 sample-show-hide";
         };
        $scope.getEventFromDB();






    });




    angular.module('smartschoolApp').directive('modal', function () {
        return {
          template: '<div class="modal fade">' +
              '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                    '<h4 class="modal-title">Confirmation de suppression</h4>' +
                  '</div>' +
                  '<div class="modal-body" ng-transclude></div>' +
                '</div>' +
              '</div>' +
            '</div>',
          restrict: 'E',
          transclude: true,
          replace:true,
          scope:true,
          link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
              if(value == true)
                $(element).modal('show');
              else
                $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = true;
              });
            });

            $(element).on('hidden.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = false;
              });
            });
          }
        };
      });



'use strict';

angular.module('smartschoolApp').controller('BulletinController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity','BulletinDetail','NoteCoursBulletinMin','NoteCoursBulletinMax',
        function($scope, $stateParams, $uibModalInstance, entity,BulletinDetail,NoteCoursBulletinMin,NoteCoursBulletinMax) {


    $scope.periode = entity.periode;
    $scope.minMax = [];
    $scope.notes = [];
    BulletinDetail.query({idinscription:entity.idinscription,periode:entity.periode},function(result){
        $scope.notes = result;
        angular.forEach($scope.notes, function (item) {
                                   if (item.note != null) {
                                           item.min = NoteCoursBulletinMin.get({idclasse:entity.idclasse,idcours:item.cours.id,periode:entity.periode,idanneescolaire:entity.idanneescolaire});
                                           item.max = NoteCoursBulletinMax.get({idclasse:entity.idclasse,idcours:item.cours.id,periode:entity.periode,idanneescolaire:entity.idanneescolaire});
                                   }
        });
    });

    $scope.clear = function() {
                $uibModalInstance.dismiss('cancel');
    };

    $scope.somme = function(){
        $scope.sommeNotes = 0;
        $scope.sommeCoefficient = 0;
        $scope.sommeNotesCoef = 0;
        $scope.moyenne = 0;
        angular.forEach($scope.notes, function (item) {
                   if (item.note != null) {
                           $scope.sommeNotes = $scope.sommeNotes + item.note;
                           $scope.sommeCoefficient = $scope.sommeCoefficient + item.cours.coefficient;
                           $scope.sommeNotesCoef = $scope.sommeNotesCoef+ (item.note*item.cours.coefficient);
                   }
        });
        $scope.moyenne = $scope.sommeNotesCoef/$scope.sommeCoefficient;
        return $scope.sommeNotes;
    };

    $scope.telecharger = function(){
        var doc = new jsPDF('1','px');

        // We'll make our own renderer to skip this editor
        var specialElementHandlers = {
        	'#editor': function(element, renderer){
        		return true;
        	}
        };
        // All units are in the set measurement for the document
        // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
        doc.addHTML($('#bulletin')[0], function (){
            doc.save('Bulletin.pdf');
        });
    };



}]);


angular.module('smartschoolApp').controller('MasseController',
        ['$scope', '$stateParams', '$uibModalInstance', 'entity','AnneeScolaire','ClasseEcole','ParseLinks','EleveClasse','Inscription','Masse','ClasseNiveauSupp','Classe',
            function($scope, $stateParams, $uibModalInstance, entity,AnneeScolaire,ClasseEcole,ParseLinks,EleveClasse,Inscription,Masse,ClasseNiveauSupp,Classe) {

        $scope.classes = [];
        $scope.inscriptions = [];
        $scope.newInscriptions = [];
        $scope.inscriptions = EleveClasse.query({id:entity.idclasse});
        Classe.get({id:entity.idclasse},function(result){
            $scope.classe = result;
            $scope.idniveau = result.classeType.niveau.id;
            var i = $scope.idniveau;
            i++;
            ClasseNiveauSupp.query({idclasse:i,idecole:entity.idecole}, function(result) {
                   $scope.classes = result;
            });
         });

        var i = entity.idanneescolaire;
        i++;
        $scope.anneeScolaireNext = AnneeScolaire.get({id:i});
        $scope.anneeScolaire = AnneeScolaire.get({id:entity.idanneescolaire});

            $scope.predicate = 'id';
            $scope.reverse = true;
            $scope.page = 1;


        $scope.notesExcel = [];


        $scope.clear = function() {
                    $uibModalInstance.dismiss('cancel');
        };

        $scope.basculer = function(classe){
            var message = Masse.go({idclasse:entity.idclasse,idclasseNext:classe.id,idanneescolaire:entity.idanneescolaire,idanneescolaireNext:$scope.anneeScolaireNext.id});
            $scope.clear();
        };

    }]);
    angular.module('smartschoolApp').controller('DeleteEmploiController',
        ['$scope', '$stateParams', '$uibModalInstance', 'entity','Emploi',
            function($scope, $stateParams, $uibModalInstance, entity,Emploi) {

        $scope.clear = function() {
                    $uibModalInstance.dismiss('cancel');
        };

        $scope.confirmDelete = function () {
                    Emploi.delete({id: entity.idEmploi},
                        function () {
                            $uibModalInstance.close(true);
                        });
        };

    }]);
