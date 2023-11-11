import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const images =[
  { key: 'erythrinaBlakei', source: require('../../../assets/plantImages/erythrinaBlakei.jpg') },
  { key: 'plumeriaAlba', source: require('../../../assets/plantImages/plumeriaAlba.jpg') },
  { key: 'abies', source: require('../../../assets/plantImages/abies.jpg') },
  { key: 'acaciaAuriculiformis', source: require('../../../assets/plantImages/acaciaAuriculiformis.jpg') },
  { key: 'acaciaCatechu', source: require('../../../assets/plantImages/acaciaCatechu.jpg') },
  { key: 'acaciaFarnesiana', source: require('../../../assets/plantImages/acaciaFarnesiana.jpg') },
  { key: 'acaciaLeucophloea', source: require('../../../assets/plantImages/acaciaLeucophloea.jpg') },
  { key: 'acaciaNilotica', source: require('../../../assets/plantImages/acaciaNilotica.jpg') },
  { key: 'acaciaSenegal', source: require('../../../assets/plantImages/acaciaSenegal.jpg') },
  { key: 'acaciaTortilis', source: require('../../../assets/plantImages/acaciaTortilis.jpg') },
  { key: 'acerLaevigatum', source: require('../../../assets/plantImages/acerLaevigatum.jpg') },
  { key: 'acerNegundo', source: require('../../../assets/plantImages/acerNegundo.jpg') },
  { key: 'acerOblongum', source: require('../../../assets/plantImages/acerOblongum.jpg') },
  { key: 'acerPectinatum', source: require('../../../assets/plantImages/acerPectinatum.jpg') },
  { key: 'acerSikkimense', source: require('../../../assets/plantImages/acerSikkimense.jpg') },
  { key: 'acrocarpusFraxinifolius', source: require('../../../assets/plantImages/acrocarpusFraxinifolius.jpg') },
  { key: 'acronychiaPedunculata', source: require('../../../assets/plantImages/acronychiaPedunculata.jpg') },
  { key: 'adansoniaDigitata', source: require('../../../assets/plantImages/adansoniaDigitata.jpg') },
  { key: 'adenantheraPavonina', source: require('../../../assets/plantImages/adenantheraPavonina.jpg') },
  { key: 'adinaCordifolia', source: require('../../../assets/plantImages/adinaCordifolia.jpg') },
  { key: 'aegleMarmelos', source: require('../../../assets/plantImages/aegleMarmelos.jpg') },
  { key: 'aesculusIndica', source: require('../../../assets/plantImages/aesculusIndica.jpg') },
  { key: 'ailanthusExcelsa', source: require('../../../assets/plantImages/ailanthusExcelsa.jpg') },
  { key: 'albiziaLebbeck', source: require('../../../assets/plantImages/albiziaLebbeck.jpg') },
  { key: 'albiziaProcera', source: require('../../../assets/plantImages/albiziaProcera.jpg') },
  { key: 'alnusNepalensis', source: require('../../../assets/plantImages/alnusNepalensis.jpg') },
  { key: 'alstoniaScholarisRBr', source: require('../../../assets/plantImages/alstoniaScholarisRBr.jpg') },
  { key: 'amherstiaNobilis', source: require('../../../assets/plantImages/amherstiaNobilis.jpg') },
  { key: 'ampelopsisGlandulosa', source: require('../../../assets/plantImages/ampelopsisGlandulosa.jpg') },
  { key: 'anacardiumOccidentale', source: require('../../../assets/plantImages/anacardiumOccidentale.jpg') },
  { key: 'annonaSquamosa', source: require('../../../assets/plantImages/annonaSquamosa.jpg') },
  { key: 'anogeissusLatifolia', source: require('../../../assets/plantImages/anogeissusLatifolia.jpg') },
  { key: 'anogeissusPendula', source: require('../../../assets/plantImages/anogeissusPendula.jpg') },
  { key: 'anthocephalusCadamba', source: require('../../../assets/plantImages/anthocephalusCadamba.jpg') },
  { key: 'aquilariaKhasiana', source: require('../../../assets/plantImages/aquilariaKhasiana.jpg') },
  { key: 'arecaLutescens', source: require('../../../assets/plantImages/arecaLutescens.jpg') },
  { key: 'arecaCatechu', source: require('../../../assets/plantImages/arecaCatechu.jpg') },
  { key: 'artabotrysOdoratissimus', source: require('../../../assets/plantImages/artabotrysOdoratissimus.jpg') },
  { key: 'artocarpusHeterophyllus', source: require('../../../assets/plantImages/artocarpusHeterophyllus.jpg') },
  { key: 'azadirachtaIndica', source: require('../../../assets/plantImages/azadirachtaIndica.jpg') },
  { key: 'bambooSps', source: require('../../../assets/plantImages/bambooSps.jpg') },
  { key: 'bauhiniaAcuminata', source: require('../../../assets/plantImages/bauhiniaAcuminata.jpg') },
  { key: 'bauhiniaAlba', source: require('../../../assets/plantImages/bauhiniaAlba.jpg') },
  { key: 'bauhiniaCorymbosa', source: require('../../../assets/plantImages/bauhiniaCorymbosa.jpg') },
  { key: 'bauhiniaPurpurea', source: require('../../../assets/plantImages/bauhiniaPurpurea.jpg') },
  { key: 'bauhiniaTomentosa', source: require('../../../assets/plantImages/bauhiniaTomentosa.jpg') },
  { key: 'bauhiniaTriandra', source: require('../../../assets/plantImages/bauhiniaTriandra.jpg') },
  { key: 'bauhiniaVariegata', source: require('../../../assets/plantImages/bauhiniaVariegata.jpg') },
  { key: 'bentinckiaNicobarica', source: require('../../../assets/plantImages/bentinckiaNicobarica.jpg') },
  { key: 'bombaxMalabaricum', source: require('../../../assets/plantImages/bombaxMalabaricum.jpg') },
  { key: 'borassusFlabellifer', source: require('../../../assets/plantImages/borassusFlabellifer.jpg') },
  { key: 'boswelliaSerrata', source: require('../../../assets/plantImages/boswelliaSerrata.jpg') },
  { key: 'broussonetiaPapyrifera', source: require('../../../assets/plantImages/broussonetiaPapyrifera.jpg') },
  { key: 'browneaCoccinia', source: require('../../../assets/plantImages/browneaCoccinia.jpg') },
  { key: 'browneaAriza', source: require('../../../assets/plantImages/browneaAriza.jpg') },
  { key: 'browneaGrandiceps', source: require('../../../assets/plantImages/browneaGrandiceps.jpg') },
  { key: 'buchananiaLanzan', source: require('../../../assets/plantImages/buchananiaLanzan.jpg') },
  { key: 'buddlejaAsiatica', source: require('../../../assets/plantImages/buddlejaAsiatica.jpg') },
  { key: 'buteaFrondosa', source: require('../../../assets/plantImages/buteaFrondosa.jpg') },
  { key: 'buteaMonosperma', source: require('../../../assets/plantImages/buteaMonosperma.jpg') },
  { key: 'callistemonLanceolatus', source: require('../../../assets/plantImages/callistemonLanceolatus.jpg') },
  { key: 'callophyllumPolyanthum', source: require('../../../assets/plantImages/callophyllumPolyanthum.jpg') },
  { key: 'calophyllumInophyllum', source: require('../../../assets/plantImages/calophyllumInophyllum.jpg') },
  { key: 'capparisAphylla', source: require('../../../assets/plantImages/capparisAphylla.jpg') },
  { key: 'capparisDivaricata', source: require('../../../assets/plantImages/capparisDivaricata.jpg') },
  { key: 'capparisSpinosa', source: require('../../../assets/plantImages/capparisSpinosa.jpg') },
  { key: 'caryotaUrens', source: require('../../../assets/plantImages/caryotaUrens.jpg') },
  { key: 'cassiaFistula', source: require('../../../assets/plantImages/cassiaFistula.jpg') },
  { key: 'cassiaJavanica', source: require('../../../assets/plantImages/cassiaJavanica.jpg') },
  { key: 'cassiaRenigera', source: require('../../../assets/plantImages/cassiaRenigera.jpg') },
  { key: 'cassiaSiamea', source: require('../../../assets/plantImages/cassiaSiamea.jpg') },
  { key: 'casuarinaEquisitifolia', source: require('../../../assets/plantImages/casuarinaEquisitifolia.jpg') },
  { key: 'cedrelaToona', source: require('../../../assets/plantImages/cedrelaToona.jpg') },
  { key: 'cedrusDeodara', source: require('../../../assets/plantImages/cedrusDeodara.jpg') },
  { key: 'celosiaArgentea', source: require('../../../assets/plantImages/celosiaArgentea.jpg') },
  { key: 'cestrumNocturnum', source: require('../../../assets/plantImages/cestrumNocturnum.jpg') },
  { key: 'chloroxylonSwietenia', source: require('../../../assets/plantImages/chloroxylonSwietenia.jpg') },
  { key: 'chorisiaSpeciosa', source: require('../../../assets/plantImages/chorisiaSpeciosa.jpg') },
  { key: 'citrusAurantium', source: require('../../../assets/plantImages/citrusAurantium.jpg') },
  { key: 'clematisBuchananiana', source: require('../../../assets/plantImages/clematisBuchananiana.jpg') },
  { key: 'cocculusLaurifolius', source: require('../../../assets/plantImages/cocculusLaurifolius.jpg') },
  { key: 'cochlospermumGossypium', source: require('../../../assets/plantImages/cochlospermumGossypium.jpg') },
  { key: 'cocosNucifera', source: require('../../../assets/plantImages/cocosNucifera.jpg') },
  { key: 'cordiaMonica', source: require('../../../assets/plantImages/cordiaMonica.jpg') },
  { key: 'cordiaSebestena', source: require('../../../assets/plantImages/cordiaSebestena.jpeg') },
  { key: 'crataevaReligiosa', source: require('../../../assets/plantImages/crataevaReligiosa.jpg') },
  { key: 'cupressusTorulosa', source: require('../../../assets/plantImages/cupressusTorulosa.jpg') },
  { key: 'cycasCircinalis', source: require('../../../assets/plantImages/cycasCircinalis.jpg') },
  { key: 'cycasIndica', source: require('../../../assets/plantImages/cycasIndica.jpg') },
  { key: 'cycasNathorstii', source: require('../../../assets/plantImages/cycasNathorstii.jpg') },
  { key: 'cycasPectinata', source: require('../../../assets/plantImages/cycasPectinata.jpg') },
  { key: 'cycasSpherica', source: require('../../../assets/plantImages/cycasSpherica.jpg') },
  { key: 'cycasSwamyi', source: require('../../../assets/plantImages/cycasSwamyi.jpg') },
  { key: 'cycusRumphii', source: require('../../../assets/plantImages/cycusRumphii.jpg') },
  { key: 'dalbergiaSisso', source: require('../../../assets/plantImages/dalbergiaSisso.jpg') },
  { key: 'delonixRegia', source: require('../../../assets/plantImages/delonixRegia.jpg') },
  { key: 'dichrostachysCinerea', source: require('../../../assets/plantImages/dichrostachysCinerea.jpg') },
  { key: 'dilleniaAurea', source: require('../../../assets/plantImages/dilleniaAurea.jpg') },
  { key: 'dilleniaBracteata', source: require('../../../assets/plantImages/dilleniaBracteata.jpg') },
  { key: 'dilleniaIndica', source: require('../../../assets/plantImages/dilleniaIndica.jpg') },
  { key: 'dilleniaPentagyna', source: require('../../../assets/plantImages/dilleniaPentagyna.jpg') },
  { key: 'dilleniaScabrella', source: require('../../../assets/plantImages/dilleniaScabrella.jpeg') },
  { key: 'diospyrosEmbryopteris', source: require('../../../assets/plantImages/diospyrosEmbryopteris.jpeg') },
  { key: 'diospyrosMontana', source: require('../../../assets/plantImages/diospyrosMontana.jpg') },
  { key: 'dipterocarpusTurbinatus', source: require('../../../assets/plantImages/dipterocarpusTurbinatus.jpeg') },
  { key: 'elaeocarpusAcuminatus', source: require('../../../assets/plantImages/elaeocarpusAcuminatus.jpeg') },
  { key: 'elaeocarpusLanceifolius', source: require('../../../assets/plantImages/elaeocarpusLanceifolius.jpeg') },
  { key: 'elaeocarpusSphaericus', source: require('../../../assets/plantImages/elaeocarpusSphaericus.jpeg') },
  { key: 'elaeocarpusTectorius', source: require('../../../assets/plantImages/elaeocarpusTectorius.jpeg') },
  { key: 'emblicaOfficinalis', source: require('../../../assets/plantImages/emblicaOfficinalis.jpeg') },
  { key: 'enterolobiumSaman', source: require('../../../assets/plantImages/enterolobiumSaman.jpg') },
  { key: 'erythrinaArborescens', source: require('../../../assets/plantImages/erythrinaArborescens.jpeg') },
  { key: 'erythrinaBlakei', source: require('../../../assets/plantImages/erythrinaBlakei.jpg') },
  { key: 'erythrinaCristaGalli', source: require('../../../assets/plantImages/erythrinaCristaGalli.jpg') },
  { key: 'erythrinaIndica', source: require('../../../assets/plantImages/erythrinaIndica.jpg') },
  { key: 'erythrinaStricta', source: require('../../../assets/plantImages/erythrinaStricta.jpeg') },
  { key: 'eucalyptusCitriodora', source: require('../../../assets/plantImages/eucalyptusCitriodora.jpeg') },
  { key: 'eugeniaCuspidata', source: require('../../../assets/plantImages/eugeniaCuspidata.jpg') },
  { key: 'euphorbiaCaducifolia', source: require('../../../assets/plantImages/euphorbiaCaducifolia.jpeg') },
  { key: 'euphorbiaCattimandoo', source: require('../../../assets/plantImages/euphorbiaCattimandoo.jpeg') },
  { key: 'euphorbiaNivulia', source: require('../../../assets/plantImages/euphorbiaNivulia.jpg') },
  { key: 'euphorbiaRoyleana', source: require('../../../assets/plantImages/euphorbiaRoyleana.jpeg') },
  { key: 'evodiaFraxinifolia', source: require('../../../assets/plantImages/evodiaFraxinifolia.jpeg') },
  { key: 'fagaraBudrunga', source: require('../../../assets/plantImages/fagaraBudrunga.jpeg') },
  { key: 'ficusBengalensis', source: require('../../../assets/plantImages/ficusBengalensis.jpg') },
  { key: 'ficusInfectoria', source: require('../../../assets/plantImages/ficusInfectoria.jpeg') },
  { key: 'ficusReligiosa', source: require('../../../assets/plantImages/ficusReligiosa.jpeg') },
  { key: 'ficusRetusa', source: require('../../../assets/plantImages/ficusRetusa.jpeg') },
  { key: 'ficusVirens', source: require('../../../assets/plantImages/ficusVirens.jpeg') },
  { key: 'garciniaCowa', source: require('../../../assets/plantImages/garciniaCowa.jpg') },
  { key: 'garciniaKydia', source: require('../../../assets/plantImages/garciniaKydia.jpeg') },
  { key: 'garciniaMorella', source: require('../../../assets/plantImages/garciniaMorella.jpg') },
  { key: 'garciniaXanthochymus', source: require('../../../assets/plantImages/garciniaXanthochymus.jpg') },
  { key: 'gardeniaFlorida', source: require('../../../assets/plantImages/gardeniaFlorida.jpg') },
  { key: 'gardeniaLatifolia', source: require('../../../assets/plantImages/gardeniaLatifolia.jpeg') },
  { key: 'gardeniaResinifera', source: require('../../../assets/plantImages/gardeniaResinifera.jpg') },
  { key: 'gliricidiaMaculata', source: require('../../../assets/plantImages/gliricidiaMaculata.jpg') },
  { key: 'goniothalamusSesquipedalis', source: require('../../../assets/plantImages/goniothalamusSesquipedalis.jpeg') },
  { key: 'grevilleaRobusta', source: require('../../../assets/plantImages/grevilleaRobusta.jpg') },
  { key: 'grewiaDisperma', source: require('../../../assets/plantImages/grewiaDisperma.jpeg') },
  { key: 'grewiaMicrocos', source: require('../../../assets/plantImages/grewiaMicrocos.jpg') },
  { key: 'grewiaSubinaequalis', source: require('../../../assets/plantImages/grewiaSubinaequalis.jpeg') },
  { key: 'grewiaTiliifolia', source: require('../../../assets/plantImages/grewiaTiliifolia.jpg') },
  { key: 'guaiacumOfficinale', source: require('../../../assets/plantImages/guaiacumOfficinale.jpeg') },
  { key: 'harpulliaEupanioides', source: require('../../../assets/plantImages/harpulliaEupanioides.jpg') },
  { key: 'hibiscusCollinus', source: require('../../../assets/plantImages/hibiscusCollinus.jpg') },
  { key: 'hiptageMadablota', source: require('../../../assets/plantImages/hiptageMadablota.jpeg') },
  { key: 'holopteliaIntegrifolia', source: require('../../../assets/plantImages/holopteliaIntegrifolia.jpeg') },
  { key: 'ixoraParviflora', source: require('../../../assets/plantImages/ixoraParviflora.jpg') },
  { key: 'jacarandaMimosaefolia', source: require('../../../assets/plantImages/jacarandaMimosaefolia.jpg') },
  { key: 'kydiaCalycina', source: require('../../../assets/plantImages/kydiaCalycina.jpg') },
  { key: 'lagerstroemiaFlosreginae', source: require('../../../assets/plantImages/lagerstroemiaFlosreginae.jpg') },
  { key: 'lagerstroemiaThorellii', source: require('../../../assets/plantImages/lagerstroemiaThorellii.jpg') },
  { key: 'lawsoniaAlba', source: require('../../../assets/plantImages/lawsoniaAlba.jpeg') },
  { key: 'leucaenaLeucocephala', source: require('../../../assets/plantImages/leucaenaLeucocephala.jpg') },
  { key: 'madhucaIndica', source: require('../../../assets/plantImages/madhucaIndica.jpg') },
  { key: 'maeruaArenaria', source: require('../../../assets/plantImages/maeruaArenaria.jpg') },
  { key: 'magnoliaCampbellii', source: require('../../../assets/plantImages/magnoliaCampbellii.jpg') },
  { key: 'magnoliaGrandiflora', source: require('../../../assets/plantImages/magnoliaGrandiflora.jpeg') },
  { key: 'magnoliaPterocarpa', source: require('../../../assets/plantImages/magnoliaPterocarpa.jpeg') },
  { key: 'mangiferaIndica', source: require('../../../assets/plantImages/mangiferaIndica.jpg') },
  { key: 'meliaAzedarach', source: require('../../../assets/plantImages/meliaAzedarach.jpg') },
  { key: 'melodorumBicolor', source: require('../../../assets/plantImages/melodorumBicolor.jpg') },
  { key: 'mesuaFerrea', source: require('../../../assets/plantImages/mesuaFerrea.jpg') },
  { key: 'micheliaChampaca', source: require('../../../assets/plantImages/micheliaChampaca.jpeg') },
  { key: 'micheliaMontana', source: require('../../../assets/plantImages/micheliaMontana.jpeg') },
  { key: 'miliusaMacrocarpa', source: require('../../../assets/plantImages/miliusaMacrocarpa.jpg') },
  { key: 'milletiaOvalifolia', source: require('../../../assets/plantImages/milletiaOvalifolia.jpg') },
  { key: 'millingtoniaHortensis', source: require('../../../assets/plantImages/millingtoniaHortensis.jpg') },
  { key: 'mimusopsElengi', source: require('../../../assets/plantImages/mimusopsElengi.jpg') },
  { key: 'morindaTinctoria', source: require('../../../assets/plantImages/morindaTinctoria.jpeg') },
  { key: 'moringaOleifera', source: require('../../../assets/plantImages/moringaOleifera.jpg') },
  { key: 'moringaPterygosperma', source: require('../../../assets/plantImages/moringaPterygosperma.jpeg') },
  { key: 'morusAlba', source: require('../../../assets/plantImages/morusAlba.jpg') },
  { key: 'murrayaExotica', source: require('../../../assets/plantImages/murrayaExotica.jpg') },
  { key: 'mussaendaFrondosa', source: require('../../../assets/plantImages/mussaendaFrondosa.jpg') },
  { key: 'mussaendaGlabrata', source: require('../../../assets/plantImages/mussaendaGlabrata.jpg') },
  { key: 'nepenthesKhasiana', source: require('../../../assets/plantImages/nepenthesKhasiana.jpg') },
  { key: 'nyctanthesArbortristis', source: require('../../../assets/plantImages/nyctanthesArbortristis.jpeg') },
  { key: 'ochnaHeyneana', source: require('../../../assets/plantImages/ochnaHeyneana.jpg') },
  { key: 'ochnaObtusa', source: require('../../../assets/plantImages/ochnaObtusa.jpeg') },
  { key: 'paphiopedilumCharlesworthii', source: require('../../../assets/plantImages/paphiopedilumCharlesworthii.jpeg') },
  { key: 'paphiopedilumDruryi', source: require('../../../assets/plantImages/paphiopedilumDruryi.jpg') },
  { key: 'peltophorumFerrugineum', source: require('../../../assets/plantImages/peltophorumFerrugineum.jpg') },
  { key: 'peltophorumInerme', source: require('../../../assets/plantImages/peltophorumInerme.jpg') },
  { key: 'picea', source: require('../../../assets/plantImages/picea.jpg') },
  { key: 'pinusSpp', source: require('../../../assets/plantImages/pinusSpp.jpeg') },
  { key: 'pithecolobiumDulce', source: require('../../../assets/plantImages/pithecolobiumDulce.jpg') },
  { key: 'plumeriaAcutifolia', source: require('../../../assets/plantImages/plumeriaAcutifolia.jpeg') },
  { key: 'plumeriaAlba', source: require('../../../assets/plantImages/plumeriaAlba.jpg') },
  { key: 'plumeriaRubra', source: require('../../../assets/plantImages/plumeriaRubra.jpg') },
  { key: 'poincianaElata', source: require('../../../assets/plantImages/poincianaElata.jpg') },
  { key: 'poincianaRegia', source: require('../../../assets/plantImages/poincianaRegia.jpg') },
  { key: 'polyalthiaCerasioides', source: require('../../../assets/plantImages/polyalthiaCerasioides.jpeg') },
  { key: 'polyalthiaFragrans', source: require('../../../assets/plantImages/polyalthiaFragrans.jpeg') },
  { key: 'polyalthiaKorinti', source: require('../../../assets/plantImages/polyalthiaKorinti.jpg') },
  { key: 'polyalthiaLongifolia', source: require('../../../assets/plantImages/polyalthiaLongifolia.jpg') },
  { key: 'polyalthiaSimiarum', source: require('../../../assets/plantImages/polyalthiaSimiarum.jpeg') },
  { key: 'polyalthiaSuberosa', source: require('../../../assets/plantImages/polyalthiaSuberosa.jpeg') },
  { key: 'pongamiaGlabra', source: require('../../../assets/plantImages/pongamiaGlabra.jpg') },
  { key: 'pongamiaPinnata', source: require('../../../assets/plantImages/pongamiaPinnata.jpg') },
  { key: 'populusCiliata', source: require('../../../assets/plantImages/populusCiliata.jpeg') },
  { key: 'prosopisCineraria', source: require('../../../assets/plantImages/prosopisCineraria.jpg') },
  { key: 'pterocarpusIndicus', source: require('../../../assets/plantImages/pterocarpusIndicus.jpg') },
  { key: 'pterocarpusSantalinus', source: require('../../../assets/plantImages/pterocarpusSantalinus.jpeg') },
  { key: 'putranjivaRoxburghii', source: require('../../../assets/plantImages/putranjivaRoxburghii.jpg') },
  { key: 'renantheraImschootiana', source: require('../../../assets/plantImages/renantheraImschootiana.jpg') },
  { key: 'rhododendron', source: require('../../../assets/plantImages/rhododendron.jpg') },
  { key: 'salixSpp', source: require('../../../assets/plantImages/salixSpp.jpg') },
  { key: 'salvadoraPersica', source: require('../../../assets/plantImages/salvadoraPersica.jpg') },
  { key: 'santalumAlbum', source: require('../../../assets/plantImages/santalumAlbum.jpg') },
  { key: 'sapindusEmarginatus', source: require('../../../assets/plantImages/sapindusEmarginatus.jpg') },
  { key: 'sapiumSebiferum', source: require('../../../assets/plantImages/sapiumSebiferum.jpg') },
  { key: 'saracaAsoca', source: require('../../../assets/plantImages/saracaAsoca.jpg') },
  { key: 'saracaIndica', source: require('../../../assets/plantImages/saracaIndica.jpg') },
  { key: 'sauraujaNepaulensis', source: require('../../../assets/plantImages/sauraujaNepaulensis.jpeg') },
  { key: 'sauraujaPunduana', source: require('../../../assets/plantImages/sauraujaPunduana.jpg') },
  { key: 'saussureaCostus', source: require('../../../assets/plantImages/saussureaCostus.jpg') },
  { key: 'schizandraGrandiflora', source: require('../../../assets/plantImages/schizandraGrandiflora.jpeg') },
  { key: 'schleicheraOleosa', source: require('../../../assets/plantImages/schleicheraOleosa.jpg') },
  //{ key: 'schleicheraTrijuga', source: require('../../../assets/plantImages/schleicheraTrijuga.jpg') },
  { key: 'sesbaniaGrandiflora', source: require('../../../assets/plantImages/sesbaniaGrandiflora.jpg') },
  { key: 'shoreaTalura', source: require('../../../assets/plantImages/shoreaTalura.jpg') },
  { key: 'sinopodophyllumHexandrum', source: require('../../../assets/plantImages/sinopodophyllumHexandrum.jpg') },
  { key: 'soymidaFebrifuga', source: require('../../../assets/plantImages/soymidaFebrifuga.jpeg') },
  { key: 'spathodeaCampanulata', source: require('../../../assets/plantImages/spathodeaCampanulata.jpg') },
  { key: 'sterculiaColorata', source: require('../../../assets/plantImages/sterculiaColorata.jpeg') },
  { key: 'sterculiaFoetida', source: require('../../../assets/plantImages/sterculiaFoetida.jpg') },
  { key: 'sterculiaUrens', source: require('../../../assets/plantImages/sterculiaUrens.jpeg') },
  { key: 'sterculiaVillosa', source: require('../../../assets/plantImages/sterculiaVillosa.jpeg') },
  { key: 'syzygiumCumini', source: require('../../../assets/plantImages/syzygiumCumini.jpeg') },
  { key: 'tabernaemontanaCoronaria', source: require('../../../assets/plantImages/tabernaemontanaCoronaria.jpeg') },
  { key: 'tamarindusIndica', source: require('../../../assets/plantImages/tamarindusIndica.jpg') },
  { key: 'tecomellaUndulata', source: require('../../../assets/plantImages/tecomellaUndulata.jpg') },
  { key: 'tectonaGrandis', source: require('../../../assets/plantImages/tectonaGrandis.jpg') },
  { key: 'terminaliaArjuna', source: require('../../../assets/plantImages/terminaliaArjuna.jpg') },
  { key: 'terminaliaCatappa', source: require('../../../assets/plantImages/terminaliaCatappa.jpeg') },
  { key: 'terminaliaTomentosa', source: require('../../../assets/plantImages/terminaliaTomentosa.jpg') },
  { key: 'ternstroemiaGymnanthera', source: require('../../../assets/plantImages/ternstroemiaGymnanthera.jpg') },
  { key: 'thespesiaPopulnea', source: require('../../../assets/plantImages/thespesiaPopulnea.jpeg') },
  { key: 'thevetiaNeriifolia', source: require('../../../assets/plantImages/thevetiaNeriifolia.jpeg') },
  { key: 'toonaCiliata', source: require('../../../assets/plantImages/toonaCiliata.jpeg') },
  { key: 'tremaPolitoria', source: require('../../../assets/plantImages/tremaPolitoria.jpg') },
  { key: 'vateriaIndica', source: require('../../../assets/plantImages/vateriaIndica.jpeg') },
  { key: 'vaticaLanceaefolia', source: require('../../../assets/plantImages/vaticaLanceaefolia.jpg') },
  { key: 'wendlandiaExserta', source: require('../../../assets/plantImages/wendlandiaExserta.jpg') },
  { key: 'ziziphusJujuba', source: require('../../../assets/plantImages/ziziphusJujuba.jpg') },
  { key: 'defaultImage',source: require('../../../assets/plantImages/defaultImage.jpeg')},
];

