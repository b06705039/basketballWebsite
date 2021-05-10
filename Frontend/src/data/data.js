export const appointments = [
    {
      id: 0,
      text: 'ME vs EE',
      startDate: new Date(Date.UTC(2021, 4, 27, 17, 0, 0)),
      endDate: new Date(Date.UTC(2021, 4, 27, 18, 0, 0)),
      home: "ME",
      away: "EE",
      field: 1,
      arranged: true
    },
    //   id: 1,
    //   text: 'FIN vs EE',
    //   startDate: new Date('2021-05-25T17:00:00.000Z'),
    //   endDate: new Date('2021-05-25T18:00:00.000Z'),
    //   home: "FIN",
    //   away: "EE",
    //   field: 0,
    //   arranged: true
    // }, {
    //   id: 2,
    //   text: 'ME vs FIN',
    //   startDate: new Date('2021-05-25T19:00:00.000Z'),
    //   endDate: new Date('2021-05-25T20:35:00.000Z'),
    //   home: "ME",
    //   away: "FIN",
    //   field: 0,
    //   arranged: true
    // }, {
    //   id: 3,
    //   text: 'DFLL vs EE',
    //   startDate: new Date('2021-05-26T19:00:00.000Z'),
    //   endDate: new Date('2021-05-26T21:00:00.000Z'),
    //   home: "DFLL",
    //   away: "EE",
    //   field: 1,
    //   arranged: true
    // }, {
    //   id: 4,
    //   text: 'EE vs FIN',
    //   startDate: new Date('2021-05-27T18:00:00.000Z'),
    //   endDate: new Date('2021-05-27T19:00:00.000Z'),
    //   home: "EE",
    //   away: "FIN",
    //   field: 0,
    //   arranged: true
    // }, {
    //   id: 5,
    //   text: 'DFLL vs ME',
    //   startDate: new Date('2021-05-27T18:00:00.000Z'),
    //   endDate: new Date('2021-05-27T20:30:00.000Z'),
    //   home: "DFLL",
    //   away: "ME",
    //   field: 1,
    //   arranged: true
    // },
    {
      id: 0,
      text: 'EE vs CHE',
      home: "EE",
      away: "CHE",
      arranged: false
    }, {
      id: 1,
      text: 'CHE vs ME',
      home: "CHE",
      away: "ME",
      arranged: false
    }, {
      id: 2,
      text: 'CHE vs DFLL',
      home: "CHE",
      away: "DFLL",
      arranged: false
    }, {
      id: 3,
      text: 'FIN vs CHE',
      home: "FIN",
      away: "CHE",
      arranged: false
    }
  ];
  
  
  export const FieldData = [
    {
      text: 'Field A',
      id: 0,
      color: '#1e90ff'
    }, {
      text: 'Field B',
      id: 1,
      color: '#ff9747'
    }
  ];