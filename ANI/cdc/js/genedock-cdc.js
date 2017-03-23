var genedock = new GeneDockAPI('me+/FZa7PnVtlaBK9x7kLA==', 'CLb5jfTH4QRAm6h/0A3SMeGMbYM=', 'https://cn-cdc-api.genedock.com');
var workflow_id = '56cea6eae6bdc600247f3795';
var task_id;
//上传任务账户名
var currentAccount = 'chinacdc';
var inputFile = {}, checksum = '', progress = 0;

var data = {},
  red = 'red',
  green = 'green';

var file_url, count = 60,
  download_time_count, downloadOutput_enid, enid;

this.getLog_id = getLog_id;

var uploadfile = {};
var genus = [
  {
    'name': 'Acaryochloris',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acaryochloris/Acaryochloris_marina.tgz',
        'name': 'Acaryochloris_marina',
        'enid': '57bb97a5f1e3f40053fe1117'
      }
    ]
  },
  {
    'name': 'Acetobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acetobacter/Acetobacter_pasteurianus.tgz',
        'name': 'Acetobacter_pasteurianus',
        'enid': '57bbbc03f1e3f4004efe1238'
      }
    ]
  },
  {
    'name': 'Acetobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acetobacterium/Acetobacterium_woodii.tgz',
        'name': 'Acetobacterium_woodii',
        'enid': '57bbae07f1e3f40057fe10d2'
      }
    ]
  },
  {
    'name': 'Acetohalobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acetohalobium/Acetohalobium_arabaticum.tgz',
        'name': 'Acetohalobium_arabaticum',
        'enid': '57bba246f1e3f40053fe11d3'
      }
    ]
  },
  {
    'name': 'Acholeplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acholeplasma/Acholeplasma_brassicae.tgz',
        'name': 'Acholeplasma_brassicae',
        'enid': '57bbaa77f1e3f40053fe12b8'
      },
      {
        'path': 'chinacdc:/ANI/Acholeplasma/Acholeplasma_laidlawii.tgz',
        'name': 'Acholeplasma_laidlawii',
        'enid': '57bbaa7ff1e3f40042fe0f78'
      },
      {
        'path': 'chinacdc:/ANI/Acholeplasma/Acholeplasma_palmae.tgz',
        'name': 'Acholeplasma_palmae',
        'enid': '57bbaa70f1e3f40051fe1038'
      }
    ]
  },
  {
    'name': 'Achromobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Achromobacter/Achromobacter_xylosoxidans.tgz',
        'name': 'Achromobacter_xylosoxidans',
        'enid': '57bb935cf1e3f4004efe1026'
      }
    ]
  },
  {
    'name': 'Acidaminococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidaminococcus/Acidaminococcus_fermentans.tgz',
        'name': 'Acidaminococcus_fermentans',
        'enid': '57bbb2c0f1e3f40058fe121d'
      },
      {
        'path': 'chinacdc:/ANI/Acidaminococcus/Acidaminococcus_intestini.tgz',
        'name': 'Acidaminococcus_intestini',
        'enid': '57bbb297f1e3f4005cfe12f9'
      }
    ]
  },
  {
    'name': 'Acidianus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidianus/Acidianus_hospitalis.tgz',
        'name': 'Acidianus_hospitalis',
        'enid': '57bb9577f1e3f4005cfe1076'
      }
    ]
  },
  {
    'name': 'Acidilobus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidilobus/Acidilobus_saccharovorans.tgz',
        'name': 'Acidilobus_saccharovorans',
        'enid': '57bbd2b7f1e3f40053fe1c8c'
      }
    ]
  },
  {
    'name': 'Acidimicrobidae',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidimicrobidae/Acidimicrobidae_bacterium.tgz',
        'name': 'Acidimicrobidae_bacterium',
        'enid': '57bbc26df1e3f40059fe14c6'
      }
    ]
  },
  {
    'name': 'Acidimicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidimicrobium/Acidimicrobium_ferrooxidans.tgz',
        'name': 'Acidimicrobium_ferrooxidans',
        'enid': '57bbc088f1e3f40041fe0f71'
      }
    ]
  },
  {
    'name': 'Acidiphilium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidiphilium/Acidiphilium_cryptum.tgz',
        'name': 'Acidiphilium_cryptum',
        'enid': '57bb9815f1e3f40059fe10c9'
      },
      {
        'path': 'chinacdc:/ANI/Acidiphilium/Acidiphilium_multivorum.tgz',
        'name': 'Acidiphilium_multivorum',
        'enid': '57bb980bf1e3f40053fe1126'
      }
    ]
  },
  {
    'name': 'Acidithiobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidithiobacillus/Acidithiobacillus_caldus.tgz',
        'name': 'Acidithiobacillus_caldus',
        'enid': '57bbc3bbf1e3f40047fe1019'
      },
      {
        'path': 'chinacdc:/ANI/Acidithiobacillus/Acidithiobacillus_ferrivorans.tgz',
        'name': 'Acidithiobacillus_ferrivorans',
        'enid': '57bbc3c4f1e3f40053fe1617'
      },
      {
        'path': 'chinacdc:/ANI/Acidithiobacillus/Acidithiobacillus_ferrooxidans.tgz',
        'name': 'Acidithiobacillus_ferrooxidans',
        'enid': '57bbc3cef1e3f40046fe10f8'
      }
    ]
  },
  {
    'name': 'Acidobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidobacterium/Acidobacterium_MP5ACTX9.tgz',
        'name': 'Acidobacterium_MP5ACTX9',
        'enid': '57bba953f1e3f4005cfe120f'
      },
      {
        'path': 'chinacdc:/ANI/Acidobacterium/Acidobacterium_capsulatum.tgz',
        'name': 'Acidobacterium_capsulatum',
        'enid': '57bba94bf1e3f40053fe12a2'
      }
    ]
  },
  {
    'name': 'Acidothermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidothermus/Acidothermus_cellulolyticus.tgz',
        'name': 'Acidothermus_cellulolyticus',
        'enid': '57bb9069f1e3f40046fe0f6f'
      }
    ]
  },
  {
    'name': 'Acidovorax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acidovorax/Acidovorax_JS42.tgz',
        'name': 'Acidovorax_JS42',
        'enid': '57bbd4e5f1e3f40053fe1dcf'
      },
      {
        'path': 'chinacdc:/ANI/Acidovorax/Acidovorax_KKS102.tgz',
        'name': 'Acidovorax_KKS102',
        'enid': '57bbd4f8f1e3f4005cfe3a75'
      },
      {
        'path': 'chinacdc:/ANI/Acidovorax/Acidovorax_avenae.tgz',
        'name': 'Acidovorax_avenae',
        'enid': '57bbd4eef1e3f4004efe1792'
      },
      {
        'path': 'chinacdc:/ANI/Acidovorax/Acidovorax_citrulli.tgz',
        'name': 'Acidovorax_citrulli',
        'enid': '57bbd50af1e3f40058fe19f1'
      },
      {
        'path': 'chinacdc:/ANI/Acidovorax/Acidovorax_ebreus.tgz',
        'name': 'Acidovorax_ebreus',
        'enid': '57bbd502f1e3f40051fe140f'
      }
    ]
  },
  {
    'name': 'Aciduliprofundum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aciduliprofundum/Aciduliprofundum_MAR08.tgz',
        'name': 'Aciduliprofundum_MAR08',
        'enid': '57bbb352f1e3f40059fe12c7'
      },
      {
        'path': 'chinacdc:/ANI/Aciduliprofundum/Aciduliprofundum_boonei.tgz',
        'name': 'Aciduliprofundum_boonei',
        'enid': '57bbb378f1e3f40053fe136d'
      }
    ]
  },
  {
    'name': 'Acinetobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Acinetobacter/Acinetobacter_ADP1.tgz',
        'name': 'Acinetobacter_ADP1',
        'enid': '57bbbe18f1e3f40059fe13c5'
      },
      {
        'path': 'chinacdc:/ANI/Acinetobacter/Acinetobacter_baumannii.tgz',
        'name': 'Acinetobacter_baumannii',
        'enid': '57bbbe23f1e3f40047fe0fca'
      },
      {
        'path': 'chinacdc:/ANI/Acinetobacter/Acinetobacter_calcoaceticus.tgz',
        'name': 'Acinetobacter_calcoaceticus',
        'enid': '57bbbe0ef1e3f4005cfe1405'
      },
      {
        'path': 'chinacdc:/ANI/Acinetobacter/Acinetobacter_oleivorans.tgz',
        'name': 'Acinetobacter_oleivorans',
        'enid': '57bbbe04f1e3f40059fe13bd'
      }
    ]
  },
  {
    'name': 'Actinobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Actinobacillus/Actinobacillus_pleuropneumoniae.tgz',
        'name': 'Actinobacillus_pleuropneumoniae',
        'enid': '57bbaf47f1e3f4005cfe12ba'
      },
      {
        'path': 'chinacdc:/ANI/Actinobacillus/Actinobacillus_succinogenes.tgz',
        'name': 'Actinobacillus_succinogenes',
        'enid': '57bbaf35f1e3f40059fe1287'
      },
      {
        'path': 'chinacdc:/ANI/Actinobacillus/Actinobacillus_suis.tgz',
        'name': 'Actinobacillus_suis',
        'enid': '57bbaf3df1e3f4004dfe0ffd'
      }
    ]
  },
  {
    'name': 'Actinoplanes',
    'species': [
      {
        'path': 'chinacdc:/ANI/Actinoplanes/Actinoplanes_N902.tgz',
        'name': 'Actinoplanes_N902',
        'enid': '57bbbd91f1e3f4005cfe13e4'
      },
      {
        'path': 'chinacdc:/ANI/Actinoplanes/Actinoplanes_SE50.tgz',
        'name': 'Actinoplanes_SE50',
        'enid': '57bbbd85f1e3f40053fe145a'
      },
      {
        'path': 'chinacdc:/ANI/Actinoplanes/Actinoplanes_friuliensis.tgz',
        'name': 'Actinoplanes_friuliensis',
        'enid': '57bbbd9df1e3f40059fe139d'
      },
      {
        'path': 'chinacdc:/ANI/Actinoplanes/Actinoplanes_missouriensis.tgz',
        'name': 'Actinoplanes_missouriensis',
        'enid': '57bbbd79f1e3f40058fe12b8'
      }
    ]
  },
  {
    'name': 'Actinosynnema',
    'species': [
      {
        'path': 'chinacdc:/ANI/Actinosynnema/Actinosynnema_mirum.tgz',
        'name': 'Actinosynnema_mirum',
        'enid': '57bbd2bef1e3f40057fe1603'
      }
    ]
  },
  {
    'name': 'Adlercreutzia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Adlercreutzia/Adlercreutzia_equolifaciens.tgz',
        'name': 'Adlercreutzia_equolifaciens',
        'enid': '57bba974f1e3f40059fe1216'
      }
    ]
  },
  {
    'name': 'Advenella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Advenella/Advenella_kashmirensis.tgz',
        'name': 'Advenella_kashmirensis',
        'enid': '57bbbf4bf1e3f4004efe1277'
      }
    ]
  },
  {
    'name': 'Aequorivita',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aequorivita/Aequorivita_sublithincola.tgz',
        'name': 'Aequorivita_sublithincola',
        'enid': '57bb9034f1e3f40059fe1021'
      }
    ]
  },
  {
    'name': 'Aerococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aerococcus/Aerococcus_urinae.tgz',
        'name': 'Aerococcus_urinae',
        'enid': '57bbd2a5f1e3f40051fe1394'
      }
    ]
  },
  {
    'name': 'Aeromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aeromonas/Aeromonas_hydrophila.tgz',
        'name': 'Aeromonas_hydrophila',
        'enid': '57bba6e1f1e3f4004efe112a'
      },
      {
        'path': 'chinacdc:/ANI/Aeromonas/Aeromonas_salmonicida.tgz',
        'name': 'Aeromonas_salmonicida',
        'enid': '57bba6eff1e3f40057fe1074'
      },
      {
        'path': 'chinacdc:/ANI/Aeromonas/Aeromonas_veronii.tgz',
        'name': 'Aeromonas_veronii',
        'enid': '57bba6f9f1e3f40058fe1197'
      }
    ]
  },
  {
    'name': 'Aeropyrum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aeropyrum/Aeropyrum_camini.tgz',
        'name': 'Aeropyrum_camini',
        'enid': '57bba70cf1e3f4005cfe11d4'
      },
      {
        'path': 'chinacdc:/ANI/Aeropyrum/Aeropyrum_pernix.tgz',
        'name': 'Aeropyrum_pernix',
        'enid': '57bba702f1e3f40046fe1029'
      }
    ]
  },
  {
    'name': 'Agrobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Agrobacterium/Agrobacterium_H13.tgz',
        'name': 'Agrobacterium_H13',
        'enid': '57bb9a38f1e3f4005cfe10ce'
      },
      {
        'path': 'chinacdc:/ANI/Agrobacterium/Agrobacterium_fabrum.tgz',
        'name': 'Agrobacterium_fabrum',
        'enid': '57bb9a55f1e3f40046fe0fbd'
      },
      {
        'path': 'chinacdc:/ANI/Agrobacterium/Agrobacterium_radiobacter.tgz',
        'name': 'Agrobacterium_radiobacter',
        'enid': '57bb9a4cf1e3f4005cfe10d2'
      },
      {
        'path': 'chinacdc:/ANI/Agrobacterium/Agrobacterium_vitis.tgz',
        'name': 'Agrobacterium_vitis',
        'enid': '57bb9a42f1e3f40058fe1089'
      }
    ]
  },
  {
    'name': 'Agromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Agromonas/Agromonas_oligotrophica.tgz',
        'name': 'Agromonas_oligotrophica',
        'enid': '57bbc098f1e3f40041fe0f78'
      }
    ]
  },
  {
    'name': 'Akkermansia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Akkermansia/Akkermansia_muciniphila.tgz',
        'name': 'Akkermansia_muciniphila',
        'enid': '57bbbd1ef1e3f4005cfe13cd'
      }
    ]
  },
  {
    'name': 'Alcanivorax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Alcanivorax/Alcanivorax_borkumensis.tgz',
        'name': 'Alcanivorax_borkumensis',
        'enid': '57bba115f1e3f4004dfe0fb5'
      },
      {
        'path': 'chinacdc:/ANI/Alcanivorax/Alcanivorax_dieselolei.tgz',
        'name': 'Alcanivorax_dieselolei',
        'enid': '57bba10bf1e3f40058fe1140'
      }
    ]
  },
  {
    'name': 'Alicycliphilus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Alicycliphilus/Alicycliphilus_denitrificans.tgz',
        'name': 'Alicycliphilus_denitrificans',
        'enid': '57bba31af1e3f40058fe115d'
      }
    ]
  },
  {
    'name': 'Alicyclobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Alicyclobacillus/Alicyclobacillus_acidocaldarius.tgz',
        'name': 'Alicyclobacillus_acidocaldarius',
        'enid': '57bbd00ff1e3f40058fe1834'
      }
    ]
  },
  {
    'name': 'Aliivibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aliivibrio/Aliivibrio_salmonicida.tgz',
        'name': 'Aliivibrio_salmonicida',
        'enid': '57bb9c7df1e3f4005cfe111c'
      }
    ]
  },
  {
    'name': 'Alistipes',
    'species': [
      {
        'path': 'chinacdc:/ANI/Alistipes/Alistipes_finegoldii.tgz',
        'name': 'Alistipes_finegoldii',
        'enid': '57bbbdf1f1e3f4005cfe1401'
      },
      {
        'path': 'chinacdc:/ANI/Alistipes/Alistipes_shahii.tgz',
        'name': 'Alistipes_shahii',
        'enid': '57bbbde7f1e3f4005cfe13fd'
      }
    ]
  },
  {
    'name': 'Alkalilimnicola',
    'species': [
      {
        'path': 'chinacdc:/ANI/Alkalilimnicola/Alkalilimnicola_ehrlichii.tgz',
        'name': 'Alkalilimnicola_ehrlichii',
        'enid': '57bbc030f1e3f4005cfe1465'
      }
    ]
  },
  {
    'name': 'Alkaliphilus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Alkaliphilus/Alkaliphilus_metalliredigens.tgz',
        'name': 'Alkaliphilus_metalliredigens',
        'enid': '57bb9fd9f1e3f40046fe0fe9'
      },
      {
        'path': 'chinacdc:/ANI/Alkaliphilus/Alkaliphilus_oremlandii.tgz',
        'name': 'Alkaliphilus_oremlandii',
        'enid': '57bb9fcff1e3f40058fe1129'
      }
    ]
  },
  {
    'name': 'Allochromatium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Allochromatium/Allochromatium_vinosum.tgz',
        'name': 'Allochromatium_vinosum',
        'enid': '57bb9ec2f1e3f40040fe0f7f'
      }
    ]
  },
  {
    'name': 'Alteromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Alteromonas/Alteromonas_SN2.tgz',
        'name': 'Alteromonas_SN2',
        'enid': '57bb9f7cf1e3f4004dfe0fa3'
      },
      {
        'path': 'chinacdc:/ANI/Alteromonas/Alteromonas_macleodii.tgz',
        'name': 'Alteromonas_macleodii',
        'enid': '57bb9f44f1e3f40057fe1038'
      }
    ]
  },
  {
    'name': 'Aminobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aminobacterium/Aminobacterium_colombiense.tgz',
        'name': 'Aminobacterium_colombiense',
        'enid': '57bba436f1e3f4004efe1103'
      }
    ]
  },
  {
    'name': 'Ammonifex',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ammonifex/Ammonifex_degensii.tgz',
        'name': 'Ammonifex_degensii',
        'enid': '57bba837f1e3f40059fe11e3'
      }
    ]
  },
  {
    'name': 'Amphibacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Amphibacillus/Amphibacillus_xylanus.tgz',
        'name': 'Amphibacillus_xylanus',
        'enid': '57bbc2d2f1e3f40053fe15ba'
      }
    ]
  },
  {
    'name': 'Amycolatopsis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Amycolatopsis/Amycolatopsis_mediterranei.tgz',
        'name': 'Amycolatopsis_mediterranei',
        'enid': '57bbd2d5f1e3f4004efe16ef'
      },
      {
        'path': 'chinacdc:/ANI/Amycolatopsis/Amycolatopsis_orientalis.tgz',
        'name': 'Amycolatopsis_orientalis',
        'enid': '57bbd2fbf1e3f40057fe160b'
      }
    ]
  },
  {
    'name': 'Amycolicicoccus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Amycolicicoccus/Amycolicicoccus_subflavus.tgz',
        'name': 'Amycolicicoccus_subflavus',
        'enid': '57bbd1c6f1e3f4004efe1699'
      }
    ]
  },
  {
    'name': 'Anabaena',
    'species': [
      {
        'path': 'chinacdc:/ANI/Anabaena/Anabaena_90.tgz',
        'name': 'Anabaena_90',
        'enid': '57bbd0e8f1e3f40058fe187b'
      },
      {
        'path': 'chinacdc:/ANI/Anabaena/Anabaena_cylindrica.tgz',
        'name': 'Anabaena_cylindrica',
        'enid': '57bbd0f0f1e3f40053fe1bb7'
      },
      {
        'path': 'chinacdc:/ANI/Anabaena/Anabaena_variabilis.tgz',
        'name': 'Anabaena_variabilis',
        'enid': '57bbd0fbf1e3f4004efe166f'
      }
    ]
  },
  {
    'name': 'Anaerobaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Anaerobaculum/Anaerobaculum_mobile.tgz',
        'name': 'Anaerobaculum_mobile',
        'enid': '57bbaf50f1e3f40043fe0f59'
      }
    ]
  },
  {
    'name': 'Anaerococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Anaerococcus/Anaerococcus_prevotii.tgz',
        'name': 'Anaerococcus_prevotii',
        'enid': '57bbc94df1e3f40053fe18e7'
      }
    ]
  },
  {
    'name': 'Anaerolinea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Anaerolinea/Anaerolinea_thermophila.tgz',
        'name': 'Anaerolinea_thermophila',
        'enid': '57bbbff9f1e3f40053fe14be'
      }
    ]
  },
  {
    'name': 'Anaeromyxobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Anaeromyxobacter/Anaeromyxobacter_Fw109.tgz',
        'name': 'Anaeromyxobacter_Fw109',
        'enid': '57bbbc65f1e3f40046fe1074'
      },
      {
        'path': 'chinacdc:/ANI/Anaeromyxobacter/Anaeromyxobacter_K.tgz',
        'name': 'Anaeromyxobacter_K',
        'enid': '57bbbc6ff1e3f40051fe109a'
      },
      {
        'path': 'chinacdc:/ANI/Anaeromyxobacter/Anaeromyxobacter_dehalogenans.tgz',
        'name': 'Anaeromyxobacter_dehalogenans',
        'enid': '57bbbc59f1e3f40042fe0f9d'
      }
    ]
  },
  {
    'name': 'Anaplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Anaplasma/Anaplasma_centrale.tgz',
        'name': 'Anaplasma_centrale',
        'enid': '57bba4d1f1e3f40059fe11ae'
      },
      {
        'path': 'chinacdc:/ANI/Anaplasma/Anaplasma_marginale.tgz',
        'name': 'Anaplasma_marginale',
        'enid': '57bba4bdf1e3f4004afe0fcc'
      },
      {
        'path': 'chinacdc:/ANI/Anaplasma/Anaplasma_phagocytophilum.tgz',
        'name': 'Anaplasma_phagocytophilum',
        'enid': '57bba4c7f1e3f4004afe0fd0'
      }
    ]
  },
  {
    'name': 'Anoxybacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Anoxybacillus/Anoxybacillus_flavithermus.tgz',
        'name': 'Anoxybacillus_flavithermus',
        'enid': '57bbc038f1e3f40051fe10f6'
      }
    ]
  },
  {
    'name': 'Aquifex',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aquifex/Aquifex_aeolicus.tgz',
        'name': 'Aquifex_aeolicus',
        'enid': '57bb9ccbf1e3f4004efe10b3'
      }
    ]
  },
  {
    'name': 'Arcanobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Arcanobacterium/Arcanobacterium_haemolyticum.tgz',
        'name': 'Arcanobacterium_haemolyticum',
        'enid': '57bbae38f1e3f40053fe12f1'
      }
    ]
  },
  {
    'name': 'Archaeoglobus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Archaeoglobus/Archaeoglobus_fulgidus.tgz',
        'name': 'Archaeoglobus_fulgidus',
        'enid': '57bbd040f1e3f4004efe1640'
      },
      {
        'path': 'chinacdc:/ANI/Archaeoglobus/Archaeoglobus_profundus.tgz',
        'name': 'Archaeoglobus_profundus',
        'enid': '57bbd030f1e3f40053fe1b7d'
      },
      {
        'path': 'chinacdc:/ANI/Archaeoglobus/Archaeoglobus_sulfaticallidus.tgz',
        'name': 'Archaeoglobus_sulfaticallidus',
        'enid': '57bbd047f1e3f4004dfe11fa'
      },
      {
        'path': 'chinacdc:/ANI/Archaeoglobus/Archaeoglobus_veneficus.tgz',
        'name': 'Archaeoglobus_veneficus',
        'enid': '57bbd038f1e3f40051fe134c'
      }
    ]
  },
  {
    'name': 'Arcobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Arcobacter/Arcobacter_L.tgz',
        'name': 'Arcobacter_L',
        'enid': '57bbcf9ff1e3f40058fe1819'
      },
      {
        'path': 'chinacdc:/ANI/Arcobacter/Arcobacter_butzleri.tgz',
        'name': 'Arcobacter_butzleri',
        'enid': '57bbcf8af1e3f40043fe1044'
      },
      {
        'path': 'chinacdc:/ANI/Arcobacter/Arcobacter_nitrofigilis.tgz',
        'name': 'Arcobacter_nitrofigilis',
        'enid': '57bbcf95f1e3f40046fe12b0'
      }
    ]
  },
  {
    'name': 'Aromatoleum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aromatoleum/Aromatoleum_aromaticum.tgz',
        'name': 'Aromatoleum_aromaticum',
        'enid': '57bbd4b3f1e3f4004efe1786'
      }
    ]
  },
  {
    'name': 'Arthrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Arthrobacter/Arthrobacter_FB24.tgz',
        'name': 'Arthrobacter_FB24',
        'enid': '57bb9d11f1e3f4004dfe0f90'
      },
      {
        'path': 'chinacdc:/ANI/Arthrobacter/Arthrobacter_arilaitensis.tgz',
        'name': 'Arthrobacter_arilaitensis',
        'enid': '57bb9cfef1e3f40059fe112f'
      },
      {
        'path': 'chinacdc:/ANI/Arthrobacter/Arthrobacter_aurescens.tgz',
        'name': 'Arthrobacter_aurescens',
        'enid': '57bb9cdef1e3f40047fe0f7b'
      },
      {
        'path': 'chinacdc:/ANI/Arthrobacter/Arthrobacter_chlorophenolicus.tgz',
        'name': 'Arthrobacter_chlorophenolicus',
        'enid': '57bb9d07f1e3f40053fe1158'
      },
      {
        'path': 'chinacdc:/ANI/Arthrobacter/Arthrobacter_nitroguajacolicus.tgz',
        'name': 'Arthrobacter_nitroguajacolicus',
        'enid': '57bb9ceaf1e3f4005cfe1127'
      },
      {
        'path': 'chinacdc:/ANI/Arthrobacter/Arthrobacter_phenanthrenivorans.tgz',
        'name': 'Arthrobacter_phenanthrenivorans',
        'enid': '57bb9cf4f1e3f40059fe112b'
      }
    ]
  },
  {
    'name': 'Arthrospira',
    'species': [
      {
        'path': 'chinacdc:/ANI/Arthrospira/Arthrospira_platensis.tgz',
        'name': 'Arthrospira_platensis',
        'enid': '57bbca90f1e3f40058fe16c4'
      }
    ]
  },
  {
    'name': 'Aster',
    'species': [
      {
        'path': 'chinacdc:/ANI/Aster/Aster_yellows.tgz',
        'name': 'Aster_yellows',
        'enid': '57bbca71f1e3f40053fe1954'
      }
    ]
  },
  {
    'name': 'Asticcacaulis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Asticcacaulis/Asticcacaulis_excentricus.tgz',
        'name': 'Asticcacaulis_excentricus',
        'enid': '57bbc0c9f1e3f40053fe14f3'
      }
    ]
  },
  {
    'name': 'Atopobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Atopobium/Atopobium_parvulum.tgz',
        'name': 'Atopobium_parvulum',
        'enid': '57bb9bfbf1e3f40059fe1113'
      }
    ]
  },
  {
    'name': 'Azoarcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Azoarcus/Azoarcus_BH72.tgz',
        'name': 'Azoarcus_BH72',
        'enid': '57bbcf62f1e3f4004efe15f2'
      },
      {
        'path': 'chinacdc:/ANI/Azoarcus/Azoarcus_KH32C.tgz',
        'name': 'Azoarcus_KH32C',
        'enid': '57bbcf58f1e3f40051fe1331'
      }
    ]
  },
  {
    'name': 'Azorhizobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Azorhizobium/Azorhizobium_caulinodans.tgz',
        'name': 'Azorhizobium_caulinodans',
        'enid': '57bbc591f1e3f40059fe16b6'
      }
    ]
  },
  {
    'name': 'Azospirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Azospirillum/Azospirillum_B510.tgz',
        'name': 'Azospirillum_B510',
        'enid': '57bb9ad8f1e3f40046fe0fc8'
      },
      {
        'path': 'chinacdc:/ANI/Azospirillum/Azospirillum_brasilense.tgz',
        'name': 'Azospirillum_brasilense',
        'enid': '57bb9acef1e3f40058fe1094'
      },
      {
        'path': 'chinacdc:/ANI/Azospirillum/Azospirillum_lipoferum.tgz',
        'name': 'Azospirillum_lipoferum',
        'enid': '57bb9ae1f1e3f4004dfe0f84'
      }
    ]
  },
  {
    'name': 'Azotobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Azotobacter/Azotobacter_vinelandii.tgz',
        'name': 'Azotobacter_vinelandii',
        'enid': '57bbcda8f1e3f40041fe0fc6'
      }
    ]
  },
  {
    'name': 'Bacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_1NLA3E.tgz',
        'name': 'Bacillus_1NLA3E',
        'enid': '57bb981ef1e3f4005cfe10ab'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_JS.tgz',
        'name': 'Bacillus_JS',
        'enid': '57bb9993f1e3f40053fe1135'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_amyloliquefaciens.tgz',
        'name': 'Bacillus_amyloliquefaciens',
        'enid': '57bb98def1e3f40051fe0fd6'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_anthracis.tgz',
        'name': 'Bacillus_anthracis',
        'enid': '57bb99b7f1e3f4004dfe0f80'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_atrophaeus.tgz',
        'name': 'Bacillus_atrophaeus',
        'enid': '57bb999cf1e3f40059fe10d1'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_cellulosilyticus.tgz',
        'name': 'Bacillus_cellulosilyticus',
        'enid': '57bb9878f1e3f40057fe0fe0'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_cereus.tgz',
        'name': 'Bacillus_cereus',
        'enid': '57bb9833f1e3f4004efe1073'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_clausii.tgz',
        'name': 'Bacillus_clausii',
        'enid': '57bb9828f1e3f40053fe112a'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_coagulans.tgz',
        'name': 'Bacillus_coagulans',
        'enid': '57bb991df1e3f40046fe0fb9'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_cytotoxicus.tgz',
        'name': 'Bacillus_cytotoxicus',
        'enid': '57bb997ff1e3f40058fe1085'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_halodurans.tgz',
        'name': 'Bacillus_halodurans',
        'enid': '57bb9926f1e3f40051fe0fda'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_infantis.tgz',
        'name': 'Bacillus_infantis',
        'enid': '57bb98d3f1e3f40046fe0fb5'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_licheniformis.tgz',
        'name': 'Bacillus_licheniformis',
        'enid': '57bb99a6f1e3f4005cfe10b6'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_megaterium.tgz',
        'name': 'Bacillus_megaterium',
        'enid': '57bb9930f1e3f4005cfe10af'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_pseudofirmus.tgz',
        'name': 'Bacillus_pseudofirmus',
        'enid': '57bb9881f1e3f40053fe112e'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_pumilus.tgz',
        'name': 'Bacillus_pumilus',
        'enid': '57bb9989f1e3f4004efe107c'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_selenitireducens.tgz',
        'name': 'Bacillus_selenitireducens',
        'enid': '57bb99d9f1e3f40059fe10d5'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_subtilis.tgz',
        'name': 'Bacillus_subtilis',
        'enid': '57bb994df1e3f40057fe0fe6'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_thuringiensis.tgz',
        'name': 'Bacillus_thuringiensis',
        'enid': '57bb988df1e3f40058fe1081'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_toyonensis.tgz',
        'name': 'Bacillus_toyonensis',
        'enid': '57bb9942f1e3f4004efe1077'
      },
      {
        'path': 'chinacdc:/ANI/Bacillus/Bacillus_weihenstephanensis.tgz',
        'name': 'Bacillus_weihenstephanensis',
        'enid': '57bb99e2f1e3f4005cfe10bc'
      }
    ]
  },
  {
    'name': 'Bacteriovorax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bacteriovorax/Bacteriovorax_marinus.tgz',
        'name': 'Bacteriovorax_marinus',
        'enid': '57bbcf2df1e3f4004efe15e6'
      }
    ]
  },
  {
    'name': 'Bacteroides',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_CF50.tgz',
        'name': 'Bacteroides_CF50',
        'enid': '57bbca5ef1e3f4004efe1474'
      },
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_fragilis.tgz',
        'name': 'Bacteroides_fragilis',
        'enid': '57bbca4af1e3f4003ffe0fd3'
      },
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_helcogenes.tgz',
        'name': 'Bacteroides_helcogenes',
        'enid': '57bbca25f1e3f40053fe1941'
      },
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_salanitronis.tgz',
        'name': 'Bacteroides_salanitronis',
        'enid': '57bbca40f1e3f40059fe18ed'
      },
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_thetaiotaomicron.tgz',
        'name': 'Bacteroides_thetaiotaomicron',
        'enid': '57bbca36f1e3f40059fe18e9'
      },
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_uniformis.tgz',
        'name': 'Bacteroides_uniformis',
        'enid': '57bbca6df1e3f40058fe16b1'
      },
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_vulgatus.tgz',
        'name': 'Bacteroides_vulgatus',
        'enid': '57bbca66f1e3f40058fe16a9'
      },
      {
        'path': 'chinacdc:/ANI/Bacteroides/Bacteroides_xylanisolvens.tgz',
        'name': 'Bacteroides_xylanisolvens',
        'enid': '57bbca2cf1e3f4005cfe1ecf'
      }
    ]
  },
  {
    'name': 'Bartonella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_australis.tgz',
        'name': 'Bartonella_australis',
        'enid': '57bb9e5bf1e3f40058fe10f5'
      },
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_bacilliformis.tgz',
        'name': 'Bartonella_bacilliformis',
        'enid': '57bb9e2cf1e3f4004dfe0f97'
      },
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_clarridgeiae.tgz',
        'name': 'Bartonella_clarridgeiae',
        'enid': '57bb9e51f1e3f40058fe10f1'
      },
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_grahamii.tgz',
        'name': 'Bartonella_grahamii',
        'enid': '57bb9e62f1e3f40058fe10f9'
      },
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_henselae.tgz',
        'name': 'Bartonella_henselae',
        'enid': '57bb9e3ff1e3f4003ffe0f47'
      },
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_quintana.tgz',
        'name': 'Bartonella_quintana',
        'enid': '57bb9e6cf1e3f40058fe10fd'
      },
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_tribocorum.tgz',
        'name': 'Bartonella_tribocorum',
        'enid': '57bb9e34f1e3f4004dfe0f9b'
      },
      {
        'path': 'chinacdc:/ANI/Bartonella/Bartonella_vinsonii.tgz',
        'name': 'Bartonella_vinsonii',
        'enid': '57bb9e47f1e3f40051fe0ff3'
      }
    ]
  },
  {
    'name': 'Baumannia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Baumannia/Baumannia_cicadellinicola.tgz',
        'name': 'Baumannia_cicadellinicola',
        'enid': '57bbb6f7f1e3f4004efe11f8'
      }
    ]
  },
  {
    'name': 'Bdellovibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bdellovibrio/Bdellovibrio_bacteriovorus.tgz',
        'name': 'Bdellovibrio_bacteriovorus',
        'enid': '57bbaf0cf1e3f4005cfe12a8'
      },
      {
        'path': 'chinacdc:/ANI/Bdellovibrio/Bdellovibrio_exovorus.tgz',
        'name': 'Bdellovibrio_exovorus',
        'enid': '57bbaf02f1e3f4005cfe12a4'
      }
    ]
  },
  {
    'name': 'Beijerinckia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Beijerinckia/Beijerinckia_indica.tgz',
        'name': 'Beijerinckia_indica',
        'enid': '57bbcb4df1e3f40046fe1222'
      }
    ]
  },
  {
    'name': 'Belliella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Belliella/Belliella_baltica.tgz',
        'name': 'Belliella_baltica',
        'enid': '57bbc05bf1e3f4004dfe105b'
      }
    ]
  },
  {
    'name': 'Beutenbergia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Beutenbergia/Beutenbergia_cavernae.tgz',
        'name': 'Beutenbergia_cavernae',
        'enid': '57bbc955f1e3f40058fe166b'
      }
    ]
  },
  {
    'name': 'Bibersteinia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bibersteinia/Bibersteinia_trehalosi.tgz',
        'name': 'Bibersteinia_trehalosi',
        'enid': '57bbb31af1e3f40057fe10e4'
      }
    ]
  },
  {
    'name': 'Bifidobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_adolescentis.tgz',
        'name': 'Bifidobacterium_adolescentis',
        'enid': '57bbb06df1e3f4005cfe12da'
      },
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_animalis.tgz',
        'name': 'Bifidobacterium_animalis',
        'enid': '57bbb086f1e3f40047fe0fb0'
      },
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_asteroides.tgz',
        'name': 'Bifidobacterium_asteroides',
        'enid': '57bbb07ef1e3f4004afe1001'
      },
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_bifidum.tgz',
        'name': 'Bifidobacterium_bifidum',
        'enid': '57bbb09ef1e3f40046fe104e'
      },
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_breve.tgz',
        'name': 'Bifidobacterium_breve',
        'enid': '57bbb0a8f1e3f40059fe129c'
      },
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_dentium.tgz',
        'name': 'Bifidobacterium_dentium',
        'enid': '57bbb074f1e3f40053fe1335'
      },
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_longum.tgz',
        'name': 'Bifidobacterium_longum',
        'enid': '57bbb0baf1e3f4005cfe12de'
      },
      {
        'path': 'chinacdc:/ANI/Bifidobacterium/Bifidobacterium_thermophilum.tgz',
        'name': 'Bifidobacterium_thermophilum',
        'enid': '57bbb0b2f1e3f4004efe11b4'
      }
    ]
  },
  {
    'name': 'Blastococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Blastococcus/Blastococcus_saxobsidens.tgz',
        'name': 'Blastococcus_saxobsidens',
        'enid': '57bb9a7cf1e3f40046fe0fc4'
      }
    ]
  },
  {
    'name': 'Blattabacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Blattabacterium/Blattabacterium_.tgz',
        'name': 'Blattabacterium_',
        'enid': '57bb9e8bf1e3f40057fe1023'
      }
    ]
  },
  {
    'name': 'Bordetella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bordetella/Bordetella_avium.tgz',
        'name': 'Bordetella_avium',
        'enid': '57bbc40df1e3f40051fe1146'
      },
      {
        'path': 'chinacdc:/ANI/Bordetella/Bordetella_bronchiseptica.tgz',
        'name': 'Bordetella_bronchiseptica',
        'enid': '57bbc415f1e3f40053fe1646'
      },
      {
        'path': 'chinacdc:/ANI/Bordetella/Bordetella_parapertussis.tgz',
        'name': 'Bordetella_parapertussis',
        'enid': '57bbc429f1e3f4005cfe15af'
      },
      {
        'path': 'chinacdc:/ANI/Bordetella/Bordetella_pertussis.tgz',
        'name': 'Bordetella_pertussis',
        'enid': '57bbc43bf1e3f40047fe1025'
      },
      {
        'path': 'chinacdc:/ANI/Bordetella/Bordetella_petrii.tgz',
        'name': 'Bordetella_petrii',
        'enid': '57bbc447f1e3f40053fe166f'
      }
    ]
  },
  {
    'name': 'Borrelia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_afzelii.tgz',
        'name': 'Borrelia_afzelii',
        'enid': '57bbb5eff1e3f40053fe138c'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_bissettii.tgz',
        'name': 'Borrelia_bissettii',
        'enid': '57bbb602f1e3f40059fe12e8'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_burgdorferi.tgz',
        'name': 'Borrelia_burgdorferi',
        'enid': '57bbb5dff1e3f40057fe1109'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_crocidurae.tgz',
        'name': 'Borrelia_crocidurae',
        'enid': '57bbb61cf1e3f40059fe12f0'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_duttonii.tgz',
        'name': 'Borrelia_duttonii',
        'enid': '57bbb609f1e3f4004afe100c'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_garinii.tgz',
        'name': 'Borrelia_garinii',
        'enid': '57bbb624f1e3f40053fe1395'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_hermsii.tgz',
        'name': 'Borrelia_hermsii',
        'enid': '57bbb5fcf1e3f4005cfe1324'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_miyamotoi.tgz',
        'name': 'Borrelia_miyamotoi',
        'enid': '57bbb617f1e3f40059fe12ec'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_recurrentis.tgz',
        'name': 'Borrelia_recurrentis',
        'enid': '57bbb5f6f1e3f40059fe12e4'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_turicatae.tgz',
        'name': 'Borrelia_turicatae',
        'enid': '57bbb611f1e3f4005cfe1328'
      },
      {
        'path': 'chinacdc:/ANI/Borrelia/Borrelia_valaisiana.tgz',
        'name': 'Borrelia_valaisiana',
        'enid': '57bbb5e9f1e3f4004efe11e6'
      }
    ]
  },
  {
    'name': 'Brachybacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Brachybacterium/Brachybacterium_faecium.tgz',
        'name': 'Brachybacterium_faecium',
        'enid': '57bb9051f1e3f40051fe0fa4'
      }
    ]
  },
  {
    'name': 'Brachyspira',
    'species': [
      {
        'path': 'chinacdc:/ANI/Brachyspira/Brachyspira_hyodysenteriae.tgz',
        'name': 'Brachyspira_hyodysenteriae',
        'enid': '57bb93aef1e3f40059fe1067'
      },
      {
        'path': 'chinacdc:/ANI/Brachyspira/Brachyspira_intermedia.tgz',
        'name': 'Brachyspira_intermedia',
        'enid': '57bb938df1e3f40058fe1055'
      },
      {
        'path': 'chinacdc:/ANI/Brachyspira/Brachyspira_murdochii.tgz',
        'name': 'Brachyspira_murdochii',
        'enid': '57bb93a4f1e3f4004efe102d'
      },
      {
        'path': 'chinacdc:/ANI/Brachyspira/Brachyspira_pilosicoli.tgz',
        'name': 'Brachyspira_pilosicoli',
        'enid': '57bb9396f1e3f40051fe0fba'
      }
    ]
  },
  {
    'name': 'Bradyrhizobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Bradyrhizobium/Bradyrhizobium_BTAi1.tgz',
        'name': 'Bradyrhizobium_BTAi1',
        'enid': '57bb97e7f1e3f40053fe111b'
      },
      {
        'path': 'chinacdc:/ANI/Bradyrhizobium/Bradyrhizobium_ORS.tgz',
        'name': 'Bradyrhizobium_ORS',
        'enid': '57bb97fff1e3f40053fe111f'
      },
      {
        'path': 'chinacdc:/ANI/Bradyrhizobium/Bradyrhizobium_S23321.tgz',
        'name': 'Bradyrhizobium_S23321',
        'enid': '57bb97f3f1e3f4004efe106d'
      },
      {
        'path': 'chinacdc:/ANI/Bradyrhizobium/Bradyrhizobium_japonicum.tgz',
        'name': 'Bradyrhizobium_japonicum',
        'enid': '57bb97d4f1e3f4003ffe0f39'
      }
    ]
  },
  {
    'name': 'Brevibacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Brevibacillus/Brevibacillus_brevis.tgz',
        'name': 'Brevibacillus_brevis',
        'enid': '57bba22df1e3f40046fe1003'
      }
    ]
  },
  {
    'name': 'Brevundimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Brevundimonas/Brevundimonas_subvibrioides.tgz',
        'name': 'Brevundimonas_subvibrioides',
        'enid': '57bbcd80f1e3f40040fe1119'
      }
    ]
  },
  {
    'name': 'Brucella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_abortus.tgz',
        'name': 'Brucella_abortus',
        'enid': '57bba847f1e3f40058fe11ae'
      },
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_canis.tgz',
        'name': 'Brucella_canis',
        'enid': '57bba85cf1e3f40053fe126d'
      },
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_ceti.tgz',
        'name': 'Brucella_ceti',
        'enid': '57bba8a0f1e3f4005cfe11f9'
      },
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_melitensis.tgz',
        'name': 'Brucella_melitensis',
        'enid': '57bba870f1e3f40053fe1271'
      },
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_microti.tgz',
        'name': 'Brucella_microti',
        'enid': '57bba866f1e3f40051fe1027'
      },
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_ovis.tgz',
        'name': 'Brucella_ovis',
        'enid': '57bba898f1e3f4004efe1159'
      },
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_pinnipedialis.tgz',
        'name': 'Brucella_pinnipedialis',
        'enid': '57bba855f1e3f40057fe108d'
      },
      {
        'path': 'chinacdc:/ANI/Brucella/Brucella_suis.tgz',
        'name': 'Brucella_suis',
        'enid': '57bba886f1e3f4003bfe0f4f'
      }
    ]
  },
  {
    'name': 'Buchnera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Buchnera/Buchnera_aphidicola.tgz',
        'name': 'Buchnera_aphidicola',
        'enid': '57bb9eb7f1e3f40058fe110b'
      }
    ]
  },
  {
    'name': 'Burkholderia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_383.tgz',
        'name': 'Burkholderia_383',
        'enid': '57bbc794f1e3f40057fe1362'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_CCGE1001.tgz',
        'name': 'Burkholderia_CCGE1001',
        'enid': '57bbc78af1e3f40058fe15ed'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_CCGE1002.tgz',
        'name': 'Burkholderia_CCGE1002',
        'enid': '57bbc736f1e3f40058fe15ad'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_CCGE1003.tgz',
        'name': 'Burkholderia_CCGE1003',
        'enid': '57bbc7e3f1e3f4004efe13e9'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_KJ006.tgz',
        'name': 'Burkholderia_KJ006',
        'enid': '57bbc7edf1e3f4003bfe0fdd'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_RPE64.tgz',
        'name': 'Burkholderia_RPE64',
        'enid': '57bbc7cdf1e3f40046fe118e'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_YI23.tgz',
        'name': 'Burkholderia_YI23',
        'enid': '57bbc7acf1e3f40051fe1218'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_ambifaria.tgz',
        'name': 'Burkholderia_ambifaria',
        'enid': '57bbc7f7f1e3f40043fe0ff8'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_cenocepacia.tgz',
        'name': 'Burkholderia_cenocepacia',
        'enid': '57bbc80af1e3f40058fe1611'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_cepacia.tgz',
        'name': 'Burkholderia_cepacia',
        'enid': '57bbc7c3f1e3f4004afe11a7'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_gladioli.tgz',
        'name': 'Burkholderia_gladioli',
        'enid': '57bbc7a0f1e3f40053fe1819'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_glumae.tgz',
        'name': 'Burkholderia_glumae',
        'enid': '57bbc838f1e3f4004efe1409'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_mallei.tgz',
        'name': 'Burkholderia_mallei',
        'enid': '57bbc842f1e3f4003bfe0fec'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_multivorans.tgz',
        'name': 'Burkholderia_multivorans',
        'enid': '57bbc724f1e3f40053fe17d6'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_phenoliruptrix.tgz',
        'name': 'Burkholderia_phenoliruptrix',
        'enid': '57bbc7baf1e3f40057fe136a'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_phymatum.tgz',
        'name': 'Burkholderia_phymatum',
        'enid': '57bbc718f1e3f40059fe178d'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_phytofirmans.tgz',
        'name': 'Burkholderia_phytofirmans',
        'enid': '57bbc82cf1e3f4004efe1401'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_pseudomallei.tgz',
        'name': 'Burkholderia_pseudomallei',
        'enid': '57bbc750f1e3f40059fe17c8'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_rhizoxinica.tgz',
        'name': 'Burkholderia_rhizoxinica',
        'enid': '57bbc86af1e3f40059fe1831'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_thailandensis.tgz',
        'name': 'Burkholderia_thailandensis',
        'enid': '57bbc85af1e3f40053fe1859'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_vietnamiensis.tgz',
        'name': 'Burkholderia_vietnamiensis',
        'enid': '57bbc742f1e3f40053fe17e9'
      },
      {
        'path': 'chinacdc:/ANI/Burkholderia/Burkholderia_xenovorans.tgz',
        'name': 'Burkholderia_xenovorans',
        'enid': '57bbc7d7f1e3f4004efe13e5'
      }
    ]
  },
  {
    'name': 'Butyrivibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Butyrivibrio/Butyrivibrio_fibrisolvens.tgz',
        'name': 'Butyrivibrio_fibrisolvens',
        'enid': '57bbaed5f1e3f4005cfe1293'
      },
      {
        'path': 'chinacdc:/ANI/Butyrivibrio/Butyrivibrio_proteoclasticus.tgz',
        'name': 'Butyrivibrio_proteoclasticus',
        'enid': '57bbaecef1e3f40040fe0fb4'
      }
    ]
  },
  {
    'name': 'Caldicellulosiruptor',
    'species': [
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_bescii.tgz',
        'name': 'Caldicellulosiruptor_bescii',
        'enid': '57bbc29af1e3f4005cfe1514'
      },
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_hydrothermalis.tgz',
        'name': 'Caldicellulosiruptor_hydrothermalis',
        'enid': '57bbc288f1e3f40058fe13d0'
      },
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_kristjanssonii.tgz',
        'name': 'Caldicellulosiruptor_kristjanssonii',
        'enid': '57bbc27ef1e3f40053fe159f'
      },
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_kronotskyensis.tgz',
        'name': 'Caldicellulosiruptor_kronotskyensis',
        'enid': '57bbc290f1e3f4004efe12ce'
      },
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_lactoaceticus.tgz',
        'name': 'Caldicellulosiruptor_lactoaceticus',
        'enid': '57bbc2b5f1e3f40051fe112f'
      },
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_obsidiansis.tgz',
        'name': 'Caldicellulosiruptor_obsidiansis',
        'enid': '57bbc275f1e3f40051fe112b'
      },
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_owensensis.tgz',
        'name': 'Caldicellulosiruptor_owensensis',
        'enid': '57bbc2abf1e3f4005cfe151c'
      },
      {
        'path': 'chinacdc:/ANI/Caldicellulosiruptor/Caldicellulosiruptor_saccharolyticus.tgz',
        'name': 'Caldicellulosiruptor_saccharolyticus',
        'enid': '57bbc2a1f1e3f4004dfe108c'
      }
    ]
  },
  {
    'name': 'Caldilinea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Caldilinea/Caldilinea_aerophila.tgz',
        'name': 'Caldilinea_aerophila',
        'enid': '57bbd562f1e3f4004efe17c0'
      }
    ]
  },
  {
    'name': 'Caldisericum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Caldisericum/Caldisericum_exile.tgz',
        'name': 'Caldisericum_exile',
        'enid': '57bba83ff1e3f4005cfe11f5'
      }
    ]
  },
  {
    'name': 'Caldisphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Caldisphaera/Caldisphaera_lagunensis.tgz',
        'name': 'Caldisphaera_lagunensis',
        'enid': '57bbd105f1e3f40058fe188a'
      }
    ]
  },
  {
    'name': 'Calditerrivibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Calditerrivibrio/Calditerrivibrio_nitroreducens.tgz',
        'name': 'Calditerrivibrio_nitroreducens',
        'enid': '57bbad6cf1e3f40053fe12e6'
      }
    ]
  },
  {
    'name': 'Caldivirga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Caldivirga/Caldivirga_maquilingensis.tgz',
        'name': 'Caldivirga_maquilingensis',
        'enid': '57bb9abcf1e3f4004afe0f84'
      }
    ]
  },
  {
    'name': 'Calothrix',
    'species': [
      {
        'path': 'chinacdc:/ANI/Calothrix/Calothrix_PCC.tgz',
        'name': 'Calothrix_PCC',
        'enid': '57bbc142f1e3f4004efe129d'
      }
    ]
  },
  {
    'name': 'Campylobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_03.tgz',
        'name': 'Campylobacter_03',
        'enid': '57bbc8c2f1e3f40040fe10a2'
      },
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_coli.tgz',
        'name': 'Campylobacter_coli',
        'enid': '57bbc8a9f1e3f40047fe1084'
      },
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_concisus.tgz',
        'name': 'Campylobacter_concisus',
        'enid': '57bbc8f1f1e3f4004dfe1152'
      },
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_curvus.tgz',
        'name': 'Campylobacter_curvus',
        'enid': '57bbc8caf1e3f40053fe1898'
      },
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_fetus.tgz',
        'name': 'Campylobacter_fetus',
        'enid': '57bbc8b3f1e3f40046fe11aa'
      },
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_hominis.tgz',
        'name': 'Campylobacter_hominis',
        'enid': '57bbc8baf1e3f40053fe1890'
      },
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_jejuni.tgz',
        'name': 'Campylobacter_jejuni',
        'enid': '57bbc8d3f1e3f4005cfe1b58'
      },
      {
        'path': 'chinacdc:/ANI/Campylobacter/Campylobacter_lari.tgz',
        'name': 'Campylobacter_lari',
        'enid': '57bbc8a1f1e3f4004afe11c6'
      }
    ]
  },
  {
    'name': 'Candidatus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Accumulibacter.tgz',
        'name': 'Candidatus_Accumulibacter',
        'enid': '57bbcc26f1e3f4004afe1220'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Amoebophilus.tgz',
        'name': 'Candidatus_Amoebophilus',
        'enid': '57bbcce9f1e3f40059fe1a0d'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Arthromitus.tgz',
        'name': 'Candidatus_Arthromitus',
        'enid': '57bbcc87f1e3f40058fe171b'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Azobacteroides.tgz',
        'name': 'Candidatus_Azobacteroides',
        'enid': '57bbccdbf1e3f40059fe1a05'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Blochmannia.tgz',
        'name': 'Candidatus_Blochmannia',
        'enid': '57bbcd07f1e3f40059fe1a11'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Caldiarchaeum.tgz',
        'name': 'Candidatus_Caldiarchaeum',
        'enid': '57bbcc3ff1e3f40053fe1a0d'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Carsonella.tgz',
        'name': 'Candidatus_Carsonella',
        'enid': '57bbccd6f1e3f40057fe1482'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Chloracidobacterium.tgz',
        'name': 'Candidatus_Chloracidobacterium',
        'enid': '57bbcd24f1e3f4004efe1526'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Cloacamonas.tgz',
        'name': 'Candidatus_Cloacamonas',
        'enid': '57bbcc64f1e3f40058fe170f'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Desulforudis.tgz',
        'name': 'Candidatus_Desulforudis',
        'enid': '57bbcc03f1e3f40059fe1997'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Hamiltonella.tgz',
        'name': 'Candidatus_Hamiltonella',
        'enid': '57bbcc98f1e3f4005cfe24b8'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Hodgkinia.tgz',
        'name': 'Candidatus_Hodgkinia',
        'enid': '57bbcbfdf1e3f40051fe12b3'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Kinetoplastibacterium.tgz',
        'name': 'Candidatus_Kinetoplastibacterium',
        'enid': '57bbcc14f1e3f40053fe1a05'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Korarchaeum.tgz',
        'name': 'Candidatus_Korarchaeum',
        'enid': '57bbcc78f1e3f40046fe1245'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Koribacter.tgz',
        'name': 'Candidatus_Koribacter',
        'enid': '57bbcc5af1e3f40057fe1467'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Liberibacter.tgz',
        'name': 'Candidatus_Liberibacter',
        'enid': '57bbcc1ef1e3f40059fe19ab'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Methylomirabilis.tgz',
        'name': 'Candidatus_Methylomirabilis',
        'enid': '57bbccf0f1e3f40053fe1a39'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Midichloria.tgz',
        'name': 'Candidatus_Midichloria',
        'enid': '57bbccd0f1e3f40058fe172f'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Moranella.tgz',
        'name': 'Candidatus_Moranella',
        'enid': '57bbcca6f1e3f40051fe12c7'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Mycoplasma.tgz',
        'name': 'Candidatus_Mycoplasma',
        'enid': '57bbcd02f1e3f4004dfe11b4'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Nasuia.tgz',
        'name': 'Candidatus_Nasuia',
        'enid': '57bbcd2ef1e3f4005cfe2623'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Nitrosopumilus.tgz',
        'name': 'Candidatus_Nitrosopumilus',
        'enid': '57bbccfaf1e3f40057fe148a'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Nitrososphaera.tgz',
        'name': 'Candidatus_Nitrososphaera',
        'enid': '57bbcc6ef1e3f40058fe1713'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Nitrospira.tgz',
        'name': 'Candidatus_Nitrospira',
        'enid': '57bbccb5f1e3f40058fe1723'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Pelagibacter.tgz',
        'name': 'Candidatus_Pelagibacter',
        'enid': '57bbccabf1e3f40057fe1476'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Phytoplasma.tgz',
        'name': 'Candidatus_Phytoplasma',
        'enid': '57bbcd11f1e3f40058fe174b'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Portiera.tgz',
        'name': 'Candidatus_Portiera',
        'enid': '57bbcc7ff1e3f40059fe19d6'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Protochlamydia.tgz',
        'name': 'Candidatus_Protochlamydia',
        'enid': '57bbcce1f1e3f40058fe1733'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Puniceispirillum.tgz',
        'name': 'Candidatus_Puniceispirillum',
        'enid': '57bbcc30f1e3f4004efe14ee'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Rickettsia.tgz',
        'name': 'Candidatus_Rickettsia',
        'enid': '57bbcc0df1e3f40059fe19a3'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Riesia.tgz',
        'name': 'Candidatus_Riesia',
        'enid': '57bbcccaf1e3f4004efe150e'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Ruthia.tgz',
        'name': 'Candidatus_Ruthia',
        'enid': '57bbcc91f1e3f40053fe1a19'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Saccharibacteria.tgz',
        'name': 'Candidatus_Saccharibacteria',
        'enid': '57bbcc39f1e3f40059fe19c2'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Saccharobacterium.tgz',
        'name': 'Candidatus_Saccharobacterium',
        'enid': '57bbcca0f1e3f40053fe1a1d'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Solibacter.tgz',
        'name': 'Candidatus_Solibacter',
        'enid': '57bbcc47f1e3f40058fe1707'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Sulcia.tgz',
        'name': 'Candidatus_Sulcia',
        'enid': '57bbcc53f1e3f40040fe110a'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Tremblaya.tgz',
        'name': 'Candidatus_Tremblaya',
        'enid': '57bbcd1ef1e3f4004efe151e'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Uzinura.tgz',
        'name': 'Candidatus_Uzinura',
        'enid': '57bbcd19f1e3f40053fe1a45'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Vesicomyosocius.tgz',
        'name': 'Candidatus_Vesicomyosocius',
        'enid': '57bbccc5f1e3f4005cfe2524'
      },
      {
        'path': 'chinacdc:/ANI/Candidatus/Candidatus_Zinderia.tgz',
        'name': 'Candidatus_Zinderia',
        'enid': '57bbccbff1e3f40058fe172b'
      }
    ]
  },
  {
    'name': 'Capnocytophaga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Capnocytophaga/Capnocytophaga_canimorsus.tgz',
        'name': 'Capnocytophaga_canimorsus',
        'enid': '57bbad7ef1e3f40058fe11f9'
      },
      {
        'path': 'chinacdc:/ANI/Capnocytophaga/Capnocytophaga_ochracea.tgz',
        'name': 'Capnocytophaga_ochracea',
        'enid': '57bbad76f1e3f4005cfe1278'
      }
    ]
  },
  {
    'name': 'Carboxydothermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Carboxydothermus/Carboxydothermus_hydrogenoformans.tgz',
        'name': 'Carboxydothermus_hydrogenoformans',
        'enid': '57bb9084f1e3f4004afe0f64'
      }
    ]
  },
  {
    'name': 'Cardinium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cardinium/Cardinium_endosymbiont.tgz',
        'name': 'Cardinium_endosymbiont',
        'enid': '57bb9356f1e3f4005cfe1057'
      }
    ]
  },
  {
    'name': 'Carnobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Carnobacterium/Carnobacterium_17.tgz',
        'name': 'Carnobacterium_17',
        'enid': '57bbd274f1e3f4004afe12ea'
      },
      {
        'path': 'chinacdc:/ANI/Carnobacterium/Carnobacterium_WN1359.tgz',
        'name': 'Carnobacterium_WN1359',
        'enid': '57bbd26af1e3f40057fe15ea'
      },
      {
        'path': 'chinacdc:/ANI/Carnobacterium/Carnobacterium_maltaromaticum.tgz',
        'name': 'Carnobacterium_maltaromaticum',
        'enid': '57bbd27ef1e3f40042fe107f'
      }
    ]
  },
  {
    'name': 'Catenulispora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Catenulispora/Catenulispora_acidiphila.tgz',
        'name': 'Catenulispora_acidiphila',
        'enid': '57bbc24ef1e3f4003bfe0f80'
      }
    ]
  },
  {
    'name': 'Caulobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Caulobacter/Caulobacter_K31.tgz',
        'name': 'Caulobacter_K31',
        'enid': '57bba2f1f1e3f40057fe1059'
      },
      {
        'path': 'chinacdc:/ANI/Caulobacter/Caulobacter_crescentus.tgz',
        'name': 'Caulobacter_crescentus',
        'enid': '57bba2faf1e3f40053fe11ed'
      },
      {
        'path': 'chinacdc:/ANI/Caulobacter/Caulobacter_segnis.tgz',
        'name': 'Caulobacter_segnis',
        'enid': '57bba306f1e3f4004afe0fbd'
      }
    ]
  },
  {
    'name': 'Cellulomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cellulomonas/Cellulomonas_fimi.tgz',
        'name': 'Cellulomonas_fimi',
        'enid': '57bb9751f1e3f40058fe107d'
      },
      {
        'path': 'chinacdc:/ANI/Cellulomonas/Cellulomonas_flavigena.tgz',
        'name': 'Cellulomonas_flavigena',
        'enid': '57bb9747f1e3f40053fe1109'
      }
    ]
  },
  {
    'name': 'Cellvibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cellvibrio/Cellvibrio_gilvus.tgz',
        'name': 'Cellvibrio_gilvus',
        'enid': '57bbb635f1e3f40035fe0f30'
      },
      {
        'path': 'chinacdc:/ANI/Cellvibrio/Cellvibrio_japonicus.tgz',
        'name': 'Cellvibrio_japonicus',
        'enid': '57bbb62cf1e3f4004efe11ed'
      }
    ]
  },
  {
    'name': 'Cenarchaeum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cenarchaeum/Cenarchaeum_symbiosum.tgz',
        'name': 'Cenarchaeum_symbiosum',
        'enid': '57bba237f1e3f40053fe11c9'
      }
    ]
  },
  {
    'name': 'Chamaesiphon',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chamaesiphon/Chamaesiphon_PCC.tgz',
        'name': 'Chamaesiphon_PCC',
        'enid': '57bbc5e4f1e3f40046fe1163'
      }
    ]
  },
  {
    'name': 'Chelativorans',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chelativorans/Chelativorans_BNC1.tgz',
        'name': 'Chelativorans_BNC1',
        'enid': '57bba6a8f1e3f4005cfe11c9'
      }
    ]
  },
  {
    'name': 'Chitinophaga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chitinophaga/Chitinophaga_pinensis.tgz',
        'name': 'Chitinophaga_pinensis',
        'enid': '57bbaf74f1e3f40053fe1315'
      }
    ]
  },
  {
    'name': 'Chlamydia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chlamydia/Chlamydia_muridarum.tgz',
        'name': 'Chlamydia_muridarum',
        'enid': '57bb9608f1e3f40057fe0fc7'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydia/Chlamydia_pecorum.tgz',
        'name': 'Chlamydia_pecorum',
        'enid': '57bb960df1e3f4004efe1047'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydia/Chlamydia_psittaci.tgz',
        'name': 'Chlamydia_psittaci',
        'enid': '57bb9617f1e3f40059fe10a6'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydia/Chlamydia_trachomatis.tgz',
        'name': 'Chlamydia_trachomatis',
        'enid': '57bb95b5f1e3f40047fe0f62'
      }
    ]
  },
  {
    'name': 'Chlamydophila',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chlamydophila/Chlamydophila_abortus.tgz',
        'name': 'Chlamydophila_abortus',
        'enid': '57bbbd00f1e3f4004efe1248'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydophila/Chlamydophila_caviae.tgz',
        'name': 'Chlamydophila_caviae',
        'enid': '57bbbd16f1e3f40051fe10b1'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydophila/Chlamydophila_felis.tgz',
        'name': 'Chlamydophila_felis',
        'enid': '57bbbcebf1e3f4005cfe13c2'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydophila/Chlamydophila_pecorum.tgz',
        'name': 'Chlamydophila_pecorum',
        'enid': '57bbbcfbf1e3f40058fe129d'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydophila/Chlamydophila_pneumoniae.tgz',
        'name': 'Chlamydophila_pneumoniae',
        'enid': '57bbbcf1f1e3f40057fe117b'
      },
      {
        'path': 'chinacdc:/ANI/Chlamydophila/Chlamydophila_psittaci.tgz',
        'name': 'Chlamydophila_psittaci',
        'enid': '57bbbd08f1e3f40046fe1085'
      }
    ]
  },
  {
    'name': 'Chlorobaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chlorobaculum/Chlorobaculum_parvum.tgz',
        'name': 'Chlorobaculum_parvum',
        'enid': '57bbc001f1e3f4005cfe1450'
      }
    ]
  },
  {
    'name': 'Chlorobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chlorobium/Chlorobium_chlorochromatii.tgz',
        'name': 'Chlorobium_chlorochromatii',
        'enid': '57bb92a2f1e3f40053fe10a6'
      },
      {
        'path': 'chinacdc:/ANI/Chlorobium/Chlorobium_limicola.tgz',
        'name': 'Chlorobium_limicola',
        'enid': '57bb928ff1e3f40059fe1045'
      },
      {
        'path': 'chinacdc:/ANI/Chlorobium/Chlorobium_luteolum.tgz',
        'name': 'Chlorobium_luteolum',
        'enid': '57bb9299f1e3f40053fe10a2'
      },
      {
        'path': 'chinacdc:/ANI/Chlorobium/Chlorobium_phaeobacteroides.tgz',
        'name': 'Chlorobium_phaeobacteroides',
        'enid': '57bb92b4f1e3f40059fe1049'
      },
      {
        'path': 'chinacdc:/ANI/Chlorobium/Chlorobium_phaeovibrioides.tgz',
        'name': 'Chlorobium_phaeovibrioides',
        'enid': '57bb92acf1e3f40053fe10aa'
      },
      {
        'path': 'chinacdc:/ANI/Chlorobium/Chlorobium_tepidum.tgz',
        'name': 'Chlorobium_tepidum',
        'enid': '57bb92bdf1e3f40046fe0f83'
      }
    ]
  },
  {
    'name': 'Chloroflexus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chloroflexus/Chloroflexus_Y.tgz',
        'name': 'Chloroflexus_Y',
        'enid': '57bbd190f1e3f4005cfe315b'
      },
      {
        'path': 'chinacdc:/ANI/Chloroflexus/Chloroflexus_aggregans.tgz',
        'name': 'Chloroflexus_aggregans',
        'enid': '57bbd186f1e3f40053fe1c0b'
      },
      {
        'path': 'chinacdc:/ANI/Chloroflexus/Chloroflexus_aurantiacus.tgz',
        'name': 'Chloroflexus_aurantiacus',
        'enid': '57bbd17cf1e3f40040fe116a'
      }
    ]
  },
  {
    'name': 'Chloroherpeton',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chloroherpeton/Chloroherpeton_thalassium.tgz',
        'name': 'Chloroherpeton_thalassium',
        'enid': '57bba029f1e3f40053fe1194'
      }
    ]
  },
  {
    'name': 'Chromobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chromobacterium/Chromobacterium_violaceum.tgz',
        'name': 'Chromobacterium_violaceum',
        'enid': '57bbc065f1e3f40059fe1447'
      }
    ]
  },
  {
    'name': 'Chromohalobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chromohalobacter/Chromohalobacter_salexigens.tgz',
        'name': 'Chromohalobacter_salexigens',
        'enid': '57bbca1bf1e3f40046fe11dd'
      }
    ]
  },
  {
    'name': 'Chroococcidiopsis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chroococcidiopsis/Chroococcidiopsis_thermalis.tgz',
        'name': 'Chroococcidiopsis_thermalis',
        'enid': '57bb967ef1e3f40059fe10b1'
      }
    ]
  },
  {
    'name': 'Chthonomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Chthonomonas/Chthonomonas_calidirosea.tgz',
        'name': 'Chthonomonas_calidirosea',
        'enid': '57bbcb20f1e3f40046fe120f'
      }
    ]
  },
  {
    'name': 'Citrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Citrobacter/Citrobacter_koseri.tgz',
        'name': 'Citrobacter_koseri',
        'enid': '57bb9dd0f1e3f40059fe1148'
      },
      {
        'path': 'chinacdc:/ANI/Citrobacter/Citrobacter_rodentium.tgz',
        'name': 'Citrobacter_rodentium',
        'enid': '57bb9ddbf1e3f40040fe0f78'
      }
    ]
  },
  {
    'name': 'Clavibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Clavibacter/Clavibacter_michiganensis.tgz',
        'name': 'Clavibacter_michiganensis',
        'enid': '57bbad44f1e3f4004dfe0ff2'
      }
    ]
  },
  {
    'name': 'Clostridiales',
    'species': [
      {
        'path': 'chinacdc:/ANI/Clostridiales/Clostridiales_genomosp.tgz',
        'name': 'Clostridiales_genomosp',
        'enid': '57bb97b0f1e3f4005cfe10a4'
      }
    ]
  },
  {
    'name': 'Clostridium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_BNL1100.tgz',
        'name': 'Clostridium_BNL1100',
        'enid': '57bba4fbf1e3f40053fe1218'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_SY8519.tgz',
        'name': 'Clostridium_SY8519',
        'enid': '57bba625f1e3f40053fe1236'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_acetobutylicum.tgz',
        'name': 'Clostridium_acetobutylicum',
        'enid': '57bba544f1e3f40059fe11b9'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_acidurici.tgz',
        'name': 'Clostridium_acidurici',
        'enid': '57bba505f1e3f40053fe121c'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_autoethanogenum.tgz',
        'name': 'Clostridium_autoethanogenum',
        'enid': '57bba5f4f1e3f40059fe11c2'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_beijerinckii.tgz',
        'name': 'Clostridium_beijerinckii',
        'enid': '57bba5ebf1e3f40058fe1184'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_botulinum.tgz',
        'name': 'Clostridium_botulinum',
        'enid': '57bba55ff1e3f40053fe1227'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_cellulolyticum.tgz',
        'name': 'Clostridium_cellulolyticum',
        'enid': '57bba5e1f1e3f40053fe122f'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_cellulovorans.tgz',
        'name': 'Clostridium_cellulovorans',
        'enid': '57bba5bdf1e3f40059fe11be'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_cf.tgz',
        'name': 'Clostridium_cf',
        'enid': '57bba4f2f1e3f40053fe1214'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_clariflavum.tgz',
        'name': 'Clostridium_clariflavum',
        'enid': '57bba5a7f1e3f40058fe1175'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_difficile.tgz',
        'name': 'Clostridium_difficile',
        'enid': '57bba5c7f1e3f40058fe1180'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_kluyveri.tgz',
        'name': 'Clostridium_kluyveri',
        'enid': '57bba591f1e3f40053fe122b'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_lentocellum.tgz',
        'name': 'Clostridium_lentocellum',
        'enid': '57bba608f1e3f4004dfe0fc5'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_ljungdahlii.tgz',
        'name': 'Clostridium_ljungdahlii',
        'enid': '57bba61bf1e3f40043fe0f49'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_novyi.tgz',
        'name': 'Clostridium_novyi',
        'enid': '57bba4eaf1e3f40057fe1063'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_pasteurianum.tgz',
        'name': 'Clostridium_pasteurianum',
        'enid': '57bba50ff1e3f40053fe1220'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_perfringens.tgz',
        'name': 'Clostridium_perfringens',
        'enid': '57bba523f1e3f40043fe0f45'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_phytofermentans.tgz',
        'name': 'Clostridium_phytofermentans',
        'enid': '57bba531f1e3f40058fe1171'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_saccharobutylicum.tgz',
        'name': 'Clostridium_saccharobutylicum',
        'enid': '57bba59df1e3f4004dfe0fc1'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_saccharolyticum.tgz',
        'name': 'Clostridium_saccharolyticum',
        'enid': '57bba53bf1e3f40046fe101a'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_saccharoperbutylacetonicum.tgz',
        'name': 'Clostridium_saccharoperbutylacetonicum',
        'enid': '57bba5b1f1e3f40058fe1179'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_stercorarium.tgz',
        'name': 'Clostridium_stercorarium',
        'enid': '57bba612f1e3f4003bfe0f49'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_sticklandii.tgz',
        'name': 'Clostridium_sticklandii',
        'enid': '57bba5fef1e3f40058fe1188'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_tetani.tgz',
        'name': 'Clostridium_tetani',
        'enid': '57bba519f1e3f4005cfe11ba'
      },
      {
        'path': 'chinacdc:/ANI/Clostridium/Clostridium_thermocellum.tgz',
        'name': 'Clostridium_thermocellum',
        'enid': '57bba554f1e3f4004efe1115'
      }
    ]
  },
  {
    'name': 'Collimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Collimonas/Collimonas_fungivorans.tgz',
        'name': 'Collimonas_fungivorans',
        'enid': '57bbc2e6f1e3f4005cfe152f'
      }
    ]
  },
  {
    'name': 'Colwellia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Colwellia/Colwellia_psychrerythraea.tgz',
        'name': 'Colwellia_psychrerythraea',
        'enid': '57bbae4bf1e3f40040fe0fad'
      }
    ]
  },
  {
    'name': 'Comamonadaceae',
    'species': [
      {
        'path': 'chinacdc:/ANI/Comamonadaceae/Comamonadaceae_bacterium.tgz',
        'name': 'Comamonadaceae_bacterium',
        'enid': '57bb957ff1e3f40051fe0fc5'
      }
    ]
  },
  {
    'name': 'Comamonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Comamonas/Comamonas_testosteroni.tgz',
        'name': 'Comamonas_testosteroni',
        'enid': '57bbbdfbf1e3f40059fe13b6'
      }
    ]
  },
  {
    'name': 'Conexibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Conexibacter/Conexibacter_woesei.tgz',
        'name': 'Conexibacter_woesei',
        'enid': '57bba033f1e3f40053fe119b'
      }
    ]
  },
  {
    'name': 'Coprococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Coprococcus/Coprococcus_ART55.tgz',
        'name': 'Coprococcus_ART55',
        'enid': '57bbaf18f1e3f40059fe1280'
      },
      {
        'path': 'chinacdc:/ANI/Coprococcus/Coprococcus_catus.tgz',
        'name': 'Coprococcus_catus',
        'enid': '57bbaf22f1e3f4005cfe12af'
      }
    ]
  },
  {
    'name': 'Coprothermobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Coprothermobacter/Coprothermobacter_proteolyticus.tgz',
        'name': 'Coprothermobacter_proteolyticus',
        'enid': '57bb9024f1e3f40042fe0f5a'
      }
    ]
  },
  {
    'name': 'Coraliomargarita',
    'species': [
      {
        'path': 'chinacdc:/ANI/Coraliomargarita/Coraliomargarita_akajimensis.tgz',
        'name': 'Coraliomargarita_akajimensis',
        'enid': '57bbd2adf1e3f40058fe1913'
      }
    ]
  },
  {
    'name': 'Corallococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Corallococcus/Corallococcus_coralloides.tgz',
        'name': 'Corallococcus_coralloides',
        'enid': '57bbc009f1e3f40057fe11ca'
      }
    ]
  },
  {
    'name': 'Coriobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Coriobacterium/Coriobacterium_glomerans.tgz',
        'name': 'Coriobacterium_glomerans',
        'enid': '57bbae11f1e3f4004afe0ffa'
      }
    ]
  },
  {
    'name': 'Corynebacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_argentoratense.tgz',
        'name': 'Corynebacterium_argentoratense',
        'enid': '57bbb58bf1e3f4004efe11db'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_aurimucosum.tgz',
        'name': 'Corynebacterium_aurimucosum',
        'enid': '57bbb561f1e3f40059fe12dc'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_callunae.tgz',
        'name': 'Corynebacterium_callunae',
        'enid': '57bbb574f1e3f40057fe10f3'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_diphtheriae.tgz',
        'name': 'Corynebacterium_diphtheriae',
        'enid': '57bbb45df1e3f40047fe0fb7'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_efficiens.tgz',
        'name': 'Corynebacterium_efficiens',
        'enid': '57bbb509f1e3f4004efe11cf'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_glutamicum.tgz',
        'name': 'Corynebacterium_glutamicum',
        'enid': '57bbb547f1e3f40053fe1381'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_halotolerans.tgz',
        'name': 'Corynebacterium_halotolerans',
        'enid': '57bbb4e7f1e3f40053fe1378'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_jeikeium.tgz',
        'name': 'Corynebacterium_jeikeium',
        'enid': '57bbb57cf1e3f4004dfe1013'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_kroppenstedtii.tgz',
        'name': 'Corynebacterium_kroppenstedtii',
        'enid': '57bbb584f1e3f4004efe11d7'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_maris.tgz',
        'name': 'Corynebacterium_maris',
        'enid': '57bbb56af1e3f4005cfe1312'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_pseudotuberculosis.tgz',
        'name': 'Corynebacterium_pseudotuberculosis',
        'enid': '57bbb51df1e3f4005cfe130e'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_resistens.tgz',
        'name': 'Corynebacterium_resistens',
        'enid': '57bbb501f1e3f40059fe12d2'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_terpenotabidum.tgz',
        'name': 'Corynebacterium_terpenotabidum',
        'enid': '57bbb53ff1e3f4004efe11d3'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_ulcerans.tgz',
        'name': 'Corynebacterium_ulcerans',
        'enid': '57bbb4adf1e3f40058fe1223'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_urealyticum.tgz',
        'name': 'Corynebacterium_urealyticum',
        'enid': '57bbb512f1e3f40057fe10ef'
      },
      {
        'path': 'chinacdc:/ANI/Corynebacterium/Corynebacterium_variabile.tgz',
        'name': 'Corynebacterium_variabile',
        'enid': '57bbb4f7f1e3f40053fe137c'
      }
    ]
  },
  {
    'name': 'Coxiella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Coxiella/Coxiella_burnetii.tgz',
        'name': 'Coxiella_burnetii',
        'enid': '57bba2bbf1e3f40059fe118c'
      }
    ]
  },
  {
    'name': 'Crinalium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Crinalium/Crinalium_epipsammum.tgz',
        'name': 'Crinalium_epipsammum',
        'enid': '57bb93b8f1e3f4005cfe105e'
      }
    ]
  },
  {
    'name': 'Croceibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Croceibacter/Croceibacter_atlanticus.tgz',
        'name': 'Croceibacter_atlanticus',
        'enid': '57bbcae9f1e3f40040fe10e3'
      }
    ]
  },
  {
    'name': 'Cronobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cronobacter/Cronobacter_sakazakii.tgz',
        'name': 'Cronobacter_sakazakii',
        'enid': '57bb955af1e3f40059fe1097'
      },
      {
        'path': 'chinacdc:/ANI/Cronobacter/Cronobacter_turicensis.tgz',
        'name': 'Cronobacter_turicensis',
        'enid': '57bb956df1e3f40047fe0f5b'
      }
    ]
  },
  {
    'name': 'Cryptobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cryptobacterium/Cryptobacterium_curtum.tgz',
        'name': 'Cryptobacterium_curtum',
        'enid': '57bbd541f1e3f40058fe1a08'
      }
    ]
  },
  {
    'name': 'Cupriavidus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cupriavidus/Cupriavidus_metallidurans.tgz',
        'name': 'Cupriavidus_metallidurans',
        'enid': '57bbce03f1e3f40058fe1787'
      },
      {
        'path': 'chinacdc:/ANI/Cupriavidus/Cupriavidus_necator.tgz',
        'name': 'Cupriavidus_necator',
        'enid': '57bbcdf7f1e3f40058fe1783'
      },
      {
        'path': 'chinacdc:/ANI/Cupriavidus/Cupriavidus_taiwanensis.tgz',
        'name': 'Cupriavidus_taiwanensis',
        'enid': '57bbcdedf1e3f40046fe1258'
      }
    ]
  },
  {
    'name': 'Cyanobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cyanobacterium/Cyanobacterium_PCC.tgz',
        'name': 'Cyanobacterium_PCC',
        'enid': '57bbce1ff1e3f4004efe1588'
      },
      {
        'path': 'chinacdc:/ANI/Cyanobacterium/Cyanobacterium_stanieri.tgz',
        'name': 'Cyanobacterium_stanieri',
        'enid': '57bbce29f1e3f4004afe125b'
      }
    ]
  },
  {
    'name': 'Cyanobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cyanobium/Cyanobium_gracile.tgz',
        'name': 'Cyanobium_gracile',
        'enid': '57bbc2bef1e3f40058fe13d7'
      }
    ]
  },
  {
    'name': 'Cyanothece',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cyanothece/Cyanothece_ATCC.tgz',
        'name': 'Cyanothece_ATCC',
        'enid': '57bb9aa7f1e3f4004efe108f'
      },
      {
        'path': 'chinacdc:/ANI/Cyanothece/Cyanothece_PCC.tgz',
        'name': 'Cyanothece_PCC',
        'enid': '57bb9a87f1e3f40059fe10e2'
      }
    ]
  },
  {
    'name': 'Cyclobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cyclobacterium/Cyclobacterium_marinum.tgz',
        'name': 'Cyclobacterium_marinum',
        'enid': '57bbc930f1e3f4004efe143a'
      }
    ]
  },
  {
    'name': 'Cycloclasticus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cycloclasticus/Cycloclasticus_P1.tgz',
        'name': 'Cycloclasticus_P1',
        'enid': '57bbd019f1e3f40053fe1b6e'
      },
      {
        'path': 'chinacdc:/ANI/Cycloclasticus/Cycloclasticus_zancles.tgz',
        'name': 'Cycloclasticus_zancles',
        'enid': '57bbd021f1e3f40058fe1840'
      }
    ]
  },
  {
    'name': 'Cylindrospermum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cylindrospermum/Cylindrospermum_stagnale.tgz',
        'name': 'Cylindrospermum_stagnale',
        'enid': '57bbae5ef1e3f40053fe1303'
      }
    ]
  },
  {
    'name': 'Cytophaga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Cytophaga/Cytophaga_hutchinsonii.tgz',
        'name': 'Cytophaga_hutchinsonii',
        'enid': '57bba91cf1e3f4005cfe120b'
      }
    ]
  },
  {
    'name': 'Dactylococcopsis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dactylococcopsis/Dactylococcopsis_salina.tgz',
        'name': 'Dactylococcopsis_salina',
        'enid': '57bbd325f1e3f4005cfe35bf'
      }
    ]
  },
  {
    'name': 'Dechloromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dechloromonas/Dechloromonas_aromatica.tgz',
        'name': 'Dechloromonas_aromatica',
        'enid': '57bbaa58f1e3f40059fe1228'
      }
    ]
  },
  {
    'name': 'Dechlorosoma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dechlorosoma/Dechlorosoma_suillum.tgz',
        'name': 'Dechlorosoma_suillum',
        'enid': '57bbbfb0f1e3f40059fe140e'
      }
    ]
  },
  {
    'name': 'Deferribacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Deferribacter/Deferribacter_desulfuricans.tgz',
        'name': 'Deferribacter_desulfuricans',
        'enid': '57bbaa49f1e3f40058fe11d3'
      }
    ]
  },
  {
    'name': 'Dehalobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dehalobacter/Dehalobacter_11DCA.tgz',
        'name': 'Dehalobacter_11DCA',
        'enid': '57bbc12ef1e3f4005cfe14b5'
      },
      {
        'path': 'chinacdc:/ANI/Dehalobacter/Dehalobacter_CF.tgz',
        'name': 'Dehalobacter_CF',
        'enid': '57bbc138f1e3f40041fe0f7c'
      }
    ]
  },
  {
    'name': 'Dehalococcoides',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dehalococcoides/Dehalococcoides_BAV1.tgz',
        'name': 'Dehalococcoides_BAV1',
        'enid': '57bb9d8ff1e3f4005cfe1140'
      },
      {
        'path': 'chinacdc:/ANI/Dehalococcoides/Dehalococcoides_CBDB1.tgz',
        'name': 'Dehalococcoides_CBDB1',
        'enid': '57bb9dabf1e3f40058fe10e6'
      },
      {
        'path': 'chinacdc:/ANI/Dehalococcoides/Dehalococcoides_GT.tgz',
        'name': 'Dehalococcoides_GT',
        'enid': '57bb9da3f1e3f4005cfe1144'
      },
      {
        'path': 'chinacdc:/ANI/Dehalococcoides/Dehalococcoides_VS.tgz',
        'name': 'Dehalococcoides_VS',
        'enid': '57bb9d86f1e3f4005cfe113c'
      },
      {
        'path': 'chinacdc:/ANI/Dehalococcoides/Dehalococcoides_ethenogenes.tgz',
        'name': 'Dehalococcoides_ethenogenes',
        'enid': '57bb9d7ef1e3f40059fe113d'
      },
      {
        'path': 'chinacdc:/ANI/Dehalococcoides/Dehalococcoides_mccartyi.tgz',
        'name': 'Dehalococcoides_mccartyi',
        'enid': '57bb9d97f1e3f40040fe0f74'
      }
    ]
  },
  {
    'name': 'Dehalogenimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dehalogenimonas/Dehalogenimonas_lykanthroporepellens.tgz',
        'name': 'Dehalogenimonas_lykanthroporepellens',
        'enid': '57bbc01ef1e3f4005cfe1457'
      }
    ]
  },
  {
    'name': 'Deinococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Deinococcus/Deinococcus_deserti.tgz',
        'name': 'Deinococcus_deserti',
        'enid': '57bbd213f1e3f40051fe137f'
      },
      {
        'path': 'chinacdc:/ANI/Deinococcus/Deinococcus_geothermalis.tgz',
        'name': 'Deinococcus_geothermalis',
        'enid': '57bbd22ef1e3f4005cfe3307'
      },
      {
        'path': 'chinacdc:/ANI/Deinococcus/Deinococcus_gobiensis.tgz',
        'name': 'Deinococcus_gobiensis',
        'enid': '57bbd21cf1e3f4004afe12cf'
      },
      {
        'path': 'chinacdc:/ANI/Deinococcus/Deinococcus_maricopensis.tgz',
        'name': 'Deinococcus_maricopensis',
        'enid': '57bbd20bf1e3f40053fe1c41'
      },
      {
        'path': 'chinacdc:/ANI/Deinococcus/Deinococcus_peraridilitoris.tgz',
        'name': 'Deinococcus_peraridilitoris',
        'enid': '57bbd1f7f1e3f4005cfe3279'
      },
      {
        'path': 'chinacdc:/ANI/Deinococcus/Deinococcus_proteolyticus.tgz',
        'name': 'Deinococcus_proteolyticus',
        'enid': '57bbd201f1e3f4004afe12ca'
      },
      {
        'path': 'chinacdc:/ANI/Deinococcus/Deinococcus_radiodurans.tgz',
        'name': 'Deinococcus_radiodurans',
        'enid': '57bbd226f1e3f40047fe1116'
      }
    ]
  },
  {
    'name': 'Delftia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Delftia/Delftia_Cs1.tgz',
        'name': 'Delftia_Cs1',
        'enid': '57bbae22f1e3f40059fe126b'
      },
      {
        'path': 'chinacdc:/ANI/Delftia/Delftia_acidovorans.tgz',
        'name': 'Delftia_acidovorans',
        'enid': '57bbae2cf1e3f4004dfe0ff6'
      }
    ]
  },
  {
    'name': 'Denitrovibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Denitrovibrio/Denitrovibrio_acetiphilus.tgz',
        'name': 'Denitrovibrio_acetiphilus',
        'enid': '57bbb6fdf1e3f40059fe130e'
      }
    ]
  },
  {
    'name': 'Desulfarculus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfarculus/Desulfarculus_baarsii.tgz',
        'name': 'Desulfarculus_baarsii',
        'enid': '57bbbdc2f1e3f4005cfe13f6'
      }
    ]
  },
  {
    'name': 'Desulfatibacillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfatibacillum/Desulfatibacillum_alkenivorans.tgz',
        'name': 'Desulfatibacillum_alkenivorans',
        'enid': '57bbd1edf1e3f40058fe18d6'
      }
    ]
  },
  {
    'name': 'Desulfitobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfitobacterium/Desulfitobacterium_dehalogenans.tgz',
        'name': 'Desulfitobacterium_dehalogenans',
        'enid': '57bbadf3f1e3f40053fe12ea'
      },
      {
        'path': 'chinacdc:/ANI/Desulfitobacterium/Desulfitobacterium_dichloroeliminans.tgz',
        'name': 'Desulfitobacterium_dichloroeliminans',
        'enid': '57bbadfdf1e3f4003ffe0f66'
      },
      {
        'path': 'chinacdc:/ANI/Desulfitobacterium/Desulfitobacterium_hafniense.tgz',
        'name': 'Desulfitobacterium_hafniense',
        'enid': '57bbade6f1e3f4005cfe1285'
      }
    ]
  },
  {
    'name': 'Desulfobacca',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfobacca/Desulfobacca_acetoxidans.tgz',
        'name': 'Desulfobacca_acetoxidans',
        'enid': '57bb9550f1e3f40059fe108d'
      }
    ]
  },
  {
    'name': 'Desulfobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfobacterium/Desulfobacterium_autotrophicum.tgz',
        'name': 'Desulfobacterium_autotrophicum',
        'enid': '57bbbf9ff1e3f40057fe11ae'
      }
    ]
  },
  {
    'name': 'Desulfobacula',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfobacula/Desulfobacula_toluolica.tgz',
        'name': 'Desulfobacula_toluolica',
        'enid': '57bbd1bcf1e3f4003bfe1041'
      }
    ]
  },
  {
    'name': 'Desulfobulbus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfobulbus/Desulfobulbus_propionicus.tgz',
        'name': 'Desulfobulbus_propionicus',
        'enid': '57bbaef9f1e3f40058fe1200'
      }
    ]
  },
  {
    'name': 'Desulfocapsa',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfocapsa/Desulfocapsa_sulfexigens.tgz',
        'name': 'Desulfocapsa_sulfexigens',
        'enid': '57bbd263f1e3f40051fe1386'
      }
    ]
  },
  {
    'name': 'Desulfococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfococcus/Desulfococcus_oleovorans.tgz',
        'name': 'Desulfococcus_oleovorans',
        'enid': '57bbc5eff1e3f40057fe12f3'
      }
    ]
  },
  {
    'name': 'Desulfohalobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfohalobium/Desulfohalobium_retbaense.tgz',
        'name': 'Desulfohalobium_retbaense',
        'enid': '57bbb676f1e3f40042fe0f83'
      }
    ]
  },
  {
    'name': 'Desulfomicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfomicrobium/Desulfomicrobium_baculatum.tgz',
        'name': 'Desulfomicrobium_baculatum',
        'enid': '57bbcfa8f1e3f4004efe1605'
      }
    ]
  },
  {
    'name': 'Desulfomonile',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfomonile/Desulfomonile_tiedjei.tgz',
        'name': 'Desulfomonile_tiedjei',
        'enid': '57bba6cbf1e3f4005cfe11d0'
      }
    ]
  },
  {
    'name': 'Desulfosporosinus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfosporosinus/Desulfosporosinus_acidiphilus.tgz',
        'name': 'Desulfosporosinus_acidiphilus',
        'enid': '57bbcbe2f1e3f40057fe1453'
      },
      {
        'path': 'chinacdc:/ANI/Desulfosporosinus/Desulfosporosinus_meridiei.tgz',
        'name': 'Desulfosporosinus_meridiei',
        'enid': '57bbcbf5f1e3f4004efe14d7'
      },
      {
        'path': 'chinacdc:/ANI/Desulfosporosinus/Desulfosporosinus_orientis.tgz',
        'name': 'Desulfosporosinus_orientis',
        'enid': '57bbcbecf1e3f40053fe19f5'
      }
    ]
  },
  {
    'name': 'Desulfotalea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfotalea/Desulfotalea_psychrophila.tgz',
        'name': 'Desulfotalea_psychrophila',
        'enid': '57bb9623f1e3f4005cfe1084'
      }
    ]
  },
  {
    'name': 'Desulfotomaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfotomaculum/Desulfotomaculum_acetoxidans.tgz',
        'name': 'Desulfotomaculum_acetoxidans',
        'enid': '57bba3fef1e3f40046fe100f'
      },
      {
        'path': 'chinacdc:/ANI/Desulfotomaculum/Desulfotomaculum_carboxydivorans.tgz',
        'name': 'Desulfotomaculum_carboxydivorans',
        'enid': '57bba407f1e3f40053fe1204'
      },
      {
        'path': 'chinacdc:/ANI/Desulfotomaculum/Desulfotomaculum_gibsoniae.tgz',
        'name': 'Desulfotomaculum_gibsoniae',
        'enid': '57bba42cf1e3f4004efe10fc'
      },
      {
        'path': 'chinacdc:/ANI/Desulfotomaculum/Desulfotomaculum_kuznetsovii.tgz',
        'name': 'Desulfotomaculum_kuznetsovii',
        'enid': '57bba423f1e3f40058fe116a'
      },
      {
        'path': 'chinacdc:/ANI/Desulfotomaculum/Desulfotomaculum_reducens.tgz',
        'name': 'Desulfotomaculum_reducens',
        'enid': '57bba411f1e3f40053fe1208'
      },
      {
        'path': 'chinacdc:/ANI/Desulfotomaculum/Desulfotomaculum_ruminis.tgz',
        'name': 'Desulfotomaculum_ruminis',
        'enid': '57bba41bf1e3f4004efe10f8'
      }
    ]
  },
  {
    'name': 'Desulfovibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_aespoeensis.tgz',
        'name': 'Desulfovibrio_aespoeensis',
        'enid': '57bbaa9af1e3f40058fe11df'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_africanus.tgz',
        'name': 'Desulfovibrio_africanus',
        'enid': '57bbaacaf1e3f4004afe0fe4'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_alaskensis.tgz',
        'name': 'Desulfovibrio_alaskensis',
        'enid': '57bbaaddf1e3f40059fe123d'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_desulfuricans.tgz',
        'name': 'Desulfovibrio_desulfuricans',
        'enid': '57bbaac0f1e3f4005cfe1234'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_gigas.tgz',
        'name': 'Desulfovibrio_gigas',
        'enid': '57bbaa91f1e3f40058fe11db'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_hydrothermalis.tgz',
        'name': 'Desulfovibrio_hydrothermalis',
        'enid': '57bbaa87f1e3f40041fe0f43'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_magneticus.tgz',
        'name': 'Desulfovibrio_magneticus',
        'enid': '57bbaad4f1e3f40059fe1239'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_piezophilus.tgz',
        'name': 'Desulfovibrio_piezophilus',
        'enid': '57bbaae5f1e3f40059fe1241'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_salexigens.tgz',
        'name': 'Desulfovibrio_salexigens',
        'enid': '57bbaaa4f1e3f40058fe11e3'
      },
      {
        'path': 'chinacdc:/ANI/Desulfovibrio/Desulfovibrio_vulgaris.tgz',
        'name': 'Desulfovibrio_vulgaris',
        'enid': '57bbaaaef1e3f4003bfe0f5a'
      }
    ]
  },
  {
    'name': 'Desulfurispirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfurispirillum/Desulfurispirillum_indicum.tgz',
        'name': 'Desulfurispirillum_indicum',
        'enid': '57bbcf24f1e3f4005cfe2b3b'
      }
    ]
  },
  {
    'name': 'Desulfurivibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfurivibrio/Desulfurivibrio_alkaliphilus.tgz',
        'name': 'Desulfurivibrio_alkaliphilus',
        'enid': '57bb9f92f1e3f40059fe115e'
      }
    ]
  },
  {
    'name': 'Desulfurobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfurobacterium/Desulfurobacterium_thermolithotrophum.tgz',
        'name': 'Desulfurobacterium_thermolithotrophum',
        'enid': '57bb9f0ff1e3f40058fe111c'
      }
    ]
  },
  {
    'name': 'Desulfurococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Desulfurococcus/Desulfurococcus_fermentans.tgz',
        'name': 'Desulfurococcus_fermentans',
        'enid': '57bb918ef1e3f40058fe102d'
      },
      {
        'path': 'chinacdc:/ANI/Desulfurococcus/Desulfurococcus_kamchatkensis.tgz',
        'name': 'Desulfurococcus_kamchatkensis',
        'enid': '57bb9196f1e3f4005cfe102e'
      },
      {
        'path': 'chinacdc:/ANI/Desulfurococcus/Desulfurococcus_mucosus.tgz',
        'name': 'Desulfurococcus_mucosus',
        'enid': '57bb9186f1e3f40047fe0f50'
      }
    ]
  },
  {
    'name': 'Dichelobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dichelobacter/Dichelobacter_nodosus.tgz',
        'name': 'Dichelobacter_nodosus',
        'enid': '57bbbfa9f1e3f40053fe14ab'
      }
    ]
  },
  {
    'name': 'Dickeya',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dickeya/Dickeya_dadantii.tgz',
        'name': 'Dickeya_dadantii',
        'enid': '57bba2dff1e3f40057fe1052'
      },
      {
        'path': 'chinacdc:/ANI/Dickeya/Dickeya_zeae.tgz',
        'name': 'Dickeya_zeae',
        'enid': '57bba2d5f1e3f40057fe104e'
      }
    ]
  },
  {
    'name': 'Dictyoglomus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dictyoglomus/Dictyoglomus_thermophilum.tgz',
        'name': 'Dictyoglomus_thermophilum',
        'enid': '57bbcb57f1e3f40059fe195d'
      },
      {
        'path': 'chinacdc:/ANI/Dictyoglomus/Dictyoglomus_turgidum.tgz',
        'name': 'Dictyoglomus_turgidum',
        'enid': '57bbcb5ef1e3f40057fe1444'
      }
    ]
  },
  {
    'name': 'Dinoroseobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dinoroseobacter/Dinoroseobacter_shibae.tgz',
        'name': 'Dinoroseobacter_shibae',
        'enid': '57bb9b5af1e3f40057fe0ffd'
      }
    ]
  },
  {
    'name': 'Dyadobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Dyadobacter/Dyadobacter_fermentans.tgz',
        'name': 'Dyadobacter_fermentans',
        'enid': '57bbc2c8f1e3f40058fe13de'
      }
    ]
  },
  {
    'name': 'Echinicola',
    'species': [
      {
        'path': 'chinacdc:/ANI/Echinicola/Echinicola_vietnamensis.tgz',
        'name': 'Echinicola_vietnamensis',
        'enid': '57bbd45bf1e3f4003bfe106d'
      }
    ]
  },
  {
    'name': 'Ectothiorhodospiraceae',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ectothiorhodospiraceae/Ectothiorhodospiraceae_bacterium.tgz',
        'name': 'Ectothiorhodospiraceae_bacterium',
        'enid': '57bbaf93f1e3f40059fe128e'
      }
    ]
  },
  {
    'name': 'Edwardsiella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Edwardsiella/Edwardsiella_ictaluri.tgz',
        'name': 'Edwardsiella_ictaluri',
        'enid': '57bb9a2ef1e3f4004efe108b'
      },
      {
        'path': 'chinacdc:/ANI/Edwardsiella/Edwardsiella_tarda.tgz',
        'name': 'Edwardsiella_tarda',
        'enid': '57bb9a20f1e3f40051fe0fe8'
      }
    ]
  },
  {
    'name': 'Eggerthella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Eggerthella/Eggerthella_YY7918.tgz',
        'name': 'Eggerthella_YY7918',
        'enid': '57bbb5a6f1e3f40059fe12e0'
      },
      {
        'path': 'chinacdc:/ANI/Eggerthella/Eggerthella_lenta.tgz',
        'name': 'Eggerthella_lenta',
        'enid': '57bbb59df1e3f4004efe11e2'
      }
    ]
  },
  {
    'name': 'Ehrlichia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ehrlichia/Ehrlichia_canis.tgz',
        'name': 'Ehrlichia_canis',
        'enid': '57bbaa12f1e3f4004dfe0fdd'
      },
      {
        'path': 'chinacdc:/ANI/Ehrlichia/Ehrlichia_chaffeensis.tgz',
        'name': 'Ehrlichia_chaffeensis',
        'enid': '57bbaa1df1e3f40058fe11c5'
      },
      {
        'path': 'chinacdc:/ANI/Ehrlichia/Ehrlichia_muris.tgz',
        'name': 'Ehrlichia_muris',
        'enid': '57bbaa18f1e3f40058fe11c1'
      },
      {
        'path': 'chinacdc:/ANI/Ehrlichia/Ehrlichia_ruminantium.tgz',
        'name': 'Ehrlichia_ruminantium',
        'enid': '57bbaa23f1e3f40046fe1043'
      }
    ]
  },
  {
    'name': 'Elusimicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Elusimicrobium/Elusimicrobium_minutum.tgz',
        'name': 'Elusimicrobium_minutum',
        'enid': '57bbc053f1e3f40053fe14d1'
      }
    ]
  },
  {
    'name': 'Emticicia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Emticicia/Emticicia_oligotrophica.tgz',
        'name': 'Emticicia_oligotrophica',
        'enid': '57bbbf02f1e3f40053fe147c'
      }
    ]
  },
  {
    'name': 'Enterobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Enterobacter/Enterobacter_638.tgz',
        'name': 'Enterobacter_638',
        'enid': '57bbacf2f1e3f4003ffe0f62'
      },
      {
        'path': 'chinacdc:/ANI/Enterobacter/Enterobacter_R4.tgz',
        'name': 'Enterobacter_R4',
        'enid': '57bbad32f1e3f4004dfe0feb'
      },
      {
        'path': 'chinacdc:/ANI/Enterobacter/Enterobacter_aerogenes.tgz',
        'name': 'Enterobacter_aerogenes',
        'enid': '57bbad24f1e3f40058fe11f5'
      },
      {
        'path': 'chinacdc:/ANI/Enterobacter/Enterobacter_asburiae.tgz',
        'name': 'Enterobacter_asburiae',
        'enid': '57bbacfcf1e3f4004afe0fec'
      },
      {
        'path': 'chinacdc:/ANI/Enterobacter/Enterobacter_cloacae.tgz',
        'name': 'Enterobacter_cloacae',
        'enid': '57bbad06f1e3f4005cfe126a'
      }
    ]
  },
  {
    'name': 'Enterococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Enterococcus/Enterococcus_7L76.tgz',
        'name': 'Enterococcus_7L76',
        'enid': '57bbcabdf1e3f4004afe11f9'
      },
      {
        'path': 'chinacdc:/ANI/Enterococcus/Enterococcus_casseliflavus.tgz',
        'name': 'Enterococcus_casseliflavus',
        'enid': '57bbcaaaf1e3f4004efe1484'
      },
      {
        'path': 'chinacdc:/ANI/Enterococcus/Enterococcus_faecalis.tgz',
        'name': 'Enterococcus_faecalis',
        'enid': '57bbcac5f1e3f4005cfe2038'
      },
      {
        'path': 'chinacdc:/ANI/Enterococcus/Enterococcus_faecium.tgz',
        'name': 'Enterococcus_faecium',
        'enid': '57bbca9af1e3f40057fe140a'
      },
      {
        'path': 'chinacdc:/ANI/Enterococcus/Enterococcus_hirae.tgz',
        'name': 'Enterococcus_hirae',
        'enid': '57bbcad7f1e3f40046fe11f5'
      },
      {
        'path': 'chinacdc:/ANI/Enterococcus/Enterococcus_mundtii.tgz',
        'name': 'Enterococcus_mundtii',
        'enid': '57bbcab4f1e3f4003efe0f7a'
      }
    ]
  },
  {
    'name': 'Erwinia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Erwinia/Erwinia_Ejp617.tgz',
        'name': 'Erwinia_Ejp617',
        'enid': '57bba997f1e3f40046fe103f'
      },
      {
        'path': 'chinacdc:/ANI/Erwinia/Erwinia_amylovora.tgz',
        'name': 'Erwinia_amylovora',
        'enid': '57bba9a9f1e3f40059fe121a'
      },
      {
        'path': 'chinacdc:/ANI/Erwinia/Erwinia_billingiae.tgz',
        'name': 'Erwinia_billingiae',
        'enid': '57bba99ff1e3f4004afe0fe0'
      },
      {
        'path': 'chinacdc:/ANI/Erwinia/Erwinia_pyrifoliae.tgz',
        'name': 'Erwinia_pyrifoliae',
        'enid': '57bba9bef1e3f40053fe12ad'
      },
      {
        'path': 'chinacdc:/ANI/Erwinia/Erwinia_tasmaniensis.tgz',
        'name': 'Erwinia_tasmaniensis',
        'enid': '57bba9b5f1e3f40058fe11b6'
      }
    ]
  },
  {
    'name': 'Erysipelothrix',
    'species': [
      {
        'path': 'chinacdc:/ANI/Erysipelothrix/Erysipelothrix_rhusiopathiae.tgz',
        'name': 'Erysipelothrix_rhusiopathiae',
        'enid': '57bb9335f1e3f40059fe1063'
      }
    ]
  },
  {
    'name': 'Erythrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Erythrobacter/Erythrobacter_litoralis.tgz',
        'name': 'Erythrobacter_litoralis',
        'enid': '57bbce7ef1e3f40053fe1adc'
      },
      {
        'path': 'chinacdc:/ANI/Erythrobacter/Erythrobacter_litoralis_HTCC2594_uid58299/',
        'name': 'Erythrobacter_litoralis_HTCC2594_uid58299/',
        'enid': '57bbce87f1e3f40059fe1a8c'
      }
    ]
  },
  {
    'name': 'Escherichia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Escherichia/Escherichia_blattae.tgz',
        'name': 'Escherichia_blattae',
        'enid': '57bbbbbaf1e3f4005cfe139c'
      },
      {
        'path': 'chinacdc:/ANI/Escherichia/Escherichia_coli.tgz',
        'name': 'Escherichia_coli',
        'enid': '57bbba90f1e3f40051fe1086'
      },
      {
        'path': 'chinacdc:/ANI/Escherichia/Escherichia_fergusonii.tgz',
        'name': 'Escherichia_fergusonii',
        'enid': '57bbbbc4f1e3f40059fe1368'
      }
    ]
  },
  {
    'name': 'Ethanoligenens',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ethanoligenens/Ethanoligenens_harbinense.tgz',
        'name': 'Ethanoligenens_harbinense',
        'enid': '57bb9f39f1e3f4004efe10cb'
      }
    ]
  },
  {
    'name': 'Eubacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Eubacterium/Eubacterium_cylindroides.tgz',
        'name': 'Eubacterium_cylindroides',
        'enid': '57bb9bd4f1e3f40059fe1109'
      },
      {
        'path': 'chinacdc:/ANI/Eubacterium/Eubacterium_eligens.tgz',
        'name': 'Eubacterium_eligens',
        'enid': '57bb9bccf1e3f4005cfe10ff'
      },
      {
        'path': 'chinacdc:/ANI/Eubacterium/Eubacterium_limosum.tgz',
        'name': 'Eubacterium_limosum',
        'enid': '57bb9be9f1e3f4005cfe1107'
      },
      {
        'path': 'chinacdc:/ANI/Eubacterium/Eubacterium_rectale.tgz',
        'name': 'Eubacterium_rectale',
        'enid': '57bb9bdbf1e3f4005cfe1103'
      },
      {
        'path': 'chinacdc:/ANI/Eubacterium/Eubacterium_siraeum.tgz',
        'name': 'Eubacterium_siraeum',
        'enid': '57bb9bc2f1e3f40043fe0f33'
      }
    ]
  },
  {
    'name': 'Exiguobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Exiguobacterium/Exiguobacterium_AT1b.tgz',
        'name': 'Exiguobacterium_AT1b',
        'enid': '57bba046f1e3f40046fe0fed'
      },
      {
        'path': 'chinacdc:/ANI/Exiguobacterium/Exiguobacterium_MH3.tgz',
        'name': 'Exiguobacterium_MH3',
        'enid': '57bba03cf1e3f4004afe0faa'
      },
      {
        'path': 'chinacdc:/ANI/Exiguobacterium/Exiguobacterium_antarcticum.tgz',
        'name': 'Exiguobacterium_antarcticum',
        'enid': '57bba050f1e3f40046fe0ff1'
      },
      {
        'path': 'chinacdc:/ANI/Exiguobacterium/Exiguobacterium_sibiricum.tgz',
        'name': 'Exiguobacterium_sibiricum',
        'enid': '57bba05af1e3f40053fe119f'
      }
    ]
  },
  {
    'name': 'Faecalibacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Faecalibacterium/Faecalibacterium_prausnitzii.tgz',
        'name': 'Faecalibacterium_prausnitzii',
        'enid': '57bb9f9cf1e3f40046fe0fe5'
      }
    ]
  },
  {
    'name': 'Ferrimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ferrimonas/Ferrimonas_balearica.tgz',
        'name': 'Ferrimonas_balearica',
        'enid': '57bbc976f1e3f40051fe1261'
      }
    ]
  },
  {
    'name': 'Ferroglobus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ferroglobus/Ferroglobus_placidus.tgz',
        'name': 'Ferroglobus_placidus',
        'enid': '57bbaca8f1e3f4005cfe125e'
      }
    ]
  },
  {
    'name': 'Ferroplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ferroplasma/Ferroplasma_acidarmanus.tgz',
        'name': 'Ferroplasma_acidarmanus',
        'enid': '57bbac87f1e3f4004efe117e'
      }
    ]
  },
  {
    'name': 'Fervidicoccus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Fervidicoccus/Fervidicoccus_fontis.tgz',
        'name': 'Fervidicoccus_fontis',
        'enid': '57bbd527f1e3f40057fe1699'
      }
    ]
  },
  {
    'name': 'Fervidobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Fervidobacterium/Fervidobacterium_nodosum.tgz',
        'name': 'Fervidobacterium_nodosum',
        'enid': '57bbd10cf1e3f40058fe1895'
      },
      {
        'path': 'chinacdc:/ANI/Fervidobacterium/Fervidobacterium_pennivorans.tgz',
        'name': 'Fervidobacterium_pennivorans',
        'enid': '57bbd114f1e3f4004efe1673'
      }
    ]
  },
  {
    'name': 'Fibrella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Fibrella/Fibrella_aestuarina.tgz',
        'name': 'Fibrella_aestuarina',
        'enid': '57bbaf7ff1e3f4005cfe12cb'
      }
    ]
  },
  {
    'name': 'Fibrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Fibrobacter/Fibrobacter_succinogenes.tgz',
        'name': 'Fibrobacter_succinogenes',
        'enid': '57bbd1aaf1e3f4005cfe31a7'
      }
    ]
  },
  {
    'name': 'Filifactor',
    'species': [
      {
        'path': 'chinacdc:/ANI/Filifactor/Filifactor_alocis.tgz',
        'name': 'Filifactor_alocis',
        'enid': '57bb9072f1e3f4005cfe1009'
      }
    ]
  },
  {
    'name': 'Finegoldia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Finegoldia/Finegoldia_magna.tgz',
        'name': 'Finegoldia_magna',
        'enid': '57bbd453f1e3f40059fe1cbd'
      }
    ]
  },
  {
    'name': 'Flavobacteriaceae',
    'species': [
      {
        'path': 'chinacdc:/ANI/Flavobacteriaceae/Flavobacteriaceae_bacterium.tgz',
        'name': 'Flavobacteriaceae_bacterium',
        'enid': '57bbd4dbf1e3f40042fe10a1'
      }
    ]
  },
  {
    'name': 'Flavobacteriales',
    'species': [
      {
        'path': 'chinacdc:/ANI/Flavobacteriales/Flavobacteriales_bacterium.tgz',
        'name': 'Flavobacteriales_bacterium',
        'enid': '57bba62ff1e3f40053fe123d'
      }
    ]
  },
  {
    'name': 'Flavobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Flavobacterium/Flavobacterium_branchiophilum.tgz',
        'name': 'Flavobacterium_branchiophilum',
        'enid': '57bb9b78f1e3f40059fe1101'
      },
      {
        'path': 'chinacdc:/ANI/Flavobacterium/Flavobacterium_columnare.tgz',
        'name': 'Flavobacterium_columnare',
        'enid': '57bb9b6ef1e3f40053fe1140'
      },
      {
        'path': 'chinacdc:/ANI/Flavobacterium/Flavobacterium_indicum.tgz',
        'name': 'Flavobacterium_indicum',
        'enid': '57bb9b8bf1e3f40059fe1105'
      },
      {
        'path': 'chinacdc:/ANI/Flavobacterium/Flavobacterium_johnsoniae.tgz',
        'name': 'Flavobacterium_johnsoniae',
        'enid': '57bb9b64f1e3f40059fe10fd'
      },
      {
        'path': 'chinacdc:/ANI/Flavobacterium/Flavobacterium_psychrophilum.tgz',
        'name': 'Flavobacterium_psychrophilum',
        'enid': '57bb9b81f1e3f40051fe0fec'
      }
    ]
  },
  {
    'name': 'Flexibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Flexibacter/Flexibacter_litoralis.tgz',
        'name': 'Flexibacter_litoralis',
        'enid': '57bbba23f1e3f40042fe0f8a'
      }
    ]
  },
  {
    'name': 'Flexistipes',
    'species': [
      {
        'path': 'chinacdc:/ANI/Flexistipes/Flexistipes_sinusarabici.tgz',
        'name': 'Flexistipes_sinusarabici',
        'enid': '57bbd24bf1e3f40046fe1306'
      }
    ]
  },
  {
    'name': 'Fluviicola',
    'species': [
      {
        'path': 'chinacdc:/ANI/Fluviicola/Fluviicola_taffensis.tgz',
        'name': 'Fluviicola_taffensis',
        'enid': '57bba986f1e3f40053fe12a9'
      }
    ]
  },
  {
    'name': 'Francisella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Francisella/Francisella_TX077308.tgz',
        'name': 'Francisella_TX077308',
        'enid': '57bbb77cf1e3f40058fe123e'
      },
      {
        'path': 'chinacdc:/ANI/Francisella/Francisella_cf.tgz',
        'name': 'Francisella_cf',
        'enid': '57bbb76bf1e3f4004efe1204'
      },
      {
        'path': 'chinacdc:/ANI/Francisella/Francisella_noatunensis.tgz',
        'name': 'Francisella_noatunensis',
        'enid': '57bbb761f1e3f40057fe112e'
      },
      {
        'path': 'chinacdc:/ANI/Francisella/Francisella_novicida.tgz',
        'name': 'Francisella_novicida',
        'enid': '57bbb741f1e3f40057fe112a'
      },
      {
        'path': 'chinacdc:/ANI/Francisella/Francisella_philomiragia.tgz',
        'name': 'Francisella_philomiragia',
        'enid': '57bbb775f1e3f4005cfe1346'
      },
      {
        'path': 'chinacdc:/ANI/Francisella/Francisella_tularensis.tgz',
        'name': 'Francisella_tularensis',
        'enid': '57bbb749f1e3f40051fe1074'
      }
    ]
  },
  {
    'name': 'Frankia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Frankia/Frankia_CcI3.tgz',
        'name': 'Frankia_CcI3',
        'enid': '57bbc52cf1e3f4004efe131e'
      },
      {
        'path': 'chinacdc:/ANI/Frankia/Frankia_EAN1pec.tgz',
        'name': 'Frankia_EAN1pec',
        'enid': '57bbc53af1e3f4004efe1322'
      },
      {
        'path': 'chinacdc:/ANI/Frankia/Frankia_EuI1c.tgz',
        'name': 'Frankia_EuI1c',
        'enid': '57bbc54af1e3f4005cfe165d'
      },
      {
        'path': 'chinacdc:/ANI/Frankia/Frankia_alni.tgz',
        'name': 'Frankia_alni',
        'enid': '57bbc565f1e3f4005cfe1670'
      },
      {
        'path': 'chinacdc:/ANI/Frankia/Frankia_symbiont.tgz',
        'name': 'Frankia_symbiont',
        'enid': '57bbc559f1e3f4004efe1326'
      }
    ]
  },
  {
    'name': 'Frateuria',
    'species': [
      {
        'path': 'chinacdc:/ANI/Frateuria/Frateuria_aurantia.tgz',
        'name': 'Frateuria_aurantia',
        'enid': '57bbcb98f1e3f40059fe1973'
      }
    ]
  },
  {
    'name': 'Fusobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Fusobacterium/Fusobacterium_3.tgz',
        'name': 'Fusobacterium_3',
        'enid': '57bb930bf1e3f40057fe0fb5'
      },
      {
        'path': 'chinacdc:/ANI/Fusobacterium/Fusobacterium_4.tgz',
        'name': 'Fusobacterium_4',
        'enid': '57bb9312f1e3f40053fe10ae'
      },
      {
        'path': 'chinacdc:/ANI/Fusobacterium/Fusobacterium_nucleatum.tgz',
        'name': 'Fusobacterium_nucleatum',
        'enid': '57bb931af1e3f4005cfe1050'
      }
    ]
  },
  {
    'name': 'Gallibacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gallibacterium/Gallibacterium_anatis.tgz',
        'name': 'Gallibacterium_anatis',
        'enid': '57bbb653f1e3f40057fe1110'
      }
    ]
  },
  {
    'name': 'Gallionella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gallionella/Gallionella_capsiferriformans.tgz',
        'name': 'Gallionella_capsiferriformans',
        'enid': '57bba210f1e3f4004efe10ec'
      }
    ]
  },
  {
    'name': 'Gardnerella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gardnerella/Gardnerella_vaginalis.tgz',
        'name': 'Gardnerella_vaginalis',
        'enid': '57bb9a69f1e3f4005cfe10d9'
      }
    ]
  },
  {
    'name': 'Geitlerinema',
    'species': [
      {
        'path': 'chinacdc:/ANI/Geitlerinema/Geitlerinema_PCC.tgz',
        'name': 'Geitlerinema_PCC',
        'enid': '57bbc371f1e3f40053fe15e1'
      }
    ]
  },
  {
    'name': 'Gemmatimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gemmatimonas/Gemmatimonas_aurantiaca.tgz',
        'name': 'Gemmatimonas_aurantiaca',
        'enid': '57bba8c7f1e3f40057fe1094'
      }
    ]
  },
  {
    'name': 'Geobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_C56.tgz',
        'name': 'Geobacillus_C56',
        'enid': '57bbc9b9f1e3f40059fe18c1'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_HH01.tgz',
        'name': 'Geobacillus_HH01',
        'enid': '57bbc9fcf1e3f40043fe100c'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_JF8.tgz',
        'name': 'Geobacillus_JF8',
        'enid': '57bbc9f2f1e3f40058fe168d'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_WCH70.tgz',
        'name': 'Geobacillus_WCH70',
        'enid': '57bbc999f1e3f4004dfe1175'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_Y4.tgz',
        'name': 'Geobacillus_Y4',
        'enid': '57bbc9a4f1e3f4004afe11dd'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_Y412MC52.tgz',
        'name': 'Geobacillus_Y412MC52',
        'enid': '57bbc9e8f1e3f40059fe18c9'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_Y412MC61.tgz',
        'name': 'Geobacillus_Y412MC61',
        'enid': '57bbca03f1e3f40059fe18d1'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_kaustophilus.tgz',
        'name': 'Geobacillus_kaustophilus',
        'enid': '57bbc9cbf1e3f40046fe11d2'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_thermodenitrificans.tgz',
        'name': 'Geobacillus_thermodenitrificans',
        'enid': '57bbc9def1e3f4003bfe1008'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_thermoglucosidasius.tgz',
        'name': 'Geobacillus_thermoglucosidasius',
        'enid': '57bbc9c1f1e3f4003bfe0ffc'
      },
      {
        'path': 'chinacdc:/ANI/Geobacillus/Geobacillus_thermoleovorans.tgz',
        'name': 'Geobacillus_thermoleovorans',
        'enid': '57bbc9d5f1e3f40040fe10c4'
      }
    ]
  },
  {
    'name': 'Geobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_FRC.tgz',
        'name': 'Geobacter_FRC',
        'enid': '57bbcd6df1e3f40059fe1a24'
      },
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_M18.tgz',
        'name': 'Geobacter_M18',
        'enid': '57bbcd76f1e3f40058fe176b'
      },
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_M21.tgz',
        'name': 'Geobacter_M21',
        'enid': '57bbcd5bf1e3f40059fe1a20'
      },
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_bemidjiensis.tgz',
        'name': 'Geobacter_bemidjiensis',
        'enid': '57bbcd40f1e3f4005cfe2655'
      },
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_lovleyi.tgz',
        'name': 'Geobacter_lovleyi',
        'enid': '57bbcd51f1e3f40058fe175b'
      },
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_metallireducens.tgz',
        'name': 'Geobacter_metallireducens',
        'enid': '57bbcd65f1e3f40053fe1a60'
      },
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_sulfurreducens.tgz',
        'name': 'Geobacter_sulfurreducens',
        'enid': '57bbcd34f1e3f40059fe1a1c'
      },
      {
        'path': 'chinacdc:/ANI/Geobacter/Geobacter_uraniireducens.tgz',
        'name': 'Geobacter_uraniireducens',
        'enid': '57bbcd47f1e3f40057fe1492'
      }
    ]
  },
  {
    'name': 'Geodermatophilus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Geodermatophilus/Geodermatophilus_obscurus.tgz',
        'name': 'Geodermatophilus_obscurus',
        'enid': '57bbb70ef1e3f40053fe13b6'
      }
    ]
  },
  {
    'name': 'Glaciecola',
    'species': [
      {
        'path': 'chinacdc:/ANI/Glaciecola/Glaciecola_4H.tgz',
        'name': 'Glaciecola_4H',
        'enid': '57bbb78ff1e3f4004dfe101b'
      },
      {
        'path': 'chinacdc:/ANI/Glaciecola/Glaciecola_nitratireducens.tgz',
        'name': 'Glaciecola_nitratireducens',
        'enid': '57bbb785f1e3f4005cfe134d'
      },
      {
        'path': 'chinacdc:/ANI/Glaciecola/Glaciecola_psychrophila.tgz',
        'name': 'Glaciecola_psychrophila',
        'enid': '57bbb798f1e3f40058fe1242'
      }
    ]
  },
  {
    'name': 'Gloeobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gloeobacter/Gloeobacter_JS.tgz',
        'name': 'Gloeobacter_JS',
        'enid': '57bbb5ccf1e3f40057fe10fe'
      },
      {
        'path': 'chinacdc:/ANI/Gloeobacter/Gloeobacter_violaceus.tgz',
        'name': 'Gloeobacter_violaceus',
        'enid': '57bbb5d5f1e3f40057fe1102'
      }
    ]
  },
  {
    'name': 'Gloeocapsa',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gloeocapsa/Gloeocapsa_PCC.tgz',
        'name': 'Gloeocapsa_PCC',
        'enid': '57bbba2cf1e3f4004efe121e'
      }
    ]
  },
  {
    'name': 'Gluconacetobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gluconacetobacter/Gluconacetobacter_diazotrophicus.tgz',
        'name': 'Gluconacetobacter_diazotrophicus',
        'enid': '57bbd4cff1e3f4005cfe3a03'
      },
      {
        'path': 'chinacdc:/ANI/Gluconacetobacter/Gluconacetobacter_xylinus.tgz',
        'name': 'Gluconacetobacter_xylinus',
        'enid': '57bbd4c5f1e3f40058fe19d9'
      }
    ]
  },
  {
    'name': 'Gluconobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gluconobacter/Gluconobacter_oxydans.tgz',
        'name': 'Gluconobacter_oxydans',
        'enid': '57bbc026f1e3f4005cfe145e'
      }
    ]
  },
  {
    'name': 'Gordonia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gordonia/Gordonia_KTR9.tgz',
        'name': 'Gordonia_KTR9',
        'enid': '57bbaea3f1e3f4004efe1194'
      },
      {
        'path': 'chinacdc:/ANI/Gordonia/Gordonia_bronchialis.tgz',
        'name': 'Gordonia_bronchialis',
        'enid': '57bbae99f1e3f40057fe10d6'
      },
      {
        'path': 'chinacdc:/ANI/Gordonia/Gordonia_polyisoprenivorans.tgz',
        'name': 'Gordonia_polyisoprenivorans',
        'enid': '57bbae8ff1e3f40041fe0f4a'
      }
    ]
  },
  {
    'name': 'Gordonibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gordonibacter/Gordonibacter_pamelaeae.tgz',
        'name': 'Gordonibacter_pamelaeae',
        'enid': '57bb9feaf1e3f40053fe1189'
      }
    ]
  },
  {
    'name': 'Gramella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Gramella/Gramella_forsetii.tgz',
        'name': 'Gramella_forsetii',
        'enid': '57bbc3e2f1e3f4005cfe1576'
      }
    ]
  },
  {
    'name': 'Granulibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Granulibacter/Granulibacter_bethesdensis.tgz',
        'name': 'Granulibacter_bethesdensis',
        'enid': '57bb9c20f1e3f40053fe114a'
      }
    ]
  },
  {
    'name': 'Granulicella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Granulicella/Granulicella_mallensis.tgz',
        'name': 'Granulicella_mallensis',
        'enid': '57bbaec4f1e3f4004efe119f'
      }
    ]
  },
  {
    'name': 'Haemophilus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Haemophilus/Haemophilus_ducreyi.tgz',
        'name': 'Haemophilus_ducreyi',
        'enid': '57bbce3cf1e3f40046fe1273'
      },
      {
        'path': 'chinacdc:/ANI/Haemophilus/Haemophilus_influenzae.tgz',
        'name': 'Haemophilus_influenzae',
        'enid': '57bbce56f1e3f40058fe17ac'
      },
      {
        'path': 'chinacdc:/ANI/Haemophilus/Haemophilus_parainfluenzae.tgz',
        'name': 'Haemophilus_parainfluenzae',
        'enid': '57bbce44f1e3f40057fe14d7'
      },
      {
        'path': 'chinacdc:/ANI/Haemophilus/Haemophilus_parasuis.tgz',
        'name': 'Haemophilus_parasuis',
        'enid': '57bbce4cf1e3f40053fe1ab3'
      },
      {
        'path': 'chinacdc:/ANI/Haemophilus/Haemophilus_somnus.tgz',
        'name': 'Haemophilus_somnus',
        'enid': '57bbce33f1e3f40059fe1a68'
      }
    ]
  },
  {
    'name': 'Hahella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hahella/Hahella_chejuensis.tgz',
        'name': 'Hahella_chejuensis',
        'enid': '57bb9e76f1e3f40053fe1177'
      }
    ]
  },
  {
    'name': 'Halalkalicoccus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halalkalicoccus/Halalkalicoccus_jeotgali.tgz',
        'name': 'Halalkalicoccus_jeotgali',
        'enid': '57bbc0c1f1e3f40046fe10b0'
      }
    ]
  },
  {
    'name': 'Halanaerobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halanaerobium/Halanaerobium_hydrogeniformans.tgz',
        'name': 'Halanaerobium_hydrogeniformans',
        'enid': '57bbc897f1e3f40057fe13a5'
      },
      {
        'path': 'chinacdc:/ANI/Halanaerobium/Halanaerobium_praevalens.tgz',
        'name': 'Halanaerobium_praevalens',
        'enid': '57bbc890f1e3f40057fe139d'
      }
    ]
  },
  {
    'name': 'Haliangium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Haliangium/Haliangium_ochraceum.tgz',
        'name': 'Haliangium_ochraceum',
        'enid': '57bb9b4ff1e3f40059fe10f6'
      }
    ]
  },
  {
    'name': 'Haliscomenobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Haliscomenobacter/Haliscomenobacter_hydrossis.tgz',
        'name': 'Haliscomenobacter_hydrossis',
        'enid': '57bbd35ff1e3f4005cfe3657'
      }
    ]
  },
  {
    'name': 'Haloarcula',
    'species': [
      {
        'path': 'chinacdc:/ANI/Haloarcula/Haloarcula_hispanica.tgz',
        'name': 'Haloarcula_hispanica',
        'enid': '57bba924f1e3f40053fe1291'
      },
      {
        'path': 'chinacdc:/ANI/Haloarcula/Haloarcula_marismortui.tgz',
        'name': 'Haloarcula_marismortui',
        'enid': '57bba930f1e3f40059fe1205'
      }
    ]
  },
  {
    'name': 'Halobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halobacillus/Halobacillus_halophilus.tgz',
        'name': 'Halobacillus_halophilus',
        'enid': '57bbcdbaf1e3f40059fe1a37'
      }
    ]
  },
  {
    'name': 'Halobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halobacterium/Halobacterium_NRC.tgz',
        'name': 'Halobacterium_NRC',
        'enid': '57bba90bf1e3f4003bfe0f56'
      },
      {
        'path': 'chinacdc:/ANI/Halobacterium/Halobacterium_salinarum.tgz',
        'name': 'Halobacterium_salinarum',
        'enid': '57bba912f1e3f40059fe1201'
      }
    ]
  },
  {
    'name': 'Halobacteroides',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halobacteroides/Halobacteroides_halobius.tgz',
        'name': 'Halobacteroides_halobius',
        'enid': '57bb9d74f1e3f40058fe10e2'
      }
    ]
  },
  {
    'name': 'Haloferax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Haloferax/Haloferax_mediterranei.tgz',
        'name': 'Haloferax_mediterranei',
        'enid': '57bbcf3df1e3f4004afe127c'
      },
      {
        'path': 'chinacdc:/ANI/Haloferax/Haloferax_volcanii.tgz',
        'name': 'Haloferax_volcanii',
        'enid': '57bbcf47f1e3f4004afe1280'
      }
    ]
  },
  {
    'name': 'Halogeometricum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halogeometricum/Halogeometricum_borinquense.tgz',
        'name': 'Halogeometricum_borinquense',
        'enid': '57bb9a5ff1e3f4004afe0f7d'
      }
    ]
  },
  {
    'name': 'Halomicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halomicrobium/Halomicrobium_mukohataei.tgz',
        'name': 'Halomicrobium_mukohataei',
        'enid': '57bb9e97f1e3f40057fe102a'
      }
    ]
  },
  {
    'name': 'Halomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halomonas/Halomonas_elongata.tgz',
        'name': 'Halomonas_elongata',
        'enid': '57bbd338f1e3f40040fe1188'
      }
    ]
  },
  {
    'name': 'Halopiger',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halopiger/Halopiger_xanaduensis.tgz',
        'name': 'Halopiger_xanaduensis',
        'enid': '57bbd350f1e3f4004afe131e'
      }
    ]
  },
  {
    'name': 'Haloquadratum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Haloquadratum/Haloquadratum_walsbyi.tgz',
        'name': 'Haloquadratum_walsbyi',
        'enid': '57bb9c16f1e3f40058fe10a7'
      }
    ]
  },
  {
    'name': 'Halorhabdus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halorhabdus/Halorhabdus_tiamatea.tgz',
        'name': 'Halorhabdus_tiamatea',
        'enid': '57bbc5d7f1e3f40041fe0fac'
      },
      {
        'path': 'chinacdc:/ANI/Halorhabdus/Halorhabdus_utahensis.tgz',
        'name': 'Halorhabdus_utahensis',
        'enid': '57bbc5caf1e3f40053fe1739'
      }
    ]
  },
  {
    'name': 'Halorhodospira',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halorhodospira/Halorhodospira_halophila.tgz',
        'name': 'Halorhodospira_halophila',
        'enid': '57bbaf58f1e3f4004efe11a9'
      }
    ]
  },
  {
    'name': 'Halorubrum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halorubrum/Halorubrum_lacusprofundi.tgz',
        'name': 'Halorubrum_lacusprofundi',
        'enid': '57bbaa08f1e3f40053fe12b4'
      }
    ]
  },
  {
    'name': 'Haloterrigena',
    'species': [
      {
        'path': 'chinacdc:/ANI/Haloterrigena/Haloterrigena_turkmenica.tgz',
        'name': 'Haloterrigena_turkmenica',
        'enid': '57bbd06af1e3f40057fe1564'
      }
    ]
  },
  {
    'name': 'Halothece',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halothece/Halothece_PCC.tgz',
        'name': 'Halothece_PCC',
        'enid': '57bbd129f1e3f40057fe158e'
      }
    ]
  },
  {
    'name': 'Halothermothrix',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halothermothrix/Halothermothrix_orenii.tgz',
        'name': 'Halothermothrix_orenii',
        'enid': '57bbd028f1e3f4005cfe2dea'
      }
    ]
  },
  {
    'name': 'Halovivax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halovivax/Halovivax_ruber.tgz',
        'name': 'Halovivax_ruber',
        'enid': '57bbb85cf1e3f40057fe113d'
      }
    ]
  },
  {
    'name': 'Halyomorpha',
    'species': [
      {
        'path': 'chinacdc:/ANI/Halyomorpha/Halyomorpha_halys.tgz',
        'name': 'Halyomorpha_halys',
        'enid': '57bbd56bf1e3f40059fe1d59'
      }
    ]
  },
  {
    'name': 'Helicobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_acinonychis.tgz',
        'name': 'Helicobacter_acinonychis',
        'enid': '57bbbef3f1e3f4005cfe1429'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_bizzozeronii.tgz',
        'name': 'Helicobacter_bizzozeronii',
        'enid': '57bbbe94f1e3f4005cfe141d'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_cetorum.tgz',
        'name': 'Helicobacter_cetorum',
        'enid': '57bbbe8af1e3f40051fe10d8'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_cinaedi.tgz',
        'name': 'Helicobacter_cinaedi',
        'enid': '57bbbe80f1e3f40053fe1466'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_felis.tgz',
        'name': 'Helicobacter_felis',
        'enid': '57bbbe71f1e3f4005cfe1419'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_heilmannii.tgz',
        'name': 'Helicobacter_heilmannii',
        'enid': '57bbbe5ff1e3f40051fe10cc'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_hepaticus.tgz',
        'name': 'Helicobacter_hepaticus',
        'enid': '57bbbe78f1e3f40053fe1462'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_mustelae.tgz',
        'name': 'Helicobacter_mustelae',
        'enid': '57bbbe69f1e3f40059fe13cd'
      },
      {
        'path': 'chinacdc:/ANI/Helicobacter/Helicobacter_pylori.tgz',
        'name': 'Helicobacter_pylori',
        'enid': '57bbbe9ef1e3f40059fe13d5'
      }
    ]
  },
  {
    'name': 'Heliobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Heliobacterium/Heliobacterium_modesticaldum.tgz',
        'name': 'Heliobacterium_modesticaldum',
        'enid': '57bbbfd4f1e3f4003ffe0f95'
      }
    ]
  },
  {
    'name': 'Herbaspirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Herbaspirillum/Herbaspirillum_seropedicae.tgz',
        'name': 'Herbaspirillum_seropedicae',
        'enid': '57bbbda9f1e3f40057fe118d'
      }
    ]
  },
  {
    'name': 'Herminiimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Herminiimonas/Herminiimonas_arsenicoxydans.tgz',
        'name': 'Herminiimonas_arsenicoxydans',
        'enid': '57bbae18f1e3f40059fe1264'
      }
    ]
  },
  {
    'name': 'Herpetosiphon',
    'species': [
      {
        'path': 'chinacdc:/ANI/Herpetosiphon/Herpetosiphon_aurantiacus.tgz',
        'name': 'Herpetosiphon_aurantiacus',
        'enid': '57bba250f1e3f4005cfe1190'
      }
    ]
  },
  {
    'name': 'Hippea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hippea/Hippea_maritima.tgz',
        'name': 'Hippea_maritima',
        'enid': '57bb9d3af1e3f4005cfe1138'
      }
    ]
  },
  {
    'name': 'Hirschia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hirschia/Hirschia_baltica.tgz',
        'name': 'Hirschia_baltica',
        'enid': '57bb9a73f1e3f4005cfe10e0'
      }
    ]
  },
  {
    'name': 'Hydrogenobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hydrogenobacter/Hydrogenobacter_thermophilus.tgz',
        'name': 'Hydrogenobacter_thermophilus',
        'enid': '57bbac8ff1e3f40051fe103f'
      }
    ]
  },
  {
    'name': 'Hydrogenobaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hydrogenobaculum/Hydrogenobaculum_HO.tgz',
        'name': 'Hydrogenobaculum_HO',
        'enid': '57bbc39ff1e3f4004dfe10a0'
      },
      {
        'path': 'chinacdc:/ANI/Hydrogenobaculum/Hydrogenobaculum_SN.tgz',
        'name': 'Hydrogenobaculum_SN',
        'enid': '57bbc398f1e3f40042fe0fc4'
      },
      {
        'path': 'chinacdc:/ANI/Hydrogenobaculum/Hydrogenobaculum_Y04AAS1.tgz',
        'name': 'Hydrogenobaculum_Y04AAS1',
        'enid': '57bbc390f1e3f40058fe1420'
      }
    ]
  },
  {
    'name': 'Hyperthermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hyperthermus/Hyperthermus_butylicus.tgz',
        'name': 'Hyperthermus_butylicus',
        'enid': '57bbaeadf1e3f40047fe0fac'
      }
    ]
  },
  {
    'name': 'Hyphomicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hyphomicrobium/Hyphomicrobium_MC1.tgz',
        'name': 'Hyphomicrobium_MC1',
        'enid': '57bba128f1e3f4003bfe0f41'
      },
      {
        'path': 'chinacdc:/ANI/Hyphomicrobium/Hyphomicrobium_denitrificans.tgz',
        'name': 'Hyphomicrobium_denitrificans',
        'enid': '57bba132f1e3f40053fe11b2'
      },
      {
        'path': 'chinacdc:/ANI/Hyphomicrobium/Hyphomicrobium_nitrativorans.tgz',
        'name': 'Hyphomicrobium_nitrativorans',
        'enid': '57bba11ef1e3f40059fe1177'
      }
    ]
  },
  {
    'name': 'Hyphomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Hyphomonas/Hyphomonas_neptunium.tgz',
        'name': 'Hyphomonas_neptunium',
        'enid': '57bb917df1e3f40051fe0fae'
      }
    ]
  },
  {
    'name': 'Idiomarina',
    'species': [
      {
        'path': 'chinacdc:/ANI/Idiomarina/Idiomarina_loihiensis.tgz',
        'name': 'Idiomarina_loihiensis',
        'enid': '57bbb12df1e3f40058fe1212'
      }
    ]
  },
  {
    'name': 'Ignavibacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ignavibacterium/Ignavibacterium_album.tgz',
        'name': 'Ignavibacterium_album',
        'enid': '57bba8aaf1e3f40053fe1278'
      }
    ]
  },
  {
    'name': 'Ignicoccus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ignicoccus/Ignicoccus_hospitalis.tgz',
        'name': 'Ignicoccus_hospitalis',
        'enid': '57bbd1b4f1e3f40053fe1c1e'
      }
    ]
  },
  {
    'name': 'Ignisphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ignisphaera/Ignisphaera_aggregans.tgz',
        'name': 'Ignisphaera_aggregans',
        'enid': '57bbb148f1e3f40053fe1343'
      }
    ]
  },
  {
    'name': 'Ilyobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ilyobacter/Ilyobacter_polytropus.tgz',
        'name': 'Ilyobacter_polytropus',
        'enid': '57bb9734f1e3f4004efe105b'
      }
    ]
  },
  {
    'name': 'Intrasporangium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Intrasporangium/Intrasporangium_calvum.tgz',
        'name': 'Intrasporangium_calvum',
        'enid': '57bbb25df1e3f40059fe12b7'
      }
    ]
  },
  {
    'name': 'Isoptericola',
    'species': [
      {
        'path': 'chinacdc:/ANI/Isoptericola/Isoptericola_variabilis.tgz',
        'name': 'Isoptericola_variabilis',
        'enid': '57bb9de7f1e3f40058fe10ed'
      }
    ]
  },
  {
    'name': 'Isosphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Isosphaera/Isosphaera_pallida.tgz',
        'name': 'Isosphaera_pallida',
        'enid': '57bb9285f1e3f40046fe0f7f'
      }
    ]
  },
  {
    'name': 'Jannaschia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Jannaschia/Jannaschia_CCS1.tgz',
        'name': 'Jannaschia_CCS1',
        'enid': '57bb9dc4f1e3f40053fe1166'
      }
    ]
  },
  {
    'name': 'Janthinobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Janthinobacterium/Janthinobacterium_Marseille.tgz',
        'name': 'Janthinobacterium_Marseille',
        'enid': '57bbc87cf1e3f40051fe123f'
      }
    ]
  },
  {
    'name': 'Jonesia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Jonesia/Jonesia_denitrificans.tgz',
        'name': 'Jonesia_denitrificans',
        'enid': '57bbae68f1e3f40053fe130a'
      }
    ]
  },
  {
    'name': 'Kangiella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kangiella/Kangiella_koreensis.tgz',
        'name': 'Kangiella_koreensis',
        'enid': '57bbd1e4f1e3f40053fe1c35'
      }
    ]
  },
  {
    'name': 'Ketogulonicigenium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ketogulonicigenium/Ketogulonicigenium_vulgare.tgz',
        'name': 'Ketogulonicigenium_vulgare',
        'enid': '57bbacb9f1e3f40057fe10b9'
      }
    ]
  },
  {
    'name': 'Kineococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kineococcus/Kineococcus_radiotolerans.tgz',
        'name': 'Kineococcus_radiotolerans',
        'enid': '57bbc886f1e3f4004efe1414'
      }
    ]
  },
  {
    'name': 'Kitasatospora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kitasatospora/Kitasatospora_setae.tgz',
        'name': 'Kitasatospora_setae',
        'enid': '57bbcbaaf1e3f40053fe19da'
      }
    ]
  },
  {
    'name': 'Klebsiella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Klebsiella/Klebsiella_oxytoca.tgz',
        'name': 'Klebsiella_oxytoca',
        'enid': '57bbc222f1e3f40058fe13ac'
      },
      {
        'path': 'chinacdc:/ANI/Klebsiella/Klebsiella_pneumoniae.tgz',
        'name': 'Klebsiella_pneumoniae',
        'enid': '57bbc1eef1e3f40059fe14ab'
      },
      {
        'path': 'chinacdc:/ANI/Klebsiella/Klebsiella_variicola.tgz',
        'name': 'Klebsiella_variicola',
        'enid': '57bbc232f1e3f40040fe1014'
      }
    ]
  },
  {
    'name': 'Kocuria',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kocuria/Kocuria_rhizophila.tgz',
        'name': 'Kocuria_rhizophila',
        'enid': '57bba310f1e3f40042fe0f6d'
      }
    ]
  },
  {
    'name': 'Kosmotoga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kosmotoga/Kosmotoga_olearia.tgz',
        'name': 'Kosmotoga_olearia',
        'enid': '57bbd291f1e3f40051fe138d'
      }
    ]
  },
  {
    'name': 'Kribbella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kribbella/Kribbella_flavida.tgz',
        'name': 'Kribbella_flavida',
        'enid': '57bbc0abf1e3f40058fe1334'
      }
    ]
  },
  {
    'name': 'Krokinobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Krokinobacter/Krokinobacter_4H.tgz',
        'name': 'Krokinobacter_4H',
        'enid': '57bba6b2f1e3f40051fe1023'
      }
    ]
  },
  {
    'name': 'Kyrpidia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kyrpidia/Kyrpidia_tusciae.tgz',
        'name': 'Kyrpidia_tusciae',
        'enid': '57bb9c86f1e3f40059fe1124'
      }
    ]
  },
  {
    'name': 'Kytococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Kytococcus/Kytococcus_sedentarius.tgz',
        'name': 'Kytococcus_sedentarius',
        'enid': '57bbc243f1e3f4005cfe1504'
      }
    ]
  },
  {
    'name': 'Lacinutrix',
    'species': [
      {
        'path': 'chinacdc:/ANI/Lacinutrix/Lacinutrix_5H.tgz',
        'name': 'Lacinutrix_5H',
        'enid': '57bbc015f1e3f40058fe1319'
      }
    ]
  },
  {
    'name': 'Lactobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_acidophilus.tgz',
        'name': 'Lactobacillus_acidophilus',
        'enid': '57bbd433f1e3f40059fe1ca6'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_amylovorus.tgz',
        'name': 'Lactobacillus_amylovorus',
        'enid': '57bbd36bf1e3f4005cfe3681'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_brevis.tgz',
        'name': 'Lactobacillus_brevis',
        'enid': '57bbd449f1e3f40058fe19af'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_buchneri.tgz',
        'name': 'Lactobacillus_buchneri',
        'enid': '57bbd40ef1e3f40057fe164b'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_casei.tgz',
        'name': 'Lactobacillus_casei',
        'enid': '57bbd38bf1e3f40058fe1959'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_crispatus.tgz',
        'name': 'Lactobacillus_crispatus',
        'enid': '57bbd3d5f1e3f40058fe196d'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_delbrueckii.tgz',
        'name': 'Lactobacillus_delbrueckii',
        'enid': '57bbd37ff1e3f40059fe1c3c'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_fermentum.tgz',
        'name': 'Lactobacillus_fermentum',
        'enid': '57bbd418f1e3f40053fe1d6a'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_gasseri.tgz',
        'name': 'Lactobacillus_gasseri',
        'enid': '57bbd422f1e3f4005cfe3849'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_helveticus.tgz',
        'name': 'Lactobacillus_helveticus',
        'enid': '57bbd3b3f1e3f4003bfe1066'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_johnsonii.tgz',
        'name': 'Lactobacillus_johnsonii',
        'enid': '57bbd43df1e3f40058fe19a7'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_kefiranofaciens.tgz',
        'name': 'Lactobacillus_kefiranofaciens',
        'enid': '57bbd3f1f1e3f40059fe1c79'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_paracasei.tgz',
        'name': 'Lactobacillus_paracasei',
        'enid': '57bbd375f1e3f40046fe1341'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_plantarum.tgz',
        'name': 'Lactobacillus_plantarum',
        'enid': '57bbd3bff1e3f40053fe1d29'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_reuteri.tgz',
        'name': 'Lactobacillus_reuteri',
        'enid': '57bbd3f9f1e3f40058fe1980'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_rhamnosus.tgz',
        'name': 'Lactobacillus_rhamnosus',
        'enid': '57bbd3ddf1e3f4004efe1735'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_ruminis.tgz',
        'name': 'Lactobacillus_ruminis',
        'enid': '57bbd3abf1e3f40058fe1961'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_sakei.tgz',
        'name': 'Lactobacillus_sakei',
        'enid': '57bbd406f1e3f40058fe1997'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_salivarius.tgz',
        'name': 'Lactobacillus_salivarius',
        'enid': '57bbd42af1e3f4004efe1756'
      },
      {
        'path': 'chinacdc:/ANI/Lactobacillus/Lactobacillus_sanfranciscensis.tgz',
        'name': 'Lactobacillus_sanfranciscensis',
        'enid': '57bbd3a3f1e3f4004efe1725'
      }
    ]
  },
  {
    'name': 'Lactococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Lactococcus/Lactococcus_garvieae.tgz',
        'name': 'Lactococcus_garvieae',
        'enid': '57bb966bf1e3f40057fe0fcb'
      },
      {
        'path': 'chinacdc:/ANI/Lactococcus/Lactococcus_lactis.tgz',
        'name': 'Lactococcus_lactis',
        'enid': '57bb964df1e3f40041fe0f32'
      }
    ]
  },
  {
    'name': 'Laribacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Laribacter/Laribacter_hongkongensis.tgz',
        'name': 'Laribacter_hongkongensis',
        'enid': '57bbbd27f1e3f4004afe104c'
      }
    ]
  },
  {
    'name': 'Lawsonia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Lawsonia/Lawsonia_intracellularis.tgz',
        'name': 'Lawsonia_intracellularis',
        'enid': '57bbd288f1e3f4005cfe340a'
      }
    ]
  },
  {
    'name': 'Leadbetterella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leadbetterella/Leadbetterella_byssophila.tgz',
        'name': 'Leadbetterella_byssophila',
        'enid': '57bbcba2f1e3f4004efe14b7'
      }
    ]
  },
  {
    'name': 'Legionella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Legionella/Legionella_longbeachae.tgz',
        'name': 'Legionella_longbeachae',
        'enid': '57bbd0a3f1e3f4004afe12af'
      },
      {
        'path': 'chinacdc:/ANI/Legionella/Legionella_pneumophila.tgz',
        'name': 'Legionella_pneumophila',
        'enid': '57bbd07ff1e3f4005cfe2ec4'
      }
    ]
  },
  {
    'name': 'Leifsonia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leifsonia/Leifsonia_xyli.tgz',
        'name': 'Leifsonia_xyli',
        'enid': '57bbaa60f1e3f4005cfe1230'
      }
    ]
  },
  {
    'name': 'Leisingera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leisingera/Leisingera_methylohalidivorans.tgz',
        'name': 'Leisingera_methylohalidivorans',
        'enid': '57bb90e1f1e3f4005cfe101b'
      }
    ]
  },
  {
    'name': 'Leptolyngbya',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leptolyngbya/Leptolyngbya_PCC.tgz',
        'name': 'Leptolyngbya_PCC',
        'enid': '57bbc166f1e3f40057fe120f'
      }
    ]
  },
  {
    'name': 'Leptospira',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leptospira/Leptospira_biflexa.tgz',
        'name': 'Leptospira_biflexa',
        'enid': '57bba091f1e3f40043fe0f3a'
      },
      {
        'path': 'chinacdc:/ANI/Leptospira/Leptospira_borgpetersenii.tgz',
        'name': 'Leptospira_borgpetersenii',
        'enid': '57bba077f1e3f40058fe1133'
      },
      {
        'path': 'chinacdc:/ANI/Leptospira/Leptospira_interrogans.tgz',
        'name': 'Leptospira_interrogans',
        'enid': '57bba081f1e3f4005cfe1179'
      }
    ]
  },
  {
    'name': 'Leptospirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leptospirillum/Leptospirillum_ferriphilum.tgz',
        'name': 'Leptospirillum_ferriphilum',
        'enid': '57bbaeb4f1e3f40051fe1062'
      },
      {
        'path': 'chinacdc:/ANI/Leptospirillum/Leptospirillum_ferrooxidans.tgz',
        'name': 'Leptospirillum_ferrooxidans',
        'enid': '57bbaebcf1e3f4004efe1198'
      }
    ]
  },
  {
    'name': 'Leptothrix',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leptothrix/Leptothrix_cholodnii.tgz',
        'name': 'Leptothrix_cholodnii',
        'enid': '57bbc509f1e3f4005cfe162a'
      }
    ]
  },
  {
    'name': 'Leptotrichia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leptotrichia/Leptotrichia_buccalis.tgz',
        'name': 'Leptotrichia_buccalis',
        'enid': '57bbbefaf1e3f40058fe12f0'
      }
    ]
  },
  {
    'name': 'Leuconostoc',
    'species': [
      {
        'path': 'chinacdc:/ANI/Leuconostoc/Leuconostoc_C2.tgz',
        'name': 'Leuconostoc_C2',
        'enid': '57bb90aef1e3f4004afe0f68'
      },
      {
        'path': 'chinacdc:/ANI/Leuconostoc/Leuconostoc_carnosum.tgz',
        'name': 'Leuconostoc_carnosum',
        'enid': '57bb9095f1e3f40057fe0f94'
      },
      {
        'path': 'chinacdc:/ANI/Leuconostoc/Leuconostoc_citreum.tgz',
        'name': 'Leuconostoc_citreum',
        'enid': '57bb90b6f1e3f40047fe0f45'
      },
      {
        'path': 'chinacdc:/ANI/Leuconostoc/Leuconostoc_gasicomitatum.tgz',
        'name': 'Leuconostoc_gasicomitatum',
        'enid': '57bb908df1e3f4004efe100b'
      },
      {
        'path': 'chinacdc:/ANI/Leuconostoc/Leuconostoc_gelidum.tgz',
        'name': 'Leuconostoc_gelidum',
        'enid': '57bb90a6f1e3f40057fe0f98'
      },
      {
        'path': 'chinacdc:/ANI/Leuconostoc/Leuconostoc_kimchii.tgz',
        'name': 'Leuconostoc_kimchii',
        'enid': '57bb90bdf1e3f4003bfe0f2c'
      },
      {
        'path': 'chinacdc:/ANI/Leuconostoc/Leuconostoc_mesenteroides.tgz',
        'name': 'Leuconostoc_mesenteroides',
        'enid': '57bb909df1e3f40058fe1025'
      }
    ]
  },
  {
    'name': 'Listeria',
    'species': [
      {
        'path': 'chinacdc:/ANI/Listeria/Listeria_innocua.tgz',
        'name': 'Listeria_innocua',
        'enid': '57bbc4caf1e3f40059fe1619'
      },
      {
        'path': 'chinacdc:/ANI/Listeria/Listeria_ivanovii.tgz',
        'name': 'Listeria_ivanovii',
        'enid': '57bbc4c0f1e3f40058fe14ba'
      },
      {
        'path': 'chinacdc:/ANI/Listeria/Listeria_monocytogenes.tgz',
        'name': 'Listeria_monocytogenes',
        'enid': '57bbc45cf1e3f40043fe0fb0'
      },
      {
        'path': 'chinacdc:/ANI/Listeria/Listeria_seeligeri.tgz',
        'name': 'Listeria_seeligeri',
        'enid': '57bbc4b5f1e3f40047fe1031'
      },
      {
        'path': 'chinacdc:/ANI/Listeria/Listeria_welshimeri.tgz',
        'name': 'Listeria_welshimeri',
        'enid': '57bbc450f1e3f4003bfe0f8f'
      }
    ]
  },
  {
    'name': 'Listonella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Listonella/Listonella_anguillarum.tgz',
        'name': 'Listonella_anguillarum',
        'enid': '57bb9d1bf1e3f4005cfe112e'
      }
    ]
  },
  {
    'name': 'Lysinibacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Lysinibacillus/Lysinibacillus_sphaericus.tgz',
        'name': 'Lysinibacillus_sphaericus',
        'enid': '57bbb137f1e3f4005cfe12e5'
      }
    ]
  },
  {
    'name': 'Macrococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Macrococcus/Macrococcus_caseolyticus.tgz',
        'name': 'Macrococcus_caseolyticus',
        'enid': '57bbc992f1e3f4005cfe1d4d'
      }
    ]
  },
  {
    'name': 'Magnetococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Magnetococcus/Magnetococcus_MC.tgz',
        'name': 'Magnetococcus_MC',
        'enid': '57bbbdbaf1e3f40059fe13a4'
      }
    ]
  },
  {
    'name': 'Magnetospirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Magnetospirillum/Magnetospirillum_gryphiswaldense.tgz',
        'name': 'Magnetospirillum_gryphiswaldense',
        'enid': '57bbb6edf1e3f40059fe1307'
      },
      {
        'path': 'chinacdc:/ANI/Magnetospirillum/Magnetospirillum_magneticum.tgz',
        'name': 'Magnetospirillum_magneticum',
        'enid': '57bbb6e4f1e3f4005cfe1337'
      }
    ]
  },
  {
    'name': 'Mahella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mahella/Mahella_australiensis.tgz',
        'name': 'Mahella_australiensis',
        'enid': '57bba21af1e3f40046fe0ffc'
      }
    ]
  },
  {
    'name': 'Mannheimia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mannheimia/Mannheimia_haemolytica.tgz',
        'name': 'Mannheimia_haemolytica',
        'enid': '57bba0ebf1e3f4004dfe0fb1'
      },
      {
        'path': 'chinacdc:/ANI/Mannheimia/Mannheimia_succiniciproducens.tgz',
        'name': 'Mannheimia_succiniciproducens',
        'enid': '57bba101f1e3f40058fe1139'
      }
    ]
  },
  {
    'name': 'Maricaulis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Maricaulis/Maricaulis_maris.tgz',
        'name': 'Maricaulis_maris',
        'enid': '57bb9c29f1e3f40058fe10ae'
      }
    ]
  },
  {
    'name': 'Marinithermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Marinithermus/Marinithermus_hydrothermalis.tgz',
        'name': 'Marinithermus_hydrothermalis',
        'enid': '57bbb393f1e3f4004efe11ca'
      }
    ]
  },
  {
    'name': 'Marinitoga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Marinitoga/Marinitoga_piezophila.tgz',
        'name': 'Marinitoga_piezophila',
        'enid': '57bbc96ef1e3f40051fe125a'
      }
    ]
  },
  {
    'name': 'Marinobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Marinobacter/Marinobacter_BSs20148.tgz',
        'name': 'Marinobacter_BSs20148',
        'enid': '57bbcfbcf1e3f4005cfe2cc6'
      },
      {
        'path': 'chinacdc:/ANI/Marinobacter/Marinobacter_adhaerens.tgz',
        'name': 'Marinobacter_adhaerens',
        'enid': '57bbcfb2f1e3f40053fe1b48'
      },
      {
        'path': 'chinacdc:/ANI/Marinobacter/Marinobacter_aquaeolei.tgz',
        'name': 'Marinobacter_aquaeolei',
        'enid': '57bbcfcdf1e3f40040fe1140'
      },
      {
        'path': 'chinacdc:/ANI/Marinobacter/Marinobacter_hydrocarbonoclasticus.tgz',
        'name': 'Marinobacter_hydrocarbonoclasticus',
        'enid': '57bbcfc6f1e3f4004efe160d'
      }
    ]
  },
  {
    'name': 'Marinomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Marinomonas/Marinomonas_MWYL1.tgz',
        'name': 'Marinomonas_MWYL1',
        'enid': '57bbc19cf1e3f4004efe12a8'
      },
      {
        'path': 'chinacdc:/ANI/Marinomonas/Marinomonas_mediterranea.tgz',
        'name': 'Marinomonas_mediterranea',
        'enid': '57bbc1acf1e3f40051fe1118'
      },
      {
        'path': 'chinacdc:/ANI/Marinomonas/Marinomonas_posidonica.tgz',
        'name': 'Marinomonas_posidonica',
        'enid': '57bbc1a4f1e3f40059fe148c'
      }
    ]
  },
  {
    'name': 'Marivirga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Marivirga/Marivirga_tractuosa.tgz',
        'name': 'Marivirga_tractuosa',
        'enid': '57bb9788f1e3f4005cfe1099'
      }
    ]
  },
  {
    'name': 'Megamonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Megamonas/Megamonas_hypermegale.tgz',
        'name': 'Megamonas_hypermegale',
        'enid': '57bbd007f1e3f40053fe1b63'
      }
    ]
  },
  {
    'name': 'Meiothermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Meiothermus/Meiothermus_ruber.tgz',
        'name': 'Meiothermus_ruber',
        'enid': '57bbc042f1e3f40057fe11d5'
      },
      {
        'path': 'chinacdc:/ANI/Meiothermus/Meiothermus_silvanus.tgz',
        'name': 'Meiothermus_silvanus',
        'enid': '57bbc04bf1e3f40057fe11d9'
      }
    ]
  },
  {
    'name': 'Melioribacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Melioribacter/Melioribacter_roseus.tgz',
        'name': 'Melioribacter_roseus',
        'enid': '57bbb429f1e3f40057fe10eb'
      }
    ]
  },
  {
    'name': 'Melissococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Melissococcus/Melissococcus_plutonius.tgz',
        'name': 'Melissococcus_plutonius',
        'enid': '57bbca0bf1e3f40051fe1280'
      }
    ]
  },
  {
    'name': 'Mesoplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mesoplasma/Mesoplasma_florum.tgz',
        'name': 'Mesoplasma_florum',
        'enid': '57bbcf35f1e3f40057fe1519'
      }
    ]
  },
  {
    'name': 'Mesorhizobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mesorhizobium/Mesorhizobium_australicum.tgz',
        'name': 'Mesorhizobium_australicum',
        'enid': '57bba013f1e3f40053fe118d'
      },
      {
        'path': 'chinacdc:/ANI/Mesorhizobium/Mesorhizobium_ciceri.tgz',
        'name': 'Mesorhizobium_ciceri',
        'enid': '57bba01df1e3f4005cfe1172'
      },
      {
        'path': 'chinacdc:/ANI/Mesorhizobium/Mesorhizobium_loti.tgz',
        'name': 'Mesorhizobium_loti',
        'enid': '57bba00af1e3f40059fe116a'
      },
      {
        'path': 'chinacdc:/ANI/Mesorhizobium/Mesorhizobium_opportunistum.tgz',
        'name': 'Mesorhizobium_opportunistum',
        'enid': '57bb9ffef1e3f40057fe103f'
      }
    ]
  },
  {
    'name': 'Mesotoga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mesotoga/Mesotoga_prima.tgz',
        'name': 'Mesotoga_prima',
        'enid': '57bba73ff1e3f40046fe1030'
      }
    ]
  },
  {
    'name': 'Metallosphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Metallosphaera/Metallosphaera_cuprina.tgz',
        'name': 'Metallosphaera_cuprina',
        'enid': '57bba6bcf1e3f4003efe0f2f'
      },
      {
        'path': 'chinacdc:/ANI/Metallosphaera/Metallosphaera_sedula.tgz',
        'name': 'Metallosphaera_sedula',
        'enid': '57bba6c4f1e3f4004efe1120'
      }
    ]
  },
  {
    'name': 'Methanobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanobacterium/Methanobacterium_AL.tgz',
        'name': 'Methanobacterium_AL',
        'enid': '57bbcdc4f1e3f4004efe1561'
      },
      {
        'path': 'chinacdc:/ANI/Methanobacterium/Methanobacterium_MB1.tgz',
        'name': 'Methanobacterium_MB1',
        'enid': '57bbcdcef1e3f4003bfe1027'
      },
      {
        'path': 'chinacdc:/ANI/Methanobacterium/Methanobacterium_SWAN.tgz',
        'name': 'Methanobacterium_SWAN',
        'enid': '57bbcdd6f1e3f40057fe14b9'
      }
    ]
  },
  {
    'name': 'Methanobrevibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanobrevibacter/Methanobrevibacter_AbM4.tgz',
        'name': 'Methanobrevibacter_AbM4',
        'enid': '57bb975bf1e3f40046fe0fb1'
      },
      {
        'path': 'chinacdc:/ANI/Methanobrevibacter/Methanobrevibacter_ruminantium.tgz',
        'name': 'Methanobrevibacter_ruminantium',
        'enid': '57bb9763f1e3f40051fe0fd2'
      },
      {
        'path': 'chinacdc:/ANI/Methanobrevibacter/Methanobrevibacter_smithii.tgz',
        'name': 'Methanobrevibacter_smithii',
        'enid': '57bb976af1e3f4005cfe108f'
      }
    ]
  },
  {
    'name': 'Methanocaldococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanocaldococcus/Methanocaldococcus_FS406.tgz',
        'name': 'Methanocaldococcus_FS406',
        'enid': '57bbcef5f1e3f4004efe15df'
      },
      {
        'path': 'chinacdc:/ANI/Methanocaldococcus/Methanocaldococcus_fervens.tgz',
        'name': 'Methanocaldococcus_fervens',
        'enid': '57bbcf14f1e3f4005cfe2b09'
      },
      {
        'path': 'chinacdc:/ANI/Methanocaldococcus/Methanocaldococcus_infernus.tgz',
        'name': 'Methanocaldococcus_infernus',
        'enid': '57bbcf0cf1e3f4005cfe2af7'
      },
      {
        'path': 'chinacdc:/ANI/Methanocaldococcus/Methanocaldococcus_jannaschii.tgz',
        'name': 'Methanocaldococcus_jannaschii',
        'enid': '57bbcefdf1e3f40053fe1b21'
      },
      {
        'path': 'chinacdc:/ANI/Methanocaldococcus/Methanocaldococcus_vulcanius.tgz',
        'name': 'Methanocaldococcus_vulcanius',
        'enid': '57bbcf04f1e3f40053fe1b25'
      }
    ]
  },
  {
    'name': 'Methanocella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanocella/Methanocella_arvoryzae.tgz',
        'name': 'Methanocella_arvoryzae',
        'enid': '57bba9caf1e3f40058fe11bd'
      },
      {
        'path': 'chinacdc:/ANI/Methanocella/Methanocella_conradii.tgz',
        'name': 'Methanocella_conradii',
        'enid': '57bba9def1e3f4004efe1160'
      },
      {
        'path': 'chinacdc:/ANI/Methanocella/Methanocella_paludicola.tgz',
        'name': 'Methanocella_paludicola',
        'enid': '57bba9d4f1e3f40057fe10a6'
      }
    ]
  },
  {
    'name': 'Methanococcoides',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanococcoides/Methanococcoides_burtonii.tgz',
        'name': 'Methanococcoides_burtonii',
        'enid': '57bbcf80f1e3f40058fe1811'
      }
    ]
  },
  {
    'name': 'Methanococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanococcus/Methanococcus_aeolicus.tgz',
        'name': 'Methanococcus_aeolicus',
        'enid': '57bba49cf1e3f40059fe11aa'
      },
      {
        'path': 'chinacdc:/ANI/Methanococcus/Methanococcus_maripaludis.tgz',
        'name': 'Methanococcus_maripaludis',
        'enid': '57bba491f1e3f40051fe1018'
      },
      {
        'path': 'chinacdc:/ANI/Methanococcus/Methanococcus_vannielii.tgz',
        'name': 'Methanococcus_vannielii',
        'enid': '57bba4acf1e3f40042fe0f74'
      },
      {
        'path': 'chinacdc:/ANI/Methanococcus/Methanococcus_voltae.tgz',
        'name': 'Methanococcus_voltae',
        'enid': '57bba4a4f1e3f4003bfe0f45'
      }
    ]
  },
  {
    'name': 'Methanocorpusculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanocorpusculum/Methanocorpusculum_labreanum.tgz',
        'name': 'Methanocorpusculum_labreanum',
        'enid': '57bbce76f1e3f40051fe1305'
      }
    ]
  },
  {
    'name': 'Methanoculleus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanoculleus/Methanoculleus_bourgensis.tgz',
        'name': 'Methanoculleus_bourgensis',
        'enid': '57bbb727f1e3f4005cfe1342'
      },
      {
        'path': 'chinacdc:/ANI/Methanoculleus/Methanoculleus_marisnigri.tgz',
        'name': 'Methanoculleus_marisnigri',
        'enid': '57bbb731f1e3f4004efe11fc'
      }
    ]
  },
  {
    'name': 'Methanohalobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanohalobium/Methanohalobium_evestigatum.tgz',
        'name': 'Methanohalobium_evestigatum',
        'enid': '57bbbf0cf1e3f40059fe13e5'
      }
    ]
  },
  {
    'name': 'Methanohalophilus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanohalophilus/Methanohalophilus_mahii.tgz',
        'name': 'Methanohalophilus_mahii',
        'enid': '57bbc518f1e3f4004afe112b'
      }
    ]
  },
  {
    'name': 'Methanolobus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanolobus/Methanolobus_psychrophilus.tgz',
        'name': 'Methanolobus_psychrophilus',
        'enid': '57bbc95df1e3f40040fe10bc'
      }
    ]
  },
  {
    'name': 'Methanomassiliicoccus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanomassiliicoccus/Methanomassiliicoccus_Mx1.tgz',
        'name': 'Methanomassiliicoccus_Mx1',
        'enid': '57bbd357f1e3f40047fe1133'
      }
    ]
  },
  {
    'name': 'Methanomethylovorans',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanomethylovorans/Methanomethylovorans_hollandica.tgz',
        'name': 'Methanomethylovorans_hollandica',
        'enid': '57bbc59df1e3f40041fe0fa8'
      }
    ]
  },
  {
    'name': 'Methanoplanus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanoplanus/Methanoplanus_petrolearius.tgz',
        'name': 'Methanoplanus_petrolearius',
        'enid': '57bbb0ddf1e3f40053fe133c'
      }
    ]
  },
  {
    'name': 'Methanopyrus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanopyrus/Methanopyrus_kandleri.tgz',
        'name': 'Methanopyrus_kandleri',
        'enid': '57bba8fbf1e3f40053fe128a'
      }
    ]
  },
  {
    'name': 'Methanoregula',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanoregula/Methanoregula_boonei.tgz',
        'name': 'Methanoregula_boonei',
        'enid': '57bbd057f1e3f4005cfe2e5c'
      },
      {
        'path': 'chinacdc:/ANI/Methanoregula/Methanoregula_formicicum.tgz',
        'name': 'Methanoregula_formicicum',
        'enid': '57bbd060f1e3f40053fe1b8c'
      }
    ]
  },
  {
    'name': 'Methanosaeta',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanosaeta/Methanosaeta_concilii.tgz',
        'name': 'Methanosaeta_concilii',
        'enid': '57bbac7df1e3f40053fe12cd'
      },
      {
        'path': 'chinacdc:/ANI/Methanosaeta/Methanosaeta_harundinacea.tgz',
        'name': 'Methanosaeta_harundinacea',
        'enid': '57bbac75f1e3f40058fe11ee'
      },
      {
        'path': 'chinacdc:/ANI/Methanosaeta/Methanosaeta_thermophila.tgz',
        'name': 'Methanosaeta_thermophila',
        'enid': '57bbac6ef1e3f40053fe12c7'
      }
    ]
  },
  {
    'name': 'Methanosalsum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanosalsum/Methanosalsum_zhilinae.tgz',
        'name': 'Methanosalsum_zhilinae',
        'enid': '57bbb065f1e3f40058fe1209'
      }
    ]
  },
  {
    'name': 'Methanosarcina',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanosarcina/Methanosarcina_acetivorans.tgz',
        'name': 'Methanosarcina_acetivorans',
        'enid': '57bb9ca4f1e3f40040fe0f70'
      },
      {
        'path': 'chinacdc:/ANI/Methanosarcina/Methanosarcina_barkeri.tgz',
        'name': 'Methanosarcina_barkeri',
        'enid': '57bb9cadf1e3f40057fe1013'
      },
      {
        'path': 'chinacdc:/ANI/Methanosarcina/Methanosarcina_mazei.tgz',
        'name': 'Methanosarcina_mazei',
        'enid': '57bb9c9af1e3f4005cfe1123'
      }
    ]
  },
  {
    'name': 'Methanosphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanosphaera/Methanosphaera_stadtmanae.tgz',
        'name': 'Methanosphaera_stadtmanae',
        'enid': '57bbcb66f1e3f40059fe1964'
      }
    ]
  },
  {
    'name': 'Methanosphaerula',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanosphaerula/Methanosphaerula_palustris.tgz',
        'name': 'Methanosphaerula_palustris',
        'enid': '57bbc97ef1e3f40058fe1679'
      }
    ]
  },
  {
    'name': 'Methanospirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanospirillum/Methanospirillum_hungatei.tgz',
        'name': 'Methanospirillum_hungatei',
        'enid': '57bbc2f0f1e3f40058fe13e9'
      }
    ]
  },
  {
    'name': 'Methanothermobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanothermobacter/Methanothermobacter_marburgensis.tgz',
        'name': 'Methanothermobacter_marburgensis',
        'enid': '57bbc701f1e3f40040fe1086'
      },
      {
        'path': 'chinacdc:/ANI/Methanothermobacter/Methanothermobacter_thermautotrophicus.tgz',
        'name': 'Methanothermobacter_thermautotrophicus',
        'enid': '57bbc709f1e3f40035fe0f42'
      }
    ]
  },
  {
    'name': 'Methanothermococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanothermococcus/Methanothermococcus_okinawensis.tgz',
        'name': 'Methanothermococcus_okinawensis',
        'enid': '57bbc06df1e3f40057fe11e0'
      }
    ]
  },
  {
    'name': 'Methanothermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanothermus/Methanothermus_fervidus.tgz',
        'name': 'Methanothermus_fervidus',
        'enid': '57bbd13df1e3f40040fe115f'
      }
    ]
  },
  {
    'name': 'Methanotorris',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methanotorris/Methanotorris_igneus.tgz',
        'name': 'Methanotorris_igneus',
        'enid': '57bbc710f1e3f4004afe118b'
      }
    ]
  },
  {
    'name': 'Methylacidiphilum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylacidiphilum/Methylacidiphilum_infernorum.tgz',
        'name': 'Methylacidiphilum_infernorum',
        'enid': '57bb9592f1e3f4004efe1043'
      }
    ]
  },
  {
    'name': 'Methylibium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylibium/Methylibium_petroleiphilum.tgz',
        'name': 'Methylibium_petroleiphilum',
        'enid': '57bbb0d4f1e3f4004dfe100b'
      }
    ]
  },
  {
    'name': 'Methylobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylobacillus/Methylobacillus_flagellatus.tgz',
        'name': 'Methylobacillus_flagellatus',
        'enid': '57bbce6cf1e3f40046fe127e'
      }
    ]
  },
  {
    'name': 'Methylobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylobacterium/Methylobacterium_4.tgz',
        'name': 'Methylobacterium_4',
        'enid': '57bb9132f1e3f40059fe102f'
      },
      {
        'path': 'chinacdc:/ANI/Methylobacterium/Methylobacterium_chloromethanicum.tgz',
        'name': 'Methylobacterium_chloromethanicum',
        'enid': '57bb910af1e3f4002efe0f26'
      },
      {
        'path': 'chinacdc:/ANI/Methylobacterium/Methylobacterium_extorquens.tgz',
        'name': 'Methylobacterium_extorquens',
        'enid': '57bb911ef1e3f40040fe0f5f'
      },
      {
        'path': 'chinacdc:/ANI/Methylobacterium/Methylobacterium_nodulans.tgz',
        'name': 'Methylobacterium_nodulans',
        'enid': '57bb90fef1e3f40040fe0f5b'
      },
      {
        'path': 'chinacdc:/ANI/Methylobacterium/Methylobacterium_populi.tgz',
        'name': 'Methylobacterium_populi',
        'enid': '57bb9114f1e3f40058fe1029'
      },
      {
        'path': 'chinacdc:/ANI/Methylobacterium/Methylobacterium_radiotolerans.tgz',
        'name': 'Methylobacterium_radiotolerans',
        'enid': '57bb913df1e3f4005cfe1022'
      }
    ]
  },
  {
    'name': 'Methylocella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylocella/Methylocella_silvestris.tgz',
        'name': 'Methylocella_silvestris',
        'enid': '57bba4b3f1e3f4005cfe11b2'
      }
    ]
  },
  {
    'name': 'Methylococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylococcus/Methylococcus_capsulatus.tgz',
        'name': 'Methylococcus_capsulatus',
        'enid': '57bbb718f1e3f4004afe101a'
      }
    ]
  },
  {
    'name': 'Methylocystis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylocystis/Methylocystis_SC2.tgz',
        'name': 'Methylocystis_SC2',
        'enid': '57bbc37af1e3f40059fe1539'
      }
    ]
  },
  {
    'name': 'Methylomicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylomicrobium/Methylomicrobium_alcaliphilum.tgz',
        'name': 'Methylomicrobium_alcaliphilum',
        'enid': '57bbca7ff1e3f40059fe1910'
      }
    ]
  },
  {
    'name': 'Methylomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylomonas/Methylomonas_methanica.tgz',
        'name': 'Methylomonas_methanica',
        'enid': '57bba97cf1e3f4004dfe0fd6'
      }
    ]
  },
  {
    'name': 'Methylophaga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylophaga/Methylophaga_JAM1.tgz',
        'name': 'Methylophaga_JAM1',
        'enid': '57bb9f05f1e3f40059fe1153'
      },
      {
        'path': 'chinacdc:/ANI/Methylophaga/Methylophaga_JAM7.tgz',
        'name': 'Methylophaga_JAM7',
        'enid': '57bb9efbf1e3f4004afe0f98'
      }
    ]
  },
  {
    'name': 'Methylotenera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylotenera/Methylotenera_301.tgz',
        'name': 'Methylotenera_301',
        'enid': '57bbc0d0f1e3f40058fe1343'
      },
      {
        'path': 'chinacdc:/ANI/Methylotenera/Methylotenera_mobilis.tgz',
        'name': 'Methylotenera_mobilis',
        'enid': '57bbc0daf1e3f40059fe145b'
      }
    ]
  },
  {
    'name': 'Methylovorus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Methylovorus/Methylovorus_MP688.tgz',
        'name': 'Methylovorus_MP688',
        'enid': '57bba69ff1e3f40046fe1022'
      },
      {
        'path': 'chinacdc:/ANI/Methylovorus/Methylovorus_glucosetrophus.tgz',
        'name': 'Methylovorus_glucosetrophus',
        'enid': '57bba695f1e3f40040fe0f94'
      }
    ]
  },
  {
    'name': 'Micavibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Micavibrio/Micavibrio_EPB.tgz',
        'name': 'Micavibrio_EPB',
        'enid': '57bbc3ecf1e3f40053fe1632'
      },
      {
        'path': 'chinacdc:/ANI/Micavibrio/Micavibrio_aeruginosavorus.tgz',
        'name': 'Micavibrio_aeruginosavorus',
        'enid': '57bbc3f3f1e3f40046fe1108'
      }
    ]
  },
  {
    'name': 'Microbacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Microbacterium/Microbacterium_testaceum.tgz',
        'name': 'Microbacterium_testaceum',
        'enid': '57bba749f1e3f4004efe113f'
      }
    ]
  },
  {
    'name': 'Micrococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Micrococcus/Micrococcus_luteus.tgz',
        'name': 'Micrococcus_luteus',
        'enid': '57bbc2f9f1e3f40059fe14f2'
      }
    ]
  },
  {
    'name': 'Microcoleus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Microcoleus/Microcoleus_PCC.tgz',
        'name': 'Microcoleus_PCC',
        'enid': '57bb9f86f1e3f40051fe0ffa'
      }
    ]
  },
  {
    'name': 'Microcystis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Microcystis/Microcystis_aeruginosa.tgz',
        'name': 'Microcystis_aeruginosa',
        'enid': '57bba8b3f1e3f40040fe0fa2'
      }
    ]
  },
  {
    'name': 'Microlunatus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Microlunatus/Microlunatus_phosphovorus.tgz',
        'name': 'Microlunatus_phosphovorus',
        'enid': '57bbd0adf1e3f4004efe165b'
      }
    ]
  },
  {
    'name': 'Micromonospora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Micromonospora/Micromonospora_L5.tgz',
        'name': 'Micromonospora_L5',
        'enid': '57bbc4e2f1e3f40038fe0f52'
      },
      {
        'path': 'chinacdc:/ANI/Micromonospora/Micromonospora_aurantiaca.tgz',
        'name': 'Micromonospora_aurantiaca',
        'enid': '57bbc4f0f1e3f40051fe117a'
      }
    ]
  },
  {
    'name': 'Mobiluncus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mobiluncus/Mobiluncus_curtisii.tgz',
        'name': 'Mobiluncus_curtisii',
        'enid': '57bbc309f1e3f40058fe13f0'
      }
    ]
  },
  {
    'name': 'Modestobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Modestobacter/Modestobacter_marinus.tgz',
        'name': 'Modestobacter_marinus',
        'enid': '57bb9df1f1e3f40047fe0f82'
      }
    ]
  },
  {
    'name': 'Moorella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Moorella/Moorella_thermoacetica.tgz',
        'name': 'Moorella_thermoacetica',
        'enid': '57bbb6ccf1e3f40053fe13ab'
      }
    ]
  },
  {
    'name': 'Moraxella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Moraxella/Moraxella_catarrhalis.tgz',
        'name': 'Moraxella_catarrhalis',
        'enid': '57bbcb2af1e3f40059fe194a'
      }
    ]
  },
  {
    'name': 'Morganella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Morganella/Morganella_morganii.tgz',
        'name': 'Morganella_morganii',
        'enid': '57bb9e22f1e3f40057fe101c'
      }
    ]
  },
  {
    'name': 'Muricauda',
    'species': [
      {
        'path': 'chinacdc:/ANI/Muricauda/Muricauda_ruestringensis.tgz',
        'name': 'Muricauda_ruestringensis',
        'enid': '57bbacaff1e3f40051fe1046'
      }
    ]
  },
  {
    'name': 'Mycobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_JDM601.tgz',
        'name': 'Mycobacterium_JDM601',
        'enid': '57bbb866f1e3f40057fe1144'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_JLS.tgz',
        'name': 'Mycobacterium_JLS',
        'enid': '57bbb9f0f1e3f40058fe125f'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_KMS.tgz',
        'name': 'Mycobacterium_KMS',
        'enid': '57bbb9cbf1e3f4004dfe101f'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_MCS.tgz',
        'name': 'Mycobacterium_MCS',
        'enid': '57bbb941f1e3f40058fe1258'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_MOTT36Y.tgz',
        'name': 'Mycobacterium_MOTT36Y',
        'enid': '57bbb937f1e3f40059fe1343'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_VKM.tgz',
        'name': 'Mycobacterium_VKM',
        'enid': '57bbb8b8f1e3f40059fe133b'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_abscessus.tgz',
        'name': 'Mycobacterium_abscessus',
        'enid': '57bbba03f1e3f40053fe13e4'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_africanum.tgz',
        'name': 'Mycobacterium_africanum',
        'enid': '57bbb94bf1e3f4004afe101e'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_avium.tgz',
        'name': 'Mycobacterium_avium',
        'enid': '57bbb99bf1e3f40059fe134b'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_bovis.tgz',
        'name': 'Mycobacterium_bovis',
        'enid': '57bbb983f1e3f40059fe1347'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_canettii.tgz',
        'name': 'Mycobacterium_canettii',
        'enid': '57bbb883f1e3f40057fe1148'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_chubuense.tgz',
        'name': 'Mycobacterium_chubuense',
        'enid': '57bbb8c2f1e3f4004efe1210'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_gilvum.tgz',
        'name': 'Mycobacterium_gilvum',
        'enid': '57bbb955f1e3f4004efe1217'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_indicus.tgz',
        'name': 'Mycobacterium_indicus',
        'enid': '57bbb9f9f1e3f4004dfe1023'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_intracellulare.tgz',
        'name': 'Mycobacterium_intracellulare',
        'enid': '57bbb96ff1e3f40057fe114c'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_kansasii.tgz',
        'name': 'Mycobacterium_kansasii',
        'enid': '57bbb9dcf1e3f40057fe1150'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_leprae.tgz',
        'name': 'Mycobacterium_leprae',
        'enid': '57bbb9d4f1e3f40059fe134f'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_liflandii.tgz',
        'name': 'Mycobacterium_liflandii',
        'enid': '57bbb870f1e3f40059fe1333'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_marinum.tgz',
        'name': 'Mycobacterium_marinum',
        'enid': '57bbb9b7f1e3f4005cfe1369'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_massiliense.tgz',
        'name': 'Mycobacterium_massiliense',
        'enid': '57bbb9adf1e3f40053fe13dc'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_rhodesiae.tgz',
        'name': 'Mycobacterium_rhodesiae',
        'enid': '57bbb965f1e3f40053fe13d7'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_smegmatis.tgz',
        'name': 'Mycobacterium_smegmatis',
        'enid': '57bbb8a0f1e3f40059fe1337'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_tuberculosis.tgz',
        'name': 'Mycobacterium_tuberculosis',
        'enid': '57bbb8dbf1e3f40053fe13d3'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_ulcerans.tgz',
        'name': 'Mycobacterium_ulcerans',
        'enid': '57bbb9e6f1e3f40053fe13e0'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_vanbaalenii.tgz',
        'name': 'Mycobacterium_vanbaalenii',
        'enid': '57bbb9c1f1e3f4005cfe136d'
      },
      {
        'path': 'chinacdc:/ANI/Mycobacterium/Mycobacterium_yongonense.tgz',
        'name': 'Mycobacterium_yongonense',
        'enid': '57bbb8ccf1e3f40059fe133f'
      }
    ]
  },
  {
    'name': 'Mycoplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_agalactiae.tgz',
        'name': 'Mycoplasma_agalactiae',
        'enid': '57bba7def1e3f4005cfe11e3'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_arthritidis.tgz',
        'name': 'Mycoplasma_arthritidis',
        'enid': '57bba78ef1e3f40053fe124c'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_bovis.tgz',
        'name': 'Mycoplasma_bovis',
        'enid': '57bba7c9f1e3f4003ffe0f5b'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_capricolum.tgz',
        'name': 'Mycoplasma_capricolum',
        'enid': '57bba7fcf1e3f40053fe1261'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_conjunctivae.tgz',
        'name': 'Mycoplasma_conjunctivae',
        'enid': '57bba7baf1e3f40059fe11cc'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_crocodyli.tgz',
        'name': 'Mycoplasma_crocodyli',
        'enid': '57bba7b4f1e3f4004efe1155'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_cynos.tgz',
        'name': 'Mycoplasma_cynos',
        'enid': '57bba813f1e3f40059fe11d8'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_fermentans.tgz',
        'name': 'Mycoplasma_fermentans',
        'enid': '57bba77df1e3f40058fe119f'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_gallisepticum.tgz',
        'name': 'Mycoplasma_gallisepticum',
        'enid': '57bba7eef1e3f4005cfe11e7'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_genitalium.tgz',
        'name': 'Mycoplasma_genitalium',
        'enid': '57bba801f1e3f40057fe1084'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_haemocanis.tgz',
        'name': 'Mycoplasma_haemocanis',
        'enid': '57bba818f1e3f40059fe11dc'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_haemofelis.tgz',
        'name': 'Mycoplasma_haemofelis',
        'enid': '57bba775f1e3f4004efe114d'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_hominis.tgz',
        'name': 'Mycoplasma_hominis',
        'enid': '57bba7d9f1e3f40053fe1259'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_hyopneumoniae.tgz',
        'name': 'Mycoplasma_hyopneumoniae',
        'enid': '57bba81ef1e3f40058fe11a7'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_hyorhinis.tgz',
        'name': 'Mycoplasma_hyorhinis',
        'enid': '57bba82ef1e3f40053fe1269'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_leachii.tgz',
        'name': 'Mycoplasma_leachii',
        'enid': '57bba7e6f1e3f40053fe125d'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_mobile.tgz',
        'name': 'Mycoplasma_mobile',
        'enid': '57bba794f1e3f4004efe1151'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_mycoides.tgz',
        'name': 'Mycoplasma_mycoides',
        'enid': '57bba7c0f1e3f40033fe0f2b'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_ovis.tgz',
        'name': 'Mycoplasma_ovis',
        'enid': '57bba79ff1e3f40053fe1250'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_parvum.tgz',
        'name': 'Mycoplasma_parvum',
        'enid': '57bba828f1e3f4005cfe11eb'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_penetrans.tgz',
        'name': 'Mycoplasma_penetrans',
        'enid': '57bba7a5f1e3f4005cfe11df'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_pneumoniae.tgz',
        'name': 'Mycoplasma_pneumoniae',
        'enid': '57bba7abf1e3f40057fe1080'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_pulmonis.tgz',
        'name': 'Mycoplasma_pulmonis',
        'enid': '57bba79af1e3f40058fe11a3'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_putrefaciens.tgz',
        'name': 'Mycoplasma_putrefaciens',
        'enid': '57bba80bf1e3f40053fe1265'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_suis.tgz',
        'name': 'Mycoplasma_suis',
        'enid': '57bba787f1e3f40057fe107c'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_synoviae.tgz',
        'name': 'Mycoplasma_synoviae',
        'enid': '57bba7d3f1e3f40046fe1034'
      },
      {
        'path': 'chinacdc:/ANI/Mycoplasma/Mycoplasma_wenyonii.tgz',
        'name': 'Mycoplasma_wenyonii',
        'enid': '57bba770f1e3f4004dfe0fcc'
      }
    ]
  },
  {
    'name': 'Myxococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Myxococcus/Myxococcus_fulvus.tgz',
        'name': 'Myxococcus_fulvus',
        'enid': '57bb9badf1e3f4005cfe10fb'
      },
      {
        'path': 'chinacdc:/ANI/Myxococcus/Myxococcus_stipitatus.tgz',
        'name': 'Myxococcus_stipitatus',
        'enid': '57bb9ba1f1e3f4005cfe10f7'
      },
      {
        'path': 'chinacdc:/ANI/Myxococcus/Myxococcus_xanthus.tgz',
        'name': 'Myxococcus_xanthus',
        'enid': '57bb9b95f1e3f40057fe1004'
      }
    ]
  },
  {
    'name': 'Nakamurella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nakamurella/Nakamurella_multipartita.tgz',
        'name': 'Nakamurella_multipartita',
        'enid': '57bbc154f1e3f40046fe10bf'
      }
    ]
  },
  {
    'name': 'Nanoarchaeum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nanoarchaeum/Nanoarchaeum_equitans.tgz',
        'name': 'Nanoarchaeum_equitans',
        'enid': '57bb9147f1e3f40046fe0f76'
      }
    ]
  },
  {
    'name': 'Natranaerobius',
    'species': [
      {
        'path': 'chinacdc:/ANI/Natranaerobius/Natranaerobius_thermophilus.tgz',
        'name': 'Natranaerobius_thermophilus',
        'enid': '57bbc2dcf1e3f40057fe124d'
      }
    ]
  },
  {
    'name': 'Natrialba',
    'species': [
      {
        'path': 'chinacdc:/ANI/Natrialba/Natrialba_magadii.tgz',
        'name': 'Natrialba_magadii',
        'enid': '57bb9bb8f1e3f4004efe10a1'
      }
    ]
  },
  {
    'name': 'Natrinema',
    'species': [
      {
        'path': 'chinacdc:/ANI/Natrinema/Natrinema_J7.tgz',
        'name': 'Natrinema_J7',
        'enid': '57bbad5bf1e3f40053fe12df'
      },
      {
        'path': 'chinacdc:/ANI/Natrinema/Natrinema_pellirubrum.tgz',
        'name': 'Natrinema_pellirubrum',
        'enid': '57bbad51f1e3f40051fe1054'
      }
    ]
  },
  {
    'name': 'Natronobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Natronobacterium/Natronobacterium_gregoryi.tgz',
        'name': 'Natronobacterium_gregoryi',
        'enid': '57bbb67ff1e3f40057fe111b'
      }
    ]
  },
  {
    'name': 'Natronococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Natronococcus/Natronococcus_occultus.tgz',
        'name': 'Natronococcus_occultus',
        'enid': '57bbceebf1e3f40059fe1ad6'
      }
    ]
  },
  {
    'name': 'Natronomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Natronomonas/Natronomonas_moolapensis.tgz',
        'name': 'Natronomonas_moolapensis',
        'enid': '57bb97c2f1e3f4004efe1062'
      },
      {
        'path': 'chinacdc:/ANI/Natronomonas/Natronomonas_pharaonis.tgz',
        'name': 'Natronomonas_pharaonis',
        'enid': '57bb97b8f1e3f40040fe0f6a'
      }
    ]
  },
  {
    'name': 'Nautilia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nautilia/Nautilia_profundicola.tgz',
        'name': 'Nautilia_profundicola',
        'enid': '57bbca77f1e3f4003efe0f76'
      }
    ]
  },
  {
    'name': 'Neisseria',
    'species': [
      {
        'path': 'chinacdc:/ANI/Neisseria/Neisseria_gonorrhoeae.tgz',
        'name': 'Neisseria_gonorrhoeae',
        'enid': '57bbbbd8f1e3f40042fe0f96'
      },
      {
        'path': 'chinacdc:/ANI/Neisseria/Neisseria_lactamica.tgz',
        'name': 'Neisseria_lactamica',
        'enid': '57bbbbcef1e3f40058fe1282'
      },
      {
        'path': 'chinacdc:/ANI/Neisseria/Neisseria_meningitidis.tgz',
        'name': 'Neisseria_meningitidis',
        'enid': '57bbbbe2f1e3f40058fe1286'
      }
    ]
  },
  {
    'name': 'Neorickettsia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Neorickettsia/Neorickettsia_risticii.tgz',
        'name': 'Neorickettsia_risticii',
        'enid': '57bbae3ff1e3f4005cfe128f'
      },
      {
        'path': 'chinacdc:/ANI/Neorickettsia/Neorickettsia_sennetsu.tgz',
        'name': 'Neorickettsia_sennetsu',
        'enid': '57bbae45f1e3f40059fe126f'
      }
    ]
  },
  {
    'name': 'Niastella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Niastella/Niastella_koreensis.tgz',
        'name': 'Niastella_koreensis',
        'enid': '57bb9ab1f1e3f4004efe1096'
      }
    ]
  },
  {
    'name': 'Nitratifractor',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nitratifractor/Nitratifractor_salsuginis.tgz',
        'name': 'Nitratifractor_salsuginis',
        'enid': '57bbca13f1e3f40053fe193a'
      }
    ]
  },
  {
    'name': 'Nitratiruptor',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nitratiruptor/Nitratiruptor_SB155.tgz',
        'name': 'Nitratiruptor_SB155',
        'enid': '57bb9e18f1e3f40053fe116d'
      }
    ]
  },
  {
    'name': 'Nitrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nitrobacter/Nitrobacter_hamburgensis.tgz',
        'name': 'Nitrobacter_hamburgensis',
        'enid': '57bba75cf1e3f40057fe1078'
      },
      {
        'path': 'chinacdc:/ANI/Nitrobacter/Nitrobacter_winogradskyi.tgz',
        'name': 'Nitrobacter_winogradskyi',
        'enid': '57bba753f1e3f4004efe1146'
      }
    ]
  },
  {
    'name': 'Nitrosococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nitrosococcus/Nitrosococcus_halophilus.tgz',
        'name': 'Nitrosococcus_halophilus',
        'enid': '57bbcafbf1e3f40046fe1204'
      },
      {
        'path': 'chinacdc:/ANI/Nitrosococcus/Nitrosococcus_oceani.tgz',
        'name': 'Nitrosococcus_oceani',
        'enid': '57bbcb02f1e3f40058fe16cc'
      },
      {
        'path': 'chinacdc:/ANI/Nitrosococcus/Nitrosococcus_watsonii.tgz',
        'name': 'Nitrosococcus_watsonii',
        'enid': '57bbcb0cf1e3f4005cfe20ed'
      }
    ]
  },
  {
    'name': 'Nitrosomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nitrosomonas/Nitrosomonas_AL212.tgz',
        'name': 'Nitrosomonas_AL212',
        'enid': '57bba8ecf1e3f40059fe11f9'
      },
      {
        'path': 'chinacdc:/ANI/Nitrosomonas/Nitrosomonas_Is79A3.tgz',
        'name': 'Nitrosomonas_Is79A3',
        'enid': '57bba8e4f1e3f40053fe1283'
      },
      {
        'path': 'chinacdc:/ANI/Nitrosomonas/Nitrosomonas_europaea.tgz',
        'name': 'Nitrosomonas_europaea',
        'enid': '57bba8daf1e3f4005cfe11fd'
      },
      {
        'path': 'chinacdc:/ANI/Nitrosomonas/Nitrosomonas_eutropha.tgz',
        'name': 'Nitrosomonas_eutropha',
        'enid': '57bba8d1f1e3f40053fe127f'
      }
    ]
  },
  {
    'name': 'Nitrosopumilus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nitrosopumilus/Nitrosopumilus_maritimus.tgz',
        'name': 'Nitrosopumilus_maritimus',
        'enid': '57bb9d4df1e3f40058fe10d4'
      }
    ]
  },
  {
    'name': 'Nitrosospira',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nitrosospira/Nitrosospira_multiformis.tgz',
        'name': 'Nitrosospira_multiformis',
        'enid': '57bba6d7f1e3f40057fe1070'
      }
    ]
  },
  {
    'name': 'Nocardia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nocardia/Nocardia_brasiliensis.tgz',
        'name': 'Nocardia_brasiliensis',
        'enid': '57bbc91af1e3f40053fe18b4'
      },
      {
        'path': 'chinacdc:/ANI/Nocardia/Nocardia_cyriacigeorgica.tgz',
        'name': 'Nocardia_cyriacigeorgica',
        'enid': '57bbc910f1e3f40058fe1658'
      },
      {
        'path': 'chinacdc:/ANI/Nocardia/Nocardia_farcinica.tgz',
        'name': 'Nocardia_farcinica',
        'enid': '57bbc926f1e3f40053fe18c8'
      }
    ]
  },
  {
    'name': 'Nocardioides',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nocardioides/Nocardioides_JS614.tgz',
        'name': 'Nocardioides_JS614',
        'enid': '57bb9ef2f1e3f4003ffe0f4e'
      }
    ]
  },
  {
    'name': 'Nocardiopsis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nocardiopsis/Nocardiopsis_alba.tgz',
        'name': 'Nocardiopsis_alba',
        'enid': '57bbc07ef1e3f40058fe132d'
      },
      {
        'path': 'chinacdc:/ANI/Nocardiopsis/Nocardiopsis_dassonvillei.tgz',
        'name': 'Nocardiopsis_dassonvillei',
        'enid': '57bbc074f1e3f4005cfe146c'
      }
    ]
  },
  {
    'name': 'Nostoc',
    'species': [
      {
        'path': 'chinacdc:/ANI/Nostoc/Nostoc_PCC.tgz',
        'name': 'Nostoc_PCC',
        'enid': '57bbcbccf1e3f40058fe16f0'
      },
      {
        'path': 'chinacdc:/ANI/Nostoc/Nostoc_azollae.tgz',
        'name': 'Nostoc_azollae',
        'enid': '57bbcbc2f1e3f4004efe14c7'
      },
      {
        'path': 'chinacdc:/ANI/Nostoc/Nostoc_punctiforme.tgz',
        'name': 'Nostoc_punctiforme',
        'enid': '57bbcbb6f1e3f40053fe19e1'
      }
    ]
  },
  {
    'name': 'Novosphingobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Novosphingobium/Novosphingobium_PP1Y.tgz',
        'name': 'Novosphingobium_PP1Y',
        'enid': '57bbc3b1f1e3f40058fe144d'
      },
      {
        'path': 'chinacdc:/ANI/Novosphingobium/Novosphingobium_aromaticivorans.tgz',
        'name': 'Novosphingobium_aromaticivorans',
        'enid': '57bbc3a7f1e3f40059fe1554'
      }
    ]
  },
  {
    'name': 'Oceanimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Oceanimonas/Oceanimonas_GK1.tgz',
        'name': 'Oceanimonas_GK1',
        'enid': '57bbcf51f1e3f4004afe128b'
      }
    ]
  },
  {
    'name': 'Oceanithermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Oceanithermus/Oceanithermus_profundus.tgz',
        'name': 'Oceanithermus_profundus',
        'enid': '57bba766f1e3f4005cfe11db'
      }
    ]
  },
  {
    'name': 'Oceanobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Oceanobacillus/Oceanobacillus_iheyensis.tgz',
        'name': 'Oceanobacillus_iheyensis',
        'enid': '57bbbd31f1e3f40053fe143f'
      }
    ]
  },
  {
    'name': 'Ochrobactrum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ochrobactrum/Ochrobactrum_anthropi.tgz',
        'name': 'Ochrobactrum_anthropi',
        'enid': '57bb907af1e3f40053fe1083'
      }
    ]
  },
  {
    'name': 'Octadecabacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Octadecabacter/Octadecabacter_antarcticus.tgz',
        'name': 'Octadecabacter_antarcticus',
        'enid': '57bbd514f1e3f40059fe1d1c'
      },
      {
        'path': 'chinacdc:/ANI/Octadecabacter/Octadecabacter_arcticus.tgz',
        'name': 'Octadecabacter_arcticus',
        'enid': '57bbd51df1e3f40053fe1deb'
      }
    ]
  },
  {
    'name': 'Odoribacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Odoribacter/Odoribacter_splanchnicus.tgz',
        'name': 'Odoribacter_splanchnicus',
        'enid': '57bba8f4f1e3f4005cfe1204'
      }
    ]
  },
  {
    'name': 'Oenococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Oenococcus/Oenococcus_oeni.tgz',
        'name': 'Oenococcus_oeni',
        'enid': '57bbcae1f1e3f40041fe0fbb'
      }
    ]
  },
  {
    'name': 'Oligotropha',
    'species': [
      {
        'path': 'chinacdc:/ANI/Oligotropha/Oligotropha_carboxidovorans.tgz',
        'name': 'Oligotropha_carboxidovorans',
        'enid': '57bbb150f1e3f40053fe134a'
      }
    ]
  },
  {
    'name': 'Olsenella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Olsenella/Olsenella_uli.tgz',
        'name': 'Olsenella_uli',
        'enid': '57bbaa2ef1e3f40058fe11cc'
      }
    ]
  },
  {
    'name': 'Onion',
    'species': [
      {
        'path': 'chinacdc:/ANI/Onion/Onion_yellows.tgz',
        'name': 'Onion_yellows',
        'enid': '57bb9db2f1e3f4005cfe114b'
      }
    ]
  },
  {
    'name': 'Opitutus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Opitutus/Opitutus_terrae.tgz',
        'name': 'Opitutus_terrae',
        'enid': '57bbc521f1e3f40046fe113d'
      }
    ]
  },
  {
    'name': 'Orientia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Orientia/Orientia_tsutsugamushi.tgz',
        'name': 'Orientia_tsutsugamushi',
        'enid': '57bbaf6cf1e3f4005cfe12c1'
      }
    ]
  },
  {
    'name': 'Ornithobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ornithobacterium/Ornithobacterium_rhinotracheale.tgz',
        'name': 'Ornithobacterium_rhinotracheale',
        'enid': '57bbba3ef1e3f40035fe0f37'
      }
    ]
  },
  {
    'name': 'Oscillatoria',
    'species': [
      {
        'path': 'chinacdc:/ANI/Oscillatoria/Oscillatoria_PCC.tgz',
        'name': 'Oscillatoria_PCC',
        'enid': '57bb9e0df1e3f4004efe10be'
      },
      {
        'path': 'chinacdc:/ANI/Oscillatoria/Oscillatoria_acuminata.tgz',
        'name': 'Oscillatoria_acuminata',
        'enid': '57bb9dfbf1e3f40046fe0fda'
      }
    ]
  },
  {
    'name': 'Oscillibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Oscillibacter/Oscillibacter_valericigenes.tgz',
        'name': 'Oscillibacter_valericigenes',
        'enid': '57bbbf20f1e3f40059fe13ec'
      }
    ]
  },
  {
    'name': 'Owenweeksia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Owenweeksia/Owenweeksia_hongkongensis.tgz',
        'name': 'Owenweeksia_hongkongensis',
        'enid': '57bbbf42f1e3f40058fe12ff'
      }
    ]
  },
  {
    'name': 'Paenibacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Paenibacillus/Paenibacillus_JDR.tgz',
        'name': 'Paenibacillus_JDR',
        'enid': '57bb96e7f1e3f40057fe0fd2'
      },
      {
        'path': 'chinacdc:/ANI/Paenibacillus/Paenibacillus_Y412MC10.tgz',
        'name': 'Paenibacillus_Y412MC10',
        'enid': '57bb96adf1e3f40047fe0f69'
      },
      {
        'path': 'chinacdc:/ANI/Paenibacillus/Paenibacillus_larvae.tgz',
        'name': 'Paenibacillus_larvae',
        'enid': '57bb96b9f1e3f40042fe0f66'
      },
      {
        'path': 'chinacdc:/ANI/Paenibacillus/Paenibacillus_mucilaginosus.tgz',
        'name': 'Paenibacillus_mucilaginosus',
        'enid': '57bb96f3f1e3f40046fe0faa'
      },
      {
        'path': 'chinacdc:/ANI/Paenibacillus/Paenibacillus_polymyxa.tgz',
        'name': 'Paenibacillus_polymyxa',
        'enid': '57bb96c3f1e3f40053fe10fa'
      },
      {
        'path': 'chinacdc:/ANI/Paenibacillus/Paenibacillus_terrae.tgz',
        'name': 'Paenibacillus_terrae',
        'enid': '57bb96ddf1e3f40053fe10fe'
      }
    ]
  },
  {
    'name': 'Paludibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Paludibacter/Paludibacter_propionicigenes.tgz',
        'name': 'Paludibacter_propionicigenes',
        'enid': '57bbc23cf1e3f4004efe12b7'
      }
    ]
  },
  {
    'name': 'Pandoraea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pandoraea/Pandoraea_RB.tgz',
        'name': 'Pandoraea_RB',
        'enid': '57bb9546f1e3f40059fe1086'
      },
      {
        'path': 'chinacdc:/ANI/Pandoraea/Pandoraea_pnomenusa.tgz',
        'name': 'Pandoraea_pnomenusa',
        'enid': '57bb953cf1e3f40059fe1082'
      }
    ]
  },
  {
    'name': 'Pantoea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pantoea/Pantoea_At.tgz',
        'name': 'Pantoea_At',
        'enid': '57bbcfd5f1e3f4004efe1614'
      },
      {
        'path': 'chinacdc:/ANI/Pantoea/Pantoea_ananatis.tgz',
        'name': 'Pantoea_ananatis',
        'enid': '57bbcfe0f1e3f4004efe1618'
      },
      {
        'path': 'chinacdc:/ANI/Pantoea/Pantoea_vagans.tgz',
        'name': 'Pantoea_vagans',
        'enid': '57bbcff6f1e3f40040fe1144'
      }
    ]
  },
  {
    'name': 'Parabacteroides',
    'species': [
      {
        'path': 'chinacdc:/ANI/Parabacteroides/Parabacteroides_distasonis.tgz',
        'name': 'Parabacteroides_distasonis',
        'enid': '57bbc988f1e3f40057fe13cb'
      }
    ]
  },
  {
    'name': 'Parachlamydia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Parachlamydia/Parachlamydia_acanthamoebae.tgz',
        'name': 'Parachlamydia_acanthamoebae',
        'enid': '57bbd348f1e3f40053fe1cf7'
      }
    ]
  },
  {
    'name': 'Paracoccus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Paracoccus/Paracoccus_aminophilus.tgz',
        'name': 'Paracoccus_aminophilus',
        'enid': '57bb9cb7f1e3f40058fe10bc'
      },
      {
        'path': 'chinacdc:/ANI/Paracoccus/Paracoccus_denitrificans.tgz',
        'name': 'Paracoccus_denitrificans',
        'enid': '57bb9cc1f1e3f40058fe10c0'
      }
    ]
  },
  {
    'name': 'Parvibaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Parvibaculum/Parvibaculum_lavamentivorans.tgz',
        'name': 'Parvibaculum_lavamentivorans',
        'enid': '57bbd307f1e3f4004afe130c'
      }
    ]
  },
  {
    'name': 'Parvularcula',
    'species': [
      {
        'path': 'chinacdc:/ANI/Parvularcula/Parvularcula_bermudensis.tgz',
        'name': 'Parvularcula_bermudensis',
        'enid': '57bb9322f1e3f40058fe104e'
      }
    ]
  },
  {
    'name': 'Pasteurella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pasteurella/Pasteurella_multocida.tgz',
        'name': 'Pasteurella_multocida',
        'enid': '57bb977af1e3f40053fe1110'
      }
    ]
  },
  {
    'name': 'Pectobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pectobacterium/Pectobacterium_SCC3193.tgz',
        'name': 'Pectobacterium_SCC3193',
        'enid': '57bbd0d6f1e3f40053fe1bb3'
      },
      {
        'path': 'chinacdc:/ANI/Pectobacterium/Pectobacterium_atrosepticum.tgz',
        'name': 'Pectobacterium_atrosepticum',
        'enid': '57bbd0ccf1e3f40059fe1b67'
      },
      {
        'path': 'chinacdc:/ANI/Pectobacterium/Pectobacterium_carotovorum.tgz',
        'name': 'Pectobacterium_carotovorum',
        'enid': '57bbd0bef1e3f40053fe1bab'
      },
      {
        'path': 'chinacdc:/ANI/Pectobacterium/Pectobacterium_wasabiae.tgz',
        'name': 'Pectobacterium_wasabiae',
        'enid': '57bbd0def1e3f40059fe1b6f'
      }
    ]
  },
  {
    'name': 'Pediococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pediococcus/Pediococcus_claussenii.tgz',
        'name': 'Pediococcus_claussenii',
        'enid': '57bba264f1e3f40053fe11de'
      },
      {
        'path': 'chinacdc:/ANI/Pediococcus/Pediococcus_pentosaceus.tgz',
        'name': 'Pediococcus_pentosaceus',
        'enid': '57bba25af1e3f40053fe11da'
      }
    ]
  },
  {
    'name': 'Pedobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pedobacter/Pedobacter_heparinus.tgz',
        'name': 'Pedobacter_heparinus',
        'enid': '57bba9eff1e3f40057fe10ad'
      },
      {
        'path': 'chinacdc:/ANI/Pedobacter/Pedobacter_saltans.tgz',
        'name': 'Pedobacter_saltans',
        'enid': '57bba9f7f1e3f4005cfe1225'
      }
    ]
  },
  {
    'name': 'Pelobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pelobacter/Pelobacter_carbinolicus.tgz',
        'name': 'Pelobacter_carbinolicus',
        'enid': '57bbc939f1e3f4005cfe1c65'
      },
      {
        'path': 'chinacdc:/ANI/Pelobacter/Pelobacter_propionicus.tgz',
        'name': 'Pelobacter_propionicus',
        'enid': '57bbc943f1e3f40053fe18e0'
      }
    ]
  },
  {
    'name': 'Pelodictyon',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pelodictyon/Pelodictyon_phaeoclathratiforme.tgz',
        'name': 'Pelodictyon_phaeoclathratiforme',
        'enid': '57bba71ef1e3f4004efe1131'
      }
    ]
  },
  {
    'name': 'Pelotomaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pelotomaculum/Pelotomaculum_thermopropionicum.tgz',
        'name': 'Pelotomaculum_thermopropionicum',
        'enid': '57bbc15ef1e3f4003efe0f47'
      }
    ]
  },
  {
    'name': 'Persephonella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Persephonella/Persephonella_marina.tgz',
        'name': 'Persephonella_marina',
        'enid': '57bbc265f1e3f40057fe123e'
      }
    ]
  },
  {
    'name': 'Persicivirga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Persicivirga/Persicivirga_dokdonensis.tgz',
        'name': 'Persicivirga_dokdonensis',
        'enid': '57bb9690f1e3f40053fe10ee'
      }
    ]
  },
  {
    'name': 'Petrotoga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Petrotoga/Petrotoga_mobilis.tgz',
        'name': 'Petrotoga_mobilis',
        'enid': '57bb9772f1e3f40057fe0fdc'
      }
    ]
  },
  {
    'name': 'Phaeobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Phaeobacter/Phaeobacter_gallaeciensis.tgz',
        'name': 'Phaeobacter_gallaeciensis',
        'enid': '57bba728f1e3f4003ffe0f57'
      }
    ]
  },
  {
    'name': 'Phenylobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Phenylobacterium/Phenylobacterium_zucineum.tgz',
        'name': 'Phenylobacterium_zucineum',
        'enid': '57bbc5bff1e3f4004afe116d'
      }
    ]
  },
  {
    'name': 'Photobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Photobacterium/Photobacterium_profundum.tgz',
        'name': 'Photobacterium_profundum',
        'enid': '57bbd1d0f1e3f40058fe18cf'
      }
    ]
  },
  {
    'name': 'Photorhabdus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Photorhabdus/Photorhabdus_asymbiotica.tgz',
        'name': 'Photorhabdus_asymbiotica',
        'enid': '57bb9c69f1e3f4005cfe1111'
      },
      {
        'path': 'chinacdc:/ANI/Photorhabdus/Photorhabdus_luminescens.tgz',
        'name': 'Photorhabdus_luminescens',
        'enid': '57bb9c73f1e3f4005cfe1115'
      }
    ]
  },
  {
    'name': 'Phycisphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Phycisphaera/Phycisphaera_mikurensis.tgz',
        'name': 'Phycisphaera_mikurensis',
        'enid': '57bbd133f1e3f4004efe167e'
      }
    ]
  },
  {
    'name': 'Picrophilus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Picrophilus/Picrophilus_torridus.tgz',
        'name': 'Picrophilus_torridus',
        'enid': '57bbbddff1e3f40059fe13af'
      }
    ]
  },
  {
    'name': 'Pirellula',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pirellula/Pirellula_staleyi.tgz',
        'name': 'Pirellula_staleyi',
        'enid': '57bbaa3ff1e3f40059fe1221'
      }
    ]
  },
  {
    'name': 'Planctomyces',
    'species': [
      {
        'path': 'chinacdc:/ANI/Planctomyces/Planctomyces_brasiliensis.tgz',
        'name': 'Planctomyces_brasiliensis',
        'enid': '57bb96a3f1e3f40053fe10f6'
      },
      {
        'path': 'chinacdc:/ANI/Planctomyces/Planctomyces_limnophilus.tgz',
        'name': 'Planctomyces_limnophilus',
        'enid': '57bb969af1e3f40046fe0fa6'
      }
    ]
  },
  {
    'name': 'Plautia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Plautia/Plautia_stali.tgz',
        'name': 'Plautia_stali',
        'enid': '57bbaa68f1e3f40059fe1231'
      }
    ]
  },
  {
    'name': 'Pleurocapsa',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pleurocapsa/Pleurocapsa_PCC.tgz',
        'name': 'Pleurocapsa_PCC',
        'enid': '57bb903ef1e3f4005cfe1002'
      }
    ]
  },
  {
    'name': 'Polaribacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Polaribacter/Polaribacter_MED152.tgz',
        'name': 'Polaribacter_MED152',
        'enid': '57bbc3d8f1e3f40058fe145c'
      }
    ]
  },
  {
    'name': 'Polaromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Polaromonas/Polaromonas_JS666.tgz',
        'name': 'Polaromonas_JS666',
        'enid': '57bbb63ff1e3f40043fe0f66'
      },
      {
        'path': 'chinacdc:/ANI/Polaromonas/Polaromonas_naphthalenivorans.tgz',
        'name': 'Polaromonas_naphthalenivorans',
        'enid': '57bbb649f1e3f40059fe12f8'
      }
    ]
  },
  {
    'name': 'Polymorphum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Polymorphum/Polymorphum_gilvum.tgz',
        'name': 'Polymorphum_gilvum',
        'enid': '57bbc965f1e3f40058fe1672'
      }
    ]
  },
  {
    'name': 'Polynucleobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Polynucleobacter/Polynucleobacter_necessarius.tgz',
        'name': 'Polynucleobacter_necessarius',
        'enid': '57bbb39df1e3f40059fe12ce'
      }
    ]
  },
  {
    'name': 'Porphyromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Porphyromonas/Porphyromonas_asaccharolytica.tgz',
        'name': 'Porphyromonas_asaccharolytica',
        'enid': '57bbce17f1e3f4004efe157a'
      },
      {
        'path': 'chinacdc:/ANI/Porphyromonas/Porphyromonas_gingivalis.tgz',
        'name': 'Porphyromonas_gingivalis',
        'enid': '57bbce0df1e3f40053fe1aa3'
      }
    ]
  },
  {
    'name': 'Prevotella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Prevotella/Prevotella_dentalis.tgz',
        'name': 'Prevotella_dentalis',
        'enid': '57bbc1e3f1e3f40040fe1010'
      },
      {
        'path': 'chinacdc:/ANI/Prevotella/Prevotella_denticola.tgz',
        'name': 'Prevotella_denticola',
        'enid': '57bbc1c0f1e3f40059fe1494'
      },
      {
        'path': 'chinacdc:/ANI/Prevotella/Prevotella_intermedia.tgz',
        'name': 'Prevotella_intermedia',
        'enid': '57bbc1d1f1e3f40043fe0f95'
      },
      {
        'path': 'chinacdc:/ANI/Prevotella/Prevotella_melaninogenica.tgz',
        'name': 'Prevotella_melaninogenica',
        'enid': '57bbc1b6f1e3f4004afe1096'
      },
      {
        'path': 'chinacdc:/ANI/Prevotella/Prevotella_oral.tgz',
        'name': 'Prevotella_oral',
        'enid': '57bbc1dbf1e3f4003bfe0f75'
      },
      {
        'path': 'chinacdc:/ANI/Prevotella/Prevotella_ruminicola.tgz',
        'name': 'Prevotella_ruminicola',
        'enid': '57bbc1c8f1e3f4004efe12ac'
      }
    ]
  },
  {
    'name': 'Prochlorococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Prochlorococcus/Prochlorococcus_marinus.tgz',
        'name': 'Prochlorococcus_marinus',
        'enid': '57bbd145f1e3f40058fe18a4'
      }
    ]
  },
  {
    'name': 'Propionibacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Propionibacterium/Propionibacterium_acidipropionici.tgz',
        'name': 'Propionibacterium_acidipropionici',
        'enid': '57bba473f1e3f40047fe0f90'
      },
      {
        'path': 'chinacdc:/ANI/Propionibacterium/Propionibacterium_acnes.tgz',
        'name': 'Propionibacterium_acnes',
        'enid': '57bba43ef1e3f4004efe110a'
      },
      {
        'path': 'chinacdc:/ANI/Propionibacterium/Propionibacterium_avidum.tgz',
        'name': 'Propionibacterium_avidum',
        'enid': '57bba458f1e3f4004efe110e'
      },
      {
        'path': 'chinacdc:/ANI/Propionibacterium/Propionibacterium_freudenreichii.tgz',
        'name': 'Propionibacterium_freudenreichii',
        'enid': '57bba46cf1e3f40059fe119f'
      },
      {
        'path': 'chinacdc:/ANI/Propionibacterium/Propionibacterium_propionicum.tgz',
        'name': 'Propionibacterium_propionicum',
        'enid': '57bba462f1e3f40053fe120c'
      }
    ]
  },
  {
    'name': 'Prosthecochloris',
    'species': [
      {
        'path': 'chinacdc:/ANI/Prosthecochloris/Prosthecochloris_aestuarii.tgz',
        'name': 'Prosthecochloris_aestuarii',
        'enid': '57bbae85f1e3f40035fe0f2c'
      }
    ]
  },
  {
    'name': 'Proteus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Proteus/Proteus_mirabilis.tgz',
        'name': 'Proteus_mirabilis',
        'enid': '57bb9d5ff1e3f40058fe10db'
      }
    ]
  },
  {
    'name': 'Providencia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Providencia/Providencia_stuartii.tgz',
        'name': 'Providencia_stuartii',
        'enid': '57bbc25cf1e3f40053fe1593'
      }
    ]
  },
  {
    'name': 'Pseudanabaena',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pseudanabaena/Pseudanabaena_PCC.tgz',
        'name': 'Pseudanabaena_PCC',
        'enid': '57bbad3af1e3f4005cfe1271'
      }
    ]
  },
  {
    'name': 'Pseudoalteromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pseudoalteromonas/Pseudoalteromonas_SM9913.tgz',
        'name': 'Pseudoalteromonas_SM9913',
        'enid': '57bbace0f1e3f4005cfe1262'
      },
      {
        'path': 'chinacdc:/ANI/Pseudoalteromonas/Pseudoalteromonas_atlantica.tgz',
        'name': 'Pseudoalteromonas_atlantica',
        'enid': '57bbacd6f1e3f40059fe1253'
      },
      {
        'path': 'chinacdc:/ANI/Pseudoalteromonas/Pseudoalteromonas_haloplanktis.tgz',
        'name': 'Pseudoalteromonas_haloplanktis',
        'enid': '57bbaccdf1e3f4004dfe0fe7'
      }
    ]
  },
  {
    'name': 'Pseudogulbenkiania',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pseudogulbenkiania/Pseudogulbenkiania_NH8B.tgz',
        'name': 'Pseudogulbenkiania_NH8B',
        'enid': '57bb9e82f1e3f4005cfe115c'
      }
    ]
  },
  {
    'name': 'Pseudomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_ND6.tgz',
        'name': 'Pseudomonas_ND6',
        'enid': '57bbabbaf1e3f4004efe1173'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_TKP.tgz',
        'name': 'Pseudomonas_TKP',
        'enid': '57bbab10f1e3f40058fe11ea'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_VLB120.tgz',
        'name': 'Pseudomonas_VLB120',
        'enid': '57bbab07f1e3f40059fe1245'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_aeruginosa.tgz',
        'name': 'Pseudomonas_aeruginosa',
        'enid': '57bbab50f1e3f4004efe116f'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_brassicacearum.tgz',
        'name': 'Pseudomonas_brassicacearum',
        'enid': '57bbab1af1e3f4005cfe123f'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_denitrificans.tgz',
        'name': 'Pseudomonas_denitrificans',
        'enid': '57bbac64f1e3f4005cfe1253'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_entomophila.tgz',
        'name': 'Pseudomonas_entomophila',
        'enid': '57bbabd2f1e3f4004efe1177'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_fluorescens.tgz',
        'name': 'Pseudomonas_fluorescens',
        'enid': '57bbab25f1e3f40059fe1249'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_fulva.tgz',
        'name': 'Pseudomonas_fulva',
        'enid': '57bbac02f1e3f4005cfe124b'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_mendocina.tgz',
        'name': 'Pseudomonas_mendocina',
        'enid': '57bbabc4f1e3f40057fe10b2'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_monteilii.tgz',
        'name': 'Pseudomonas_monteilii',
        'enid': '57bbaaf7f1e3f4004efe116b'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_poae.tgz',
        'name': 'Pseudomonas_poae',
        'enid': '57bbabdcf1e3f4005cfe1243'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_putida.tgz',
        'name': 'Pseudomonas_putida',
        'enid': '57bbac0df1e3f40053fe12bf'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_resinovorans.tgz',
        'name': 'Pseudomonas_resinovorans',
        'enid': '57bbaaedf1e3f4005cfe123b'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_stutzeri.tgz',
        'name': 'Pseudomonas_stutzeri',
        'enid': '57bbabe6f1e3f4005cfe1247'
      },
      {
        'path': 'chinacdc:/ANI/Pseudomonas/Pseudomonas_syringae.tgz',
        'name': 'Pseudomonas_syringae',
        'enid': '57bbac4ef1e3f4005cfe124f'
      }
    ]
  },
  {
    'name': 'Pseudonocardia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pseudonocardia/Pseudonocardia_dioxanivorans.tgz',
        'name': 'Pseudonocardia_dioxanivorans',
        'enid': '57bbb245f1e3f40058fe1219'
      }
    ]
  },
  {
    'name': 'Pseudovibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pseudovibrio/Pseudovibrio_FO.tgz',
        'name': 'Pseudovibrio_FO',
        'enid': '57bb9d30f1e3f4004efe10ba'
      }
    ]
  },
  {
    'name': 'Pseudoxanthomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pseudoxanthomonas/Pseudoxanthomonas_spadix.tgz',
        'name': 'Pseudoxanthomonas_spadix',
        'enid': '57bbd25bf1e3f4004afe12db'
      },
      {
        'path': 'chinacdc:/ANI/Pseudoxanthomonas/Pseudoxanthomonas_suwonensis.tgz',
        'name': 'Pseudoxanthomonas_suwonensis',
        'enid': '57bbd253f1e3f40043fe1072'
      }
    ]
  },
  {
    'name': 'Psychrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Psychrobacter/Psychrobacter_G.tgz',
        'name': 'Psychrobacter_G',
        'enid': '57bbbc34f1e3f4005cfe13ab'
      },
      {
        'path': 'chinacdc:/ANI/Psychrobacter/Psychrobacter_PRwf.tgz',
        'name': 'Psychrobacter_PRwf',
        'enid': '57bbbc46f1e3f40053fe142c'
      },
      {
        'path': 'chinacdc:/ANI/Psychrobacter/Psychrobacter_arcticus.tgz',
        'name': 'Psychrobacter_arcticus',
        'enid': '57bbbc4ff1e3f4004afe103a'
      },
      {
        'path': 'chinacdc:/ANI/Psychrobacter/Psychrobacter_cryohalolentis.tgz',
        'name': 'Psychrobacter_cryohalolentis',
        'enid': '57bbbc3ef1e3f40059fe1370'
      }
    ]
  },
  {
    'name': 'Psychroflexus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Psychroflexus/Psychroflexus_torquis.tgz',
        'name': 'Psychroflexus_torquis',
        'enid': '57bbbf16f1e3f40051fe10e7'
      }
    ]
  },
  {
    'name': 'Psychromonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Psychromonas/Psychromonas_CNPT3.tgz',
        'name': 'Psychromonas_CNPT3',
        'enid': '57bb9f20f1e3f40059fe1157'
      },
      {
        'path': 'chinacdc:/ANI/Psychromonas/Psychromonas_ingrahamii.tgz',
        'name': 'Psychromonas_ingrahamii',
        'enid': '57bb9f16f1e3f40057fe1031'
      }
    ]
  },
  {
    'name': 'Pusillimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pusillimonas/Pusillimonas_T7.tgz',
        'name': 'Pusillimonas_T7',
        'enid': '57bbbfe8f1e3f40057fe11c3'
      }
    ]
  },
  {
    'name': 'Pyrobaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pyrobaculum/Pyrobaculum_1860.tgz',
        'name': 'Pyrobaculum_1860',
        'enid': '57bbb16bf1e3f4004afe1005'
      },
      {
        'path': 'chinacdc:/ANI/Pyrobaculum/Pyrobaculum_aerophilum.tgz',
        'name': 'Pyrobaculum_aerophilum',
        'enid': '57bbb21df1e3f40059fe12b0'
      },
      {
        'path': 'chinacdc:/ANI/Pyrobaculum/Pyrobaculum_arsenaticum.tgz',
        'name': 'Pyrobaculum_arsenaticum',
        'enid': '57bbb1c8f1e3f40059fe12ac'
      },
      {
        'path': 'chinacdc:/ANI/Pyrobaculum/Pyrobaculum_calidifontis.tgz',
        'name': 'Pyrobaculum_calidifontis',
        'enid': '57bbb160f1e3f4003ffe0f77'
      },
      {
        'path': 'chinacdc:/ANI/Pyrobaculum/Pyrobaculum_islandicum.tgz',
        'name': 'Pyrobaculum_islandicum',
        'enid': '57bbb1eef1e3f4005cfe12f0'
      },
      {
        'path': 'chinacdc:/ANI/Pyrobaculum/Pyrobaculum_neutrophilum.tgz',
        'name': 'Pyrobaculum_neutrophilum',
        'enid': '57bbb187f1e3f40053fe134e'
      },
      {
        'path': 'chinacdc:/ANI/Pyrobaculum/Pyrobaculum_oguniense.tgz',
        'name': 'Pyrobaculum_oguniense',
        'enid': '57bbb1a0f1e3f40053fe1352'
      }
    ]
  },
  {
    'name': 'Pyrococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pyrococcus/Pyrococcus_NA2.tgz',
        'name': 'Pyrococcus_NA2',
        'enid': '57bb914df1e3f4004efe101b'
      },
      {
        'path': 'chinacdc:/ANI/Pyrococcus/Pyrococcus_ST04.tgz',
        'name': 'Pyrococcus_ST04',
        'enid': '57bb915ef1e3f40047fe0f49'
      },
      {
        'path': 'chinacdc:/ANI/Pyrococcus/Pyrococcus_abyssi.tgz',
        'name': 'Pyrococcus_abyssi',
        'enid': '57bb9166f1e3f4004efe101f'
      },
      {
        'path': 'chinacdc:/ANI/Pyrococcus/Pyrococcus_furiosus.tgz',
        'name': 'Pyrococcus_furiosus',
        'enid': '57bb9154f1e3f4005cfe1026'
      },
      {
        'path': 'chinacdc:/ANI/Pyrococcus/Pyrococcus_horikoshii.tgz',
        'name': 'Pyrococcus_horikoshii',
        'enid': '57bb916df1e3f40053fe108a'
      },
      {
        'path': 'chinacdc:/ANI/Pyrococcus/Pyrococcus_yayanosii.tgz',
        'name': 'Pyrococcus_yayanosii',
        'enid': '57bb9175f1e3f40053fe108e'
      }
    ]
  },
  {
    'name': 'Pyrolobus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Pyrolobus/Pyrolobus_fumarii.tgz',
        'name': 'Pyrolobus_fumarii',
        'enid': '57bbc874f1e3f4004dfe113e'
      }
    ]
  },
  {
    'name': 'Rahnella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rahnella/Rahnella_Y9602.tgz',
        'name': 'Rahnella_Y9602',
        'enid': '57bba95cf1e3f40059fe120c'
      },
      {
        'path': 'chinacdc:/ANI/Rahnella/Rahnella_aquatilis.tgz',
        'name': 'Rahnella_aquatilis',
        'enid': '57bba966f1e3f4005cfe1213'
      }
    ]
  },
  {
    'name': 'Ralstonia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ralstonia/Ralstonia_eutropha.tgz',
        'name': 'Ralstonia_eutropha',
        'enid': '57bbbcd2f1e3f40046fe1081'
      },
      {
        'path': 'chinacdc:/ANI/Ralstonia/Ralstonia_pickettii.tgz',
        'name': 'Ralstonia_pickettii',
        'enid': '57bbbc99f1e3f40035fe0f3e'
      },
      {
        'path': 'chinacdc:/ANI/Ralstonia/Ralstonia_solanacearum.tgz',
        'name': 'Ralstonia_solanacearum',
        'enid': '57bbbcaff1e3f4004efe123c'
      }
    ]
  },
  {
    'name': 'Ramlibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ramlibacter/Ramlibacter_tataouinensis.tgz',
        'name': 'Ramlibacter_tataouinensis',
        'enid': '57bba9e5f1e3f4005cfe1221'
      }
    ]
  },
  {
    'name': 'Raoultella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Raoultella/Raoultella_ornithinolytica.tgz',
        'name': 'Raoultella_ornithinolytica',
        'enid': '57bbaf62f1e3f40046fe104a'
      }
    ]
  },
  {
    'name': 'Renibacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Renibacterium/Renibacterium_salmoninarum.tgz',
        'name': 'Renibacterium_salmoninarum',
        'enid': '57bbd2caf1e3f4004dfe1237'
      }
    ]
  },
  {
    'name': 'Rhizobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhizobium/Rhizobium_IRBG74.tgz',
        'name': 'Rhizobium_IRBG74',
        'enid': '57bbd485f1e3f40059fe1cdc'
      },
      {
        'path': 'chinacdc:/ANI/Rhizobium/Rhizobium_NGR234.tgz',
        'name': 'Rhizobium_NGR234',
        'enid': '57bbd463f1e3f40053fe1d8b'
      },
      {
        'path': 'chinacdc:/ANI/Rhizobium/Rhizobium_etli.tgz',
        'name': 'Rhizobium_etli',
        'enid': '57bbd46df1e3f40058fe19b7'
      },
      {
        'path': 'chinacdc:/ANI/Rhizobium/Rhizobium_leguminosarum.tgz',
        'name': 'Rhizobium_leguminosarum',
        'enid': '57bbd48ff1e3f4005cfe3963'
      },
      {
        'path': 'chinacdc:/ANI/Rhizobium/Rhizobium_tropici.tgz',
        'name': 'Rhizobium_tropici',
        'enid': '57bbd4aaf1e3f4004afe1348'
      }
    ]
  },
  {
    'name': 'Rhodanobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodanobacter/Rhodanobacter_2APBS1.tgz',
        'name': 'Rhodanobacter_2APBS1',
        'enid': '57bb9301f1e3f4005cfe104c'
      }
    ]
  },
  {
    'name': 'Rhodobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodobacter/Rhodobacter_capsulatus.tgz',
        'name': 'Rhodobacter_capsulatus',
        'enid': '57bb962cf1e3f40058fe1074'
      },
      {
        'path': 'chinacdc:/ANI/Rhodobacter/Rhodobacter_sphaeroides.tgz',
        'name': 'Rhodobacter_sphaeroides',
        'enid': '57bb9637f1e3f4004efe104b'
      }
    ]
  },
  {
    'name': 'Rhodococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodococcus/Rhodococcus_equi.tgz',
        'name': 'Rhodococcus_equi',
        'enid': '57bbbd4bf1e3f4005cfe13d8'
      },
      {
        'path': 'chinacdc:/ANI/Rhodococcus/Rhodococcus_erythropolis.tgz',
        'name': 'Rhodococcus_erythropolis',
        'enid': '57bbbd3bf1e3f4005cfe13d4'
      },
      {
        'path': 'chinacdc:/ANI/Rhodococcus/Rhodococcus_jostii.tgz',
        'name': 'Rhodococcus_jostii',
        'enid': '57bbbd61f1e3f40046fe108d'
      },
      {
        'path': 'chinacdc:/ANI/Rhodococcus/Rhodococcus_opacus.tgz',
        'name': 'Rhodococcus_opacus',
        'enid': '57bbbd55f1e3f40043fe0f72'
      },
      {
        'path': 'chinacdc:/ANI/Rhodococcus/Rhodococcus_pyridinivorans.tgz',
        'name': 'Rhodococcus_pyridinivorans',
        'enid': '57bbbd6ff1e3f4005cfe13e0'
      }
    ]
  },
  {
    'name': 'Rhodoferax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodoferax/Rhodoferax_ferrireducens.tgz',
        'name': 'Rhodoferax_ferrireducens',
        'enid': '57bb99ecf1e3f4005cfe10c3'
      }
    ]
  },
  {
    'name': 'Rhodomicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodomicrobium/Rhodomicrobium_vannielii.tgz',
        'name': 'Rhodomicrobium_vannielii',
        'enid': '57bba8bdf1e3f40059fe11f5'
      }
    ]
  },
  {
    'name': 'Rhodopseudomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodopseudomonas/Rhodopseudomonas_palustris.tgz',
        'name': 'Rhodopseudomonas_palustris',
        'enid': '57bbcb6ef1e3f40053fe19b0'
      }
    ]
  },
  {
    'name': 'Rhodospirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodospirillum/Rhodospirillum_centenum.tgz',
        'name': 'Rhodospirillum_centenum',
        'enid': '57bbbc79f1e3f40051fe10a1'
      },
      {
        'path': 'chinacdc:/ANI/Rhodospirillum/Rhodospirillum_photometricum.tgz',
        'name': 'Rhodospirillum_photometricum',
        'enid': '57bbbc8ff1e3f40046fe1078'
      },
      {
        'path': 'chinacdc:/ANI/Rhodospirillum/Rhodospirillum_rubrum.tgz',
        'name': 'Rhodospirillum_rubrum',
        'enid': '57bbbc83f1e3f40051fe10a5'
      }
    ]
  },
  {
    'name': 'Rhodothermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rhodothermus/Rhodothermus_marinus.tgz',
        'name': 'Rhodothermus_marinus',
        'enid': '57bbb3cff1e3f4005cfe1308'
      }
    ]
  },
  {
    'name': 'Rickettsia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_africae.tgz',
        'name': 'Rickettsia_africae',
        'enid': '57bbb82bf1e3f40053fe13cf'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_akari.tgz',
        'name': 'Rickettsia_akari',
        'enid': '57bbb7b5f1e3f4005cfe1351'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_australis.tgz',
        'name': 'Rickettsia_australis',
        'enid': '57bbb811f1e3f4005cfe1359'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_bellii.tgz',
        'name': 'Rickettsia_bellii',
        'enid': '57bbb7a3f1e3f40059fe1317'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_canadensis.tgz',
        'name': 'Rickettsia_canadensis',
        'enid': '57bbb7d1f1e3f40041fe0f52'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_conorii.tgz',
        'name': 'Rickettsia_conorii',
        'enid': '57bbb83df1e3f40051fe1078'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_felis.tgz',
        'name': 'Rickettsia_felis',
        'enid': '57bbb7d9f1e3f40053fe13c7'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_heilongjiangensis.tgz',
        'name': 'Rickettsia_heilongjiangensis',
        'enid': '57bbb7e9f1e3f4004efe1208'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_japonica.tgz',
        'name': 'Rickettsia_japonica',
        'enid': '57bbb7f6f1e3f4004efe120c'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_massiliae.tgz',
        'name': 'Rickettsia_massiliae',
        'enid': '57bbb831f1e3f40057fe1136'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_montanensis.tgz',
        'name': 'Rickettsia_montanensis',
        'enid': '57bbb7adf1e3f40059fe131b'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_parkeri.tgz',
        'name': 'Rickettsia_parkeri',
        'enid': '57bbb7f0f1e3f40058fe1246'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_peacockii.tgz',
        'name': 'Rickettsia_peacockii',
        'enid': '57bbb7fdf1e3f4005cfe1355'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_philipii.tgz',
        'name': 'Rickettsia_philipii',
        'enid': '57bbb7bbf1e3f40040fe0fd1'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_prowazekii.tgz',
        'name': 'Rickettsia_prowazekii',
        'enid': '57bbb803f1e3f40053fe13cb'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_rhipicephali.tgz',
        'name': 'Rickettsia_rhipicephali',
        'enid': '57bbb7e1f1e3f40059fe1323'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_rickettsii.tgz',
        'name': 'Rickettsia_rickettsii',
        'enid': '57bbb7c3f1e3f40059fe131f'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_slovaca.tgz',
        'name': 'Rickettsia_slovaca',
        'enid': '57bbb823f1e3f40059fe132f'
      },
      {
        'path': 'chinacdc:/ANI/Rickettsia/Rickettsia_typhi.tgz',
        'name': 'Rickettsia_typhi',
        'enid': '57bbb819f1e3f40058fe124a'
      }
    ]
  },
  {
    'name': 'Riemerella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Riemerella/Riemerella_anatipestifer.tgz',
        'name': 'Riemerella_anatipestifer',
        'enid': '57bbaedff1e3f40059fe1279'
      }
    ]
  },
  {
    'name': 'Rivularia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rivularia/Rivularia_PCC.tgz',
        'name': 'Rivularia_PCC',
        'enid': '57bbaeedf1e3f4005cfe129a'
      }
    ]
  },
  {
    'name': 'Robiginitalea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Robiginitalea/Robiginitalea_biformata.tgz',
        'name': 'Robiginitalea_biformata',
        'enid': '57bbb739f1e3f40053fe13c0'
      }
    ]
  },
  {
    'name': 'Roseburia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Roseburia/Roseburia_hominis.tgz',
        'name': 'Roseburia_hominis',
        'enid': '57bba334f1e3f4004afe0fc1'
      },
      {
        'path': 'chinacdc:/ANI/Roseburia/Roseburia_intestinalis.tgz',
        'name': 'Roseburia_intestinalis',
        'enid': '57bba328f1e3f40058fe1164'
      }
    ]
  },
  {
    'name': 'Roseiflexus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Roseiflexus/Roseiflexus_RS.tgz',
        'name': 'Roseiflexus_RS',
        'enid': '57bb90c5f1e3f4005cfe1010'
      },
      {
        'path': 'chinacdc:/ANI/Roseiflexus/Roseiflexus_castenholzii.tgz',
        'name': 'Roseiflexus_castenholzii',
        'enid': '57bb90cff1e3f40057fe0f9c'
      }
    ]
  },
  {
    'name': 'Roseobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Roseobacter/Roseobacter_denitrificans.tgz',
        'name': 'Roseobacter_denitrificans',
        'enid': '57bba939f1e3f40053fe129b'
      },
      {
        'path': 'chinacdc:/ANI/Roseobacter/Roseobacter_litoralis.tgz',
        'name': 'Roseobacter_litoralis',
        'enid': '57bba943f1e3f40057fe109f'
      }
    ]
  },
  {
    'name': 'Rothia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rothia/Rothia_dentocariosa.tgz',
        'name': 'Rothia_dentocariosa',
        'enid': '57bbcde5f1e3f40059fe1a3f'
      },
      {
        'path': 'chinacdc:/ANI/Rothia/Rothia_mucilaginosa.tgz',
        'name': 'Rothia_mucilaginosa',
        'enid': '57bbcddef1e3f4005cfe27de'
      }
    ]
  },
  {
    'name': 'Rubrivivax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rubrivivax/Rubrivivax_gelatinosus.tgz',
        'name': 'Rubrivivax_gelatinosus',
        'enid': '57bba06df1e3f4004efe10da'
      }
    ]
  },
  {
    'name': 'Rubrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Rubrobacter/Rubrobacter_xylanophilus.tgz',
        'name': 'Rubrobacter_xylanophilus',
        'enid': '57bba224f1e3f40053fe11c2'
      }
    ]
  },
  {
    'name': 'Ruegeria',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ruegeria/Ruegeria_TM1040.tgz',
        'name': 'Ruegeria_TM1040',
        'enid': '57bba4d6f1e3f40046fe1016'
      },
      {
        'path': 'chinacdc:/ANI/Ruegeria/Ruegeria_pomeroyi.tgz',
        'name': 'Ruegeria_pomeroyi',
        'enid': '57bba4e0f1e3f40053fe1210'
      }
    ]
  },
  {
    'name': 'Ruminococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ruminococcus/Ruminococcus_albus.tgz',
        'name': 'Ruminococcus_albus',
        'enid': '57bb9c4ef1e3f40057fe100b'
      },
      {
        'path': 'chinacdc:/ANI/Ruminococcus/Ruminococcus_bromii.tgz',
        'name': 'Ruminococcus_bromii',
        'enid': '57bb9c61f1e3f40046fe0fcc'
      },
      {
        'path': 'chinacdc:/ANI/Ruminococcus/Ruminococcus_champanellensis.tgz',
        'name': 'Ruminococcus_champanellensis',
        'enid': '57bb9c3df1e3f40047fe0f74'
      },
      {
        'path': 'chinacdc:/ANI/Ruminococcus/Ruminococcus_obeum.tgz',
        'name': 'Ruminococcus_obeum',
        'enid': '57bb9c33f1e3f40058fe10b5'
      },
      {
        'path': 'chinacdc:/ANI/Ruminococcus/Ruminococcus_torques.tgz',
        'name': 'Ruminococcus_torques',
        'enid': '57bb9c58f1e3f4004efe10ac'
      },
      {
        'path': 'chinacdc:/ANI/Ruminococcus/Ruminococcus_uid197156.tgz',
        'name': 'Ruminococcus_uid197156',
        'enid': '57bb9c44f1e3f40041fe0f36'
      }
    ]
  },
  {
    'name': 'Runella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Runella/Runella_slithyformis.tgz',
        'name': 'Runella_slithyformis',
        'enid': '57bb9ee8f1e3f40058fe1115'
      }
    ]
  },
  {
    'name': 'Saccharomonospora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Saccharomonospora/Saccharomonospora_viridis.tgz',
        'name': 'Saccharomonospora_viridis',
        'enid': '57bb9d6bf1e3f4003bfe0f3d'
      }
    ]
  },
  {
    'name': 'Saccharophagus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Saccharophagus/Saccharophagus_degradans.tgz',
        'name': 'Saccharophagus_degradans',
        'enid': '57bbd29bf1e3f4004efe16d9'
      }
    ]
  },
  {
    'name': 'Saccharopolyspora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Saccharopolyspora/Saccharopolyspora_erythraea.tgz',
        'name': 'Saccharopolyspora_erythraea',
        'enid': '57bb90f2f1e3f40059fe102b'
      }
    ]
  },
  {
    'name': 'Saccharothrix',
    'species': [
      {
        'path': 'chinacdc:/ANI/Saccharothrix/Saccharothrix_espanaensis.tgz',
        'name': 'Saccharothrix_espanaensis',
        'enid': '57bb9db8f1e3f4005cfe1152'
      }
    ]
  },
  {
    'name': 'Salinarchaeum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Salinarchaeum/Salinarchaeum_laminariae.tgz',
        'name': 'Salinarchaeum_laminariae',
        'enid': '57bbbfeff1e3f4004efe1286'
      }
    ]
  },
  {
    'name': 'Salinibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Salinibacter/Salinibacter_ruber.tgz',
        'name': 'Salinibacter_ruber',
        'enid': '57bbb852f1e3f4005cfe1363'
      }
    ]
  },
  {
    'name': 'Salinispora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Salinispora/Salinispora_arenicola.tgz',
        'name': 'Salinispora_arenicola',
        'enid': '57bbc170f1e3f40059fe147a'
      },
      {
        'path': 'chinacdc:/ANI/Salinispora/Salinispora_tropica.tgz',
        'name': 'Salinispora_tropica',
        'enid': '57bbc179f1e3f40057fe121b'
      }
    ]
  },
  {
    'name': 'Salmonella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Salmonella/Salmonella_bongori.tgz',
        'name': 'Salmonella_bongori',
        'enid': '57bbc6f3f1e3f40059fe1782'
      },
      {
        'path': 'chinacdc:/ANI/Salmonella/Salmonella_enterica.tgz',
        'name': 'Salmonella_enterica',
        'enid': '57bbc629f1e3f4004efe1348'
      },
      {
        'path': 'chinacdc:/ANI/Salmonella/Salmonella_typhimurium.tgz',
        'name': 'Salmonella_typhimurium',
        'enid': '57bbc5faf1e3f4005cfe16d7'
      }
    ]
  },
  {
    'name': 'Sanguibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sanguibacter/Sanguibacter_keddieii.tgz',
        'name': 'Sanguibacter_keddieii',
        'enid': '57bbbfdef1e3f40057fe11bc'
      }
    ]
  },
  {
    'name': 'Saprospira',
    'species': [
      {
        'path': 'chinacdc:/ANI/Saprospira/Saprospira_grandis.tgz',
        'name': 'Saprospira_grandis',
        'enid': '57bbc18df1e3f40059fe1481'
      }
    ]
  },
  {
    'name': 'Sebaldella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sebaldella/Sebaldella_termitidis.tgz',
        'name': 'Sebaldella_termitidis',
        'enid': '57bbaa01f1e3f4004efe1167'
      }
    ]
  },
  {
    'name': 'Segniliparus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Segniliparus/Segniliparus_rotundus.tgz',
        'name': 'Segniliparus_rotundus',
        'enid': '57bbb267f1e3f40053fe135e'
      }
    ]
  },
  {
    'name': 'Selenomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Selenomonas/Selenomonas_ruminantium.tgz',
        'name': 'Selenomonas_ruminantium',
        'enid': '57bbbdccf1e3f4004efe125f'
      },
      {
        'path': 'chinacdc:/ANI/Selenomonas/Selenomonas_sputigena.tgz',
        'name': 'Selenomonas_sputigena',
        'enid': '57bbbdd6f1e3f40058fe12c4'
      }
    ]
  },
  {
    'name': 'Serratia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_AS12.tgz',
        'name': 'Serratia_AS12',
        'enid': '57bba68bf1e3f4005cfe11c2'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_AS13.tgz',
        'name': 'Serratia_AS13',
        'enid': '57bba66ef1e3f40046fe101e'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_ATCC.tgz',
        'name': 'Serratia_ATCC',
        'enid': '57bba639f1e3f40058fe118f'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_liquefaciens.tgz',
        'name': 'Serratia_liquefaciens',
        'enid': '57bba678f1e3f40053fe1244'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_marcescens.tgz',
        'name': 'Serratia_marcescens',
        'enid': '57bba643f1e3f40058fe1193'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_odorifera.tgz',
        'name': 'Serratia_odorifera',
        'enid': '57bba660f1e3f40051fe101c'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_plymuthica.tgz',
        'name': 'Serratia_plymuthica',
        'enid': '57bba650f1e3f40057fe1069'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_proteamaculans.tgz',
        'name': 'Serratia_proteamaculans',
        'enid': '57bba681f1e3f40053fe1248'
      },
      {
        'path': 'chinacdc:/ANI/Serratia/Serratia_symbiotica.tgz',
        'name': 'Serratia_symbiotica',
        'enid': '57bba668f1e3f4004efe1119'
      }
    ]
  },
  {
    'name': 'Shewanella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_ANA.tgz',
        'name': 'Shewanella_ANA',
        'enid': '57bba3f4f1e3f40051fe1011'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_MR.tgz',
        'name': 'Shewanella_MR',
        'enid': '57bba394f1e3f4005cfe11a4'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_W3.tgz',
        'name': 'Shewanella_W3',
        'enid': '57bba378f1e3f4004dfe0fbd'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_amazonensis.tgz',
        'name': 'Shewanella_amazonensis',
        'enid': '57bba364f1e3f40053fe11f1'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_baltica.tgz',
        'name': 'Shewanella_baltica',
        'enid': '57bba33ef1e3f40040fe0f89'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_denitrificans.tgz',
        'name': 'Shewanella_denitrificans',
        'enid': '57bba3e0f1e3f40043fe0f41'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_frigidimarina.tgz',
        'name': 'Shewanella_frigidimarina',
        'enid': '57bba3abf1e3f4005cfe11a8'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_halifaxensis.tgz',
        'name': 'Shewanella_halifaxensis',
        'enid': '57bba3c3f1e3f40053fe11f5'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_loihica.tgz',
        'name': 'Shewanella_loihica',
        'enid': '57bba3d6f1e3f40053fe1200'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_oneidensis.tgz',
        'name': 'Shewanella_oneidensis',
        'enid': '57bba3a1f1e3f40059fe1192'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_pealeana.tgz',
        'name': 'Shewanella_pealeana',
        'enid': '57bba3eaf1e3f40059fe1196'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_piezotolerans.tgz',
        'name': 'Shewanella_piezotolerans',
        'enid': '57bba3cdf1e3f40053fe11fc'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_putrefaciens.tgz',
        'name': 'Shewanella_putrefaciens',
        'enid': '57bba3b5f1e3f4004efe10f4'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_sediminis.tgz',
        'name': 'Shewanella_sediminis',
        'enid': '57bba382f1e3f4004efe10f0'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_violacea.tgz',
        'name': 'Shewanella_violacea',
        'enid': '57bba38cf1e3f4004afe0fc5'
      },
      {
        'path': 'chinacdc:/ANI/Shewanella/Shewanella_woodyi.tgz',
        'name': 'Shewanella_woodyi',
        'enid': '57bba36ef1e3f4005cfe119b'
      }
    ]
  },
  {
    'name': 'Shigella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Shigella/Shigella_boydii.tgz',
        'name': 'Shigella_boydii',
        'enid': '57bb92c5f1e3f4005cfe1045'
      },
      {
        'path': 'chinacdc:/ANI/Shigella/Shigella_dysenteriae.tgz',
        'name': 'Shigella_dysenteriae',
        'enid': '57bb92d1f1e3f40058fe1042'
      },
      {
        'path': 'chinacdc:/ANI/Shigella/Shigella_flexneri.tgz',
        'name': 'Shigella_flexneri',
        'enid': '57bb92ebf1e3f40059fe1051'
      },
      {
        'path': 'chinacdc:/ANI/Shigella/Shigella_sonnei.tgz',
        'name': 'Shigella_sonnei',
        'enid': '57bb92ddf1e3f40059fe104d'
      }
    ]
  },
  {
    'name': 'Sideroxydans',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sideroxydans/Sideroxydans_lithotrophicus.tgz',
        'name': 'Sideroxydans_lithotrophicus',
        'enid': '57bbcd9ef1e3f4003bfe1023'
      }
    ]
  },
  {
    'name': 'Simiduia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Simiduia/Simiduia_agarivorans.tgz',
        'name': 'Simiduia_agarivorans',
        'enid': '57bbb5b8f1e3f4005cfe1320'
      }
    ]
  },
  {
    'name': 'Simkania',
    'species': [
      {
        'path': 'chinacdc:/ANI/Simkania/Simkania_negevensis.tgz',
        'name': 'Simkania_negevensis',
        'enid': '57bbc584f1e3f40040fe1067'
      }
    ]
  },
  {
    'name': 'Singulisphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Singulisphaera/Singulisphaera_acidiphila.tgz',
        'name': 'Singulisphaera_acidiphila',
        'enid': '57bbc384f1e3f40053fe15f7'
      }
    ]
  },
  {
    'name': 'Sinorhizobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sinorhizobium/Sinorhizobium_fredii.tgz',
        'name': 'Sinorhizobium_fredii',
        'enid': '57bba29ff1e3f40053fe11e9'
      },
      {
        'path': 'chinacdc:/ANI/Sinorhizobium/Sinorhizobium_medicae.tgz',
        'name': 'Sinorhizobium_medicae',
        'enid': '57bba2b1f1e3f40051fe1008'
      },
      {
        'path': 'chinacdc:/ANI/Sinorhizobium/Sinorhizobium_meliloti.tgz',
        'name': 'Sinorhizobium_meliloti',
        'enid': '57bba26df1e3f40053fe11e5'
      }
    ]
  },
  {
    'name': 'Slackia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Slackia/Slackia_heliotrinireducens.tgz',
        'name': 'Slackia_heliotrinireducens',
        'enid': '57bbc090f1e3f4005cfe1477'
      }
    ]
  },
  {
    'name': 'Sodalis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sodalis/Sodalis_glossinidius.tgz',
        'name': 'Sodalis_glossinidius',
        'enid': '57bbd1daf1e3f40059fe1bbe'
      }
    ]
  },
  {
    'name': 'Solibacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Solibacillus/Solibacillus_silvestris.tgz',
        'name': 'Solibacillus_silvestris',
        'enid': '57bbb5b0f1e3f4005cfe1319'
      }
    ]
  },
  {
    'name': 'Solitalea',
    'species': [
      {
        'path': 'chinacdc:/ANI/Solitalea/Solitalea_canadensis.tgz',
        'name': 'Solitalea_canadensis',
        'enid': '57bbc4d6f1e3f40053fe16c9'
      }
    ]
  },
  {
    'name': 'Sorangium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sorangium/Sorangium_cellulosum.tgz',
        'name': 'Sorangium_cellulosum',
        'enid': '57bb9b35f1e3f40047fe0f70'
      }
    ]
  },
  {
    'name': 'Sphaerobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sphaerobacter/Sphaerobacter_thermophilus.tgz',
        'name': 'Sphaerobacter_thermophilus',
        'enid': '57bbb3fbf1e3f40053fe1374'
      }
    ]
  },
  {
    'name': 'Sphaerochaeta',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sphaerochaeta/Sphaerochaeta_pleomorpha.tgz',
        'name': 'Sphaerochaeta_pleomorpha',
        'enid': '57bb9589f1e3f40059fe109e'
      }
    ]
  },
  {
    'name': 'Sphingobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sphingobacterium/Sphingobacterium_21.tgz',
        'name': 'Sphingobacterium_21',
        'enid': '57bbcb16f1e3f40057fe1430'
      }
    ]
  },
  {
    'name': 'Sphingobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sphingobium/Sphingobium_SYK.tgz',
        'name': 'Sphingobium_SYK',
        'enid': '57bbb664f1e3f40057fe1114'
      },
      {
        'path': 'chinacdc:/ANI/Sphingobium/Sphingobium_chlorophenolicum.tgz',
        'name': 'Sphingobium_chlorophenolicum',
        'enid': '57bbb66ef1e3f4005cfe132c'
      },
      {
        'path': 'chinacdc:/ANI/Sphingobium/Sphingobium_japonicum.tgz',
        'name': 'Sphingobium_japonicum',
        'enid': '57bbb65af1e3f4004afe1013'
      }
    ]
  },
  {
    'name': 'Sphingomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sphingomonas/Sphingomonas_MM.tgz',
        'name': 'Sphingomonas_MM',
        'enid': '57bb95a4f1e3f40053fe10e3'
      },
      {
        'path': 'chinacdc:/ANI/Sphingomonas/Sphingomonas_wittichii.tgz',
        'name': 'Sphingomonas_wittichii',
        'enid': '57bb959af1e3f40053fe10df'
      }
    ]
  },
  {
    'name': 'Sphingopyxis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sphingopyxis/Sphingopyxis_alaskensis.tgz',
        'name': 'Sphingopyxis_alaskensis',
        'enid': '57bbca88f1e3f40059fe191b'
      }
    ]
  },
  {
    'name': 'Spiribacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Spiribacter/Spiribacter_UAH.tgz',
        'name': 'Spiribacter_UAH',
        'enid': '57bbcb90f1e3f40047fe10af'
      }
    ]
  },
  {
    'name': 'Spirochaeta',
    'species': [
      {
        'path': 'chinacdc:/ANI/Spirochaeta/Spirochaeta_Buddy.tgz',
        'name': 'Spirochaeta_Buddy',
        'enid': '57bbba61f1e3f4005cfe137c'
      },
      {
        'path': 'chinacdc:/ANI/Spirochaeta/Spirochaeta_L21.tgz',
        'name': 'Spirochaeta_L21',
        'enid': '57bbba46f1e3f4004efe1225'
      },
      {
        'path': 'chinacdc:/ANI/Spirochaeta/Spirochaeta_africana.tgz',
        'name': 'Spirochaeta_africana',
        'enid': '57bbba4ff1e3f40058fe1263'
      },
      {
        'path': 'chinacdc:/ANI/Spirochaeta/Spirochaeta_caldaria.tgz',
        'name': 'Spirochaeta_caldaria',
        'enid': '57bbba74f1e3f40058fe1267'
      },
      {
        'path': 'chinacdc:/ANI/Spirochaeta/Spirochaeta_coccoides.tgz',
        'name': 'Spirochaeta_coccoides',
        'enid': '57bbba59f1e3f40043fe0f6e'
      },
      {
        'path': 'chinacdc:/ANI/Spirochaeta/Spirochaeta_smaragdinae.tgz',
        'name': 'Spirochaeta_smaragdinae',
        'enid': '57bbba7ef1e3f40058fe126b'
      },
      {
        'path': 'chinacdc:/ANI/Spirochaeta/Spirochaeta_thermophila.tgz',
        'name': 'Spirochaeta_thermophila',
        'enid': '57bbba6bf1e3f40041fe0f57'
      }
    ]
  },
  {
    'name': 'Spiroplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Spiroplasma/Spiroplasma_apis.tgz',
        'name': 'Spiroplasma_apis',
        'enid': '57bbd170f1e3f4005cfe310d'
      },
      {
        'path': 'chinacdc:/ANI/Spiroplasma/Spiroplasma_chrysopicola.tgz',
        'name': 'Spiroplasma_chrysopicola',
        'enid': '57bbd176f1e3f40053fe1bff'
      },
      {
        'path': 'chinacdc:/ANI/Spiroplasma/Spiroplasma_diminutum.tgz',
        'name': 'Spiroplasma_diminutum',
        'enid': '57bbd16bf1e3f40051fe137b'
      },
      {
        'path': 'chinacdc:/ANI/Spiroplasma/Spiroplasma_syrphidicola.tgz',
        'name': 'Spiroplasma_syrphidicola',
        'enid': '57bbd15ff1e3f4003bfe103a'
      },
      {
        'path': 'chinacdc:/ANI/Spiroplasma/Spiroplasma_taiwanense.tgz',
        'name': 'Spiroplasma_taiwanense',
        'enid': '57bbd165f1e3f40057fe15a2'
      }
    ]
  },
  {
    'name': 'Spirosoma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Spirosoma/Spirosoma_linguale.tgz',
        'name': 'Spirosoma_linguale',
        'enid': '57bbb2e6f1e3f40053fe1369'
      }
    ]
  },
  {
    'name': 'Stackebrandtia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Stackebrandtia/Stackebrandtia_nassauensis.tgz',
        'name': 'Stackebrandtia_nassauensis',
        'enid': '57bbb5c2f1e3f40053fe1388'
      }
    ]
  },
  {
    'name': 'Stanieria',
    'species': [
      {
        'path': 'chinacdc:/ANI/Stanieria/Stanieria_cyanosphaera.tgz',
        'name': 'Stanieria_cyanosphaera',
        'enid': '57bbd311f1e3f40053fe1cd9'
      }
    ]
  },
  {
    'name': 'Staphylococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_aureus.tgz',
        'name': 'Staphylococcus_aureus',
        'enid': '57bbafc1f1e3f40053fe1329'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_carnosus.tgz',
        'name': 'Staphylococcus_carnosus',
        'enid': '57bbb04af1e3f4005cfe12cf'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_epidermidis.tgz',
        'name': 'Staphylococcus_epidermidis',
        'enid': '57bbb05bf1e3f4005cfe12d3'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_haemolyticus.tgz',
        'name': 'Staphylococcus_haemolyticus',
        'enid': '57bbafa5f1e3f40053fe1319'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_lugdunensis.tgz',
        'name': 'Staphylococcus_lugdunensis',
        'enid': '57bbb040f1e3f40053fe132d'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_pasteuri.tgz',
        'name': 'Staphylococcus_pasteuri',
        'enid': '57bbb053f1e3f40053fe1331'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_pseudintermedius.tgz',
        'name': 'Staphylococcus_pseudintermedius',
        'enid': '57bbaf9bf1e3f4004efe11b0'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_saprophyticus.tgz',
        'name': 'Staphylococcus_saprophyticus',
        'enid': '57bbafb6f1e3f40053fe1325'
      },
      {
        'path': 'chinacdc:/ANI/Staphylococcus/Staphylococcus_warneri.tgz',
        'name': 'Staphylococcus_warneri',
        'enid': '57bbafadf1e3f40053fe131d'
      }
    ]
  },
  {
    'name': 'Staphylothermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Staphylothermus/Staphylothermus_hellenicus.tgz',
        'name': 'Staphylothermus_hellenicus',
        'enid': '57bbac98f1e3f40053fe12d4'
      },
      {
        'path': 'chinacdc:/ANI/Staphylothermus/Staphylothermus_marinus.tgz',
        'name': 'Staphylothermus_marinus',
        'enid': '57bbaca0f1e3f4005cfe1257'
      }
    ]
  },
  {
    'name': 'Starkeya',
    'species': [
      {
        'path': 'chinacdc:/ANI/Starkeya/Starkeya_novella.tgz',
        'name': 'Starkeya_novella',
        'enid': '57bbc5a9f1e3f40043fe0fd5'
      }
    ]
  },
  {
    'name': 'Stenotrophomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Stenotrophomonas/Stenotrophomonas_maltophilia.tgz',
        'name': 'Stenotrophomonas_maltophilia',
        'enid': '57bbcd88f1e3f40057fe14ad'
      }
    ]
  },
  {
    'name': 'Stigmatella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Stigmatella/Stigmatella_aurantiaca.tgz',
        'name': 'Stigmatella_aurantiaca',
        'enid': '57bb905bf1e3f40058fe1021'
      }
    ]
  },
  {
    'name': 'Strawberry',
    'species': [
      {
        'path': 'chinacdc:/ANI/Strawberry/Strawberry_lethal.tgz',
        'name': 'Strawberry_lethal',
        'enid': '57bb968af1e3f4004efe1052'
      }
    ]
  },
  {
    'name': 'Streptobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Streptobacillus/Streptobacillus_moniliformis.tgz',
        'name': 'Streptobacillus_moniliformis',
        'enid': '57bbad65f1e3f40057fe10c0'
      }
    ]
  },
  {
    'name': 'Streptococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_I.tgz',
        'name': 'Streptococcus_I',
        'enid': '57bb948ff1e3f40051fe0fbe'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_agalactiae.tgz',
        'name': 'Streptococcus_agalactiae',
        'enid': '57bb944df1e3f40053fe10c9'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_anginosus.tgz',
        'name': 'Streptococcus_anginosus',
        'enid': '57bb943bf1e3f40058fe105d'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_constellatus.tgz',
        'name': 'Streptococcus_constellatus',
        'enid': '57bb94dbf1e3f40053fe10d1'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_dysgalactiae.tgz',
        'name': 'Streptococcus_dysgalactiae',
        'enid': '57bb942df1e3f40040fe0f63'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_equi.tgz',
        'name': 'Streptococcus_equi',
        'enid': '57bb94f8f1e3f4005cfe106d'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_gallolyticus.tgz',
        'name': 'Streptococcus_gallolyticus',
        'enid': '57bb93d1f1e3f40058fe1059'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_gordonii.tgz',
        'name': 'Streptococcus_gordonii',
        'enid': '57bb93daf1e3f40057fe0fc3'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_infantarius.tgz',
        'name': 'Streptococcus_infantarius',
        'enid': '57bb94c9f1e3f40058fe1069'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_iniae.tgz',
        'name': 'Streptococcus_iniae',
        'enid': '57bb93c9f1e3f40046fe0f8e'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_intermedius.tgz',
        'name': 'Streptococcus_intermedius',
        'enid': '57bb94d1f1e3f40046fe0f96'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_lutetiensis.tgz',
        'name': 'Streptococcus_lutetiensis',
        'enid': '57bb94e4f1e3f4004efe103c'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_macedonicus.tgz',
        'name': 'Streptococcus_macedonicus',
        'enid': '57bb9444f1e3f40053fe10c5'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_mitis.tgz',
        'name': 'Streptococcus_mitis',
        'enid': '57bb93c1f1e3f4005cfe1065'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_mutans.tgz',
        'name': 'Streptococcus_mutans',
        'enid': '57bb94ecf1e3f40053fe10d5'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_oligofermentans.tgz',
        'name': 'Streptococcus_oligofermentans',
        'enid': '57bb9487f1e3f40058fe1061'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_oralis.tgz',
        'name': 'Streptococcus_oralis',
        'enid': '57bb94baf1e3f40058fe1065'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_parasanguinis.tgz',
        'name': 'Streptococcus_parasanguinis',
        'enid': '57bb93e4f1e3f40059fe106b'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_parauberis.tgz',
        'name': 'Streptococcus_parauberis',
        'enid': '57bb9425f1e3f40053fe10c1'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_pasteurianus.tgz',
        'name': 'Streptococcus_pasteurianus',
        'enid': '57bb9506f1e3f40059fe1077'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_pneumoniae.tgz',
        'name': 'Streptococcus_pneumoniae',
        'enid': '57bb93eff1e3f40046fe0f92'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_pseudopneumoniae.tgz',
        'name': 'Streptococcus_pseudopneumoniae',
        'enid': '57bb9534f1e3f40058fe106d'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_pyogenes.tgz',
        'name': 'Streptococcus_pyogenes',
        'enid': '57bb9461f1e3f4004efe1031'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_salivarius.tgz',
        'name': 'Streptococcus_salivarius',
        'enid': '57bb9499f1e3f4004efe1035'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_sanguinis.tgz',
        'name': 'Streptococcus_sanguinis',
        'enid': '57bb94b0f1e3f40059fe1073'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_suis.tgz',
        'name': 'Streptococcus_suis',
        'enid': '57bb950ef1e3f40042fe0f62'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_thermophilus.tgz',
        'name': 'Streptococcus_thermophilus',
        'enid': '57bb94a3f1e3f40059fe106f'
      },
      {
        'path': 'chinacdc:/ANI/Streptococcus/Streptococcus_uberis.tgz',
        'name': 'Streptococcus_uberis',
        'enid': '57bb94c2f1e3f4005cfe1069'
      }
    ]
  },
  {
    'name': 'Streptomyces',
    'species': [
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_PAMC26508.tgz',
        'name': 'Streptomyces_PAMC26508',
        'enid': '57bb923af1e3f40058fe1037'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_SirexAA.tgz',
        'name': 'Streptomyces_SirexAA',
        'enid': '57bb922ef1e3f40051fe0fb6'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_albus.tgz',
        'name': 'Streptomyces_albus',
        'enid': '57bb91e1f1e3f40051fe0fb2'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_avermitilis.tgz',
        'name': 'Streptomyces_avermitilis',
        'enid': '57bb9202f1e3f4005cfe103a'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_bingchenggensis.tgz',
        'name': 'Streptomyces_bingchenggensis',
        'enid': '57bb91c7f1e3f40059fe1037'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_cattleya.tgz',
        'name': 'Streptomyces_cattleya',
        'enid': '57bb9252f1e3f4005cfe103e'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_coelicolor.tgz',
        'name': 'Streptomyces_coelicolor',
        'enid': '57bb91b9f1e3f4005cfe1032'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_collinus.tgz',
        'name': 'Streptomyces_collinus',
        'enid': '57bb920ef1e3f40058fe1033'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_davawensis.tgz',
        'name': 'Streptomyces_davawensis',
        'enid': '57bb9264f1e3f40053fe109e'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_flavogriseus.tgz',
        'name': 'Streptomyces_flavogriseus',
        'enid': '57bb9246f1e3f40053fe1097'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_fulvissimus.tgz',
        'name': 'Streptomyces_fulvissimus',
        'enid': '57bb91f7f1e3f40053fe1092'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_griseus.tgz',
        'name': 'Streptomyces_griseus',
        'enid': '57bb91ebf1e3f4005cfe1036'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_hygroscopicus.tgz',
        'name': 'Streptomyces_hygroscopicus',
        'enid': '57bb921af1e3f40057fe0fab'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_rapamycinicus.tgz',
        'name': 'Streptomyces_rapamycinicus',
        'enid': '57bb919ef1e3f40047fe0f57'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_scabiei.tgz',
        'name': 'Streptomyces_scabiei',
        'enid': '57bb9270f1e3f40059fe103e'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_venezuelae.tgz',
        'name': 'Streptomyces_venezuelae',
        'enid': '57bb91d5f1e3f40057fe0fa4'
      },
      {
        'path': 'chinacdc:/ANI/Streptomyces/Streptomyces_violaceusniger.tgz',
        'name': 'Streptomyces_violaceusniger',
        'enid': '57bb91abf1e3f40057fe0fa0'
      }
    ]
  },
  {
    'name': 'Streptosporangium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Streptosporangium/Streptosporangium_roseum.tgz',
        'name': 'Streptosporangium_roseum',
        'enid': '57bb9348f1e3f40046fe0f8a'
      }
    ]
  },
  {
    'name': 'Sulfobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfobacillus/Sulfobacillus_acidophilus.tgz',
        'name': 'Sulfobacillus_acidophilus',
        'enid': '57bb9cd2f1e3f40058fe10c7'
      }
    ]
  },
  {
    'name': 'Sulfolobus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfolobus/Sulfolobus_acidocaldarius.tgz',
        'name': 'Sulfolobus_acidocaldarius',
        'enid': '57bbb0e7f1e3f40057fe10dd'
      },
      {
        'path': 'chinacdc:/ANI/Sulfolobus/Sulfolobus_islandicus.tgz',
        'name': 'Sulfolobus_islandicus',
        'enid': '57bbb107f1e3f4004efe11bc'
      },
      {
        'path': 'chinacdc:/ANI/Sulfolobus/Sulfolobus_solfataricus.tgz',
        'name': 'Sulfolobus_solfataricus',
        'enid': '57bbb123f1e3f40051fe1066'
      },
      {
        'path': 'chinacdc:/ANI/Sulfolobus/Sulfolobus_tokodaii.tgz',
        'name': 'Sulfolobus_tokodaii',
        'enid': '57bbb0fdf1e3f4004efe11b8'
      }
    ]
  },
  {
    'name': 'Sulfuricella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfuricella/Sulfuricella_denitrificans.tgz',
        'name': 'Sulfuricella_denitrificans',
        'enid': '57bbc4fef1e3f40057fe12a3'
      }
    ]
  },
  {
    'name': 'Sulfuricurvum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfuricurvum/Sulfuricurvum_kujiense.tgz',
        'name': 'Sulfuricurvum_kujiense',
        'enid': '57bbb593f1e3f40040fe0fbb'
      }
    ]
  },
  {
    'name': 'Sulfurihydrogenibium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfurihydrogenibium/Sulfurihydrogenibium_YO3AOP1.tgz',
        'name': 'Sulfurihydrogenibium_YO3AOP1',
        'enid': '57bb99f6f1e3f40051fe0fe1'
      },
      {
        'path': 'chinacdc:/ANI/Sulfurihydrogenibium/Sulfurihydrogenibium_azorense.tgz',
        'name': 'Sulfurihydrogenibium_azorense',
        'enid': '57bb99fdf1e3f4005cfe10c7'
      }
    ]
  },
  {
    'name': 'Sulfurimonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfurimonas/Sulfurimonas_autotrophica.tgz',
        'name': 'Sulfurimonas_autotrophica',
        'enid': '57bb9edef1e3f40059fe114c'
      },
      {
        'path': 'chinacdc:/ANI/Sulfurimonas/Sulfurimonas_denitrificans.tgz',
        'name': 'Sulfurimonas_denitrificans',
        'enid': '57bb9ed6f1e3f4005cfe1163'
      }
    ]
  },
  {
    'name': 'Sulfurospirillum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfurospirillum/Sulfurospirillum_barnesii.tgz',
        'name': 'Sulfurospirillum_barnesii',
        'enid': '57bba47df1e3f40059fe11a6'
      },
      {
        'path': 'chinacdc:/ANI/Sulfurospirillum/Sulfurospirillum_deleyianum.tgz',
        'name': 'Sulfurospirillum_deleyianum',
        'enid': '57bba487f1e3f40040fe0f8d'
      }
    ]
  },
  {
    'name': 'Sulfurovum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Sulfurovum/Sulfurovum_NBC37.tgz',
        'name': 'Sulfurovum_NBC37',
        'enid': '57bb9ac4f1e3f4005cfe10e7'
      }
    ]
  },
  {
    'name': 'Symbiobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Symbiobacterium/Symbiobacterium_thermophilum.tgz',
        'name': 'Symbiobacterium_thermophilum',
        'enid': '57bb97c9f1e3f4004efe1069'
      }
    ]
  },
  {
    'name': 'Synechococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_CC9311.tgz',
        'name': 'Synechococcus_CC9311',
        'enid': '57bba09df1e3f40047fe0f8c'
      },
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_CC9605.tgz',
        'name': 'Synechococcus_CC9605',
        'enid': '57bba0d0f1e3f40053fe11ae'
      },
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_CC9902.tgz',
        'name': 'Synechococcus_CC9902',
        'enid': '57bba0b4f1e3f4004afe0fae'
      },
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_JA.tgz',
        'name': 'Synechococcus_JA',
        'enid': '57bba0daf1e3f4004afe0fb2'
      },
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_PCC.tgz',
        'name': 'Synechococcus_PCC',
        'enid': '57bba0a7f1e3f40053fe11aa'
      },
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_RCC307.tgz',
        'name': 'Synechococcus_RCC307',
        'enid': '57bba0e3f1e3f4004efe10de'
      },
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_WH.tgz',
        'name': 'Synechococcus_WH',
        'enid': '57bba0c6f1e3f40059fe116e'
      },
      {
        'path': 'chinacdc:/ANI/Synechococcus/Synechococcus_elongatus.tgz',
        'name': 'Synechococcus_elongatus',
        'enid': '57bba0bcf1e3f40057fe1043'
      }
    ]
  },
  {
    'name': 'Synechocystis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Synechocystis/Synechocystis_PCC.tgz',
        'name': 'Synechocystis_PCC',
        'enid': '57bbbf2af1e3f40040fe0ff2'
      }
    ]
  },
  {
    'name': 'Synergistetes',
    'species': [
      {
        'path': 'chinacdc:/ANI/Synergistetes/Synergistetes_bacterium.tgz',
        'name': 'Synergistetes_bacterium',
        'enid': '57bbbce3f1e3f4004afe1045'
      }
    ]
  },
  {
    'name': 'Syntrophobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Syntrophobacter/Syntrophobacter_fumaroxidans.tgz',
        'name': 'Syntrophobacter_fumaroxidans',
        'enid': '57bbc3fbf1e3f4005cfe159c'
      }
    ]
  },
  {
    'name': 'Syntrophobotulus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Syntrophobotulus/Syntrophobotulus_glycolicus.tgz',
        'name': 'Syntrophobotulus_glycolicus',
        'enid': '57bbc0b7f1e3f40040fe1000'
      }
    ]
  },
  {
    'name': 'Syntrophomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Syntrophomonas/Syntrophomonas_wolfei.tgz',
        'name': 'Syntrophomonas_wolfei',
        'enid': '57bbd238f1e3f40047fe111d'
      }
    ]
  },
  {
    'name': 'Syntrophothermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Syntrophothermus/Syntrophothermus_lipocalidus.tgz',
        'name': 'Syntrophothermus_lipocalidus',
        'enid': '57bbae55f1e3f40053fe12f8'
      }
    ]
  },
  {
    'name': 'Syntrophus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Syntrophus/Syntrophus_aciditrophicus.tgz',
        'name': 'Syntrophus_aciditrophicus',
        'enid': '57bb9eccf1e3f40053fe117e'
      }
    ]
  },
  {
    'name': 'Tannerella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Tannerella/Tannerella_forsythia.tgz',
        'name': 'Tannerella_forsythia',
        'enid': '57bbace8f1e3f40051fe104d'
      }
    ]
  },
  {
    'name': 'Taylorella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Taylorella/Taylorella_asinigenitalis.tgz',
        'name': 'Taylorella_asinigenitalis',
        'enid': '57bb9720f1e3f40051fe0fce'
      },
      {
        'path': 'chinacdc:/ANI/Taylorella/Taylorella_equigenitalis.tgz',
        'name': 'Taylorella_equigenitalis',
        'enid': '57bb972af1e3f40058fe1079'
      }
    ]
  },
  {
    'name': 'Tepidanaerobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Tepidanaerobacter/Tepidanaerobacter_Re1.tgz',
        'name': 'Tepidanaerobacter_Re1',
        'enid': '57bbbc2af1e3f40051fe1092'
      },
      {
        'path': 'chinacdc:/ANI/Tepidanaerobacter/Tepidanaerobacter_acetatoxydans.tgz',
        'name': 'Tepidanaerobacter_acetatoxydans',
        'enid': '57bbbc21f1e3f40058fe1291'
      }
    ]
  },
  {
    'name': 'Teredinibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Teredinibacter/Teredinibacter_turnerae.tgz',
        'name': 'Teredinibacter_turnerae',
        'enid': '57bb9ff4f1e3f4004dfe0faa'
      }
    ]
  },
  {
    'name': 'Terriglobus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Terriglobus/Terriglobus_roseus.tgz',
        'name': 'Terriglobus_roseus',
        'enid': '57bbcb39f1e3f40040fe10fa'
      },
      {
        'path': 'chinacdc:/ANI/Terriglobus/Terriglobus_saanensis.tgz',
        'name': 'Terriglobus_saanensis',
        'enid': '57bbcb43f1e3f40046fe121b'
      }
    ]
  },
  {
    'name': 'Tetragenococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Tetragenococcus/Tetragenococcus_halophilus.tgz',
        'name': 'Tetragenococcus_halophilus',
        'enid': '57bbb720f1e3f40040fe0fcd'
      }
    ]
  },
  {
    'name': 'Thalassobaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thalassobaculum/Thalassobaculum_L2.tgz',
        'name': 'Thalassobaculum_L2',
        'enid': '57bbbdb3f1e3f4005cfe13ef'
      }
    ]
  },
  {
    'name': 'Thalassolituus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thalassolituus/Thalassolituus_oleivorans.tgz',
        'name': 'Thalassolituus_oleivorans',
        'enid': '57bb9675f1e3f40046fe0f9f'
      }
    ]
  },
  {
    'name': 'Thauera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thauera/Thauera_MZ1T.tgz',
        'name': 'Thauera_MZ1T',
        'enid': '57bba714f1e3f40040fe0f9b'
      }
    ]
  },
  {
    'name': 'Thermacetogenium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermacetogenium/Thermacetogenium_phaeum.tgz',
        'name': 'Thermacetogenium_phaeum',
        'enid': '57bb932bf1e3f40059fe1058'
      }
    ]
  },
  {
    'name': 'Thermaerobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermaerobacter/Thermaerobacter_marianensis.tgz',
        'name': 'Thermaerobacter_marianensis',
        'enid': '57bba063f1e3f40053fe11a6'
      }
    ]
  },
  {
    'name': 'Thermanaerovibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermanaerovibrio/Thermanaerovibrio_acidaminovorans.tgz',
        'name': 'Thermanaerovibrio_acidaminovorans',
        'enid': '57bb95abf1e3f4005cfe107d'
      }
    ]
  },
  {
    'name': 'Thermincola',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermincola/Thermincola_potens.tgz',
        'name': 'Thermincola_potens',
        'enid': '57bbcf76f1e3f40058fe180a'
      }
    ]
  },
  {
    'name': 'Thermoanaerobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_X513.tgz',
        'name': 'Thermoanaerobacter_X513',
        'enid': '57bbbf78f1e3f4004dfe1054'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_X514.tgz',
        'name': 'Thermoanaerobacter_X514',
        'enid': '57bbbf8bf1e3f40053fe149c'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_brockii.tgz',
        'name': 'Thermoanaerobacter_brockii',
        'enid': '57bbbf69f1e3f40059fe13ff'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_italicus.tgz',
        'name': 'Thermoanaerobacter_italicus',
        'enid': '57bbbf95f1e3f40043fe0f82'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_mathranii.tgz',
        'name': 'Thermoanaerobacter_mathranii',
        'enid': '57bbbf70f1e3f4004afe1066'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_pseudethanolicus.tgz',
        'name': 'Thermoanaerobacter_pseudethanolicus',
        'enid': '57bbbf5ff1e3f40051fe10eb'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_tengcongensis.tgz',
        'name': 'Thermoanaerobacter_tengcongensis',
        'enid': '57bbbf55f1e3f40059fe13f7'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacter/Thermoanaerobacter_wiegelii.tgz',
        'name': 'Thermoanaerobacter_wiegelii',
        'enid': '57bbbf82f1e3f40034fe0f2a'
      }
    ]
  },
  {
    'name': 'Thermoanaerobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacterium/Thermoanaerobacterium_thermosaccharolyticum.tgz',
        'name': 'Thermoanaerobacterium_thermosaccharolyticum',
        'enid': '57bb9eadf1e3f40046fe0fde'
      },
      {
        'path': 'chinacdc:/ANI/Thermoanaerobacterium/Thermoanaerobacterium_xylanolyticum.tgz',
        'name': 'Thermoanaerobacterium_xylanolyticum',
        'enid': '57bb9ea3f1e3f40058fe1104'
      }
    ]
  },
  {
    'name': 'Thermobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermobacillus/Thermobacillus_composti.tgz',
        'name': 'Thermobacillus_composti',
        'enid': '57bba990f1e3f4005cfe121a'
      }
    ]
  },
  {
    'name': 'Thermobaculum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermobaculum/Thermobaculum_terrenum.tgz',
        'name': 'Thermobaculum_terrenum',
        'enid': '57bb933ff1e3f40053fe10b5'
      }
    ]
  },
  {
    'name': 'Thermobifida',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermobifida/Thermobifida_fusca.tgz',
        'name': 'Thermobifida_fusca',
        'enid': '57bbacc3f1e3f40053fe12db'
      }
    ]
  },
  {
    'name': 'Thermobispora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermobispora/Thermobispora_bispora.tgz',
        'name': 'Thermobispora_bispora',
        'enid': '57bbd04ff1e3f40053fe1b84'
      }
    ]
  },
  {
    'name': 'Thermococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_4557.tgz',
        'name': 'Thermococcus_4557',
        'enid': '57bb9b0ef1e3f4003bfe0f33'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_AM4.tgz',
        'name': 'Thermococcus_AM4',
        'enid': '57bb9aedf1e3f40057fe0ff6'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_CL1.tgz',
        'name': 'Thermococcus_CL1',
        'enid': '57bb9b16f1e3f4005cfe10ef'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_barophilus.tgz',
        'name': 'Thermococcus_barophilus',
        'enid': '57bb9afff1e3f40058fe1098'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_gammatolerans.tgz',
        'name': 'Thermococcus_gammatolerans',
        'enid': '57bb9af5f1e3f40059fe10e8'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_kodakarensis.tgz',
        'name': 'Thermococcus_kodakarensis',
        'enid': '57bb9b06f1e3f4005cfe10eb'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_litoralis.tgz',
        'name': 'Thermococcus_litoralis',
        'enid': '57bb9b2cf1e3f40059fe10ef'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_onnurineus.tgz',
        'name': 'Thermococcus_onnurineus',
        'enid': '57bb9b25f1e3f4004afe0f88'
      },
      {
        'path': 'chinacdc:/ANI/Thermococcus/Thermococcus_sibiricus.tgz',
        'name': 'Thermococcus_sibiricus',
        'enid': '57bb9b1df1e3f4004efe109a'
      }
    ]
  },
  {
    'name': 'Thermocrinis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermocrinis/Thermocrinis_albus.tgz',
        'name': 'Thermocrinis_albus',
        'enid': '57bba903f1e3f40057fe109b'
      }
    ]
  },
  {
    'name': 'Thermodesulfatator',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermodesulfatator/Thermodesulfatator_indicus.tgz',
        'name': 'Thermodesulfatator_indicus',
        'enid': '57bbd32ef1e3f4005cfe35d8'
      }
    ]
  },
  {
    'name': 'Thermodesulfobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermodesulfobacterium/Thermodesulfobacterium_OPB45.tgz',
        'name': 'Thermodesulfobacterium_OPB45',
        'enid': '57bba23ff1e3f40059fe1185'
      }
    ]
  },
  {
    'name': 'Thermodesulfobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermodesulfobium/Thermodesulfobium_narugense.tgz',
        'name': 'Thermodesulfobium_narugense',
        'enid': '57bba208f1e3f40058fe1156'
      }
    ]
  },
  {
    'name': 'Thermodesulfovibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermodesulfovibrio/Thermodesulfovibrio_yellowstonii.tgz',
        'name': 'Thermodesulfovibrio_yellowstonii',
        'enid': '57bbb847f1e3f40058fe1251'
      }
    ]
  },
  {
    'name': 'Thermofilum',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermofilum/Thermofilum_1910b.tgz',
        'name': 'Thermofilum_1910b',
        'enid': '57bbc578f1e3f4004efe132a'
      },
      {
        'path': 'chinacdc:/ANI/Thermofilum/Thermofilum_pendens.tgz',
        'name': 'Thermofilum_pendens',
        'enid': '57bbc56ff1e3f40043fe0fca'
      }
    ]
  },
  {
    'name': 'Thermogladius',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermogladius/Thermogladius_1633.tgz',
        'name': 'Thermogladius_1633',
        'enid': '57bbb706f1e3f40046fe1057'
      }
    ]
  },
  {
    'name': 'Thermomicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermomicrobium/Thermomicrobium_roseum.tgz',
        'name': 'Thermomicrobium_roseum',
        'enid': '57bbc195f1e3f40059fe1488'
      }
    ]
  },
  {
    'name': 'Thermomonospora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermomonospora/Thermomonospora_curvata.tgz',
        'name': 'Thermomonospora_curvata',
        'enid': '57bbbfbaf1e3f40059fe1421'
      }
    ]
  },
  {
    'name': 'Thermoplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermoplasma/Thermoplasma_acidophilum.tgz',
        'name': 'Thermoplasma_acidophilum',
        'enid': '57bbb6d4f1e3f4003bfe0f61'
      },
      {
        'path': 'chinacdc:/ANI/Thermoplasma/Thermoplasma_volcanium.tgz',
        'name': 'Thermoplasma_volcanium',
        'enid': '57bbb6dcf1e3f40057fe1123'
      }
    ]
  },
  {
    'name': 'Thermoplasmatales',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermoplasmatales/Thermoplasmatales_archaeon.tgz',
        'name': 'Thermoplasmatales_archaeon',
        'enid': '57bbc0a3f1e3f4005cfe1489'
      }
    ]
  },
  {
    'name': 'Thermoproteus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermoproteus/Thermoproteus_tenax.tgz',
        'name': 'Thermoproteus_tenax',
        'enid': '57bbd55af1e3f40059fe1d39'
      },
      {
        'path': 'chinacdc:/ANI/Thermoproteus/Thermoproteus_uzoniensis.tgz',
        'name': 'Thermoproteus_uzoniensis',
        'enid': '57bbd552f1e3f4004efe17b5'
      }
    ]
  },
  {
    'name': 'Thermosediminibacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermosediminibacter/Thermosediminibacter_oceani.tgz',
        'name': 'Thermosediminibacter_oceani',
        'enid': '57bb9d55f1e3f4003ffe0f43'
      }
    ]
  },
  {
    'name': 'Thermosipho',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermosipho/Thermosipho_africanus.tgz',
        'name': 'Thermosipho_africanus',
        'enid': '57bbc908f1e3f40059fe187d'
      },
      {
        'path': 'chinacdc:/ANI/Thermosipho/Thermosipho_melanesiensis.tgz',
        'name': 'Thermosipho_melanesiensis',
        'enid': '57bbc900f1e3f40057fe13b8'
      }
    ]
  },
  {
    'name': 'Thermosphaera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermosphaera/Thermosphaera_aggregans.tgz',
        'name': 'Thermosphaera_aggregans',
        'enid': '57bb90eaf1e3f4004afe0f6f'
      }
    ]
  },
  {
    'name': 'Thermosynechococcus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermosynechococcus/Thermosynechococcus_NK55.tgz',
        'name': 'Thermosynechococcus_NK55',
        'enid': '57bbd52ff1e3f40059fe1d2a'
      },
      {
        'path': 'chinacdc:/ANI/Thermosynechococcus/Thermosynechococcus_elongatus.tgz',
        'name': 'Thermosynechococcus_elongatus',
        'enid': '57bbd537f1e3f4005cfe3b60'
      }
    ]
  },
  {
    'name': 'Thermotoga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_RQ2.tgz',
        'name': 'Thermotoga_RQ2',
        'enid': '57bbb691f1e3f4005cfe1330'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_elfii.tgz',
        'name': 'Thermotoga_elfii',
        'enid': '57bbb6c6f1e3f40058fe123a'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_hypogea.tgz',
        'name': 'Thermotoga_hypogea',
        'enid': '57bbb698f1e3f40059fe12ff'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_lettingae.tgz',
        'name': 'Thermotoga_lettingae',
        'enid': '57bbb6b0f1e3f40057fe111f'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_maritima.tgz',
        'name': 'Thermotoga_maritima',
        'enid': '57bbb69ef1e3f4004dfe1017'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_naphthophila.tgz',
        'name': 'Thermotoga_naphthophila',
        'enid': '57bbb6b7f1e3f40053fe13a4'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_neapolitana.tgz',
        'name': 'Thermotoga_neapolitana',
        'enid': '57bbb6a8f1e3f40059fe1303'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_petrophila.tgz',
        'name': 'Thermotoga_petrophila',
        'enid': '57bbb6bff1e3f4004efe11f1'
      },
      {
        'path': 'chinacdc:/ANI/Thermotoga/Thermotoga_thermarum.tgz',
        'name': 'Thermotoga_thermarum',
        'enid': '57bbb689f1e3f40053fe139c'
      }
    ]
  },
  {
    'name': 'Thermovibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermovibrio/Thermovibrio_ammonificans.tgz',
        'name': 'Thermovibrio_ammonificans',
        'enid': '57bbcaf2f1e3f40053fe1977'
      }
    ]
  },
  {
    'name': 'Thermovirga',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermovirga/Thermovirga_lienii.tgz',
        'name': 'Thermovirga_lienii',
        'enid': '57bbc301f1e3f40042fe0fc0'
      }
    ]
  },
  {
    'name': 'Thermus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thermus/Thermus_CCB.tgz',
        'name': 'Thermus_CCB',
        'enid': '57bb9fa6f1e3f4004efe10d3'
      },
      {
        'path': 'chinacdc:/ANI/Thermus/Thermus_oshimai.tgz',
        'name': 'Thermus_oshimai',
        'enid': '57bb9fb7f1e3f40059fe1166'
      },
      {
        'path': 'chinacdc:/ANI/Thermus/Thermus_scotoductus.tgz',
        'name': 'Thermus_scotoductus',
        'enid': '57bb9fadf1e3f40059fe1162'
      },
      {
        'path': 'chinacdc:/ANI/Thermus/Thermus_thermophilus.tgz',
        'name': 'Thermus_thermophilus',
        'enid': '57bb9fc1f1e3f4005cfe1167'
      }
    ]
  },
  {
    'name': 'Thioalkalimicrobium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thioalkalimicrobium/Thioalkalimicrobium_cyclicum.tgz',
        'name': 'Thioalkalimicrobium_cyclicum',
        'enid': '57bb9fe2f1e3f4005cfe116e'
      }
    ]
  },
  {
    'name': 'Thioalkalivibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thioalkalivibrio/Thioalkalivibrio_K90mix.tgz',
        'name': 'Thioalkalivibrio_K90mix',
        'enid': '57bb9a05f1e3f4004efe1083'
      },
      {
        'path': 'chinacdc:/ANI/Thioalkalivibrio/Thioalkalivibrio_nitratireducens.tgz',
        'name': 'Thioalkalivibrio_nitratireducens',
        'enid': '57bb9a0df1e3f40053fe1139'
      },
      {
        'path': 'chinacdc:/ANI/Thioalkalivibrio/Thioalkalivibrio_sulfidophilus.tgz',
        'name': 'Thioalkalivibrio_sulfidophilus',
        'enid': '57bb9a17f1e3f40057fe0fec'
      }
    ]
  },
  {
    'name': 'Thiobacillus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thiobacillus/Thiobacillus_denitrificans.tgz',
        'name': 'Thiobacillus_denitrificans',
        'enid': '57bb9047f1e3f40058fe101a'
      }
    ]
  },
  {
    'name': 'Thiocystis',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thiocystis/Thiocystis_violascens.tgz',
        'name': 'Thiocystis_violascens',
        'enid': '57bb973ef1e3f4005cfe108b'
      }
    ]
  },
  {
    'name': 'Thioflavicoccus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thioflavicoccus/Thioflavicoccus_mobilis.tgz',
        'name': 'Thioflavicoccus_mobilis',
        'enid': '57bbc183f1e3f40058fe1376'
      }
    ]
  },
  {
    'name': 'Thiomicrospira',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thiomicrospira/Thiomicrospira_crunogena.tgz',
        'name': 'Thiomicrospira_crunogena',
        'enid': '57bb9d44f1e3f40046fe0fd3'
      }
    ]
  },
  {
    'name': 'Thiomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Thiomonas/Thiomonas_3As.tgz',
        'name': 'Thiomonas_3As',
        'enid': '57bb979bf1e3f4005cfe109d'
      },
      {
        'path': 'chinacdc:/ANI/Thiomonas/Thiomonas_intermedia.tgz',
        'name': 'Thiomonas_intermedia',
        'enid': '57bb9791f1e3f40035fe0f25'
      }
    ]
  },
  {
    'name': 'Tistrella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Tistrella/Tistrella_mobilis.tgz',
        'name': 'Tistrella_mobilis',
        'enid': '57bbaa35f1e3f40051fe1031'
      }
    ]
  },
  {
    'name': 'Tolumonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Tolumonas/Tolumonas_auensis.tgz',
        'name': 'Tolumonas_auensis',
        'enid': '57bbd241f1e3f40046fe12fb'
      }
    ]
  },
  {
    'name': 'Treponema',
    'species': [
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_azotonutricium.tgz',
        'name': 'Treponema_azotonutricium',
        'enid': '57bbc10bf1e3f40053fe1515'
      },
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_brennaborense.tgz',
        'name': 'Treponema_brennaborense',
        'enid': '57bbc0e2f1e3f40057fe1200'
      },
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_denticola.tgz',
        'name': 'Treponema_denticola',
        'enid': '57bbc101f1e3f40058fe1353'
      },
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_pallidum.tgz',
        'name': 'Treponema_pallidum',
        'enid': '57bbc114f1e3f4004afe1083'
      },
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_paraluiscuniculi.tgz',
        'name': 'Treponema_paraluiscuniculi',
        'enid': '57bbc0ecf1e3f4003ffe0f99'
      },
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_pedis.tgz',
        'name': 'Treponema_pedis',
        'enid': '57bbc124f1e3f4005cfe14aa'
      },
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_primitia.tgz',
        'name': 'Treponema_primitia',
        'enid': '57bbc0f1f1e3f40046fe10b4'
      },
      {
        'path': 'chinacdc:/ANI/Treponema/Treponema_succinifaciens.tgz',
        'name': 'Treponema_succinifaciens',
        'enid': '57bbc0f9f1e3f4003bfe0f69'
      }
    ]
  },
  {
    'name': 'Trichodesmium',
    'species': [
      {
        'path': 'chinacdc:/ANI/Trichodesmium/Trichodesmium_erythraeum.tgz',
        'name': 'Trichodesmium_erythraeum',
        'enid': '57bbd4bbf1e3f40057fe1683'
      }
    ]
  },
  {
    'name': 'Tropheryma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Tropheryma/Tropheryma_whipplei.tgz',
        'name': 'Tropheryma_whipplei',
        'enid': '57bbd11cf1e3f40051fe1373'
      }
    ]
  },
  {
    'name': 'Truepera',
    'species': [
      {
        'path': 'chinacdc:/ANI/Truepera/Truepera_radiovictrix.tgz',
        'name': 'Truepera_radiovictrix',
        'enid': '57bb9c90f1e3f40053fe1154'
      }
    ]
  },
  {
    'name': 'Tsukamurella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Tsukamurella/Tsukamurella_paurometabola.tgz',
        'name': 'Tsukamurella_paurometabola',
        'enid': '57bbaa51f1e3f40047fe0fa2'
      }
    ]
  },
  {
    'name': 'Turneriella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Turneriella/Turneriella_parva.tgz',
        'name': 'Turneriella_parva',
        'enid': '57bb927bf1e3f40058fe103e'
      }
    ]
  },
  {
    'name': 'Ureaplasma',
    'species': [
      {
        'path': 'chinacdc:/ANI/Ureaplasma/Ureaplasma_parvum.tgz',
        'name': 'Ureaplasma_parvum',
        'enid': '57bb9f31f1e3f40053fe1182'
      },
      {
        'path': 'chinacdc:/ANI/Ureaplasma/Ureaplasma_urealyticum.tgz',
        'name': 'Ureaplasma_urealyticum',
        'enid': '57bb9f2af1e3f4004afe0f9f'
      }
    ]
  },
  {
    'name': 'Variovorax',
    'species': [
      {
        'path': 'chinacdc:/ANI/Variovorax/Variovorax_paradoxus.tgz',
        'name': 'Variovorax_paradoxus',
        'enid': '57bb9375f1e3f40057fe0fbf'
      }
    ]
  },
  {
    'name': 'Veillonella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Veillonella/Veillonella_parvula.tgz',
        'name': 'Veillonella_parvula',
        'enid': '57bbb141f1e3f4003ffe0f70'
      }
    ]
  },
  {
    'name': 'Verminephrobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Verminephrobacter/Verminephrobacter_eiseniae.tgz',
        'name': 'Verminephrobacter_eiseniae',
        'enid': '57bbaf2bf1e3f4005cfe12b6'
      }
    ]
  },
  {
    'name': 'Verrucosispora',
    'species': [
      {
        'path': 'chinacdc:/ANI/Verrucosispora/Verrucosispora_maris.tgz',
        'name': 'Verrucosispora_maris',
        'enid': '57bbaf89f1e3f4004dfe1004'
      }
    ]
  },
  {
    'name': 'Vibrio',
    'species': [
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_EJY3.tgz',
        'name': 'Vibrio_EJY3',
        'enid': '57bba181f1e3f4004afe0fb6'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_Ex25.tgz',
        'name': 'Vibrio_Ex25',
        'enid': '57bba13ef1e3f40058fe1147'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_alginolyticus.tgz',
        'name': 'Vibrio_alginolyticus',
        'enid': '57bba1d0f1e3f40059fe117e'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_anguillarum.tgz',
        'name': 'Vibrio_anguillarum',
        'enid': '57bba165f1e3f40058fe114b'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_cholerae.tgz',
        'name': 'Vibrio_cholerae',
        'enid': '57bba1daf1e3f40057fe1047'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_fischeri.tgz',
        'name': 'Vibrio_fischeri',
        'enid': '57bba1fdf1e3f4005cfe1189'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_furnissii.tgz',
        'name': 'Vibrio_furnissii',
        'enid': '57bba151f1e3f40046fe0ff5'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_harveyi.tgz',
        'name': 'Vibrio_harveyi',
        'enid': '57bba1c0f1e3f40058fe114f'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_nigripulchritudo.tgz',
        'name': 'Vibrio_nigripulchritudo',
        'enid': '57bba148f1e3f4004efe10e5'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_parahaemolyticus.tgz',
        'name': 'Vibrio_parahaemolyticus',
        'enid': '57bba18cf1e3f4004dfe0fb9'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_splendidus.tgz',
        'name': 'Vibrio_splendidus',
        'enid': '57bba15bf1e3f40053fe11b9'
      },
      {
        'path': 'chinacdc:/ANI/Vibrio/Vibrio_vulnificus.tgz',
        'name': 'Vibrio_vulnificus',
        'enid': '57bba16ff1e3f4005cfe1184'
      }
    ]
  },
  {
    'name': 'Vulcanisaeta',
    'species': [
      {
        'path': 'chinacdc:/ANI/Vulcanisaeta/Vulcanisaeta_distributa.tgz',
        'name': 'Vulcanisaeta_distributa',
        'enid': '57bbba19f1e3f40057fe1154'
      },
      {
        'path': 'chinacdc:/ANI/Vulcanisaeta/Vulcanisaeta_moutnovskia.tgz',
        'name': 'Vulcanisaeta_moutnovskia',
        'enid': '57bbba11f1e3f40053fe13ed'
      }
    ]
  },
  {
    'name': 'Waddlia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Waddlia/Waddlia_chondrophila.tgz',
        'name': 'Waddlia_chondrophila',
        'enid': '57bbba36f1e3f4005cfe1378'
      }
    ]
  },
  {
    'name': 'Weeksella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Weeksella/Weeksella_virosa.tgz',
        'name': 'Weeksella_virosa',
        'enid': '57bba737f1e3f4004efe1138'
      }
    ]
  },
  {
    'name': 'Weissella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Weissella/Weissella_koreensis.tgz',
        'name': 'Weissella_koreensis',
        'enid': '57bbcf1cf1e3f40051fe1322'
      }
    ]
  },
  {
    'name': 'Wigglesworthia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Wigglesworthia/Wigglesworthia_glossinidia.tgz',
        'name': 'Wigglesworthia_glossinidia',
        'enid': '57bbd0b6f1e3f4004dfe1209'
      }
    ]
  },
  {
    'name': 'Wolbachia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Wolbachia/Wolbachia_endosymbiont.tgz',
        'name': 'Wolbachia_endosymbiont',
        'enid': '57bb9c0af1e3f4004dfe0f8c'
      },
      {
        'path': 'chinacdc:/ANI/Wolbachia/Wolbachia_wRi.tgz',
        'name': 'Wolbachia_wRi',
        'enid': '57bb9c02f1e3f40059fe111a'
      }
    ]
  },
  {
    'name': 'Wolinella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Wolinella/Wolinella_succinogenes.tgz',
        'name': 'Wolinella_succinogenes',
        'enid': '57bb9bf3f1e3f4004efe10a8'
      }
    ]
  },
  {
    'name': 'Xanthobacter',
    'species': [
      {
        'path': 'chinacdc:/ANI/Xanthobacter/Xanthobacter_autotrophicus.tgz',
        'name': 'Xanthobacter_autotrophicus',
        'enid': '57bbd074f1e3f40059fe1b4f'
      }
    ]
  },
  {
    'name': 'Xanthomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Xanthomonas/Xanthomonas_albilineans.tgz',
        'name': 'Xanthomonas_albilineans',
        'enid': '57bbad91f1e3f4004efe1182'
      },
      {
        'path': 'chinacdc:/ANI/Xanthomonas/Xanthomonas_axonopodis.tgz',
        'name': 'Xanthomonas_axonopodis',
        'enid': '57bbadaff1e3f40040fe0fa6'
      },
      {
        'path': 'chinacdc:/ANI/Xanthomonas/Xanthomonas_campestris.tgz',
        'name': 'Xanthomonas_campestris',
        'enid': '57bbadccf1e3f4005cfe127e'
      },
      {
        'path': 'chinacdc:/ANI/Xanthomonas/Xanthomonas_citri.tgz',
        'name': 'Xanthomonas_citri',
        'enid': '57bbadc1f1e3f40057fe10cb'
      },
      {
        'path': 'chinacdc:/ANI/Xanthomonas/Xanthomonas_fuscans.tgz',
        'name': 'Xanthomonas_fuscans',
        'enid': '57bbad88f1e3f4004afe0ff3'
      },
      {
        'path': 'chinacdc:/ANI/Xanthomonas/Xanthomonas_oryzae.tgz',
        'name': 'Xanthomonas_oryzae',
        'enid': '57bbad99f1e3f40057fe10c7'
      }
    ]
  },
  {
    'name': 'Xenorhabdus',
    'species': [
      {
        'path': 'chinacdc:/ANI/Xenorhabdus/Xenorhabdus_bovienii.tgz',
        'name': 'Xenorhabdus_bovienii',
        'enid': '57bbae7cf1e3f4004efe118c'
      },
      {
        'path': 'chinacdc:/ANI/Xenorhabdus/Xenorhabdus_nematophila.tgz',
        'name': 'Xenorhabdus_nematophila',
        'enid': '57bbae72f1e3f40051fe105b'
      }
    ]
  },
  {
    'name': 'Xylella',
    'species': [
      {
        'path': 'chinacdc:/ANI/Xylella/Xylella_fastidiosa.tgz',
        'name': 'Xylella_fastidiosa',
        'enid': '57bbbfc4f1e3f40058fe1306'
      }
    ]
  },
  {
    'name': 'Yersinia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Yersinia/Yersinia_enterocolitica.tgz',
        'name': 'Yersinia_enterocolitica',
        'enid': '57bbc35ff1e3f40059fe1526'
      },
      {
        'path': 'chinacdc:/ANI/Yersinia/Yersinia_pestis.tgz',
        'name': 'Yersinia_pestis',
        'enid': '57bbc328f1e3f4004efe12e8'
      },
      {
        'path': 'chinacdc:/ANI/Yersinia/Yersinia_pseudotuberculosis.tgz',
        'name': 'Yersinia_pseudotuberculosis',
        'enid': '57bbc311f1e3f40047fe1004'
      }
    ]
  },
  {
    'name': 'Zobellia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Zobellia/Zobellia_galactanivorans.tgz',
        'name': 'Zobellia_galactanivorans',
        'enid': '57bbd31bf1e3f4004afe1313'
      }
    ]
  },
  {
    'name': 'Zunongwangia',
    'species': [
      {
        'path': 'chinacdc:/ANI/Zunongwangia/Zunongwangia_profunda.tgz',
        'name': 'Zunongwangia_profunda',
        'enid': '57bbcf6cf1e3f40051fe133c'
      }
    ]
  },
  {
    'name': 'Zymomonas',
    'species': [
      {
        'path': 'chinacdc:/ANI/Zymomonas/Zymomonas_mobilis.tgz',
        'name': 'Zymomonas_mobilis',
        'enid': '57bbd19af1e3f40057fe15b5'
      }
    ]
  },
  {
    'name': 'alpha',
    'species': [
      {
        'path': 'chinacdc:/ANI/alpha/alpha_proteobacterium.tgz',
        'name': 'alpha_proteobacterium',
        'enid': '57bbc5b4f1e3f40053fe172b'
      }
    ]
  },
  {
    'name': 'archaeon',
    'species': [
      {
        'path': 'chinacdc:/ANI/archaeon/archaeon_Mx1201.tgz',
        'name': 'archaeon_Mx1201',
        'enid': '57bbc8f9f1e3f4004afe11d1'
      }
    ]
  },
  {
    'name': 'bacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/bacterium/bacterium_BT.tgz',
        'name': 'bacterium_BT',
        'enid': '57bbc405f1e3f40059fe1577'
      }
    ]
  },
  {
    'name': 'beta',
    'species': [
      {
        'path': 'chinacdc:/ANI/beta/beta_proteobacterium.tgz',
        'name': 'beta_proteobacterium',
        'enid': '57bbcffff1e3f4005cfe2d6d'
      }
    ]
  },
  {
    'name': 'butyrate',
    'species': [
      {
        'path': 'chinacdc:/ANI/butyrate/butyrate_producing.tgz',
        'name': 'butyrate_producing',
        'enid': '57bba2c9f1e3f4005cfe1197'
      }
    ]
  },
  {
    'name': 'candidate',
    'species': [
      {
        'path': 'chinacdc:/ANI/candidate/candidate_division.tgz',
        'name': 'candidate_division',
        'enid': '57bb9d27f1e3f40053fe115f'
      }
    ]
  },
  {
    'name': 'cyanobacterium',
    'species': [
      {
        'path': 'chinacdc:/ANI/cyanobacterium/cyanobacterium_UCYN.tgz',
        'name': 'cyanobacterium_UCYN',
        'enid': '57bb902cf1e3f40059fe101a'
      }
    ]
  },
  {
    'name': 'delta',
    'species': [
      {
        'path': 'chinacdc:/ANI/delta/delta_proteobacterium.tgz',
        'name': 'delta_proteobacterium',
        'enid': '57bbd123f1e3f40057fe1587'
      }
    ]
  },
  {
    'name': 'gamma',
    'species': [
      {
        'path': 'chinacdc:/ANI/gamma/gamma_proteobacterium.tgz',
        'name': 'gamma_proteobacterium',
        'enid': '57bb90d7f1e3f4004efe1012'
      }
    ]
  },
  {
    'name': 'halophilic',
    'species': [
      {
        'path': 'chinacdc:/ANI/halophilic/halophilic_archaeon.tgz',
        'name': 'halophilic_archaeon',
        'enid': '57bbd548f1e3f40051fe1422'
      }
    ]
  },
  {
    'name': 'secondary',
    'species': [
      {
        'path': 'chinacdc:/ANI/secondary/secondary_endosymbiont.tgz',
        'name': 'secondary_endosymbiont',
        'enid': '57bbcb31f1e3f40053fe1988'
      }
    ]
  },
  {
    'name': 'syncytium',
    'species': [
      {
        'path': 'chinacdc:/ANI/syncytium/syncytium_symbiont.tgz',
        'name': 'syncytium_symbiont',
        'enid': '57bbd342f1e3f40046fe1331'
      }
    ]
  },
  {
    'name': 'uncultured',
    'species': [
      {
        'path': 'chinacdc:/ANI/uncultured/uncultured_Sulfuricurvum.tgz',
        'name': 'uncultured_Sulfuricurvum',
        'enid': '57bb970df1e3f40059fe10ba'
      },
      {
        'path': 'chinacdc:/ANI/uncultured/uncultured_Termite.tgz',
        'name': 'uncultured_Termite',
        'enid': '57bb9717f1e3f40053fe1102'
      }
    ]
  }
];

var testbtn = false;

// 按钮 RUN ANItools 运行ANItools
$('#cdc_running').click(function() {
  if (testbtn) {
    // new_task
        genedock.activateWorkflowFormal(currentAccount, 'default', {
          'workflow_name': 'ANItools',
          'workflow_version': 3,
          'parameters': PlanRequest,
          'task_name': 'ANItools'
        }, function(res) {
          var restask = JSON.parse(res);
          task_id = restask.task_id;
          // 跳转到loglist.html
          window.location = 'loglist.html?' + task_id + '/';
        }, function(err) {
          uploadP(red, 'Running failed, please try again...');
          console.log('cdc_running失败');
        });
  }else {
    genedock.getParameterFormal(currentAccount, 'default', 'ANItools', {workflow_version: 3}, function(res) {
      var PlanRequest = res.parameter;
      var name = 'ANItools';
      var taskName = name + '_' + getCurrentTime().join('_');

      // update PlanRequest
      PlanRequest.name = name;
      PlanRequest.description = taskName;
      // update Inputs object
      PlanRequest.Inputs['randomcode0_loaddata'].data[0].enid = uploadfile.enid;
      PlanRequest.Inputs['randomcode0_loaddata'].data[0].name = 'chinacdc:/' + uploadfile.name;
      var genusVal = $('.genus').val();
      var speciesVal = $('.species').val();
      var tagsVal = $('#tags').val();
      if (genusVal != -1 && speciesVal != -1) {
        if (tagsVal) {
          PlanRequest.Inputs['randomcode1_loaddata'].data = [];
          if (speciesVal == 'all') {
            for (var i = 0; i < genus[genusVal].species.length; i++) {
              PlanRequest.Inputs['randomcode1_loaddata'].data.push({
                enid: genus[genusVal].species[i].enid,
                name: genus[genusVal].species[i].path,
                property: {
                  block_file: {
                    block_name: null,
                    is_block: false,
                    split_format: 'default'
                  }
                }
              });
            }
          } else {
            PlanRequest.Inputs['randomcode1_loaddata'].data.push({
              enid: genus[genusVal].species[speciesVal].enid,
              name: genus[genusVal].species[speciesVal].path,
              property: {
                block_file: {
                  block_name: null,
                  is_block: false,
                  split_format: 'default'
                }
              }
            });
          }
        } else {
          alert('please input the Tags');
        }
      } else {
        alert('please select the Taxonomy');
      }
      // update Outputs object
      $.each(PlanRequest.Outputs, function(outputKey, outputVal) {
        for (var i = 0; i < PlanRequest.Outputs[outputKey].data.length; i++) {
          PlanRequest.Outputs[outputKey].data[i].description = name + '_' + outputKey + '_output_' + i;
          PlanRequest.Outputs[outputKey].data[i].name = 'chinacdc:/home/admin/' + taskName + '_' + outputKey + '_' + i + '.' + PlanRequest.Outputs[outputKey].formats[0];
        }
      });
      // update Parameters object
      PlanRequest.Parameters['randomcode1_anitools'].parameters.tag.value = tagsVal;
      // update Property object
      PlanRequest.Property.reference_task[0].id = null;
      // new_task
        genedock.activateWorkflowFormal(currentAccount, 'default', {
          'workflow_name': name,
          'workflow_version': 3,
          'parameters': PlanRequest,
          'task_name': name
        }, function(res) {
          var restask = JSON.parse(res);
          task_id = restask.task_id;
          // 跳转到loglist.html
          window.location = 'loglist.html?' + task_id + '/';
        }, function(err) {
          uploadP(red, 'Running failed, please try again...');
          console.log('cdc_running失败');
        });
      }, function(err) {
        var dataMsg = eval("(" + err.responseText + ")");
        uploadP(red, dataMsg.msg);
        console.trace('获取compileWorkflow出现错误');
      });
  }
});

var PlanRequest;

// 按钮 Test Entrypoint 测试运行
$('#cdc_testRun').click(function() {
  genedock.getParameterFormal(currentAccount, 'default', 'ANItools', {workflow_version: 3}, function(res) {
    PlanRequest = res.parameter;
    var name = 'ANItools';
    var taskName = name + '_' + getCurrentTime().join('_');

    // update PlanRequest
    PlanRequest.name = name;
    PlanRequest.description = taskName;
    // update Inputs object
    PlanRequest.Inputs['randomcode0_loaddata'].data[0].enid = '58aa9d55f1e3f400598ef1b7';
    PlanRequest.Inputs['randomcode0_loaddata'].data[0].name = 'chinacdc:/S9.gbk.seq.fasta';
    PlanRequest.Inputs['randomcode1_loaddata'].data[0].enid = '57bb950ef1e3f40042fe0f62';
    PlanRequest.Inputs['randomcode1_loaddata'].data[0].name = 'chinacdc:/ANI/Streptococcus/Streptococcus_suis.tgz';
    // update Outputs object
    $.each(PlanRequest.Outputs, function(outputKey, outputVal) {
      for (var i = 0; i < PlanRequest.Outputs[outputKey].data.length; i++) {
        PlanRequest.Outputs[outputKey].data[i].description = name + '_' + outputKey + '_output_' + i;
        PlanRequest.Outputs[outputKey].data[i].name = 'chinacdc:/home/admin/' + taskName + '_' + outputKey + '_' + i + '.' + PlanRequest.Outputs[outputKey].formats[0];
      }
    });
    // update Property object
    PlanRequest.Property.reference_task[0].id = null;

    testbtn = true;
    $('#inputFileAgent').val('chinacdc:/S9.gbk.seq.fasta');

    $('.genus').val('552');

    $('.species').empty().append('<option value="all">all</option>');
    var index = $('.genus').val();
    if (index != -1) {
      for (var i = 0; i < genus[index].species.length; i++) {
        $('.species').append('<option value="' + i + '">' + genus[index].species[i].name + '</option>');
      }
    }
    $('.species').val('25');

    $('#tags').val('S9');
    uploadP(green, 'please run...');
    $("#cdc_running").removeAttr("disabled");
  }, function(err) {
    uploadP(red, "Running failed, please try again...");
    console.log("获取getWorkflow运行出错");
  });
});

//上传用户提示
function uploadP(color, msg) {
  $("#upload_p").html("<span style='display: block;width: auto;height: auto;border-radius: 5px;background: #cecece;padding: 5px 8px;color: " +
    color + ";text-align: center;word-wrap: break-word;'>" +
    msg + "</span>");
}

//隐藏中文下的input file，修改为英文状态,判断文件大小,类型
function inputUploadFile(cdcForm) {
  //英文版的value覆盖原版
  document.getElementById("inputFileAgent").value = document.getElementById("inputFile").value;
  //判断文件大小
  var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
  var fileSize = 0,
    size, cdc_fileName = cdcForm.value;
  //兼容IE判断大小
  if (isIE && !cdcForm.files) {
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    inputFile = fileSystem.GetFile(cdc_fileName);
    fileSize = inputFile.size;
  } else {
    inputFile = cdcForm.files[0];
    fileSize = cdcForm.files[0].size;
  }
  size = fileSize / 1024;
  if (size > 10000) {
    var cdc_fileSize = size / 1024;
    uploadP(red, "The file size is " + cdc_fileSize.toFixed(2) + "MB，File size cannot exceed 10MB");
    $("#cdc_running,#upload_btn").attr("disabled", "disabled");
  } else {
    //判断类型
    if (cdc_fileName.lastIndexOf(".") != -1) {
      var cdc_fileType = (cdc_fileName.substring(cdc_fileName.lastIndexOf(".") + 1, cdc_fileName.length)).toLowerCase();
      var cdc_fileFormat = ["fasta", "fa"]
      for (var i = 0; i < cdc_fileFormat.length; i++) {
        if (cdc_fileFormat[i] == cdc_fileType) {
          $('#upload_p').empty();
          uploadP(green, "Success, please upload");
          $('#upload_btn').removeAttr("disabled");
          return true;
        } else {
          $("#cdc_running,#upload_btn").attr("disabled", "disabled");
          continue;
        }
      }
      $("#cdc_running,#upload_btn").attr("disabled", "disabled");
      uploadP(red, "Don't support the suffix for ." + cdc_fileType + " File upload,Only support (.fasta, .fa)");
      return false;
    } else {
      $("#cdc_running,#upload_btn").attr("disabled", "disabled");
      uploadP(red, "Don't support the suffix for ." + cdc_fileType + " File upload,Only support (.fasta, .fa)");
    }
  }
}

//基于稳定性，使用jquery.from代替try获取enid。
function cdcForm() {
  $('#upload_p').html('uploading：<progress>');
  var filepath = $('#inputFileAgent').val();
  var filename = filepath.substring(filepath.lastIndexOf('\\') + 1, filepath.length);
  const path = '/' + filename;
  //生成MD5码
  browserMD5File(inputFile, function(err, checksum){
    checksum = checksum;
    //创建文件
    genedock.putDataFormal(currentAccount, 'default', path, function(res){
      const entityId = JSON.parse(res).entity_id;
      const payload = {
        checksum: checksum,
        compression_type: '',
        block_type: 'default',
        file_size: inputFile.size
      };
      //创建上传过程
      genedock.createDataUploadProcessFormal(currentAccount, 'default', entityId, payload, function(processRes){
        const blockId = processRes.next_block_url.split('/').slice(-2, -1)[0];
        const entity_id = processRes.entity_id;
        const upload_process_id = processRes.upload_process_id;

        //创建分块上传过程
        genedock.putDataUploadBlockFormal(currentAccount, 'default', entity_id, blockId,
          {upload_process_id:upload_process_id, is_end: true}, function(blockRes){
            //上传分块到OSS

            createBlockMultipartUpload(blockRes, inputFile, function(p) {})
              .then(function(result) {
                if (result.res.status === 200) {
                    genedock.callbackDataUploadBlock(currentAccount, 'default', entity_id, blockId, {
                      block_begin: 0,
                      upload_process_id: upload_process_id,
                      block_end: inputFile.size,
                      block_size: inputFile.size,
                      block_checksum: checksum,
                      block_system_size: inputFile.size
                    }, function(res){
                      progress = 0;
                      genedock.listDataFormal(currentAccount, 'default', '/', function(res){
                        var files = res.data_list;
                        for (var i = 0; i < files.length; i++) {
                          if (files[i].name == filename) {
                            uploadfile.enid = files[i].entity_id;
                            uploadfile.name = files[i].name;
                            $('#cdc_running').removeAttr('disabled');
                            uploadP(green, 'Uploaded successfully, please run...');
                            testbtn = false;
                          }
                        }
                      }, function(err) {
                        $('#upload_p').html('uploading：<progress>');
                      });
                    })
                }
              }).catch(function(error) {
                  uploadP(red, 'Uploaded failed, please retry...');
                });
          }, function(putBlockerr){
            $('#upload_p').html('uploading：<progress>');          
          })
      }, function(createProcesserr){
        $('#upload_p').html('uploading：<progress>');
      })
    }, function(createFoldererr){
      $('#upload_p').html('uploading：<progress>');
    });
  });  
  
  return false;
}



//获取种属关系
function Parameter() {
  for (var i = 0; i < genus.length; i++) {
    $('.genus').append('<option value="' + i + '">' + genus[i].name + '</option>');
  }

  $('.genus').change(function() {
    $('.species').empty().append('<option value="all">all</option>');
    var index = $('.genus').val();
    if (index != -1) {
      for (var i = 0; i < genus[index].species.length; i++) {
        $('.species').append('<option value="' + i + '">' + genus[index].species[i].name + '</option>');
      }
    }
  });
};

/****调用getTaskLogList函数，获取jobid*****/
var getLog_id = function(taskId, callback) {
  genedock.get_jobs_info(taskId, function(res) {
    var html = showLog_jobid_panl(res.data);
    return callback(html);
  }, function(err) {
    console.log(err);
  });
};

/****获得jobid，之后渲染到页面panl头部*****/
var showLog_jobid_panl = function(data) {
  var str = "";
  if (data) {
    var Glog = data;
    var glogClass = "";
    var glogPhoneclass = "";
    for (var i = 0; i < Glog.length; i++) {
      if (GlogShowFilter(Glog[i].jobid)) continue;
      var jobstatus = Glog[i].status;
      var status_success = "success";
      var status_running = "running";
      var status_failed = "failed";
      var status_compiled = "compiled";
      var status_waiting = "waiting";
      var status_submit = "submit";
      if (Glog[i].start_time == "" || Glog[i].start_time == null || Glog[i].start_time == undefined) {
        Glog[i].start_time = "---";
      } else {
        Glog[i].start_time = TimeTamp(Glog[i].start_time);
      };
      if (Glog[i].end_time == "" || Glog[i].end_time == null || Glog[i].end_time == undefined) {
        Glog[i].end_time = "---";
      } else {
        Glog[i].end_time = TimeTamp(Glog[i].end_time);
      };
      if (jobstatus === status_success) {
        glogClass = "<div class='jobstatus status_success'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_success'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_running) {
        glogClass = "<div class='jobstatus status_running'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_running'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_failed) {
        glogClass = "<div class='jobstatus status_failed'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_failed'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_compiled) {
        glogClass = "<div class='jobstatus status_compiled'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_compiled'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_waiting) {
        glogClass = "<div class='jobstatus status_waiting'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_waiting'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_submit) {
        glogClass = "<div class='jobstatus status_submit'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_submit'>状态：" + Glog[i].status + "</button>";
      }
      str += "<div class='panel panel-default'>\
                  <div class='panel-heading'>\
                    <div class='clearfix'>\
                    <a data-toggle='collapse' class='log_btna' data-parent='#accordion' data-id='" +
        Glog[i].job_id + "' href='#collapse" + i + "'>\
                    <div class='pull-left'>\
                      <h4 class='panel-title'><b class='caret'></b>" +
        Glog[i].app_name + "\
                      </h4></div></a>\
                      <div class='phone_time_status'>\
                      <button class='phone_start_time'>开始时间：" + Glog[i].start_time + "</button>\
                      <button class='phone_end_time'>结束时间：" + Glog[i].end_time + "</button>" + glogPhoneclass + "</div>\
                      <div class='pull-right'>\
                      <div class='jobtime'>" + Glog[i].start_time + "</div><span>&nbsp;~</span>\
                      <div class='jobtime'>" + Glog[i].end_time + "</div>" + glogClass + "</div></div></div>\
                    <div id='collapse" + i + "' class='panel-collapse collapse'>\
                      <div class='panel-body'></div>\
                    </div>\
                </div>";
    }
  } else {
    str += "<li>没有数据</li>";
  }
  return str;
};

function GlogShowFilter(data) {
  var pattern = /(_loaddata_app|_storedata_app)$/g;
  if (pattern.test(data)) return true;
  return false;
}

var temp = function() {
  var glog = "";
  var GLog_LogDetail = "";
  var g_d_l = "";
  $("#accordion .log_btna").click(function() {
    $("#accordion .panel-body").html("");
    var JobId = String($(this).data('id'));
    genedock.get_job_log(taskId, JobId, function(data) {
      if (data !== "") {
        GLog_LogDetail = data;
        g_d_l = GLog_LogDetail.data;
        glog = g_d_l.replace(/\n/g, "<br>");
        $("#accordion .panel-body").html(glog);
      } else {
        $("#accordion .panel-body").html("没有日志");
      }
    }, function(err) {
      console.log(err);
    });
  });
};

get_cdc_report = function(taskId, callback) {
  genedock.getReports(taskId, function(res) {
    callback(show_cdc_report(res));
  }, function(err) {
    console.log(err);
  });
}

show_cdc_report = function(data) {
  var GLog_Report;
  var str = '';
  if (data) {
    var GLog_Report = data.data;
    str = "<div class='table-responsive report_table'>" + GLog_Report + "</div>";
  } else {
    str = "<p>没有数据</p>";
  }
  return str;
};

var report_style_click = function() {
  $(".report_table .toc").show();
  $("#open_left").hide();
  $(".report_table input:eq(0)").remove();
  $(".report_table .report_open_right:eq(0)").remove();
  var $report_right = "<button class='report_open_right' id='open_right'><span class='glyphicon glyphicon-chevron-right'></span></button>";
  var $report_left = "<button class='report_open_left' id='open_left'><span class='glyphicon glyphicon-chevron-left'></span></button>";
  if (window.screen.availWidth < 767) {
    $(".report_table").css({
      "width": "100%",
    });
    $($report_right).css("display", "none");
  } else {
    $(".report_table").css({
      "position": "fixed",
      "border": "1px solid rgb(204, 204, 204)",
      "padding": "10px",
      "width": "70.5%",
      "float": "left",
      "background": "#fff",
      "overflow-y": "scroll"
    }).height($(window).height() - 150);
  }
  $(".report_table table").addClass("table table-bordered table-hover table-condensed");
  $(".report_table .toc").css({
    "position": "fixed",
    "padding": "5px",
    "left": "80.3%",
    "top": "122px",
    "right": "15px",
    "border": "1px solid rgb(204, 204, 204)",
    "border-radius": "5px",
    "overflow-y": "scroll",
    "overflow-x": "hidden",
    "overflow-wrap": "break-word"
  });
  $(".report_table .toc ul").first().height($(window).height() - 150);
  $(".report_table .toc ul li").css({
    "border-bottom": "1px solid rgb(221, 221, 221)"
  });
  $(".report_table .toc ul li a").css({
    "display": "block",
    "padding": "5px",
  });

  $(".report_table table th").css({
    "background": "rgb(230, 230, 230)",
  });
  $(".report_table p").css({
    "padding": "10px",
    "width": "100%"
  });
  $(".report_table :header").css("border-bottom", "1px solid rgb(238, 238, 238)");
  $(".report_table h1").css({
    "text-align": "left"
  }).addClass("jumbotron");
  $(".report_table .jumbotron").css({
    "margin-top": "0",
    "color": "inherit",
  });
  $(".report_table p img").css({
    "height": "auto",
    "width": "100%",
    "cursor": "pointer"
  });
  $(".report_table p img").attr("title", "另存为查看大图");
  $(".report_table strong").css({
    "text-align": "center",
    "display": "block",
    "width": "100%"
  });
  $(".report_table p img[alt*=logo]").css({
    "height": "auto",
    "width": "auto",
  });
  if (window.screen.availWidth < 1170) {
    $($report_left).prependTo(".report_table").css({
      "position": "fixed",
      "height": "25px",
      "width": "25px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "18%",
      "top": "45%",
      "display": "none",
      "font-size": "12px"
    });
    $($report_right).prependTo(".report_table").css({
      "position": "fixed",
      "height": "25px",
      "width": "25px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "17.5%",
      "top": "45%",
      "font-size": "12px"
    });
    $("#open_right").click(function() {
      $(".report_table").css({
        "width": "100%",
      });
      $(".report_table .toc").hide();
      $("#open_right").css("right", "8px");
      $("#open_left").css("right", "8px");
      $(this).hide();
      $("#open_left").show();
    });
    $("#open_left").click(function() {
      $(".report_table").css({
        "width": "82%",
      });
      $(".report_table .toc").show();
      $("#open_right").css("right", "17.5%");
      $("#open_left").css("right", "17.5%");
      $(this).hide();
      $("#open_right").show();
    });
  } else {
    $($report_left).prependTo(".report_table").css({
      "position": "fixed",
      "height": "28px",
      "width": "28px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "20%",
      "top": "40%",
      "display": "none"
    });
    $($report_right).prependTo(".report_table").css({
      "position": "fixed",
      "height": "28px",
      "width": "28px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "20%",
      "top": "40%"
    });
    $("#open_right").click(function() {
      $(".report_table").css({
        "width": "90%",
      });
      $(".report_table .toc").hide();
      $("#open_right").css("right", "8px");
      $("#open_left").css("right", "8px");
      $(this).hide();
      $("#open_left").show();
    });
    $("#open_left").click(function() {
      $(".report_table").css({
        "width": "70.5%",
      });
      $(".report_table .toc").show();
      $("#open_right").css("right", "20%");
      $("#open_left").css("right", "20%");
      $(this).hide();
      $("#open_right").show();
    });
  };
}

//获取下载参数接口
var parameter = function() {
  genedock.get_task(taskId, function(res) {
    var para = res.data.parameters,
      paraOutput = "",
      paraInput = "";
    $.each(para.Outputs, function(outputKey, outputVal) {
      accountname = para.Outputs[outputKey].data[0].name.split(":")[0];
      datapath = para.Outputs[outputKey].data[0].name.split(":")[1];
      datapatharr = datapath.split("/");
      dataname = datapatharr[datapatharr.length-1];
      genedock.listDataFormal(accountname, 'default', datapath, function(res) {
        enid = res.entity_id;
        paraOutput += "<li class='list-group-item'>output_data ：" +
          dataname + "<button onclick=output_download('" +
          enid + "','" + dataname + "') class='btn btn-default pull-right download_btn" +
          enid + "' style='margin: -7px 5px;'>下载</button></li>";

       $("#para").html("<div class='well well-sm'><h1>" + para.name + "</h1><p>" + para.description + "</p></div><h4>Output Data:</h4><ul class='list-group'>" + paraOutput + "</ul><h4>Input Data:</h4><ul class'list-group'>" + paraInput + "</ul>");

      }, function(err) {
        console.log(err);
      });
        
    });
    $.each(para.Inputs, function(key, val) {
      for (var i = 0; i < para.Inputs[key].data.length; i++) {
        paraInput += "<li class='list-group-item'>" + para.Inputs[key].alias + " ：" + para.Inputs[key].data[i].name + "</li>";
      }
    });

  }, function(err) {
    $("#para").html("无数据");
    console.log(err);
  });
}

var taskstatus = function(taskId) {
  genedock.get_task(taskId, function(res) {
    if (res.data.status === "success") {
      $(".cdc_back").css({
        "display": "block"
      });
      $("#report_display").attr("href", "report.html?" + taskId + "/");
      $("#parameter_display").attr("href", "parameter.html?" + taskId + "/");
      $("#log_display").attr("href", "log.html?" + taskId + "/");
    };
  }, function(err) {
    console.log(err);
  });
}

function output_download(id,name) {
  clearInterval(download_time_count);
  $(".download_btn" + id).text("waiting...").attr("disabled", "disabled");
  genedock.getDataDownloadProcessFormal(currentAccount, 'default', id, function(res) {
    if (res.blocks.length === 1 && !res.compression_type) {
      genedock.getDataDownloadBlockFormal(currentAccount, 'default', id, res.blocks[0].block_id, function(block){
        file_url = getFileDownloadUrl(block,name);
        if (file_url) {
          window.location = file_url;
          $(".download_btn" + id).text("已经下载").attr("disabled", "disabled");
        } else {
          download_time_count = setInterval("get()", 1000)
        };
      }, function(err) {
        console.log(err);
      });
    }   
  }, function(err) {
    console.log(err);
  });
  downloadOutput_enid = id;
}

function get() {
  if (file_url) {
    window.location = file_url;
    $(".download_btn" + downloadOutput_enid).text("已经下载").attr("disabled", "disabled");
  } else {
    count--;
    $(".download_btn" + downloadOutput_enid).text("正在下载(" + count + ")").attr("disabled", "disabled");
    if (count == 0) {
      count = 60;
      id = downloadOutput_enid;
      output_download(id);
    };
  };
}