const getImageByKey = (key) => {
  const image = images.find((img) => img.key === key);
  return image ? image.source : null;
};

const PlantDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  //const { data } = route.params;
  const data = route.params?.data || [];


  return (
    <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" color="black" size={30} />
      <Text style={styles.backButtonText}> Back</Text>
    </TouchableOpacity>
  
    <ScrollView contentContainerStyle={styles.container}>
    {data.length > 0 ? (
          data.map((plant, index) => (

        <View key={index} style={styles.plantContainer}>
          <View style={styles.imageContainer}><Image source={getImageByKey(plant.imageKey)} style={styles.image}/></View>
          <Text style={styles.nameText}>{plant.comm_names.join(', ')}</Text>
          {/* <Text style={styles.dataTextHeading}>Plant Key: <Text style={styles.text}>{plant.imageKey}</Text></Text> */}
          <Text style={styles.dataTextHeading}>Scientific Name: <Text style={styles.text}>{plant.scientific_name}</Text></Text>
          <Text style={styles.dataTextHeading}>Common name: <Text style={styles.text}>{plant.comm_names.join(', ')}</Text></Text>
          <Text style={styles.dataTextHeading}>Description:<Text style={styles.text}>{plant.description}</Text></Text>
          <Text style={styles.dataTextHeading}>Can be grown at Home: <Text style={styles.text}>{plant.can_be_grown_at_home}</Text></Text>
          <Text style={styles.dataTextHeading}>Companion Plant: <Text style={styles.text}>{plant.companion_plants.join(', ')}</Text></Text>
          <Text style={styles.dataTextHeading}>Growth Rate: <Text style={styles.text}>{plant.growth_rate}</Text></Text>
          <Text style={styles.dataTextHeading}>Harvesting Information:<Text style={styles.text}>{plant.harvesting_information}</Text></Text> 
          <Text style={styles.dataTextHeading}>Light Requirements: <Text style={styles.text}>{plant.light_requirements}</Text></Text>
          <Text style={styles.dataTextHeading}>Origin and Habitat: <Text style={styles.text}>{plant.origin_and_habitat}</Text></Text>
          <Text style={styles.dataTextHeading}>Watering Guidelines: <Text style={styles.text}>{plant.watering_guidelines}</Text></Text>
          <Text style={styles.dataTextHeading}>Soil Type: <Text style={styles.text}>{plant.soil_type}</Text></Text>
          <Text style={styles.dataTextHeading}>Planting and Spacing: <Text style={styles.text}>{plant.planting_and_spacing}</Text></Text>
          <Text style={styles.dataTextHeading}>Pest and Disease Management: <Text style={styles.text}>{plant.pest_and_disease_management}</Text></Text>
          <Text style={styles.dataTextHeading}>Seasonal Tips:<Text style={styles.text}>{plant.seasonal_tips}</Text></Text> 
        </View>
      ))
    ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image source={require('../../../assets/Images/no-data.gif')} style={styles.nodatastyle} />
            <Text style={styles.nodataText}>No data found</Text>
          </View>
        )}
    </ScrollView>
  </View>
  );
};
const styles = {
  container: {
    padding: 50,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#77CC77', 
    zIndex: 1,
  },
  headerText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  dataTextHeading: {
    fontSize: 20,
    paddingTop: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  nodataText: {
    fontSize: 30,
    paddingTop: 20,
    color: 'grey',
    fontWeight: 'bold',
    zindex:1,
  },
  nodatastyle:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2, 
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
  },
  plantContainer: {
    marginBottom: 20,
    marginTop: 20, 
  },
};

export default PlantDetails;

